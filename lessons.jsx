/* ============================================================
   Lesson content — Kids Python Academy
   Part 1: Home + Ch1-Ch8 (basics → strings → input → conditions)
   ============================================================ */

// 0. Home
const Home = ({ go }) => {
  const chapters = [
    { id: "ch1",  n: "01", e: "💬", t: "讓電腦說話",   en: "print()" },
    { id: "ch2",  n: "02", e: "📦", t: "變數收納盒",   en: "Variables" },
    { id: "ch3",  n: "03", e: "🏷️", t: "資料型別",    en: "Data Types" },
    { id: "ch4",  n: "04", e: "🧮", t: "數字運算",     en: "Math" },
    { id: "ch5",  n: "05", e: "🔤", t: "字串魔法",     en: "Strings" },
    { id: "ch6",  n: "06", e: "⌨️", t: "問使用者",    en: "input()" },
    { id: "ch7",  n: "07", e: "🤔", t: "做決定",       en: "If / Else" },
    { id: "ch8",  n: "08", e: "🔀", t: "邏輯運算",     en: "and/or/not" },
    { id: "ch9",  n: "09", e: "🔁", t: "for + range",  en: "For Loop" },
    { id: "ch10", n: "10", e: "♾️", t: "while 迴圈",  en: "While Loop" },
    { id: "ch11", n: "11", e: "📋", t: "串列 list",    en: "List" },
    { id: "ch12", n: "12", e: "📓", t: "字典 dict",    en: "Dict" },
    { id: "ch13", n: "13", e: "🛠️", t: "函式",        en: "Functions" },
    { id: "ch14", n: "14", e: "🛡️", t: "錯誤處理",    en: "Try/Except" },
    { id: "ch15", n: "15", e: "🧰", t: "模組",         en: "Modules" },
    { id: "ch16", n: "16", e: "🐢", t: "海龜畫圖",     en: "Turtle" },
    { id: "ch17", n: "17", e: "🧬", t: "物件導向",     en: "Classes" },
    { id: "ch18", n: "18", e: "📁", t: "檔案 I/O",     en: "Files" },
    { id: "ch19", n: "19", e: "🎯", t: "猜數字遊戲",   en: "Guess Game" },
    { id: "ch20", n: "20", e: "🎮", t: "你的遊戲",     en: "Your Game" },
    { id: "ch21", n: "21", e: "🗺️", t: "文字冒險",     en: "Text Adventure" },
    { id: "ch22", n: "22", e: "🧮", t: "心算練習機",   en: "Math Trainer" },
  ];

  return (
    <div style={{ background: "linear-gradient(135deg, #eef4ff 0%, #ddeeff 50%, #c8e0ff 100%)", borderRadius: 24, padding: "40px 32px", marginBottom: 24, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 30, right: 40, fontSize: 36, animation: "bob 3s ease-in-out infinite" }}>⚡</div>
      <div style={{ position: "absolute", top: 80, right: 100, fontSize: 24, animation: "bob 4s ease-in-out infinite" }}>✨</div>
      <div style={{ position: "absolute", bottom: 30, left: 40, fontSize: 32, animation: "bob 3.5s ease-in-out infinite" }}>🐍</div>

      <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ animation: "bob 3s ease-in-out infinite" }}>
          <Owl size={140} mood="teach"/>
        </div>
        <div style={{ flex: 1, minWidth: 280 }}>
          <div style={{ display: "inline-block", background: "white", padding: "4px 12px", borderRadius: 999, fontSize: 11, fontWeight: 700, color: "#4338ca", marginBottom: 8 }}>
            ⚡ 給 10-15 歲青少年 · For ages 10-15
          </div>
          <h1 style={{ fontSize: 44, fontWeight: 800, margin: "0 0 8px", lineHeight: 1.05, color: "var(--ink-warm)" }}>
            小小<span style={{ background: "var(--brand-grad)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>Python</span>程式設計師
          </h1>
          <div style={{ fontSize: 18, color: "var(--fg-2)", fontWeight: 500, marginBottom: 4 }}>
            16 章從零到能寫小遊戲,每章都能直接在網頁裡寫程式跑～
          </div>
          <div style={{ fontSize: 14, color: "var(--fg-3)", fontFamily: "var(--font-latin)", fontStyle: "italic", marginBottom: 20 }}>
            16 chapters from zero to small games — write and run in your browser 🦉
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button className="btn btn-primary" onClick={() => go("ch1")}>🚀 從第 1 課開始</button>
            <button className="btn btn-ghost" onClick={() => go("ch16")}>🐢 直接玩海龜畫圖</button>
            <a className="btn btn-ghost" href="computer-components.html" style={{ textDecoration: "none" }}>🖥️ 認識電腦組成</a>
          </div>
        </div>
      </div>

      <h3 style={{ fontSize: 18, fontWeight: 800, marginTop: 32, marginBottom: 12, color: "var(--ink-warm)" }}>📚 課程地圖 Curriculum</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 10 }}>
        {chapters.map((c, i) => (
          <button key={c.id} onClick={() => go(c.id)}
            style={{
              background: "white", border: "1.5px solid rgba(0,0,0,0.06)", borderRadius: 14, padding: 12, textAlign: "left",
              cursor: "pointer", transition: "all 0.18s", fontFamily: "inherit",
              animation: `fadeUp 0.4s ease-out ${i * 0.03}s backwards`
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.08)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <span style={{ fontSize: 24 }}>{c.e}</span>
              <span style={{ fontSize: 10, fontWeight: 800, color: "var(--fg-4)", letterSpacing: "0.05em" }}>CH {c.n}</span>
            </div>
            <div style={{ fontSize: 14, fontWeight: 800, color: "var(--ink-warm)" }}>{c.t}</div>
            <div style={{ fontSize: 10, color: "var(--fg-3)", fontStyle: "italic", fontFamily: "var(--font-latin)" }}>{c.en}</div>
          </button>
        ))}
      </div>

      <div style={{ marginTop: 24, padding: 16, background: "rgba(255,255,255,0.6)", borderRadius: 14, fontSize: 13, color: "var(--ink-warm)", backdropFilter: "blur(8px)" }}>
        💡 <strong>怎麼學:</strong> 每章先看 Py 老師講解 → 看範例與輸出 → 自己改改試做框裡的程式碼 → 答小測驗鞏固。錯了沒關係,程式設計就是不斷試錯學會的!
      </div>
    </div>
  );
};

