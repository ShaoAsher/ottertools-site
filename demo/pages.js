/* 水獭工具 · 原型 · 其余页面（体检 / 清理 / 加速 / 隐私 / 工具箱 / 本机）
   路由 go('page:seg') · 每页四种通用状态：加载中 / 空 / 出错 / 无权限（演示台切换） */
window.ACTS = {};
Object.assign(P, {
  copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/>',
  apps: '<rect x="4" y="4" width="7" height="7" rx="2"/><rect x="13" y="4" width="7" height="7" rx="2"/><rect x="4" y="13" width="7" height="7" rx="2"/><rect x="13" y="13" width="7" height="7" rx="2"/>',
  list: '<path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01"/>',
  lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  disk: '<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
  battery: '<rect x="3" y="7" width="16" height="10" rx="2"/><path d="M22 11v2M7 10v4M11 10v4"/>',
  wifi: '<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0M12 19.5h.01"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  folder: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  pin: '<path d="M9 4h6l-1 6 3 3H7l3-3zM12 13v7"/>',
  chev: '<path d="M9 6l6 6-6 6"/>',
  bell: '<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4zM10 21h4"/>',
  kbd: '<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10"/>',
  spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5h.01"/>',
  link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
  code: '<path d="M8 8l-5 4 5 4M16 8l5 4-5 4M14 5l-4 14"/>',
  drop: '<path d="M12 3s7 7.5 7 12a7 7 0 0 1-14 0c0-4.5 7-12 7-12z"/>',
  sleep: '<path d="M4 6h5l-5 6h5M13 4h4l-4 5h4M15 14h5l-5 6h5"/>',
  share: '<path d="M12 15V3M7 8l5-5 5 5"/><path d="M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"/>',
  play: '<path d="M7 4v16l13-8z"/>',
  dl: '<path d="M12 4v12M6 11l6 6 6-6M4 20h16"/>',
  hand: '<path d="M8 13V5a1.5 1.5 0 0 1 3 0v6M11 11V4a1.5 1.5 0 0 1 3 0v7M14 11V5.5a1.5 1.5 0 0 1 3 0V14a7 7 0 0 1-7 7 6 6 0 0 1-5-3l-2.5-4.5a1.5 1.5 0 0 1 2.6-1.5L8 14"/>',
  cam: '<rect x="3" y="7" width="13" height="10" rx="2"/><path d="M16 11l5-3v8l-5-3"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
  loc: '<path d="M12 21s-7-6.5-7-12a7 7 0 0 1 14 0c0 5.5-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  screen: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
  robot: '<rect x="5" y="8" width="14" height="11" rx="3"/><path d="M12 4v4M9 13h.01M15 13h.01M3 13v2M21 13v2"/>',
  dns: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  hide: '<path d="M3 3l18 18M10.6 6.1A10 10 0 0 1 12 6c6.4 0 10 6 10 6a17 17 0 0 1-3.2 3.8M6.6 6.6A17 17 0 0 0 2 12s3.6 6 10 6a10 10 0 0 0 4.4-1"/>',
  desk: '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M7 21h10M8 9h3v3H8z"/>',
  cup: '<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6zM17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 2v3M12 2v3"/>',
  zip: '<path d="M6 3h8l4 4v14H6z"/><path d="M11 3v2M11 7v2M11 11v2M10 15h2v3h-2z"/>',
  vm: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M7 20h10M8 8l3 2-3 2M13 12h3"/>',
  video: '<rect x="3" y="6" width="14" height="12" rx="2"/><path d="M17 10l4-2v8l-4-2"/>',
  pkg: '<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M4 7.5l8 4.5 8-4.5M12 12v9"/>',
});

/* ── 小工具 ─────────────────────────────────────────── */
const wait = (ms) => new Promise((r) => setTimeout(r, RM() ? Math.min(ms, 160) : ms));
const gb = (n) => (n >= 0.95 ? n.toFixed(1) + ' GB' : n >= 0.001 ? Math.round(n * 1024) + ' MB' : Math.max(1, Math.round(n * 1048576)) + ' KB');
const card = (cls, h, sub, body, extra = '') => `<section class="cardp ${cls}">${h ? `<div class="ch"><h3>${h}</h3>${sub ? `<span>${sub}</span>` : ''}<span class="sp"></span>${extra}</div>` : ''}${body}</section>`;
const chk = (on, act, arg, dis) => `<span class="chk${on === 'mix' ? ' on mix' : on ? ' on' : ''}" data-act="${act}" data-arg="${arg}"${dis ? ' style="opacity:.35;pointer-events:none"' : ''}></span>`;
const sw = (on, act, arg) => `<span class="sw${on ? ' on' : ''}" data-act="${act}" data-arg="${arg}" role="switch" aria-checked="${on}"></span>`;
const ib = (icon, act, arg, tip) => `<button class="ibs" data-act="${act}" data-arg="${arg}" data-tip="${tip}">${I(icon)}</button>`;
const emptyB = (img, h, p, acts = '', cls = '') => `<div class="empty ${cls}"><img src="${ex(img)}" alt=""><h3>${h}</h3><p>${p}</p>${acts ? `<div class="acts">${acts}</div>` : ''}</div>`;
const tag = (t, tone = '') => `<span class="tag ${tone}">${t}</span>`;
function R(o) {
  const lead = o.ap ? `<span class="b ap" style="--c:${o.c}">${o.ap}</span>` : o.b ? `<span class="b" style="--c:${o.c || 'var(--lo)'}">${I(o.b)}</span>` : '';
  return `<div class="row ${o.cls || ''}" ${o.attrs || ''}>${o.pre || ''}${lead}<div class="tx"><b>${o.t}${o.tag || ''}</b>${o.s ? `<span>${o.s}</span>` : ''}</div>${o.right || ''}</div>`;
}
function ringG(v, size, col, inner, sw2 = 10) {
  const r = (size - sw2) / 2 - 2, C = 2 * Math.PI * r;
  return `<div style="position:relative;width:${size}px;height:${size}px;flex:none"><svg viewBox="0 0 ${size} ${size}" style="width:100%;height:100%;transform:rotate(-90deg)">
    <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" style="stroke:rgba(var(--ink),.08)" stroke-width="${sw2}"/>
    <circle class="rgv" cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" style="stroke:${col};filter:drop-shadow(0 0 6px ${col})" stroke-width="${sw2}" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - v / 100)}" data-c="${C}"/></svg>
    <div style="position:absolute;inset:0;display:grid;place-items:center;text-align:center">${inner}</div></div>`;
}
function areaPath(arr, w, h, max = 100, min = 0) {
  const n = arr.length, pts = arr.map((v, i) => [(i / (n - 1)) * w, h - ((v - min) / (max - min)) * (h - 6) - 3]);
  const d = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  return { line: d, fill: d + ` L${w} ${h} L0 ${h} Z` };
}
function chartSvg(arr, col, max = 100, h = 120, id = '') {
  const a = areaPath(arr, 600, h, max);
  return `<svg class="chart" ${id ? `id="${id}"` : ''} viewBox="0 0 600 ${h}" preserveAspectRatio="none" style="height:${h}px">
    <path d="${a.fill}" style="fill:${col};opacity:.14"/><path d="${a.line}" fill="none" style="stroke:${col}" stroke-width="2" vector-effect="non-scaling-stroke"/></svg>`;
}

/* ── 路由 ─────────────────────────────────────────── */
const SEGS = {
  clean: [['junk', '垃圾', 'clean'], ['large', '大文件', 'file'], ['dup', '重复文件', 'copy'], ['apps', '应用卸载', 'apps']],
  boost: [['mem', '内存', 'mem'], ['proc', '进程', 'list'], ['start', '启动项', 'power']],
  privacy: [['trace', '痕迹', 'shield'], ['perm', '应用权限', 'lock']],
  toolbox: [['quick', '快捷操作', 'bolt'], ['ocr', '截图识字', 'scan'], ['clip', '剪切板', 'clip'], ['img', '图片', 'image']],
  mac: [['hw', '硬件', 'chip'], ['storage', '存储', 'disk'], ['bat', '电池', 'battery'], ['net', '网络', 'gauge'], ['wifi', 'Wi‑Fi', 'wifi']],
};
const TITLE = {
  check: ['体检', '看看这台 Mac 现在怎么样'], clean: ['清理', '都进废纸篓，能放回来'], boost: ['加速', '内存、进程和开机'],
  privacy: ['隐私', '痕迹和应用权限'], toolbox: ['工具箱', '顺手的小工具'], mac: ['本机', '这台 Mac 的底细'],
};
Object.assign(S, {
  page: 'home', pageKey: 'home', pst: 'normal',
  seg: { clean: 'junk', boost: 'mem', privacy: 'trace', toolbox: 'quick', mac: 'hw' },
  ck: 'result', jph: 'idle', imgPh: 'list', appTab: 'inst', appSort: 'size', appSrc: '全部',
  procQ: '', procSort: 'cpu', procWho: '全部', lfType: '全部', clipSel: 0, permSel: 0, wifiPw: false, speed: null,
});
let pgPond = null;

function go(arg = 'home') {
  const [page, seg] = String(arg).split(':');
  if (seg && SEGS[page]) S.seg[page] = seg;
  if (page !== S.page || seg) S.pst = 'normal';
  S.page = page;
  S.pageKey = SEGS[page] ? `${page}:${S.seg[page]}` : page;
  $$('#nav .nv').forEach((n) => n.classList.toggle('on', n.dataset.nav === page));
  const home = page === 'home';
  $('#grid').classList.toggle('hide', !home);
  $('#hh').classList.toggle('hide', !home);
  $('#page').classList.toggle('hide', home);
  $('#ph').classList.toggle('hide', home);
  if (home) {
    $('#pacts').innerHTML = '';
    pgPond && pgPond.destroy(); pgPond = null;
    update();
    gsap.from('.grid > *', { y: 10, autoAlpha: 0, stagger: D(0.04), duration: D(0.42), ease: 'power3.out', clearProps: 'all' });
  } else render(true);
  syncConsole();
}
ACTS.go = (a) => go(a);
ACTS.seg = (a) => go(`${S.page}:${a}`);

function render(anim) {
  const page = S.page, segs = SEGS[page], seg = S.seg[page];
  const key = segs ? `${page}:${seg}` : page;
  const [t, sub] = TITLE[page];
  $('#ph').innerHTML = `<div><h1>${t}</h1><p class="muted" style="font-size:12px">${sub}</p></div>${segs ? `<div class="segs" role="tablist">${segs.map(([id, n, ic]) => `<button class="sgm${id === seg ? ' on' : ''}" data-act="seg" data-arg="${id}" role="tab">${I(ic)}${n}<span class="node"></span>${SEGCT[`${page}:${id}`]?.() ? `<span class="ct num">${SEGCT[`${page}:${id}`]()}</span>` : ''}</button>`).join('')}</div>` : ''}`;
  $('#pacts').innerHTML = (PACTS[key] || (() => ''))();
  const pg = $('#page');
  pg.innerHTML = stateView(key) || PG[key]();
  pg.scrollTop = 0;
  pgPond && pgPond.destroy(); pgPond = null;
  if (S.pst === 'normal' && AFTER[key]) AFTER[key]();
  if (anim) gsap.from('#page > *', { y: 12, autoAlpha: 0, stagger: D(0.05), duration: D(0.42), ease: 'power3.out', clearProps: 'transform,opacity,visibility' });
  statusbar();
  $$('[data-m]').forEach((el) => { const n = NAV.find((x) => x.id === el.dataset.m); el.textContent = n.m ? n.m() : ''; });
}
const rerender = () => render(false);
const SEGCT = {
  'clean:junk': () => (S.junk > 0.05 ? S.junk.toFixed(1) + ' GB' : ''), 'clean:large': () => LARGE.length, 'clean:dup': () => DUP.length,
  'clean:apps': () => APPS.length, 'boost:start': () => STARTUP.filter((s) => s.on).length, 'privacy:trace': () => TRACE.reduce((a, g) => a + g.items.length, 0), 'toolbox:clip': () => CLIP.length,
};
const PACTS = {};
const AFTER = {};
const PG = {};

/* ── 通用状态：加载中 / 空 / 出错 / 无权限 ───────────── */
const STATE_COPY = {
  check: { empty: ['proud', '全部正常，水清见底', '这次体检没有发现需要处理的地方。小獭去打个盹，有情况会叫你。', '<button class="ghost lg" data-act="ckAgain">再体检一次</button>'] },
  'clean:junk': { empty: ['clear', '水很清，没什么可清的', '缓存、日志都很少。小獭会在攒到 1 GB 以上时提醒你。'] },
  'clean:large': { empty: ['calm', '没有超过 500 MB 的文件', '可以把门槛调低一点，或者把外置磁盘也算进来。', '<button class="ghost lg" data-act="pst" data-arg="normal">调到 100 MB</button>'] },
  'clean:dup': { empty: ['happy', '没有重复的文件', '下载、桌面和文稿里每个文件都只有一份。'] },
  'clean:apps': { empty: ['think', '没找到这个应用', '换个关键词试试，或者看看「残留」里有没有它。'] },
  'boost:mem': { empty: ['calm', '内存很空', '现在只用了 3.2 GB，不需要释放。'] },
  'boost:proc': { empty: ['think', '没找到「xcod」', '这个名字下没有正在运行的进程。检查一下拼写，或切到「全部」。', '<button class="ghost lg" data-act="pst" data-arg="normal">清除搜索</button>'] },
  'boost:start': { empty: ['proud', '开机很干净', '没有应用跟着开机一起启动。'] },
  'privacy:trace': { empty: ['proud', '没有留下痕迹', '浏览器和常用应用的痕迹都已经清过了。'] },
  'privacy:perm': { empty: ['calm', '还没有应用申请这类权限', ''] },
  'toolbox:quick': {},
  'toolbox:ocr': {},
  'toolbox:clip': { empty: ['nap', '剪切板还空着', '复制点什么试试（⌘C），小獭会帮你记下最近 200 条。密码管理器里复制的内容不会记录。'] },
  'toolbox:img': { empty: null },
  'mac:bat': { empty: ['sleepy', '这台 Mac 没有电池', '台式机插着电源，这一页没什么可看的。'] },
  'mac:wifi': { empty: ['scared', '没有连接 Wi‑Fi', '现在用的是有线网络，或者网络已断开。', '<button class="ghost lg" data-act="flashMsg" data-arg="已打开「系统设置 › Wi‑Fi」">打开 Wi‑Fi 设置</button>'] },
  'mac:net': { error: ['scared', '网络不可用', '连不上外网，测速和延迟都读不到。先看看路由器，或者切换一下 Wi‑Fi。', 'ERR_NETWORK_UNREACHABLE'] },
};
function stateView(key) {
  const st = S.pst;
  if (st === 'normal') return '';
  const c = STATE_COPY[key] || {};
  if (st === 'loading') {
    const ln = (w, h = 12) => `<div class="skel" style="width:${w};height:${h}px;margin:8px 0"></div>`;
    return `<section class="cardp full" style="padding:18px 20px;display:flex;align-items:center;gap:16px"><img src="${ex('focus')}" style="width:64px;height:64px" alt=""><div style="flex:1"><b style="font-size:15px">小獭正在读取……</b><div class="muted">第一次打开会慢一点，大约 2 秒</div><div class="pbar"><i style="width:46%"></i></div></div></section>
      <section class="cardp c8" style="padding:16px 18px">${ln('40%', 16)}${[1, 2, 3, 4, 5].map(() => `<div style="display:flex;gap:12px;align-items:center;margin:12px 0"><div class="skel" style="width:34px;height:34px"></div><div style="flex:1">${ln('60%')}${ln('35%', 10)}</div><div class="skel" style="width:60px;height:14px"></div></div>`).join('')}</section>
      <section class="cardp c4" style="padding:16px 18px">${ln('50%', 16)}<div class="skel" style="width:140px;height:140px;border-radius:50%;margin:18px auto"></div>${ln('80%')}${ln('60%')}</section>`;
  }
  if (st === 'empty') {
    if (key === 'toolbox:img') return imgDrop(true);
    const e = c.empty || ['calm', '这里空空的', '暂时没有可以显示的内容。'];
    return `<section class="cardp full">${emptyB(...e)}</section>`;
  }
  if (st === 'error') {
    const e = c.error || ['speechless', '这次没读出来', '系统有点忙，小獭没能读到数据。等几秒再试一次，一般就好了。', 'ERR_READ_TIMEOUT · 已等待 10 秒'];
    return `<section class="cardp full">${emptyB(e[0], e[1], e[2] + `</p><p class="code">${e[3]}`, '<button class="slab" data-act="retry">重试</button><button class="ghost lg" data-act="flashMsg" data-arg="错误信息已复制">复制错误信息</button>', 'err')}</section>`;
  }
  if (st === 'denied') {
    const needLoc = key === 'mac:wifi';
    const perm = needLoc ? '定位服务' : key.startsWith('boost') || key === 'toolbox:quick' ? '辅助功能' : '完全磁盘访问';
    const why = needLoc ? 'macOS 要求打开定位服务后，应用才能读到 Wi‑Fi 名称和附近的网络。' : perm === '辅助功能' ? '结束进程、管理启动项需要「辅助功能」权限。' : '读取缓存、日志和其他应用的数据需要「完全磁盘访问」。小獭只读不改，删除前一定先问你。';
    return `<section class="cardp full">${emptyB('please', `需要「${perm}」权限`, why, `<button class="slab" data-act="onb" data-arg="${perm}">去打开</button><button class="ghost lg" data-act="pst" data-arg="normal">已经打开了，重新检查</button>`)}</section>`;
  }
  return '';
}
ACTS.pst = (v) => { S.pst = v; rerender(); syncConsole(); };
ACTS.retry = () => { S.pst = 'loading'; rerender(); setTimeout(() => { S.pst = 'normal'; rerender(); syncConsole(); }, RM() ? 200 : 1200); };
ACTS.flashMsg = (t) => flash(t);

