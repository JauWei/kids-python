/* ============================================================
   Skulpt Python playground + Quiz + Practice widgets
   Features: CodeMirror editor, localStorage auto-save, friendly errors
   ============================================================ */

const useSkulptReady = () => {
  const [ready, setReady] = React.useState(typeof window.Sk !== "undefined");
  React.useEffect(() => {
    if (ready) return;
    const t = setInterval(() => {
      if (typeof window.Sk !== "undefined") { setReady(true); clearInterval(t); }
    }, 200);
    return () => clearInterval(t);
  }, [ready]);
  return ready;
};

// hash initialCode to derive stable storage key per playground
const hashCode = (s) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h) + s.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h).toString(36);
};

// Friendlify Skulpt error messages → kid-readable Chinese
const friendlifyError = (raw) => {
  const s = String(raw);
  if (s.includes("IndentationError"))
    return "🔧 縮排錯了!Python 用「縮排」(4 個空格)區分區塊。檢查 if/for/while/def 下面那行有沒有縮進~";
  if (s.includes("SyntaxError")) {
    if (/EOL|unterminated string/i.test(s))
      return "🔧 字串少了結尾的引號!像 \"hi\" 兩邊都要有引號才行。";
    if (s.includes("invalid syntax"))
      return "🔧 語法寫錯了 ── 可能少了冒號 : (if/for/def 結尾要冒號)、括號沒配對、或拼錯關鍵字。";
    return "🔧 語法錯了 ── 檢查冒號、括號、引號有沒有配對。";
  }
  if (s.includes("NameError")) {
    const m = s.match(/name '([^']+)' is not defined/);
    return m ? `❓ Python 不認識「${m[1]}」── 是不是拼錯了?或還沒用 = 賦值給它?` : "❓ 用到了 Python 不認識的名字。";
  }
  if (s.includes("TypeError")) {
    if (/can only concatenate|unsupported operand/i.test(s))
      return "⚠️ 型別搞混了 ── 字串只能加字串、數字只能加數字。要把數字變字串用 str(123),反過來用 int('5')。";
    return "⚠️ 型別錯了 ── 對的東西用錯了方式(例如字串想做數學運算)。";
  }
  if (s.includes("ValueError")) {
    if (s.includes("invalid literal"))
      return "⚠️ 這個東西不能轉成數字,例如 int('abc') 會錯。";
    return "⚠️ 值不對 ── 可能 int() 拿到了不是數字的字串。";
  }
  if (s.includes("ZeroDivisionError")) return "➗ 不能除以 0!";
  if (s.includes("IndexError")) return "📋 索引超出 list 範圍 ── 列表只有 N 個,你拿了第 N 個之後的。";
  if (s.includes("KeyError")) {
    const m = s.match(/KeyError:?\s*'?([^'\n]+?)'?\s*$/);
    return m ? `📓 dict 裡沒有「${m[1]}」這個 key。` : "📓 dict 裡找不到那個 key。";
  }
  if (s.includes("AttributeError"))
    return "🔍 這個東西沒有那個屬性/方法 ── 是不是拼錯了?Python 區分大小寫,.upper() 不能寫成 .UPPER()。";
  if (s.includes("ImportError") || s.includes("ModuleNotFoundError") || s.includes("找不到模組")) {
    const m = s.match(/'([^']+)'/);
    return m ? `📦 找不到「${m[1]}」模組 ── 沙箱版只支援部分標準模組(pygame、requests 等要本機 Python 才有)。` : "📦 找不到那個模組。";
  }
  if (s.includes("RecursionError")) return "🌀 遞迴太深了 ── 函式一直呼叫自己沒停會這樣。檢查 base case 有沒有寫對。";
  if (/ExecutionTimeout|execution exceeded|execLimit/i.test(s))
    return "⏱️ 跑太久了(超過 15 秒)── 是不是有無窮迴圈?檢查 while 的條件最後會不會變 False。";
  return s.length > 220 ? s.slice(0, 220) + "..." : s;
};