// Ch1: print
const Ch1 = () => (
  <div>
    <div className="lesson-eyebrow"><span className="dot"></span>第 1 課 · Chapter 1</div>
    <h1 className="lesson-title">💬 讓電腦說話</h1>
    <div className="lesson-title-en">The print() function</div>
    <p className="lesson-intro">學 Python 的第一個咒語:<code>print()</code>。它的工作就是把括號裡的東西<strong>顯示出來</strong>～</p>

    <div className="block">
      <h2>🌟 基本用法 <span className="en">Basic Usage</span></h2>
      <div className="bubble-row">
        <div className="bubble-avatar owl"><Owl size={56} mood="teach"/><span className="bubble-avatar-name">Py 老師</span></div>
        <div className="bubble owl">想讓電腦說話?把要說的字放在 <code>"</code> 和 <code>"</code> 之間,丟進 <code>print()</code> 就行～</div>
      </div>
      <pre className="code-block">print("你好，我是 Python！")</pre>
      <pre className="code-output">你好，我是 Python！</pre>

      <h3>🔢 數字不用引號</h3>
      <pre className="code-block">{`print(1 + 2)
print(10 * 5)`}</pre>
      <pre className="code-output">{`3
50`}</pre>
      <p>數字直接寫,Python 會幫你算。如果寫成 <code>"1 + 2"</code>,Python 會當成「字串」,印出來就真的是 <code>1 + 2</code>(沒算)。</p>
    </div>

    <div className="block">
      <h2>🎮 試試看 <span className="en">Try It!</span></h2>
      <p>把字、數字隨意改,按「執行」看看~</p>
      <Playground initialCode={`print("Hello, World!")
print("我叫小明")
print("今年", 8, "歲")
print(5 + 3)`}/>
    </div>

    <Practice items={["用 print 寫 3 行,各印一句你最愛的話。", "用一行 print 印出 1+2+3+4+5 的算式跟答案(用逗號連接)。", "造變數 name 跟 age,用一行 print 把它們一起印出。"]}/>

    <Quiz q="print(5 + 3) 會印出什麼?"
      opts={["8", "5+3", `"5+3"`, "錯誤訊息"]}
      ans={0}
      explain="數字沒有引號 → Python 幫你算 → 印出 8。"/>
  </div>
);