/* 通用进度弹窗（与一键养护同一套）：步骤依次亮起 → 回到调用方出结果 */
async function opRun({ title, img = 'focus', steps, note = '文件都进废纸篓，随时能放回来' }) {
  const t0 = performance.now();
  const d = showOc('oc busy', `<div class="in"><img src="${ex(img)}" alt=""><h3>${title}</h3>
    <div class="steps">${steps.map((s, i) => `<div class="stp" data-i="${i}"><span class="s">${I('check')}</span>${s[0]}<span class="r num"></span></div>`).join('')}</div>
    <div class="bar det"><i style="width:6%"></i></div><div class="el">已用 0 秒 · ${note}</div>
    <button class="ghost block" data-act="opBg">在后台继续</button></div>`);
  clearInterval(ocTick);
  ocTick = setInterval(() => { const el = $('.el', d); if (el) el.textContent = `已用 ${Math.round((performance.now() - t0) / 1000)} 秒 · ${note}`; }, 500);
  for (let i = 0; i < steps.length; i++) {
    const r = $(`.stp[data-i="${i}"]`, d);
    r.className = 'stp run';
    await wait(560 + Math.random() * 420);
    r.className = 'stp done';
    $('.r', r).textContent = steps[i][1] || '';
    $('.bar i', d).style.width = ((i + 1) / steps.length) * 100 + '%';
  }
  await wait(320);
  clearInterval(ocTick);
}
ACTS.opBg = () => { closeDlg(); flash('在后台继续 · 完成后会弹出结果'); };
ACTS.flashUndo = () => { const f = flashUndo; flashUndo = null; $('#sbFlash').classList.remove('on'); f && f(); };
function ask({ img = 'think', title, p, list, ok, danger, act, arg = '', alt }) {
  openDlg(`<img src="${ex(img)}" alt=""><h3>${title}</h3><p>${p}</p>${list ? `<ul>${list}</ul>` : ''}
    <div class="btns"><button class="slab block${danger ? ' danger' : ''}" data-act="${act}" data-arg="${arg}">${ok}</button>${alt || ''}<button class="ghost block" data-act="close">取消</button></div>`, 'ask');
}

/* ══ 体检 ═════════════════════════════════════════════ */
const CK_CATS = ['磁盘与垃圾', '内存与进程', '启动项', '隐私痕迹', '大文件', '电池与硬件'];
function issues() {
  const L = [
    ['clean', '发现可清理的垃圾', '中', 'busy', `缓存、日志与 Xcode 派生数据 · ${S.junk.toFixed(1)} GB`, 'clean:junk'],
    ['power', '启动项偏多', '低', 'calm', `${STARTUP.filter((s) => s.on).length} 个应用随开机启动，开机约慢 6 秒`, 'boost:start'],
    ['shield', '浏览器留下了痕迹', '低', 'calm', '浏览历史与 Cookie 共 1,600 多条', 'privacy:trace'],
  ];
  if (S.memTone !== 'calm') L.unshift(['mem', S.memTone === 'alarm' ? '内存快满了' : '内存压力偏高', S.memTone === 'alarm' ? '高' : '中', S.memTone === 'alarm' ? 'alarm' : 'busy', `Xcode 与 Chrome 合计占用 5.5 GB · 可回收约 1.6 GB`, 'boost:mem']);
  if (S.preset === 'alarm') L.splice(1, 0, ['alert', '2 个应用无响应', '高', 'alarm', 'Figma、Slack 超过 30 秒没有响应', 'boost:proc']);
  if (S.preset === 'full') L.unshift(['disk', '磁盘快满了', '高', 'alarm', '只剩 34 GB，8 个大文件合计 66.8 GB', 'clean:large']);
  return L;
}
PG.check = () => {
  if (S.ck === 'scan') return `<section class="cardp full">${scanBlock('focus', '正在体检……', '只读检查，不会改动任何东西', CK_CATS, 'ckCat')}</section>`;
  const L = issues();
  const cn = [['内存', 'mem'], ['磁盘', 'disk'], ['安全', 'shield'], ['启动', 'power']];
  const hist = [71, 78, 74, 82, 80, 84, S.score];
  return `<section class="cardp c5"><div class="ch"><h3>体检报告</h3><span>刚刚 · 用时 6 秒</span></div>
      <div style="display:flex;gap:18px;align-items:center;padding:4px 18px 10px">${ringG(S.score, 150, scColor(S.score), `<div><div class="big num" id="ckNum" style="font-size:44px">${S.score}</div><div class="muted" style="font-weight:700;color:${scColor(S.score)}">${S.label}</div></div>`, 12)}
      <div style="flex:1;display:flex;flex-direction:column;gap:10px">${cn.map(([t], i) => `<div><div style="display:flex;font-size:12.5px;margin-bottom:4px"><span class="muted">${t}</span><b class="num" style="margin-left:auto">${S.contrib[i]}</b></div><div class="szb" style="width:100%;--c:${scColor(S.contrib[i])}"><i style="width:${S.contrib[i]}%"></i></div></div>`).join('')}</div></div>
      <div class="bd" style="display:flex;gap:8px"><button class="slab" data-act="care" style="flex:1" data-tip="⌘↩">一键养护</button><button class="ghost lg" data-act="ckAgain">重新体检</button><button class="ghost lg" data-act="share">${I('share')}</button></div></section>
    <section class="cardp c7"><div class="ch"><h3>有 ${L.length} 项可以优化</h3><span>按影响排序</span><span class="sp"></span><a data-act="flashMsg" data-arg="体检结果已复制为文字">导出文字</a></div>
      ${L.map(([ic, t, lv, tone, s, to]) => R({ b: ic, c: `var(--${tone})`, t, tag: tag(lv === '高' ? '影响大' : lv === '中' ? '影响中' : '影响小', tone), s, right: `<button class="ghost" data-act="go" data-arg="${to}">去处理</button>` })).join('')}
      ${R({ b: 'check', c: 'var(--ok)', t: '6 项检查都正常', s: '电池健康 96% · 系统更新已是最新 · 防火墙已开启 · SIP 已开启 · 磁盘 SMART 正常 · 时间机器 2 小时前备份', cls: 'grp' })}</section>
    ${[['内存', 'mem', `${S.mem.toFixed(1)} / 16 GB · ${memWord[S.memTone]}`, S.memTone === 'calm' ? '压力平稳，交换文件几乎没用到。' : 'Xcode 和 Chrome 占得多，释放一下能回来 1.6 GB。', 'boost:mem'],
      ['磁盘', 'disk', `剩 ${Math.round((1 - S.disk) * 494)} GB`, `可清理 ${S.junk.toFixed(1)} GB；大文件 66.8 GB，多数半年没打开。`, 'clean:junk'],
      ['安全', 'shield', '防火墙 · SIP 已开启', '系统是最新的；浏览器痕迹 1,600 多条，清不清看你。', 'privacy:trace'],
      ['启动', 'power', `${STARTUP.filter((s) => s.on).length} 个启动项`, 'Docker 和 Adobe 的后台服务各拖慢开机约 2 秒。', 'boost:start']]
      .map(([t, ic, v, s, to], i) => `<section class="cardp c3" style="padding:14px 16px;display:flex;flex-direction:column;gap:6px;cursor:pointer" data-act="go" data-arg="${to}">
        <div style="display:flex;align-items:center;gap:8px"><span class="b" style="width:30px;height:30px;border-radius:9px;display:grid;place-items:center;background:color-mix(in srgb,${scColor(S.contrib[i])} 14%,transparent);color:${scColor(S.contrib[i])}">${I(ic)}</span><b>${t}</b><span class="num" style="margin-left:auto;font-weight:800;color:${scColor(S.contrib[i])}">${S.contrib[i]}</span></div>
        <div style="font-size:13px;font-weight:700">${v}</div><div class="muted" style="font-size:12px">${s}</div></section>`).join('')}
    <section class="cardp full"><div class="ch"><h3>最近 7 次体检</h3><span>分数越来越稳了</span><span class="sp"></span><span class="legend2"><span><i style="background:var(--ok)"></i>体检分</span></span></div>
      <div class="bd" style="display:grid;grid-template-columns:repeat(7,1fr);gap:14px;align-items:end">${['10/09', '10/16', '10/23', '10/30', '11/02', '11/04', '今天'].map((d, i) => { const last = i === 6, c = hist[i] >= 80 ? 'var(--ok)' : 'var(--busy)'; return `<div style="display:flex;flex-direction:column;align-items:center;gap:6px"><b class="num" style="font-size:${last ? 17 : 14}px;color:${last ? c : 'var(--hi)'}">${hist[i]}</b><div style="width:100%;max-width:56px;height:${Math.round((hist[i] - 50) * 2.2)}px;border-radius:8px 8px 3px 3px;background:${c};opacity:${last ? 1 : 0.32}"></div><div class="muted" style="font-size:11px">${d}</div></div>`; }).join('')}</div></section>`;
};
AFTER.check = () => {
  if (S.ck !== 'result') return;
  const c = $('#page .rgv'), C = +c.dataset.c;
  gsap.fromTo(c, { strokeDashoffset: C }, { strokeDashoffset: C * (1 - S.score / 100), duration: D(1.2), ease: 'power3.out' });
  const o = { v: 0 };
  gsap.to(o, { v: S.score, duration: D(1.2), ease: 'power3.out', onUpdate: () => { const n = $('#ckNum'); if (n) n.textContent = Math.round(o.v); } });
};
function scanBlock(img, h, sub, cats, id) {
  return `<div class="scanv"><div class="pondbox"><canvas id="pgPond"></canvas><img src="${ex(img)}" alt=""></div>
    <div style="flex:1;min-width:0"><h2>${h}</h2><div class="muted" id="scanPath" style="font-family:var(--mono);font-size:12px">${sub}</div>
    <div class="cats" id="${id}">${cats.map((c) => `<div class="cat"><i></i>${c}<b></b></div>`).join('')}</div><div class="pbar"><i id="scanBar" style="width:2%"></i></div></div></div>`;
}
async function scanRun(id, results, paths) {
  const cats = $$(`#${id} .cat`);
  for (let i = 0; i < cats.length; i++) {
    if (!cats[i].isConnected) return false;
    cats[i].className = 'cat run';
    $('#scanPath').textContent = paths[i % paths.length];
    await wait(380 + Math.random() * 260);
    cats[i].className = 'cat done';
    $('b', cats[i]).textContent = results[i] || '';
    $('#scanBar').style.width = ((i + 1) / cats.length) * 100 + '%';
  }
  await wait(300);
  return true;
}
ACTS.ckAgain = async () => {
  S.ck = 'scan'; S.pst = 'normal'; rerender();
  mountPgPond(0.4, 0.3);
  const ok = await scanRun('ckCat', [`${S.junk.toFixed(1)} GB`, memWord[S.memTone], '7 项', '1,600 条', '8 个', '正常'], ['~/Library/Caches', 'vm_stat · 内存压力', 'launchd · 登录项', '~/Library/Safari/History.db', '~/Movies · ~/Downloads', 'ioreg · AppleSmartBattery']);
  if (!ok) return;
  S.ck = 'result'; rerender();
  flash(`体检完成 · ${S.score} 分 · 有 ${issues().length} 项可以优化`);
};
ACTS.share = () => {
  openDlg(`<div class="scard"><div style="display:flex;align-items:center;gap:14px">${ringG(S.score, 92, '#6EE7A8', `<b class="num" style="font-size:26px">${S.score}</b>`, 8)}<div><div style="font-size:12px;color:#A09BB4">我的 Mac 体检分</div><div style="font-size:20px;font-weight:800">${S.label}</div><div style="font-size:12px;color:#A09BB4;margin-top:4px">本周帮我清掉 ${S.week} GB · 石头罐 ${S.pebbles} 颗</div></div>
      <img src="${ex('proud', true)}" style="width:70px;height:70px;margin-left:auto" alt=""></div><div class="ft"><img src="brand/tools_icon.png" alt="">水獭工具 · 小獭帮我看着这台 Mac</div></div>
    <div style="display:flex;gap:8px;margin-top:14px"><button class="slab" style="flex:1" data-act="shareGo" data-arg="图片已复制，可以直接粘贴">复制图片</button><button class="ghost lg" data-act="shareGo" data-arg="已保存到「下载」">保存</button><button class="ghost lg" data-act="close">关闭</button></div>`, 'share');
};
ACTS.shareGo = (t) => { closeDlg(); flash(t); };

