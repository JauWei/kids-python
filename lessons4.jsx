/* ============================================================
   Lesson content — Kids Python Academy
   Part 4: Ch21 文字冒險 + Ch22 心算練習機 (進階整合專案)
   ============================================================ */

// Ch21: Text Adventure
const Ch21 = () => (
  <div>
    <div className="lesson-eyebrow"><span className="dot"></span>第 21 課 · Chapter 21</div>
    <h1 className="lesson-title">🗺️ 文字冒險遊戲</h1>
    <div className="lesson-title-en">Text Adventure</div>
    <p className="lesson-intro">這一章把 <strong>dict + while + input + list</strong> 串成一個小型「<strong>地下城逃脫</strong>」遊戲。地下城用 dict 表達(每個房間有描述跟出口),迴圈讓玩家在房間之間移動,撿道具、過關卡。</p>

    <div className="block">
      <h2>📐 設計思考</h2>
      <p>怎麼把「地下城」變成資料?用 <code>dict</code> 描述每個房間:</p>
      <pre className="code-block">{`ROOMS = {
    "start": {
        "desc": "你站在地下城入口...",
        "exits": {"north": "hall", "east": "armory"}
    },
    "armory": {
        "desc": "武器庫,牆上掛著一把劍。",
        "exits": {"west": "start"},
        "item": "sword"      # 房間裡可能有道具
    },
    # ... 其他房間
}`}</pre>
      <p>主迴圈做這幾件事:</p>
      <ol>
        <li>印出目前房間描述</li>
        <li>如果有道具就撿起來放背包</li>
        <li>顯示可走的方向</li>
        <li>問玩家要往哪走</li>
        <li>移動,回到第 1 步</li>
      </ol>
    </div>

    <div className="block">
      <h2>🎮 完整版 ── 地下城逃脫</h2>
      <p>跑跑看!輸入方向:north / south / east / west / quit。</p>
      <Playground rows={50} initialCode={`ROOMS = {
    "start": {
        "desc": "🔥 你站在地下城入口,火把照亮石牆。",
        "exits": {"north": "hall", "east": "armory"}
    },
    "hall": {
        "desc": "🏛️ 寬敞的大廳,地上有腳印通向兩邊。",
        "exits": {"south": "start", "west": "library", "east": "kitchen"}
    },
    "armory": {
        "desc": "⚔️ 武器庫,牆上掛著一把鋒利的劍。",
        "exits": {"west": "start"},
        "item": "sword"
    },
    "library": {
        "desc": "📚 佈滿灰塵的書架,角落閃著一把鑰匙。",
        "exits": {"east": "hall"},
        "item": "key"
    },
    "kitchen": {
        "desc": "🍳 鍋碗瓢盆散落一地。北邊有道緊閉的木門。",
        "exits": {"west": "hall", "north": "exit_door"}
    },
    "exit_door": {
        "desc": "🚪 終於到出口了!但門被鎖住,需要鑰匙。",
        "exits": {"south": "kitchen"},
        "needs": "key"
    },
    "win": {
        "desc": "🌞 你逃出地下城,陽光灑在臉上!",
        "exits": {}
    }
}

inventory = []
current = "start"

while True:
    room = ROOMS[current]
    print()
    print(room["desc"])

    # 撿道具
    if "item" in room and room["item"] not in inventory:
        item = room["item"]
        print(f"  ✨ 你撿到了 [{item}]!")
        inventory.append(item)

    # 勝利
    if current == "win":
        print(f"🎉 過關!背包裡有: {inventory}")
        break

    # 檢查門檻
    if "needs" in room:
        if room["needs"] in inventory:
            print(f"  🔓 你用 [{room['needs']}] 打開了門...")
            current = "win"
            continue
        else:
            print(f"  ⚠️ 需要 [{room['needs']}] 才能繼續")

    print(f"🎒 背包: {inventory}")
    print(f"🚪 方向: {list(room['exits'].keys())}")

    cmd = input("→ 走哪邊 (north/south/east/west/quit): ").strip().lower()

    if cmd == "quit":
        print("👋 再見!")
        break
    elif cmd in room["exits"]:
        current = room["exits"][cmd]
    else:
        print("⚠️ 走不通!")`}/>
    </div>

    <div className="block tip">
      <h2>💡 拆解這個遊戲</h2>
      <ul>
        <li><strong>dict 套 dict</strong>:ROOMS 是大 dict,每個值又是 dict ── 用來描述「結構化的資料」</li>
        <li><strong>list 當背包</strong>:<code>inventory.append(item)</code>、<code>item in inventory</code></li>
        <li><strong>while True + break</strong>:不知道玩家何時離開,所以用無窮迴圈,輸入 quit 才 break</li>
        <li><strong>continue</strong>:遇到「打開門」要跳到下一輪而不繼續往下檢查方向</li>
        <li><strong>狀態機</strong>:<code>current</code> 變數記住「現在在哪個房間」,所有邏輯都根據它決定</li>
      </ul>
    </div>

    <Practice items={[
      "新增一個房間「地牢」,放一個怪物。經過時要有劍才能通過。",
      "讓某個房間有 50% 機率掉一個金幣(用 random.random),撿夠 3 個額外得分。",
      "把房間描述改成你自己的故事(太空船?學校?巫師塔?),改 ROOMS 內容即可。",
      "加血量系統:初始 HP=10,某些房間會扣血,HP 到 0 就 game over。"
    ]}/>

    <Quiz q="這個遊戲為什麼用 while True + break,而不用 for?"
      opts={[
        "while 比較快",
        "因為不知道玩家要玩幾輪,for 需要固定次數",
        "for 不能用 input",
        "dict 只能配 while"
      ]}
      ans={1} explain="玩家何時離開、何時破關都是動態的,沒有固定次數,所以用 while 配條件/break 比較適合。"/>
  </div>
);

