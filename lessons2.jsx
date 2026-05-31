/* ============================================================
   Lesson content — Kids Python Academy
   Part 2: Ch9-Ch16 (loops → data structures → functions → modules → turtle)
   ============================================================ */

// Ch9: for + range (deep dive on range)
const Ch9 = () => (
  <div>
    <div className="lesson-eyebrow"><span className="dot"></span>第 9 課 · Chapter 9</div>
    <h1 className="lesson-title">🔁 for 與 range</h1>
    <div className="lesson-title-en">For Loop & range</div>
    <p className="lesson-intro">想印 100 顆星星不用複製貼上 100 次。<code>for</code> 迴圈幫你重複做事,搭配 <code>range</code>(數字產生器)就是黃金組合。這一課的重點是把 range <strong>真正搞懂</strong>。</p>

    <div className="block">
      <h2>🌟 第一個 for 迴圈</h2>
      <pre className="code-block">{`for i in range(5):
    print("⭐", i)`}</pre>
      <pre className="code-output">{`⭐ 0
⭐ 1
⭐ 2
⭐ 3
⭐ 4`}</pre>
      <p>每跑一輪,<code>i</code> 會變成 range 給的下一個數字。range(5) 給了 5 個數字 → 迴圈跑 5 次。</p>
    </div>

    <div className="block">
      <h2>🌟 重點觀念:什麼是 range?</h2>
      <div className="bubble-row">
        <div className="bubble-avatar owl"><Owl size={56} mood="teach"/><span className="bubble-avatar-name">Py 老師</span></div>
        <div className="bubble owl">
          <strong><code>range</code> 是「數字產生器」</strong>。你告訴它要哪些數字,它就一個接一個吐出來。for 迴圈最愛搭配 range,因為 range 吐一個,for 就跑一輪。
        </div>
      </div>

      <div style={{ background: "#fff1f2", border: "2px solid #fca5a5", borderRadius: 12, padding: 16, margin: "16px 0" }}>
        <div style={{ fontWeight: 800, color: "#991b1b", marginBottom: 8 }}>❌ 新手最常搞錯</div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 14, marginBottom: 12 }}>
          <code>range(5)</code> = 「從 1 數到 5」← <strong>錯!</strong>
        </div>
        <div style={{ fontWeight: 800, color: "#166534", marginBottom: 8 }}>✅ 正確理解</div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 14, lineHeight: 1.8 }}>
          <code>range(5)</code> = 「<strong>5 個數字</strong>,從 0 開始」
          <br/>= <code>0, 1, 2, 3, 4</code>
        </div>
      </div>

      <p>記住兩件事:</p>
      <ol>
        <li><code>range(5)</code> 裡的 <code>5</code> 是「<strong>個數</strong>」,不是「<strong>終點</strong>」</li>
        <li>Python 從 <strong>0</strong> 開始算,所以「5 個數字」就是 0、1、2、3、4</li>
      </ol>
    </div>

    <div className="block">
      <h2>🌟 把 range「攤開」看</h2>
      <p>直接 <code>print(range(5))</code> 看不到內容,因為 range 是「<strong>產生器</strong>」 ── 要用的時候才一個個吐。把它丟進 <code>list()</code> 就可以一次看到全部:</p>
      <pre className="code-block">{`print(range(5))            # 看到的是容器,不是內容
print(list(range(5)))      # list() 把它攤開`}</pre>
      <pre className="code-output">{`range(0, 5)
[0, 1, 2, 3, 4]`}</pre>
      <p>這個小技巧很重要 ── 任何時候你不確定 range 給的是什麼,就用 <code>list(range(...))</code> 看一眼。</p>
    </div>

    <div className="block">
      <h2>🌟 range 三種寫法</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 12 }}>
        <div style={{ background: "white", padding: 14, borderRadius: 12, border: "1px solid #e5e7eb" }}>
          <div style={{ marginBottom: 6 }}><code style={{ fontSize: 16, fontWeight: 800 }}>range(stop)</code> <span style={{ color: "var(--fg-3)", fontSize: 12 }}>── 一個參數</span></div>
          <div style={{ fontSize: 13, color: "var(--fg-2)" }}>從 <strong>0</strong> 開始,給 <code>stop</code> 個數字</div>
          <pre className="code-output" style={{ marginTop: 6 }}>{`range(5)  →  0, 1, 2, 3, 4`}</pre>
        </div>
        <div style={{ background: "white", padding: 14, borderRadius: 12, border: "1px solid #e5e7eb" }}>
          <div style={{ marginBottom: 6 }}><code style={{ fontSize: 16, fontWeight: 800 }}>range(start, stop)</code> <span style={{ color: "var(--fg-3)", fontSize: 12 }}>── 兩個參數</span></div>
          <div style={{ fontSize: 13, color: "var(--fg-2)" }}>從 <code>start</code> 開始,到 <code>stop</code> <strong>之前</strong>(不含 stop)</div>
          <pre className="code-output" style={{ marginTop: 6 }}>{`range(2, 8)  →  2, 3, 4, 5, 6, 7`}</pre>
        </div>
        <div style={{ background: "white", padding: 14, borderRadius: 12, border: "1px solid #e5e7eb" }}>
          <div style={{ marginBottom: 6 }}><code style={{ fontSize: 16, fontWeight: 800 }}>range(start, stop, step)</code> <span style={{ color: "var(--fg-3)", fontSize: 12 }}>── 三個參數</span></div>
          <div style={{ fontSize: 13, color: "var(--fg-2)" }}>每次跳 <code>step</code> 步;<code>step</code> 可以是負數(倒著數)</div>
          <pre className="code-output" style={{ marginTop: 6 }}>{`range(0, 10, 2)  →  0, 2, 4, 6, 8
range(10, 0, -1) →  10, 9, 8, ..., 1`}</pre>
        </div>
      </div>
    </div>

    <div className="block tip">
      <h2>💡 為什麼 stop 不含?</h2>
      <p>Python 跟很多程式語言一樣,終點都「不含」。這個設計有兩個好處:</p>
      <ul>
        <li><strong>個數很直覺</strong>:<code>range(5)</code> 剛好給 5 個數字,不用算「6 - 0 + 1 = 5」這種累人的事</li>
        <li><strong>切割不會重疊</strong>:<code>range(0, 5)</code> 加上 <code>range(5, 10)</code> 剛好是 0~9 不重不漏,中間那個 5 不會出現兩次</li>
      </ul>
    </div>

    <div className="block">
      <h2>🎮 試試看 ── 各種 range</h2>
      <Playground rows={16} initialCode={`# 先攤開看看內容
print("range(5)        →", list(range(5)))
print("range(1, 6)     →", list(range(1, 6)))
print("range(0, 20, 5) →", list(range(0, 20, 5)))
print("range(10, 0,-2) →", list(range(10, 0, -2)))

# 然後用 for 跑
print()
print("倒數:")
for n in range(5, 0, -1):
    print(n, "...")
print("🚀 發射！")`}/>
    </div>

    <div className="block">
      <h2>🎮 試試看 ── 星星金字塔</h2>
      <p>字串可以乘以數字 → 重複該次數。配合 range,一行解決:</p>
      <Playground initialCode={`for i in range(1, 8):
    print("⭐" * i)

print()

# 反過來
for i in range(7, 0, -1):
    print("🌟" * i)`}/>
    </div>

    <Quiz q="range(2, 8) 會給出哪些數字?"
      opts={["2, 3, 4, 5, 6, 7, 8", "2, 3, 4, 5, 6, 7", "1, 2, 3, 4, 5, 6", "2 到 8 之間 8 個數字"]}
      ans={1} explain="從 2 開始,到 8 之前(不含 8)→ 2, 3, 4, 5, 6, 7,共 6 個。"/>
  </div>
);