/* ══ 清理 · 垃圾 ═════════════════════════════════════ */
const JUNK = [
  { g: 'safe', t: '系统缓存', b: 'disk', items: [['~/Library/Caches/com.apple.Safari', 1.6], ['~/Library/Caches/CloudKit', 0.8], ['/Library/Caches', 1.1]] },
  { g: 'safe', t: '应用缓存', b: 'apps', items: [['Chrome · 缓存', 1.9], ['Slack · 缓存', 0.9], ['Figma · 缓存', 0.7]] },
  { g: 'safe', t: '日志与诊断报告', b: 'file', items: [['~/Library/Logs', 0.8], ['DiagnosticReports · 126 份', 0.4]] },
  { g: 'ok', t: 'Xcode 派生数据', b: 'code', note: '下次编译会慢一些', items: [['DerivedData', 2.1], ['iOS DeviceSupport 18.x', 0.3]] },
  { g: 'ok', t: '下载的安装包', b: 'pkg', note: '已经装好的应用的安装包', items: [['Figma-126.dmg', 0.42], ['Docker.dmg', 0.56]] },
  { g: 'care', t: '邮件附件', b: 'clip', note: '可能有你还要用的附件', items: [['Mail Downloads · 38 个', 0.42]] },
  { g: 'care', t: '旧的 iOS 设备备份', b: 'mac', note: '删掉后就不能从这份备份恢复', items: [['iPhone 15 · 2025年3月', 0.4]] },
];
const JG = { safe: ['建议清理', 'ok', '小獭确认过，清了也不影响使用'], ok: ['可以清除', 'calm', '清了会重新生成，或稍微影响一点体验'], care: ['谨慎', 'busy', '默认不选，先看看再决定'] };
let jsel = new Set(), jopen = new Set([0]);
function jReset() { jsel = new Set(); JUNK.forEach((g, gi) => g.g === 'safe' && g.items.forEach((_, ii) => jsel.add(`${gi}-${ii}`))); }
jReset();
const jSize = () => [...jsel].reduce((a, k) => { const [g, i] = k.split('-'); return a + JUNK[g].items[i][1]; }, 0);
const jTotal = () => JUNK.reduce((a, g) => a + g.items.reduce((b, x) => b + x[1], 0), 0);
PG['clean:junk'] = () => {
  if (S.jph === 'idle') return `<section class="cardp full"><div class="scanv"><div class="pondbox"><canvas id="pgPond"></canvas><img src="${ex('think')}" alt=""></div>
      <div style="flex:1"><h2>看看水底沉了多少东西</h2><p class="muted" style="margin:6px 0 16px;max-width:460px">扫描系统缓存、应用缓存、日志、Xcode 派生数据和旧安装包。只看不动，删之前一定先问你。</p>
      <div style="display:flex;gap:8px;align-items:center"><button class="slab" data-act="jScan">开始扫描</button><span class="muted">上次扫描：今天 14:20 · 清掉了 6.3 GB</span></div></div></div></section>
    ${[['石头罐', `${S.pebbles} 颗`, '每颗是一次清理', 'var(--accent)'], ['一共帮你清掉', `${S.freed.toFixed(1)} GB`, '从 2025 年 9 月开始', 'var(--ok)'], ['本周', `${S.week} GB`, '比上周多 2.1 GB', 'var(--calm)']].map(([k, v, s, c]) => `<section class="cardp c4 stat" style="border-radius:var(--r-md)"><div class="k">${k}</div><div class="v num" style="color:${c}">${v}</div><div class="s">${s}</div></section>`).join('')}
    ${card('full', '最近几次清理', '每次都在石头罐里放了一颗石子', [['今天 14:20', '一键养护', 6.3, 'spark'], ['11月3日', '清理垃圾', 4.8, 'clean'], ['10月30日', '卸载 Sketch', 1.4, 'apps'], ['10月27日', '移走大文件', 9.2, 'file']]
      .map(([d, t, g, ic], i) => R({ b: ic, c: STONES[i], t, s: d, right: `<span class="v num">${g} GB</span><span class="pb" style="width:14px;height:11px;border-radius:50%;background:${STONES[i]};flex:none"></span>` })).join(''))}`;
  if (S.jph === 'scan') return `<section class="cardp full">${scanBlock('focus', '正在扫描……', '~/Library/Caches', JUNK.map((g) => g.t), 'jCat')}</section>`;
  if (S.jph === 'done') return `<section class="cardp full"><div class="scanv"><div class="pondbox"><canvas id="pgPond"></canvas><img src="${ex('clear')}" alt=""></div>
      <div style="flex:1"><h2>水清了 · 释放了 ${S.lastFreed.toFixed(1)} GB</h2><p class="muted" style="margin:6px 0 16px">文件都在废纸篓里，30 天内随时能放回来。石头罐 +1，现在 ${S.pebbles} 颗。</p>
      <div style="display:flex;gap:8px"><button class="slab" data-act="go" data-arg="clean:large">再看看大文件</button><button class="ghost lg" data-act="jScan">再扫一次</button><button class="ghost lg" data-act="flashMsg" data-arg="已在访达中打开废纸篓">打开废纸篓</button></div></div></div></section>
    ${card('full', '石头罐', `${S.pebbles} 颗 · 一共帮你清掉 ${S.freed.toFixed(1)} GB`, `<div class="bd" id="jarRow" style="display:flex;flex-wrap:wrap;gap:6px;align-items:flex-end;min-height:40px">${Array.from({ length: S.pebbles }, (_, i) => `<span class="pb" style="width:${14 + rnd(i) * 10}px;height:${10 + rnd(i + 7) * 7}px;border-radius:50%;background:${STONES[i % STONES.length]};display:inline-block${i === S.pebbles - 1 ? ';box-shadow:0 0 12px var(--accent)' : ''}"></span>`).join('')}</div>`)}`;
  const sel = jSize(), tot = jTotal();
  const grp = (k) => JUNK.map((g, gi) => [g, gi]).filter(([g]) => g.g === k);
  return `<section class="cardp full" style="padding:16px 18px;display:flex;align-items:center;gap:24px">
      <div><div class="muted">找到可清理</div><div class="big num">${tot.toFixed(1)}<small>GB</small></div></div>
      <div style="flex:1"><div class="stack">${['safe', 'ok', 'care'].map((k) => { const s = grp(k).reduce((a, [g]) => a + g.items.reduce((b, x) => b + x[1], 0), 0); return `<i style="width:${(s / tot) * 100}%;background:var(--${JG[k][1]})"></i>`; }).join('')}</div>
      <div class="legend2" style="margin-top:8px">${['safe', 'ok', 'care'].map((k) => `<span><i style="background:var(--${JG[k][1]})"></i>${JG[k][0]}</span>`).join('')}<span style="margin-left:auto">都会移进废纸篓，可以放回来</span></div></div>
      <button class="slab" data-act="jClean" ${sel ? '' : 'disabled'}>清理选中的 ${sel.toFixed(1)} GB</button><button class="ghost lg" data-act="jScan">重新扫描</button></section>
    ${['safe', 'ok', 'care'].map((k) => card('full', `${JG[k][0]}`, JG[k][2], grp(k).map(([g, gi]) => {
      const all = g.items.every((_, ii) => jsel.has(`${gi}-${ii}`)), some = g.items.some((_, ii) => jsel.has(`${gi}-${ii}`));
      const sz = g.items.reduce((b, x) => b + x[1], 0), open = jopen.has(gi);
      return R({ cls: 'grp' + (open ? ' open' : ''), attrs: `data-act="jOpen" data-arg="${gi}"`, pre: `<span class="car">${I('chev')}</span>${chk(all || (some && 'mix'), 'jG', gi)}`, b: g.b, c: `var(--${JG[k][1]})`, t: g.t, tag: some && !all ? tag('部分', 'acc') : '', s: g.note || `${g.items.length} 项`, right: `<span class="v num">${gb(sz)}</span>` })
        + (open ? g.items.map(([n, s], ii) => R({ cls: 'sub', pre: chk(jsel.has(`${gi}-${ii}`), 'jI', `${gi}-${ii}`), t: `<span style="font-family:var(--mono);font-size:12px;font-weight:500">${n}</span>`, right: `<span class="v num" style="font-weight:500;color:var(--mid)">${gb(s)}</span><span class="ha">${ib('folder', 'flashMsg', '已在访达中显示', '在访达中显示')}</span>` })).join('') : '');
    }).join(''), `<span class="tag ${JG[k][1]}">${grp(k).length} 类</span>`)).join('')}`;
};
PACTS['clean:junk'] = () => S.jph === 'result' ? `<span class="muted">上次扫描 刚刚</span>` : '';
function mountPgPond(murk, level = 0.45) {
  const cv = $('#pgPond');
  if (!cv) return;
  const W = WATER[S.theme];
  pgPond = new Pond(cv, { init: { level, murk, speed: 0.3, tone: W.calm, deep: W.deep } });
}
AFTER['clean:junk'] = () => {
  mountPgPond(S.jph === 'done' ? 0 : Math.min(0.85, S.junk / 18));
  const last = $('#jarRow .pb:last-child');
  if (last) gsap.from(last, { y: -60, autoAlpha: 0, duration: D(0.9), delay: D(0.5), ease: 'bounce.out' });
};
ACTS.jScan = async () => {
  S.jph = 'scan'; rerender(); mountPgPond(0.5);
  const ok = await scanRun('jCat', JUNK.map((g) => gb(g.items.reduce((b, x) => b + x[1], 0))), ['~/Library/Caches/com.apple.Safari', '~/Library/Application Support/Google/Chrome/Default/Cache', '~/Library/Logs/DiagnosticReports', '~/Library/Developer/Xcode/DerivedData', '~/Downloads/*.dmg', '~/Library/Containers/com.apple.mail/Data/Library/Mail Downloads', '~/Library/Application Support/MobileSync/Backup']);
  if (!ok) return;
  jReset(); S.jph = 'result'; rerender();
};
ACTS.jOpen = (gi, el, e) => { if (e.target.closest('.chk')) return; jopen.has(+gi) ? jopen.delete(+gi) : jopen.add(+gi); rerender(); };
ACTS.jG = (gi) => { const g = JUNK[gi], all = g.items.every((_, ii) => jsel.has(`${gi}-${ii}`)); g.items.forEach((_, ii) => (all ? jsel.delete(`${gi}-${ii}`) : jsel.add(`${gi}-${ii}`))); rerender(); };
ACTS.jI = (k) => { jsel.has(k) ? jsel.delete(k) : jsel.add(k); rerender(); };
ACTS.jClean = () => {
  const gs = JUNK.map((g, gi) => [g, g.items.filter((_, ii) => jsel.has(`${gi}-${ii}`))]).filter(([, it]) => it.length);
  const care = gs.some(([g]) => g.g === 'care');
  ask({ img: care ? 'think' : 'happy', title: `清理 ${jSize().toFixed(1)} GB？`, p: '都会移进废纸篓，30 天内随时能放回来。',
    list: gs.slice(0, 5).map(([g, it]) => `<li>${g.t}<span class="r${g.g === 'care' ? ' w' : ''}">${gb(it.reduce((a, x) => a + x[1], 0))}${g.g === 'care' ? ' · 谨慎' : ''}</span></li>`).join(''), ok: '移进废纸篓', act: 'jGo' });
};
ACTS.jGo = async () => {
  const freed = jSize(), snap = new Set(jsel);
  const gs = JUNK.filter((g, gi) => g.items.some((_, ii) => jsel.has(`${gi}-${ii}`)));
  await opRun({ title: '小獭在清理……', img: 'bath', steps: gs.map((g) => [g.t, gb(g.items.reduce((a, x) => a + x[1], 0))]) });
  closeDlg();
  S.lastFreed = freed; S.junk = Math.max(0, S.junk - freed); S.freed += freed; S.week += freed; S.pebbles += 1; S.safe = 0;
  S.jph = 'done'; rerender();
  if (pgPond) { pgPond.set({ murk: Math.min(0.85, (S.junk + freed) / 18) }, true); setTimeout(() => { pgPond.set({ murk: 0 }); pgPond.burst && pgPond.burst(24); }, 200); }
  await wait(900);
  moment({ img: 'clear', milestone: true, title: `释放了 ${freed.toFixed(1)} GB`, sub: `石头罐 +1，现在一共 ${S.pebbles} 颗。`, alt: '撤销清理', onAlt: () => {
    S.junk += freed; S.freed -= freed; S.week -= freed; S.pebbles -= 1; jsel = snap; S.jph = 'result'; rerender();
    moment({ img: 'ok', title: '都放回原处了', sub: `${freed.toFixed(1)} GB 文件已从废纸篓恢复。` });
  } });
};

/* ══ 清理 · 大文件 ═══════════════════════════════════ */
const LARGE = [
  ['Windows 11 ARM.pvm', '~/Parallels', 24.6, '虚拟机', '8月2日', 'vm'], ['Docker.raw', '~/Library/Containers/com.docker', 12.8, '其他', '今天', 'pkg'],
  ['婚礼素材 · 机位 A.mov', '~/Movies/2026-10', 8.4, '视频', '10月12日', 'video'], ['Xcode_17.1.xip', '~/Downloads', 7.9, '安装包', '9月30日', 'pkg'],
  ['旧手机照片.zip', '~/Documents/归档', 5.2, '压缩包', '7月18日', 'zip'], ['发布会录屏.mp4', '~/Desktop', 3.6, '视频', '11月1日', 'video'],
  ['场景 v3.blend', '~/Projects/3D', 2.4, '其他', '10月20日', 'file'], ['node_modules 备份.tar', '~/Archive', 1.9, '压缩包', '6月9日', 'zip'],
];
let lsel = new Set();
PG['clean:large'] = () => {
  const types = ['全部', '视频', '安装包', '压缩包', '虚拟机', '其他'];
  const L = LARGE.map((x, i) => [x, i]).filter(([x]) => S.lfType === '全部' || x[3] === S.lfType);
  const max = Math.max(...LARGE.map((x) => x[2]));
  const sz = [...lsel].reduce((a, i) => a + LARGE[i][2], 0);
  return `<section class="cardp full" style="padding-top:12px"><div class="tb"><div class="chips">${types.map((t) => `<span class="chip${S.lfType === t ? ' on' : ''}" data-act="lfType" data-arg="${t}">${t}</span>`).join('')}</div><span class="sp"></span>
      <span class="chip" data-act="flashMsg" data-arg="门槛已调为 ≥ 500 MB">≥ 1 GB ▾</span><span class="chip" data-act="flashMsg" data-arg="已把外置磁盘「T7」也算进来">包含外置磁盘</span><div class="srch">${I('search')}<input placeholder="搜文件名"></div></div>
      <div class="th"><span style="width:20px"></span><span style="flex:1">文件</span><span style="width:150px">大小</span><span style="width:80px">修改日期</span><span style="width:60px"></span></div>
      ${L.map(([x, i]) => R({ cls: lsel.has(i) ? 'sel' : '', pre: chk(lsel.has(i), 'lSel', i), b: x[5], c: 'var(--calm)', t: x[0], s: x[1], right: `<span style="width:150px;display:flex;align-items:center;gap:8px"><span class="szb" style="--c:${x[2] > 10 ? 'var(--busy)' : 'var(--calm)'}"><i style="width:${(x[2] / max) * 100}%"></i></span><b class="num" style="font-size:12.5px">${gb(x[2])}</b></span><span class="muted" style="width:80px">${x[4]}</span><span class="ha" style="width:60px">${ib('eye', 'qlook', i, '快速查看 空格')}${ib('folder', 'flashMsg', '已在访达中显示', '在访达中显示')}</span>` })).join('')}
      ${lsel.size ? `<div class="batch"><b>已选 ${lsel.size} 个</b><span class="muted num">${gb(sz)}</span><span class="sp"></span><button class="ghost" data-act="lNone">取消选择</button><button class="slab" data-act="lTrash">移到废纸篓</button></div>` : `<div class="batch"><span class="muted">8 个文件超过 1 GB，合计 66.8 GB · 勾选后可以一起处理</span></div>`}</section>`;
};
ACTS.lfType = (t) => { S.lfType = t; rerender(); };
ACTS.lSel = (i) => { i = +i; lsel.has(i) ? lsel.delete(i) : lsel.add(i); rerender(); };
ACTS.lNone = () => { lsel.clear(); rerender(); };
ACTS.qlook = (i) => {
  const x = LARGE[i];
  openDlg(`<div class="pv" style="background:linear-gradient(135deg,#1c2a3a,#0b0a14)"><div style="text-align:center">${I(x[5]).replace('class="i"', 'class="i" style="width:72px;height:72px;stroke-width:1.2;color:#5FC9E8"')}<div style="margin-top:12px;font-weight:700">${x[0]}</div><div style="font-size:12px;color:#A09BB4">${x[3]} · ${gb(x[2])}</div></div></div>
    <div style="display:flex;align-items:center;gap:10px;padding:12px 16px"><div style="flex:1;min-width:0"><b>${x[0]}</b><div class="muted" style="font-family:var(--mono);font-size:11.5px">${x[1]}/${x[0]} · 修改于 ${x[4]}</div></div>
    <button class="ghost" data-act="flashMsg" data-arg="已在访达中显示">在访达中显示</button><button class="slab" data-act="lOne" data-arg="${i}">移到废纸篓</button><button class="ghost" data-act="close">关闭</button></div>`, 'qlook');
};
ACTS.lOne = (i) => { lsel = new Set([+i]); ACTS.lTrash(); };
ACTS.lTrash = () => {
  const L = [...lsel].map((i) => LARGE[i]), sz = L.reduce((a, x) => a + x[2], 0);
  ask({ img: 'think', title: `把 ${L.length} 个文件移到废纸篓？`, p: `一共 ${gb(sz)}，30 天内可以放回来。`, list: L.slice(0, 4).map((x) => `<li>${x[0]}<span class="r">${gb(x[2])}</span></li>`).join(''), ok: '移到废纸篓', act: 'lGo' });
};
ACTS.lGo = async () => {
  const idx = [...lsel].sort((a, b) => b - a), gone = idx.map((i) => [i, LARGE[i]]), sz = gone.reduce((a, [, x]) => a + x[2], 0);
  await opRun({ title: '正在移到废纸篓……', img: 'focus', steps: gone.map(([, x]) => [x[0], gb(x[2])]) });
  idx.forEach((i) => LARGE.splice(i, 1)); lsel.clear(); S.pebbles++; rerender();
  moment({ img: 'happy', milestone: true, title: `腾出了 ${gb(sz)}`, sub: '都在废纸篓里，石头罐 +1。', alt: '撤销', onAlt: () => { gone.reverse().forEach(([i, x]) => LARGE.splice(i, 0, x)); S.pebbles--; rerender(); moment({ img: 'ok', title: '已放回原处', sub: `${gone.length} 个文件回到了原来的位置。` }); } });
};

