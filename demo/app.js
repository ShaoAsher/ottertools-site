/* 水獭工具 · 原型（第一批：启动 → 首页） */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const win = $('#win');
const RMQ = matchMedia('(prefers-reduced-motion: reduce)');
let forceRM = false;
const RM = () => forceRM || RMQ.matches;
const D = (s) => (RM() ? 0 : s);

/* ── 图标 ─────────────────────────────────────────────── */
const P = {
  home: '<path d="M4 11l8-7 8 7v9H4z"/><path d="M10 20v-5h4v5"/>',
  pulse: '<path d="M3 12h4l2-5 4 10 2-5h6"/>',
  clean: '<path d="M12 3l1.8 4.7 4.7 1.8-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z"/><path d="M19 15l.8 2.2 2.2.8-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>',
  bolt: '<path d="M13 3L5 14h6l-1 7 8-11h-6z"/>',
  shield: '<path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z"/><path d="M9 12l2 2 4-4"/>',
  box: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5h6v2M3 12h18"/>',
  mac: '<rect x="4" y="5" width="16" height="11" rx="1.5"/><path d="M2 19h20"/>',
  gear: '<path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/>',
  search: '<circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5"/>',
  refresh: '<path d="M20 12a8 8 0 1 1-2.3-5.7"/><path d="M20 4v4h-4"/>',
  moon: '<path d="M20 14A8 8 0 0 1 10 4a8 8 0 1 0 10 10z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.4 1.4M17.6 17.6L19 19M5 19l1.4-1.4M17.6 6.4L19 5"/>',
  trash: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
  mem: '<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>',
  file: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/>',
  power: '<path d="M12 3v8"/><path d="M6.5 7a8 8 0 1 0 11 0"/>',
  clip: '<rect x="6" y="4" width="12" height="17" rx="2"/><path d="M9 4h6v3H9z"/>',
  image: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="1.8"/><path d="M21 16l-5-5-9 8"/>',
  gauge: '<path d="M4 16a8 8 0 1 1 16 0"/><path d="M12 16l4-5"/>',
  chip: '<rect x="7" y="7" width="10" height="10" rx="1.5"/><path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4"/>',
  check: '<path d="M5 12l5 5 9-10"/>',
  alert: '<path d="M12 4l9 16H3z"/><path d="M12 10v4M12 17h.01"/>',
  idle: '<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>',
  up: '<path d="M12 19V5M6 11l6-6 6 6"/>',
};
const I = (n, cls = 'i') => `<svg class="${cls}" viewBox="0 0 24 24">${P[n]}</svg>`;

/* ── 表情（家族 36 表情；有动图的用动图） ─────────────────── */
const ANIM = new Set('hi calm happy proud clear bath focus think scared sleepy cheer relief grind highlight morning night'.split(' '));
const ex = (n, still) => (ANIM.has(n) && !still && !RM() ? `expr/${n}.webp` : `expr/${n}_s.webp`);

/* ── 状态 ─────────────────────────────────────────────── */
const PRESETS = {
  calm: { cpu: 23, mem: 9.9, memTone: 'calm', disk: 0.63, junk: 12.4, score: 86, label: '状态良好', sc: 'ok', expr: 'calm', tone: 'calm', toneText: '平静 · 一切正常',
    say: '水挺清的，顺手清掉 12.4 GB 吧。', bubble: '水挺清的～<br>顺手清掉 <b>12.4 GB</b> 吗？', fact: '可清理 12.4 GB，内存平稳，有 3 项可以优化。', contrib: [92, 74, 96, 81] },
  busy: { cpu: 78, mem: 13.6, memTone: 'busy', disk: 0.66, junk: 14.1, score: 72, label: '有点忙', sc: 'busy', expr: 'grind', tone: 'busy', toneText: '忙碌 · CPU 78%',
    say: 'Xcode 正在编译，我帮你盯着。', bubble: '水有点急……<br>Xcode 正在编译', fact: 'CPU 78%，内存 13.6 / 16 GB，有 4 项可以优化。', contrib: [58, 72, 96, 79] },
  alarm: { cpu: 94, mem: 15.4, memTone: 'alarm', disk: 0.68, junk: 15.0, score: 54, label: '需要处理', sc: 'alarm', expr: 'scared', tone: 'alarm', toneText: '告急 · 内存紧张',
    say: '内存快撑不住了，先释放一下？', bubble: '内存快满了！<br>先<b>释放内存</b>吧', fact: '内存 15.4 / 16 GB，2 个应用无响应，有 6 项可以优化。', contrib: [31, 70, 96, 78] },
  full: { cpu: 31, mem: 10.8, memTone: 'calm', disk: 0.93, junk: 38.6, score: 61, label: '磁盘将满', sc: 'busy', expr: 'shock', tone: 'calm', toneText: '注意 · 磁盘仅剩 34 GB',
    say: '水快漫出来了，磁盘只剩 34 GB。', bubble: '水要漫出来了！<br>磁盘只剩 <b>34 GB</b>', fact: '磁盘 460 / 494 GB，可清理 38.6 GB，有 5 项可以优化。', contrib: [88, 28, 96, 80] },
};
const WATER = {
  night: { calm: [64, 160, 210], busy: [214, 138, 72], alarm: [214, 84, 90], deep: 0.42, amb: 0.3 },
  day: { calm: [120, 196, 232], busy: [240, 172, 112], alarm: [240, 132, 132], deep: 0.78, amb: 0.22 },
};
const hourNow = new Date().getHours();
const S = {
  theme: 'night',
  preset: 'calm',
  time: hourNow < 11 && hourNow >= 5 ? 'morning' : hourNow < 19 && hourNow >= 11 ? 'afternoon' : 'night',
  freed: 128.4, week: 9.6, pebbles: 21, caring: false, safe: 8.2,
  ...JSON.parse(JSON.stringify(PRESETS.calm)),
};
const memPct = () => Math.round((S.mem / 16) * 100);
const memWord = { calm: '平稳', busy: '偏高', alarm: '紧张' };
const scColor = (v) => (v >= 80 ? 'var(--ok)' : v >= 60 ? 'var(--busy)' : 'var(--alarm)');
const scoreTone = () => (S.score >= 80 ? 'ok' : S.score >= 60 ? 'busy' : 'alarm');

/* ── 外壳 ─────────────────────────────────────────────── */
const NAV = [
  { id: 'home', t: '概览', i: 'home', c: 'var(--accent)' },
  { id: 'check', t: '体检', i: 'pulse', c: 'var(--ok)', m: () => `${S.score} 分` },
  { id: 'clean', t: '清理', i: 'clean', c: 'var(--calm)', m: () => `${S.junk.toFixed(1)} GB` },
  { id: 'boost', t: '加速', i: 'bolt', c: 'var(--busy)', m: () => `内存 ${memPct()}%` },
  { id: 'privacy', t: '隐私', i: 'shield', c: '#9B8BE8', m: () => { const n = typeof TRACE !== 'undefined' ? TRACE.reduce((a, g) => a + g.items.length, 0) : 13; return n ? `${n} 类` : '干净'; } },
  { id: 'toolbox', t: '工具箱', i: 'box', c: '#E8B04B' },
  { id: 'mac', t: '本机', i: 'mac', c: '#8A94A6', m: () => 'M3 Pro' },
];