// Ch10: while
const Ch10 = () => (
  <div>
    <div className="lesson-eyebrow"><span className="dot"></span>第 10 課 · Chapter 10</div>
    <h1 className="lesson-title">♾️ while 迴圈</h1>
    <div className="lesson-title-en">While Loop</div>
    <p className="lesson-intro">for 是「<strong>指定跑幾次</strong>」,while 是「<strong>條件成立就一直跑</strong>」。當你不知道要跑幾次、要等某個事件發生才停,就用 while。</p>

    <div className="block">
      <h2>🌟 基本用法</h2>
      <pre className="code-block">{`count = 0

while count < 5:
    print("數到", count)
    count = count + 1   # 重要！讓條件最後會變 False

print("結束")`}</pre>
      <pre className="code-output">{`數到 0
數到 1
數到 2
數到 3
數到 4
結束`}</pre>
      <p>結構:<code>while 條件:</code> → 內容縮排 → 每次跑前先檢查條件,True 才繼續。</p>
    </div>

    <div className="block warn">
      <h2>⚠️ 無窮迴圈!</h2>
      <p>如果條件永遠不會變 False,迴圈會跑到天荒地老,網頁可能會卡:</p>
      <pre className="code-block">{`# 危險範例 ── 別這樣寫！
count = 0
while count < 5:
    print(count)
    # 忘了讓 count + 1 → 永遠是 0 → 永遠 < 5 → 跑不停`}</pre>
      <p>Skulpt 沙箱有 15 秒時間限制,跑太久會被中斷。但寫程式的時候要養成習慣:<strong>每個 while 都要想清楚什麼時候會停</strong>。</p>
    </div>

    <div className="block">
      <h2>🌟 break ── 提早跳出</h2>
      <pre className="code-block">{`n = 1
while True:           # 條件永遠 True (不靠條件停)
    print(n)
    if n >= 5:
        break          # 達到條件就跳出
    n = n + 1
print("跳出來了")`}</pre>
      <p><code>break</code> 也可以用在 for 迴圈。</p>
    </div>

    <div className="block">
      <h2>🎮 試試看 ── 倒數計時</h2>
      <Playground initialCode={`countdown = 10

while countdown > 0:
    print(countdown, end=" ")
    countdown = countdown - 1

print("🚀 發射！")`}/>
    </div>

    <Quiz q="for 跟 while 最大的差別?"
      opts={[
        "for 比較快",
        "for 用在已知跑幾次,while 用在『直到條件不成立』",
        "while 不能巢狀",
        "for 用 break 會錯"
      ]}
      ans={1} explain="for 適合『跑固定次數』(已知範圍),while 適合『跑到條件不成立為止』。"/>
  </div>
);

