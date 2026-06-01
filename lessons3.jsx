/* ============================================================
   Lesson content — Kids Python Academy
   Part 3: Ch17-Ch20 (OOP → File I/O → Integration → Your Game)
   ============================================================ */

// Ch17: OOP
const Ch17 = () => (
  <div>
    <div className="lesson-eyebrow"><span className="dot"></span>第 17 課 · Chapter 17</div>
    <h1 className="lesson-title">🧬 物件導向</h1>
    <div className="lesson-title-en">Classes & Objects</div>
    <p className="lesson-intro">前面學的變數、函式像「分散的工具」── 名字、年齡各自獨立。class 讓你把<strong>資料</strong>和<strong>動作</strong>包成一整個物件,例如造一隻「狗」,他有名字、品種,還會叫、會吃。</p>

    <div className="block">
      <h2>🌟 第一個 class</h2>
      <pre className="code-block">{`class Dog:
    def __init__(self, name, breed):
        self.name = name
        self.breed = breed

    def bark(self):
        print(f"{self.name} 說: 汪汪！")

# 造兩隻狗
d1 = Dog("旺旺", "柴犬")
d2 = Dog("Lucky", "黃金獵犬")

d1.bark()
d2.bark()
print(d1.name, "是", d1.breed)`}</pre>
      <pre className="code-output">{`旺旺 說: 汪汪！
Lucky 說: 汪汪！
旺旺 是 柴犬`}</pre>
    </div>

    <div className="block">
      <h2>🌟 四個關鍵字</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10, marginTop: 12 }}>
        {[
          { k: "class", n: "模板 / 設計圖", desc: "Dog 這個 class 描述「狗」要長什麼樣" },
          { k: "instance", n: "從模板造出來的實體", desc: "d1、d2 是兩隻具體的狗" },
          { k: "__init__", n: "建構子", desc: "造物件時自動跑,負責設定初始屬性" },
          { k: "self", n: "我自己這個物件", desc: "每個 method 第一個參數,代表「當下這隻狗」" },
        ].map(o => (
          <div key={o.k} style={{ background: "white", padding: 12, borderRadius: 12, border: "1px solid #e5e7eb" }}>
            <code style={{ fontSize: 14, fontWeight: 800, color: "var(--indigo-700)" }}>{o.k}</code>
            <div style={{ fontSize: 13, color: "var(--ink-warm)", fontWeight: 600, marginTop: 4 }}>{o.n}</div>
            <div style={{ fontSize: 11, color: "var(--fg-3)", marginTop: 4 }}>{o.desc}</div>
          </div>
        ))}
      </div>
    </div>

    <div className="block">
      <h2>🌟 為什麼用 class?</h2>
      <p>不用 class 也能寫,但東西散一地:</p>
      <pre className="code-block">{`# 不用 class 的寫法
dogs = [
    {"name": "旺旺", "breed": "柴犬"},
    {"name": "Lucky", "breed": "黃金獵犬"},
]

def bark(dog):
    print(f"{dog['name']} 說: 汪汪！")

bark(dogs[0])`}</pre>
      <p>能跑,但「資料」和「動作」是分開的,函式要把 dog 傳來傳去。如果有 10 個跟狗有關的動作,函式會散一地。class 把所有相關的東西<strong>裝進同一個盒子</strong>,管理輕鬆。</p>
    </div>

    <div className="block">
      <h2>🎮 試做 ── Student 類別</h2>
      <Playground rows={22} initialCode={`class Student:
    def __init__(self, name, age):
        self.name = name
        self.age = age
        self.scores = []

    def add_score(self, subject, score):
        self.scores.append((subject, score))

    def average(self):
        if not self.scores:
            return 0
        total = 0
        for subject, score in self.scores:
            total = total + score
        return total / len(self.scores)

    def report(self):
        print(f"== {self.name} ({self.age} 歲) ==")
        for subject, score in self.scores:
            print(f"  {subject}: {score}")
        print(f"  平均: {self.average():.1f}")

# 用看看
s = Student("小華", 13)
s.add_score("數學", 85)
s.add_score("英文", 92)
s.add_score("國文", 78)
s.report()`}/>
    </div>

    <div className="block tip">
      <h2>💡 進階預告 ── 繼承</h2>
      <p>class 還可以「<strong>繼承</strong>」── 一個新 class 繼承既有 class 的所有屬性與方法,再加上自己的:</p>
      <pre className="code-block">{`class Animal:
    def __init__(self, name):
        self.name = name
    def eat(self):
        print(f"{self.name} 在吃東西")

class Cat(Animal):                # 繼承 Animal
    def meow(self):
        print(f"{self.name}: 喵～")

c = Cat("Tom")
c.eat()    # 來自 Animal
c.meow()   # 來自 Cat`}</pre>
      <p>這個觀念之後寫大型程式或用 pygame 做遊戲時會超常用。</p>
    </div>

    <Practice items={["寫 Book 類別:書名、作者、頁數;加 describe() 印出書本描述。", "寫 Rectangle 類別:寬高;加 area() 跟 perimeter() method。", "寫 Counter 類別:可以 inc() 加一、dec() 減一、reset() 歸零、show() 印出目前值。"]}/>

    <Quiz q="__init__ 的作用是?"
      opts={["一般函式", "建構子,造物件時自動跑來初始化", "印 init 訊息", "結束物件用"]}
      ans={1} explain="__init__ 在你寫 Dog('旺旺', '柴犬') 造物件時自動執行,通常拿來設定 self.xxx 初始屬性。"/>
  </div>
);