function renderShell() {
  $('#side').innerHTML = `
    <div class="brand"><img src="brand/tools_icon.png" alt=""><b>水獭工具</b><span class="fam">水獭家族</span></div>
    <div class="me" data-act="poke"><img id="meImg" alt=""><div style="min-width:0"><div class="n">小獭</div><div class="tone" id="meTone"><i></i><span></span></div><div class="say" id="meSay"></div></div></div>
    <button class="cmdk" data-act="pal">${I('search')}<span class="sp">搜索功能或操作</span><kbd>⌘</kbd><kbd>K</kbd></button>
    <nav class="nav" id="nav">${NAV.map((n) => `<div class="nv${n.id === 'home' ? ' on' : ''}" data-act="go" data-arg="${n.id}" data-nav="${n.id}" style="--c:${n.c}"><span class="b">${I(n.i)}</span><span class="t">${n.t}</span><span class="m num" data-m="${n.id}"></span></div>`).join('')}</nav>
    <div class="sp"></div>
    <div class="nv" data-act="settings" style="--c:#8A94A6"><span class="b">${I('gear')}</span><span class="t">设置</span><span class="m"><kbd>⌘</kbd><kbd>,</kbd></span></div>
    <div class="dev" data-act="about"><span class="ic">${I('mac')}</span><div style="flex:1;min-width:0"><b>MacBook Pro 14</b><span class="num" id="devDisk"></span><div class="bar"><i id="devBar"></i></div></div></div>`;

  $('#phead').innerHTML = `
    <div id="hh"><h1 id="greet"></h1><p id="greetSub"></p></div>
    <div id="ph" class="ptl hide"></div><div class="sp"></div>
    <div id="pacts"></div>
    <button class="ib" data-act="refresh" data-tip="刷新数据 ⌘R">${I('refresh')}</button>
    <button class="ib" data-act="theme" data-tip="切换主题" id="themeBtn"></button>
    <button class="ib" data-act="tray" data-tip="菜单栏浮窗">${I('up')}</button>
    <button class="otbtn" data-act="ai"><img src="${ex('hi', true)}" alt="">问小獭</button>`;

  $('#grid').innerHTML = `
    <section class="cardp hero" id="hero">
      <canvas id="heroPond"></canvas><div class="sky"></div>
      <div class="glass" id="glass"></div>
      <div class="otter-float" id="otter" data-act="poke"><img id="otImg" alt=""></div>
      <div class="bubble" id="bubble"></div>
      <div class="legend" id="legend"></div>
    </section>
    <section class="cardp sugg"><div class="ch"><h3>接下来可以做</h3><span>按影响排序</span></div><div id="sugg"></div></section>
    <section class="cardp jar"><div class="ch"><h3>石头罐</h3><span>小獭帮你攒下的空间</span></div>
      <div class="in"><svg class="pot" id="pot" viewBox="0 0 104 128" data-act="jar"></svg>
        <div style="flex:1;min-width:0"><div class="k">累计腾出</div><div class="big num"><span id="freed"></span><small>GB</small></div><div class="sub" id="freedSub"></div>
        <div class="memo" id="memo"></div></div></div></section>
    <div class="mets" id="mets"></div>
    <section class="cardp tools"><div class="ch"><h3>直接去做</h3><span class="sp"></span><a data-act="go" data-arg="toolbox">全部工具</a></div><div class="tg" id="tools"></div></section>`;
  renderTools();
  renderMets();
  renderJar();
}

/* ── 首页内容 ─────────────────────────────────────────── */
function glassScore() {
  const C = ['性能', '空间', '安全', '隐私'];
  const icon = S.sc === 'ok' ? 'check' : 'alert';
  return `
    <div class="score"><div class="ring">${ringSvg()}<div class="v"><div><b class="num" id="scoreN">${S.score}</b><small>健康度</small></div></div></div>
      <div style="min-width:0"><div class="k">刚刚体检 · ${new Date().toTimeString().slice(0, 5)}</div>
      <h2>${S.label}<span class="st">${I(icon)}${S.score} / 100</span></h2><p>${S.fact}</p></div></div>
    <div class="contrib">${C.map((c, i) => `<div style="--c:${scColor(S.contrib[i])}">${c}<b class="num">${S.contrib[i]}</b><div class="bar"><i data-w="${S.contrib[i]}"></i></div></div>`).join('')}</div>
    <div class="acts">${S.caring ? `<button class="slab caring" data-act="care"><i class="spin"></i>养护中 · 查看进度</button>` : `<button class="slab" data-act="care">${I('clean')}一键养护</button>`}<button class="ghost lg" data-act="go" data-arg="check">查看体检</button><span class="hint"><kbd>⌘</kbd><kbd>↩</kbd></span></div>`;
}
const CIRC = 2 * Math.PI * 52;
function ringSvg() {
  return `<svg viewBox="0 0 120 120"><circle class="tr" cx="60" cy="60" r="52" fill="none" stroke-width="9"/><circle class="ar" id="arc" cx="60" cy="60" r="52" fill="none" stroke-width="9" stroke-linecap="round" stroke-dasharray="${CIRC}" stroke-dashoffset="${CIRC * (1 - S.score / 100)}"/></svg>`;
}
/* 评分环：弧线和数字一起落定（Oura） */
function scoreIn(from = 0, to = S.score) {
  const o = { v: from };
  const arc = $('#arc'), n = $('#scoreN');
  if (!arc) return;
  gsap.to(o, { v: to, duration: D(0.9), ease: 'power3.out', onUpdate() {
    arc.style.strokeDashoffset = CIRC * (1 - o.v / 100);
    n.textContent = Math.round(o.v);
  } });
  gsap.fromTo('.contrib .bar i', { width: 0 }, { width: (i, el) => el.dataset.w + '%', duration: D(0.62), ease: 'power3.out', stagger: D(0.08), delay: D(0.25) });
}