// Ch11: list
const Ch11 = () => (
  <div>
    <div className="lesson-eyebrow"><span className="dot"></span>第 11 課 · Chapter 11</div>
    <h1 className="lesson-title">📋 串列 list</h1>
    <div className="lesson-title-en">List</div>
    <p className="lesson-intro">變數一個盒子只能裝一樣東西。<code>list</code> 是「一排盒子」,可以裝很多東西,而且<strong>有順序</strong>。</p>

    <div className="block">
      <h2>🌟 建立 list</h2>
      <pre className="code-block">{`fruits = ["蘋果", "香蕉", "葡萄"]
numbers = [10, 20, 30, 40, 50]
mixed = ["hi", 7, True, 3.14]      # 不同型別也可以
empty = []                          # 空 list

print(fruits)
print(len(fruits))                  # 個數 → 3`}</pre>

      <h3>🌟 用「索引」取出單一元素</h3>
      <p>每個位置都有編號,從 <strong>0</strong> 開始:</p>
      <pre className="code-block">{`fruits = ["蘋果", "香蕉", "葡萄"]

print(fruits[0])    # 蘋果 (第 1 個)
print(fruits[1])    # 香蕉
print(fruits[-1])   # 葡萄 (從尾巴數,-1 是最後一個)
print(fruits[-2])   # 香蕉 (倒數第二)`}</pre>
    </div>

    <div className="block">
      <h2>🌟 修改、新增、刪除</h2>
      <pre className="code-block">{`fruits = ["蘋果", "香蕉"]

fruits.append("葡萄")    # 加到最後
# ['蘋果', '香蕉', '葡萄']

fruits[0] = "西瓜"        # 換掉第 0 個
# ['西瓜', '香蕉', '葡萄']

fruits.remove("香蕉")     # 移除某個值
# ['西瓜', '葡萄']

fruits.insert(1, "鳳梨")  # 插到位置 1
# ['西瓜', '鳳梨', '葡萄']`}</pre>
    </div>

    <div className="block">
      <h2>🌟 切片 ── 取一段</h2>
      <pre className="code-block">{`nums = [10, 20, 30, 40, 50]

print(nums[1:4])    # [20, 30, 40]  (位置 1 到 4 之前)
print(nums[:3])     # [10, 20, 30]  (從頭到 3 之前)
print(nums[2:])     # [30, 40, 50]  (從 2 到尾)`}</pre>
      <p>切片邏輯跟 range 一樣 ── 起點含,終點不含。</p>
    </div>

    <div className="block">
      <h2>🌟 用 for 跑遍 list</h2>
      <pre className="code-block">{`fruits = ["蘋果", "香蕉", "葡萄"]

for f in fruits:
    print("我喜歡", f)`}</pre>
    </div>

    <div className="block">
      <h2>🎮 試試看 ── 我的清單</h2>
      <Playground initialCode={`shopping = ["牛奶", "麵包", "蘋果", "巧克力"]

print("=== 購物清單 ===")
for i in range(len(shopping)):
    print(f"{i + 1}. {shopping[i]}")

print(f"\\n共 {len(shopping)} 項")

# 加東西
shopping.append("起司")
print("加了起司:", shopping)

# 移除
shopping.remove("巧克力")
print("沒有巧克力了:", shopping)`}/>
    </div>

    <Quiz q={`nums = [10, 20, 30]  →  print(nums[-1]) 印出?`}
      opts={["10", "20", "30", "錯誤"]}
      ans={2} explain="負索引從尾巴算:-1 是最後一個 → 30。"/>
  </div>
);