// Ch18: File I/O
const Ch18 = () => (
  <div>
    <div className="lesson-eyebrow"><span className="dot"></span>第 18 課 · Chapter 18</div>
    <h1 className="lesson-title">📁 檔案 I/O</h1>
    <div className="lesson-title-en">File Input / Output</div>
    <p className="lesson-intro">程式結束,記憶體裡的變數就消失了。想把資料<strong>存下來</strong>下次再用?用 <code>open()</code> 把資料寫進檔案,下次讀回來就好。這是寫存檔、日記、設定檔的基礎。</p>

    <div className="block">
      <h2>🌟 寫入檔案</h2>
      <pre className="code-block">{`with open("notes.txt", "w") as f:
    f.write("這是第一行\\n")
    f.write("這是第二行\\n")`}</pre>
      <ul>
        <li><code>open("名字", "w")</code> 打開檔案,<code>"w"</code> 是 write 模式(沒檔案會自動建)</li>
        <li><code>with</code> 區塊結束會自動關檔(不會忘記 close)</li>
        <li><code>f.write()</code> 把字串寫進去</li>
        <li><code>\n</code> 是換行字元</li>
      </ul>
    </div>

    <div className="block">
      <h2>🌟 讀取檔案</h2>
      <p>方式 A ── 一次讀全部:</p>
      <pre className="code-block">{`with open("notes.txt", "r") as f:
    content = f.read()
    print(content)`}</pre>
      <p>方式 B ── 一行一行讀(檔案大時比較省記憶體):</p>
      <pre className="code-block">{`with open("notes.txt", "r") as f:
    for line in f:
        print(line.strip())   # strip() 去掉行尾換行`}</pre>
    </div>

    <div className="block">
      <h2>🌟 三種模式</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10, marginTop: 8 }}>
        {[
          { k: `"r"`, n: "read 讀取", desc: "預設;檔案不存在會錯" },
          { k: `"w"`, n: "write 覆蓋", desc: "⚠️ 原內容會被清空" },
          { k: `"a"`, n: "append 接在後面", desc: "保留原內容,只加新的" },
        ].map(m => (
          <div key={m.k} style={{ background: "white", padding: 12, borderRadius: 10, border: "1px solid #e5e7eb" }}>
            <code style={{ fontSize: 16, fontWeight: 800, color: "var(--indigo-700)" }}>{m.k}</code>
            <div style={{ fontSize: 13, fontWeight: 600, marginTop: 4 }}>{m.n}</div>
            <div style={{ fontSize: 11, color: "var(--fg-3)", marginTop: 4 }}>{m.desc}</div>
          </div>
        ))}
      </div>
    </div>

    <div className="block warn">
      <h2>⚠️ 沙箱限制</h2>
      <p>網頁裡的 Python(Skulpt)有自己的「虛擬硬碟」,你寫進去的檔案<strong>只活在這次執行</strong> ── 重新整理頁面就消失。語法跟真實 Python 一模一樣,要做永久存檔請拿到本機 Python 跑。</p>
    </div>

    <div className="block">
      <h2>🎮 試做 ── 寫日記、讀回來、追加</h2>
      <Playground rows={20} initialCode={`# 1. 寫入(會建立新檔)
with open("diary.txt", "w") as f:
    f.write("2026/06/01 今天學了檔案 I/O\\n")
    f.write("覺得有點難但很實用\\n")
    f.write("明天繼續加油！\\n")
print("✅ 寫入完成")

# 2. 讀回來
print("\\n--- 日記內容 ---")
with open("diary.txt", "r") as f:
    print(f.read())

# 3. 追加新內容(不會洗掉舊的)
with open("diary.txt", "a") as f:
    f.write("(補) 真的還算簡單嘛！\\n")

# 4. 再讀一次看追加結果
print("--- 追加後,一行一行印 ---")
with open("diary.txt", "r") as f:
    for i, line in enumerate(f, 1):
        print(f"{i}: {line.strip()}")`}/>
    </div>

    <div className="block tip">
      <h2>💡 實用場景</h2>
      <ul>
        <li><strong>遊戲存檔</strong>:把分數、關卡寫進檔案,下次玩接著用</li>
        <li><strong>設定檔</strong>:把使用者偏好(顏色、難度)存起來</li>
        <li><strong>讀資料</strong>:處理 csv、txt 之類的資料檔</li>
        <li><strong>日誌</strong>:用 <code>"a"</code> 模式持續記錄程式發生了什麼</li>
      </ul>
      <p>更進階的版本會用 <code>json</code> 模組存「結構化資料」(像 dict 一整個存下來),那是下一階段的學習重點。</p>
    </div>

    <Practice items={["把使用者輸入的 5 樣物品存到 shopping.txt,然後讀回來印出。", "用 \"a\" 模式寫日記:每次執行就追加一行,然後讀全部出來。", "讀一個檔案,計算總共有幾行、幾個非空白字元。"]}/>

    <Quiz q={`open("a.txt", "w") 跟 open("a.txt", "a") 差別在?`}
      opts={[
        "完全一樣",
        `"w" 覆蓋舊內容、"a" 接在後面`,
        `"w" 比較快`,
        `"a" 只能讀`
      ]}
      ans={1} explain={`"w" (write) 開檔會先清空舊內容;"a" (append) 保留舊的,新東西寫在後面。`}/>
  </div>
);

