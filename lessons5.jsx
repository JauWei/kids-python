/* ============================================================
   Lesson content — Kids Python Academy
   Part 5: Ch23-Ch29 (進階語法 + 除錯 + 三個實作專案)
   ============================================================ */

// Ch23: list 推導式
const Ch23 = () => (
  <div>
    <div className="lesson-eyebrow"><span className="dot"></span>第 23 課 · Chapter 23</div>
    <h1 className="lesson-title">⚡ list 推導式</h1>
    <div className="lesson-title-en">List Comprehension</div>
    <p className="lesson-intro">想「把每個元素變換一下」變新的 list?用 for + append 寫要 3 行。Python 提供更短的寫法 ── <strong>推導式</strong>,一行解決!</p>

    <div className="block">
      <h2>🌟 from 3 行 to 1 行</h2>
      <p>傳統寫法:</p>
      <pre className="code-block">{`nums = [1, 2, 3, 4, 5]
doubled = []
for x in nums:
    doubled.append(x * 2)
print(doubled)   # [2, 4, 6, 8, 10]`}</pre>
      <p>推導式版:</p>
      <pre className="code-block">{`nums = [1, 2, 3, 4, 5]
doubled = [x * 2 for x in nums]
print(doubled)   # [2, 4, 6, 8, 10]`}</pre>
      <p>結構:<code>[新元素 for 變數 in 來源]</code> ── 中括號裡有 for,就是推導式。</p>
    </div>

    <div className="block">
      <h2>🌟 加條件</h2>
      <p>只挑符合條件的:</p>
      <pre className="code-block">{`nums = [1, 2, 3, 4, 5, 6, 7, 8]
evens = [x for x in nums if x % 2 == 0]
print(evens)   # [2, 4, 6, 8]

squares = [x * x for x in range(1, 11) if x % 2 == 1]
print(squares)   # [1, 9, 25, 49, 81]  (奇數的平方)`}</pre>
      <p>結構:<code>[新元素 for 變數 in 來源 if 條件]</code></p>
    </div>

    <div className="block">
      <h2>🎮 試試看 ── 改成推導式</h2>
      <Playground rows={14} initialCode={`# 原本的傳統寫法
words = ["python", "is", "fun"]
upper_words = []
for w in words:
    upper_words.append(w.upper())
print(upper_words)

# 改成推導式
upper_words2 = [w.upper() for w in words]
print(upper_words2)

# 試試:用推導式造出 0-20 之間 3 的倍數
threes = [x for x in range(21) if x % 3 == 0]
print(threes)`}/>
    </div>

    <div className="block tip">
      <h2>💡 dict 也有推導式</h2>
      <pre className="code-block">{`names = ["小明", "小華", "阿仁"]
ages = [12, 13, 14]

# 把兩個 list 合成 dict
people = {n: a for n, a in zip(names, ages)}
print(people)   # {'小明': 12, '小華': 13, '阿仁': 14}`}</pre>
      <p>結構:<code>{`{key: value for ... in ...}`}</code> ── 中括號改大括號。</p>
    </div>

    <Practice items={[
      "用推導式把 [\"hi\", \"hello\", \"hey\"] 變成大寫的新 list。",
      "用推導式從 1-50 找出所有「平方後個位數是 5」的數字(提示:x*x % 10 == 5)。",
      "造一個 dict 把 1-5 對應到他們的平方(用推導式)。"
    ]}/>

    <Quiz q="[x*2 for x in [1,2,3]] 的結果是?"
      opts={["[1,2,3]", "[2,4,6]", "[1,4,9]", "錯誤"]}
      ans={1} explain="把每個元素 x 乘 2,得到 [2, 4, 6]。"/>
  </div>
);