/* ══ 清理 · 重复文件 ═════════════════════════════════ */
const DUP = [
  { n: '产品发布会.key', sz: 0.86, b: 'file', f: [['~/Documents/Keynote', '11月1日 21:40'], ['~/Downloads', '11月1日 18:02']] },
  { n: 'design-system.fig', sz: 0.34, b: 'file', f: [['~/Design', '10月28日'], ['~/Desktop/旧东西', '9月3日'], ['~/Downloads', '9月3日']] },
  { n: 'IMG_2041.HEIC', sz: 0.012, b: 'image', f: [['~/Pictures/导出', '今天 09:12'], ['~/Desktop', '10月2日']] },
  { n: '合同扫描件.pdf', sz: 0.006, b: 'file', f: [['~/Documents/合同', '8月14日'], ['~/Downloads', '8月14日']] },
];
let dsel = new Set();
function dSmart() { dsel = new Set(); DUP.forEach((g, gi) => g.f.forEach((_, fi) => fi > 0 && dsel.add(`${gi}-${fi}`))); }
dSmart();
PG['clean:dup'] = () => {
  const sz = [...dsel].reduce((a, k) => a + DUP[k.split('-')[0]].sz, 0);
  const files = DUP.reduce((a, g) => a + g.f.length, 0);
  return `<section class="full statrow">${[['重复组', DUP.length, '组'], ['重复文件', files, '个'], ['可以腾出', gb(DUP.reduce((a, g) => a + g.sz * (g.f.length - 1), 0)), ''], ['扫描范围', '文稿 · 下载 · 桌面 · 图片', '']].map(([k, v, u]) => `<div class="stat cardp"><div class="k">${k}</div><div class="v num" style="${String(v).length > 8 ? 'font-size:14px;margin-top:6px' : ''}">${v}<small>${u}</small></div></div>`).join('')}</section>
    <section class="cardp full"><div class="ch"><h3>按内容比对，名字不同也能找到</h3><span>每组默认保留最新的一份</span><span class="sp"></span><span class="chip on" data-act="dSmart">智能选择：保留最新</span></div>
      ${DUP.map((g, gi) => R({ cls: 'grp open', b: g.b, c: 'var(--calm)', t: g.n, tag: tag(`${g.f.length} 份`, 'calm'), s: `每份 ${gb(g.sz)}`, right: `<span class="v num">${gb(g.sz * g.f.length)}</span>` })
        + g.f.map(([p, d], fi) => R({ cls: 'sub' + (dsel.has(`${gi}-${fi}`) ? ' sel' : ''), pre: chk(dsel.has(`${gi}-${fi}`), 'dSel', `${gi}-${fi}`), t: `<span style="font-family:var(--mono);font-size:12px;font-weight:500">${p}/${g.n}</span>`, tag: dsel.has(`${gi}-${fi}`) ? '' : tag('保留', 'ok'), right: `<span class="muted">${d}</span><span class="ha">${ib('eye', 'flashMsg', '空格键快速查看', '快速查看')}</span>` })).join('')).join('')}
      <div class="batch"><b>已选 ${dsel.size} 份</b><span class="muted num">${gb(sz)}</span><span class="sp"></span>${DUP.some((g, gi) => g.f.every((_, fi) => dsel.has(`${gi}-${fi}`))) ? `<span class="tag alarm">有一组全选了，至少保留一份</span>` : ''}<button class="slab" data-act="dGo" ${dsel.size ? '' : 'disabled'}>移到废纸篓</button></div></section>`;
};
ACTS.dSmart = () => { dSmart(); rerender(); flash('已按「每组保留最新」重新选择'); };
ACTS.dSel = (k) => { dsel.has(k) ? dsel.delete(k) : dsel.add(k); rerender(); };
ACTS.dGo = () => {
  if (DUP.some((g, gi) => g.f.every((_, fi) => dsel.has(`${gi}-${fi}`)))) return flash('每组至少要保留一份');
  ask({ img: 'think', title: `把 ${dsel.size} 份副本移到废纸篓？`, p: '每组都保留了一份，30 天内可以放回来。', ok: '移到废纸篓', act: 'dRun' });
};
ACTS.dRun = async () => {
  const n = dsel.size, sz = [...dsel].reduce((a, k) => a + DUP[k.split('-')[0]].sz, 0), snap = JSON.parse(JSON.stringify(DUP));
  await opRun({ title: '正在移走副本……', steps: DUP.filter((g, gi) => g.f.some((_, fi) => dsel.has(`${gi}-${fi}`))).map((g) => [g.n, '']) });
  DUP.forEach((g, gi) => (g.f = g.f.filter((_, fi) => !dsel.has(`${gi}-${fi}`))));
  for (let i = DUP.length - 1; i >= 0; i--) if (DUP[i].f.length < 2) DUP.splice(i, 1);
  dsel.clear();
  S.pst = DUP.length ? 'normal' : 'empty'; rerender(); syncConsole();
  moment({ img: 'happy', title: `移走了 ${n} 份副本`, sub: `腾出 ${gb(sz)}，每组都留下了最新的一份。`, alt: '撤销', onAlt: () => { DUP.splice(0, DUP.length, ...snap); dSmart(); S.pst = 'normal'; rerender(); syncConsole(); moment({ img: 'ok', title: '已放回原处', sub: `${n} 份副本回来了。` }); } });
};

/* ══ 清理 · 应用卸载 ═════════════════════════════════ */
const APPS = [
  ['Xcode', '#1C7CF4', 12.4, 'App Store', '昨天', '17.1'], ['Final Cut Pro', '#3A3A3C', 4.1, 'App Store', '10月12日', '11.0'], ['Docker', '#1D63ED', 2.2, 'Homebrew', '3 天前', '4.36'],
  ['微信', '#07C160', 1.6, 'App Store', '今天', '4.1'], ['Parallels Desktop', '#D52B1E', 1.1, '官网', '8月2日', '20.1'], ['Figma', '#A259FF', 0.62, '官网', '今天', '126.3'],
  ['Slack', '#4A154B', 0.48, '官网', '今天', '4.41'], ['Notion', '#2F2F2F', 0.39, '官网', '今天', '4.2'], ['Kindle', '#232F3E', 0.21, 'App Store', '5月1日', '7.4'], ['Safari', '#1E90FF', 0.02, '系统', '今天', '26.1', 1],
];
const LEFT = [['Sketch', '#F7B500', '~/Library/Application Support/com.bohemiancoding.sketch3', 0.84, '高'], ['Adobe Creative Cloud', '#DA1F26', '~/Library/Caches/Adobe', 1.2, '中'], ['Spotify', '#1DB954', '~/Library/Caches/com.spotify.client', 0.56, '高'], ['Zoom', '#2D8CFF', '~/Library/Preferences/us.zoom.xos.plist', 0.001, '低']];
const UNHIST = [['Sketch', '#F7B500', '10月30日', '1.4 GB', '含支持文件'], ['Zoom', '#2D8CFF', '9月12日', '310 MB', '只删了应用'], ['Skype', '#00AFF0', '6月3日', '520 MB', '含支持文件']];
let leftSel = new Set([0, 2]);
PG['clean:apps'] = () => {
  const tab = S.appTab;
  const tb = `<div class="tb"><div class="mini-seg">${[['inst', `已安装 ${APPS.length}`], ['left', `残留 ${LEFT.length}`], ['hist', '卸载历史']].map(([k, t]) => `<button class="${tab === k ? 'on' : ''}" data-act="appTab" data-arg="${k}">${t}</button>`).join('')}</div><span class="sp"></span>`;
  if (tab === 'left') return `<section class="cardp full" style="padding-top:12px">${tb}<span class="muted">应用删了，这些还留在硬盘里</span></div>
      ${LEFT.map((x, i) => R({ cls: leftSel.has(i) ? 'sel' : '', pre: chk(leftSel.has(i), 'leftSel', i), ap: x[0][0], c: x[1], t: x[0], tag: tag(`把握${x[4]}`, x[4] === '高' ? 'ok' : x[4] === '中' ? 'calm' : 'busy'), s: `<span style="font-family:var(--mono)">${x[2]}</span>`, right: `<span class="v num">${gb(x[3])}</span><span class="ha">${ib('folder', 'flashMsg', '已在访达中显示', '在访达中显示')}</span>` })).join('')}
      <div class="batch"><b>已选 ${leftSel.size} 项</b><span class="muted num">${gb([...leftSel].reduce((a, i) => a + LEFT[i][3], 0))}</span><span class="sp"></span><button class="slab" data-act="leftGo" ${leftSel.size ? '' : 'disabled'}>清理残留</button></div></section>`;
  if (tab === 'hist') return `<section class="cardp full" style="padding-top:12px">${tb}<span class="muted">最近 90 天</span></div>${UNHIST.map((x) => R({ ap: x[0][0], c: x[1], t: x[0], s: `${x[2]} · ${x[4]}`, right: `<span class="v num">${x[3]}</span>` })).join('')}</section>`;
  const srt = { size: (a, b) => b[2] - a[2], name: (a, b) => a[0].localeCompare(b[0], 'zh'), recent: (a, b) => (a[4] === '今天' ? -1 : b[4] === '今天' ? 1 : 0) }[S.appSort];
  const L = APPS.map((x, i) => [x, i]).filter(([x]) => S.appSrc === '全部' || x[3] === S.appSrc).sort((a, b) => srt(a[0], b[0]));
  return `<section class="cardp full" style="padding-top:12px">${tb}<div class="chips">${['全部', 'App Store', '官网', 'Homebrew'].map((t) => `<span class="chip${S.appSrc === t ? ' on' : ''}" data-act="appSrc" data-arg="${t}">${t}</span>`).join('')}</div>
      <div class="mini-seg">${[['size', '大小'], ['name', '名称'], ['recent', '最近使用']].map(([k, t]) => `<button class="${S.appSort === k ? 'on' : ''}" data-act="appSort" data-arg="${k}">${t}</button>`).join('')}</div><div class="srch">${I('search')}<input placeholder="搜应用"></div></div>
      ${L.map(([x, i]) => R({ ap: x[0][0], c: x[1], t: x[0], tag: x[6] ? tag(`${I('lock').replace('class="i"', 'class="i" style="width:10px;height:10px"')}系统`, '') : tag(x[3], x[3] === 'App Store' ? 'calm' : ''), s: `版本 ${x[5]} · 最近使用 ${x[4]}`, right: `<span class="v num">${gb(x[2])}</span>${x[6] ? `<button class="ghost" disabled style="opacity:.4" data-tip="系统应用不能卸载">卸载</button>` : `<button class="ghost" data-act="unAsk" data-arg="${i}">卸载</button>`}` })).join('')}</section>`;
};
ACTS.appTab = (k) => { S.appTab = k; rerender(); };
ACTS.appSort = (k) => { S.appSort = k; rerender(); };
ACTS.appSrc = (k) => { S.appSrc = k; rerender(); };
ACTS.leftSel = (i) => { i = +i; leftSel.has(i) ? leftSel.delete(i) : leftSel.add(i); rerender(); };
let unSupport = true;
ACTS.unAsk = (i) => {
  const x = APPS[i], id = x[0].toLowerCase().replace(/\s/g, '');
  const paths = [[`/Applications/${x[0]}.app`, x[2] * 0.7], [`~/Library/Application Support/${x[0]}`, x[2] * 0.18], [`~/Library/Caches/com.${id}`, x[2] * 0.1], [`~/Library/Preferences/com.${id}.plist`, 0.0001]];
  unSupport = true;
  openDlg(`<div style="display:flex;justify-content:center"><span class="b ap" style="--c:${x[1]};width:72px;height:72px;border-radius:18px;display:grid;place-items:center;background:${x[1]};color:#fff;font-size:30px;font-weight:800">${x[0][0]}</span></div>
    <h3>卸载「${x[0]}」？</h3><p>应用和下面这些文件会一起移进废纸篓，可以放回来。</p>
    <ul>${paths.map(([p, s], k) => `<li class="${k ? 'sp-row' : ''}"><span style="font-family:var(--mono);font-size:11.5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1">${p}</span><span class="r num">${gb(s)}</span></li>`).join('')}
    <li><span class="chk on" data-act="unSup"></span>同时清理支持文件<span class="r">推荐</span></li></ul>
    <div class="btns"><button class="slab block" data-act="unGo" data-arg="${i}">卸载 · ${gb(x[2])}</button><button class="ghost block" data-act="close">取消</button></div>`, 'ask');
};
ACTS.unSup = (a, el) => { unSupport = !unSupport; el.classList.toggle('on', unSupport); $$('.sp-row', el.closest('ul')).forEach((r, k) => k && (r.style.opacity = unSupport ? 1 : 0.35)); };
ACTS.unGo = async (i) => {
  const x = APPS[i];
  await opRun({ title: `正在卸载「${x[0]}」……`, img: 'focus', steps: [['退出应用', ''], ['移走应用本体', gb(x[2] * 0.7)], ...(unSupport ? [['清理支持文件与缓存', gb(x[2] * 0.3)]] : [])] });
  APPS.splice(i, 1); UNHIST.unshift([x[0], x[1], '刚刚', gb(x[2]), unSupport ? '含支持文件' : '只删了应用']); rerender();
  moment({ img: 'ok', title: `「${x[0]}」已卸载`, sub: `腾出 ${gb(unSupport ? x[2] : x[2] * 0.7)}，都在废纸篓里。`, alt: '撤销', onAlt: () => { APPS.splice(i, 0, x); UNHIST.shift(); rerender(); moment({ img: 'ok', title: `「${x[0]}」回来了`, sub: '应用和设置都恢复到了原来的位置。' }); } });
};
ACTS.leftGo = async () => {
  const L = [...leftSel].sort((a, b) => b - a).map((i) => [i, LEFT[i]]);
  await opRun({ title: '正在清理残留……', steps: L.map(([, x]) => [x[0], gb(x[3])]) });
  L.forEach(([i]) => LEFT.splice(i, 1)); leftSel.clear(); rerender();
  moment({ img: 'happy', title: `清掉了 ${L.length} 个应用的残留`, sub: `腾出 ${gb(L.reduce((a, [, x]) => a + x[3], 0))}。`, alt: '撤销', onAlt: () => { L.reverse().forEach(([i, x]) => LEFT.splice(i, 0, x)); rerender(); moment({ img: 'ok', title: '已放回原处', sub: '' }); } });
};

