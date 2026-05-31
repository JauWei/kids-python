/* ============================================================
   Skulpt-powered in-browser Python playground + Quiz widget
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

const Playground = ({ initialCode = "", turtle = false, hint, rows }) => {
  const [code, setCode] = React.useState(initialCode);
  const [running, setRunning] = React.useState(false);
  const [output, setOutput] = React.useState("");
  const [error, setError] = React.useState(null);
  const turtleRef = React.useRef(null);
  const tidRef = React.useRef(`turtle-${Math.random().toString(36).slice(2, 10)}`);
  const ready = useSkulptReady();

  const run = () => {
    if (!window.Sk) return;
    setRunning(true);
    setOutput("");
    setError(null);
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
      (err) => { setError(String(err)); setRunning(false); }
    );
  };

  const reset = () => {
    setCode(initialCode);
    setOutput("");
    setError(null);
    if (turtle && turtleRef.current) turtleRef.current.innerHTML = "";
  };

  const lineCount = rows || Math.max(4, code.split("\n").length + 1);

  return (
    <div className="playground">
      <div className="playground-label">
        <span>📝 程式碼 · code</span>
        {hint && <span className="playground-hint">{hint}</span>}
      </div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        spellCheck={false}
        className="playground-code"
        rows={lineCount}
      />
      <div className="playground-actions">
        <button className="btn btn-primary" onClick={run} disabled={running || !ready}>
          {!ready ? "🐢 載入 Python 中..." : running ? "🐢 執行中..." : "▶ 執行"}
        </button>
        <button className="btn btn-ghost" onClick={reset}>↻ 重設</button>
      </div>
      {(output || error) && (
        <div className="playground-output-wrap">
          <div className="playground-label"><span>📺 輸出 · output</span></div>
          <pre className="playground-output">
            {output || (error ? "" : " ")}
            {error && <span className="playground-error">⚠️ 錯誤：{error}</span>}
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
            <button
              key={i}
              onClick={() => !showResult && setPicked(i)}
              disabled={showResult}
              style={{
                background: bg, border: `2px solid ${bd}`, borderRadius: 12,
                padding: "10px 14px", fontSize: 14, fontWeight: 600, color,
                cursor: showResult ? "default" : "pointer",
                textAlign: "left", fontFamily: "inherit"
              }}>
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

window.Playground = Playground;
window.Quiz = Quiz;