// Ch22: Mental Math Trainer
const Ch22 = () => (
  <div>
    <div className="lesson-eyebrow"><span className="dot"></span>第 22 課 · Chapter 22</div>
    <h1 className="lesson-title">🧮 心算練習機</h1>
    <div className="lesson-title-en">Mental Math Trainer</div>
    <p className="lesson-intro">用前面學過的 <strong>random + input + for + try/except + time</strong> 做一台心算練習機 ── 隨機出題、計時、計分、有三種難度。</p>

    <div className="block">
      <h2>🎯 v1 ── 最簡單版</h2>
      <p>10 題加法,問完印出分數:</p>
      <Playground rows={20} initialCode={`import random

score = 0
total = 5

for i in range(1, total + 1):
    a = random.randint(1, 20)
    b = random.randint(1, 20)
    ans = a + b

    try:
        user = int(input(f"第 {i} 題: {a} + {b} = "))
    except ValueError:
        print("✗ 沒輸入數字,跳過")
        continue

    if user == ans:
        print("✓ 答對!")
        score = score + 1
    else:
        print(f"✗ 答錯,正確答案是 {ans}")

print(f"\\n=== 結果 ===")
print(f"分數: {score}/{total}")`}/>
    </div>

    <div className="block">
      <h2>🎯 v2 ── 多種運算 + 難度選擇</h2>
      <p>加上 <code>-</code>、<code>×</code>,讓玩家自己選難度:</p>
      <Playground rows={36} initialCode={`import random

print("=== 心算練習 ===")
print("難度:1 簡單(1-10), 2 普通(1-50), 3 困難(1-100)")

try:
    diff = int(input("選難度 (1/2/3): "))
except ValueError:
    diff = 1

if diff == 3:
    max_n = 100
elif diff == 2:
    max_n = 50
else:
    max_n = 10

OPS = ["+", "-", "*"]
total = 5
score = 0

for i in range(1, total + 1):
    a = random.randint(1, max_n)
    b = random.randint(1, max_n)
    op = random.choice(OPS)

    if op == "+":
        ans = a + b
    elif op == "-":
        ans = a - b
    else:
        ans = a * b

    try:
        user = int(input(f"\\n第 {i} 題: {a} {op} {b} = "))
    except ValueError:
        print("✗ 沒輸入數字")
        continue

    if user == ans:
        print("✓ 答對!")
        score = score + 1
    else:
        print(f"✗ 答錯,正確答案是 {ans}")

print(f"\\n=== 結果 ===")
print(f"分數: {score}/{total}")
if score == total:
    print("🏆 滿分!")
elif score >= total * 0.6:
    print("👍 不錯哦!")
else:
    print("💪 加油,多練習!")`}/>
    </div>

    <div className="block">
      <h2>🎯 v3 ── 加上計時(用 time 模組)</h2>
      <p>記錄總用時、平均每題秒數,看自己進步多少:</p>
      <Playground rows={38} initialCode={`import random
import time

print("=== 心算挑戰 ===")
total = 5
score = 0

start_time = time.time()      # 記下開始時間

for i in range(1, total + 1):
    a = random.randint(1, 20)
    b = random.randint(1, 20)
    op = random.choice(["+", "-", "*"])

    if op == "+":
        ans = a + b
    elif op == "-":
        ans = a - b
    else:
        ans = a * b

    try:
        user = int(input(f"\\n第 {i} 題: {a} {op} {b} = "))
    except ValueError:
        continue

    if user == ans:
        print("✓")
        score = score + 1
    else:
        print(f"✗ 正解 {ans}")

elapsed = time.time() - start_time

print(f"\\n=== 結果 ===")
print(f"分數: {score}/{total}")
print(f"總用時: {elapsed:.1f} 秒")
print(f"平均每題: {elapsed / total:.1f} 秒")

# 評等
if score == total and elapsed < 30:
    print("🚀 太強了!神速滿分!")
elif score == total:
    print("🏆 滿分!")
elif score >= total * 0.6:
    print("👍 不錯哦!")
else:
    print("💪 加油!")`}/>
    </div>

    <div className="block tip">
      <h2>💡 觀念回顧</h2>
      <ul>
        <li><strong>random.choice(list)</strong>:從列表隨機選一個元素</li>
        <li><strong>time.time()</strong>:回傳目前的時間戳記(秒),兩次相減就是經過的秒數</li>
        <li><strong>f-string 格式</strong>:<code>{`{elapsed:.1f}`}</code> 印小數一位</li>
        <li><strong>try/except 防呆</strong>:玩家亂打字不會讓程式炸掉</li>
      </ul>
    </div>

    <Practice items={[
      "加除法(/)和取餘數(%):自己想怎麼處理除不盡的狀況(用整數除 // 或 float)。",
      "用 class Quiz 把整個練習機包成物件 ── __init__ 收難度、ask() 出題、report() 結算。",
      "把每題答錯的題目存進 list,結束後印出「錯題本」讓使用者複習。",
      "做進階版:連續答對 3 題自動升難度;答錯就降難度(自適應練習)。"
    ]}/>

    <Quiz q="time.time() 回傳什麼?"
      opts={[
        "現在幾點(字串)",
        "從 1970/1/1 到現在的秒數(數字)",
        "今天日期",
        "電腦執行了幾分鐘"
      ]}
      ans={1} explain="time.time() 是 Unix timestamp,從 1970/1/1 00:00 UTC 算起的秒數。要算時間差時兩次相減就好。"/>
  </div>
);

window.Ch21 = Ch21;
window.Ch22 = Ch22;
