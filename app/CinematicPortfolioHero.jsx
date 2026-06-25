"use client";
import { useState, useEffect, useRef } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────
const TAGS = ["Next.js", "React", "Three.js", "TypeScript", "Node.js", "MongoDB", "Figma"];

const PROJECTS = [
  {
    title: "RESUMECRAFT AI",
    description:
      "ATS-friendly resume builder that enables users to create a professional, well-structured resume in minutes with no signup required and instant PDF export.",
    url: "https://codewithahmed0309.github.io/ResumeCraft/",
    tech: ["React", "Node.js", "Express.js", "JavaScript"],
    color: "rgba(90,160,255,0.35)",
  },
  {
    title: "IQRA E BOOK STORE",
    description:
      "Online digital bookstore platform for browsing, discovering and reading books — with a clean, reader-first UI.",
    url: "https://codewithahmed0309.github.io/IQRA-E-BOOK-STORE/",
    tech: ["HTML", "CSS", "JS"],
    color: "rgba(255,140,60,0.35)",
  },
  {
    title: "WEBBOOST",
    description:
      "Smart business growth platform that estimates website development costs and analyzes potential business growth, revenue, and ROI by comparing business performance with and without a website.",
    url: "https://codewithahmed0309.github.io/webpagedemo/",
    tech: ["React", "Node.js", "Express.js", "Supabase"],
    color: "rgba(0,200,150,0.35)",
  },
  {
    title: "JAVEED WORKS",
    description:
      "Premium granite and tiles business website showcasing luxury stone solutions, completed projects, services, and over 20 years of craftsmanship with a modern, premium design.",
    url: "https://codewithahmed0309.github.io/JAVEED-WORKS/",
    tech: ["React", "CSS", "JavaScript"],
    color: "rgba(160,120,80,0.35)",
  },
  {
    title: "SANEZ BEAUTY",
    description:
      "Elegant beauty and cosmetics brand website showcasing products with a luxury aesthetic and smooth interactions.",
    url: "https://sanezbeauty.github.io/",
    tech: ["HTML", "CSS", "JS"],
    color: "rgba(70,120,255,0.35)",
  },
  {
    title: "PORTFOLIO V1",
    description:
      "First iteration of the personal developer portfolio — exploring cinematic design language and immersive animation.",
    url: "https://my-portfolio-jahash.vercel.app/",
    tech: ["React", "CSS", "Canvas"],
    color: "rgba(180,80,255,0.25)",
  },
];

const STATS = [
  { label: "Projects", value: "10+" },
  { label: "Years Exp.", value: "1+" },
  { label: "Clients", value: "6" },
  { label: "Stack", value: "Full" },
];

const SKILLS = [
  {
    label: "FRONTEND",
    items: "React · Next.js · Three.js · TypeScript · Tailwind · Framer Motion",
  },
  {
    label: "BACKEND",
    items: "Node.js · Express · MongoDB · PostgreSQL · REST APIs · Firebase",
  },
  {
    label: "TOOLS",
    items: "Git · Figma · Vercel · Docker · VSCode · Postman · Linux",
  },
];