function suggestions() {
  const L = [
    { k: 'junk', i: 'clean', c: 'var(--calm)', t: S.safe > 0 ? '清理建议垃圾' : '检查剩余垃圾', s: S.safe > 0 ? `可清理 ${S.junk.toFixed(1)} GB，其中 ${S.safe.toFixed(1)} GB 可放心清理` : `还有 ${S.junk.toFixed(1)} GB，需要你逐项确认`, imp: 'h', a: '去清理', act: 'go', arg: 'clean:junk' },
    { k: 'idle', i: 'idle', c: 'var(--busy)', t: '关闭闲置应用', s: '3 个应用超过 30 分钟未使用，占用 2.1 GB 内存', imp: 'h', a: '查看', act: 'go', arg: 'boost:proc' },
    { k: 'start', i: 'power', c: '#9B8BE8', t: '减少开机启动项', s: '7 个启动项随开机运行，开机慢约 6 秒', imp: 'm', a: '管理', act: 'go', arg: 'boost:start' },
    { k: 'mem', i: 'mem', c: 'var(--ok)', t: '释放内存', s: '可回收约 1.6 GB 不活跃内存，不影响正在用的应用', imp: 'm', a: '立即释放', act: 'mem' },
  ];
  if (S.preset === 'alarm') { L.unshift(L.pop()); L[0].imp = 'h'; }
  if (S.preset === 'full') { L[0].s = `可清理 ${S.junk.toFixed(1)} GB，磁盘仅剩 34 GB`; L[2] = { k: 'big', i: 'file', c: 'var(--stone)', t: '检查大文件', s: '下载文件夹里有 6 个超过 2 GB 的安装包和视频', imp: 'h', a: '查看', act: 'go', arg: 'clean:large' }; }
  return L.map((x) => `<div class="sg" data-act="${x.act}" data-arg="${x.arg || ''}" style="--c:${x.c}"><span class="b">${I(x.i)}</span><div class="tx"><b>${x.t}</b><span>${x.s}</span></div><span class="imp ${x.imp}">影响 ${x.imp === 'h' ? '高' : '中'}</span><button class="ghost">${x.a}</button></div>`).join('');
}

const TOOLS = [
  ['clean', '垃圾清理', 'var(--calm)', 'go', 'clean:junk'], ['mem', '释放内存', 'var(--ok)', 'mem'], ['file', '大文件', 'var(--stone)', 'go', 'clean:large'], ['power', '启动项', '#9B8BE8', 'go', 'boost:start'],
  ['clip', '剪切板', '#E8B04B', 'go', 'toolbox:clip'], ['image', '图片压缩', 'var(--accent)', 'go', 'toolbox:img'], ['gauge', '网络测速', 'var(--calm)', 'go', 'mac:net'], ['chip', '硬件', '#8A94A6', 'go', 'mac:hw'],
];
function renderTools() {
  $('#tools').innerHTML = TOOLS.map(([i, t, c, a, arg], k) => `<div class="tl" data-act="${a}" data-arg="${arg || ''}" style="--c:${c}"><kbd>${k + 1}</kbd><span class="b">${I(i)}</span>${t}</div>`).join('');
}

/* 指标 + 迷你曲线 */
const SER = { cpu: [], mem: [], disk: [], net: [] };
for (let i = 0; i < 32; i++) { SER.cpu.push(20 + Math.random() * 8); SER.mem.push(62); SER.disk.push(63); SER.net.push(1.5 + Math.random()); }
function renderMets() {
  const M = [
    ['cpu', 'CPU', 'var(--calm)'], ['mem', '内存', 'var(--ok)'], ['disk', '磁盘', 'var(--stone)'], ['net', '网络', '#9B8BE8'],
  ];
  $('#mets').innerHTML = M.map(([k, t, c]) => `<div class="cardp met" data-act="go" data-arg="${{CPU:'boost:proc',内存:'boost:mem',磁盘:'mac:storage',网络:'mac:net'}[t]}" style="--c:${c}" id="met-${k}"><div class="k"><i></i>${t}</div><div class="v num" data-v></div><div class="s" data-s></div><svg class="sp" viewBox="0 0 100 30" preserveAspectRatio="none"><path data-p fill="none" stroke-width="1.6" vector-effect="non-scaling-stroke"/><path data-f/></svg></div>`).join('');
}
function updateMets() {
  const V = {
    cpu: [`${Math.round(S.cpu)}<small>%</small>`, S.cpu > 85 ? '很忙 · Xcode 占 61%' : S.cpu > 60 ? '偏忙' : '空闲为主'],
    mem: [`${S.mem.toFixed(1)}<small>/ 16 GB</small>`, `压力${memWord[S.memTone]}`],
    disk: [`${Math.round(S.disk * 494)}<small>/ 494 GB</small>`, `剩余 ${Math.round((1 - S.disk) * 494)} GB`],
    net: [`${SER.net.at(-1).toFixed(1)}<small>MB/s</small>`, '↓ 下载 · ↑ 0.4 MB/s'],
  };
  const max = { cpu: 100, mem: 100, disk: 100, net: 5 };
  for (const k in V) {
    const el = $('#met-' + k);
    if (!el) continue;
    if (k === 'mem') el.style.setProperty('--c', `var(--${S.memTone === 'calm' ? 'ok' : S.memTone})`);
    if (k === 'cpu') el.style.setProperty('--c', S.cpu > 85 ? 'var(--alarm)' : S.cpu > 60 ? 'var(--busy)' : 'var(--calm)');
    $('[data-v]', el).innerHTML = V[k][0];
    $('[data-s]', el).textContent = V[k][1];
    const s = SER[k], n = s.length;
    const pts = s.map((v, i) => `${((i / (n - 1)) * 100).toFixed(1)},${(28 - (Math.min(v, max[k]) / max[k]) * 26).toFixed(1)}`);
    $('[data-p]', el).setAttribute('d', 'M' + pts.join(' L'));
    $('[data-f]', el).setAttribute('d', 'M0,30 L' + pts.join(' L') + ' L100,30 Z');
  }
}

/* 石头罐 */
const STONES = ['#C9B8A6', '#8FA3B0', '#D9A07A', '#9FB8A0', '#B7A8C9', '#E0C27A', '#A7B3C2', '#CBB08A'];
function rnd(seed) { const x = Math.sin(seed * 9301 + 49297) * 233280; return x - Math.floor(x); }
function pebble(i) {
  const per = 5, r = Math.floor(i / per), c = i % per;
  const x = 26 + c * 13 + (r % 2 ? 6 : 0) + (rnd(i) - 0.5) * 4;
  const y = 114 - r * 10 - rnd(i + 7) * 2;
  return `<ellipse class="pb" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${(6 + rnd(i + 3) * 1.6).toFixed(1)}" ry="${(4.6 + rnd(i + 5)).toFixed(1)}" transform="rotate(${((rnd(i + 9) - 0.5) * 40).toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})" fill="${STONES[i % STONES.length]}"/>`;
}
function renderJar() {
  const body = 'M26 30 C16 36 13 50 13 66 V108 C13 118 21 124 31 124 H73 C83 124 91 118 91 108 V66 C91 50 88 36 78 30 Z';
  $('#pot').innerHTML = `<defs><clipPath id="jarClip"><path d="${body}"/></clipPath></defs>
    <path d="${body}" fill="rgba(var(--ink),.04)" style="fill:rgba(128,128,160,.08)"/>
    <g clip-path="url(#jarClip)" id="pebs">${Array.from({ length: S.pebbles }, (_, i) => pebble(i)).join('')}</g>
    <path d="${body}" fill="none" stroke="currentColor" stroke-opacity=".28" stroke-width="1.6"/>
    <path d="M22 40 C19 52 19 70 20 90" fill="none" stroke="#fff" stroke-opacity=".25" stroke-width="2.4" stroke-linecap="round"/>
    <rect x="24" y="16" width="56" height="13" rx="4" fill="#B08A5A"/><rect x="24" y="16" width="56" height="4" rx="2" fill="#fff" fill-opacity=".18"/>`;
  $('#pot').style.color = 'var(--hi)';
}
function updateJar() {
  $('#freed').textContent = S.freed.toFixed(1);
  $('#freedSub').innerHTML = `本周 ${S.week.toFixed(1)} GB · 约等于 ${Math.round(S.week * 250).toLocaleString()} 张照片`;
  $('#memo').innerHTML = `<b>11 月的记忆</b> · 清理 ${S.week > 10 ? 15 : 14} 次，最大一次 18.2 GB。每颗石子是一次清理。`;
}