// Ch2: variables
const Ch2 = () => (
  <div>
    <div className="lesson-eyebrow"><span className="dot"></span>第 2 課 · Chapter 2</div>
    <h1 className="lesson-title">📦 變數收納盒</h1>
    <div className="lesson-title-en">Variables</div>
    <p className="lesson-intro">變數就是<strong>貼了名字的收納盒</strong>,可以裝東西,要用時喊它的名字就拿出來。</p>

    <div className="block">
      <h2>🌟 建立變數</h2>
      <pre className="code-block">{`name = "小華"
age = 8
print(name)
print("我", age, "歲")`}</pre>
      <pre className="code-output">{`小華
我 8 歲`}</pre>
      <p>格式:<code>盒子名字 = 要放的東西</code>。等號是「指定」,把右邊塞進左邊那個盒子。</p>

      <h3>🔁 盒子裡的東西可以換</h3>
      <pre className="code-block">{`score = 50
print(score)
score = 100   # 換掉
print(score)`}</pre>
      <pre className="code-output">{`50
100`}</pre>
    </div>

    <div className="block">
      <h2>🎮 試試看</h2>
      <p>改成你自己的資料:</p>
      <Playground initialCode={`name = "你的名字"
age = 12
hobby = "打籃球"

print("嗨！我叫", name)
print("我", age, "歲")
print("我喜歡", hobby)`}/>
    </div>

    <div className="block warn">
      <h2>⚠️ 命名規則</h2>
      <ul>
        <li>✅ 英文字母或底線開頭:<code>name</code>、<code>my_age</code>、<code>score2</code></li>
        <li>❌ 不能用數字開頭:<code>2score</code></li>
        <li>❌ 不能有空格:<code>my age</code> 要寫成 <code>my_age</code></li>
        <li>❌ 不能用 Python 保留字:<code>print</code>、<code>if</code>、<code>for</code>...</li>
      </ul>
    </div>

    <Practice items={["造 3 個變數存你最愛的食物、運動、顏色,用一句 print 串起來。", "造 a = 10,接著寫 a = a + 5,再 print(a),猜結果是多少。", "把分數從 80 變成 95,只用一行運算(不能直接寫 score = 95)。"]}/>

    <Quiz q="下面哪一行會出錯?"
      opts={[`name = "Amy"`, `2nd = 100`, `my_score = 85`, `_secret = "啊"`]}
      ans={1} explain="變數名稱不能用數字開頭。"/>
  </div>
);