// Ch24: lambda + sorted key + filter/map
const Ch24 = () => (
  <div>
    <div className="lesson-eyebrow"><span className="dot"></span>第 24 課 · Chapter 24</div>
    <h1 className="lesson-title">🪄 lambda + sorted</h1>
    <div className="lesson-title-en">Lambda & sorted key</div>
    <p className="lesson-intro">有時候只需要一個<strong>小到不行的函式</strong>(就一行算式),用 def 太囉嗦。<code>lambda</code> 是「一行函式」── 而且可以當參數傳給別的函式!</p>

    <div className="block">
      <h2>🌟 lambda 基本</h2>
      <pre className="code-block">{`# 傳統寫法
def double(x):
    return x * 2

# lambda 寫法
double = lambda x: x * 2

print(double(5))   # 10 (兩種寫法效果一樣)`}</pre>
      <p>結構:<code>lambda 參數: 算式</code>。沒有 return,算式的結果就是回傳值。</p>
    </div>

    <div className="block">
      <h2>🌟 lambda 真正威力 ── 當參數傳</h2>
      <p>用 sorted 排序時,可以傳一個 <code>key</code> 函式告訴 Python 「<strong>用什麼當排序依據</strong>」:</p>
      <pre className="code-block">{`students = [
    {"name": "小華", "score": 85},
    {"name": "小明", "score": 92},
    {"name": "阿仁", "score": 78},
]

# 用分數排序
by_score = sorted(students, key=lambda s: s["score"])
for s in by_score:
    print(s["name"], s["score"])
# 阿仁 78
# 小華 85
# 小明 92

# 由高到低
top = sorted(students, key=lambda s: -s["score"])
# 或 reverse=True
top = sorted(students, key=lambda s: s["score"], reverse=True)`}</pre>
    </div>

    <div className="block">
      <h2>🌟 filter / map ── 一行做事</h2>
      <pre className="code-block">{`nums = [1, 2, 3, 4, 5, 6]

# filter:只留下符合條件的
evens = list(filter(lambda x: x % 2 == 0, nums))
print(evens)   # [2, 4, 6]

# map:每個都套用函式
squares = list(map(lambda x: x * x, nums))
print(squares)   # [1, 4, 9, 16, 25, 36]`}</pre>
      <p>多數情況推導式更直覺(<code>[x*x for x in nums]</code>),但配 lambda 也很常見,看到知道是什麼意思。</p>
    </div>

    <div className="block">
      <h2>🎮 試試看 ── 字串長度排序</h2>
      <Playground rows={16} initialCode={`words = ["python", "go", "java", "ruby", "javascript", "rust"]

# 用 lambda 抓字串長度當排序鍵
by_length = sorted(words, key=lambda w: len(w))
print("從短到長:", by_length)

by_length_desc = sorted(words, key=len, reverse=True)
print("從長到短:", by_length_desc)
# 注意：上面 key=len 也可以,因為 len 本身就是函式

# 試試:依「最後一個字母」排序
by_last = sorted(words, key=lambda w: w[-1])
print("依尾字母:", by_last)`}/>
    </div>

    <Practice items={[
      "造一個 list of dict 記錄 5 個朋友的「名字 + 身高」,用 sorted + lambda 依身高排。",
      "把 [\"Apple\", \"banana\", \"Cherry\"] 用 lambda 不分大小寫排序(提示:key=lambda x: x.lower())。",
      "用 filter + lambda 從 1-50 抽出所有 3 的倍數;再用推導式寫一次,比較哪個直覺。"
    ]}/>

    <Quiz q="lambda 跟 def 最大差別是?"
      opts={[
        "lambda 比較快",
        "lambda 只能寫一行算式,當作小工具或參數很方便",
        "def 已經被淘汰",
        "lambda 不能傳參數"
      ]}
      ans={1} explain="lambda 是匿名的「一行函式」,適合當參數傳給 sorted / filter / map。複雜邏輯還是用 def。"/>
  </div>
);