// Ch12: dict
const Ch12 = () => (
  <div>
    <div className="lesson-eyebrow"><span className="dot"></span>第 12 課 · Chapter 12</div>
    <h1 className="lesson-title">📓 字典 dict</h1>
    <div className="lesson-title-en">Dictionary</div>
    <p className="lesson-intro">list 用「<strong>位置</strong>」找東西,dict 用「<strong>名字</strong>」找東西。像查字典:你不用知道「apple 在第幾頁」,直接查 <code>apple</code> 就好。</p>

    <div className="block">
      <h2>🌟 建立 dict</h2>
      <pre className="code-block">{`student = {
    "name": "小華",
    "age": 13,
    "grade": "七年級"
}

print(student["name"])     # 用 key 查 value → 小華
print(student["age"])      # 13`}</pre>
      <p>每一項都是「<code>key: value</code>」── key 通常是字串(名字),value 可以是任何東西。</p>
    </div>

    <div className="block">
      <h2>🌟 修改、新增</h2>
      <pre className="code-block">{`student = {"name": "小華", "age": 13}

student["age"] = 14           # 修改既有的
student["hobby"] = "讀書"     # 新增新的 key

print(student)
# {'name': '小華', 'age': 14, 'hobby': '讀書'}`}</pre>
    </div>

    <div className="block">
      <h2>🌟 檢查 key、跑遍 dict</h2>
      <pre className="code-block">{`d = {"a": 1, "b": 2, "c": 3}

print("a" in d)         # True
print("z" in d)         # False

for key in d:           # 跑所有 key
    print(key, "→", d[key])`}</pre>
      <pre className="code-output">{`True
False
a → 1
b → 2
c → 3`}</pre>
    </div>

    <div className="block">
      <h2>🎮 試試看 ── 班級分數</h2>
      <Playground initialCode={`scores = {
    "小明": 85,
    "小華": 92,
    "小美": 78,
    "阿仁": 67,
}

# 印每個人
for name in scores:
    print(f"{name}: {scores[name]} 分")

# 算平均
total = 0
for name in scores:
    total = total + scores[name]
print(f"\\n平均: {total / len(scores):.1f} 分")

# 找最高分
top = ""
top_score = 0
for name in scores:
    if scores[name] > top_score:
        top = name
        top_score = scores[name]
print(f"第一名: {top} ({top_score} 分) 🏆")`}/>
    </div>

    <Quiz q="dict 用什麼來找 value?"
      opts={["位置編號", "key", "迴圈", "亂數"]}
      ans={1} explain="dict 是 key→value 的對應,用 key 來查。list 才是用位置編號。"/>
  </div>
);