/* ══ 加速 · 内存 ═════════════════════════════════════ */
const APPMEM = [['Xcode', 3.1, '#1C7CF4'], ['Google Chrome', 2.4, '#E8B04B'], ['Figma', 1.3, '#A259FF'], ['Slack', 0.9, '#4A154B'], ['微信', 0.7, '#07C160'], ['Docker', 0.6, '#1D63ED'], ['Notion', 0.4, '#2F2F2F'], ['访达', 0.2, '#5FC9E8']];
PG['boost:mem'] = () => {
  const p = memPct(), tone = `var(--${S.memTone})`;
  const st = [['App 内存', (S.mem * 0.62).toFixed(1)], ['联动内存', (S.mem * 0.18).toFixed(1)], ['已压缩', (S.mem * 0.2).toFixed(1)], ['缓存文件', '3.4'], ['交换', S.memTone === 'calm' ? '0.0' : '1.8'], ['可用', (16 - S.mem).toFixed(1)]];
  return `<section class="cardp c4" style="display:flex;flex-direction:column;align-items:center;padding:18px 16px 16px;gap:10px">
      ${ringG(p, 168, tone, `<div><div class="big num" id="memNum">${S.mem.toFixed(1)}<small>/ 16 GB</small></div><div class="muted" style="color:${tone};font-weight:700">内存压力 · ${memWord[S.memTone]}</div></div>`, 14)}
      <button class="slab block" data-act="memFree" id="memBtn" style="width:100%">立即释放 · 约 1.6 GB</button><div class="muted" style="font-size:11.5px;text-align:center">只清理不活跃的缓存，不会关掉任何应用</div></section>
    <section class="cardp c8"><div class="ch"><h3>最近 1 分钟</h3><span>每 1.6 秒采样</span><span class="sp"></span><span class="legend2"><span><i style="background:${tone}"></i>内存占用</span></span></div>
      <div class="bd">${chartSvg(SER.mem, tone, 100, 110, 'memChart')}<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(84px,1fr));gap:8px;margin-top:10px">${st.map(([k, v]) => `<div class="stat" style="padding:8px 10px"><div class="k" style="white-space:nowrap">${k}</div><div class="v num" style="font-size:16px">${v}<small>GB</small></div></div>`).join('')}</div></div></section>
    <section class="cardp full"><div class="ch"><h3>谁占得最多</h3><span>前 ${APPMEM.length} 个应用</span></div>
      ${APPMEM.map(([n, g, c], i) => R({ ap: n[0], c, t: n, s: i === 0 && S.memTone !== 'calm' ? '正在编译 · 占用还在涨' : '', right: `<span class="szb" style="width:200px;--c:${c}"><i style="width:${(g / 3.1) * 100}%"></i></span><span class="v num" style="width:60px;text-align:right">${gb(g)}</span><span class="ha"><button class="ghost" data-act="endAsk" data-arg="${n}">结束</button></span>` })).join('')}</section>`;
};
ACTS.memFree = async (a, el) => {
  el.classList.add('caring'); el.innerHTML = '<span class="spin"></span>正在释放……';
  await wait(1400);
  const from = memPct();
  S.mem = Math.max(4, S.mem - 1.6);
  if (S.mem < 12) S.memTone = 'calm';
  rerender();
  const c = $('#page .rgv'), C = +c.dataset.c;
  gsap.fromTo(c, { strokeDashoffset: C * (1 - from / 100) }, { strokeDashoffset: C * (1 - memPct() / 100), duration: D(1), ease: 'power3.out' });
  moment({ img: 'relief', milestone: true, title: '释放了 1.6 GB 内存', sub: `现在 ${S.mem.toFixed(1)} / 16 GB，内存压力「${memWord[S.memTone]}」。` });
};
ACTS.endAsk = (n) => ask({ img: 'think', title: `结束「${n}」？`, p: '会关掉它所有的窗口，没保存的内容可能会丢。', ok: '结束', act: 'endGo', arg: n, alt: `<button class="slab block danger" data-act="endGo" data-arg="${n}|force">强制结束（不保存）</button>` });
ACTS.endGo = (a) => {
  const [n, force] = a.split('|'), i = APPMEM.findIndex((x) => x[0] === n), g = i >= 0 ? APPMEM[i][1] : 0;
  if (i >= 0) APPMEM.splice(i, 1);
  const pi = PROC.findIndex((x) => x[0].startsWith(n));
  if (pi >= 0) PROC.splice(pi, 1);
  S.mem = Math.max(4, S.mem - g);
  rerender();
  moment({ img: 'ok', title: `已${force ? '强制' : ''}结束「${n}」`, sub: g ? `释放了 ${gb(g)} 内存。` : '' });
};

/* ══ 加速 · 进程 ═════════════════════════════════════ */
const PROC = [
  ['Xcode', 4120, 38.2, 3.1, 'shaw'], ['Google Chrome Helper (Renderer)', 5821, 12.4, 1.2, 'shaw'], ['WindowServer', 312, 9.8, 0.6, '_windowserver'], ['Figma', 2231, 6.1, 1.3, 'shaw'],
  ['kernel_task', 0, 5.2, 1.4, 'root'], ['Slack Helper', 3301, 2.2, 0.5, 'shaw'], ['mds_stores', 418, 1.8, 0.2, 'root'], ['微信', 2780, 1.1, 0.7, 'shaw'],
  ['Docker', 1902, 0.9, 0.6, 'shaw'], ['水獭工具', 6011, 0.6, 0.15, 'shaw'], ['Spotlight', 401, 0.4, 0.1, 'shaw'], ['访达', 512, 0.2, 0.2, 'shaw'],
];
function procRows() {
  const q = S.procQ.trim().toLowerCase();
  const L = PROC.filter((x) => (!q || x[0].toLowerCase().includes(q)) && (S.procWho === '全部' || (S.procWho === '我的' ? x[4] === 'shaw' : x[4] !== 'shaw')))
    .sort({ cpu: (a, b) => b[2] - a[2], mem: (a, b) => b[3] - a[3], name: (a, b) => a[0].localeCompare(b[0]) }[S.procSort]);
  if (!L.length) return emptyB('think', `没找到「${S.procQ}」`, '这个名字下没有正在运行的进程。检查一下拼写，或切到「全部」。', '<button class="ghost lg" data-act="procClear">清除搜索</button>');
  return L.map((x) => { const sys = x[4] !== 'shaw'; const hot = x[2] > 30;
    return `<div class="row"><span style="flex:1;min-width:0;display:flex;align-items:center;gap:8px"><b style="font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${x[0]}</b>${sys ? tag('系统') : ''}${hot ? tag('很忙', 'busy') : ''}</span>
      <span class="num muted" style="width:60px">${x[1]}</span><span class="num" style="width:110px;display:flex;align-items:center;gap:6px"><span class="szb" style="width:50px;--c:${hot ? 'var(--busy)' : 'var(--calm)'}"><i style="width:${Math.min(100, x[2] * 2)}%"></i></span>${x[2].toFixed(1)}%</span>
      <span class="num" style="width:70px">${gb(x[3])}</span><span class="muted" style="width:100px;font-size:12px">${x[4]}</span><span class="ha" style="width:56px">${sys ? `<span class="ibs" style="opacity:.35" data-tip="系统进程不能结束">${I('lock')}</span>` : `<button class="ghost" data-act="endAsk" data-arg="${x[0]}">结束</button>`}</span></div>`; }).join('');
}
PG['boost:proc'] = () => `<section class="cardp full" style="padding-top:12px"><div class="tb"><div class="srch">${I('search')}<input data-in="procQ" placeholder="搜进程名，比如 Chrome" value="${S.procQ}"></div>
    <div class="chips">${['全部', '我的', '系统'].map((t) => `<span class="chip${S.procWho === t ? ' on' : ''}" data-act="procWho" data-arg="${t}">${t}</span>`).join('')}</div><span class="sp"></span>
    <span class="muted">排序</span><div class="mini-seg">${[['cpu', 'CPU'], ['mem', '内存'], ['name', '名称']].map(([k, t]) => `<button class="${S.procSort === k ? 'on' : ''}" data-act="procSort" data-arg="${k}">${t}</button>`).join('')}</div></div>
    <div class="th"><span style="flex:1">进程 · ${PROC.length} 个</span><span style="width:60px">PID</span><span style="width:110px">CPU</span><span style="width:70px">内存</span><span style="width:100px">用户</span><span style="width:56px"></span></div>
    <div id="procList">${procRows()}</div></section>`;
ACTS.procSort = (k) => { S.procSort = k; rerender(); };
ACTS.procWho = (k) => { S.procWho = k; rerender(); };
ACTS.procClear = () => { S.procQ = ''; rerender(); };
win.addEventListener('input', (e) => {
  const k = e.target.dataset && e.target.dataset.in;
  if (k === 'procQ') { S.procQ = e.target.value; $('#procList').innerHTML = procRows(); }
  if (k === 'pal') palFilter(e.target.value);
});

/* ══ 加速 · 启动项 ═══════════════════════════════════ */
const STARTUP = [
  { a: 'Docker', c: '#1D63ED', items: ['com.docker.helper（后台）', 'com.docker.vmnetd（后台）'], on: true, im: '高' },
  { a: 'Adobe Creative Cloud', c: '#DA1F26', items: ['Adobe Updater', 'Core Sync', 'CCXProcess'], on: true, im: '高' },
  { a: 'Google', c: '#E8B04B', items: ['GoogleUpdater', 'Keystone'], on: true, im: '中' },
  { a: 'Slack', c: '#4A154B', items: ['登录时打开'], on: true, im: '中' },
  { a: '微信', c: '#07C160', items: ['登录时打开'], on: true, im: '低' },
  { a: 'Spotify', c: '#1DB954', items: ['登录时打开'], on: false, im: '低' },
  { a: '水獭工具', c: '#FF8A3D', items: ['登录时打开 · 菜单栏常驻'], on: true, im: '低', self: 1 },
];
let sopen = new Set();
PG['boost:start'] = () => {
  const on = STARTUP.filter((s) => s.on), slow = on.reduce((a, s) => a + { 高: 2, 中: 1, 低: 0.3 }[s.im], 0);
  return `<section class="cardp full banner" style="--t:${slow > 4 ? 'var(--busy)' : 'var(--ok)'};border-radius:var(--r-md)"><img src="${ex(slow > 4 ? 'sleepy' : 'happy')}" alt=""><div><b>${on.length} 个应用跟着开机一起启动，开机约慢 ${Math.round(slow)} 秒</b><span>关掉不常用的，下次开机就生效；随时可以再打开。</span></div><span class="sp"></span>${slow > 4 ? '<button class="ghost" data-act="startHigh">关掉影响大的</button>' : ''}</section>
    <section class="cardp full"><div class="ch"><h3>启动项</h3><span>按影响排序</span><span class="sp"></span><a data-act="flashMsg" data-arg="已打开「系统设置 › 通用 › 登录项」">在系统设置中查看</a></div>
      ${STARTUP.map((s, i) => R({ cls: 'grp' + (sopen.has(i) ? ' open' : ''), attrs: `data-act="sOpen" data-arg="${i}"`, pre: `<span class="car">${I('chev')}</span>`, ap: s.a[0], c: s.c, t: s.a, tag: tag(`影响${s.im}`, s.im === '高' ? 'busy' : s.im === '中' ? 'calm' : '') + (s.self ? tag('就是我', 'acc') : ''), s: `${s.items.length} 项 · ${s.on ? '开机时启动' : '已停用'}`, right: sw(s.on, 'sTog', i) })
        + (sopen.has(i) ? s.items.map((t) => R({ cls: 'sub', t: `<span style="font-weight:500;font-size:12.5px">${t}</span>`, right: `<span class="muted">${t.includes('后台') ? '/Library/LaunchDaemons' : '~/Library/LaunchAgents'}</span>` })).join('') : '')).join('')}</section>`;
};
ACTS.sOpen = (i, el, e) => { if (e.target.closest('.sw')) return; i = +i; sopen.has(i) ? sopen.delete(i) : sopen.add(i); rerender(); };
ACTS.sTog = (i) => {
  const s = STARTUP[i]; s.on = !s.on; rerender();
  const msg = s.self && !s.on ? '水獭工具不会开机启动了 · 菜单栏小獭要手动打开' : `已${s.on ? '启用' : '停用'}「${s.a}」的 ${s.items.length} 个启动项 · 下次开机生效`;
  flash(msg, () => { s.on = !s.on; rerender(); flash(`已恢复「${s.a}」`); });
};
ACTS.startHigh = () => {
  const L = STARTUP.filter((s) => s.on && s.im === '高');
  L.forEach((s) => (s.on = false)); rerender();
  flash(`已停用 ${L.map((s) => s.a).join('、')} · 下次开机约快 4 秒`, () => { L.forEach((s) => (s.on = true)); rerender(); flash('已恢复'); });
};

/* ══ 隐私 · 痕迹 ═════════════════════════════════════ */
const TRACE = [
  { a: 'Safari', c: '#1E90FF', items: [['浏览历史', '1,284 条', 0], ['缓存', '620 MB', 0], ['Cookie', '312 个', 1, '会退出所有网站的登录'], ['自动填充的表单', '48 条', 1, '下次要重新填']] },
  { a: 'Google Chrome', c: '#E8B04B', items: [['浏览历史', '3,402 条', 0], ['下载记录', '96 条', 0], ['Cookie', '540 个', 1, '会退出所有网站的登录'], ['保存的密码', '52 个', 1, '删掉就找不回来']] },
  { a: '微信', c: '#07C160', items: [['缓存图片与视频', '1.1 GB', 0], ['聊天里的文件', '3.4 GB', 1, '对方撤回后就找不到了']] },
  { a: '系统', c: '#8A94A6', items: [['最近使用的项目', '86 条', 0], ['终端历史', '2,031 条', 0], ['剪切板历史', '40 条', 0]] },
];
let tsel = new Set(), topen = new Set([0, 1]);
function tReset() { tsel = new Set(); TRACE.forEach((g, gi) => g.items.forEach((x, ii) => !x[2] && tsel.add(`${gi}-${ii}`))); }
tReset();
PG['privacy:trace'] = () => !TRACE.length ? `<section class="cardp full">${emptyB(...STATE_COPY['privacy:trace'].empty)}</section>` : `<section class="cardp full" style="padding:16px 18px;display:flex;align-items:center;gap:16px"><img src="${ex('think')}" style="width:64px;height:64px" alt="">
    <div style="flex:1"><b style="font-size:16px">找到 ${TRACE.reduce((a, g) => a + g.items.length, 0)} 类痕迹</b><div class="muted">「谨慎」那几项默认不选：清了会退出登录，或者删掉找不回来的东西。</div></div>
    <button class="slab danger" data-act="tAsk" ${tsel.size ? '' : 'disabled'}>清除选中的 ${tsel.size} 项</button></section>
  ${card('full', '按应用', '清除前会先退出对应的应用', TRACE.map((g, gi) => {
    const open = topen.has(gi), all = g.items.every((_, ii) => tsel.has(`${gi}-${ii}`)), some = g.items.some((_, ii) => tsel.has(`${gi}-${ii}`));
    return R({ cls: 'grp' + (open ? ' open' : ''), attrs: `data-act="tOpen" data-arg="${gi}"`, pre: `<span class="car">${I('chev')}</span>${chk(all || (some && 'mix'), 'tG', gi)}`, ap: g.a[0], c: g.c, t: g.a, s: `${g.items.length} 类 · 已选 ${g.items.filter((_, ii) => tsel.has(`${gi}-${ii}`)).length}` })
      + (open ? g.items.map((x, ii) => R({ cls: 'sub', pre: chk(tsel.has(`${gi}-${ii}`), 'tI', `${gi}-${ii}`), t: x[0], tag: x[2] ? tag('谨慎', 'busy') : '', s: x[3] || '', right: `<span class="v num" style="font-weight:500;color:var(--mid)">${x[1]}</span>` })).join('') : '');
  }).join(''))}`;