// Ch3: data types
const Ch3 = () => (
  <div>
    <div className="lesson-eyebrow"><span className="dot"></span>第 3 課 · Chapter 3</div>
    <h1 className="lesson-title">🏷️ 資料型別</h1>
    <div className="lesson-title-en">Data Types</div>
    <p className="lesson-intro">Python 的資料有<strong>四種主要型別</strong>,就像不同形狀的積木:整數、小數、字串、布林。型別不同,能做的事也不同。</p>

    <div className="block">
      <h2>🌟 四大基本型別</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, marginTop: 12 }}>
        {[
          { e: "🔢", n: "int", desc: "整數", ex: "3, 100, -5" },
          { e: "🌊", n: "float", desc: "小數", ex: "3.14, 0.5" },
          { e: "🔤", n: "str", desc: "字串(文字)", ex: `"hi", "你好"` },
          { e: "✅", n: "bool", desc: "布林(對/錯)", ex: "True, False" },
        ].map(t => (
          <div key={t.n} style={{ background: "white", padding: 14, borderRadius: 12, border: "1px solid #e5e7eb" }}>
            <div style={{ fontSize: 28 }}>{t.e}</div>
            <div style={{ fontWeight: 800, fontSize: 16, marginTop: 4 }}><code>{t.n}</code></div>
            <div style={{ fontSize: 12, color: "var(--fg-2)", marginTop: 2 }}>{t.desc}</div>
            <div style={{ fontSize: 11, color: "var(--fg-3)", fontFamily: "var(--font-mono)", marginTop: 4 }}>{t.ex}</div>
          </div>
        ))}
      </div>
      <div className="bubble-row" style={{ marginTop: 16 }}>
        <div className="bubble-avatar owl"><Owl size={56} mood="teach"/><span className="bubble-avatar-name">Py 老師</span></div>
        <div className="bubble owl">用 <code>type(x)</code> 可以問 Python:「這東西是什麼型別?」</div>
      </div>
      <pre className="code-block">{`print(type(7))
print(type(3.14))
print(type("Hi"))
print(type(True))`}</pre>
      <pre className="code-output">{`<class 'int'>
<class 'float'>
<class 'str'>
<class 'bool'>`}</pre>
    </div>

    <div className="block">
      <h2>🎮 試試看</h2>
      <p>猜猜看 Python 怎麼分這些東西,按執行看結果:</p>
      <Playground initialCode={`print(type(42))
print(type(42.0))
print(type("42"))
print(type(True))
print(type(False))

# 注意：True/False 開頭要大寫！`}/>
    </div>

    <div className="block tip">
      <h2>💡 型別轉換 <span className="en">Type Conversion</span></h2>
      <ul>
        <li><code>int("8")</code> → <code>8</code>(字串轉整數)</li>
        <li><code>str(100)</code> → <code>"100"</code>(整數轉字串)</li>
        <li><code>float("3.14")</code> → <code>3.14</code></li>
      </ul>
      <p>之後 Ch6 用 input() 拿使用者輸入時會用到 ── 因為 input() 拿到的都是字串,要算數的話得先轉成數字!</p>
    </div>

    <Practice items={["用 type() 分別看 1、1.0、\"1\"、True 是什麼型別。", "試 int(\"3.14\") 看會發生什麼;改成 float(\"3.14\") 又如何?", "把整數 100 轉成字串,再串接 \"分\" 變成 \"100分\"。"]}/>

    <Quiz q="下面哪一個是 float?"
      opts={["100", `"100"`, "100.0", "True"]}
      ans={2} explain="100 是 int,100.0 才是 float(有小數點)。"/>
  </div>
);