// Ch13: functions
const Ch13 = () => (
  <div>
    <div className="lesson-eyebrow"><span className="dot"></span>第 13 課 · Chapter 13</div>
    <h1 className="lesson-title">🛠️ 函式</h1>
    <div className="lesson-title-en">Functions</div>
    <p className="lesson-intro">函式是「<strong>自己造的指令</strong>」。把常用的程式碼包成一個工具,以後想用就喊它的名字 ── 就像 <code>print()</code> 本身就是 Python 內建的函式。</p>

    <div className="block">
      <h2>🌟 第一個函式</h2>
      <pre className="code-block">{`def say_hi():
    print("嗨！我是你的函式 👋")

# 呼叫它
say_hi()
say_hi()`}</pre>
      <p>用 <code>def 名字():</code> 定義,內容縮排;呼叫時用 <code>名字()</code>。</p>
    </div>

    <div className="block">
      <h2>🌟 傳東西進去 ── 參數</h2>
      <pre className="code-block">{`def greet(name):
    print(f"嗨, {name}！很高興認識你 ✨")

greet("小明")
greet("Alex")`}</pre>
      <p>括號裡的 <code>name</code> 是<strong>參數</strong>。呼叫時傳什麼進去,<code>name</code> 就變什麼。</p>
    </div>

    <div className="block">
      <h2>🌟 傳結果出來 ── return</h2>
      <pre className="code-block">{`def add(a, b):
    return a + b

result = add(3, 5)
print(result)              # 8
print(add(10, 20))         # 30`}</pre>
      <div className="bubble-row" style={{ marginTop: 12 }}>
        <div className="bubble-avatar owl"><Owl size={56} mood="teach"/><span className="bubble-avatar-name">Py 老師</span></div>
        <div className="bubble owl">
          <strong>關鍵差別:</strong> <code>print</code> 是「顯示給人看」,<code>return</code> 是「把結果交回去」讓程式可以接著用。
        </div>
      </div>
    </div>

    <div className="block">
      <h2>🌟 預設值參數</h2>
      <pre className="code-block">{`def greet(name, greeting="嗨"):
    print(f"{greeting}, {name}！")

greet("小華")              # 嗨, 小華！
greet("Alex", "Hello")     # Hello, Alex！`}</pre>
    </div>

    <div className="block">
      <h2>🎮 試試看 ── 造一個 BMI 計算工具</h2>
      <Playground initialCode={`def bmi(weight, height):
    return weight / (height * height)

def comment(b):
    if b < 18.5:
        return "過輕"
    elif b < 24:
        return "正常"
    else:
        return "過重"

# 用看看
w = 55
h = 1.65
b = bmi(w, h)
print(f"體重 {w} kg、身高 {h} m")
print(f"BMI = {b:.2f}")         # :.2f = 小數兩位
print(f"狀態: {comment(b)}")`}/>
    </div>

    <Quiz q="return 跟 print 的差別?"
      opts={[
        "完全一樣",
        "return 把值交回去給呼叫的人,print 只是顯示文字",
        "return 比較快",
        "print 比較新"
      ]}
      ans={1} explain="return 把結果交給呼叫者(可以存進變數繼續用);print 只是顯示在螢幕,不會回傳值。"/>
  </div>
);