ACTS.tOpen = (gi, el, e) => { if (e.target.closest('.chk')) return; gi = +gi; topen.has(gi) ? topen.delete(gi) : topen.add(gi); rerender(); };
ACTS.tG = (gi) => { const g = TRACE[gi], all = g.items.every((_, ii) => tsel.has(`${gi}-${ii}`)); g.items.forEach((_, ii) => (all ? tsel.delete(`${gi}-${ii}`) : tsel.add(`${gi}-${ii}`))); rerender(); };
ACTS.tI = (k) => { tsel.has(k) ? tsel.delete(k) : tsel.add(k); rerender(); };
ACTS.tAsk = () => {
  const L = [...tsel].map((k) => { const [g, i] = k.split('-'); return [TRACE[g], TRACE[g].items[i]]; });
  const care = L.filter(([, x]) => x[2]);
  ask({ img: care.length ? 'scared' : 'think', title: `清除 ${L.length} 项痕迹？`, p: '痕迹清了就不能恢复。Safari 和 Chrome 会先被退出。', danger: true, ok: '清除（不能恢复）', act: 'tGo',
    list: (care.length ? care : L).slice(0, 4).map(([g, x]) => `<li>${g.a} · ${x[0]}<span class="r${x[2] ? ' w' : ''}">${x[2] ? x[3] : x[1]}</span></li>`).join('') });
};
ACTS.tGo = async () => {
  const n = tsel.size;
  await opRun({ title: '正在清除痕迹……', img: 'focus', steps: [...new Set([...tsel].map((k) => TRACE[k.split('-')[0]].a))].map((a) => [a, '']), note: '痕迹清除后不能恢复' });
  TRACE.forEach((g, gi) => (g.items = g.items.filter((_, ii) => !tsel.has(`${gi}-${ii}`))));
  for (let i = TRACE.length - 1; i >= 0; i--) if (!TRACE[i].items.length) TRACE.splice(i, 1);
  tsel.clear(); rerender();
  moment({ img: 'proud', title: `清掉了 ${n} 项痕迹`, sub: '浏览器已经可以重新打开了。' });
};

/* ══ 隐私 · 应用权限 ═════════════════════════════════ */
const PERM = [
  ['完全磁盘访问', 'disk', '#5FC9E8', [['水獭工具', '#FF8A3D', 1], ['终端', '#2F2F2F', 1], ['Docker', '#1D63ED', 1], ['Parallels Desktop', '#D52B1E', 0]]],
  ['辅助功能', 'hand', '#9B8BE8', [['水獭工具', '#FF8A3D', 1], ['Raycast', '#FF6363', 1], ['Rectangle', '#5A5A5A', 1]]],
  ['屏幕录制', 'screen', '#FF6B6B', [['腾讯会议', '#2D8CFF', 1], ['OBS', '#302E31', 1], ['Figma', '#A259FF', 0]]],
  ['摄像头', 'cam', '#6EE7A8', [['FaceTime', '#34C759', 1], ['腾讯会议', '#2D8CFF', 1], ['Zoom', '#2D8CFF', 0]]],
  ['麦克风', 'mic', '#E8B04B', [['腾讯会议', '#2D8CFF', 1], ['微信', '#07C160', 1], ['语音备忘录', '#FF3B30', 1]]],
  ['定位服务', 'loc', '#5FC9E8', [['天气', '#1E90FF', 1], ['地图', '#34C759', 1], ['微信', '#07C160', 0]]],
  ['自动化', 'robot', '#A09BB4', [['水獭工具 → 访达', '#FF8A3D', 1], ['Raycast → 系统事件', '#FF6363', 1]]],
];
PG['privacy:perm'] = () => {
  const c = PERM[S.permSel];
  return `<section class="cardp full banner" style="--t:var(--calm);border-radius:var(--r-md)"><img src="${ex('calm')}" alt=""><div><b>这里只能看，改权限要去系统设置</b><span>macOS 不允许其他应用替你开关权限，小獭帮你直接跳过去。</span></div></section>
    <section class="cardp c4"><div class="ch"><h3>权限类别</h3></div>${PERM.map((p, i) => R({ cls: i === S.permSel ? 'sel' : '', attrs: `data-act="permSel" data-arg="${i}" style="cursor:pointer"`, b: p[1], c: p[2], t: p[0], right: `<span class="muted num">${p[3].filter((x) => x[2]).length}</span>` })).join('')}</section>
    <section class="cardp c8"><div class="ch"><h3>${c[0]}</h3><span>${c[3].filter((x) => x[2]).length} 个应用已允许</span><span class="sp"></span><button class="ghost" data-act="flashMsg" data-arg="已打开「系统设置 › 隐私与安全性 › ${c[0]}」">在系统设置中打开</button></div>
      ${c[3].map(([n, col, on]) => R({ ap: n[0], c: col, t: n, tag: n.startsWith('水獭工具') ? tag('就是我', 'acc') : '', s: on ? '已允许' : '申请过，但没有允许', right: on ? tag(`${I('check').replace('class="i"', 'class="i" style="width:10px;height:10px"')}已允许`, 'ok') : tag('未允许') })).join('')}</section>`;
};
ACTS.permSel = (i) => { S.permSel = +i; rerender(); };

/* ══ 工具箱 · 快捷操作（生活向，与 App lib/pages/toolbox/quick_page.dart 同步） ══ */
Object.assign(P, {
  qr: '<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><path d="M14 14h2v2h-2zM18 14h2M14 18h2M18 18h2v2"/>',
  scan: '<path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M8 9h8M8 12h8M8 15h5"/>',
  crop: '<path d="M6 2v14a2 2 0 0 0 2 2h14M2 6h14a2 2 0 0 1 2 2v14"/>',
  wipe: '<path d="M14 4l6 6-9 9H5v-6z"/><path d="M11 7l6 6M4 21h16"/>',
  bed: '<path d="M3 18V7M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5"/><circle cx="7" cy="11" r="2"/>',
});
const QK = { awake: 0, awakeUntil: 0, sleepAt: 0, desk: 0, trash: [312, 4.6] };
const leftTxt = (t) => { const m = Math.max(1, Math.round((t - Date.now()) / 60000)); return m >= 60 ? `${Math.floor(m / 60)} 小时${m % 60 ? ` ${m % 60} 分钟` : ''}` : `${m} 分钟`; };
const QUICK = () => [
  { k: 'awake', ic: 'cup', c: '#E8B04B', t: '不让电脑睡', s: QK.awake ? (QK.awakeUntil ? `还会醒 ${leftTxt(QK.awakeUntil)}` : '一直醒着，直到你关掉') : '下载、看直播、开会时用', sw: QK.awake,
    foot: [[30, '30 分钟'], [60, '1 小时'], [120, '2 小时'], [0, '一直']].map(([m, l]) => `<span class="chip${QK.awake && m === 0 && !QK.awakeUntil ? ' on' : ''}" data-act="qAwake" data-arg="${m}">${l}</span>`) },
  { k: 'sleep', ic: 'bed', c: '#9B8BE8', t: '定时睡觉', s: QK.sleepAt ? `${leftTxt(QK.sleepAt)}后睡觉` : '听歌、看剧睡着了，到点自己睡', btn: QK.sleepAt ? '取消' : '',
    foot: [[15, '15 分钟'], [30, '30 分钟'], [60, '1 小时'], [90, '1.5 小时']].map(([m, l]) => `<span class="chip" data-act="qSleep" data-arg="${m}">${l}</span>`) },
  { k: 'wifi', ic: 'qr', c: '#5FC9E8', t: 'Wi‑Fi 给客人', s: '「Otter‑Home‑5G」· 手机扫一下就连上', btn: '生成', hint: '不用再念一遍密码' },
  { k: 'ocr', ic: 'scan', c: '#FF8A3D', t: '截图识字', s: '框一块屏幕，把字认出来', btn: '框选', hint: '不让复制的网页、图片里的号码都行' },
  { k: 'shot', ic: 'crop', c: '#FFAA5A', t: '截图到剪切板', s: '拖一块区域，不存文件', btn: '截图', hint: '也可以按 ⌃⇧⌘4' },
  { k: 'wipe', ic: 'wipe', c: '#8A94A6', t: '擦屏幕', s: '屏幕变全黑，擦起来看得清灰', btn: '开始', hint: '按 Esc 退出，期间按键不起作用' },
  { k: 'desk', ic: 'desk', c: '#6EA8FF', t: '收起桌面图标', s: '录屏、投屏、开会前让桌面干净', sw: QK.desk, hint: '文件还在，只是看不见' },
  { k: 'dns', ic: 'dns', c: '#6EE7A8', t: '网页打不开？', s: '刷新 DNS 缓存，换了网络后常有用', btn: '刷新', hint: '不会断网，也不会删东西' },
  { k: 'trash', ic: 'trash', c: '#FF6B6B', t: '清空废纸篓', s: QK.trash[0] ? `${QK.trash[0]} 个项目 · ${QK.trash[1]} GB` : '废纸篓是空的', btn: '清空', danger: 1, hint: '会先问你一次' },
];
PG['toolbox:quick'] = () => QUICK().map((q) => `<section class="cardp c4" style="padding:16px;display:flex;flex-direction:column;gap:10px">
    <div style="display:flex;align-items:center;gap:10px"><span class="b" style="width:40px;height:40px;border-radius:12px;display:grid;place-items:center;background:color-mix(in srgb,${q.c} 15%,transparent);color:${q.c}">${I(q.ic)}</span><span class="sp" style="flex:1"></span>${q.sw !== undefined ? sw(q.sw, 'qTog', q.k) : q.btn ? `<button class="ghost" data-act="qDo" data-arg="${q.k}"${q.danger ? ' style="color:var(--alarm)"' : ''}${q.k === 'trash' && !QK.trash[0] ? ' disabled' : ''}>${q.btn}</button>` : ''}</div>
    <div><b style="font-size:14px">${q.t}</b><div class="muted" style="font-size:12px">${q.s}</div></div>
    ${q.foot ? `<div class="chips">${q.foot.join('')}</div>` : `<div class="muted" style="font-size:11.5px;opacity:.8">${q.hint}</div>`}</section>`).join('') +
  `<div class="full muted" style="text-align:center;font-size:12px;padding-top:4px">显示隐藏文件、锁屏这类开关在 ⌘K 里搜得到</div>`;
ACTS.qAwake = (m) => {
  m = +m; QK.awake = 1; QK.awakeUntil = m ? Date.now() + m * 60000 : 0; rerender();
  flash(m ? `接下来 ${leftTxt(QK.awakeUntil)}不会睡 · 菜单栏小獭会一直睁着眼` : '一直醒着 · 菜单栏小獭会一直睁着眼', () => { QK.awake = 0; rerender(); flash('已恢复正常休眠'); });
};
ACTS.qSleep = (m) => { QK.sleepAt = Date.now() + +m * 60000; rerender(); flash(`${leftTxt(QK.sleepAt)}后睡觉 · 到点前 1 分钟会提醒你`); };
ACTS.qTog = (k) => {
  if (k === 'awake') { if (QK.awake) { QK.awake = 0; rerender(); flash('已恢复正常休眠'); } else ACTS.qAwake(0); return; }
  QK.desk = QK.desk ? 0 : 1; rerender();
  flash(QK.desk ? '桌面图标收起来了' : '桌面图标回来了', () => { QK.desk = QK.desk ? 0 : 1; rerender(); flash('已恢复'); });
};
ACTS.qDo = (k) => ({
  sleep: () => { QK.sleepAt = 0; rerender(); flash('定时睡觉取消了'); },
  wifi: () => openDlg(`<img src="${ex('happy')}" alt=""><h3>扫一下就连上</h3><p>「Otter‑Home‑5G」· 手机相机对准就行，不用再念密码。</p>${qrSvg()}
    <div class="btns"><button class="ghost block" data-act="close">好了</button></div>`, 'ask'),
  ocr: () => go('toolbox:ocr'),
  shot: () => flash('截图已放进剪切板，直接粘贴就行'),
  wipe: () => wipeScreen(),
  dns: () => flash('DNS 缓存已刷新 · 不影响任何东西'),
  trash: () => ask({ img: 'scared', title: '清空废纸篓？', p: `${QK.trash[0]} 个项目（${QK.trash[1]} GB）会被永久删除，不能恢复。`, danger: true, ok: '永久删除', act: 'trashGo' }),
}[k] || (() => {}))();
function qrSvg() {
  let r = '', n = 25, seed = 7;
  const fin = (x, y) => (x < 7 && y < 7) || (x >= n - 7 && y < 7) || (x < 7 && y >= n - 7);
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
    let on;
    if (fin(x, y)) { const cx = x < 7 ? x : x - (n - 7), cy = y < 7 ? y : y - (n - 7); on = cx === 0 || cx === 6 || cy === 0 || cy === 6 || (cx >= 2 && cx <= 4 && cy >= 2 && cy <= 4); }
    else { seed = (seed * 9301 + 49297) % 233280; on = seed / 233280 > 0.52; }
    if (on) r += `<rect x="${x}" y="${y}" width="1" height="1"/>`;
  }
  return `<div style="width:188px;height:188px;margin:12px auto;padding:12px;border-radius:16px;background:#fff"><svg viewBox="0 0 ${n} ${n}" width="164" height="164" fill="#1A1726" shape-rendering="crispEdges">${r}</svg></div>`;
}
function wipeScreen() {
  const d = document.createElement('div');
  d.style.cssText = 'position:absolute;inset:0;z-index:60;background:#000;display:grid;place-items:center;color:rgba(255,255,255,.35);font-size:13px;cursor:pointer';
  d.innerHTML = '<span>擦吧 · 按 Esc 或点一下退出</span>';
  const off = () => { d.remove(); removeEventListener('keydown', esc, true); flash('擦好了'); };
  const esc = (e) => { if (e.key === 'Escape') { e.stopPropagation(); off(); } };
  d.addEventListener('click', off);
  addEventListener('keydown', esc, true);
  win.appendChild(d);
  gsap.from(d, { autoAlpha: 0, duration: D(0.3) });
  setTimeout(() => gsap.to(d.firstChild, { autoAlpha: 0, duration: D(0.6) }), 1800);
}
ACTS.trashGo = async () => {
  await opRun({ title: '正在清空废纸篓……', img: 'bath', steps: [[`删除 ${QK.trash[0]} 个项目`, `${QK.trash[1]} GB`]], note: '清空后不能恢复' });
  const gbv = QK.trash[1]; QK.trash = [0, 0]; rerender();
  moment({ img: 'relief', title: '废纸篓空了', sub: `腾出 ${gbv} GB。` });
};