/* 统一刷新（不重放进场动效） */
function update() {
  const W = WATER[S.theme];
  const tone = S.tone;
  const greet = { morning: '早上好', afternoon: '下午好', night: '夜深了' }[S.time];
  const timeExpr = { morning: 'morning', afternoon: 'happy', night: 'night' }[S.time];
  const otExpr = S.caring ? null : S.preset === 'calm' ? (S.time === 'night' ? 'calm' : timeExpr) : S.expr;
  const meExpr = S.preset === 'calm' ? (S.time === 'night' ? 'sleepy' : timeExpr) : S.expr;

  win.dataset.theme = S.theme;
  $('#themeBtn').innerHTML = I(S.theme === 'night' ? 'sun' : 'moon');
  $('#greet').innerHTML = `${greet}，<em>Shaw</em>`;
  $('#greetSub').textContent = S.time === 'night' ? 'MacBook Pro 14 · 已连续运行 9 小时，小獭陪你值夜班' : 'MacBook Pro 14 · macOS 26.1 · 已运行 3 天 4 小时';
  setImg($('#meImg'), ex(meExpr));
  $('#meTone').style.setProperty('--tone', `var(--${tone === 'calm' && S.preset === 'full' ? 'busy' : tone})`);
  $('#meTone span').textContent = S.toneText;
  $('#meSay').textContent = S.time === 'night' && S.preset === 'calm' && S.safe > 0 ? '夜深了，我小声看着，你忙完早点睡。' : S.say;
  $$('[data-m]').forEach((el) => { const n = NAV.find((x) => x.id === el.dataset.m); el.textContent = n.m ? n.m() : ''; });
  $('#devDisk').textContent = `macOS 26.1 · 磁盘 ${Math.round(S.disk * 100)}%`;
  $('#devBar').style.width = S.disk * 100 + '%';
  $('#devBar').style.setProperty('--tone', S.disk > 0.9 ? 'var(--alarm)' : 'var(--calm)');

  const hero = $('#hero');
  hero.style.setProperty('--tone', `var(--${tone})`);
  hero.style.setProperty('--sc', `var(--${scoreTone()})`);
  $('#glass').innerHTML = glassScore();
  if (otExpr) setImg($('#otImg'), ex(otExpr));
  if (!S.caring) $('#bubble').innerHTML = S.time === 'night' && S.preset === 'calm' && S.safe > 0 ? '嘘……水很静<br>可以顺手清掉 <b>12.4 GB</b>' : S.bubble;
  $('#legend').innerHTML = `<span>水位 · 磁盘<b class="num">${Math.round(S.disk * 100)}%</b></span><span>浑浊 · 可清理<b class="num">${S.junk.toFixed(1)} GB</b></span><span>波速 · CPU<b class="num">${Math.round(S.cpu)}%</b></span><span>水温 · 内存<b>${memWord[S.memTone]}</b></span>`;
  $('#sugg').innerHTML = suggestions();
  updateMets();
  updateJar();
  statusbar();

  const murk = Math.min(0.85, S.junk / 45);
  pond && pond.set({ level: Math.min(0.95, 0.1 + S.disk * 0.8), murk, speed: S.cpu / 100, tone: W[S.memTone], deep: W.deep, alpha: 1 });
  amb && amb.set({ level: 0.16, murk: murk * 0.4, speed: S.cpu / 100, tone: W[S.memTone], deep: W.deep, alpha: W.amb });
}
let flashText = '', flashOn = false;
function setImg(img, src) { if (img && !img.src.endsWith(src)) img.src = src; }
function statusbar() {
  const t = `var(--${S.memTone === 'calm' ? (S.preset === 'full' ? 'busy' : 'ok') : S.memTone})`;
  $('#sb').innerHTML = `<span><i class="dot" style="background:${t}"></i>小獭在看着</span>
    <span>CPU <b class="num">${Math.round(S.cpu)}%</b></span><span>内存 <b class="num">${S.mem.toFixed(1)} / 16 GB</b> · ${memWord[S.memTone]}</span>
    <span>磁盘 <b class="num">${Math.round(S.disk * 494)} / 494 GB</b></span><span>网络 <b class="num">↓ ${SER.net.at(-1).toFixed(1)} ↑ 0.4 MB/s</b></span>
    <span class="flash${flashOn ? ' on' : ''}" id="sbFlash">${flashText}</span><span class="sp"></span><span>菜单栏常驻中</span><span class="num">v2.0 原型</span>`;
}

/* 实时采样：每 1.6 秒抖一下，驱动波速 */
setInterval(() => {
  if (document.hidden) return;
  const base = S.caring ? 46 : PRESETS[S.preset].cpu;
  S.cpu = Math.max(3, Math.min(99, S.cpu + (Math.random() - 0.5) * 8 + (base - S.cpu) * 0.3));
  S.mem = Math.max(4, Math.min(15.9, S.mem + (Math.random() - 0.5) * 0.12));
  SER.cpu.push(S.cpu); SER.cpu.shift();
  SER.mem.push((S.mem / 16) * 100); SER.mem.shift();
  SER.disk.push(S.disk * 100); SER.disk.shift();
  SER.net.push(Math.max(0.2, SER.net.at(-1) + (Math.random() - 0.5) * 0.9)); SER.net.shift();
  updateMets();
  statusbar();
  const lg = $$('#legend b');
  if (lg[2]) lg[2].textContent = Math.round(S.cpu) + '%';
  pond && pond.set({ speed: S.cpu / 100 });
  amb && amb.set({ speed: S.cpu / 100 });
}, 1600);

/* ── 活水 ─────────────────────────────────────────────── */
let pond, amb;
function mountPonds() {
  const W = WATER[S.theme];
  amb = amb || new Pond($('#ambient'), { init: { level: 0, alpha: W.amb, tone: W.calm, deep: W.deep } });
  pond = new Pond($('#heroPond'), {
    init: { level: 0.02, murk: 0.3, speed: 0.3, tone: W[S.memTone], deep: W.deep },
    onFrame: floatOtter,
  });
}
let otterJump = { y: 0 };
function floatOtter(p) {
  const ot = $('#otter'), bb = $('#bubble');
  if (!ot) return;
  const x = p.W * 0.66;
  const y = p.surface(x);
  const top = Math.max(4, y - 76) + otterJump.y;
  const rot = Math.atan(p.slope(x)) * 40;
  ot.style.transform = `translate(${x - 52}px,${top}px) rotate(${rot}deg)`;
  bb.style.transform = `translate(${x + 44}px,${Math.max(12, top - 2)}px)`;
}