// Ch25: JSON
const Ch25 = () => (
  <div>
    <div className="lesson-eyebrow"><span className="dot"></span>第 25 課 · Chapter 25</div>
    <h1 className="lesson-title">📦 JSON 結構化資料</h1>
    <div className="lesson-title-en">JSON Module</div>
    <p className="lesson-intro">Ch18 學了寫字串到檔案,但如果想存的是 <strong>整個 dict</strong>(像遊戲存檔、設定檔)?用 <code>json</code> 模組 ── 把 Python 資料變字串、字串變回資料,完美保存結構。</p>

    <div className="block">
      <h2>🌟 dict ⇄ JSON 字串</h2>
      <pre className="code-block">{`import json

# Python dict → JSON 字串
data = {"name": "小華", "age": 13, "skills": ["Python", "Scratch"]}
s = json.dumps(data, ensure_ascii=False)
print(s)
# {"name": "小華", "age": 13, "skills": ["Python", "Scratch"]}

# JSON 字串 → Python dict
back = json.loads(s)
print(back["name"])    # 小華
print(back["skills"])  # ['Python', 'Scratch']`}</pre>
      <ul>
        <li><code>json.dumps()</code> = dump string,把 Python 資料變成字串</li>
        <li><code>json.loads()</code> = load string,字串解析回 Python 資料</li>
        <li><code>ensure_ascii=False</code> 讓中文不被變成 <code>\uXXXX</code> 編碼</li>
      </ul>
    </div>

    <div className="block">
      <h2>🌟 配檔案 I/O ── 真正的存檔</h2>
      <pre className="code-block">{`import json

# 存:dict → 檔案
save_data = {
    "player": "小英雄",
    "level": 5,
    "hp": 100,
    "inventory": ["sword", "potion", "key"]
}
with open("save.json", "w") as f:
    json.dump(save_data, f, ensure_ascii=False, indent=2)
print("✅ 存檔完成")

# 讀:檔案 → dict
with open("save.json", "r") as f:
    loaded = json.load(f)
print(loaded)
print(f"角色 {loaded['player']} 等級 {loaded['level']}")`}</pre>
      <p>注意:<code>json.dump</code>(沒 s)直接寫進檔案,<code>json.dumps</code>(有 s)是「轉成字串」── 差一個字母。</p>
    </div>

    <div className="block">
      <h2>🎮 試試看 ── 遊戲存讀檔</h2>
      <Playground rows={28} initialCode={`import json

# 1. 建立角色
hero = {
    "name": "Pythonia",
    "level": 1,
    "hp": 50,
    "items": ["wooden_sword"]
}

# 2. 存進 save.json
with open("save.json", "w") as f:
    json.dump(hero, f, ensure_ascii=False, indent=2)
print("✅ 存了等級 1 的角色\\n")

# 3. 模擬升級
hero["level"] = 5
hero["hp"] = 200
hero["items"].append("magic_potion")

with open("save.json", "w") as f:
    json.dump(hero, f, ensure_ascii=False, indent=2)
print("✅ 升級到 5 並存檔\\n")

# 4. 假裝關掉遊戲後重新讀檔
with open("save.json", "r") as f:
    loaded = json.load(f)

print("=== 讀取存檔 ===")
print(f"名字: {loaded['name']}")
print(f"等級: {loaded['level']}")
print(f"HP:   {loaded['hp']}")
print(f"道具: {loaded['items']}")`}/>
    </div>

    <div className="block tip">
      <h2>💡 JSON 是「跨語言」的</h2>
      <p>JSON 不只 Python 用,JavaScript、Java、C++、幾乎所有語言都讀得懂。你存的 save.json 拿到別的程式裡也能讀。網路 API 大多用 JSON 傳資料,所以這是進階學習很重要的一塊。</p>
    </div>

    <Practice items={[
      "造一個 dict 存你的個人資料(名字、年齡、興趣 list),存到 me.json 並讀回來印。",
      "升級 Ch27 待辦清單,讓清單用 JSON 存檔,每次開啟自動載入之前的資料。",
      "故意把 save.json 改壞(例如刪一個逗號),看 json.load 會丟什麼錯,再用 try/except 接住。"
    ]}/>

    <Quiz q="json.dumps 跟 json.dump 差在?"
      opts={[
        "完全一樣",
        "dumps 把資料變字串回傳;dump 直接寫進檔案",
        "dumps 比較快",
        "dump 只能存 list"
      ]}
      ans={1} explain="多一個 s 就是 string ── dumps 給你字串,dump 直接寫檔。loads/load 同理。"/>
  </div>
);

