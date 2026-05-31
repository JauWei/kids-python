/* ============================================================
   Cute SVG character — original geometry
   Py 老師 (owl)

   Tries to load assets/characters/owl.{svg,png,webp,jpg}
   and falls back to inline SVG if no image is found.
   ============================================================ */

const useCharImg = (slug) => {
  const [src, setSrc] = React.useState(null);
  React.useEffect(() => {
    const exts = ["svg", "png", "webp", "jpg"];
    let cancelled = false;
    (async () => {
      for (const ext of exts) {
        const url = `assets/characters/${slug}.${ext}`;
        const ok = await new Promise(res => {
          const img = new Image();
          img.onload = () => res(true);
          img.onerror = () => res(false);
          img.src = url;
        });
        if (cancelled) return;
        if (ok) { setSrc(url); return; }
      }
    })();
    return () => { cancelled = true; };
  }, [slug]);
  return src;
};

const CharImg = ({ src, size, alt }) => (
  <img src={src} alt={alt} width={size} height={size}
    style={{ display: "block", width: size, height: size, objectFit: "contain" }}/>
);

const Owl = ({ size = 80, mood = "happy" }) => {
  const src = useCharImg("owl");
  if (src) return <CharImg src={src} size={size} alt="Py 老師"/>;
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} style={{ display: "block" }}>
      {/* ear tufts */}
      <path d="M30 24 L34 12 L40 24 Z" fill="#7c4a0e"/>
      <path d="M60 24 L66 12 L70 24 Z" fill="#7c4a0e"/>
      {/* wings (behind) */}
      <ellipse cx="20" cy="62" rx="7" ry="14" fill="#a16207" transform="rotate(-15 20 62)"/>
      <ellipse cx="80" cy="62" rx="7" ry="14" fill="#a16207" transform="rotate(15 80 62)"/>
      {/* body/head */}
      <ellipse cx="50" cy="55" rx="30" ry="30" fill="#c8853d" stroke="#7c4a0e" strokeWidth="2"/>
      {/* belly */}
      <ellipse cx="50" cy="64" rx="20" ry="18" fill="#fef3c7"/>
      {/* belly stripes */}
      <path d="M36 56 Q40 62 36 68" fill="none" stroke="#e8c479" strokeWidth="1.2"/>
      <path d="M44 58 Q48 64 44 70" fill="none" stroke="#e8c479" strokeWidth="1.2"/>
      <path d="M52 58 Q56 64 52 70" fill="none" stroke="#e8c479" strokeWidth="1.2"/>
      <path d="M60 56 Q64 62 60 68" fill="none" stroke="#e8c479" strokeWidth="1.2"/>
      {/* eye discs */}
      <circle cx="40" cy="50" r="11" fill="#fef3c7" stroke="#7c4a0e" strokeWidth="1.5"/>
      <circle cx="60" cy="50" r="11" fill="#fef3c7" stroke="#7c4a0e" strokeWidth="1.5"/>
      {/* eyes */}
      <circle cx="40" cy="50" r="6" fill="#1a1a2e"/>
      <circle cx="60" cy="50" r="6" fill="#1a1a2e"/>
      <circle cx="42" cy="48" r="2" fill="#fff"/>
      <circle cx="62" cy="48" r="2" fill="#fff"/>
      {/* beak */}
      <path d="M46 60 L54 60 L50 67 Z" fill="#f59e0b" stroke="#b45309" strokeWidth="1"/>
      {/* glasses for teach mood */}
      {mood === "teach" && (
        <g fill="none" stroke="#6366f1" strokeWidth="1.6">
          <circle cx="40" cy="50" r="10"/>
          <circle cx="60" cy="50" r="10"/>
          <line x1="50" y1="50" x2="50" y2="50"/>
          <line x1="49" y1="50" x2="51" y2="50"/>
        </g>
      )}
      {/* feet */}
      <path d="M42 84 L40 90 M45 84 L45 90 M48 84 L50 90" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/>
      <path d="M52 84 L50 90 M55 84 L55 90 M58 84 L60 90" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
};

const Illus = ({ name, desc, icon = "🖼️", small = false, ext = "png" }) => {
  const [loaded, setLoaded] = React.useState(false);
  const [errored, setErrored] = React.useState(false);
  const src = `assets/illus/${name}.${ext}`;

  React.useEffect(() => {
    const img = new Image();
    img.onload = () => setLoaded(true);
    img.onerror = () => setErrored(true);
    img.src = src;
  }, [src]);

  if (loaded && !errored) {
    return (
      <div style={{ margin: "20px 0", borderRadius: 16, overflow: "hidden", boxShadow: "var(--shadow-soft)" }}>
        <img src={src} alt={desc} style={{ display: "block", width: "100%", height: "auto" }}/>
      </div>
    );
  }

  return (
    <div className={`illus-placeholder ${small ? "small" : ""}`}>
      <span className="icon">{icon}</span>
      <div>📷 插畫位置 · Illustration goes here</div>
      <div className="desc">{desc}</div>
      <div className="filename">assets/illus/{name}.{ext}</div>
    </div>
  );
};

window.Owl = Owl;
window.Illus = Illus;