// Ch4: math
const Ch4 = () => (
  <div>
    <div className="lesson-eyebrow"><span className="dot"></span>第 4 課 · Chapter 4</div>
    <h1 className="lesson-title">🧮 數字運算</h1>
    <div className="lesson-title-en">Math Operators</div>
    <p className="lesson-intro">Python 是一台超強計算機。除了 + - × ÷,還有「取整數除」、「取餘數」、「次方」這幾個小學沒教的好用工具。</p>

    <div className="block">
      <h2>🌟 七個運算符 <span className="en">Seven Operators</span></h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 8, marginTop: 12 }}>
        {[
          { s: "+", n: "加", ex: "5 + 3 = 8" },
          { s: "-", n: "減", ex: "5 - 3 = 2" },
          { s: "*", n: "乘", ex: "5 * 3 = 15" },
          { s: "/", n: "除(小數)", ex: "10 / 3 = 3.333..." },
          { s: "//", n: "整數除", ex: "10 // 3 = 3" },
          { s: "%", n: "取餘數", ex: "10 % 3 = 1" },
          { s: "**", n: "次方", ex: "2 ** 5 = 32" },
        ].map(o => (
          <div key={o.s} style={{ background: "white", padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}>
            <div><code style={{ fontSize: 18, fontWeight: 800 }}>{o.s}</code> <span style={{ fontSize: 13, color: "var(--fg-2)" }}>{o.n}</span></div>
            <div style={{ fontSize: 11, color: "var(--fg-3)", fontFamily: "var(--font-mono)", marginTop: 4 }}>{o.ex}</div>
          </div>
        ))}
      </div>
    </div>

    <div className="block">
      <h2>🌟 // 和 % 是什麼?</h2>
      <p><code>10 / 3</code> 是 <code>3.333...</code>,但有時你只要「商」或「餘數」:</p>
      <pre className="code-block">{`print(17 // 5)   # 商 (17 裡有 3 個 5)
print(17 % 5)    # 餘數 (17 - 15 = 2)
print(17 / 5)    # 完整小數`}</pre>
      <pre className="code-output">{`3
2
3.4`}</pre>
      <p>實用場景:把秒數換算成分秒 → <code>seconds // 60</code> 是分,<code>seconds % 60</code> 是剩餘秒。</p>
    </div>

    <div className="block">
      <h2>🎮 試試看 ── 算錢買糖果</h2>
      <p>你有 100 元,糖果一顆 7 元。算算可以買幾顆、找回多少錢:</p>
      <Playground initialCode={`money = 100
candy_price = 7

count = money // candy_price   # 能買幾顆
change = money % candy_price   # 剩多少錢

print("可以買", count, "顆糖果")
print("剩下", change, "元")`}/>
    </div>

    <div className="block tip">
      <h2>💡 運算順序</h2>
      <p>跟數學一樣:<strong>先乘除,後加減</strong>,有括號先算括號。</p>
      <pre className="code-block">{`print(2 + 3 * 4)      # 14 (先算 3*4)
print((2 + 3) * 4)    # 20 (先算括號)
print(2 ** 3 ** 2)    # 512 (次方從右算起)`}</pre>
    </div>

    <Practice items={["你有 200 元,巧克力一條 25 元,用 // 跟 % 算可買幾條、剩多少。", "把 365 天換算成 X 週 Y 天(用 // 跟 %)。", "算 2 的 10 次方是多少;再算 9 的平方根(提示:** 0.5)。"]}/>

    <Quiz q="17 // 5 等於多少?"
      opts={["3.4", "3", "2", "85"]}
      ans={1} explain="// 是整數除,只取商不取小數。17 ÷ 5 = 3 餘 2,所以 17 // 5 = 3。"/>
  </div>
);