/* ── 弹窗：统一居中（与水獭 Git 最终原型同一套）──────────
   确认 ask → 原地变形成进度 busy → 原地变形成结果 moment（4.8 秒自动关，悬停暂停）
   次要反馈不弹窗，只在状态栏闪一下（flash） */
const OC_LIFE = 4800;
let ocTimer = 0, ocTick = 0;
const scrim = $('#scrim');
function liveDlg() { return scrim.classList.contains('on') && !scrim.classList.contains('out') ? $('.dlg', scrim) : null; }
let closeT = 0;
function openDlg(html, cls = '') {
  clearTimeout(closeT);
  scrim.innerHTML = `<div class="dlg ${cls}">${html}</div>`;
  scrim.className = 'scrim on';
  void scrim.offsetWidth;
  scrim.classList.add('show');
  return $('.dlg', scrim);
}
function closeDlg() {
  if (!scrim.classList.contains('on') || scrim.classList.contains('out')) return;
  clearTimeout(ocTimer); clearInterval(ocTick);
  scrim.classList.add('out');
  closeT = setTimeout(() => (scrim.className = 'scrim'), 260);
}
function morph(d, cls, html) {
  const h0 = d.offsetHeight, w0 = d.offsetWidth;
  d.className = 'dlg ' + cls;
  d.innerHTML = html;
  const h1 = d.offsetHeight, w1 = d.offsetWidth;
  if (!RM() && (h0 !== h1 || w0 !== w1)) d.animate([{ height: h0 + 'px', width: w0 + 'px' }, { height: h1 + 'px', width: w1 + 'px' }], { duration: 420, easing: 'cubic-bezier(.22,1,.36,1)' });
  return d;
}
function showOc(cls, html) { const d = liveDlg(); return d ? morph(d, cls, html) : openDlg(html, cls); }
function moment(m) {
  clearTimeout(ocTimer); clearInterval(ocTick);
  const d = showOc('oc' + (m.milestone ? ' milestone' : ''), `<div class="in"><img src="${ex(m.img)}" alt=""><h3>${m.title}</h3><p>${m.sub || ''}</p>
    <div class="btns">${m.act ? `<button class="slab block" data-a="act">${m.act}</button>` : ''}${m.alt ? `<button class="ghost block" data-a="alt">${m.alt}</button>` : ''}<button class="ghost block" data-a="close">知道了</button></div></div>`);
  let hover = false, expired = false;
  d.onmouseenter = () => (hover = true);
  d.onmouseleave = () => { hover = false; if (expired && liveDlg() === d) closeDlg(); };
  ocTimer = setTimeout(() => { expired = true; if (!hover && liveDlg() === d) closeDlg(); }, OC_LIFE);
  $$('[data-a]', d).forEach((b) => (b.onclick = () => {
    const a = b.dataset.a;
    clearTimeout(ocTimer);
    const fn = a === 'act' ? m.onAct : a === 'alt' ? m.onAlt : null;
    if (fn) fn(); else closeDlg();
  }));
}
let flashT = 0, flashUndo = null;
function flash(text, undo) {
  flashUndo = undo || null;
  flashText = text + (undo ? ' <a class="fa" data-act="flashUndo">撤销</a>' : '');
  flashOn = true;
  const el = $('#sbFlash');
  if (el) { el.innerHTML = flashText; el.classList.add('on'); }
  clearTimeout(flashT);
  flashT = setTimeout(() => { flashOn = false; $('#sbFlash') && $('#sbFlash').classList.remove('on'); }, undo ? 6000 : 3200);
}
scrim.addEventListener('click', (e) => { if (e.target === scrim && !$('.dlg.busy', scrim)) closeDlg(); });

/* ── 一键养护（大动效 · 方案.md §3） ─────────────────── */
let careOpts = { clean: true, mem: true, dns: true, trash: false };
let care = null;
function askCare() {
  if (S.page && S.page !== 'home') { go('home'); return setTimeout(askCare, D(0.45) * 1000); }
  if (S.caring) return showBusy();
  careOpts = { clean: true, mem: true, dns: true, trash: false };
  const row = (k, t, r, w) => `<li><span class="chk${careOpts[k] ? ' on' : ''}" data-act="opt" data-arg="${k}"></span>${t}<span class="r${w ? ' w' : ''}">${r}</span></li>`;
  openDlg(`<img src="${ex('think')}" alt=""><h3>开始一键养护？</h3>
    <p>小獭会按顺序处理下面几项，大约 10 秒。</p>
    <ul>${row('clean', '清理建议项', '8.2 GB · 移入废纸篓，可恢复')}${row('mem', '释放内存', '约 1.6 GB')}${row('dns', '刷新 DNS 缓存', '无副作用')}${row('trash', '同时清空废纸篓', '不可恢复', true)}</ul>
    <div class="btns"><button class="slab block" data-act="careGo" id="careGo">开始养护</button><button class="ghost block" data-act="close">取消</button></div>`, 'ask');
}
function toggleOpt(k, el) {
  careOpts[k] = !careOpts[k];
  el.classList.toggle('on', careOpts[k]);
  const go = $('#careGo');
  go.classList.toggle('danger', careOpts.trash);
  go.textContent = careOpts.trash ? '开始养护（含清空废纸篓）' : '开始养护';
  go.disabled = !Object.values(careOpts).some(Boolean);
}
/* 进度弹窗：步骤 + 进度条 + 已用秒数；可「在后台继续」，主卡按钮变「养护中」，点它回到这里 */
function busyHtml() {
  const c = care;
  const done = c.steps.filter((s) => s.st === 'done').length;
  return `<div class="in"><img src="${ex(c.img)}" alt=""><h3>${c.title}</h3>
    <div class="steps">${c.steps.map((s) => `<div class="stp ${s.st || ''}" data-k="${s.k}"><span class="s">${I('check')}</span>${s.t}<span class="r num">${s.st === 'done' ? s.r : ''}</span></div>`).join('')}</div>
    <div class="bar det"><i style="width:${Math.max(6, (done / c.steps.length) * 100)}%"></i></div>
    <div class="el">已用 ${Math.round((performance.now() - c.t0) / 1000)} 秒 · 文件都进废纸篓，随时能放回来</div>
    <button class="ghost block" data-act="bg">在后台继续</button></div>`;
}
function showBusy() {
  if (!care) return;
  const d = showOc('oc busy', busyHtml());
  clearInterval(ocTick);
  ocTick = setInterval(() => { const el = $('.el', d); if (!el || !care) return clearInterval(ocTick); el.textContent = `已用 ${Math.round((performance.now() - care.t0) / 1000)} 秒 · 文件都进废纸篓，随时能放回来`; }, 500);
}
function careStep(k, st, title, img) {
  const s = care.steps.find((x) => x.k === k);
  s.st = st;
  if (title) care.title = title;
  if (img) care.img = img;
  const d = liveDlg();
  if (d && d.classList.contains('busy')) {
    const row = $(`.stp[data-k="${k}"]`, d);
    row.className = 'stp ' + st;
    if (st === 'done') $('.r', row).textContent = s.r;
    $('h3', d).textContent = care.title;
    setImg($('img', d), ex(care.img));
    const done = care.steps.filter((x) => x.st === 'done').length;
    $('.bar i', d).style.width = Math.max(6, (done / care.steps.length) * 100) + '%';
  }
}