/* ══ 工具箱 · 截图识字 ═══════════════════════════════ */
const OCR = { text: '', busy: false, hist: [
  ['会议室 B302 · 周五 15:00 · 带上 2.0 评审稿', '14:02'], ['快递单号 SF1430 2911 7788', '昨天'], ['Wi‑Fi：Cafe_Otter 密码 otter2026', '11月3日'],
] };
PG['toolbox:ocr'] = () => `<section class="cardp c5" style="padding:20px;display:flex;flex-direction:column;gap:12px">
    <img src="${ex(OCR.busy ? 'focus' : 'think', true)}" alt="" style="width:84px;height:84px">
    <h3 style="font-size:17px">框一块屏幕，把字认出来</h3>
    <p class="muted" style="font-size:12.5px;line-height:1.6">不让复制的网页、图片里的号码、视频里的字幕都行。认完直接放进剪切板，全程在这台 Mac 上完成，不上传。</p>
    <div style="display:flex;gap:8px;margin-top:4px"><button class="slab" data-act="ocrGo">${I('scan')}框选识字</button><button class="ghost" data-act="ocrFile">选一张图片</button></div>
    <div class="muted" style="font-size:11.5px">识别中文、English，横排竖排都行</div></section>
  <section class="cardp c7" style="padding:16px;display:flex;flex-direction:column;gap:10px"><div class="ch" style="padding:0"><h3>识别结果</h3><span class="sp"></span>${OCR.text ? '<button class="ghost" data-act="ocrCopy">复制</button>' : ''}</div>
    ${OCR.busy ? '<div class="muted" style="padding:40px 0;text-align:center"><span class="spin"></span> 正在认字……</div>'
      : OCR.text ? `<div style="background:var(--field);border:.5px solid var(--line);border-radius:12px;padding:12px 14px;font-size:13px;line-height:1.7;white-space:pre-wrap">${OCR.text}</div>
        <div class="chips">${['138 0013 8000', 'otter@example.com'].map((x) => `<span class="chip" data-act="flashMsg" data-arg="已复制：${x}">${x}</span>`).join('')}<span class="chip" data-act="flashMsg" data-arg="已合并成一行">合并成一行</span></div>`
      : '<div class="muted" style="padding:40px 0;text-align:center;font-size:12.5px">还没认过字 · 点左边「框选识字」试试</div>'}</section>
  <section class="cardp full" style="padding:16px"><div class="ch" style="padding:0 0 6px"><h3>最近认过的</h3><span>只存在本机，最多 12 条</span></div>
    ${OCR.hist.map(([t, d]) => R({ ap: '字', c: '#FF8A3D', t, s: d, right: `<button class="ghost" data-act="flashMsg" data-arg="已复制">复制</button>` })).join('')}</section>`;
ACTS.ocrGo = async () => {
  OCR.busy = true; rerender(); await wait(1100);
  OCR.busy = false; OCR.text = '水獭工具 2.0 发布会\n时间：11 月 12 日 19:30\n报名电话：138 0013 8000\n邮箱：otter@example.com';
  OCR.hist.unshift(['水獭工具 2.0 发布会 · 11 月 12 日 19:30', '刚刚']); OCR.hist = OCR.hist.slice(0, 12);
  rerender(); flash('认出 4 行字，已放进剪切板');
};
ACTS.ocrFile = () => ACTS.ocrGo();
ACTS.ocrCopy = () => flash('已复制识别结果');

/* ══ 工具箱 · 剪切板 ═════════════════════════════════ */
const CLIP = [
  ['text', '会议纪要：周五前完成 2.0 原型评审，周一开始发布', '23:41', 1, '备忘录'], ['link', 'https://gsap.com/docs/v3/Plugins/ScrollTrigger', '23:30', 0, 'Safari'],
  ['code', 'flutter build macos --release', '23:12', 0, '终端'], ['color', '#FF8A3D', '22:58', 1, 'Figma'],
  ['image', '截图 2026-11-06 22.40.png · 1280×800', '22:40', 0, '截图'], ['text', '小獭：水挺清的，顺手清掉 12.4 GB 吧。', '22:10', 0, '水獭工具'], ['text', '订单号 2026110600812', '昨天 18:02', 0, '微信'],
];
const CLIPI = { text: 'file', link: 'link', code: 'code', color: 'drop', image: 'image' };
let clipPaused = false;
PG['toolbox:clip'] = () => {
  const L = CLIP.map((x, i) => [x, i]).sort((a, b) => b[0][3] - a[0][3]);
  const x = CLIP[S.clipSel] || CLIP[0];
  const pv = x[0] === 'color' ? `<div style="height:160px;border-radius:16px;background:${x[1]};display:grid;place-items:end start;padding:14px;color:#1A0E06;font:800 22px var(--mono)">${x[1]}</div>`
    : x[0] === 'image' ? `<div style="height:160px;border-radius:16px;background:linear-gradient(135deg,#2a2440,#0B0A14);display:grid;place-items:center;color:#A09BB4">${I('image')}</div>`
    : `<div style="min-height:120px;border-radius:16px;background:rgba(var(--ink),.04);border:.5px solid var(--line);padding:14px;font:${x[0] === 'code' || x[0] === 'link' ? '13px var(--mono)' : '15px/1.6 inherit'};overflow-wrap:anywhere">${x[1]}</div>`;
  return `<section class="cardp c5" style="padding-top:12px"><div class="tb"><div class="srch" style="min-width:0;flex:1">${I('search')}<input placeholder="搜剪切板历史"></div><span class="muted" style="font-size:12px">${clipPaused ? '已暂停' : '记录中'}</span>${sw(!clipPaused, 'clipPause', 0)}</div>
      ${clipPaused ? `<div class="banner" style="margin:0 12px 8px;--t:var(--busy)"><div><b>暂停记录中</b><span>这段时间复制的内容不会被记下来</span></div></div>` : ''}
      ${L.map(([c, i]) => R({ cls: i === S.clipSel ? 'sel' : '', attrs: `data-act="clipSel" data-arg="${i}" style="cursor:pointer"`, b: CLIPI[c[0]], c: c[0] === 'color' ? c[1] : 'var(--calm)', t: `<span style="font-weight:600;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;max-width:260px">${c[1]}</span>`, tag: c[3] ? `<span style="color:var(--accent)">${I('pin').replace('class="i"', 'class="i" style="width:12px;height:12px"')}</span>` : '', s: `${c[4]} · ${c[2]}` })).join('')}</section>
    <section class="cardp c7"><div class="ch"><h3>${{ text: '文字', link: '链接', code: '代码', color: '颜色', image: '图片' }[x[0]]}</h3><span>来自 ${x[4]} · ${x[2]}</span><span class="sp"></span><a data-act="clipClearAsk">清空历史</a></div>
      <div class="bd">${pv}<div class="kv" style="margin-top:14px"><span>字数</span><b class="num">${x[1].length}</b><span>来源</span><b>${x[4]}</b><span>复制于</span><b>${x[2]}</b></div>
      <div style="display:flex;gap:8px;margin-top:16px"><button class="slab" data-act="flashMsg" data-arg="已复制，可以粘贴了">复制</button><button class="ghost lg" data-act="clipPin">${x[3] ? '取消置顶' : '置顶'}</button><button class="ghost lg" data-act="clipDel">删除</button><span style="flex:1"></span><span class="muted" style="align-self:center">⌥⌘V 随时呼出</span></div></div></section>`;
};
ACTS.clipSel = (i) => { S.clipSel = +i; rerender(); };
ACTS.clipPause = () => { clipPaused = !clipPaused; rerender(); flash(clipPaused ? '剪切板暂停记录' : '剪切板继续记录'); };
ACTS.clipPin = () => { const x = CLIP[S.clipSel]; x[3] = x[3] ? 0 : 1; rerender(); flash(x[3] ? '已置顶 · 清空历史时会保留' : '已取消置顶'); };
ACTS.clipDel = () => { const i = S.clipSel, x = CLIP.splice(i, 1)[0]; S.clipSel = 0; if (!CLIP.length) S.pst = 'empty'; rerender(); flash('已删除一条', () => { CLIP.splice(i, 0, x); S.pst = 'normal'; S.clipSel = i; rerender(); }); };
ACTS.clipClearAsk = () => ask({ img: 'think', title: '清空剪切板历史？', p: `${CLIP.filter((x) => !x[3]).length} 条记录会被删除，置顶的 ${CLIP.filter((x) => x[3]).length} 条保留。删除后不能恢复。`, danger: true, ok: '清空', act: 'clipClear' });
ACTS.clipClear = () => { const n = CLIP.length; for (let i = CLIP.length - 1; i >= 0; i--) if (!CLIP[i][3]) CLIP.splice(i, 1); S.clipSel = 0; closeDlg(); rerender(); flash(`已清空 ${n - CLIP.length} 条，置顶的留下了`); };

/* ══ 工具箱 · 图片压缩 ═══════════════════════════════ */
const IMGS = [['hero-banner.png', '2880×1200', 4.2, 1.3, ['#5FC9E8', '#1F7DB8']], ['产品照片.jpg', '4032×3024', 6.8, 1.9, ['#E0C27A', '#9A6A00']], ['avatar@3x.png', '600×600', 0.9, 0.21, ['#FF8A3D', '#FA5A1E']], ['截图 1.png', '3024×1964', 2.4, 0.62, ['#9B8BE8', '#4A3A8A']], ['loading.gif', '480×480', 3.1, null, ['#6EE7A8', '#1E8A55']]];
const imgQ = { q: 80, fmt: '保持原格式', keep: true, exif: false };
function imgDrop(big) {
  return `<section class="cardp full drop" style="${big ? 'min-height:520px;' : ''}display:flex;align-items:center;justify-content:center;gap:16px;padding:${big ? 40 : 16}px">
    <img src="${ex(big ? 'hi' : 'happy', !big)}" style="width:${big ? 120 : 52}px;height:${big ? 120 : 52}px" alt=""><div style="text-align:${big ? 'center' : 'left'}"><b style="font-size:${big ? 20 : 14}px">把图片拖到这里</b><div class="muted">PNG、JPEG、HEIC、WebP 都行，一次最多 200 张 · 默认另存一份，不碰原图</div>
    ${big ? '<div style="margin-top:14px"><button class="slab" data-act="pst" data-arg="normal">选择图片</button></div>' : ''}</div>${big ? '' : '<span style="flex:1"></span><button class="ghost lg" data-act="flashMsg" data-arg="已添加 3 张图片">选择图片</button>'}</section>`;
}
PG['toolbox:img'] = () => {
  const done = S.imgPh === 'done';
  const ok = IMGS.filter((x) => x[3]), before = ok.reduce((a, x) => a + x[2], 0), after = ok.reduce((a, x) => a + x[3], 0);
  return `${imgDrop(false)}
    <section class="cardp c8"><div class="ch"><h3>${IMGS.length} 张图片</h3><span>${done ? `省下 ${(before - after).toFixed(1)} MB · ${Math.round((1 - after / before) * 100)}%` : `合计 ${IMGS.reduce((a, x) => a + x[2], 0).toFixed(1)} MB`}</span><span class="sp"></span><a data-act="imgClear">清空列表</a></div>
      ${IMGS.map((x) => R({ pre: `<span class="thumb" style="background:linear-gradient(135deg,${x[4][0]},${x[4][1]})"></span>`, t: x[0], s: x[1], tag: done && !x[3] ? tag('动图暂不支持压缩', 'alarm') : '',
        right: done && x[3] ? `<span class="muted num" style="text-decoration:line-through">${x[2]} MB</span><b class="num">${x[3]} MB</b>${tag('−' + Math.round((1 - x[3] / x[2]) * 100) + '%', 'ok')}` : `<span class="v num">${x[2]} MB</span>` })).join('')}
      <div class="batch">${done ? `<span class="muted">${ok.length} 张已另存为「-压缩」副本 · 1 张跳过</span><span class="sp"></span><button class="ghost" data-act="flashMsg" data-arg="已在访达中显示">在访达中显示</button><button class="slab" data-act="imgReset">再压一批</button>` : `<span class="muted">质量 ${imgQ.q}% · ${imgQ.fmt}</span><span class="sp"></span><button class="slab" data-act="imgGo">压缩 ${IMGS.length} 张</button>`}</div></section>
    <section class="cardp c4"><div class="ch"><h3>压缩设置</h3></div><div class="bd" style="display:flex;flex-direction:column;gap:16px">
      <div><div class="muted" style="margin-bottom:6px">质量 · <b class="num" style="color:var(--hi)">${imgQ.q}%</b></div><div class="slider"><span class="muted">小</span><div class="tr"><i style="width:${imgQ.q}%"></i><b style="left:${imgQ.q}%"></b></div><span class="muted">清晰</span></div></div>
      <div><div class="muted" style="margin-bottom:6px">输出格式</div><div class="mini-seg">${['保持原格式', 'JPEG', 'WebP'].map((t) => `<button class="${imgQ.fmt === t ? 'on' : ''}" data-act="imgFmt" data-arg="${t}">${t}</button>`).join('')}</div></div>
      <div style="display:flex;align-items:center"><div style="flex:1"><b style="font-size:13px">另存一份</b><div class="muted" style="font-size:11.5px">关掉会直接覆盖原图</div></div>${sw(imgQ.keep, 'imgKeep', 0)}</div>
      <div style="display:flex;align-items:center"><div style="flex:1"><b style="font-size:13px">保留拍摄信息</b><div class="muted" style="font-size:11.5px">EXIF：时间、地点、相机</div></div>${sw(imgQ.exif, 'imgExif', 0)}</div></div></section>`;
};
ACTS.imgFmt = (t) => { imgQ.fmt = t; rerender(); };
ACTS.imgKeep = () => { imgQ.keep = !imgQ.keep; rerender(); if (!imgQ.keep) flash('注意：压缩后会直接覆盖原图'); };
ACTS.imgExif = () => { imgQ.exif = !imgQ.exif; rerender(); };
ACTS.imgClear = () => { S.pst = 'empty'; rerender(); syncConsole(); };
ACTS.imgReset = () => { S.imgPh = 'list'; rerender(); };
ACTS.imgGo = async () => {
  await opRun({ title: '小獭在压图片……', img: 'grind', steps: IMGS.map((x) => [x[0], x[3] ? `${x[2]} → ${x[3]} MB` : '跳过']), note: imgQ.keep ? '原图不动，另存一份' : '会覆盖原图' });
  S.imgPh = 'done'; rerender();
  const ok = IMGS.filter((x) => x[3]), b = ok.reduce((a, x) => a + x[2], 0), a2 = ok.reduce((a, x) => a + x[3], 0);
  moment({ img: 'proud', title: `省下 ${(b - a2).toFixed(1)} MB`, sub: `${ok.length} 张压好了，平均小了 ${Math.round((1 - a2 / b) * 100)}%。动图 1 张暂不支持，已跳过。`, act: '在访达中显示', onAct: () => { closeDlg(); flash('已在访达中显示'); } });
};