const Playground = ({ initialCode = "", turtle = false, hint, rows }) => {
  const storageKey = React.useMemo(() => `pyu_pg_${hashCode(initialCode)}`, [initialCode]);

  const [code, setCode] = React.useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved !== null ? saved : initialCode;
    } catch { return initialCode; }
  });
  const [running, setRunning] = React.useState(false);
  const [output, setOutput] = React.useState("");
  const [error, setError] = React.useState(null);
  const [errorRaw, setErrorRaw] = React.useState(null);
  const [showRaw, setShowRaw] = React.useState(false);
  const [savedTip, setSavedTip] = React.useState(false);

  const turtleRef = React.useRef(null);
  const tidRef = React.useRef(`turtle-${Math.random().toString(36).slice(2, 10)}`);
  const editorMountRef = React.useRef(null);
  const cmRef = React.useRef(null);
  const ready = useSkulptReady();
  const cmAvailable = typeof window !== "undefined" && window.CodeMirror;

  // Auto-save to localStorage (debounced)
  React.useEffect(() => {
    const t = setTimeout(() => {
      try {
        if (code !== initialCode) {
          localStorage.setItem(storageKey, code);
          setSavedTip(true);
          setTimeout(() => setSavedTip(false), 1200);
        } else {
          localStorage.removeItem(storageKey);
        }
      } catch {}
    }, 500);
    return () => clearTimeout(t);
  }, [code, storageKey, initialCode]);

  // Initialize CodeMirror once
  React.useEffect(() => {
    if (!editorMountRef.current || !cmAvailable || cmRef.current) return;
    const cm = window.CodeMirror(editorMountRef.current, {
      value: code,
      mode: "python",
      theme: "dracula",
      lineNumbers: true,
      indentUnit: 4,
      tabSize: 4,
      indentWithTabs: false,
      matchBrackets: true,
      autoCloseBrackets: true,
      lineWrapping: true,
      extraKeys: {
        Tab: (cm) => cm.replaceSelection("    ", "end"),
      },
    });
    cm.on("change", () => setCode(cm.getValue()));
    cmRef.current = cm;
    const initialRows = rows || Math.max(4, code.split("\n").length + 1);
    cm.setSize(null, Math.max(110, initialRows * 22));
  }, [cmAvailable]);

  // Keep CodeMirror in sync when reset
  React.useEffect(() => {
    if (cmRef.current && cmRef.current.getValue() !== code) {
      cmRef.current.setValue(code);
    }
  }, [code]);

  const run = () => {
    if (!window.Sk) return;
    setRunning(true);
    setOutput("");
    setError(null);
    setErrorRaw(null);
    setShowRaw(false);
    if (turtle && turtleRef.current) turtleRef.current.innerHTML = "";

    let buf = "";
    window.Sk.configure({
      output: (text) => { buf += text; setOutput(buf); },
      read: (x) => {
        if (window.Sk.builtinFiles === undefined || window.Sk.builtinFiles["files"][x] === undefined)
          throw `找不到模組 '${x}'`;
        return window.Sk.builtinFiles["files"][x];
      },
      __future__: window.Sk.python3,
      execLimit: 15000,
      killableWhile: true,
      killableFor: true,
      inputfun: (prompt) => new Promise((resolve) => {
        const ans = window.prompt(prompt || "請輸入：");
        resolve(ans == null ? "" : ans);
      }),
      inputfunTakesPrompt: true,
    });

    if (turtle) {
      window.Sk.TurtleGraphics = window.Sk.TurtleGraphics || {};
      window.Sk.TurtleGraphics.target = tidRef.current;
      window.Sk.TurtleGraphics.width = 400;
      window.Sk.TurtleGraphics.height = 300;
    }

    window.Sk.misceval.asyncToPromise(
      () => window.Sk.importMainWithBody("<stdin>", false, code, true)
    ).then(
      () => setRunning(false),
      (err) => {
        setError(friendlifyError(err));
        setErrorRaw(String(err));
        setRunning(false);
      }
    );
  };

  const reset = () => {
    setCode(initialCode);
    if (cmRef.current) cmRef.current.setValue(initialCode);
    try { localStorage.removeItem(storageKey); } catch {}
    setOutput("");
    setError(null);
    setErrorRaw(null);
    if (turtle && turtleRef.current) turtleRef.current.innerHTML = "";
  };

  const downloadPy = () => {
    const blob = new Blob([code], { type: "text/x-python;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `kids_python_${Date.now()}.py`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const explainCode = () => {
    if (!window.askPyu) return;
    window.askPyu(`請逐行解釋這段 Python 程式碼,用孩子能懂的話(10-14 歲),控制在 4 段內：\n\n\`\`\`python\n${code}\n\`\`\``);
  };

  const askForFix = () => {
    if (!window.askPyu || !errorRaw) return;
    window.askPyu(`我這段程式碼跑出錯了,幫我看哪裡寫錯、該怎麼修。先指出問題、再給修正建議,簡短就好：\n\n\`\`\`python\n${code}\n\`\`\`\n\n錯誤訊息：\n${errorRaw}`);
  };

  const lineCount = rows || Math.max(4, code.split("\n").length + 1);
  const codeChanged = code !== initialCode;

  return (
    <div className="playground">
      <div className="playground-label">
        <span>📝 程式碼 · code</span>
        <span style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {savedTip && <span style={{ color: "#4ade80", fontSize: 11 }}>✓ 已存</span>}
          {codeChanged && !savedTip && <span style={{ color: "#94a3b8", fontSize: 11 }}>● 已修改</span>}
          {hint && <span className="playground-hint">{hint}</span>}
        </span>
      </div>
      {cmAvailable ? (
        <div ref={editorMountRef} className="playground-code-cm"/>
      ) : (
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          className="playground-code"
          rows={lineCount}
        />
      )}
      <div className="playground-actions">
        <button className="btn btn-primary" onClick={run} disabled={running || !ready}>
          {!ready ? "🐢 載入 Python 中..." : running ? "🐢 執行中..." : "▶ 執行"}
        </button>
        <button className="btn btn-ghost" onClick={reset} title="清掉修改,回到原版">↻ 重設</button>
        <button className="btn btn-ghost" onClick={downloadPy} title="下載成 .py 檔,拿到本機 Python 跑">⬇️ .py</button>
        <button className="btn btn-ghost" onClick={explainCode} title="請 Py 老師逐行解釋">🦉 解釋</button>
        {errorRaw && (
          <button className="btn btn-ghost" onClick={askForFix} title="把錯誤丟給 Py 老師求救" style={{ borderColor: "#fca5a5", color: "#fca5a5" }}>
            🦉 求救
          </button>
        )}
      </div>
      {(output || error) && (
        <div className="playground-output-wrap">
          <div className="playground-label">
            <span>📺 輸出 · output</span>
            {errorRaw && (
              <button style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", padding: 0, fontSize: 11 }}
                onClick={() => setShowRaw(s => !s)}>
                {showRaw ? "隱藏原始" : "顯示原始錯誤"}
              </button>
            )}
          </div>
          <pre className="playground-output">
            {output || (error ? "" : " ")}
            {error && <span className="playground-error">⚠️ {error}</span>}
            {showRaw && errorRaw && (
              <span style={{ display: "block", marginTop: 8, color: "#94a3b8", fontSize: 12, fontStyle: "italic" }}>
                {errorRaw}
              </span>
            )}
          </pre>
        </div>
      )}
      {turtle && (
        <div className="playground-output-wrap">
          <div className="playground-label"><span>🐢 海龜畫布 · canvas</span></div>
          <div ref={turtleRef} id={tidRef.current} className="playground-turtle"/>
        </div>
      )}
    </div>
  );
};

/* ---------- Mini Quiz ---------- */
const Quiz = ({ q, opts, ans, explain }) => {
  const [picked, setPicked] = React.useState(null);
  const correct = picked === ans;

  return (
    <div className="block tip">
      <h2>🧠 小測驗</h2>
      <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>{q}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {opts.map((o, i) => {
          const isPicked = picked === i;
          const showResult = picked !== null;
          const isCorrect = i === ans;
          let bg = "white", bd = "var(--border-1)", color = "var(--ink-warm)";
          if (showResult && isCorrect) { bg = "#dcfce7"; bd = "#22c55e"; }
          else if (showResult && isPicked) { bg = "#fee2e2"; bd = "#ef4444"; }
          else if (isPicked) { bg = "#eef2ff"; bd = "var(--indigo)"; }
          return (
            <button key={i} onClick={() => !showResult && setPicked(i)} disabled={showResult}
              style={{ background: bg, border: `2px solid ${bd}`, borderRadius: 12, padding: "10px 14px",
                fontSize: 14, fontWeight: 600, color, cursor: showResult ? "default" : "pointer",
                textAlign: "left", fontFamily: "inherit" }}>
              {String.fromCharCode(65 + i)}. {o}
              {showResult && isCorrect && <span style={{ float: "right", color: "#16a34a", fontWeight: 700 }}>✓ 正確</span>}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <div style={{ marginTop: 12, padding: 12, background: correct ? "#dcfce7" : "#fef3c7", borderRadius: 10, fontSize: 14 }}>
          <strong>{correct ? "🎉 答對了！" : "💪 再想想～"}</strong>{" "}{explain}
          {!correct && <button className="btn btn-ghost" style={{ marginLeft: 12, padding: "4px 12px", fontSize: 12 }} onClick={() => setPicked(null)}>再試一次</button>}
        </div>
      )}
    </div>
  );
};

/* ---------- Practice block ---------- */
const Practice = ({ items }) => (
  <div className="block" style={{
    background: "linear-gradient(135deg, #fff7e0 0%, #fde68a 100%)",
    borderColor: "#fcd34d"
  }}>
    <h2>💪 自己試試 <span className="en">Practice</span></h2>
    <ol style={{ paddingLeft: 22, margin: 0 }}>
      {items.map((it, i) => (
        <li key={i} style={{ marginBottom: 8, lineHeight: 1.7 }}>{it}</li>
      ))}
    </ol>
  </div>
);

window.Playground = Playground;
window.Quiz = Quiz;
window.Practice = Practice;