// Ch5: strings
const Ch5 = () => (
  <div>
    <div className="lesson-eyebrow"><span className="dot"></span>第 5 課 · Chapter 5</div>
    <h1 className="lesson-title">🔤 字串魔法</h1>
    <div className="lesson-title-en">Strings</div>
    <p className="lesson-intro">字串(string)就是「一串文字」。Python 提供了很多神奇的工具,可以拼接、重複、變大寫、找子字串、套變數進去...</p>

    <div className="block">
      <h2>🌟 引號的寫法</h2>
      <pre className="code-block">{`a = "Hello"          # 雙引號
b = 'World'          # 單引號 — 一樣可以
c = "It's fine"      # 想用單引號就外面包雙引號
d = """三行
都可以
這樣寫"""             # 三個引號 — 多行字串`}</pre>

      <h3>🌟 拼接 + 與重複 *</h3>
      <pre className="code-block">{`name = "小明"
greet = "你好，" + name + "！"
print(greet)

line = "-" * 20
print(line)`}</pre>
      <pre className="code-output">{`你好，小明！
--------------------`}</pre>
      <p>⚠️ <code>+</code> 只能「字串 + 字串」。<code>"年齡：" + 15</code> 會出錯,要寫 <code>"年齡：" + str(15)</code>。</p>
    </div>

    <div className="block">
      <h2>🌟 f-string ── 最方便的拼字法</h2>
      <p>在字串前面加 <code>f</code>,然後用 <code>{`{變數}`}</code> 直接把變數塞進去:</p>
      <pre className="code-block">{`name = "小華"
age = 13
print(f"我叫 {name}，今年 {age} 歲")
print(f"明年我 {age + 1} 歲")   # 大括號裡也可以算式`}</pre>
      <pre className="code-output">{`我叫 小華，今年 13 歲
明年我 14 歲`}</pre>
    </div>

    <div className="block">
      <h2>🌟 常用方法</h2>
      <pre className="code-block">{`s = "Hello Python"

print(len(s))          # 字串長度 → 12
print(s.upper())       # 變大寫 → HELLO PYTHON
print(s.lower())       # 變小寫 → hello python
print(s.replace("Hello", "Hi"))   # 取代
print("Python" in s)   # 有沒有包含 → True`}</pre>
    </div>

    <div className="block">
      <h2>🎮 試試看 ── 名字賀卡</h2>
      <Playground initialCode={`name = "Alex"
age = 14
hobby = "彈吉他"

print(f"=== 個人小卡 ===")
print(f"姓名： {name}")
print(f"年齡： {age}")
print(f"興趣： {hobby}")
print(f"名字長度： {len(name)} 個字母")
print(f"大寫名字： {name.upper()}")
print("=" * 18)`}/>
    </div>

    <Practice items={["把 \"hello world\" 變大寫並印出,長度多少?", "造變數 name 跟 age,用 f-string 印出「你好,XXX!明年你就 X 歲了」。", "用 * 印一條 30 個 = 的分隔線。"]}/>

    <Quiz q={`name = "Sam"  →  print(f"Hi, {name}!") 印出?`}
      opts={[`Hi, {name}!`, `Hi, Sam!`, `Hi, name!`, `錯誤`]}
      ans={1} explain="f-string 會把 {name} 換成 name 變數的值,所以印出 Hi, Sam!"/>
  </div>
);

// Ch6: input
const Ch6 = () => (
  <div>
    <div className="lesson-eyebrow"><span className="dot"></span>第 6 課 · Chapter 6</div>
    <h1 className="lesson-title">⌨️ 問使用者問題</h1>
    <div className="lesson-title-en">input()</div>
    <p className="lesson-intro">到目前為止程式都是「你寫死什麼,它就跑什麼」。<code>input()</code> 讓程式可以<strong>問使用者問題</strong>,把答案存起來再用。</p>

    <div className="block">
      <h2>🌟 基本用法</h2>
      <pre className="code-block">{`name = input("你叫什麼名字？ ")
print(f"嗨, {name}！很高興認識你 ✨")`}</pre>
      <div className="bubble-row" style={{ marginTop: 12 }}>
        <div className="bubble-avatar owl"><Owl size={56} mood="teach"/><span className="bubble-avatar-name">Py 老師</span></div>
        <div className="bubble owl">
          按執行後會跳出對話框,你輸入的東西會被存進 <code>name</code> 變數~
        </div>
      </div>
    </div>

    <div className="block warn">
      <h2>⚠️ 大坑:input() 永遠是字串!</h2>
      <pre className="code-block">{`age = input("幾歲？ ")
print(age + 1)   # ← 會出錯！`}</pre>
      <p>就算你輸入「15」,Python 拿到的是字串 <code>"15"</code> 不是數字 <code>15</code>。要算數就得轉:</p>
      <pre className="code-block">{`age = int(input("幾歲？ "))   # 用 int() 包起來
print(age + 1)   # 現在可以加了`}</pre>
      <p>小數用 <code>float()</code>,例如 <code>height = float(input("身高？ "))</code>。</p>
    </div>

    <div className="block">
      <h2>🎮 試試看 ── 簡單計算機</h2>
      <p>(執行後會跳出對話框讓你輸入。輸入兩個數字,看 Python 幫你加總)</p>
      <Playground initialCode={`a = int(input("第一個數字： "))
b = int(input("第二個數字： "))

print(f"{a} + {b} = {a + b}")
print(f"{a} × {b} = {a * b}")
print(f"{a} ÷ {b} = {a / b}")`}/>
    </div>

    <Practice items={["問使用者身高(m)和體重(kg),印出 BMI(記得轉 float)。", "問使用者今年幾歲,印「再 X 年就成年了」(成年=18)。", "問兩個數字,印出他們的平均(用 / 不是 //)。"]}/>

    <Quiz q={`x = input("?")  輸入 5,接下來 print(x * 2) 印出什麼?`}
      opts={["10", "55", "錯誤", "5 5"]}
      ans={1} explain={`input() 拿到的是字串 "5"。字串乘 2 = 重複兩次 = "55"。想要 10,要寫 int(x) * 2。`}/>
  </div>
);