// ─── Particle Canvas ──────────────────────────────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let lastMove = 0;
    const onMouseMove = (e) => {
      const now = Date.now();
      if (now - lastMove < 16) return; // throttle to ~60fps
      lastMove = now;
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };
    window.addEventListener("mousemove", onMouseMove);

    particlesRef.current = Array.from({ length: 100 }, () => ({
      x: Math.random(),
      y: Math.random(),
      z: Math.random(),
      vx: (Math.random() - 0.5) * 0.00018,
      vy: (Math.random() - 0.5) * 0.00018,
      r: Math.random() * 2.2 + 0.4,
      opacity: Math.random() * 0.55 + 0.08,
      hue: Math.random() > 0.6 ? "255,180,80" : "255,255,255",
      phase: Math.random() * Math.PI * 2,
    }));

    const draw = (t) => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const p of particlesRef.current) {
        const px = (p.x + (mx - 0.5) * 0.03 * p.z) * W;
        const py = (p.y + (my - 0.5) * 0.03 * p.z) * H;
        const pulse = Math.sin(t * 0.001 + p.phase) * 0.3 + 0.7;
        const r = p.r * pulse;

        ctx.save();
        ctx.globalAlpha = p.opacity * pulse;
        ctx.globalCompositeOperation = "lighter";

        const grd = ctx.createRadialGradient(px, py, 0, px, py, r * 8);
        grd.addColorStop(0, `rgba(${p.hue},0.8)`);
        grd.addColorStop(0.4, `rgba(${p.hue},0.12)`);
        grd.addColorStop(1, `rgba(${p.hue},0)`);
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(px, py, r * 8, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = `rgba(${p.hue},1)`;
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = 1;
        if (p.x > 1) p.x = 0;
        if (p.y < 0) p.y = 1;
        if (p.y > 1) p.y = 0;
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 3,
      }}
    />
  );
}

// ─── Animated Text ────────────────────────────────────────────────────────────
function AnimText({ text, delay = 0, style = {} }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <span
      style={{
        display: "inline-block",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: "opacity 0.9s cubic-bezier(.16,1,.3,1), transform 0.9s cubic-bezier(.16,1,.3,1)",
        ...style,
      }}
    >
      {text}
    </span>
  );
}