// Ch26: Debug Practice
const Ch26 = () => (
  <div>
    <div className="lesson-eyebrow"><span className="dot"></span>第 26 課 · Chapter 26</div>
    <h1 className="lesson-title">🔧 除錯實戰</h1>
    <div className="lesson-title-en">Debugging Practice</div>
    <p className="lesson-intro">寫程式不是「一次寫對」,而是「<strong>不斷找 bug 修</strong>」。這一章給你 5 段壞掉的程式,你來當醫生,找出問題並修好它!</p>

    <div className="block tip">
      <h2>🩺 除錯三大武器</h2>
      <ol>
        <li><strong>看錯誤訊息</strong>:Python 會告訴你<strong>哪一行錯</strong>跟<strong>什麼錯</strong>(本網站還會中文翻譯)</li>
        <li><strong>用 print 看變數</strong>:不確定某個變數是什麼?印出來看</li>
        <li><strong>把可疑那段註解掉</strong>:用 <code>#</code> 暫時關掉一段,確認是哪段在搗蛋</li>
      </ol>
    </div>

    <div className="block">
      <h2>🐛 Bug 1:NameError</h2>
      <p>這段想印「Hello, 小華!」但跑不起來,找出 bug:</p>
      <Playground rows={8} initialCode={`name = "小華"
greeting = "Hello, "
print(greeting + nme + "!")
# 提示：仔細看變數名稱`}/>
      <p>👉 拖到下方提示 → <em>nme 拼錯了,應該是 name</em></p>
    </div>

    <div className="block">
      <h2>🐛 Bug 2:IndentationError</h2>
      <Playground rows={10} initialCode={`age = 15
if age >= 13:
print("你是青少年")
else:
print("你還是兒童")

# 提示：if/else 後面的 print 要不要縮排?`}/>
      <p>👉 <em>if/else 後面那行要縮 4 個空格</em></p>
    </div>

    <div className="block">
      <h2>🐛 Bug 3:TypeError</h2>
      <Playground rows={8} initialCode={`age = input("幾歲? ")
print("明年你 " + age + 1 + " 歲")

# 提示：input() 拿到的型別?`}/>
      <p>👉 <em>input() 永遠是字串,要 int(age) 才能 +1;且 +1 後得 str() 才能再串接</em></p>
    </div>

    <div className="block">
      <h2>🐛 Bug 4:邏輯錯(不會報錯但結果不對)</h2>
      <Playground rows={14} initialCode={`# 想找出 1-20 裡的所有偶數,但結果空空的
nums = []
for i in range(1, 21):
    if i % 2 == 1:    # ← 哪裡邏輯反了?
        nums.append(i)
print("偶數:", nums)
# 提示：「i 除以 2 餘 1」是什麼?`}/>
      <p>👉 <em>i % 2 == 1 是奇數,偶數要寫 i % 2 == 0</em></p>
    </div>

    <div className="block">
      <h2>🐛 Bug 5:無窮迴圈</h2>
      <Playground rows={10} initialCode={`# 倒數到 0 結束,但執行後會卡很久才被中斷...
n = 10
while n > 0:
    print(n)
    # 提示：少了什麼,讓 n 永遠 = 10?`}/>
      <p>👉 <em>忘了讓 n 減 1!加 <code>n = n - 1</code></em></p>
    </div>

    <Practice items={[
      "把 Bug 1~5 都修好讓它能跑(不要看提示先嘗試)。",
      "故意寫 5 段壞掉的程式給朋友/同學修,當「出題官」也是學習的一部分。",
      "下次寫程式遇到錯時,先深呼吸,把錯誤訊息<strong>逐字讀完</strong>,8 成 bug 訊息就直接告訴你答案了。"
    ]}/>

    <Quiz q="遇到不確定的變數,最快的除錯技巧是?"
      opts={[
        "重寫整個程式",
        "用 print(變數) 把它的值印出來看",
        "丟到 Google 搜尋",
        "重啟電腦"
      ]}
      ans={1} explain="把可疑變數 print() 出來看是 99% 的工程師日常 ── 簡單但威力強大。"/>
  </div>
);

