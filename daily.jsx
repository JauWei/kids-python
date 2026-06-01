/* ============================================================
   DailyChallenge — 每日挑戰
   Day-of-year-based deterministic challenge selection.
   Streak tracked via localStorage.
   ============================================================ */

const CHALLENGES = [
  { q: "印出 1~100 之間所有 7 的倍數", hint: "for + range + if x % 7 == 0" },
  { q: "輸入一個字串,印出反過來的字串", hint: "字串切片 [::-1] 一招搞定" },
  { q: "輸入兩個數字,印出較大的那個(不能用 max)", hint: "if a > b" },
  { q: "輸入一句話,算出共有幾個字母(不算空格)", hint: "用 len() + replace 或迴圈" },
  { q: "印出 1+2+3+...+50 的總和", hint: "for + 累加變數,或 sum(range(1, 51))" },
  { q: "印一個 5×5 的乘法表", hint: "巢狀 for 迴圈" },
  { q: "輸入年齡,判斷是嬰兒(0-2)、兒童(3-12)、青少年(13-17)、成人(18+)", hint: "if/elif/else" },
  { q: "輸入一個數字,判斷是奇數還是偶數", hint: "x % 2 == 0 → 偶數" },
  { q: "造一個 list 存你 5 個朋友,印出每個朋友前面加「★」", hint: "for f in friends" },
  { q: "輸入一個字,印出該字重複 10 次(用 *)", hint: "字串 * 數字" },
  { q: "用 random.randint(1, 100) 連抽 5 次,印出來", hint: "import random + for" },
  { q: "輸入一個英文單字,把第一個字母變大寫(不能用 .capitalize)", hint: "切片 + .upper()" },
  { q: "造一個 dict 存 3 個國家的首都,讓使用者輸入國家查首都", hint: "if 國家 in d" },
  { q: "判斷一個年份是不是閏年", hint: "% 4 == 0 且 % 100 != 0,或 % 400 == 0" },
  { q: "輸入 3 個分數,印平均、最高、最低", hint: "list + sum/max/min 或迴圈" },
  { q: "用 turtle 畫一個五角星", hint: "for in range(5) + forward + right(144)" },
  { q: "輸入一個數字,判斷是不是質數", hint: "for i in range(2, n) 看有沒有整除" },
  { q: "寫函式 fib(n) 印出費氏數列前 n 個", hint: "a, b = 0, 1 然後迴圈交換" },
  { q: "用 list 推導式造出 1-20 的平方", hint: "[x*x for x in range(1, 21)]" },
  { q: "輸入一段話,統計每個字母各出現幾次", hint: "用 dict 累加" },
  { q: "造一個小猜字遊戲,題目是「PYTHON」,讓使用者一次猜一個字母", hint: "set + while + in" },
  { q: "寫個 BMI 計算機,告訴使用者偏瘦/正常/過重", hint: "float(input) + if/elif" },
  { q: "輸入一個數字 n,印出 1 到 n 的所有約數", hint: "for i in range(1, n+1) + n % i == 0" },
  { q: "用 list 存購物清單,可以新增、移除、印全部", hint: "while True + input + .append / .remove" },
  { q: "輸入兩個 list,印出共同的元素(交集)", hint: "for x in a: if x in b" },
];

const dayKey = (d) => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;

const DailyChallenge = ({ go }) => {
  const today = new Date();
  const todayKey = dayKey(today);

  // Deterministic pick: hash dayKey to index
  let h = 0;
  for (let i = 0; i < todayKey.length; i++) h = ((h << 5) - h) + todayKey.charCodeAt(i) | 0;
  const challenge = CHALLENGES[Math.abs(h) % CHALLENGES.length];

  const [doneToday, setDoneToday] = React.useState(() => {
    try { return localStorage.getItem(`pyu_daily_${todayKey}`) === "done"; } catch { return false; }
  });
  const [streak, setStreak] = React.useState(() => {
    try { return parseInt(localStorage.getItem("pyu_daily_streak") || "0", 10); } catch { return 0; }
  });

  const markDone = () => {
    try {
      localStorage.setItem(`pyu_daily_${todayKey}`, "done");
      // Check if yesterday was also done → continue streak; else reset to 1
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      const wasYesterday = localStorage.getItem(`pyu_daily_${dayKey(yesterday)}`) === "done";
      const newStreak = wasYesterday ? streak + 1 : 1;
      localStorage.setItem("pyu_daily_streak", String(newStreak));
      setStreak(newStreak);
      setDoneToday(true);
    } catch {}
  };

  return (
    <div className="daily-challenge">
      <div className="daily-head">
        <span className="daily-label">📅 今日挑戰 · Daily Challenge</span>
        <span className="daily-streak">🔥 連續 {streak} 天</span>
      </div>
      <div className="daily-q">{challenge.q}</div>
      <div className="daily-hint">💡 提示:{challenge.hint}</div>
      <div className="daily-actions">
        {!doneToday ? (
          <button className="btn btn-primary" onClick={markDone}>✓ 寫完了!</button>
        ) : (
          <span style={{ color: "#16a34a", fontWeight: 700 }}>🎉 今日完成!明天再來</span>
        )}
        {go && <button className="btn btn-ghost" onClick={() => go("ch20")}>到試做框寫</button>}
      </div>
    </div>
  );
};

window.DailyChallenge = DailyChallenge;