// Ch19: Integration — Guessing Game
const Ch19 = () => (
  <div>
    <div className="lesson-eyebrow"><span className="dot"></span>第 19 課 · Chapter 19</div>
    <h1 className="lesson-title">🎯 整合範例:猜數字遊戲</h1>
    <div className="lesson-title-en">Putting It All Together: Number Guessing</div>
    <p className="lesson-intro">學了 18 章工具,該<strong>把它們串起來做點東西</strong>。這一章從零打造「猜數字」── 一個經典程式入門遊戲,把 random、while、input、int、if、函式、try/except 全部用上。</p>

    <div className="block">
      <h2>🎯 遊戲規則</h2>
      <ol>
        <li>電腦想一個 1~100 的數字</li>
        <li>玩家猜一個</li>
        <li>電腦回答「太大」、「太小」或「賓果」</li>
        <li>猜對為止,並回報猜了幾次</li>
      </ol>
    </div>

    <div className="block">
      <h2>📐 設計思考 ── 先拆解</h2>
      <p>看到需求,先問:「這需要哪些工具?」</p>
      <ul>
        <li>電腦想一個數字 → <code>random.randint(1, 100)</code>(Ch15)</li>
        <li>重複猜到對為止 → <code>while True:</code>(Ch10)</li>
        <li>接玩家輸入 → <code>input()</code>(Ch6)</li>
        <li>字串轉數字 → <code>int(...)</code>(Ch3),可能會錯 → <code>try/except</code>(Ch14)</li>
        <li>比大小、給提示 → <code>if/elif/else</code>(Ch7)</li>
        <li>計算次數 → 變數 counter(Ch2)</li>
        <li>猜對結束迴圈 → <code>break</code>(Ch10)</li>
      </ul>
      <p>幾乎前 16 章全用到!這就是真實寫程式的樣子 ── <strong>把多個工具組合起來</strong>。</p>
    </div>

    <div className="block">
      <h2>📝 v1 ── 最基本版</h2>
      <p>先求「能跑」,完全不管錯誤情況:</p>
      <Playground rows={14} initialCode={`import random

answer = random.randint(1, 100)

while True:
    guess = int(input("猜一個 1-100 的數字： "))

    if guess < answer:
        print("太小！")
    elif guess > answer:
        print("太大！")
    else:
        print("🎉 賓果！")
        break`}/>
      <p>可以玩了!但有兩個小問題:① 沒計算次數 ② 輸入「abc」會直接當掉</p>
    </div>

    <div className="block">
      <h2>📝 v2 ── 加上計分與錯誤處理</h2>
      <Playground rows={26} initialCode={`import random

answer = random.randint(1, 100)
attempts = 0

print("=== 猜數字遊戲 ===")
print("我想了一個 1-100 的數字,你來猜！")

while True:
    try:
        guess = int(input(f"\\n第 {attempts + 1} 次,請猜: "))
    except ValueError:
        print("⚠️ 那不是數字,再試一次")
        continue

    attempts = attempts + 1

    if guess < answer:
        print(f"  太小! ({guess} < 答案)")
    elif guess > answer:
        print(f"  太大! ({guess} > 答案)")
    else:
        print(f"\\n🎉 賓果！答案就是 {answer}")
        print(f"你猜了 {attempts} 次")
        break`}/>
      <p>v2 新增的東西:</p>
      <ul>
        <li><code>try / except ValueError</code> ── 接住「打了 abc」這種錯誤</li>
        <li><code>continue</code> ── 跳回 while 開頭,不增加次數</li>
        <li><code>attempts</code> 變數計次</li>
        <li>用 f-string 顯示動態提示</li>
      </ul>
    </div>

    <div className="block">
      <h2>📝 v3 ── 函式 + 更聰明的提示</h2>
      <p>除了「太大太小」,還能告訴玩家「超級接近!」、「冷冰冰」。用函式把提示邏輯包起來,主程式更乾淨:</p>
      <Playground rows={36} initialCode={`import random

def hint(guess, answer):
    """根據差距給溫度提示"""
    diff = abs(guess - answer)
    if diff == 0:
        return "🎉 賓果"
    elif diff <= 3:
        return "🔥 超級接近"
    elif diff <= 10:
        return "♨️ 很熱"
    elif diff <= 25:
        return "🌤️ 還可以"
    else:
        return "❄️ 冷冰冰"

answer = random.randint(1, 100)
attempts = 0
max_attempts = 7

print(f"=== 猜數字 (最多 {max_attempts} 次) ===")

while attempts < max_attempts:
    try:
        guess = int(input(f"\\n剩 {max_attempts - attempts} 次,請猜: "))
    except ValueError:
        print("⚠️ 那不是數字")
        continue

    attempts = attempts + 1
    h = hint(guess, answer)

    if guess == answer:
        print(f"\\n{h}！答案就是 {answer},你用了 {attempts} 次 🏆")
        break

    direction = "↑ 大了" if guess > answer else "↓ 小了"
    print(f"  {h}  {direction}")
else:
    print(f"\\n💀 次數用完,答案是 {answer}")`}/>
      <p>v3 用到的新觀念:</p>
      <ul>
        <li><strong>把邏輯包成函式</strong>(<code>hint(...)</code>),主流程更乾淨</li>
        <li><code>abs()</code> 取絕對值,不管誰大誰小都算差距</li>
        <li><strong>while 配 else</strong>:迴圈跑完沒 break 才執行 else,這裡是「次數用完」</li>
        <li><strong>三元運算式</strong>:<code>x if 條件 else y</code> ── 一行 if/else</li>
      </ul>
    </div>

    <Practice items={["加「歷史紀錄」:把所有猜過的數字存 list,結束時印出來。", "改成「兩人對戰」── 一人想數字(用 input 偷偷輸入)另一人猜。", "加計分:用越少次猜中分數越高(例如 100 - 次數 × 5)。"]}/>

    <div className="bubble-row" style={{ marginTop: 24 }}>
      <div className="bubble-avatar owl"><Owl size={56} mood="teach"/><span className="bubble-avatar-name">Py 老師</span></div>
      <div className="bubble owl">
        看到了嗎?從 v1 一直加強到 v3,每一步只解決一個小問題。<strong>這就是寫程式</strong>:先求「能跑」,再求「好用」,最後求「漂亮」。下一章換你動手!
      </div>
    </div>
  </div>
);

