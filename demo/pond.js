/* 活水层：水位 = 磁盘占用 · 浑浊 = 可清理体积 · 波速 = CPU · 水温 = 内存压力（方案.md §2） */
(function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)');
  const lerp = (a, b, k) => a + (b - a) * k;
  const mix = (a, b, k) => a.map((v, i) => v + (b[i] - v) * k);
  const rgba = (c, a) => `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a})`;

  /* 焦散纹理：可平铺的 Voronoi 边缘（F2-F1 越小越亮），所有水面共用一张 */
  let CAUSTIC = null;
  function causticTex() {
    if (CAUSTIC) return CAUSTIC;
    const N = 256, c = document.createElement('canvas');
    c.width = c.height = N;
    const x = c.getContext('2d'), img = x.createImageData(N, N), d = img.data;
    let seed = 7;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    const pts = Array.from({ length: 22 }, () => [rnd() * N, rnd() * N]);
    for (let py = 0; py < N; py++) {
      for (let px = 0; px < N; px++) {
        let f1 = 1e9, f2 = 1e9;
        for (const [qx, qy] of pts) {
          let dx = Math.abs(px - qx), dy = Math.abs(py - qy);
          if (dx > N / 2) dx = N - dx;
          if (dy > N / 2) dy = N - dy;
          const dd = dx * dx + dy * dy;
          if (dd < f1) { f2 = f1; f1 = dd; } else if (dd < f2) f2 = dd;
        }
        const e = Math.sqrt(f2) - Math.sqrt(f1);
        const v = Math.pow(Math.max(0, 1 - e / 18), 4) * (0.55 + 0.45 * Math.sin(px * 0.05 + py * 0.031) ** 2);
        const i = (py * N + px) * 4;
        d[i] = d[i + 1] = d[i + 2] = 255;
        d[i + 3] = v * 255;
      }
    }
    x.putImageData(img, 0, 0);
    /* 柔化一次，去掉 Voronoi 的硬直边 */
    const s = document.createElement('canvas');
    s.width = s.height = N;
    const sx = s.getContext('2d');
    sx.filter = 'blur(1.6px)';
    for (const ox of [-N, 0, N]) for (const oy of [-N, 0, N]) sx.drawImage(c, ox, oy);
    return (CAUSTIC = s);
  }

  class Pond {
    constructor(cv, opt = {}) {
      this.cv = cv;
      this.ctx = cv.getContext('2d');
      this.p = { level: 0.6, murk: 0.3, speed: 0.25, tone: [70, 170, 215], alpha: 1, deep: 0.55 };
      Object.assign(this.p, opt.init || {});
      this.t = JSON.parse(JSON.stringify(this.p));
      this.onFrame = opt.onFrame;
      this.time = 0;
      this.boost = 0;
      this.bubbles = [];
      this.rings = [];
      this.specks = Array.from({ length: 160 }, () => ({
        x: Math.random(), y: Math.pow(Math.random(), 0.7), r: 0.5 + Math.random() * 1.6, v: (Math.random() - 0.5) * 0.012, ph: Math.random() * 6, z: Math.random(),
      }));
      this.rays = Array.from({ length: 5 }, (_, i) => ({ x: (i + 0.3 + Math.random() * 0.4) / 5, w: 26 + Math.random() * 46, ph: Math.random() * 6, s: 0.25 + Math.random() * 0.3 }));
      this.pat = this.ctx.createPattern(causticTex(), 'repeat');
      this.last = performance.now();
      this.resize();
      new ResizeObserver(() => this.resize()).observe(cv);
      this.loop = this.loop.bind(this);
      requestAnimationFrame(this.loop);
    }
    resize() {
      const r = this.cv.getBoundingClientRect();
      const dpr = Math.min(devicePixelRatio || 1, 2);
      this.W = this.cv.offsetWidth || r.width;
      this.H = this.cv.offsetHeight || r.height;
      this.cv.width = Math.max(1, this.W * dpr);
      this.cv.height = Math.max(1, this.H * dpr);
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    set(o, instant) {
      Object.assign(this.t, o);
      if (instant || RM.matches) Object.assign(this.p, JSON.parse(JSON.stringify(this.t)));
    }
    burst(n = 40) { this.boost = Math.max(this.boost, n); }
    surface(x, back = 0) {
      const { W, H, p, time: T } = this;
      const amp = 2 + p.speed * 7;
      const y0 = H * (1 - p.level) - back * 5;
      const ph = back * 2.1;
      const big = Math.sin(x * 0.012 + T * 1.1 + ph) * 0.55 + Math.sin(x * 0.027 - T * 1.7 + ph) * 0.3 + Math.sin(x * 0.005 + T * 0.5 - ph) * 0.45;
      const chop = (Math.sin(x * 0.071 + T * 3.1) * 0.09 + Math.sin(x * 0.113 - T * 4.3) * 0.05) * (0.4 + p.speed);
      return y0 + amp * (big + chop) * Math.min(1, W / 400);
    }
    slope(x) { return (this.surface(x + 4) - this.surface(x - 4)) / 8; }
    destroy() { this.dead = true; }
    loop(now) {
      if (this.dead || !this.cv.isConnected) return;
      requestAnimationFrame(this.loop);
      if (document.hidden || !this.cv.offsetParent) { this.last = now; return; }
      const dt = Math.min(0.05, (now - this.last) / 1000);
      this.last = now;
      const still = RM.matches;
      const p = this.p, t = this.t, k = still ? 1 : 1 - Math.pow(0.02, dt);
      for (const key of ['level', 'murk', 'speed', 'alpha', 'deep']) p[key] = lerp(p[key], t[key], k);
      p.tone = p.tone.map((c, i) => lerp(c, t.tone[i], k));
      if (!still) this.time += dt * (0.6 + p.speed * 2.2);
      this.draw(dt, still);
      if (this.onFrame) this.onFrame(this);
    }
    path(back) {
      const { ctx, W, H } = this;
      ctx.beginPath();
      ctx.moveTo(0, H);
      for (let x = 0; x <= W + 4; x += 4) ctx.lineTo(x, this.surface(x, back));
      ctx.lineTo(W, H);
      ctx.closePath();
    }
    draw(dt, still) {
      const { ctx, W, H, p } = this;
      ctx.clearRect(0, 0, W, H);
      if (p.alpha <= 0.01 || H < 2) return;
      const A = p.alpha, d = p.deep, T = this.time;
      const y0 = H * (1 - p.level), depth = Math.max(1, H - y0);
      /* 真实水色：水温色调 × 自然水体（偏青绿、越深越吸收红光） */
      const natural = [34, 104, 128];
      const warm = p.tone[0] > p.tone[2];
      const top = mix(mix(p.tone, natural, warm ? 0.18 : 0.35), [255, 255, 255], 0.06);
      const mid = mix(top, [10, 44, 66], 0.55);
      const bot = mix(top, [3, 12, 22], 1 - d * (d > 0.6 ? 0.8 : 0.55));
      const murkC = [92, 82, 52];
      const clear = (1 - p.murk) * A;

      /* 远处一层浪：更暗、更透，给水面纵深 */
      this.path(1);
      ctx.fillStyle = rgba(mix(top, mid, 0.5), 0.28 * A);
      ctx.fill();

      ctx.save();
      this.path(0);
      const gr = ctx.createLinearGradient(0, y0 - 10, 0, H);
      gr.addColorStop(0, rgba(top, 0.62 * A));
      gr.addColorStop(Math.min(0.9, 26 / depth + 0.12), rgba(mix(top, mid, 0.6), 0.8 * A));
      gr.addColorStop(1, rgba(bot, 0.95 * A));
      ctx.fillStyle = gr;
      ctx.fill();
      ctx.clip();

      /* 焦散：两层错向漂移的光网叠加，浑水里几乎看不见 */
      if (clear > 0.02) {
        ctx.globalCompositeOperation = 'lighter';
        for (let i = 0; i < 2; i++) {
          ctx.save();
          const sx = i ? 1.15 : 0.85, sy = i ? 0.55 : 0.42;
          ctx.translate(((T * (i ? -9 : 7)) % 256) * sx, y0 + ((T * (i ? 3 : -2)) % 256) * sy);
          ctx.scale(sx, sy);
          ctx.globalAlpha = (i ? 0.045 : 0.06) * clear;
          ctx.fillStyle = this.pat;
          ctx.fillRect(-512, -512, W / sx + 1024, depth / sy + 1024);
          ctx.restore();
        }
        /* 斜射进水里的光柱 */
        for (const r of this.rays) {
          const sway = Math.sin(T * r.s + r.ph);
          const x = r.x * W + sway * 18, w = r.w * (0.8 + 0.2 * Math.sin(T * 0.7 + r.ph));
          const len = Math.min(depth, 160 + r.w * 2);
          const lg = ctx.createLinearGradient(0, y0, 0, y0 + len);
          lg.addColorStop(0, `rgba(255,255,255,${0.07 * clear * (0.6 + 0.4 * sway * sway)})`);
          lg.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.fillStyle = lg;
          /* 三层由宽到窄叠加，边缘自然虚掉 */
          for (const f of [1, 0.66, 0.36]) {
            const c = x + w / 2, hw = (w / 2) * f, hb = w * 1.15 * f;
            ctx.globalAlpha = 0.42;
            ctx.beginPath();
            ctx.moveTo(c - hw, y0 - 6);
            ctx.lineTo(c + hw, y0 - 6);
            ctx.lineTo(c + len * 0.32 + hb, y0 + len);
            ctx.lineTo(c + len * 0.32 - hb, y0 + len);
            ctx.closePath();
            ctx.fill();
          }
        }
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 1;
      }

      /* 越深越暗：压住焦散和光柱，像光被水吸收 */
      const ab = ctx.createLinearGradient(0, y0, 0, H);
      ab.addColorStop(0, rgba(bot, 0));
      ab.addColorStop(Math.min(1, 30 / depth + 0.12), rgba(bot, 0.35 * A));
      ab.addColorStop(1, rgba(bot, 0.85 * A));
      ctx.fillStyle = ab;
      ctx.fillRect(0, y0 - 20, W, depth + 20);

      /* 浑浊：越往下泥越多 + 远近不同的悬浮颗粒 */
      if (p.murk > 0.01) {
        const mg = ctx.createLinearGradient(0, y0, 0, H);
        mg.addColorStop(0, rgba(murkC, p.murk * 0.22 * A));
        mg.addColorStop(1, rgba(murkC, p.murk * 0.6 * A));
        ctx.fillStyle = mg;
        ctx.fillRect(0, y0 - 20, W, depth + 20);
      }
      const n = Math.floor(18 + p.murk * 140);
      for (let i = 0; i < n; i++) {
        const s = this.specks[i];
        if (!still) { s.x = (s.x + s.v * dt + 1) % 1; s.ph += dt * (0.5 + s.z); }
        const px = s.x * W + Math.sin(s.ph * 0.7) * 3, py = y0 + 6 + ((s.y + Math.sin(s.ph) * 0.008) % 1) * (depth - 6);
        const near = 0.35 + s.z * 0.65;
        ctx.fillStyle = p.murk > 0.15 ? `rgba(206,184,136,${(0.08 + p.murk * 0.4) * near * A})` : `rgba(220,240,255,${0.12 * near * A})`;
        ctx.beginPath(); ctx.arc(px, py, s.r * near, 0, 6.283); ctx.fill();
      }

      /* 气泡：带高光点的透明球，边上更亮 */
      if (!still) {
        const rate = 0.5 + p.speed * 1.2 + this.boost;
        if (Math.random() < rate * dt) {
          this.bubbles.push({ x: Math.random() * W, y: H + 6, r: 1.2 + Math.random() * (this.boost > 1 ? 4.5 : 2.6), vy: 16 + Math.random() * 26, ph: Math.random() * 6 });
        }
        this.boost = Math.max(0, this.boost - dt * 14);
      }
      this.bubbles = this.bubbles.filter((bb) => {
        if (!still) { bb.y -= bb.vy * dt; bb.vy += dt * 10; bb.ph += dt * 3; }
        const bx = bb.x + Math.sin(bb.ph) * 2.5;
        if (bb.y < this.surface(bx) + bb.r) { this.rings.push({ x: bx, r: bb.r, a: 1 }); return false; }
        const rr = bb.r * (1 + Math.sin(bb.ph * 2) * 0.06);
        ctx.fillStyle = `rgba(255,255,255,${0.06 * A})`;
        ctx.strokeStyle = `rgba(220,245,255,${0.42 * A})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath(); ctx.ellipse(bx, bb.y, rr, rr * 1.05, 0, 0, 6.283); ctx.fill(); ctx.stroke();
        ctx.fillStyle = `rgba(255,255,255,${0.75 * A})`;
        ctx.beginPath(); ctx.arc(bx - rr * 0.35, bb.y - rr * 0.38, Math.max(0.5, rr * 0.28), 0, 6.283); ctx.fill();
        return true;
      });

      /* 水面下一道亮带：天光从水面折射进来 */
      const band = ctx.createLinearGradient(0, y0 - 8, 0, y0 + 16);
      band.addColorStop(0, `rgba(255,255,255,${0.16 * A})`);
      band.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = band;
      ctx.fillRect(0, y0 - 20, W, 40);
      ctx.restore();

      /* 水面线：朝光的一侧亮、背光的一侧暗，加零星闪光 */
      ctx.lineWidth = 1.3;
      for (let x = 0; x < W; x += 8) {
        const y1 = this.surface(x), y2 = this.surface(x + 8);
        const lit = Math.max(0, Math.min(1, 0.45 - (y2 - y1) * 0.6));
        ctx.strokeStyle = `rgba(255,255,255,${(0.14 + lit * 0.42) * A})`;
        ctx.beginPath(); ctx.moveTo(x, y1); ctx.lineTo(x + 8, y2); ctx.stroke();
      }
      if (!still && clear > 0.05) {
        for (let i = 0; i < 7; i++) {
          const gx = ((i * 0.149 + T * 0.021 * (i % 2 ? 1 : -1)) % 1 + 1) % 1 * W;
          const tw = Math.max(0, Math.sin(T * 2.3 + i * 1.7));
          if (tw < 0.55) continue;
          const gy = this.surface(gx);
          ctx.strokeStyle = `rgba(255,255,255,${(tw - 0.55) * 1.6 * clear})`;
          ctx.lineWidth = 1.6;
          ctx.beginPath(); ctx.moveTo(gx - 5, gy); ctx.lineTo(gx + 5, gy); ctx.stroke();
        }
      }
      this.rings = this.rings.filter((rg) => {
        rg.a -= dt * 1.6; rg.r += dt * 16;
        if (rg.a <= 0) return false;
        ctx.lineWidth = 1;
        ctx.strokeStyle = `rgba(255,255,255,${0.4 * rg.a * A})`;
        ctx.beginPath(); ctx.ellipse(rg.x, this.surface(rg.x), rg.r * 1.6, rg.r * 0.4, 0, 0, 6.283); ctx.stroke();
        return true;
      });
    }
  }
  window.Pond = Pond;
})();