// Ch27: Todo List CLI
const Ch27 = () => (
  <div>
    <div className="lesson-eyebrow"><span className="dot"></span>第 27 課 · Chapter 27</div>
    <h1 className="lesson-title">📝 實作:待辦清單</h1>
    <div className="lesson-title-en">Project: Todo List</div>
    <p className="lesson-intro">用前面學的工具做出真正能用的小 app ── 待辦清單。可以新增、刪除、標記完成,還用 JSON 自動存檔,下次打開接著用。</p>

    <div className="block">
      <h2>🎯 規格</h2>
      <ul>
        <li>輸入指令:<code>add</code> 加項目、<code>list</code> 看清單、<code>done N</code> 標完成、<code>del N</code> 刪除、<code>quit</code> 退出</li>
        <li>用 <strong>list of dict</strong> 儲存:<code>{`{"text": "...", "done": False}`}</code></li>
        <li>每次操作後自動<strong>存到 todo.json</strong></li>
        <li>啟動時自動<strong>讀檔</strong>,從上次的狀態接著用</li>
      </ul>
    </div>

    <div className="block">
      <h2>🎮 完整版 ── 試玩</h2>
      <Playground rows={50} initialCode={`import json

FILE = "todo.json"

# 載入舊資料(沒檔案就空清單)
try:
    with open(FILE, "r") as f:
        todos = json.load(f)
except:
    todos = []

def save():
    with open(FILE, "w") as f:
        json.dump(todos, f, ensure_ascii=False, indent=2)

def show():
    if not todos:
        print("📭 清單空空,加幾個 todo 吧!")
        return
    print("\\n=== 我的待辦清單 ===")
    for i, t in enumerate(todos, 1):
        mark = "✓" if t["done"] else "○"
        print(f"  {i}. {mark} {t['text']}")

print("=== 待辦清單 v1.0 ===")
print("指令: add <事項> / list / done <編號> / del <編號> / quit")

while True:
    cmd = input("\\n> ").strip()
    if not cmd:
        continue

    parts = cmd.split(maxsplit=1)
    action = parts[0].lower()

    if action == "quit" or action == "q":
        save()
        print("👋 已存檔,再見!")
        break
    elif action == "list" or action == "l":
        show()
    elif action == "add":
        if len(parts) < 2:
            print("⚠️ 用法: add <事項>")
            continue
        todos.append({"text": parts[1], "done": False})
        save()
        print(f"✓ 已新增:{parts[1]}")
    elif action == "done":
        if len(parts) < 2:
            print("⚠️ 用法: done <編號>")
            continue
        try:
            idx = int(parts[1]) - 1
            todos[idx]["done"] = True
            save()
            print(f"🎉 完成:{todos[idx]['text']}")
        except:
            print("⚠️ 編號不對")
    elif action == "del":
        try:
            idx = int(parts[1]) - 1
            removed = todos.pop(idx)
            save()
            print(f"🗑️ 刪除:{removed['text']}")
        except:
            print("⚠️ 編號不對")
    else:
        print("⚠️ 不認識的指令,試試: add / list / done / del / quit")`}/>
      <p>💡 玩玩看:輸入「add 寫 Python」→「add 倒垃圾」→「list」→「done 1」→「list」→「quit」</p>
    </div>

    <div className="block tip">
      <h2>💡 觀念整合</h2>
      <p>這個 app 結合了:</p>
      <ul>
        <li><strong>list + dict</strong>:儲存資料結構</li>
        <li><strong>while True + break</strong>:互動式主迴圈</li>
        <li><strong>input + split</strong>:解析使用者指令</li>
        <li><strong>try/except</strong>:處理「數字輸入錯」「檔案不存在」</li>
        <li><strong>json + 檔案 I/O</strong>:自動存檔讀檔</li>
        <li><strong>函式</strong>:把 save() 跟 show() 包起來重複用</li>
      </ul>
      <p>幾乎前 25 章的觀念都用到了!這就是真實程式設計師寫的代碼長相。</p>
    </div>

    <Practice items={[
      "加「優先度」欄位(high/medium/low),list 時依優先度排序。",
      "加「截止日期」欄位,過期的項目用紅字提示(用 ANSI 顏色或文字提示)。",
      "加 search <關鍵字> 指令,搜尋包含關鍵字的待辦事項。"
    ]}/>
  </div>
);

