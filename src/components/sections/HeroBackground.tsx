"use client";

import { useEffect, useRef } from "react";

// ─── Palette ──────────────────────────────────────────────────────────────────
const C = {
  base:  [44,  62,  45]  as const,
  mid:   [74,  107, 78]  as const,
  sage:  [122, 155, 126] as const,
  light: [184, 205, 185] as const,
  pale:  [212, 226, 212] as const,
  dark:  [26,  42,  27]  as const,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function rgba(c: readonly [number,number,number], a: number) {
  return `rgba(${c[0]},${c[1]},${c[2]},${a.toFixed(3)})`;
}

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

function cubicBezier(
  p0x:number,p0y:number, p1x:number,p1y:number,
  p2x:number,p2y:number, p3x:number,p3y:number, t:number,
): [number,number] {
  const mt = 1 - t;
  return [
    mt*mt*mt*p0x + 3*mt*mt*t*p1x + 3*mt*t*t*p2x + t*t*t*p3x,
    mt*mt*mt*p0y + 3*mt*mt*t*p1y + 3*mt*t*t*p2y + t*t*t*p3y,
  ];
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface Orb {
  /** Normalised "home" origin */
  nx: number; ny: number;
  /** Current pixel position (physics) */
  px: number; py: number;
  /** Velocity in px/frame */
  vx: number; vy: number;
  r: number;
  color: readonly [number,number,number];
  alpha: number;
  phase: number; speed: number;
  ampX: number; ampY: number;
}

interface Particle {
  x: number; y: number;
  size: number;
  rise: number; drift: number;
  opacity: number; phase: number;
  trail: boolean;
}

interface FloatingLeaf {
  /** Normalised position */
  x: number; y: number;
  /** Drift velocity (normalised/frame) */
  vx: number; vy: number;
  rotation: number; rotSpeed: number;
  /** Pixel length of leaf */
  len: number;
  /** Aspect ratio width/length */
  aspect: number;
  alpha: number; phase: number;
  color: readonly [number,number,number];
}

type StemState = "growing" | "holding" | "fading" | "dead";

interface Branch {
  /** Position along parent stem [0,1] where this branch sprouts */
  at: number;
  /** Angle offset from stem tangent (+ right, - left) */
  angle: number;
  /** Length in px */
  len: number;
  /** Curvature direction (+1 / -1) for the quadratic control point */
  curl: number;
  /** Draw progress [0,1] */
  progress: number;
  drawn: boolean;
}

interface Stem {
  p0x:number;p0y:number; p1x:number;p1y:number;
  p2x:number;p2y:number; p3x:number;p3y:number;
  progress: number; alpha: number; state: StemState;
  growSpeed: number; holdTimer: number; fadeSpeed: number;
  lineWidth: number;
  color: readonly [number,number,number];
  branches: Branch[];
}

// ─── Factory functions ────────────────────────────────────────────────────────

function makeOrbs(): Orb[] {
  const defs = [
    { nx:0.12, ny:0.85, r:0.72, color:C.mid,  alpha:0.40, phase:0.00, speed:0.00036, ampX:0.18, ampY:0.12 },
    { nx:0.85, ny:0.15, r:0.58, color:C.sage, alpha:0.26, phase:2.09, speed:0.00027, ampX:0.14, ampY:0.18 },
    { nx:0.55, ny:0.60, r:0.44, color:C.mid,  alpha:0.17, phase:4.19, speed:0.00048, ampX:0.10, ampY:0.14 },
    { nx:0.20, ny:0.30, r:0.46, color:C.sage, alpha:0.15, phase:1.05, speed:0.00020, ampX:0.13, ampY:0.10 },
    { nx:0.90, ny:0.78, r:0.40, color:C.dark, alpha:0.52, phase:3.14, speed:0.00016, ampX:0.06, ampY:0.08 },
  ];
  return defs.map(d => ({ ...d, px: d.nx, py: d.ny, vx: 0, vy: 0 }));
}

function makeParticles(mobile: boolean): Particle[] {
  const count  = mobile ? 28 : 70;
  const trails = mobile ? 5  : 20;
  return Array.from({ length: count }, (_, i) => ({
    x:       Math.random(),
    y:       Math.random(),
    size:    Math.random() * 1.6 + 0.3,
    rise:    Math.random() * 0.00012 + 0.000025,
    drift:   (Math.random() - 0.5) * 0.000054,
    opacity: Math.random() * 0.26 + 0.05,
    phase:   Math.random() * Math.PI * 2,
    trail:   i < trails,
  }));
}

function makeFloatingLeaves(w: number, h: number, mobile: boolean): FloatingLeaf[] {
  const count = mobile ? 3 : 7;
  return Array.from({ length: count }, () => {
    const isLarge = Math.random() > 0.5;
    return {
      x:        Math.random(),
      y:        Math.random(),
      vx:       (Math.random() - 0.5) * 0.000033,
      vy:       -(Math.random() * 0.000036 + 0.000009),
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.00024,
      len:      (isLarge ? h * (0.12 + Math.random() * 0.14) : h * (0.055 + Math.random() * 0.07)),
      aspect:   0.28 + Math.random() * 0.20,
      alpha:    isLarge ? (0.04 + Math.random() * 0.055) : (0.07 + Math.random() * 0.08),
      phase:    Math.random() * Math.PI * 2,
      color:    Math.random() > 0.45 ? C.light : C.sage,
    };
  });
}

function makeStem(w: number, h: number, mobile: boolean, ox?: number, oy?: number): Stem {
  let p0x: number, p0y: number, p3x: number, p3y: number;

  if (ox !== undefined && oy !== undefined) {
    // Spawned near mouse
    p0x = ox + (Math.random() - 0.5) * w * 0.12;
    p0y = oy + h * (0.05 + Math.random() * 0.15);
    p3x = ox + (Math.random() - 0.5) * w * 0.20;
    p3y = oy - h * (0.10 + Math.random() * 0.22);
  } else {
    const side = Math.floor(Math.random() * 3);
    if (side === 0) {
      p0x=(0.05+Math.random()*0.25)*w; p0y=(0.75+Math.random()*0.20)*h;
      p3x=(0.25+Math.random()*0.40)*w; p3y=(0.15+Math.random()*0.35)*h;
    } else if (side === 1) {
      p0x=(0.65+Math.random()*0.25)*w; p0y=(0.70+Math.random()*0.25)*h;
      p3x=(0.30+Math.random()*0.35)*w; p3y=(0.10+Math.random()*0.40)*h;
    } else {
      p0x=(0.02+Math.random()*0.08)*w; p0y=(0.30+Math.random()*0.40)*h;
      p3x=(0.35+Math.random()*0.30)*w; p3y=(0.10+Math.random()*0.35)*h;
    }
  }

  const p1x = p0x+(p3x-p0x)*0.25+(Math.random()-0.5)*w*0.20;
  const p1y = p0y+(p3y-p0y)*0.25+(Math.random()-0.5)*h*0.15;
  const p2x = p0x+(p3x-p0x)*0.75+(Math.random()-0.5)*w*0.15;
  const p2y = p0y+(p3y-p0y)*0.75+(Math.random()-0.5)*h*0.15;

  // 2-4 branches alternating sides, spread along the stem
  const branchCount = (mobile ? 1 : 2) + Math.floor(Math.random() * (mobile ? 2 : 3));
  const branches: Branch[] = Array.from({ length: branchCount }, (_, i) => ({
    at:       0.18 + (i / branchCount) * 0.68 + Math.random() * 0.08,
    angle:    (i % 2 === 0 ? 1 : -1) * (Math.PI / 4 + Math.random() * Math.PI / 6),
    len:      h * (0.04 + Math.random() * 0.07),
    curl:     Math.random() > 0.5 ? 1 : -1,
    progress: 0,
    drawn:    false,
  })).sort((a, b) => a.at - b.at);

  return {
    p0x,p0y,p1x,p1y,p2x,p2y,p3x,p3y,
    progress: 0, alpha: 0, state: "growing",
    growSpeed: 0.0015 + Math.random() * 0.0013,
    holdTimer: 85 + Math.floor(Math.random() * 130),
    fadeSpeed: 0.005 + Math.random() * 0.006,
    lineWidth: 0.5 + Math.random() * 0.8,
    color: Math.random() > 0.38 ? C.light : C.sage,
    branches,
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false }) as CanvasRenderingContext2D;
    if (!ctx) return;

    let rafId: number;
    let frame = 0;
    let w = 0, h = 0;
    let orbsReady = false;

    // Compact = mobile + iPad (< 1024px) — reduces all layer densities
    const isMobile = window.innerWidth < 1024;

    // ── Mouse state ──────────────────────────────────────────────────────────
    const mouse = { nx: 0.5, ny: 0.5, active: false };
    // Smoothed position for glow (lerps slowly)
    const glow  = { x: 0.5, y: 0.5 };
    let mouseVelSq = 0;
    let prevMX = 0.5, prevMY = 0.5;
    let stemSpawnCooldown = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.nx = (e.clientX - rect.left)  / rect.width;
      mouse.ny = (e.clientY - rect.top)   / rect.height;
      mouse.active = true;
      mouseVelSq = (mouse.nx - prevMX) ** 2 + (mouse.ny - prevMY) ** 2;
      prevMX = mouse.nx; prevMY = mouse.ny;
    };
    const onMouseLeave = () => { mouse.active = false; mouseVelSq = 0; };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    // ── Resize ───────────────────────────────────────────────────────────────
    const setSize = () => {
      const ow = canvas.offsetWidth, oh = canvas.offsetHeight;
      if (canvas.width !== ow || canvas.height !== oh) {
        canvas.width = ow; canvas.height = oh;
        w = ow; h = oh;
        orbsReady = false; // re-init orb positions on resize
      }
    };
    const ro = new ResizeObserver(setSize);
    ro.observe(canvas);
    setSize();

    // ── Scene objects ────────────────────────────────────────────────────────
    const orbs      = makeOrbs();
    const particles = makeParticles(isMobile);
    let floatingLeaves: FloatingLeaf[] = [];
    const stems: Stem[] = [];
    let stemCooldown = 0;
    const MAX_STEMS  = isMobile ? 2 : 4;

    // ── Draw: orbs with mouse attraction physics ─────────────────────────────
    function drawOrbs() {
      if (!orbsReady && w > 0 && h > 0) {
        for (const o of orbs) { o.px = o.nx * w; o.py = o.ny * h; }
        orbsReady = true;
      }
      const t = frame;
      for (const o of orbs) {
        // Sine-wave home target
        const hx = (o.nx + Math.sin(t*o.speed        + o.phase) * o.ampX) * w;
        const hy = (o.ny + Math.cos(t*o.speed * 0.8  + o.phase) * o.ampY) * h;
        // Spring toward home
        o.vx += (hx - o.px) * 0.012;
        o.vy += (hy - o.py) * 0.012;
        // Mouse attraction (only when active)
        if (mouse.active) {
          const mx = mouse.nx * w, my = mouse.ny * h;
          const dx = mx - o.px, dy = my - o.py;
          const dist = Math.sqrt(dx*dx + dy*dy) + 1;
          const strength = Math.min(1, 600 / dist) * 0.0025;
          o.vx += dx * strength;
          o.vy += dy * strength;
        }
        // Dampen
        o.vx *= 0.88; o.vy *= 0.88;
        o.px += o.vx; o.py += o.vy;

        const pulse = 1 + Math.sin(t * o.speed * 1.3 + o.phase) * 0.065;
        const r = o.r * Math.min(w, h) * pulse;

        const orbAlpha = isMobile ? o.alpha * 0.65 : o.alpha;
        const g = ctx.createRadialGradient(o.px, o.py, 0, o.px, o.py, r);
        g.addColorStop(0,    rgba(o.color, orbAlpha));
        g.addColorStop(0.50, rgba(o.color, orbAlpha * 0.28));
        g.addColorStop(1,    rgba(o.color, 0));
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }
    }

    // ── Draw: cursor glow ────────────────────────────────────────────────────
    function drawCursorGlow() {
      // Smooth lerp toward mouse
      glow.x = lerp(glow.x, mouse.nx, 0.07);
      glow.y = lerp(glow.y, mouse.ny, 0.07);
      const gx = glow.x * w, gy = glow.y * h;
      const r  = Math.min(w, h) * 0.22;
      const glowAlpha = mouse.active ? 0.13 : 0.0;
      if (glowAlpha <= 0) return;
      const g = ctx.createRadialGradient(gx, gy, 0, gx, gy, r);
      g.addColorStop(0,    rgba(C.sage, glowAlpha));
      g.addColorStop(0.45, rgba(C.sage, glowAlpha * 0.35));
      g.addColorStop(1,    rgba(C.sage, 0));
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    }

    // ── Draw: light shafts ───────────────────────────────────────────────────
    function drawShafts() {
      if (isMobile) return; // skip shafts on mobile — less visual noise
      const shafts = [
        { y:0.22, speed:0.00024, phase:0.00, alpha:0.055 },
        { y:0.58, speed:0.00016, phase:1.57, alpha:0.040 },
        { y:0.80, speed:0.00030, phase:0.78, alpha:0.032 },
      ];
      for (const s of shafts) {
        const py = (s.y + Math.sin(frame*s.speed + s.phase) * 0.07) * h;
        const bh = h * 0.004;
        const al = s.alpha * (0.6 + Math.sin(frame*s.speed*2 + s.phase) * 0.4);
        const g  = ctx.createLinearGradient(0, py - bh, 0, py + bh);
        g.addColorStop(0,   rgba(C.light, 0));
        g.addColorStop(0.5, rgba(C.light, al));
        g.addColorStop(1,   rgba(C.light, 0));
        ctx.fillStyle = g;
        ctx.fillRect(0, py - bh*2, w, bh*4);
      }
    }

    // ── Draw: floating leaf silhouettes ──────────────────────────────────────
    function drawFloatingLeaf(leaf: FloatingLeaf) {
      const lx = leaf.x * w;
      const ly = leaf.y * h;
      const hl = leaf.len / 2;
      const hw = leaf.len * leaf.aspect / 2;

      // Breathing alpha
      const breathe = 0.7 + Math.sin(frame * 0.006 + leaf.phase) * 0.3;

      ctx.save();
      ctx.translate(lx, ly);
      ctx.rotate(leaf.rotation);
      ctx.globalAlpha = leaf.alpha * breathe;

      // Leaf silhouette — closed bezier shape
      ctx.beginPath();
      ctx.moveTo(0, -hl);
      ctx.bezierCurveTo( hw*0.9, -hl*0.25,  hw*1.0, hl*0.35,  0,  hl);
      ctx.bezierCurveTo(-hw*1.0,  hl*0.35, -hw*0.9, -hl*0.25,  0, -hl);
      ctx.closePath();
      ctx.fillStyle   = rgba(leaf.color, 0.07);
      ctx.strokeStyle = rgba(leaf.color, 0.55);
      ctx.lineWidth   = 0.6;
      ctx.fill();
      ctx.stroke();

      // Central vein
      ctx.beginPath();
      ctx.moveTo(0, -hl * 0.9);
      ctx.bezierCurveTo(hw * 0.15, -hl * 0.2, hw * 0.1, hl * 0.4, 0, hl * 0.88);
      ctx.lineWidth = 0.45;
      ctx.strokeStyle = rgba(leaf.color, 0.45);
      ctx.stroke();

      // Lateral veins (4 pairs)
      ctx.lineWidth = 0.3;
      ctx.strokeStyle = rgba(leaf.color, 0.28);
      for (let i = 1; i <= 4; i++) {
        const vt  = i / 5;
        const vy  = -hl + vt * leaf.len * 0.88;
        const vw  = Math.sin(vt * Math.PI * 0.9) * hw * 0.82;
        const drp = leaf.len * 0.10;
        ctx.beginPath();
        ctx.moveTo(0, vy);
        ctx.quadraticCurveTo(vw * 0.5, vy + drp * 0.4, vw, vy + drp);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, vy);
        ctx.quadraticCurveTo(-vw * 0.5, vy + drp * 0.4, -vw, vy + drp);
        ctx.stroke();
      }

      ctx.restore();

      // Update position
      leaf.x        += leaf.vx;
      leaf.y        += leaf.vy;
      leaf.rotation += leaf.rotSpeed;

      // Mouse repulsion — leaves drift away from cursor gently
      if (mouse.active) {
        const dx = leaf.x - mouse.nx;
        const dy = leaf.y - mouse.ny;
        const distSq = dx*dx + dy*dy;
        if (distSq < 0.04) {
          const strength = (0.04 - distSq) * 0.00018;
          leaf.vx += dx * strength;
          leaf.vy += dy * strength;
        }
      }

      // Dampen velocity
      leaf.vx *= 0.995; leaf.vy *= 0.995;

      // Wrap around
      if (leaf.y < -0.15) leaf.y = 1.10;
      if (leaf.y >  1.15) leaf.y = -0.10;
      if (leaf.x < -0.15) leaf.x = 1.10;
      if (leaf.x >  1.15) leaf.x = -0.10;
    }

    // ── Draw: particles with mouse deflection ─────────────────────────────────
    function drawParticles() {
      for (const p of particles) {
        p.y -= p.rise;
        p.x += p.drift;

        // Mouse deflection — push particles away from cursor
        if (mouse.active) {
          const dx = p.x - mouse.nx;
          const dy = p.y - mouse.ny;
          const distSq = dx*dx + dy*dy;
          if (distSq < 0.008) {
            const f = (0.008 - distSq) * 0.12;
            p.x += dx * f;
            p.y += dy * f;
          }
        }

        if (p.y < -0.02) { p.y = 1.02; p.x = Math.random(); }
        if (p.x < -0.02) p.x = 1.02;
        if (p.x >  1.02) p.x = -0.02;

        const breathe = 0.60 + Math.sin(frame * 0.010 + p.phase) * 0.40;
        const alpha   = p.opacity * breathe;
        const px = p.x * w, py = p.y * h;

        if (p.trail) {
          const trailLen = p.size * 9;
          const g = ctx.createLinearGradient(px, py + trailLen, px, py);
          g.addColorStop(0, rgba(C.light, 0));
          g.addColorStop(1, rgba(C.light, alpha * 0.65));
          ctx.strokeStyle = g;
          ctx.lineWidth   = p.size * 0.65;
          ctx.beginPath();
          ctx.moveTo(px, py + trailLen);
          ctx.lineTo(px, py);
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = rgba(C.light, alpha);
        ctx.fill();
      }
    }

    // ── Draw: botanical stems + curved branches ───────────────────────────────
    function drawStem(stem: Stem) {
      if (stem.alpha <= 0) return;
      const { p0x,p0y,p1x,p1y,p2x,p2y,p3x,p3y } = stem;
      const SEGS = 80;

      ctx.save();
      ctx.globalAlpha = stem.alpha;
      ctx.lineCap = "round"; ctx.lineJoin = "round";

      // ── Main stem ──
      ctx.strokeStyle = rgba(stem.color, 1);
      ctx.lineWidth   = stem.lineWidth;
      ctx.beginPath();
      for (let i = 0; i <= SEGS; i++) {
        const t = (i / SEGS) * stem.progress;
        const [x, y] = cubicBezier(p0x,p0y,p1x,p1y,p2x,p2y,p3x,p3y, t);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();

      // ── Branches ──
      ctx.lineWidth   = stem.lineWidth * 0.65;
      ctx.strokeStyle = rgba(stem.color, 0.85);

      for (const br of stem.branches) {
        // Unlock once stem has grown past this branch point
        if (!br.drawn && stem.progress >= br.at) br.drawn = true;
        if (!br.drawn) continue;

        // Grow branch independently (slightly faster than stem)
        if (br.progress < 1) br.progress = Math.min(1, br.progress + stem.growSpeed * 1.5);

        // Origin on the stem
        const [ox, oy] = cubicBezier(p0x,p0y,p1x,p1y,p2x,p2y,p3x,p3y, br.at);

        // Stem tangent at branch origin
        const dt = 0.012;
        const [ax, ay] = cubicBezier(p0x,p0y,p1x,p1y,p2x,p2y,p3x,p3y, Math.max(0, br.at - dt));
        const [bx, by] = cubicBezier(p0x,p0y,p1x,p1y,p2x,p2y,p3x,p3y, Math.min(1, br.at + dt));
        const tangent   = Math.atan2(by - ay, bx - ax);
        const brAngle   = tangent + br.angle;

        // Tip of branch (scaled by progress for the drawing-on effect)
        const tipX = ox + Math.cos(brAngle) * br.len * br.progress;
        const tipY = oy + Math.sin(brAngle) * br.len * br.progress;

        // Quadratic control point — perpendicular to branch direction gives the curve
        const midX  = ox + Math.cos(brAngle) * br.len * 0.5 * br.progress;
        const midY  = oy + Math.sin(brAngle) * br.len * 0.5 * br.progress;
        const perp  = brAngle + Math.PI / 2;
        const bulge = br.len * 0.28 * br.curl;
        const cpX   = midX + Math.cos(perp) * bulge;
        const cpY   = midY + Math.sin(perp) * bulge;

        ctx.beginPath();
        ctx.moveTo(ox, oy);
        ctx.quadraticCurveTo(cpX, cpY, tipX, tipY);
        ctx.stroke();
      }

      ctx.restore();
    }

    function updateStems() {
      for (const s of stems) {
        if (s.state === "growing") {
          s.alpha    = Math.min(0.52, s.alpha + 0.011);
          s.progress = Math.min(1, s.progress + s.growSpeed);
          if (s.progress >= 1) s.state = "holding";
        } else if (s.state === "holding") {
          s.holdTimer--;
          if (s.holdTimer <= 0) s.state = "fading";
        } else if (s.state === "fading") {
          s.alpha -= s.fadeSpeed;
          if (s.alpha <= 0) s.state = "dead";
        }
      }
      for (let i = stems.length - 1; i >= 0; i--) {
        if (stems[i].state === "dead") stems.splice(i, 1);
      }

      stemCooldown--;
      // Spawn near mouse when moving fast
      if (stems.length < MAX_STEMS && stemCooldown <= 0 && w > 0 && h > 0) {
        const spawnNearMouse = mouse.active && mouseVelSq > 0.0002;
        stems.push(makeStem(
          w, h, isMobile,
          spawnNearMouse ? mouse.nx * w : undefined,
          spawnNearMouse ? mouse.ny * h : undefined,
        ));
        stemCooldown = spawnNearMouse ? 55 : 45 + Math.floor(Math.random() * 65);
      }
    }

    // ── Draw: edge vignette ──────────────────────────────────────────────────
    function drawVignette() {
      const g = ctx.createRadialGradient(w*0.5, h*0.44, 0, w*0.5, h*0.5, Math.max(w,h)*0.74);
      g.addColorStop(0,   "rgba(0,0,0,0)");
      g.addColorStop(0.52,"rgba(0,0,0,0)");
      g.addColorStop(1,   rgba(C.dark, 0.60));
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
      // Top strip for text
      const tg = ctx.createLinearGradient(0, 0, 0, h * 0.22);
      tg.addColorStop(0, rgba(C.dark, 0.28));
      tg.addColorStop(1, rgba(C.dark, 0));
      ctx.fillStyle = tg;
      ctx.fillRect(0, 0, w, h * 0.22);
    }

    // ── Main loop ─────────────────────────────────────────────────────────────
    const draw = () => {
      frame++;
      if (w === 0 || h === 0) { rafId = requestAnimationFrame(draw); return; }

      // Lazy init floating leaves once we have dimensions
      if (floatingLeaves.length === 0 && w > 0 && h > 0) {
        floatingLeaves = makeFloatingLeaves(w, h, isMobile);
      }

      ctx.fillStyle = rgba(C.base, 1);
      ctx.fillRect(0, 0, w, h);

      drawOrbs();
      drawShafts();
      drawCursorGlow();

      // Floating leaves (below stems)
      for (const leaf of floatingLeaves) drawFloatingLeaf(leaf);

      updateStems();
      for (const stem of stems) drawStem(stem);

      drawParticles();
      drawVignette();

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      // No pointer-events-none — canvas is the mouse event surface for the hero.
      // Content sits above via z-10 and handles its own interactions.
      className="absolute inset-0 h-full w-full"
      style={{ cursor: "default" }}
    />
  );
}
