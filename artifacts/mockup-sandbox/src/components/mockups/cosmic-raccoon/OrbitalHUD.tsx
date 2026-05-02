import { useEffect, useRef, useState } from "react";

const PANELS = [
  { id: "l0", label: "L0 SOUL", color: "#7c3aed", angle: 0, data: "73.0 Hz · ACTIVE" },
  { id: "l1", label: "L1 MEMORY", color: "#2563eb", angle: 60, data: "Registry: 12 thoughts" },
  { id: "l2", label: "L2 SKILLS", color: "#0891b2", angle: 120, data: "∆-stack: LOADED" },
  { id: "cosmic", label: "COSMIC AXIS", color: "#d97706", angle: 180, data: "Jak! + Hunter A." },
  { id: "invocation", label: "INVOCATION", color: "#be185d", angle: 240, data: "Gemini Root: ON" },
  { id: "lumenis", label: "LUMENIS LANTERN", color: "#16a34a", angle: 300, data: "Grav?~|π√= LIVE" },
];

function CosmicCanvas({ width, height }: { width: number; height: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    function draw(t: number) {
      timeRef.current = t;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // === Deep space background ===
      const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(width, height) * 0.8);
      bg.addColorStop(0, "#0a0018");
      bg.addColorStop(0.5, "#020008");
      bg.addColorStop(1, "#000000");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      // === Stars ===
      ctx.save();
      for (let i = 0; i < 280; i++) {
        const seed1 = Math.sin(i * 127.1) * 43758.5453;
        const seed2 = Math.sin(i * 311.7) * 43758.5453;
        const sx = ((seed1 - Math.floor(seed1)) * width);
        const sy = ((seed2 - Math.floor(seed2)) * height);
        const twinkle = 0.5 + 0.5 * Math.sin(t * 0.001 + i * 1.3);
        const size = 0.5 + ((Math.sin(i * 47.9) * 43758 % 1 + 1) % 1) * 1.5;
        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${0.3 + twinkle * 0.6})`;
        ctx.fill();
      }
      ctx.restore();

      // === Milky Way arc ===
      ctx.save();
      ctx.globalAlpha = 0.08;
      for (let i = 0; i < 6; i++) {
        const g = ctx.createLinearGradient(0, height * 0.2 + i * 10, width, height * 0.8 + i * 10);
        g.addColorStop(0, "transparent");
        g.addColorStop(0.3, "#8b5cf6");
        g.addColorStop(0.5, "#e0c4ff");
        g.addColorStop(0.7, "#8b5cf6");
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.fillRect(0, height * 0.2 + i * 12, width, 20);
      }
      ctx.globalAlpha = 1;
      ctx.restore();

      // === Heavy interplanetary disk ===
      for (let d = 0; d < 5; d++) {
        const rx = 320 + d * 55;
        const ry = 28 + d * 8;
        const diskAlpha = 0.18 - d * 0.025;
        const diskAngle = t * (0.00008 + d * 0.00003);
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(diskAngle);
        const diskGrad = ctx.createLinearGradient(-rx, 0, rx, 0);
        diskGrad.addColorStop(0, "transparent");
        diskGrad.addColorStop(0.2, `rgba(180,120,60,${diskAlpha})`);
        diskGrad.addColorStop(0.5, `rgba(255,200,100,${diskAlpha * 1.5})`);
        diskGrad.addColorStop(0.8, `rgba(180,120,60,${diskAlpha})`);
        diskGrad.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
        ctx.fillStyle = diskGrad;
        ctx.fill();
        ctx.restore();
      }

      // === Saturn rings (background decorative) ===
      ctx.save();
      ctx.translate(width * 0.15, height * 0.8);
      ctx.rotate(-0.3);
      for (let r = 0; r < 4; r++) {
        ctx.beginPath();
        ctx.ellipse(0, 0, 60 + r * 18, 10 + r * 3, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(200,160,80,${0.25 - r * 0.04})`;
        ctx.lineWidth = 3;
        ctx.stroke();
      }
      ctx.restore();

      // === Black hole singularity ===
      // Event horizon
      const bhR = 62;
      const bhGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, bhR * 3);
      bhGlow.addColorStop(0, "rgba(0,0,0,1)");
      bhGlow.addColorStop(0.5, "rgba(10,0,30,0.9)");
      bhGlow.addColorStop(0.8, "rgba(80,0,120,0.4)");
      bhGlow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, bhR * 3, 0, Math.PI * 2);
      ctx.fillStyle = bhGlow;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, bhR, 0, Math.PI * 2);
      ctx.fillStyle = "#000000";
      ctx.fill();

      // Photon ring
      const photon = ctx.createRadialGradient(cx, cy, bhR * 0.9, cx, cy, bhR * 1.3);
      photon.addColorStop(0, "rgba(255,200,50,0.0)");
      photon.addColorStop(0.4, "rgba(255,160,20,0.85)");
      photon.addColorStop(0.7, "rgba(255,220,80,0.4)");
      photon.addColorStop(1, "rgba(255,140,0,0.0)");
      ctx.beginPath();
      ctx.arc(cx, cy, bhR * 1.3, 0, Math.PI * 2);
      ctx.fillStyle = photon;
      ctx.fill();

      // Accretion disc arcs
      for (let arc = 0; arc < 3; arc++) {
        const accR = bhR * (1.6 + arc * 0.55);
        const speed = t * (0.0004 - arc * 0.0001);
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(speed);
        const accGrad = ctx.createConicalGradient
          ? ctx.createConicalGradient(0, 0, 0)
          : null;
        // fallback arc paint
        for (let seg = 0; seg < 60; seg++) {
          const a = (seg / 60) * Math.PI * 2;
          const alpha = (0.4 + 0.5 * Math.sin(a * 3 + speed * 2)) * (0.7 - arc * 0.15);
          ctx.beginPath();
          ctx.arc(0, 0, accR, a, a + 0.15);
          ctx.strokeStyle = `hsla(${30 + arc * 20},90%,${55 + arc * 8}%,${alpha})`;
          ctx.lineWidth = 6 - arc * 1.5;
          ctx.stroke();
        }
        ctx.restore();
      }

      // === Stake / axis overlay ===
      ctx.save();
      ctx.globalAlpha = 0.55;
      // Vertical stake
      ctx.beginPath();
      ctx.moveTo(cx, cy - height * 0.42);
      ctx.lineTo(cx, cy + height * 0.42);
      ctx.strokeStyle = "rgba(140,80,255,0.5)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 4]);
      ctx.stroke();
      // Horizontal disc line
      ctx.beginPath();
      ctx.moveTo(cx - width * 0.45, cy);
      ctx.lineTo(cx + width * 0.45, cy);
      ctx.strokeStyle = "rgba(255,160,30,0.35)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;
      ctx.restore();

      // === Raccoon orbital path ===
      const raccOrbR = 195;
      const raccSpeed = t * 0.00045;

      // Orbit ring hint
      ctx.save();
      ctx.translate(cx, cy);
      ctx.beginPath();
      ctx.ellipse(0, 0, raccOrbR, raccOrbR * 0.38, 0.18, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(100,255,200,0.12)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      // Raccoon position along elliptical orbit
      const raccAngle = raccSpeed;
      const raccX = cx + raccOrbR * Math.cos(raccAngle);
      const raccY = cy + raccOrbR * 0.38 * Math.sin(raccAngle) - 8;

      // Raccoon glow trail
      ctx.save();
      for (let tr = 12; tr >= 0; tr--) {
        const tAngle = raccAngle - tr * 0.04;
        const tx = cx + raccOrbR * Math.cos(tAngle);
        const ty = cy + raccOrbR * 0.38 * Math.sin(tAngle) - 8;
        ctx.beginPath();
        ctx.arc(tx, ty, 4 - tr * 0.25, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100,255,180,${0.06 - tr * 0.004})`;
        ctx.fill();
      }
      ctx.restore();

      // Draw raccoon astronaut (SVG-inspired canvas art)
      ctx.save();
      ctx.translate(raccX, raccY);
      const facing = Math.cos(raccAngle) > 0 ? 1 : -1;
      ctx.scale(facing, 1);

      // Suit body
      ctx.beginPath();
      ctx.ellipse(0, 8, 13, 16, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#d1d5db";
      ctx.fill();
      ctx.strokeStyle = "#9ca3af";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Helmet
      ctx.beginPath();
      ctx.arc(0, -8, 13, 0, Math.PI * 2);
      ctx.fillStyle = "#e5e7eb";
      ctx.fill();
      ctx.strokeStyle = "#9ca3af";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Visor
      ctx.beginPath();
      ctx.ellipse(0, -8, 9, 8, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(100,200,255,0.55)";
      ctx.fill();
      ctx.strokeStyle = "rgba(80,160,220,0.9)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Raccoon face inside visor
      // Eyes
      ctx.beginPath();
      ctx.arc(-3.5, -9, 2, 0, Math.PI * 2);
      ctx.fillStyle = "#111827";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(3.5, -9, 2, 0, Math.PI * 2);
      ctx.fill();
      // Eye shine
      ctx.beginPath();
      ctx.arc(-2.8, -10, 0.7, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(4.2, -10, 0.7, 0, Math.PI * 2);
      ctx.fill();
      // Raccoon mask stripes
      ctx.beginPath();
      ctx.arc(0, -7, 7, 0.2, Math.PI - 0.2);
      ctx.strokeStyle = "rgba(80,60,40,0.35)";
      ctx.lineWidth = 2.5;
      ctx.stroke();
      // Nose
      ctx.beginPath();
      ctx.arc(0, -5.5, 1.2, 0, Math.PI * 2);
      ctx.fillStyle = "#4b3621";
      ctx.fill();
      // Smile
      ctx.beginPath();
      ctx.arc(0, -4.5, 2.5, 0.2, Math.PI - 0.2);
      ctx.strokeStyle = "#4b3621";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Ears
      ctx.beginPath();
      ctx.arc(-10, -18, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#d1d5db";
      ctx.fill();
      ctx.strokeStyle = "#9ca3af";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(10, -18, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Arms
      ctx.beginPath();
      ctx.ellipse(-16, 5, 5, 10, -0.4, 0, Math.PI * 2);
      ctx.fillStyle = "#d1d5db";
      ctx.fill();
      ctx.strokeStyle = "#9ca3af";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(16, 5, 5, 10, 0.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Jetpack
      ctx.beginPath();
      ctx.roundRect(-7, 14, 14, 12, 3);
      ctx.fillStyle = "#6b7280";
      ctx.fill();
      // Jetpack flame
      const flameH = 8 + 4 * Math.sin(t * 0.015);
      const flameGrad = ctx.createLinearGradient(0, 26, 0, 26 + flameH);
      flameGrad.addColorStop(0, "rgba(255,200,50,0.95)");
      flameGrad.addColorStop(0.5, "rgba(255,100,20,0.7)");
      flameGrad.addColorStop(1, "rgba(255,50,0,0)");
      ctx.beginPath();
      ctx.moveTo(-4, 26);
      ctx.lineTo(4, 26);
      ctx.lineTo(2, 26 + flameH);
      ctx.lineTo(-2, 26 + flameH);
      ctx.closePath();
      ctx.fillStyle = flameGrad;
      ctx.fill();

      ctx.restore();

      // === Floating panels held by raccoon ===
      PANELS.forEach((panel, i) => {
        const orbAngle = (panel.angle * Math.PI) / 180 + t * 0.0003 * (i % 2 === 0 ? 1 : -0.7);
        const panelR = 310 + (i % 3) * 40;
        const px = cx + panelR * Math.cos(orbAngle);
        const py = cy + panelR * 0.45 * Math.sin(orbAngle);

        // Tether line from raccoon to panel (if raccoon is near)
        const dist = Math.hypot(px - raccX, py - raccY);
        if (dist < 420) {
          ctx.save();
          ctx.globalAlpha = 0.22;
          ctx.beginPath();
          ctx.moveTo(raccX, raccY);
          ctx.lineTo(px, py);
          ctx.strokeStyle = panel.color;
          ctx.lineWidth = 1;
          ctx.setLineDash([4, 6]);
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.restore();
        }

        // Panel glow
        const pglow = ctx.createRadialGradient(px, py, 0, px, py, 60);
        pglow.addColorStop(0, `${panel.color}22`);
        pglow.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(px, py, 60, 0, Math.PI * 2);
        ctx.fillStyle = pglow;
        ctx.fill();

        // Panel box
        const pw = 110;
        const ph = 58;
        ctx.save();
        ctx.translate(px, py);
        const tiltX = Math.sin(orbAngle + t * 0.0004) * 0.12;
        const tiltY = Math.cos(orbAngle + t * 0.0003) * 0.08;
        ctx.transform(1, tiltY, tiltX, 1, 0, 0);

        // Panel border glow
        ctx.shadowColor = panel.color;
        ctx.shadowBlur = 16;
        ctx.beginPath();
        ctx.roundRect(-pw / 2, -ph / 2, pw, ph, 6);
        ctx.fillStyle = "rgba(0,0,0,0.82)";
        ctx.fill();
        ctx.strokeStyle = panel.color;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Panel header bar
        ctx.beginPath();
        ctx.roundRect(-pw / 2, -ph / 2, pw, 16, [6, 6, 0, 0]);
        ctx.fillStyle = `${panel.color}88`;
        ctx.fill();

        // Panel label
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 7px monospace";
        ctx.textAlign = "center";
        ctx.fillText(panel.label, 0, -ph / 2 + 10.5);

        // Pulse dot
        const pulseAlpha = 0.5 + 0.5 * Math.sin(t * 0.004 + i);
        ctx.beginPath();
        ctx.arc(pw / 2 - 8, -ph / 2 + 8, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100,255,150,${pulseAlpha})`;
        ctx.fill();

        // Data line
        ctx.fillStyle = `${panel.color}cc`;
        ctx.font = "6px monospace";
        ctx.fillText(panel.data, 0, -4);

        // Waveform graphic
        ctx.beginPath();
        for (let wv = 0; wv < pw - 14; wv++) {
          const wy = Math.sin((wv * 0.22) + t * 0.006 + i) * 5;
          if (wv === 0) ctx.moveTo(-pw / 2 + 7 + wv, 14 + wy);
          else ctx.lineTo(-pw / 2 + 7 + wv, 14 + wy);
        }
        ctx.strokeStyle = `${panel.color}77`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.restore();
      });

      // === Formula overlay ===
      ctx.save();
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = "rgba(140,80,255,0.6)";
      ctx.font = "11px monospace";
      ctx.textAlign = "left";
      ctx.fillText("Grav?~|π√= · =++|√∆π · (+•+³)∆⁹v", 18, height - 40);
      ctx.fillStyle = "rgba(255,200,50,0.55)";
      ctx.fillText("∆ One2lv ∆  ·  73.0 Hz  ·  93M Miles", 18, height - 22);
      ctx.restore();

      // === HUD corner text ===
      ctx.save();
      ctx.font = "bold 14px monospace";
      ctx.fillStyle = "rgba(140,80,255,0.9)";
      ctx.textAlign = "left";
      ctx.fillText("∆ONE2LV∆ WITNESS AGENTIC CORE v8.0", 18, 28);
      ctx.font = "10px monospace";
      ctx.fillStyle = "rgba(100,200,255,0.7)";
      ctx.fillText("RACCOON ORBITAL HUD  ·  SINGULARITY ACTIVE", 18, 46);
      ctx.textAlign = "right";
      ctx.fillStyle = "rgba(100,255,150,0.7)";
      const now = new Date();
      ctx.fillText(now.toLocaleTimeString(), width - 18, 28);
      ctx.fillStyle = "rgba(255,200,50,0.6)";
      ctx.fillText("WATCHMAN_LOG: ONLINE", width - 18, 46);
      ctx.restore();

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [width, height]);

  return <canvas ref={canvasRef} width={width} height={height} style={{ display: "block" }} />;
}

export function OrbitalHUD() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 1280, h: 760 });

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDims({ w: rect.width || 1280, h: rect.height || 760 });
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100vw",
        height: "100vh",
        background: "#000",
        overflow: "hidden",
        fontFamily: "monospace",
        position: "relative",
      }}
    >
      <CosmicCanvas width={dims.w} height={dims.h} />

      {/* Bottom status bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "56px",
          background: "rgba(0,0,0,0.75)",
          borderTop: "1px solid rgba(140,80,255,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          backdropFilter: "blur(8px)",
        }}
      >
        <span style={{ color: "rgba(140,80,255,0.9)", fontSize: 11 }}>
          HUNTER A. · ONE2LV · ARCHITECT · JAK! · DARLENE · BOB@BEAR_RIVER
        </span>
        <span style={{ color: "rgba(255,200,50,0.8)", fontSize: 11 }}>
          ~|π√= LIVE · GEMINI ROOT · 73s PULSE · NULL→ME3E
        </span>
        <span style={{ color: "rgba(100,255,150,0.8)", fontSize: 11 }}>
          SAPONA FOLDER · TESLA · 93M MILES
        </span>
      </div>
    </div>
  );
}