async function runCare() {
  S.caring = true;
  const snap = { safe: S.safe, say: S.say, junk: S.junk, mem: S.mem, memTone: S.memTone, score: S.score, contrib: [...S.contrib], freed: S.freed, week: S.week, disk: S.disk, label: S.label, sc: S.sc, fact: S.fact, bubble: S.bubble, preset: S.preset };
  care = {
    t0: performance.now(), title: '正在一键养护……', img: 'bath',
    steps: [
      careOpts.clean && { k: 'clean', t: '清理建议项', r: '8.2 GB' },
      careOpts.mem && { k: 'mem', t: '释放内存', r: '1.6 GB' },
      careOpts.dns && { k: 'dns', t: '刷新 DNS 缓存', r: '完成' },
      careOpts.trash && { k: 'trash', t: '清空废纸篓', r: '2.3 GB' },
      { k: 'score', t: '重新体检', r: '完成' },
    ].filter(Boolean),
  };
  showBusy();
  update();
  const wait = (s) => new Promise((r) => setTimeout(r, RM() ? 250 : s * 1000));
  const W = WATER[S.theme];
  let freedNow = 0;
  for (const s of care.steps) {
    if (s.k === 'clean') {
      careStep('clean', 'run', '正在清理建议项……', 'bath');
      setImg($('#otImg'), ex('bath'));
      $('#bubble').innerHTML = '洗个澡～<br>水马上就清了';
      pond.burst(70);
      pond.set({ speed: 0.75 });
      const bi = setInterval(() => pond.burst(30), 500);
      await wait(2.2);
      clearInterval(bi);
      S.junk = Math.max(0, S.junk - 8.2); S.disk -= 8.2 / 494; freedNow += 8.2; S.safe = 0;
      pond.set({ murk: Math.min(0.85, S.junk / 45), level: Math.min(0.95, 0.1 + S.disk * 0.8) });
    } else if (s.k === 'mem') {
      careStep('mem', 'run', '正在释放内存……', 'focus');
      setImg($('#otImg'), ex('focus'));
      $('#bubble').innerHTML = '把不用的内存<br>还给系统';
      await wait(1.4);
      S.mem = Math.max(5, S.mem - 1.6); S.memTone = S.mem > 15 ? 'alarm' : S.mem > 13 ? 'busy' : 'calm';
      pond.set({ tone: W[S.memTone], speed: 0.2 });
      ripple(5);
    } else if (s.k === 'dns') {
      careStep('dns', 'run', '正在刷新 DNS 缓存……', 'focus');
      await wait(0.9);
    } else if (s.k === 'trash') {
      careStep('trash', 'run', '正在清空废纸篓……', 'grind');
      await wait(1.1);
      S.disk -= 2.3 / 494; freedNow += 2.3;
    } else {
      careStep('score', 'run', '再看一眼……', 'think');
      setImg($('#otImg'), ex('think'));
      $('#bubble').innerHTML = '再看一眼……';
      await wait(1.2);
    }
    careStep(s.k, 'done');
    $$('[data-m]').forEach((m) => { const n = NAV.find((x) => x.id === m.dataset.m); m.textContent = n.m ? n.m() : ''; });
  }
  const secs = Math.round((performance.now() - care.t0) / 1000);
  care = null;
  // 先关进度弹窗，让水变清、石子落罐在首页上演，再原位弹出结果页
  closeDlg();
  const old = S.score;
  S.score = Math.min(97, old + (careOpts.clean ? 7 : 2) + (careOpts.mem ? 3 : 0) + (S.preset === 'alarm' ? 18 : 0));
  S.contrib = S.contrib.map((v, i) => Math.min(99, v + [careOpts.mem ? (S.preset === 'alarm' ? 50 : 8) : 0, careOpts.clean ? (S.preset === 'full' ? 20 : 9) : 0, 0, 2][i]));
  S.label = S.score >= 80 ? '水清了' : '好多了';
  S.sc = 'ok';
  S.say = '水清了，今天可以安心干活。';
  S.bubble = '水清了！<br>给石头罐添一颗石子';
  S.fact = `刚刚腾出 ${freedNow.toFixed(1)} GB${careOpts.mem ? '，回收内存 1.6 GB' : ''}，还剩 ${S.junk.toFixed(1)} GB 需要你逐项确认。`;
  S.caring = false;
  pond.set({ speed: S.cpu / 100 });
  update();
  scoreIn(old, S.score);
  setImg($('#otImg'), ex('clear'));
  await new Promise((r) => setTimeout(r, D(0.3) * 1000));
  if (freedNow > 0) await dropPebble(freedNow);
  const undoable = !careOpts.trash && careOpts.clean;
  moment({
    img: 'relief',
    milestone: true,
    title: `养护完成 · 腾出 ${freedNow.toFixed(1)} GB`,
    sub: `健康度 ${old} → ${S.score}，用时 ${secs} 秒。${careOpts.trash ? '废纸篓已清空，这部分不能撤销。' : careOpts.clean ? '清理的文件在废纸篓里，可以撤销。' : ''}`,
    alt: undoable ? '撤销清理' : null,
    onAlt: () => undoCare(snap),
  });
  S.bubble = '水很清<br>今天可以安心干活了';
  setTimeout(() => !S.caring && setImg($('#otImg'), ex('proud')), 1600);
}
function undoCare(snap) {
  const cur = S.score;
  Object.assign(S, snap);
  S.pebbles -= 1;
  renderJar();
  update();
  scoreIn(cur, S.score);
  setImg($('#otImg'), ex('ok', true));
  moment({ img: 'ok', title: '已撤销清理', sub: '8.2 GB 文件已从废纸篓放回原处，内存与 DNS 的处理保留。' });
}