// Ch14: try/except
const Ch14 = () => (
  <div>
    <div className="lesson-eyebrow"><span className="dot"></span>第 14 課 · Chapter 14</div>
    <h1 className="lesson-title">🛡️ 錯誤處理</h1>
    <div className="lesson-title-en">Try / Except</div>
    <p className="lesson-intro">程式跑壞了,Python 會丟「錯誤」(exception)然後停掉。<code>try/except</code> 讓你<strong>接住</strong>錯誤,讓程式繼續跑而不是直接當機。</p>

    <div className="block">
      <h2>🌟 沒處理會怎樣?</h2>
      <pre className="code-block">{`age = int("abc")
print("執行不到這裡")`}</pre>
      <pre className="code-output">{`ValueError: invalid literal for int() with base 10: 'abc'`}</pre>
      <p>Python 直接停掉,後面的程式碼完全不會跑。</p>
    </div>

    <div className="block">
      <h2>🌟 用 try/except 接住</h2>
      <pre className="code-block">{`try:
    age = int("abc")
    print("年齡:", age)
except:
    print("⚠️ 那不是個有效的數字")

print("程式繼續跑～")`}</pre>
      <pre className="code-output">{`⚠️ 那不是個有效的數字
程式繼續跑～`}</pre>
    </div>

    <div className="block">
      <h2>🌟 接特定錯誤</h2>
      <pre className="code-block">{`def safe_div(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        return "不能除以 0！"
    except TypeError:
        return "型別錯了！"

print(safe_div(10, 2))     # 5.0
print(safe_div(10, 0))     # 不能除以 0！
print(safe_div(10, "x"))   # 型別錯了！`}</pre>
      <p>常見錯誤型別:<code>ValueError</code>、<code>ZeroDivisionError</code>、<code>TypeError</code>、<code>IndexError</code>、<code>KeyError</code>。</p>
    </div>

    <div className="block">
      <h2>🎮 試試看 ── 安全的輸入轉數字</h2>
      <Playground initialCode={`# 試試輸入「15」、「abc」、「3.14」看會怎樣
text = "abc"

try:
    n = int(text)
    print(f"成功！數字是 {n}")
except ValueError:
    print(f"⚠️ '{text}' 不是有效的整數")

# 換個值再試
text2 = "15"
try:
    n = int(text2)
    print(f"成功！數字是 {n}")
except ValueError:
    print(f"⚠️ '{text2}' 不是有效的整數")`}/>
    </div>

    <Quiz q="try/except 主要的用途是?"
      opts={[
        "讓程式跑更快",
        "接住可能發生的錯誤,讓程式不要當機",
        "debug 工具",
        "印出進度"
      ]}
      ans={1} explain="try/except 是『接錯』機制,讓你優雅地處理錯誤而不是讓程式中斷。"/>
  </div>
);

