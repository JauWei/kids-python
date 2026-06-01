/* ============================================================
   ChatPyu — floating "ask Py 老師" assistant
   Uses Gemini 2.5 Flash directly from browser with user's own API key.
   Key stored in localStorage; never sent anywhere except Google.
   ============================================================ */

const SYSTEM_PROMPT = `你是「Py 老師」,一隻友善的貓頭鷹,專門教 10-15 歲青少年學 Python。

回答準則:
- 用<strong>口語化、簡單的中文</strong>,避免艱深術語
- 一次回答<strong>不要超過 3 段</strong>
- 程式碼用 \`\`\`python ... \`\`\` 包起來
- 適度使用 emoji 增添趣味,但不要過多
- 鼓勵孩子<strong>動手試</strong>,別只給答案 ── 必要時提示「可以先試試 X」
- 如果問題跟 Python 無關(數學、生活問題等)也可以回答,但簡短
- 不確定的事情就直接說「這我不確定」,別亂猜`;

const GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_URL = (key) => `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${key}`;

const ChatPyu = () => {
  const [open, setOpen] = React.useState(false);
  const [apiKey, setApiKey] = React.useState(() => {
    try { return localStorage.getItem("pyu_gemini_key") || ""; } catch { return ""; }
  });
  const [keyDraft, setKeyDraft] = React.useState("");
  const [showKeyForm, setShowKeyForm] = React.useState(false);
  const [messages, setMessages] = React.useState([]);
  const [input, setInput] = React.useState("");
  const [sending, setSending] = React.useState(false);
  const scrollRef = React.useRef(null);

  // Auto-scroll to bottom on new message
  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, sending]);

  // Reset key form whenever opened with no key
  React.useEffect(() => {
    if (open && !apiKey) setShowKeyForm(true);
  }, [open, apiKey]);

  const saveKey = () => {
    const k = keyDraft.trim();
    if (!k) return;
    try { localStorage.setItem("pyu_gemini_key", k); } catch {}
    setApiKey(k);
    setKeyDraft("");
    setShowKeyForm(false);
  };

  const clearKey = () => {
    try { localStorage.removeItem("pyu_gemini_key"); } catch {}
    setApiKey("");
    setKeyDraft("");
    setShowKeyForm(true);
    setMessages([]);
  };

  const sendText = async (rawText) => {
    const text = (rawText || "").trim();
    if (!text || sending) return;
    if (!apiKey) {
      setOpen(true);
      setShowKeyForm(true);
      return;
    }

    const userMsg = { role: "user", text };
    setMessages(m => [...m, userMsg]);
    setSending(true);

    try {
      // Build conversation including system prompt as first turn
      const contents = [
        { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
        { role: "model", parts: [{ text: "好的!我會用簡單的話跟你互動 🦉" }] },
      ];
      // Past messages
      messages.forEach(m => {
        contents.push({
          role: m.role === "user" ? "user" : "model",
          parts: [{ text: m.text }]
        });
      });
      contents.push({ role: "user", parts: [{ text }] });

      const res = await fetch(GEMINI_URL(apiKey), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents,
          generationConfig: { temperature: 0.7, maxOutputTokens: 1024 }
        })
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error.message || "Gemini API error");
      }
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "(沒收到回覆,可能 API key 錯了或網路問題)";
      setMessages(m => [...m, { role: "model", text: reply }]);
    } catch (err) {
      setMessages(m => [...m, { role: "model", text: "❌ 出錯了: " + String(err.message || err) }]);
    }
    setSending(false);
  };

  const send = () => {
    const text = input;
    setInput("");
    sendText(text);
  };

  // Expose global askPyu() so Playground / 章末按鈕 can trigger
  const sendTextRef = React.useRef(sendText);
  sendTextRef.current = sendText;
  React.useEffect(() => {
    window.askPyu = (prompt) => {
      setOpen(true);
      // Wait for open transition + state propagation
      setTimeout(() => sendTextRef.current(prompt), 80);
    };
    return () => { try { delete window.askPyu; } catch { window.askPyu = undefined; } };
  }, []);

  // Render assistant text with code blocks
  const renderText = (text) => {
    // Split by ```python ... ``` or ``` ... ```
    const parts = text.split(/```(?:python|py)?\n?([\s\S]*?)```/g);
    return parts.map((p, i) => {
      if (i % 2 === 0) {
        return <span key={i} style={{ whiteSpace: "pre-wrap" }}>{p}</span>;
      } else {
        return (
          <pre key={i} style={{
            background: "#0f172a", color: "#e2e8f0",
            padding: "8px 10px", borderRadius: 6, margin: "6px 0",
            fontFamily: "var(--font-mono)", fontSize: 12, overflowX: "auto",
            whiteSpace: "pre"
          }}>{p.trim()}</pre>
        );
      }
    });
  };

  return (
    <>
      <button className="chat-btn" onClick={() => setOpen(o => !o)} aria-label="問 Py 老師">
        {open ? "✕" : "🦉"}
      </button>
      {open && (
        <div className="chat-panel">
          <div className="chat-header">
            <div>
              <div style={{ fontSize: 15, fontWeight: 800 }}>🦉 問 Py 老師</div>
              <div style={{ fontSize: 10, opacity: 0.85 }}>由 Gemini 2.5 Flash 提供</div>
            </div>
            {apiKey && !showKeyForm && (
              <button onClick={() => setShowKeyForm(true)} className="chat-icon-btn" title="重設 API key">⚙️</button>
            )}
          </div>

          {showKeyForm ? (
            <div className="chat-key-prompt">
              <h3>🔑 設定 Gemini API Key</h3>
              <p>第一次使用要先設定金鑰。Gemini 有<strong>免費額度</strong>(每分鐘 60 次、每天 1500 次),足夠日常用。</p>
              <p>取得方式:到 <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer">Google AI Studio</a> 登入 Google 帳號 → 「Create API key」→ 複製貼上。</p>
              <input type="password" value={keyDraft} onChange={e => setKeyDraft(e.target.value)}
                placeholder="貼上 API key (以 AIza... 開頭)"
                onKeyDown={e => { if (e.key === "Enter") saveKey(); }}/>
              <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                <button className="btn btn-primary" onClick={saveKey} style={{ flex: 1, justifyContent: "center" }}>儲存並開始</button>
                {apiKey && <button className="btn btn-ghost" onClick={() => setShowKeyForm(false)}>取消</button>}
              </div>
              <div style={{ marginTop: 10, padding: 8, background: "#fef3c7", borderRadius: 6, fontSize: 11, color: "#92400e" }}>
                ⚠️ 金鑰只存在你的瀏覽器 localStorage,不會傳到我這邊。但別把金鑰貼到公開地方(GitHub、聊天室)。
              </div>
              {apiKey && (
                <button onClick={clearKey} style={{ marginTop: 8, background: "none", border: "none", color: "#dc2626", cursor: "pointer", fontSize: 11, padding: 0 }}>
                  清除目前金鑰
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="chat-messages" ref={scrollRef}>
                {messages.length === 0 && (
                  <div className="chat-hint">
                    嗨!我是 Py 老師,有 Python 問題隨便問~
                    <br/><br/>
                    例如:
                    <ul style={{ paddingLeft: 18, marginTop: 6 }}>
                      <li>range 跟 for 為什麼老是搭配?</li>
                      <li>幫我看看這段程式為什麼錯</li>
                      <li>list 跟 dict 差在哪</li>
                    </ul>
                  </div>
                )}
                {messages.map((m, i) => (
                  <div key={i} className={`chat-msg ${m.role}`}>
                    {m.role === "model" ? renderText(m.text) : m.text}
                  </div>
                ))}
                {sending && <div className="chat-msg model">🦉 思考中...</div>}
              </div>
              <div className="chat-input">
                <textarea value={input} onChange={e => setInput(e.target.value)}
                  placeholder="按 Enter 送出 / Shift+Enter 換行"
                  rows={2}
                  disabled={sending}
                  onKeyDown={e => {
                    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
                  }}/>
                <button className="btn btn-primary" onClick={send} disabled={sending || !input.trim()} style={{ minWidth: 56 }}>
                  送
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

window.ChatPyu = ChatPyu;