/* 石子落罐：从小獭飞进石头罐 */
function rel(el) {
  const s = scale, w = win.getBoundingClientRect(), r = el.getBoundingClientRect();
  return { x: (r.left - w.left) / s, y: (r.top - w.top) / s, w: r.width / s, h: r.height / s };
}
function dropPebble(gb) {
  return new Promise((done) => {
    const a = rel($('#otter')), b = rel($('#pot'));
    const p = document.createElement('div');
    p.className = 'pebble-fly';
    win.appendChild(p);
    const sx = a.x + a.w / 2, sy = a.y + a.h / 2, ex2 = b.x + b.w / 2 - 8, ey = b.y + 36;
    gsap.set(p, { x: sx, y: sy, scale: 0.4 });
    const tl = gsap.timeline({ onComplete() {
      p.remove();
      S.pebbles += 1;
      const g = $('#pebs');
      g.insertAdjacentHTML('beforeend', pebble(S.pebbles - 1));
      gsap.from(g.lastElementChild, { attr: { cy: '-=40' }, duration: D(0.5), ease: 'bounce.out' });
      gsap.fromTo('#pot', { rotate: 0 }, { keyframes: [{ rotate: -4 }, { rotate: 3 }, { rotate: 0 }], duration: D(0.5), transformOrigin: '50% 100%' });
      const o = { v: S.freed };
      S.freed += gb; S.week += gb;
      updateJar();
      $('#freed').textContent = o.v.toFixed(1);
      gsap.to(o, { v: S.freed, duration: D(0.9), ease: 'power3.out', onUpdate: () => ($('#freed').textContent = o.v.toFixed(1)) });
      setTimeout(done, D(0.6) * 1000);
    } });
    tl.to(p, { x: ex2, duration: D(0.9), ease: 'power1.inOut' }, 0)
      .to(p, { y: sy - 120, duration: D(0.4), ease: 'power2.out' }, 0)
      .to(p, { y: ey, duration: D(0.5), ease: 'power2.in' }, D(0.4))
      .to(p, { scale: 1, duration: D(0.9) }, 0);
  });
}

/* 内存释放（大动效）：水面平复 + 一圈圈涟漪 → 结果页 */
function ripple(n) {
  if (!pond) return;
  for (let i = 0; i < n; i++) setTimeout(() => pond.rings.push({ x: pond.W * 0.66 + (Math.random() - 0.5) * 60, r: 6 + i * 3, a: 1 }), D(i * 0.12) * 1000);
}
function releaseMem() {
  if (S.caring) return showBusy();
  const before = S.mem;
  S.mem = Math.max(5, S.mem - 1.6);
  S.memTone = S.mem > 15 ? 'alarm' : S.mem > 13 ? 'busy' : 'calm';
  if (S.preset === 'alarm') { S.preset = 'busy'; Object.assign(S, { label: '好多了', sc: 'busy', expr: 'relief', tone: 'busy', toneText: '回落中 · 内存偏高', say: '松一口气，内存回来了 1.6 GB。', bubble: '呼——<br>内存回来了 <b>1.6 GB</b>', fact: `内存 ${S.mem.toFixed(1)} / 16 GB，还有 5 项可以优化。` }); }
  setImg($('#otImg'), ex('relief'));
  pond.set({ speed: 0.05 });
  ripple(6);
  setTimeout(() => pond.set({ speed: S.cpu / 100 }), 1400);
  update();
  setTimeout(() => moment({ img: 'relief', title: `已释放 ${(before - S.mem).toFixed(1)} GB 内存`, sub: `现在 ${S.mem.toFixed(1)} / 16 GB，压力${memWord[S.memTone]}。正在用的应用不受影响。` }), D(0.9) * 1000);
}

/* ── tip ─────────────────────────────────────────────── */
function tipAt(text, x, y) {
  const t = $('#tip');
  t.textContent = text;
  gsap.killTweensOf(t);
  gsap.set(t, { x: x - t.offsetWidth / 2, y: y - 34 });
  gsap.fromTo(t, { autoAlpha: 0, y: y - 28 }, { autoAlpha: 1, y: y - 34, duration: D(0.2) });
  gsap.to(t, { autoAlpha: 0, delay: 1.4, duration: D(0.2) });
}

/* ── 交互分发 ─────────────────────────────────────────── */
const POKE = [['happy', '嘿，在呢～'], ['laugh', '别戳啦，痒'], ['cheer', '要不要一起养护一下？'], ['shy', '……被发现了'], ['love', '今天也辛苦了']];
let pokeI = 0;
win.addEventListener('click', (e) => {
  const el = e.target.closest('[data-act]');
  if (!el || !el.dataset.act) return;
  const act = el.dataset.act, arg = el.dataset.arg;
  if (el.classList.contains('slab')) {
    const r = el.getBoundingClientRect(), w = document.createElement('i');
    const d = Math.max(r.width, r.height) * 2.2 / scale;
    w.className = 'wave';
    Object.assign(w.style, { width: d + 'px', height: d + 'px', left: (e.clientX - r.left) / scale + 'px', top: (e.clientY - r.top) / scale + 'px' });
    el.appendChild(w);
    setTimeout(() => w.remove(), 600);
  }
  const p = rel(el);
  ({
    soon: () => tipAt(`「${arg}」在下一批原型里`, p.x + p.w / 2, p.y),
    care: askCare,
    careGo: runCare,
    close: closeDlg,
    bg: () => { closeDlg(); flash('一键养护在后台继续 · 点主卡上的「养护中」可回来看进度'); },
    opt: () => toggleOpt(arg, el),
    mem: releaseMem,
    theme: () => { S.theme = S.theme === 'night' ? 'day' : 'night'; update(); syncConsole(); },
    refresh: () => { gsap.fromTo(el.querySelector('svg'), { rotate: 0 }, { rotate: 360, duration: D(0.62), ease: 'power3.inOut' }); scoreIn(S.score - 6, S.score); flash('数据已刷新 · 磁盘、内存、启动项都是最新的'); },
    poke: () => {
      if (S.caring) return;
      const [x, say] = POKE[pokeI++ % POKE.length];
      setImg($('#otImg'), ex(x));
      $('#bubble').innerHTML = say;
      gsap.timeline().to(otterJump, { y: -16, duration: D(0.22), ease: 'power2.out' }).to(otterJump, { y: 0, duration: D(0.5), ease: 'bounce.out' });
      pond.rings.push({ x: pond.W * 0.66, r: 10, a: 1 });
      clearTimeout(window._pk);
      window._pk = setTimeout(() => update(), 2600);
    },
    jar: () => {
      gsap.fromTo('#pebs .pb', { y: 0 }, { y: -3, yoyo: true, repeat: 1, duration: D(0.18), stagger: { each: D(0.015), from: 'random' } });
      tipAt(`${S.pebbles} 颗石子 · 每颗是一次清理`, p.x + p.w / 2, p.y);
    },
  }[act] || (window.ACTS && ACTS[act] ? () => ACTS[act](arg, el, e) : () => {}))();
});
win.addEventListener('mouseover', (e) => {
  const el = e.target.closest('[data-tip]');
  if (!el) return;
  const p = rel(el);
  tipAt(el.dataset.tip, p.x + p.w / 2, p.y);
});
addEventListener('keydown', (e) => {
  if (e.metaKey && e.key === 'Enter') { e.preventDefault(); askCare(); }
  if (e.metaKey && e.key.toLowerCase() === 'k') { e.preventDefault(); ACTS.pal(); }
  if (e.metaKey && e.key === ',') { e.preventDefault(); ACTS.settings(); }
  if (e.key === 'Escape') { if ($('#pal').classList.contains('on')) ACTS.palClose(); else if ($('#tray').classList.contains('on')) ACTS.trayClose(); else closeDlg(); }
  if (document.activeElement && /INPUT|TEXTAREA/.test(document.activeElement.tagName)) return;
  if (!e.metaKey && !e.ctrlKey && /^[1-8]$/.test(e.key) && !scrim.classList.contains('on') && S.page === 'home') $$('#tools .tl')[+e.key - 1].click();
});