// Ch28: Password Generator
const Ch28 = () => (
  <div>
    <div className="lesson-eyebrow"><span className="dot"></span>第 28 課 · Chapter 28</div>
    <h1 className="lesson-title">🔐 實作:密碼產生器</h1>
    <div className="lesson-title-en">Project: Password Generator</div>
    <p className="lesson-intro">每個網站都要密碼,但人類想出來的密碼通常很爛(像「abc123」、「password」)。用 Python 隨機產生<strong>強密碼</strong>,還能評估強度。</p>

    <div className="block">
      <h2>🎯 規格</h2>
      <ul>
        <li>讓使用者選:長度、是否包含大寫、數字、符號</li>
        <li>隨機抽字元組合</li>
        <li>評估強度:弱 / 中 / 強</li>
      </ul>
    </div>

    <div className="block">
      <h2>🎮 完整版</h2>
      <Playground rows={50} initialCode={`import random

LOWER = "abcdefghijklmnopqrstuvwxyz"
UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
DIGITS = "0123456789"
SYMBOLS = "!@#$%^&*-_+=?"

print("=== 密碼產生器 ===")

# 問使用者規格
try:
    length = int(input("密碼長度(建議 12+): "))
except ValueError:
    length = 12

if length < 4:
    length = 4
    print("⚠️ 太短了,改成 4")

use_upper = input("包含大寫字母? (y/n): ").strip().lower() == "y"
use_digits = input("包含數字? (y/n): ").strip().lower() == "y"
use_symbols = input("包含符號? (y/n): ").strip().lower() == "y"

# 組合字元池
pool = LOWER
if use_upper:
    pool = pool + UPPER
if use_digits:
    pool = pool + DIGITS
if use_symbols:
    pool = pool + SYMBOLS

# 隨機抽 length 個字元
password = ""
for i in range(length):
    password = password + random.choice(pool)

# 評估強度
score = 0
if length >= 8: score = score + 1
if length >= 12: score = score + 1
if length >= 16: score = score + 1
if use_upper: score = score + 1
if use_digits: score = score + 1
if use_symbols: score = score + 1

if score >= 5:
    strength = "🟢 強"
elif score >= 3:
    strength = "🟡 中"
else:
    strength = "🔴 弱"

print(f"\\n=== 結果 ===")
print(f"密碼: {password}")
print(f"長度: {length}")
print(f"包含: 小寫{'+大寫' if use_upper else ''}{'+數字' if use_digits else ''}{'+符號' if use_symbols else ''}")
print(f"強度: {strength} (分數 {score}/6)")

# 一次產 5 組讓使用者挑
print("\\n=== 多備幾組讓你挑 ===")
for i in range(5):
    pwd = "".join(random.choice(pool) for _ in range(length))
    print(f"  {i + 1}. {pwd}")`}/>
    </div>

    <div className="block tip">
      <h2>💡 安全小知識</h2>
      <ul>
        <li><strong>長度比複雜度重要</strong>:16 字元純小寫比 8 字元含符號還難破解</li>
        <li><strong>不要用個人資訊</strong>:生日、名字、學校、寵物名都很容易猜</li>
        <li><strong>每個網站不同密碼</strong>:一個外洩不會骨牌效應</li>
        <li><strong>用密碼管理員</strong>:Bitwarden / 1Password 之類,只要記一個主密碼</li>
      </ul>
    </div>

    <Practice items={[
      "加「避免相似字元」選項(去掉 1/l/I/0/O 這種容易看錯的)。",
      "加「至少各 1 個」邏輯:確保密碼一定包含大寫、數字、符號各至少 1 個(現在是隨機,可能剛好都沒抽到)。",
      "做「密碼強度檢查器」:讓使用者輸入自己的密碼,程式評估強度並給建議。"
    ]}/>

    <Quiz q="長度 16 純小寫的密碼,跟長度 8 含大小寫+數字+符號的,哪個比較難破解?"
      opts={[
        "8 字元含複雜符號(因為符號多)",
        "16 字元純小寫(因為長度倍化,組合數爆炸)",
        "一樣難",
        "都很弱"
      ]}
      ans={1} explain="密碼破解的組合數是「字元種類^長度」。長度多 1 位破解時間就乘以字元種類數。長度威力遠大於複雜度。"/>
  </div>
);