// Ch15: modules
const Ch15 = () => (
  <div>
    <div className="lesson-eyebrow"><span className="dot"></span>第 15 課 · Chapter 15</div>
    <h1 className="lesson-title">🧰 模組</h1>
    <div className="lesson-title-en">Modules</div>
    <p className="lesson-intro">Python 內建了很多「<strong>工具箱</strong>」,要用就 <code>import</code> 進來。亂數、進階數學、時間、海龜畫圖...都是這樣來的。</p>

    <div className="block">
      <h2>🌟 import 用法</h2>
      <pre className="code-block">{`import random

print(random.randint(1, 10))         # 1~10 隨機整數
print(random.random())                # 0~1 之間的小數
print(random.choice(["A", "B", "C"])) # 隨機選一個`}</pre>
      <p>用 <code>模組名.工具名</code> 來呼叫。</p>
    </div>

    <div className="block">
      <h2>🌟 常用模組</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 }}>
        {[
          { m: "random", desc: "亂數", ex: "random.randint(1, 6)" },
          { m: "math", desc: "進階數學", ex: "math.sqrt(16) → 4.0" },
          { m: "time", desc: "時間 / 等待", ex: "time.sleep(2)" },
          { m: "turtle", desc: "海龜畫圖(Ch16)", ex: "turtle.Turtle()" },
        ].map(m => (
          <div key={m.m} style={{ background: "white", padding: 12, borderRadius: 10, border: "1px solid #e5e7eb" }}>
            <div><code style={{ fontWeight: 800, fontSize: 14 }}>{m.m}</code> <span style={{ fontSize: 12, color: "var(--fg-3)" }}>{m.desc}</span></div>
            <code style={{ fontSize: 11, display: "block", marginTop: 4, color: "var(--fg-3)" }}>{m.ex}</code>
          </div>
        ))}
      </div>
    </div>

    <div className="block">
      <h2>🌟 from ... import ...</h2>
      <p>只拿某個工具,呼叫時不用打模組名:</p>
      <pre className="code-block">{`from random import randint

print(randint(1, 100))    # 直接用,不用打 random.`}</pre>
    </div>

    <div className="block">
      <h2>🎮 試試看 ── 擲骰子</h2>
      <Playground initialCode={`import random

# 擲一顆 6 面骰
print("骰一顆:", random.randint(1, 6))

# 擲三顆,加總
print("\\n擲三顆:")
total = 0
for i in range(3):
    n = random.randint(1, 6)
    print(f"  第 {i+1} 顆: {n}")
    total = total + n
print(f"總和: {total}")

# 隨機抽水果
fruits = ["🍎", "🍌", "🍇", "🍓", "🍊", "🍑"]
print(f"\\n今天的水果: {random.choice(fruits)}")
print(f"洗牌後: {random.sample(fruits, 3)}")  # 抽 3 個不重複`}/>
    </div>

    <div className="block">
      <h2>🎮 試試看 ── 數學魔法</h2>
      <Playground initialCode={`import math

print("π =", math.pi)
print("e =", math.e)
print("√16 =", math.sqrt(16))
print("√2 =", math.sqrt(2))
print("2^10 =", math.pow(2, 10))
print("ceil(3.2) =", math.ceil(3.2))    # 無條件進位
print("floor(3.8) =", math.floor(3.8))  # 無條件捨去`}/>
    </div>

    <Quiz q="想用 random 工具,要先做什麼?"
      opts={["什麼都不用", "import random", "include random", "load random"]}
      ans={1} explain="Python 用 import 語法把模組引入。"/>
  </div>
);