// Ch20: Design Your Own Game
const Ch20 = () => (
  <div>
    <div className="lesson-eyebrow"><span className="dot"></span>第 20 課 · Chapter 20</div>
    <h1 className="lesson-title">🎮 設計你的遊戲</h1>
    <div className="lesson-title-en">Design Your Own Game</div>
    <p className="lesson-intro">學了 19 章,該<strong>你發揮了</strong>!這裡有 3 個遊戲起手稿,每個都能跑,你可以原樣玩、改規則、加功能,或者完全重寫成自己的版本。</p>

    <div className="block warn">
      <h2>🚫 為什麼沒有俄羅斯方塊?</h2>
      <p>Tetris 需要兩件這個沙箱<strong>做不到</strong>的事:</p>
      <ul>
        <li><strong>即時鍵盤輸入</strong> ── 玩家按鍵立刻反應,不能用 input() 卡著等</li>
        <li><strong>動畫迴圈</strong> ── 每秒重畫螢幕 30~60 次</li>
      </ul>
      <p>想做 Tetris 等真實動作遊戲,要本機安裝 Python + <code>pygame</code>(或 pygame zero / arcade / pyxel)。沙箱版只能做<strong>回合制 / 文字型</strong>遊戲 ── 不過下面 3 個玩起來其實也很有趣!</p>
    </div>

    <div className="block">
      <h2>🎮 起手稿 1:剪刀石頭布</h2>
      <p>用了:<code>random</code>、<code>input</code>、<code>if/elif</code>、<code>while</code>、計分、dict</p>
      <Playground rows={30} initialCode={`import random

CHOICES = ["✊ 石頭", "✋ 布", "✌️ 剪刀"]
# 誰贏誰 (key 贏 value)：石頭(0)贏剪刀(2)、布(1)贏石頭(0)、剪刀(2)贏布(1)
WINS = {0: 2, 1: 0, 2: 1}

player_score = 0
computer_score = 0

print("=== 剪刀石頭布 (3 戰 2 勝) ===")

while player_score < 2 and computer_score < 2:
    print("\\n0=石頭, 1=布, 2=剪刀")
    try:
        p = int(input("你出: "))
        if p not in [0, 1, 2]:
            print("請輸入 0、1、2")
            continue
    except ValueError:
        continue

    c = random.randint(0, 2)
    print(f"你 {CHOICES[p]} vs 電腦 {CHOICES[c]}")

    if p == c:
        print("→ 平手")
    elif WINS[p] == c:
        print("→ 🎉 你贏!")
        player_score = player_score + 1
    else:
        print("→ 😅 電腦贏")
        computer_score = computer_score + 1

    print(f"目前比分: 你 {player_score} : {computer_score} 電腦")

if player_score == 2:
    print("\\n🏆 你獲勝！")
else:
    print("\\n💀 電腦獲勝，再戰！")`}/>
      <p><strong>挑戰:</strong> ① 改成 5 戰 3 勝 &nbsp; ② 多加「蜥蜴」與「Spock」(進階剪刀石頭布)&nbsp; ③ 紀錄歷史出招,讓電腦學會「對手最常出什麼」</p>
    </div>

    <div className="block">
      <h2>🎮 起手稿 2:Hangman 猜字遊戲</h2>
      <p>用了:<code>list</code>、字串、<code>set</code>、<code>while</code>、<code>for</code> 推導式</p>
      <Playground rows={34} initialCode={`import random

WORDS = ["python", "banana", "school", "rocket", "panda", "music",
         "guitar", "rainbow", "dragon", "pizza"]

word = random.choice(WORDS)
guessed = set()           # 已猜過的字母
lives = 6

print("=== 猜字遊戲 ===")
print(f"題目有 {len(word)} 個字母")

while lives > 0:
    # 顯示目前狀態：猜到的字母露出來,沒猜到的是底線
    display = " ".join([c if c in guessed else "_" for c in word])
    print(f"\\n{display}   (剩 {lives} 條命)")

    if "_" not in display:
        print(f"\\n🎉 全部猜對！答案是 {word}")
        break

    letter = input("猜一個字母: ").lower()
    if len(letter) != 1:
        print("一次只能猜一個字母")
        continue
    if letter in guessed:
        print(f"'{letter}' 猜過了,換一個")
        continue

    guessed.add(letter)
    if letter in word:
        print(f"✓ 有 '{letter}'")
    else:
        lives = lives - 1
        print(f"✗ 沒有 '{letter}'")
else:
    print(f"\\n💀 命用完了,答案是 {word}")`}/>
      <p><strong>挑戰:</strong> ① 自己加更多單字 &nbsp; ② 讓玩家也能猜「整個單字」直接破關 &nbsp; ③ 用 ASCII 畫出吊人圖逐步出現</p>
    </div>

    <div className="block">
      <h2>🎮 起手稿 3:井字棋(兩人對戰)</h2>
      <p>用了:<code>list</code>、<code>function</code>、巢狀 <code>for</code>、判斷勝負邏輯</p>
      <Playground rows={44} initialCode={`board = [" "] * 9

def show():
    print(f"\\n {board[0]} | {board[1]} | {board[2]} ")
    print("---+---+---")
    print(f" {board[3]} | {board[4]} | {board[5]} ")
    print("---+---+---")
    print(f" {board[6]} | {board[7]} | {board[8]} ")

def check_win(p):
    lines = [
        (0,1,2), (3,4,5), (6,7,8),   # 三條橫
        (0,3,6), (1,4,7), (2,5,8),   # 三條直
        (0,4,8), (2,4,6),            # 兩條斜
    ]
    for a, b, c in lines:
        if board[a] == p and board[b] == p and board[c] == p:
            return True
    return False

print("=== 井字棋 (X 先手) ===")
print("位置編號:")
print(" 0 | 1 | 2 \\n---+---+---\\n 3 | 4 | 5 \\n---+---+---\\n 6 | 7 | 8 ")

current = "X"
moves = 0
while moves < 9:
    show()
    try:
        pos = int(input(f"\\n玩家 {current},選位置 (0-8): "))
    except ValueError:
        print("請輸入數字")
        continue

    if pos < 0 or pos > 8 or board[pos] != " ":
        print("不能放這裡")
        continue

    board[pos] = current
    moves = moves + 1

    if check_win(current):
        show()
        print(f"\\n🎉 玩家 {current} 贏了！")
        break

    current = "O" if current == "X" else "X"
else:
    show()
    print("\\n平手！")`}/>
      <p><strong>挑戰:</strong> ① 寫 <code>computer_move()</code> 函式讓電腦當對手(先用 <code>random.choice</code> 從空格亂選) &nbsp; ② 進階用 <strong>minimax 演算法</strong>做不敗 AI &nbsp; ③ 改成 5×5 五子棋</p>
    </div>

    <div className="block tip">
      <h2>💡 更多遊戲點子(沙箱可做)</h2>
      <ul>
        <li><strong>21 點 Blackjack</strong>:抽牌(random)、判爆牌(if)、停牌策略</li>
        <li><strong>數學練習機</strong>:random 出題、計時、計分、難度遞增</li>
        <li><strong>文字冒險</strong>:dict 存「地點 → 描述 + 出口」,while 跑探索</li>
        <li><strong>密碼產生器</strong>:從字母+數字+符號隨機抽,len 控長度</li>
        <li><strong>單字背誦</strong>:dict 存中英對照,random.choice 出題,計分</li>
        <li><strong>BMI / 卡路里計算機</strong>:函式包邏輯,迴圈反覆問</li>
        <li><strong>故事生成器</strong>:Mad Libs 風,從 list 抽詞填進句子</li>
        <li><strong>記憶力遊戲</strong>:印一串數字、消失、要玩家複述</li>
      </ul>
    </div>

    <div className="block">
      <h2>📝 你的遊戲從這裡開始</h2>
      <p>上面挑一個有興趣的點子,試著寫(下面是個小起頭,可以全砍掉重寫):</p>
      <Playground rows={20} initialCode={`# 你的遊戲從這裡開始
# 提示:① 先想規則 ② 決定要用哪些工具 ③ 一行一行寫,先求能跑

import random

# 範例:簡單數學練習(自己擴充成完整版!)
print("=== 數學練習 ===")
score = 0
total = 5

for round in range(total):
    a = random.randint(1, 20)
    b = random.randint(1, 20)
    ans = a + b

    try:
        guess = int(input(f"\\n第 {round + 1} 題: {a} + {b} = "))
    except ValueError:
        print("不是數字,跳過")
        continue

    if guess == ans:
        print("✓ 答對！")
        score = score + 1
    else:
        print(f"✗ 答錯,正確答案是 {ans}")

print(f"\\n你答對 {score}/{total} 題")
if score == total:
    print("🏆 滿分！")`}/>
    </div>

    <Practice items={["把剪刀石頭布加「蜥蜴」與「Spock」變成 5 選 1 進階版。", "Hangman 用 ASCII 逐步畫出吊人圖(命越少圖越完整)。", "井字棋加一個 random.choice 簡單 AI 電腦對手(從空格亂選)。"]}/>

    <div className="bubble-row" style={{ marginTop: 24 }}>
      <div className="bubble-avatar owl"><Owl size={56} mood="teach"/><span className="bubble-avatar-name">Py 老師</span></div>
      <div className="bubble owl">
        🎓 <strong>20 章全部學完了,結業!</strong>從 print 一路到自己設計遊戲,你已經有寫程式的基本功了。
        <br/><br/>
        記住:程式設計不是背語法,是<strong>把問題拆小、一塊一塊解決</strong>。寫不出來很正常 ── 把它拆成更小的問題,再拆,直到每一步都簡單到能寫出來。
        <br/><br/>
        想再進一步?裝本機 Python + VS Code,試試 <code>pygame</code> 做動作遊戲、<code>requests</code> 寫網路爬蟲、<code>pandas</code> 做資料分析,世界很大,Python 帶你飛 🦉
      </div>
    </div>
  </div>
);

window.Ch17 = Ch17; window.Ch18 = Ch18; window.Ch19 = Ch19; window.Ch20 = Ch20;