// Ch7: if/else
const Ch7 = () => (
  <div>
    <div className="lesson-eyebrow"><span className="dot"></span>第 7 課 · Chapter 7</div>
    <h1 className="lesson-title">🤔 做決定</h1>
    <div className="lesson-title-en">If / Else</div>
    <p className="lesson-intro">電腦其實很笨,你不告訴它怎麼判斷,它就會傻傻地照順序跑。<code>if</code> 讓電腦學會「如果...就...」,程式才有了大腦。</p>

    <div className="block">
      <h2>🌟 第一個 if</h2>
      <div className="bubble-row">
        <div className="bubble-avatar owl"><Owl size={56} mood="teach"/><span className="bubble-avatar-name">Py 老師</span></div>
        <div className="bubble owl"><code>if 條件:</code> 後面記得加冒號,下一行要<strong>縮排</strong>(4 個空格)~</div>
      </div>
      <pre className="code-block">{`temperature = 32

if temperature > 28:
    print("好熱！要喝水 💧")`}</pre>
      <pre className="code-output">好熱！要喝水 💧</pre>

      <h3>🔀 加上 else</h3>
      <pre className="code-block">{`score = 55

if score >= 60:
    print("及格 🎉")
else:
    print("再加油 💪")`}</pre>

      <h3>🎚️ 多重判斷 elif</h3>
      <pre className="code-block">{`score = 85

if score >= 90:
    print("優秀 🌟")
elif score >= 60:
    print("及格 🎉")
else:
    print("再加油 💪")`}</pre>
      <pre className="code-output">及格 🎉</pre>
    </div>

    <div className="block">
      <h2>🎮 試試看 ── 天氣建議</h2>
      <Playground initialCode={`temperature = 30

if temperature >= 35:
    print("非常熱！躲冷氣房 🥵")
elif temperature >= 28:
    print("有點熱～記得喝水 💧")
elif temperature >= 20:
    print("天氣剛剛好 😊")
else:
    print("好冷！加件外套 🧥")`}/>
    </div>

    <div className="block tip">
      <h2>💡 比較符號 <span className="en">Comparison</span></h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 8 }}>
        {[
          { s: "==", n: "相等" }, { s: "!=", n: "不相等" },
          { s: ">", n: "大於" }, { s: "<", n: "小於" },
          { s: ">=", n: "大於等於" }, { s: "<=", n: "小於等於" },
        ].map(c => (
          <div key={c.s} style={{ background: "white", padding: 10, borderRadius: 10, textAlign: "center", border: "1px solid #fde68a" }}>
            <code style={{ fontSize: 16, fontWeight: 800 }}>{c.s}</code>
            <div style={{ fontSize: 12, color: "var(--fg-2)", marginTop: 2 }}>{c.n}</div>
          </div>
        ))}
      </div>
      <p style={{ marginTop: 12, fontSize: 13 }}>⚠️ <strong>新手最常錯</strong>:<code>=</code> 是「指定」,<code>==</code> 才是「比較相等」!</p>
    </div>

    <Practice items={["問使用者分數,印「優(90+)」、「甲(80+)」、「乙(70+)」、「丙(60+)」或「丁」。", "問使用者今天星期幾(1-7),印「平日」或「假日」。", "寫個猜大小:設一個答案,問使用者一次,告訴他太大、太小或猜中。"]}/>

    <Quiz q="判斷 score 是不是 100,要怎麼寫?"
      opts={[`if score = 100:`, `if score == 100:`, `if score === 100:`, `if score: 100`]}
      ans={1} explain="Python 用 == 比較。一個 = 是把東西放進變數,兩個 == 才是問「相等嗎?」"/>
  </div>
);