// Ch16: turtle
const Ch16 = () => (
  <div>
    <div className="lesson-eyebrow"><span className="dot"></span>第 16 課 · Chapter 16</div>
    <h1 className="lesson-title">🐢 海龜畫圖</h1>
    <div className="lesson-title-en">Turtle Graphics</div>
    <p className="lesson-intro">想像有一隻<strong>小海龜</strong>拿著筆站在畫紙中央。你叫它走,它就走;叫它轉,它就轉。走過的路就留下線。把前面學到的 for、變數、函式都用上,就能畫出超漂亮的圖!</p>

    <div className="block">
      <h2>🌟 基本指令</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 8, marginTop: 8, marginBottom: 12 }}>
        {[
          { s: "t.forward(100)", n: "往前走 100 步" },
          { s: "t.backward(50)", n: "倒退 50 步" },
          { s: "t.right(90)", n: "右轉 90 度" },
          { s: "t.left(45)", n: "左轉 45 度" },
          { s: "t.penup()", n: "抬筆(不留線)" },
          { s: "t.pendown()", n: "放筆(繼續畫)" },
          { s: "t.color('red')", n: "換紅筆" },
          { s: "t.circle(50)", n: "畫圓,半徑 50" },
          { s: "t.speed(0)", n: "速度 0~10(0 最快)" },
        ].map(c => (
          <div key={c.s} style={{ background: "white", padding: 10, borderRadius: 10, border: "1px solid #e5e7eb" }}>
            <code style={{ fontSize: 12, fontWeight: 700 }}>{c.s}</code>
            <div style={{ fontSize: 11, color: "var(--fg-3)", marginTop: 4 }}>{c.n}</div>
          </div>
        ))}
      </div>
      <div className="bubble-row">
        <div className="bubble-avatar owl"><Owl size={56} mood="teach"/><span className="bubble-avatar-name">Py 老師</span></div>
        <div className="bubble owl">
          每段程式前面都要先 <code>import turtle</code>,造一隻 <code>t = turtle.Turtle()</code> 才能開始指揮它~
        </div>
      </div>
    </div>

    <div className="block">
      <h2>🎮 試做 1:正方形</h2>
      <p>「前進、右轉 90 度」做 4 次:</p>
      <Playground turtle initialCode={`import turtle
t = turtle.Turtle()
t.speed(5)
t.color("purple")

for i in range(4):
    t.forward(80)
    t.right(90)`}/>
    </div>

    <div className="block">
      <h2>🎮 試做 2:五角星</h2>
      <p>把「右轉」改成 144 度,重複 5 次,就是一顆五角星:</p>
      <Playground turtle initialCode={`import turtle
t = turtle.Turtle()
t.speed(8)
t.color("crimson")
t.pensize(3)

for i in range(5):
    t.forward(120)
    t.right(144)`}/>
    </div>

    <div className="block">
      <h2>🎮 試做 3:萬花筒</h2>
      <p>正方形畫 18 次,每次換顏色、轉一點點,做出萬花筒效果:</p>
      <Playground turtle rows={14} initialCode={`import turtle
t = turtle.Turtle()
t.speed(0)

colors = ["red", "orange", "gold", "green", "blue", "purple"]

for i in range(18):
    t.color(colors[i % 6])
    for j in range(4):
        t.forward(80)
        t.right(90)
    t.right(20)`}/>
    </div>

    <div className="block">
      <h2>🎮 試做 4:函式組合 ── 畫一朵花</h2>
      <p>把「畫一片花瓣」包成函式,然後叫它畫好多次:</p>
      <Playground turtle rows={16} initialCode={`import turtle
t = turtle.Turtle()
t.speed(0)
t.color("hotpink")

def petal():
    """畫一片花瓣"""
    for i in range(2):
        t.forward(50)
        t.right(45)
        t.forward(50)
        t.right(135)

# 畫 8 片花瓣
for i in range(8):
    petal()
    t.right(45)`}/>
    </div>

    <div className="block tip">
      <h2>💡 換你發揮!</h2>
      <ul>
        <li>把 <code>range(5)</code> 改成 <code>range(6)</code>、<code>range(7)</code>,看會變幾邊形</li>
        <li>用 <code>t.penup()</code> + <code>t.goto(x, y)</code> 移動到別處再 <code>t.pendown()</code> 繼續畫,做出多個圖</li>
        <li>把顏色列表加長,顏色更繽紛</li>
        <li>寫函式 <code>def polygon(sides, length):</code> 畫任意邊形</li>
      </ul>
      <div className="bubble-row" style={{ marginTop: 12 }}>
        <div className="bubble-avatar owl"><Owl size={56}/></div>
        <div className="bubble owl">
          🎓 恭喜!你已經走完 16 章 ── print、變數、型別、運算、字串、input、條件、邏輯、for、while、list、dict、函式、錯誤處理、模組、turtle。這已經是 Python 基礎的<strong>完整入門</strong>了!接下來組合這些工具,就能寫小遊戲、小動畫、簡單的計算器或文字冒險。
        </div>
      </div>
    </div>
  </div>
);

window.Ch9 = Ch9; window.Ch10 = Ch10; window.Ch11 = Ch11; window.Ch12 = Ch12;
window.Ch13 = Ch13; window.Ch14 = Ch14; window.Ch15 = Ch15; window.Ch16 = Ch16;