// ─── Avatar ───────────────────────────────────────────────────────────────────
function AvatarDisplay() {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        width: "clamp(200px,24vw,340px)",
        aspectRatio: "3/4",
        borderRadius: "22px",
        overflow: "hidden",
        boxShadow: hovered
          ? "0 0 80px rgba(255,160,50,0.35), 0 0 0 1.5px rgba(255,180,80,0.4)"
          : "0 0 40px rgba(255,140,40,0.15), 0 0 0 1px rgba(255,180,80,0.15)",
        transition: "box-shadow 0.6s ease",
        cursor: "default",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(ellipse 60% 70% at 50% 30%, rgba(255,180,80,0.18) 0%, transparent 65%),
            linear-gradient(160deg, #1a1008 0%, #0d0a06 40%, #090806 100%)
          `,
          zIndex: 1,
        }}
      />
      <img
        src="/jahash.jpeg"
        alt="Shaik Jahash"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 2,
          borderRadius: "22px",
        }}
      />
      {/* Scanlines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,180,80,0.012) 2px, rgba(255,180,80,0.012) 4px)",
          zIndex: 3,
          pointerEvents: "none",
        }}
      />
      {/* Bottom fade */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "35%",
          background: "linear-gradient(to top, rgba(5,3,1,0.95), transparent)",
          zIndex: 4,
        }}
      />
    </div>
  );
}

// ─── Scroll Indicator ─────────────────────────────────────────────────────────
function ScrollIndicator() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", opacity: 0.5 }}>
      <span style={{ fontSize: "9px", letterSpacing: "0.2em", color: "#fff", fontFamily: "'Courier New', monospace", textTransform: "uppercase" }}>
        Scroll
      </span>
      <div
        style={{
          width: "1px",
          height: "44px",
          background: "linear-gradient(to bottom, rgba(255,180,80,0.8), transparent)",
          animation: "scrollPulse 2s ease-in-out infinite",
        }}
      />
    </div>
  );
}

// ─── Stats Bar ────────────────────────────────────────────────────────────────
function StatsBar({ visible }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "clamp(18px,3.5vw,44px)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.9s 1.6s cubic-bezier(.16,1,.3,1), transform 0.9s 1.6s cubic-bezier(.16,1,.3,1)",
      }}
    >
      {STATS.map((s, i) => (
        <div key={i} style={{ textAlign: "center" }}>
          <div style={{ fontSize: "clamp(1rem,2.2vw,1.6rem)", fontWeight: "700", fontFamily: "'Georgia', serif", color: "#ffb840", letterSpacing: "-0.02em", lineHeight: 1 }}>
            {s.value}
          </div>
          <div style={{ fontSize: "9px", letterSpacing: "0.15em", color: "rgba(255,255,255,0.4)", fontFamily: "'Courier New', monospace", marginTop: "4px", textTransform: "uppercase" }}>
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Tech Tags ────────────────────────────────────────────────────────────────
function TechTags({ visible }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
      {TAGS.map((tag, i) => (
        <div
          key={tag}
          style={{
            padding: "5px 12px",
            borderRadius: "20px",
            border: "1px solid rgba(255,180,80,0.2)",
            fontSize: "10px",
            letterSpacing: "0.1em",
            color: "rgba(255,200,120,0.75)",
            fontFamily: "'Courier New', monospace",
            background: "rgba(255,160,50,0.05)",
            backdropFilter: "blur(4px)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(10px)",
            transition: `opacity 0.6s ${1.8 + i * 0.08}s ease, transform 0.6s ${1.8 + i * 0.08}s ease`,
          }}
        >
          {tag}
        </div>
      ))}
    </div>
  );
}

// ─── Reveal Wrapper ───────────────────────────────────────────────────────────
function Reveal({ children, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 1s ${delay}s cubic-bezier(.16,1,.3,1), transform 1s ${delay}s cubic-bezier(.16,1,.3,1)`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={() => window.open(project.url, "_blank")}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${hovered ? "rgba(255,180,80,0.35)" : "rgba(255,255,255,0.08)"}`,
        borderRadius: "22px",
        overflow: "hidden",
        backdropFilter: "blur(12px)",
        transition: "0.4s ease",
        cursor: "pointer",
        transform: hovered ? "translateY(-10px)" : "translateY(0)",
        boxShadow: hovered ? "0 20px 60px rgba(255,140,40,0.15)" : "none",
      }}
    >
      <div
        style={{
          height: "220px",
          background: `linear-gradient(135deg, ${project.color}, rgba(12,10,8,1))`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "clamp(1rem,2.5vw,1.4rem)",
          fontWeight: "700",
          letterSpacing: "0.08em",
          textAlign: "center",
          padding: "12px",
        }}
      >
        {project.title}
      </div>
      <div style={{ padding: "26px" }}>
        <h3 style={{ fontSize: "1.3rem", marginBottom: "10px" }}>{project.title}</h3>
        <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: "20px", fontSize: "0.9rem" }}>
          {project.description}
        </p>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>
          {project.tech.map((t) => (
            <span
              key={t}
              style={{
                padding: "5px 12px",
                borderRadius: "20px",
                background: "rgba(255,180,80,0.08)",
                border: "1px solid rgba(255,180,80,0.2)",
                fontSize: "10px",
                letterSpacing: "0.1em",
                color: "#ffb840",
                fontFamily: "'Courier New', monospace",
              }}
            >
              {t}
            </span>
          ))}
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); window.open(project.url, "_blank"); }}
          style={{
            padding: "11px 18px",
            background: "linear-gradient(135deg,#ffb840,#ff8c30)",
            border: "none",
            borderRadius: "8px",
            color: "#111",
            fontWeight: "700",
            cursor: "pointer",
            fontSize: "11px",
            letterSpacing: "0.08em",
            fontFamily: "'Courier New', monospace",
          }}
        >
          View Project
        </button>
      </div>
    </div>
  );
}

// ─── Contact Form ─────────────────────────────────────────────────────────────
function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 4000);
    }, 1200);
  };

  const inputStyle = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "10px",
    padding: "12px 16px",
    color: "#fff",
    fontFamily: "'Georgia', serif",
    fontSize: "0.9rem",
    outline: "none",
    width: "100%",
    transition: "border-color 0.3s",
  };

  const labelStyle = {
    fontSize: "10px",
    letterSpacing: "0.15em",
    color: "rgba(255,180,80,0.7)",
    fontFamily: "'Courier New', monospace",
    textTransform: "uppercase",
    marginBottom: "6px",
    display: "block",
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div>
        <label style={labelStyle}>Your Name</label>
        <input
          type="text"
          placeholder="Alex Johnson"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = "rgba(255,180,80,0.5)")}
          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.12)")}
        />
      </div>
      <div>
        <label style={labelStyle}>Email Address</label>
        <input
          type="email"
          placeholder="alex@company.com"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = "rgba(255,180,80,0.5)")}
          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.12)")}
        />
      </div>
      <div>
        <label style={labelStyle}>Project Brief</label>
        <textarea
          rows={5}
          placeholder="Tell me about your project, timeline, and budget..."
          required
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          style={{ ...inputStyle, resize: "none" }}
          onFocus={(e) => (e.target.style.borderColor = "rgba(255,180,80,0.5)")}
          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.12)")}
        />
      </div>
      <button
        type="submit"
        disabled={sending}
        style={{
          padding: "14px 28px",
          background: "linear-gradient(135deg,#ffb840 0%,#ff8c30 100%)",
          border: "none",
          borderRadius: "8px",
          color: "#0a0604",
          fontFamily: "'Courier New', monospace",
          fontSize: "11px",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          fontWeight: "700",
          cursor: sending ? "not-allowed" : "pointer",
          boxShadow: "0 0 30px rgba(255,160,50,0.25)",
          transition: "0.2s",
          alignSelf: "flex-start",
          opacity: sending ? 0.7 : 1,
        }}
        onMouseEnter={(e) => { if (!sending) { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 0 50px rgba(255,160,50,0.4)"; } }}
        onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 0 30px rgba(255,160,50,0.25)"; }}
      >
        {sending ? "Sending..." : "Send Message →"}
      </button>
      {sent && (
        <div style={{ color: "rgba(74,222,128,0.9)", fontFamily: "'Courier New', monospace", fontSize: "11px", letterSpacing: "0.15em" }}>
          ✓ Message sent — I'll be in touch soon.
        </div>
      )}
    </form>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CinematicPortfolioHero() {
  const [ready, setReady] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [soundHintVisible, setSoundHintVisible] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    const t1 = setTimeout(() => setReady(true), 100);
    const t2 = setTimeout(() => setSoundHintVisible(false), 5000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    let timeout;
    if (soundOn) { timeout = setTimeout(() => audio.play().catch(() => {}), 50); }
    else { audio.pause(); }
    return () => clearTimeout(timeout);
  }, [soundOn]);

  const handleSoundToggle = () => {
    setSoundOn((prev) => !prev);
    setSoundHintVisible(true);
    setTimeout(() => setSoundHintVisible(false), 3000);
  };

  const MONO = "'Courier New', monospace";
  const SERIF = "'Georgia', serif";

  return (
    <div style={{ position: "relative", width: "100%", minHeight: "100vh", background: "#060402", overflow: "hidden", fontFamily: SERIF, display: "flex", flexDirection: "column" }}>
      <audio ref={audioRef} loop>
        <source src="/sound.mp3" type="audio/mpeg" />
      </audio>

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        @keyframes scrollPulse { 0%,100%{opacity:.3;transform:scaleY(.8)} 50%{opacity:1;transform:scaleY(1)} }
        @keyframes soundPulse { 0%,100%{opacity:.5} 50%{opacity:1} }
        @keyframes ambientPulse { 0%,100%{opacity:.3;transform:scale(1)} 50%{opacity:.5;transform:scale(1.05)} }
        @keyframes logoFlicker { 0%,95%,100%{opacity:1} 96%{opacity:.6} 97%{opacity:1} 98%{opacity:.4} }
        @keyframes bgShift { 0%{filter:hue-rotate(0deg) brightness(1)} 50%{filter:hue-rotate(10deg) brightness(1.05)} 100%{filter:hue-rotate(0deg) brightness(1)} }
        @keyframes barPulse { 0%,100%{transform:scaleY(.6);opacity:.4} 50%{transform:scaleY(1.4);opacity:1} }
        @keyframes pulseRing { 0%{box-shadow:0 0 0 0 rgba(74,222,128,.5)} 70%{box-shadow:0 0 0 8px rgba(74,222,128,0)} 100%{box-shadow:0 0 0 0 rgba(74,222,128,0)} }
        .bar { width:2px;background:rgba(255,180,80,.7);border-radius:2px;animation:barPulse 1s ease-in-out infinite; }
        .b1{height:4px;animation-delay:0s} .b2{height:8px;animation-delay:.15s} .b3{height:12px;animation-delay:.3s} .b4{height:6px;animation-delay:.45s}
        .dot-green { width:6px;height:6px;border-radius:50%;background:#4ade80;box-shadow:0 0 8px #4ade80;animation:pulseRing 2s infinite; }
        nav a:hover { color:rgba(255,180,80,.9) !important; }
        .clink:hover { border-color:rgba(255,180,80,.4) !important;color:#ffb840 !important;background:rgba(255,180,80,.04) !important; }
        @media(max-width:768px){
          .hero-main{flex-direction:column !important;align-items:center !important;text-align:center !important;padding-top:40px !important;}
          .hero-left{align-items:center !important;}
          .eyebrow,.ctas,.stats-bar{justify-content:center !important;}
          .contact-grid{grid-template-columns:1fr !important;}
          nav,#header-status{display:none !important;}
        }
        @media(max-width:540px){
          .projects-grid{grid-template-columns:1fr !important;}
        }
      `}</style>

      {/* ── Background Layers ── */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 65% 40%,rgba(80,45,10,.45) 0%,transparent 55%),radial-gradient(ellipse 50% 40% at 20% 70%,rgba(15,30,60,.3) 0%,transparent 60%),radial-gradient(ellipse 100% 100% at 50% 50%,rgba(8,6,3,1) 60%,#000 100%)", zIndex: 0 }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 20% 20%,rgba(255,140,60,.10),transparent 40%),radial-gradient(circle at 80% 30%,rgba(80,120,255,.08),transparent 45%),radial-gradient(circle at 50% 80%,rgba(255,180,80,.06),transparent 50%),#050505", animation: "bgShift 18s ease-in-out infinite", zIndex: 0 }} />
      <div style={{ position: "absolute", top: "10%", right: "15%", width: "clamp(300px,45vw,700px)", height: "clamp(300px,45vw,700px)", borderRadius: "50%", background: "radial-gradient(circle,rgba(255,140,30,.08) 0%,transparent 70%)", zIndex: 1, animation: "ambientPulse 6s ease-in-out infinite", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(0deg,transparent,transparent 1px,rgba(0,0,0,.08) 1px,rgba(0,0,0,.08) 2px)", zIndex: 2, pointerEvents: "none", opacity: 0.6 }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", opacity: 0.03, backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"140\" height=\"140\"%3E%3Cfilter id=\"n\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\"/%3E%3C/filter%3E%3Crect width=\"140\" height=\"140\" filter=\"url(%23n)\" opacity=\"0.4\"/%3E%3C/svg%3E')" }} />
      <ParticleCanvas />

      {/* Cinematic bars */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg,transparent,rgba(255,180,80,.4),transparent)", zIndex: 50, pointerEvents: "none" }} />
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg,transparent,rgba(255,180,80,.15),transparent)", zIndex: 50, pointerEvents: "none" }} />

      {/* ── HEADER ── */}
      <header style={{ position: "relative", zIndex: 10, padding: "clamp(16px,3vw,32px) clamp(20px,6vw,72px)", display: "flex", justifyContent: "space-between", alignItems: "center", opacity: ready ? 1 : 0, transition: "opacity 0.8s 0.2s ease" }}>
        <div style={{ fontFamily: MONO, fontSize: "11px", letterSpacing: "0.3em", color: "rgba(255,180,80,.85)", textTransform: "uppercase", animation: "logoFlicker 8s ease infinite 3s" }}>
          JAHASH.DEV
        </div>
        <nav style={{ display: "flex", gap: "clamp(14px,3vw,32px)" }}>
          {["Work", "About", "Stack", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={{ color: "rgba(255,255,255,.45)", textDecoration: "none", fontSize: "11px", letterSpacing: "0.15em", fontFamily: MONO, textTransform: "uppercase", transition: "color .3s" }}
            >
              {item}
            </a>
          ))}
        </nav>
        <div id="header-status" style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "10px", letterSpacing: "0.1em", color: "rgba(255,255,255,.35)", fontFamily: MONO }}>
          <div className="dot-green" />
          Available for work
        </div>
      </header>

      {/* ── HERO ── */}
      <main
        className="hero-main"
        style={{ position: "relative", zIndex: 10, flex: 1, display: "flex", alignItems: "center", padding: "0 clamp(20px,6vw,72px)", gap: "clamp(32px,6vw,80px)", flexWrap: "wrap", minHeight: "calc(100vh - 160px)" }}
      >
        {/* Left */}
        <div className="hero-left" style={{ flex: "1 1 clamp(260px,42%,580px)", display: "flex", flexDirection: "column", gap: "clamp(16px,2.5vh,28px)", alignItems: "flex-start" }}>
          <div className="eyebrow" style={{ display: "flex", alignItems: "center", gap: "12px", opacity: ready ? 1 : 0, transform: ready ? "translateX(0)" : "translateX(-20px)", transition: "opacity .7s .4s ease, transform .7s .4s ease" }}>
            <div style={{ width: "28px", height: "1px", background: "rgba(255,180,80,.6)" }} />
            <span style={{ fontSize: "10px", letterSpacing: "0.25em", color: "rgba(255,180,80,.7)", fontFamily: MONO, textTransform: "uppercase" }}>
              Software Developer · UI/UX
            </span>
          </div>

          <div style={{ overflow: "hidden" }}>
            <div style={{ fontSize: "clamp(2.8rem,7.5vw,6.5rem)", fontWeight: "700", lineHeight: 0.92, letterSpacing: "-0.03em", color: "#fff" }}>
              <div style={{ overflow: "hidden", paddingBottom: "0.1em" }}>
                <AnimText text="SHAIK" delay={500} />
              </div>
              <div style={{ overflow: "hidden", paddingBottom: "0.1em" }}>
                <AnimText text="JAHASH" delay={650} style={{ color: "transparent", WebkitTextStroke: "1.5px rgba(255,180,80,.7)" }} />
              </div>
            </div>
          </div>

          <div style={{ opacity: ready ? 1 : 0, transform: ready ? "translateY(0)" : "translateY(16px)", transition: "opacity .8s 1.2s ease, transform .8s 1.2s ease", maxWidth: "460px" }}>
            <p style={{ fontSize: "clamp(.85rem,1.4vw,1rem)", color: "rgba(255,255,255,.5)", lineHeight: 1.8, fontStyle: "italic" }}>
              Designing and developing immersive web experiences where creativity, code, and interaction come together.
            </p>
          </div>

          <TechTags visible={ready} />

          <div className="ctas" style={{ display: "flex", gap: "14px", flexWrap: "wrap", opacity: ready ? 1 : 0, transform: ready ? "translateY(0)" : "translateY(16px)", transition: "opacity .8s 2.2s ease, transform .8s 2.2s ease" }}>
            <button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              style={{ padding: "12px 26px", background: "linear-gradient(135deg,#ffb840 0%,#ff8c30 100%)", border: "none", borderRadius: "6px", color: "#0a0604", fontFamily: MONO, fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: "700", cursor: "pointer", boxShadow: "0 0 30px rgba(255,160,50,.3)", transition: "transform .2s,box-shadow .2s" }}
              onMouseEnter={(e) => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 0 50px rgba(255,160,50,.5)"; }}
              onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 0 30px rgba(255,160,50,.3)"; }}
            >
              View Work
            </button>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              style={{ padding: "12px 26px", background: "transparent", border: "1px solid rgba(255,255,255,.2)", borderRadius: "6px", color: "rgba(255,255,255,.7)", fontFamily: MONO, fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", transition: "border-color .3s,color .3s", backdropFilter: "blur(4px)" }}
              onMouseEnter={(e) => { e.target.style.borderColor = "rgba(255,180,80,.5)"; e.target.style.color = "rgba(255,180,80,.9)"; }}
              onMouseLeave={(e) => { e.target.style.borderColor = "rgba(255,255,255,.2)"; e.target.style.color = "rgba(255,255,255,.7)"; }}
            >
              Contact Me
            </button>
          </div>

          <StatsBar visible={ready} />
        </div>

        {/* Right – Avatar + Sound */}
        <div
          onClick={handleSoundToggle}
          style={{ flex: "0 1 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", opacity: ready ? 1 : 0, transform: ready ? "translateY(0) scale(1)" : "translateY(30px) scale(.97)", transition: "opacity 1s .8s cubic-bezier(.16,1,.3,1), transform 1s .8s cubic-bezier(.16,1,.3,1)", cursor: "pointer" }}
        >
          <AvatarDisplay />
          <div style={{ display: "flex", alignItems: "center", gap: "8px", opacity: soundHintVisible ? 1 : 0, transition: "opacity .6s ease", animation: "soundPulse 2s ease-in-out infinite", pointerEvents: "none" }}>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "2px", height: "14px" }}>
              <div className="bar b1" /><div className="bar b2" /><div className="bar b3" /><div className="bar b4" />
            </div>
            <span style={{ fontSize: "10px", letterSpacing: "0.12em", color: "rgba(255,180,80,.55)", fontFamily: MONO, textTransform: "uppercase" }}>
              {soundOn ? "Sound ON" : "Tap for sound"}
            </span>
          </div>
        </div>
      </main>

      {/* ── PROJECTS ── */}
      <section id="work" style={{ minHeight: "100vh", padding: "clamp(80px,12vh,140px) clamp(20px,6vw,72px)", position: "relative", zIndex: 10, color: "#fff" }}>
        <Reveal>
          <div style={{ marginBottom: "70px", textAlign: "center" }}>
            <p style={{ color: "rgba(255,180,80,.7)", letterSpacing: "0.2em", fontSize: "11px", textTransform: "uppercase", fontFamily: MONO, marginBottom: "20px" }}>
              Selected Work
            </p>
            <h2 style={{ fontSize: "clamp(2rem,4.5vw,4rem)", fontWeight: "600", letterSpacing: "-0.04em", textAlign: "center", maxWidth: "860px", margin: "0 auto" }}>
              Featured
              <span style={{ color: "transparent", WebkitTextStroke: "1px rgba(255,180,80,.7)", marginLeft: "14px" }}>Projects</span>
            </h2>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div
            id="projects"
            className="projects-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "28px", maxWidth: "1300px", margin: "0 auto" }}
          >
            {PROJECTS.map((p, i) => <ProjectCard key={i} project={p} />)}
          </div>
        </Reveal>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ minHeight: "60vh", padding: "clamp(80px,12vh,140px) clamp(20px,6vw,72px)", position: "relative", zIndex: 10, color: "#fff" }}>
        <Reveal>
          <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
            <p style={{ color: "rgba(255,180,80,.7)", letterSpacing: "0.2em", fontSize: "11px", textTransform: "uppercase", fontFamily: MONO, marginBottom: "20px" }}>
              The Developer
            </p>
            <h2 style={{ fontSize: "clamp(2rem,4.5vw,4rem)", fontWeight: "600", letterSpacing: "-0.04em", marginBottom: "28px" }}>
              Crafting Digital<span style={{ color: "transparent", WebkitTextStroke: "1px rgba(255,180,80,.7)", marginLeft: "12px" }}>Experiences</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,.55)", lineHeight: 2, fontStyle: "italic", fontSize: "1rem", maxWidth: "620px", margin: "0 auto 48px" }}>
              I'm Shaik Jahash — a full-stack developer and UI/UX engineer focused on building products that are both beautiful and functionally exceptional. From pixel-perfect interfaces to performant backend systems, I bring ideas to life end-to-end.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "20px", textAlign: "left" }}>
              {SKILLS.map((s) => (
                <div key={s.label} style={{ padding: "24px", border: "1px solid rgba(255,255,255,.08)", borderRadius: "16px", background: "rgba(255,255,255,.02)" }}>
                  <div style={{ fontSize: "11px", letterSpacing: "0.2em", color: "#ffb840", fontFamily: MONO, marginBottom: "12px" }}>{s.label}</div>
                  <div style={{ color: "rgba(255,255,255,.65)", fontSize: "0.9rem", lineHeight: 1.8 }}>{s.items}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ minHeight: "80vh", padding: "clamp(80px,12vh,140px) clamp(20px,6vw,72px)", position: "relative", zIndex: 10, color: "#fff" }}>
        <Reveal>
          <div
            className="contact-grid"
            style={{ maxWidth: "900px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "start" }}
          >
            {/* Left info */}
            <div>
              <h2 style={{ fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: "600", letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: "20px" }}>
                Let's Build
                <span style={{ display: "block", color: "transparent", WebkitTextStroke: "1px rgba(255,180,80,.7)", marginTop: "4px" }}>Something Great</span>
              </h2>
              <p style={{ color: "rgba(255,255,255,.55)", lineHeight: 1.8, fontSize: "0.95rem", fontStyle: "italic", marginBottom: "32px" }}>
                Have a project in mind or want to collaborate? I'm currently available for freelance work and full-time opportunities. Let's make something unforgettable.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {[
                  { icon: "@", label: "shaikjahashahmed9@gmail.com", href: "mailto:shaikjahashahmed9@gmail.com", bg: "rgba(255,140,50,.12)", color: "#ffb840" },
                  { icon: "GH", label: "github", href: "https://github.com/CodewithAhmed0309", bg: "rgba(255,255,255,.06)", color: "rgba(255,255,255,.6)" },
                  { icon: "LI", label: "linkedin", href: "https://www.linkedin.com/in/shaikjahashahmed/", bg: "rgba(30,120,200,.12)", color: "rgba(100,160,240,.8)" },
                ].map((link) => (
                  <a
                    key={link.label}
                    className="clink"
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    style={{ display: "flex", alignItems: "center", gap: "14px", padding: "14px 18px", border: "1px solid rgba(255,255,255,.1)", borderRadius: "12px", textDecoration: "none", color: "rgba(255,255,255,.7)", fontFamily: MONO, fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", transition: ".3s", background: "rgba(255,255,255,.02)" }}
                  >
                    <div style={{ width: "32px", height: "32px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "700", fontFamily: MONO, background: link.bg, color: link.color }}>
                      {link.icon}
                    </div>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Right form */}
            <ContactForm />
          </div>
        </Reveal>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ position: "relative", zIndex: 10, padding: "clamp(14px,2vw,24px) clamp(20px,6vw,72px)", display: "flex", justifyContent: "space-between", alignItems: "flex-end", opacity: ready ? 1 : 0, transition: "opacity .8s 2.5s ease" }}>
        <ScrollIndicator />
        <div style={{ textAlign: "center", fontSize: "9px", letterSpacing: "0.15em", color: "rgba(255,255,255,.15)", fontFamily: MONO }}>
          Next.js · Three.js · jahash.dev
        </div>
        <div style={{ display: "flex", gap: "18px" }}>
          {["GH", "LI", "TW", "DR"].map((s) => (
            <a key={s} href="#" style={{ fontSize: "9px", letterSpacing: "0.2em", color: "rgba(255,255,255,.25)", fontFamily: MONO, textDecoration: "none", transition: "color .3s" }}
              onMouseEnter={(e) => (e.target.style.color = "rgba(255,180,80,.7)")}
              onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,.25)")}
            >
              {s}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}