// Ch29: Typing Practice
const Ch29 = () => (
  <div>
    <div className="lesson-eyebrow"><span className="dot"></span>第 29 課 · Chapter 29</div>
    <h1 className="lesson-title">⌨️ 實作:打字練習</h1>
    <div className="lesson-title-en">Project: Typing Trainer</div>
    <p className="lesson-intro">綜合 random、time、字串比對 ── 做一台能算 WPM(每分鐘字數)的打字練習機。</p>

    <div className="block">
      <h2>🎯 規格</h2>
      <ul>
        <li>從句子庫隨機抽題,印出來</li>
        <li>計時:從顯示題目到玩家按 Enter 為止</li>
        <li>逐字比對:算對幾個字、錯幾個字</li>
        <li>算 WPM(words per minute)</li>
      </ul>
    </div>

    <div className="block">
      <h2>🎮 完整版</h2>
      <Playground rows={54} initialCode={`import random
import time

SENTENCES = [
    "the quick brown fox jumps over the lazy dog",
    "python is fun and easy to learn",
    "practice makes perfect keep going",
    "hello world from kids python academy",
    "code every day even just ten minutes",
    "debugging is twice as hard as writing the code",
    "simple is better than complex",
    "errors are your teachers not your enemies",
]

def play_round(round_num):
    target = random.choice(SENTENCES)
    print(f"\\n=== 第 {round_num} 回合 ===")
    print(f"請打字: {target}")

    start = time.time()
    user = input("你的輸入: ")
    elapsed = time.time() - start

    # 逐字比對
    correct = 0
    total = max(len(target), len(user))
    for i in range(min(len(target), len(user))):
        if target[i] == user[i]:
            correct = correct + 1

    accuracy = (correct / total) * 100 if total > 0 else 0

    # 字數(以空格分隔)
    word_count = len(target.split())
    minutes = elapsed / 60
    wpm = word_count / minutes if minutes > 0 else 0

    print(f"\\n⏱️ 用時: {elapsed:.1f} 秒")
    print(f"✓ 正確率: {accuracy:.1f}%")
    print(f"🏎️ WPM: {wpm:.0f} 字/分")

    if accuracy == 100:
        print("💯 完全正確!")
    elif accuracy >= 90:
        print("👍 很棒!")
    elif accuracy >= 70:
        print("💪 還可以")
    else:
        print("🐢 慢慢來,先求準再求快")

    return wpm, accuracy

print("=== 打字練習機 ===")
print("打 3 回合,看看你的平均 WPM")

total_wpm = 0
total_acc = 0
rounds = 3

for r in range(1, rounds + 1):
    wpm, acc = play_round(r)
    total_wpm = total_wpm + wpm
    total_acc = total_acc + acc

print(f"\\n=== 總結 ===")
print(f"平均 WPM: {total_wpm / rounds:.0f}")
print(f"平均正確率: {total_acc / rounds:.1f}%")
print(f"等級: ", end="")
avg = total_wpm / rounds
if avg >= 60:
    print("🏆 神速")
elif avg >= 40:
    print("🚀 快手")
elif avg >= 25:
    print("👌 正常")
else:
    print("🌱 練習中")`}/>
    </div>

    <div className="block tip">
      <h2>💡 進階觀念</h2>
      <ul>
        <li><strong>函式包邏輯</strong>:把一回合包成 <code>play_round</code>,主程式只負責跑幾次</li>
        <li><strong>tuple 多回傳值</strong>:<code>return wpm, accuracy</code> 一次回兩個</li>
        <li><strong>逐字比對</strong>:用 <code>for i in range(min(...))</code> 同步比對兩個字串</li>
        <li><strong>正確率分母用 max</strong>:這樣「比目標短」也會扣分,不能投機只打開頭</li>
      </ul>
    </div>

    <Practice items={[
      "加自選句子庫:讓使用者把句子寫進 sentences.txt,程式讀進來用。",
      "加「最高紀錄」:每次玩完比較跟之前的最高 WPM,有破紀錄就慶祝(用 JSON 存)。",
      "加難度選項:容易=短句、困難=長句或中文(中文字單獨算字數)。",
      "計算<strong>每秒字數變化</strong>:用 time.time() 在每打一個字就記錄,結束畫出速度曲線(資料先收齊,進階再學畫圖)。"
    ]}/>

    <div className="bubble-row" style={{ marginTop: 24 }}>
      <div className="bubble-avatar owl"><Owl size={56} mood="teach"/><span className="bubble-avatar-name">Py 老師</span></div>
      <div className="bubble owl">
        🎓 <strong>29 章全部走完!</strong>從第一行 print 一路到自己做出可玩的小 app。
        <br/><br/>
        但學寫程式真正的開始是<strong>離開教學、開始自己想做什麼</strong>。
        <br/>想做小遊戲?裝 pygame。想做網站?學 Flask/Django。想做資料分析?pandas + matplotlib。想做 AI?PyTorch / scikit-learn。
        <br/><br/>
        Python 的世界就像海洋,你已經會游泳了 ── 該去探險了 🌊🦉
      </div>
    </div>
  </div>
);

window.Ch23 = Ch23; window.Ch24 = Ch24; window.Ch25 = Ch25; window.Ch26 = Ch26;
window.Ch27 = Ch27; window.Ch28 = Ch28; window.Ch29 = Ch29;