/* ══ 本机 ═════════════════════════════════════════════ */
PG['mac:hw'] = () => `<section class="cardp c5" style="padding:22px;display:flex;flex-direction:column;align-items:center;text-align:center;gap:6px">
    <div style="width:220px;height:150px;position:relative;margin-bottom:6px"><div style="position:absolute;left:20px;right:20px;top:0;bottom:22px;border-radius:12px 12px 4px 4px;border:3px solid rgba(var(--ink),.25);background:radial-gradient(circle at 50% 40%,color-mix(in srgb,var(--accent) 30%,#1b1829),#0B0A14);display:grid;place-items:center"><img src="brand/tools_icon.png" style="width:56px;height:56px" alt=""></div><div style="position:absolute;left:0;right:0;bottom:12px;height:10px;border-radius:2px 2px 10px 10px;background:rgba(var(--ink),.22)"></div></div>
    <b style="font-size:20px">MacBook Pro 14 英寸</b><div class="muted">2024 · 深空黑色</div>
    <div class="chips" style="justify-content:center;margin-top:8px">${tag('Apple M3 Pro', 'acc')}${tag('16 GB', 'calm')}${tag('512 GB SSD', 'calm')}${tag('macOS 26.1', 'ok')}</div></section>
  <section class="cardp c7"><div class="ch"><h3>配置</h3><span class="sp"></span><a data-act="flashMsg" data-arg="配置信息已复制为文字">复制全部</a></div><div class="bd"><div class="kv">
    <span>芯片</span><b>Apple M3 Pro（11 核 CPU · 14 核 GPU · 16 核神经网络引擎）</b><span>内存</span><b>16 GB 统一内存</b><span>存储</span><b>APPLE SSD AP0512Z · 494 GB 可用容量</b>
    <span>显示器</span><b>内建 Liquid 视网膜 XDR · 3024×1964 · 120 Hz</b><span>外接</span><b>Studio Display · 5120×2880</b><span>系统</span><b>macOS 26.1（25B78）</b>
    <span>运行时间</span><b>3 天 4 小时</b><span>序列号</span><b style="display:flex;align-items:center;gap:6px"><span class="num">C02••••••XYZ</span>${ib('copy', 'flashMsg', '序列号已复制', '复制完整序列号')}</b>
    <span>保修</span><b>AppleCare+ · 到 2027 年 3 月</b></div></div></section>
  <section class="cardp full"><div class="ch"><h3>实时</h3><span>每 1.6 秒更新</span></div><div class="bd statrow">${[['CPU', `${Math.round(S.cpu)}`, '%', '性能核 6 · 能效核 5'], ['GPU', '12', '%', '14 核'], ['温度', '46', '°C', '风扇 1,240 转'], ['功耗', '18.4', 'W', '电池供电']].map(([k, v, u, s]) => `<div class="stat"><div class="k">${k}</div><div class="v num">${v}<small>${u}</small></div><div class="s">${s}</div></div>`).join('')}</div></section>`;
const STORE = [['应用', 86, '#5FC9E8', 'clean:apps'], ['开发者', 52, '#9B8BE8', 'clean:junk'], ['文稿', 62, '#E8B04B', 'clean:large'], ['系统数据', 48, '#8A94A6', ''], ['iCloud 本地', 31, '#6EE7A8', ''], ['macOS', 18, '#A09BB4', ''], ['其他用户', 14, '#E0C27A', '']];
PG['mac:storage'] = () => {
  const used = Math.round(S.disk * 494), sum = STORE.reduce((a, x) => a + x[1], 0), k = used / sum;
  return `<section class="cardp full" style="padding:18px 20px"><div style="display:flex;align-items:baseline;gap:10px"><div class="big num">${used}<small>/ 494 GB 已用</small></div><span class="sp" style="flex:1"></span><span class="muted">可用 <b class="num" style="color:var(--hi)">${494 - used} GB</b></span></div>
      <div class="stack" style="margin-top:14px;height:26px">${STORE.map((x) => `<i style="width:${((x[1] * k) / 494) * 100}%;background:${x[2]}" data-tip="${x[0]} · ${Math.round(x[1] * k)} GB"></i>`).join('')}<i style="flex:1;background:rgba(var(--ink),.08)"></i></div>
      <div class="legend2" style="margin-top:10px;flex-wrap:wrap">${STORE.map((x) => `<span><i style="background:${x[2]}"></i>${x[0]} ${Math.round(x[1] * k)} GB</span>`).join('')}<span><i style="background:rgba(var(--ink),.15)"></i>可用</span></div></section>
    <section class="cardp c7"><div class="ch"><h3>都放了什么</h3><span>按大小</span></div>${STORE.map((x) => R({ b: 'folder', c: x[2], t: x[0], right: `<span class="szb" style="--c:${x[2]};width:140px"><i style="width:${(x[1] / 86) * 100}%"></i></span><span class="v num" style="width:60px;text-align:right">${Math.round(x[1] * k)} GB</span>${x[3] ? `<button class="ghost" style="width:66px" data-act="go" data-arg="${x[3]}">去清理</button>` : '<span style="width:66px;flex:none"></span>'}` })).join('')}</section>
    <section class="cardp c5"><div class="ch"><h3>小獭的建议</h3></div><div class="bd" style="display:flex;flex-direction:column;gap:8px">
      ${[['clean', '清理垃圾', `${S.junk.toFixed(1)} GB 缓存和日志`, 'clean:junk', 'var(--calm)'], ['vm', '虚拟机很大', 'Windows 11 ARM 占了 24.6 GB，半年没开了', 'clean:large', 'var(--busy)'], ['code', 'Xcode 旧模拟器', '3 个用不上的 iOS 模拟器运行时，11 GB', 'clean:junk', '#9B8BE8']].map(([ic, t, s, to, c]) => `<div class="banner" style="--t:${c}"><span class="b" style="color:${c}">${I(ic)}</span><div><b>${t}</b><span>${s}</span></div><span class="sp"></span><button class="ghost" data-act="go" data-arg="${to}">去看看</button></div>`).join('')}</div></section>`;
};
const BAT24 = Array.from({ length: 48 }, (_, i) => Math.max(18, Math.min(100, 100 - (i % 24) * 3.2 + (i > 30 ? 40 : 0) - Math.sin(i / 3) * 4)));
PG['mac:bat'] = () => `<section class="cardp c4" style="padding:20px;display:flex;flex-direction:column;align-items:center;gap:10px">
    ${ringG(96, 160, 'var(--ok)', '<div><div class="big num">96<small>%</small></div><div class="muted">电池健康</div></div>', 12)}<b style="color:var(--ok)">状态正常</b><div class="muted" style="text-align:center;font-size:12px">「优化电池充电」已开启，会在你通常拔电前才充满。</div></section>
  <section class="cardp c8"><div class="ch"><h3>电量 · 82%</h3><span>电池供电 · 大约还能用 9 小时</span><span class="sp"></span><span class="legend2"><span><i style="background:var(--ok)"></i>最近 24 小时</span></span></div>
    <div class="bd">${chartSvg(BAT24, 'var(--ok)', 100, 130)}<div class="legend2" style="justify-content:space-between;margin-top:4px"><span>昨天 23:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>现在</span></div></div></section>
  <section class="cardp full"><div class="bd statrow" style="padding-top:14px">${[['循环次数', '214', '次', '设计寿命 1,000 次'], ['当前容量', '69.7', 'Wh', '出厂 72.6 Wh'], ['温度', '31', '°C', '正常'], ['充电器', '—', '', '没有连接']].map(([k, v, u, s]) => `<div class="stat"><div class="k">${k}</div><div class="v num">${v}<small>${u}</small></div><div class="s">${s}</div></div>`).join('')}</div></section>
  <section class="cardp full banner" style="--t:var(--ok);border-radius:var(--r-md)"><img src="${ex('happy')}" alt=""><div><b>今天用电很省</b><span>耗电最多的是 Xcode（31%）和 Chrome（22%）。合上盖子时小獭会帮你停掉后台编译。</span></div></section>`;
PG['mac:net'] = () => {
  const sp = S.speed;
  return `<section class="full statrow">${[['下载', SER.net.at(-1).toFixed(1), 'MB/s', 'netDown'], ['上传', '0.4', 'MB/s', ''], ['延迟', '18', 'ms', ''], ['本机 IP', '192.168.1.23', '', '']].map(([k, v, u, id]) => `<div class="stat cardp"><div class="k">${k}</div><div class="v num" ${id ? `id="${id}"` : ''} style="${v.length > 8 ? 'font-size:16px;margin-top:5px' : ''}">${v}<small>${u}</small></div></div>`).join('')}</section>
    <section class="cardp c8"><div class="ch"><h3>实时网速</h3><span>最近 1 分钟</span><span class="sp"></span><span class="legend2"><span><i style="background:var(--calm)"></i>下载</span><span><i style="background:var(--accent)"></i>上传</span></span></div><div class="bd">${chartSvg(SER.net, 'var(--calm)', 8, 150, 'netChart').replace('</svg>', `<path d="${areaPath(netUp(), 600, 150, 8).line}" fill="none" style="stroke:var(--accent)" stroke-width="1.6" vector-effect="non-scaling-stroke"/></svg>`)}</div></section>
    <section class="cardp c4" style="padding:16px;display:flex;flex-direction:column;align-items:center;gap:8px"><div class="ch" style="padding:0;width:100%"><h3>测速</h3><span>${sp && sp.done ? '刚刚' : '大约 15 秒'}</span></div>
      <div class="gauge"><svg viewBox="0 0 220 130"><path d="M20 120 A90 90 0 0 1 200 120" fill="none" style="stroke:rgba(var(--ink),.08)" stroke-width="12" stroke-linecap="round"/><path id="gArc" d="M20 120 A90 90 0 0 1 200 120" fill="none" style="stroke:var(--accent)" stroke-width="12" stroke-linecap="round" stroke-dasharray="283" stroke-dashoffset="${283 - ((sp ? sp.down : 0) / 600) * 283}"/></svg>
        <div class="v"><b class="num" id="gNum">${sp ? Math.round(sp.down) : '—'}</b><small>Mbps 下载</small></div></div>
      ${sp && sp.done ? `<div class="muted">上传 <b class="num" style="color:var(--hi)">86</b> Mbps · 延迟 <b class="num" style="color:var(--hi)">18</b> ms</div>` : ''}
      <button class="slab block" style="width:100%" data-act="speed" ${sp && !sp.done ? 'disabled' : ''}>${sp && !sp.done ? '<span class="spin"></span>测速中……' : sp ? '再测一次' : '开始测速'}</button></section>
    <section class="cardp full"><div class="ch"><h3>测速记录</h3></div>${[['今天 21:02', 'OtterHome-5G', 398, 82, 19], ['昨天 10:40', 'OtterHome-5G', 412, 88, 17], ['11月3日', 'Starbucks', 42, 11, 46]].map(([t, n, d, u, p]) => R({ b: 'gauge', c: d > 100 ? 'var(--ok)' : 'var(--busy)', t: `${d} Mbps`, s: `${t} · ${n}`, right: `<span class="muted">上传 ${u} Mbps · 延迟 ${p} ms</span>` })).join('')}</section>`;
};
ACTS.speed = async () => {
  S.speed = { down: 0, done: false }; rerender();
  const o = { v: 0 };
  await new Promise((r) => gsap.to(o, { v: 412, duration: RM() ? 0.1 : 2.6, ease: 'power2.out', onUpdate: () => { S.speed.down = o.v; const n = $('#gNum'), a = $('#gArc'); if (n) n.textContent = Math.round(o.v); if (a) a.style.strokeDashoffset = 283 - (o.v / 600) * 283; }, onComplete: r }));
  S.speed.done = true; rerender();
  flash('测速完成 · 下载 412 Mbps · 上传 86 Mbps · 延迟 18 ms');
};
const NEAR = [['OtterHome', '2.4 GHz', -48, 1], ['TP-LINK_8A2F', '5 GHz', -61, 1], ['ChinaNet-Q7', '2.4 GHz', -70, 1], ['iPhone 的热点', '5 GHz', -55, 1], ['Guest', '2.4 GHz', -78, 0], ['DIRECT-HP', '2.4 GHz', -83, 0]];
const sig = (d) => { const n = d > -55 ? 4 : d > -65 ? 3 : d > -75 ? 2 : 1; return `<span class="sig">${[5, 8, 11, 14].map((h, i) => `<i style="height:${h}px" class="${i < n ? '' : 'off'}"></i>`).join('')}</span>`; };
PG['mac:wifi'] = () => `<section class="cardp c7"><div style="display:flex;align-items:center;gap:14px;padding:18px 18px 6px"><span class="b" style="width:52px;height:52px;border-radius:16px;display:grid;place-items:center;background:color-mix(in srgb,var(--calm) 15%,transparent);color:var(--calm)">${I('wifi')}</span>
      <div style="flex:1"><b style="font-size:20px">OtterHome-5G</b><div class="muted" style="display:flex;align-items:center;gap:6px"><span style="color:var(--ok)">${sig(-52)}</span>信号很好 · −52 dBm</div></div>${tag('已连接', 'ok')}</div>
    <div class="bd" style="padding-top:12px"><div class="kv"><span>频段</span><b>5 GHz · 信道 149（80 MHz）</b><span>速率</span><b class="num">1,201 Mbps</b><span>安全性</span><b>WPA3 个人</b><span>IP 地址</span><b class="num">192.168.1.23</b><span>路由器</span><b class="num">192.168.1.1</b><span>噪声</span><b class="num">−92 dBm</b><span>接口</span><b>en0 · Wi‑Fi 6E</b>
      <span>密码</span><b style="display:flex;align-items:center;gap:8px"><span class="num" style="font-family:var(--mono)">${S.wifiPw ? 'otter-river-2026' : '••••••••••••'}</span>${S.wifiPw ? ib('copy', 'flashMsg', '密码已复制', '复制') + ib('hide', 'wifiHide', 0, '隐藏') : `<button class="ghost" data-act="wifiPw">查看</button>`}</b></div></div></section>
  <section class="cardp c5"><div class="ch"><h3>附近的网络</h3><span>${NEAR.length} 个</span><span class="sp"></span>${ib('refresh', 'flashMsg', '已重新扫描附近的网络', '重新扫描')}</div>${NEAR.map(([n, f, d, lock]) => R({ t: n, s: f, right: `${lock ? `<span class="muted">${I('lock').replace('class="i"', 'class="i" style="width:13px;height:13px"')}</span>` : ''}<span style="color:${d > -65 ? 'var(--ok)' : 'var(--mid)'}">${sig(d)}</span>` })).join('')}</section>`;
ACTS.wifiPw = () => ask({ img: 'please', title: '查看 Wi‑Fi 密码？', p: 'macOS 会请你输入开机密码，或者用触控 ID 确认。密码存在钥匙串里，小獭不会另外保存。', ok: '用触控 ID 确认', act: 'wifiPwGo' });
ACTS.wifiPwGo = () => { closeDlg(); S.wifiPw = true; if (S.page === 'mac') rerender(); flash('Wi‑Fi 密码：otter-river-2026 · 已复制'); };
ACTS.wifiHide = () => { S.wifiPw = false; rerender(); };

function netUp() { return SER.net.map((v, i) => 0.25 + 0.3 * Math.abs(Math.sin(i * 0.7 + v))); }

/* 实时页面跟着采样刷新 */
setInterval(() => {
  if (S.page === 'mac' && S.seg.mac === 'net' && S.pst === 'normal') {
    const c = $('#netChart'), n = $('#netDown');
    if (c) { const a = areaPath(SER.net, 600, 150, 8); const ps = $$('path', c); ps[0].setAttribute('d', a.fill); ps[1].setAttribute('d', a.line); ps[2].setAttribute('d', areaPath(netUp(), 600, 150, 8).line); }
    if (n) n.innerHTML = `${SER.net.at(-1).toFixed(1)}<small>MB/s</small>`;
  }
  if (S.page === 'boost' && S.seg.boost === 'mem' && S.pst === 'normal') {
    const c = $('#memChart');
    if (c) { const a = areaPath(SER.mem, 600, 110, 100); const ps = $$('path', c); ps[0].setAttribute('d', a.fill); ps[1].setAttribute('d', a.line); }
  }
}, 1600);