// Ch8: boolean logic
const Ch8 = () => (
  <div>
    <div className="lesson-eyebrow"><span className="dot"></span>第 8 課 · Chapter 8</div>
    <h1 className="lesson-title">🔀 邏輯運算</h1>
    <div className="lesson-title-en">and / or / not</div>
    <p className="lesson-intro">有時候條件不只一個 ── 要「<strong>同時</strong>大於 6 又小於 12」、或「<strong>其中一個</strong>是星期六或星期日」。Python 用 <code>and</code>、<code>or</code>、<code>not</code> 來組合條件。</p>

    <div className="block">
      <h2>🌟 三個關鍵字</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10 }}>
        {[
          { k: "and", n: "兩個都要對", ex: "x > 0 and x < 10" },
          { k: "or", n: "至少一個對就行", ex: "day == 6 or day == 7" },
          { k: "not", n: "把對的變錯、錯的變對", ex: "not is_raining" },
        ].map(o => (
          <div key={o.k} style={{ background: "white", padding: 12, borderRadius: 12, border: "1px solid #e5e7eb" }}>
            <code style={{ fontSize: 18, fontWeight: 800, color: "var(--indigo-700)" }}>{o.k}</code>
            <div style={{ fontSize: 13, color: "var(--fg-2)", marginTop: 4 }}>{o.n}</div>
            <code style={{ fontSize: 11, display: "block", marginTop: 6, color: "var(--fg-3)" }}>{o.ex}</code>
          </div>
        ))}
      </div>
    </div>

    <div className="block">
      <h2>🌟 真值表 <span className="en">Truth Table</span></h2>
      <pre className="code-block">{`print(True and True)   # True (都對)
print(True and False)  # False (一個錯就錯)
print(True or False)   # True (一個對就對)
print(False or False)  # False (兩個都錯才錯)
print(not True)        # False
print(not False)       # True`}</pre>
    </div>

    <div className="block">
      <h2>🌟 用 and 組合範圍判斷</h2>
      <pre className="code-block">{`age = 13

if age >= 13 and age <= 18:
    print("你是青少年 🧑")
else:
    print("你不在青少年範圍")`}</pre>
      <p>⚠️ 注意:不能寫成 <code>13 &lt;= age &lt;= 18</code>... 等等,Python 其實可以!這是 Python 少數允許的數學寫法,別的語言不行。</p>
    </div>

    <div className="block">
      <h2>🎮 試試看 ── 適合穿短袖嗎?</h2>
      <Playground initialCode={`temperature = 25
is_raining = False

# 三個都要滿足才適合穿短袖出門
if temperature >= 22 and temperature <= 30 and not is_raining:
    print("☀️ 適合穿短袖出門！")
else:
    print("🤔 換件衣服或帶傘吧")

# 改改數字、True/False 看看`}/>
    </div>

    <Practice items={["寫程式判斷一個數字是不是「介於 10 跟 20 之間的偶數」。", "問三個科目分數,只要三科都過 60 就印「全部及格」。", "寫閏年判斷:能被 4 整除但不能被 100 整除,或能被 400 整除。"]}/>

    <Quiz q="(True or False) and not False 等於?"
      opts={["True", "False", "錯誤", "None"]}
      ans={0} explain="(True or False) → True；not False → True；True and True → True。"/>
  </div>
);

window.Home = Home;
window.Ch1 = Ch1; window.Ch2 = Ch2; window.Ch3 = Ch3; window.Ch4 = Ch4;
window.Ch5 = Ch5; window.Ch6 = Ch6; window.Ch7 = Ch7; window.Ch8 = Ch8;