/* ── 启动（大动效 · 冷启动） ─────────────────────────── */
let splashPond;
function playSplash() {
  const sp = $('#splash');
  $('#stitle').innerHTML = [...'水獭工具'].map((c) => `<span>${c}</span>`).join('');
  gsap.set(sp, { autoAlpha: 1, display: 'flex' });
  gsap.set('#app', { autoAlpha: 0 });
  gsap.set('.logo .d, .logo .o, .logo .g, #stitle span, #sfam, #slogan, #sty', { clearProps: 'all' });
  const W = WATER.night;
  if (!splashPond) splashPond = new Pond($('#splashPond'), { init: { level: 0, murk: 0.05, speed: 0.35, tone: W.calm, deep: 0.42 } });
  splashPond.set({ level: 0, tone: W[S.memTone] }, true);
  const ty = $('#sty');
  const say = (t) => () => (ty.textContent = t);
  ty.textContent = '正在醒来';
  if (RM()) {
    gsap.set('#app', { autoAlpha: 1 });
    enterHome();
    gsap.to(sp, { autoAlpha: 0, duration: 0.3, delay: 0.6, onComplete: () => gsap.set(sp, { display: 'none' }) });
    return;
  }
  const tl = gsap.timeline();
  tl.from('.logo .d', { scale: 0, duration: D(0.6), ease: 'back.out(1.8)' })
    .from('.logo .o', { yPercent: 40, autoAlpha: 0, duration: D(0.7), ease: 'back.out(1.4)' }, D(0.25))
    .from('.logo .g', { scale: 0, duration: D(0.5), ease: 'back.out(2.4)' }, D(0.62))
    .fromTo('.logo .rg', { scale: 0.9, autoAlpha: 0.8 }, { scale: 1.9, autoAlpha: 0, duration: D(1.4), ease: 'power2.out', stagger: D(0.3) }, D(0.5))
    .from('#stitle span', { y: 14, autoAlpha: 0, filter: 'blur(4px)', duration: D(0.5), stagger: D(0.07), ease: 'power3.out' }, D(0.85))
    .from('#sfam, #slogan', { autoAlpha: 0, y: 6, duration: D(0.5) }, D(1.1))
    .add(say('读取磁盘与内存……'), D(1.3))
    .add(say(`看看水清不清……可清理 ${S.junk.toFixed(1)} GB`), D(1.9))
    .add(() => splashPond.set({ level: Math.min(0.3, 0.1 + S.disk * 0.3) }), D(2.1))
    .add(say('好了'), D(2.6))
    .add(() => { gsap.set('#app', { autoAlpha: 1 }); enterHome(); }, D(2.9))
    .to(sp, { autoAlpha: 0, duration: D(0.5), ease: 'power2.inOut' }, D(2.9))
    .set(sp, { display: 'none' });
}

function enterHome() {
  pond.set({ level: 0.02 }, true);
  update();
  const tl = gsap.timeline();
  tl.from('.side > *', { x: -10, autoAlpha: 0, stagger: D(0.04), duration: D(0.42), ease: 'power3.out', clearProps: 'all' })
    .from('.phead > *', { y: 8, autoAlpha: 0, stagger: D(0.05), duration: D(0.42), ease: 'power3.out', clearProps: 'all' }, '<0.05')
    .from('.grid > *', { y: 16, autoAlpha: 0, stagger: D(0.06), duration: D(0.62), ease: 'back.out(1.3)', clearProps: 'transform,opacity,visibility' }, '<0.05')
    .add(() => scoreIn(0, S.score), '<0.2')
    .from('#otter img, #bubble', { autoAlpha: 0, scale: 0.6, duration: D(0.5), ease: 'back.out(2)', stagger: D(0.15) }, '<0.4');
}

/* ── 演示控制台 ───────────────────────────────────────── */
function consoleUI() {
  const grp = (h, k, opts) => `<h2>${h}</h2><div class="opt" data-k="${k}">${opts.map(([v, t]) => `<button data-v="${v}">${t}</button>`).join('')}</div>`;
  $('#console').innerHTML = `<h1>水獭工具 · 原型</h1><div class="sub">第一批：启动 → 首页 · 1280×800</div>
    ${grp('主题', 'theme', [['night', '夜'], ['day', '昼']])}
    ${grp('机器状态（驱动水面与小獭）', 'preset', [['calm', '平静'], ['busy', '忙碌'], ['alarm', '内存告急'], ['full', '磁盘将满']])}
    ${grp('时段', 'time', [['morning', '早上'], ['afternoon', '下午'], ['night', '深夜']])}
    <h2>演示</h2><div class="opt"><button data-do="splash">重放启动</button><button data-do="care">一键养护</button><button data-do="mem">释放内存</button><button data-do="poke">戳小獭</button><button data-do="rm">减弱动效</button></div>
    <p>水面读法：<b>水位</b> = 磁盘占用 · <b>浑浊</b> = 可清理体积 · <b>波速</b> = CPU · <b>水温</b> = 内存压力。卡片右下角的图例写明了每一项，不只靠颜色。</p>
    <p>大动效只在 5 处：冷启动、体检出分、一键养护、清理完成（石子落罐）、内存释放。其余只做短淡入。</p>
    <p>快捷键：<b>⌘↩</b> 一键养护 · <b>⌘K</b> 命令面板（下一批）。</p>
    <p>其它页面在下一批原型里，点了会提示。</p>`;
  $('#console').addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    const k = b.parentElement.dataset.k;
    if (k === 'theme') { S.theme = b.dataset.v; update(); }
    else if (k === 'preset') {
      const old = S.score;
      Object.assign(S, JSON.parse(JSON.stringify(PRESETS[b.dataset.v])), { preset: b.dataset.v, safe: 8.2 });
      update();
      scoreIn(old, S.score);
    } else if (k === 'time') { S.time = b.dataset.v; update(); }
    else if (b.dataset.do === 'splash') playSplash();
    else if (b.dataset.do === 'care') askCare();
    else if (b.dataset.do === 'mem') { if (S.page === 'home') releaseMem(); }
    else if (b.dataset.do === 'poke') { if (S.page === 'home') $('#otter').click(); }
    else if (b.dataset.do === 'rm') { forceRM = !forceRM; b.classList.toggle('on', forceRM); update(); }
    syncConsole();
  });
  syncConsole();
}
function syncConsole() {
  $$('#console [data-k]').forEach((g) => $$('button', g).forEach((b) => b.classList.toggle('on', S[g.dataset.k] === b.dataset.v)));
}

/* ── 缩放到视口 ───────────────────────────────────────── */
let scale = 1;
function fit() {
  scale = Math.min((innerWidth - 240 - 32) / 1280, (innerHeight - 32) / 800, 1.25);
  win.style.transform = `scale(${scale})`;
}
addEventListener('resize', fit);
fit();

renderShell();
mountPonds();
consoleUI();
update();
if (new URLSearchParams(location.search).has('nosplash')) { gsap.set('#splash', { display: 'none' }); enterHome(); }
else playSplash();
