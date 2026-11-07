/* 水獭工具 · 原型 · 浮层：菜单栏浮窗 / ⌘K / 小獭助手 / 设置 / 关于 / 权限引导 + 演示台 */

/* ══ ⌘K 命令面板 ════════════════════════════════════ */
const PAL = [
  { g: '推荐', t: '一键养护', s: '清理建议项 · 释放内存 · 刷新 DNS', i: 'spark', c: 'var(--accent)', k: ['⌘', '↩'], run: () => askCare() },
  { g: '推荐', t: '释放内存', s: '约 1.6 GB', i: 'mem', c: 'var(--busy)', run: () => go('boost:mem') },
  { g: '推荐', t: '清理垃圾', s: () => `${S.junk.toFixed(1)} GB 可清理`, i: 'clean', c: 'var(--calm)', run: () => go('clean:junk') },
  ...NAV.filter((n) => !SEGS[n.id]).map((n) => ({ g: '页面', t: n.t, i: n.i, c: n.c, run: () => go(n.id) })),
  ...Object.entries(SEGS).flatMap(([p, segs]) => segs.map(([id, t, ic]) => ({ g: '页面', t: `${TITLE[p][0]} · ${t}`, i: ic, c: NAV.find((n) => n.id === p).c, run: () => go(`${p}:${id}`) }))),
  { g: '操作', t: '清空废纸篓', s: '不可恢复，会先问你', i: 'trash', c: 'var(--alarm)', run: () => ACTS.qDo('trash') },
  { g: '操作', t: '截图识字', s: '框一块屏幕，把字认出来', i: 'scan', c: 'var(--accent)', run: () => go('toolbox:ocr') },
  { g: '操作', t: 'Wi‑Fi 给客人', s: '生成二维码，手机扫一下就连上', i: 'qr', c: 'var(--calm)', run: () => ACTS.qDo('wifi') },
  { g: '操作', t: '定时睡觉', s: '30 分钟后睡觉', i: 'bed', c: '#9B8BE8', run: () => ACTS.qSleep(30) },
  { g: '操作', t: '显示隐藏文件', i: 'hide', c: '#9B8BE8', run: () => flash('访达会显示隐藏文件了') },
  { g: '操作', t: '锁定屏幕', i: 'lock', c: '#8A94A6', run: () => flash('屏幕已锁定（原型里不真锁）') },
  { g: '操作', t: '刷新 DNS 缓存', i: 'dns', c: 'var(--ok)', run: () => flash('DNS 缓存已刷新') },
  { g: '操作', t: '查看 Wi‑Fi 密码', i: 'wifi', c: 'var(--calm)', run: () => ACTS.wifiPw() },
  { g: '操作', t: '网络测速', i: 'gauge', c: 'var(--calm)', run: () => { go('mac:net'); setTimeout(() => ACTS.speed(), 300); } },
  { g: '操作', t: '切换夜间 / 白天', i: 'moon', c: '#9B8BE8', run: () => { S.theme = S.theme === 'night' ? 'day' : 'night'; update(); syncConsole(); } },
  { g: '操作', t: '问小獭', s: '小獭助手', i: 'robot', c: 'var(--accent)', run: () => ACTS.ai() },
  { g: '操作', t: '打开设置', i: 'gear', c: '#8A94A6', k: ['⌘', ','], run: () => ACTS.settings() },
  { g: '操作', t: '菜单栏浮窗', i: 'up', c: '#8A94A6', run: () => ACTS.tray() },
];
let palL = [], palI = 0;
function palFilter(q) {
  q = q.trim().toLowerCase();
  palL = PAL.filter((x) => !q || (x.t + (typeof x.s === 'function' ? x.s() : x.s || '')).toLowerCase().includes(q));
  if (!q) palL = palL.filter((x) => x.g !== '页面' || !x.t.includes('·'));
  palI = 0;
  palDraw(q);
}
function palDraw(q) {
  const ls = $('#pal .ls');
  if (!palL.length) { ls.innerHTML = `<div class="empty" style="padding:26px"><img src="${ex('think')}" style="width:72px;height:72px" alt=""><h3 style="font-size:15px">没找到「${q}」</h3><p>试试「清理」「内存」「Wi‑Fi」，或者直接问小獭。</p><div class="acts"><button class="ghost" data-act="palAsk">问小獭「${q}」</button></div></div>`; return; }
  let g = '';
  ls.innerHTML = palL.map((x, i) => { const h = x.g !== g ? `<h5>${(g = x.g)}</h5>` : ''; const s = typeof x.s === 'function' ? x.s() : x.s;
    return `${h}<div class="pi${i === palI ? ' on' : ''}" data-act="palRun" data-arg="${i}" style="--c:${x.c}"><span class="b">${I(x.i)}</span>${x.t}${s ? `<small>${s}</small>` : ''}${x.k ? `<span class="k">${x.k.map((k) => `<kbd>${k}</kbd>`).join('')}</span>` : ''}</div>`; }).join('');
}
ACTS.pal = () => {
  const p = $('#pal');
  if (p.classList.contains('on')) return ACTS.palClose();
  closeDlg();
  p.innerHTML = `<div class="palb"><div class="in">${I('search')}<input data-in="pal" placeholder="搜功能、页面或操作……" autocomplete="off"><kbd>esc</kbd></div><div class="ls"></div>
    <div class="ft"><span><kbd>↑</kbd><kbd>↓</kbd>选择</span><span><kbd>↩</kbd>执行</span><span><kbd>esc</kbd>关闭</span><span style="margin-left:auto">找不到？直接问小獭</span></div></div>`;
  p.classList.add('on');
  palFilter('');
  $('input', p).focus();
  gsap.from('.palb', { y: -10, scale: 0.98, autoAlpha: 0, duration: D(0.26), ease: 'power3.out' });
};
ACTS.palClose = () => { $('#pal').classList.remove('on'); };
ACTS.palRun = (i) => { const x = palL[+i]; ACTS.palClose(); x && x.run(); };
ACTS.palAsk = () => { const q = $('#pal input').value; ACTS.palClose(); ACTS.ai(); setTimeout(() => aiSend(q), 450); };
$('#pal').addEventListener('click', (e) => { if (e.target.id === 'pal') ACTS.palClose(); });
$('#pal').addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); palI = (palI + (e.key === 'ArrowDown' ? 1 : -1) + palL.length) % palL.length; palDraw(); $('#pal .pi.on') && $('#pal .pi.on').scrollIntoView({ block: 'nearest' }); }
  if (e.key === 'Enter' && palL[palI]) ACTS.palRun(palI);
});
$('#pal').addEventListener('mousemove', (e) => { const pi = e.target.closest('.pi'); if (pi && +pi.dataset.arg !== palI) { palI = +pi.dataset.arg; $$('#pal .pi').forEach((x) => x.classList.toggle('on', x === pi)); } });

/* ══ 菜单栏浮窗 ═════════════════════════════════════ */
let trayTab = 'clean', trayPond = null, noSleep = false;
function trayBody() {
  if (trayTab === 'sys') return [['CPU', `${Math.round(S.cpu)}%`, S.cpu, 'var(--calm)'], ['内存', `${S.mem.toFixed(1)} / 16 GB`, memPct(), `var(--${S.memTone})`], ['磁盘', `${Math.round(S.disk * 494)} / 494 GB`, S.disk * 100, S.disk > 0.9 ? 'var(--alarm)' : 'var(--calm)'], ['电池', '82% · 健康 96%', 82, 'var(--ok)'], ['温度', '46°C', 46, 'var(--busy)']]
    .map(([k, v, p, c]) => `<div class="mrow"><span style="width:40px;color:var(--mid)">${k}</span><span class="szb" style="--c:${c}"><i style="width:${p}%"></i></span><b class="num" style="min-width:110px;text-align:right">${v}</b></div>`).join('')
    + `<div class="mrow"><span style="width:40px;color:var(--mid)">网络</span><span style="flex:1" class="num">↓ ${SER.net.at(-1).toFixed(1)} MB/s · ↑ 0.4 MB/s</span></div>
      <div class="mrow"><span style="width:40px;color:var(--mid)">Wi‑Fi</span><span style="flex:1">OtterHome-5G · 信号很好</span></div>`;
  if (trayTab === 'clip') return CLIP.slice(0, 6).map((c, i) => `<div class="mrow" data-act="trayCopy" data-arg="${i}" style="cursor:pointer;border-radius:8px"><span style="color:var(--calm)">${I(CLIPI[c[0]])}</span><span style="flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${c[1]}</span><span class="muted" style="font-size:11px">${c[2]}</span></div>`).join('')
    + `<div class="muted" style="font-size:11.5px;padding:6px 4px">点一条就复制 · ⌥⌘V 随时呼出</div>`;
  return `<div class="drop2"><canvas id="trayPond"></canvas><div class="t"><b class="num">${S.junk.toFixed(1)} GB</b><span>可清理 · 内存 ${S.mem.toFixed(1)} / 16 GB ${memWord[S.memTone]}</span></div></div>
    <div style="display:flex;gap:6px;margin-top:8px"><button class="slab" style="flex:1" data-act="trayCare">一键养护</button><button class="ghost lg" data-act="trayMem">释放内存</button></div>
    <div class="qg">${[['clean', '清理垃圾', 'var(--calm)', 'trayGo', 'clean:junk'], ['trash', '清空废纸篓', 'var(--alarm)', 'trayTrash', ''], ['dns', '刷新 DNS', 'var(--ok)', 'trayDns', ''], ['cup', noSleep ? '防休眠 · 开' : '防止休眠', '#E8B04B', 'traySleep', ''], ['lock', '锁定屏幕', '#8A94A6', 'trayDns', 'lock'], ['image', '压缩图片', 'var(--accent)', 'trayGo', 'toolbox:img']]
      .map(([ic, t, c, a, g]) => `<div class="q${a === 'traySleep' && noSleep ? ' on' : ''}" data-act="${a}" data-arg="${g}"><span class="b" style="--c:${c}">${I(ic)}</span>${t}</div>`).join('')}</div>
    <div class="muted" style="font-size:11.5px;font-weight:700;margin:10px 4px 2px">占内存最多</div>
    ${APPMEM.slice(0, 4).map(([n, g, c]) => `<div class="mrow"><span class="b ap" style="width:20px;height:20px;border-radius:6px;display:grid;place-items:center;background:${c};color:#fff;font-size:10px;font-weight:800">${n[0]}</span><span style="width:96px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${n}</span><span class="szb" style="--c:${c}"><i style="width:${(g / 3.1) * 100}%"></i></span><b class="num" style="width:56px;text-align:right">${gb(g)}</b></div>`).join('')}`;
}
function trayDraw() {
  const f = $('#tray .fly');
  if (!f) return;
  trayPond && trayPond.destroy(); trayPond = null;
  const tone = S.preset === 'calm' ? (S.time === 'night' ? 'sleepy' : 'happy') : S.expr;
  f.innerHTML = `<div class="hd"><img src="${ex(tone)}" alt=""><div style="flex:1"><b>小獭在看着</b><span>${S.toneText}</span></div>${ib('gear', 'traySet', '', '设置')}</div>
    <div class="tabs">${[['clean', '清理释放'], ['sys', '系统'], ['clip', '剪切板']].map(([k, t]) => `<button class="${trayTab === k ? 'on' : ''}" data-act="trayTab" data-arg="${k}">${t}</button>`).join('')}</div>
    <div class="body2">${trayBody()}</div>
    <div class="ft"><button class="ghost" data-act="trayOpen">打开水獭工具</button><span class="sp"></span><span class="muted" style="font-size:11px">v2.0</span>${ib('power', 'flashMsg', '原型里不会真的退出', '退出')}</div>`;
  const cv = $('#trayPond');
  if (cv) { const W = WATER[S.theme]; trayPond = new Pond(cv, { init: { level: 0.15 + S.disk * 0.6, murk: Math.min(0.85, S.junk / 18), speed: S.cpu / 100, tone: W[S.memTone], deep: W.deep } }); }
}
ACTS.tray = () => {
  const t = $('#tray');
  if (t.classList.contains('on')) return ACTS.trayClose();
  closeDlg(); ACTS.palClose();
  const now = new Date();
  t.innerHTML = `<div class="mb"><span>${I('wifi').replace('class="i"', 'class="i" style="width:14px;height:14px"')}</span><span>82% ${I('battery').replace('class="i"', 'class="i" style="width:16px;height:16px;vertical-align:-3px"')}</span>
    <span class="me2" data-act="trayClose"><img src="brand/otter_white.png" style="filter:none" alt=""><span class="num">${Math.round(S.cpu)}%</span></span><span>${'日一二三四五六'[now.getDay()] ? '周' + '日一二三四五六'[now.getDay()] : ''} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}</span></div>
    <div class="cover" data-act="trayClose"></div><div class="fly"></div>`;
  t.classList.add('on');
  trayDraw();
  gsap.from('#tray .fly', { y: -8, scale: 0.96, autoAlpha: 0, duration: D(0.32), ease: 'back.out(1.6)' });
};
ACTS.trayClose = () => { const t = $('#tray'); t.classList.remove('on'); trayPond && trayPond.destroy(); trayPond = null; };
ACTS.trayTab = (k) => { trayTab = k; trayDraw(); };
ACTS.trayGo = (to) => { ACTS.trayClose(); go(to); };
ACTS.trayOpen = () => { ACTS.trayClose(); flash('主窗口已打开'); };
ACTS.traySet = () => { ACTS.trayClose(); ACTS.settings('menubar'); };
ACTS.trayCare = () => { ACTS.trayClose(); askCare(); };
ACTS.trayMem = async (a, el) => { el.innerHTML = '<span class="spin"></span>'; await wait(1200); S.mem = Math.max(4, S.mem - 1.6); if (S.mem < 12) S.memTone = 'calm'; trayPond && trayPond.burst && trayPond.burst(16); trayDraw(); flash(`释放了 1.6 GB 内存 · 现在 ${S.mem.toFixed(1)} / 16 GB`); };
ACTS.trayTrash = () => { ACTS.trayClose(); ACTS.qDo('trash'); };
ACTS.trayDns = (a) => flash(a === 'lock' ? '屏幕已锁定（原型里不真锁）' : 'DNS 缓存已刷新');
ACTS.traySleep = () => { noSleep = !noSleep; QK.awake = noSleep ? 1 : 0; QK.awakeUntil = 0; trayDraw(); flash(noSleep ? '防止休眠已开启 · 小獭会一直睁着眼' : '已恢复正常休眠'); };
ACTS.trayCopy = (i) => flash(`已复制：${CLIP[i][1].slice(0, 24)}`);

/* ══ 小獭助手 ═══════════════════════════════════════ */
let aiNoModel = false;
const AI_SEED = [
  { u: 'Mac 最近有点卡，怎么回事？' },
  { a: '我看了一下，主要是两件事：', tools: [['读取内存与进程', '12 个进程 · 2 个占用偏高'], ['读取启动项', '7 个随开机启动']],
    tail: '<b>Xcode</b> 编译时占了 3.1 GB，<b>Chrome</b> 开了 38 个标签页占 2.4 GB；另外 Docker 和 Adobe 开机就在后台跑。<br>要不要先结束 Chrome 的后台渲染进程？标签页会保留。',
    need: { t: '结束「Google Chrome Helper」', s: '会刷新后台标签页，没保存的表单可能丢失 · 不能撤销', ok: '结束进程' } },
];
function aiMsgs(list) {
  return list.map((m) => m.u ? `<div class="mu">${m.u}</div>` : `<div class="ma"><img src="${ex(m.img || 'calm', true)}" alt=""><div style="min-width:0"><div class="meta">小獭</div><div class="bb">${m.a || ''}
    ${(m.tools || []).map(([t, r]) => `<div class="tcard"><div class="h" style="color:var(--ok)">${I('check')}${t}</div><div class="muted" style="font-size:11.5px;margin-top:2px">${r}</div></div>`).join('')}
    ${m.tail ? `<div style="margin-top:8px">${m.tail}</div>` : ''}
    ${m.need ? `<div class="tcard need" id="aiNeed"><div class="h" style="color:var(--alarm)">${I('alert')}需要你确认 · ${m.need.t}</div><div class="muted" style="font-size:11.5px;margin-top:2px">${m.need.s}</div><div class="btns2"><button class="slab danger" style="height:30px;font-size:12.5px" data-act="aiOk">${m.need.ok}</button><button class="ghost" data-act="aiNo">先不</button></div></div>` : ''}</div></div></div>`).join('');
}
function aiDraw() {
  const p = $('#aip');
  p.innerHTML = `<div class="ah"><img src="${ex(aiNoModel ? 'please' : 'hi')}" alt=""><div><b>小獭助手</b><span>${aiNoModel ? '还没接上模型' : '只读你的 Mac · 动手前一定先问你'}</span></div><span class="sp"></span>${ib('refresh', 'aiNew', '', '新对话')}${ib('x', 'ai', '', '收起')}</div>
    ${aiNoModel ? `<div class="msgs" style="justify-content:center">${emptyB('please', '还没接上模型', '小獭助手要用一个大模型来理解你的问题。接上之后，它能读内存、磁盘、启动项，帮你找原因；所有改动都会先问你。', '<button class="slab" data-act="aiSet">去接模型</button>')}</div>`
      : `<div class="msgs" id="msgs">${aiMsgs(AI_SEED)}</div>`}
    <div class="comp">${aiNoModel ? '' : `<div class="sug">${['为什么风扇一直转？', '哪些文件可以删？', '开机为什么慢？'].map((s) => `<span class="chip" data-act="aiSug" data-arg="${s}">${s}</span>`).join('')}</div>`}
      <div class="box"><textarea id="aiIn" placeholder="问小獭，比如：为什么风扇一直转？" ${aiNoModel ? 'disabled' : ''}></textarea><button class="slab" style="height:32px" data-act="aiSendBtn" ${aiNoModel ? 'disabled' : ''}>发送</button></div>
      <div class="mdl"><span>${aiNoModel ? '未配置模型' : 'Doubao‑Seed‑1.6 · 火山方舟'}</span><span>⌘↩ 发送</span></div></div>`;
  const m = $('#msgs'); if (m) m.scrollTop = m.scrollHeight;
}
ACTS.ai = () => { const p = $('#aip'); const on = !p.classList.contains('on'); if (on) aiDraw(); p.classList.toggle('on', on); $('#win').classList.toggle('aion', on); };
ACTS.aiNew = () => { AI_SEED.length = 0; aiDraw(); $('#msgs').innerHTML = emptyB('hi', '想问点什么？', '比如「哪个应用最耗电」「帮我腾出 20 GB」。'); };
ACTS.aiSet = () => ACTS.settings('ai');
ACTS.aiSug = (s) => aiSend(s);
ACTS.aiSendBtn = () => { const t = $('#aiIn'); aiSend(t.value); t.value = ''; };
ACTS.aiOk = () => { const n = $('#aiNeed'); n.className = 'tcard'; n.innerHTML = `<div class="h" style="color:var(--ok)">${I('check')}已结束「Google Chrome Helper」</div><div class="muted" style="font-size:11.5px;margin-top:2px">释放了 1.2 GB · 内存回到 ${(S.mem - 1.2).toFixed(1)} GB</div>`; S.mem -= 1.2; flash('小獭结束了 Chrome 后台进程 · 释放 1.2 GB'); };
ACTS.aiNo = () => { const n = $('#aiNeed'); n.className = 'tcard'; n.innerHTML = `<div class="h" style="color:var(--mid)">${I('x')}你选择了先不处理</div>`; };
async function aiSend(q) {
  q = (q || '').trim();
  if (!q || aiNoModel) return;
  const m = $('#msgs');
  if (!m) return;
  if (m.querySelector('.empty')) m.innerHTML = '';
  m.insertAdjacentHTML('beforeend', `<div class="mu">${q}</div><div class="ma" id="aiTyping"><img src="${ex('think', true)}" alt=""><div><div class="meta">小獭 · 正在看……</div><div class="bb"><span class="spin" style="width:12px;height:12px;display:inline-block"></span></div></div></div>`);
  m.scrollTop = m.scrollHeight;
  await wait(1100);
  const r = /风扇|热|温度/.test(q) ? { tools: [['读取温度与功耗', 'CPU 46°C · 风扇 1,240 转']], tail: '温度还算正常。风扇主要是 <b>Xcode 编译</b>和 <b>mds_stores（聚焦索引）</b>在跑，索引大约 10 分钟后结束。要我把 Xcode 的并行编译数调低吗？' }
    : /删|空间|清理|文件/.test(q) ? { tools: [['扫描垃圾', `${S.junk.toFixed(1)} GB 可清理`], ['扫描大文件', '8 个超过 1 GB']], tail: `最稳的是先清 <b>${S.safe || 8.2} GB</b> 缓存和日志（都进废纸篓，能放回来）。大头是 <b>Windows 11 虚拟机 24.6 GB</b>，半年没开了。<br><a data-act="go" data-arg="clean:junk" style="color:var(--accent);cursor:pointer">去清理 →</a>` }
    : /开机|启动|慢/.test(q) ? { tools: [['读取启动项', '7 个随开机启动']], tail: 'Docker 和 Adobe 的后台服务各拖慢约 2 秒。关掉它们开机能快 4 秒左右，需要时再打开就行。<br><a data-act="go" data-arg="boost:start" style="color:var(--accent);cursor:pointer">去看看启动项 →</a>' }
    : { tail: '我能帮你看内存、磁盘、启动项、电池和网络，也能帮你清理。具体想解决什么？' };
  $('#aiTyping').outerHTML = aiMsgs([{ a: '', img: 'calm', ...r }]);
  m.scrollTop = m.scrollHeight;
}
$('#aip').addEventListener('keydown', (e) => { if (e.target.id === 'aiIn' && e.metaKey && e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); ACTS.aiSendBtn(); } });

/* ══ 设置 ═══════════════════════════════════════════ */
const SPANES = [
  ['general', '通用', 'gear', '#8A94A6', 'hi', '开机、更新和数据'], ['look', '外观', 'sun', '#E8B04B', 'happy', '主题、动效和小獭'], ['perm', '权限', 'lock', '#5FC9E8', 'please', '小獭需要哪些权限、为什么'],
  ['alert', '提醒', 'bell', '#FF6B6B', 'think', '什么时候叫你'], ['menubar', '菜单栏', 'up', '#9B8BE8', 'calm', '菜单栏里的小獭'], ['scope', '清理范围', 'folder', '#6EE7A8', 'bath', '扫哪里、不碰哪里'],
  ['keys', '快捷键', 'kbd', '#A09BB4', 'focus', '全局快捷键'], ['ai', '小獭助手', 'robot', '#FF8A3D', 'study', '接哪个模型、能做什么'], ['about', '关于', 'info', '#8A94A6', 'proud', '版本和水獭家族'],
];
const SET = { login: true, stay: true, upd: true, lang: '简体中文', water: true, side: true, junkAlert: true, memAlert: true, weekly: true, diskAt: '20 GB', mbShow: '小獭 + CPU', mbClick: '浮窗', prov: '火山方舟', aiRead: true,
  scope: { 系统缓存: 1, 应用缓存: 1, 日志与诊断报告: 1, 'Xcode 派生数据': 1, 下载的安装包: 1, 邮件附件: 0, '旧的 iOS 设备备份': 0 } };
let sPane = 'general';
const srow = (ic, c, t, s, right) => `<div class="srow">${ic ? `<span class="b" style="--c:${c}">${I(ic)}</span>` : ''}<div class="tx"><b>${t}</b>${s ? `<span>${s}</span>` : ''}</div>${right}</div>`;
const mseg = (key, opts) => `<div class="mini-seg">${opts.map((o) => `<button class="${SET[key] === o ? 'on' : ''}" data-act="setSeg" data-arg="${key}|${o}">${o}</button>`).join('')}</div>`;
const ssw = (key) => sw(SET[key], 'setSw', key);
const SPANE = {
  general: () => `<div class="slabel">启动</div><div class="sgroup">${srow('power', '#6EE7A8', '开机时启动', '登录后小獭在菜单栏待命', ssw('login'))}${srow('up', '#9B8BE8', '关掉窗口后留在菜单栏', '关掉了也能从菜单栏打开', ssw('stay'))}</div>
    <div class="slabel">语言与更新</div><div class="sgroup">${srow('dns', '#5FC9E8', '语言', '', mseg('lang', ['简体中文', 'English']))}${srow('refresh', '#E8B04B', '自动检查更新', '当前 v2.0.0 · 已是最新', ssw('upd'))}</div>
    <div class="slabel">数据</div><div class="sgroup">${srow('dl', '#8A94A6', '导出设置', '清理范围、白名单和快捷键', '<button class="ghost" data-act="flashMsg" data-arg="设置已导出到「下载」">导出</button>')}${srow('refresh', '#FF6B6B', '恢复默认设置', '石头罐和清理记录会保留', '<button class="ghost" data-act="setReset" style="color:var(--alarm)">恢复默认</button>')}</div>`,
  look: () => `<div class="slabel">主题</div><div class="sgroup">${srow('moon', '#9B8BE8', '外观', '跟随系统时，晚上自动变暗', `<div class="mini-seg">${[['auto', '跟随系统'], ['night', '夜间'], ['day', '白天']].map(([k, t]) => `<button class="${(k === S.theme) ? 'on' : ''}" data-act="setTheme" data-arg="${k}">${t}</button>`).join('')}</div>`)}
      ${srow('drop', '#FF8A3D', '强调色', '水獭工具固定用獭橙，和家族里的其他产品区分开', '<span style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#FA5A1E,#FFB04A)"></span>')}</div>
    <div class="slabel">动效</div><div class="sgroup">${srow('drop', '#5FC9E8', '活水背景', '水位、浑浊、波速跟着机器状态变', ssw('water'))}${srow('spark', '#E8B04B', '减弱动效', '只保留淡入淡出；系统的「减弱动态效果」打开时自动生效', sw(forceRM, 'setRM', ''))}${srow('hi', '#FF8A3D', '侧栏显示小獭', '关掉后只显示状态文字', ssw('side'))}</div>`,
  perm: () => `<div class="banner" style="--t:var(--calm);margin-bottom:12px"><img src="${ex('calm')}" alt=""><div><b>小獭只读不改</b><span>任何删除、结束进程的操作都会先弹窗问你。权限随时可以在系统设置里收回。</span></div></div>
    <div class="sgroup">${[['disk', '#5FC9E8', '完全磁盘访问', '扫描缓存、日志和其他应用的数据', 1], ['hand', '#9B8BE8', '辅助功能', '结束进程、管理启动项', 1], ['bell', '#FF6B6B', '通知', '清理完成、磁盘快满时提醒你', 1], ['robot', '#A09BB4', '自动化（访达）', '清空废纸篓、在访达中显示', 0], ['loc', '#6EE7A8', '定位服务', '只在读取 Wi‑Fi 名称时需要', 0]]
      .map(([ic, c, t, s, ok]) => srow(ic, c, t, s, ok ? tag(`${I('check').replace('class="i"', 'class="i" style="width:10px;height:10px"')}已允许`, 'ok') : `<button class="ghost" data-act="onb" data-arg="${t}">去打开</button>`)).join('')}</div>`,
  alert: () => `<div class="sgroup">${srow('disk', '#FF6B6B', '磁盘快满时提醒', '剩余空间低于', mseg('diskAt', ['10 GB', '20 GB', '50 GB']))}${srow('clean', '#5FC9E8', '垃圾攒多了提醒', '可清理超过 5 GB 时', ssw('junkAlert'))}${srow('mem', '#FFAA5A', '内存紧张提醒', '压力持续「紧张」1 分钟以上', ssw('memAlert'))}${srow('pulse', '#6EE7A8', '每周小结', '周日 20:00 · 这周清了多少、石头罐多了几颗', ssw('weekly'))}</div>
    <div class="slabel">勿扰</div><div class="sgroup">${srow('moon', '#9B8BE8', '夜间不打扰', '23:00 – 08:00 只在菜单栏变色，不弹通知', sw(true, 'flashMsg', '原型里固定开启'))}</div>`,
  menubar: () => `<div class="sgroup">${srow('up', '#9B8BE8', '菜单栏显示', '', mseg('mbShow', ['只有小獭', '小獭 + CPU', '小獭 + 网速']))}${srow('apps', '#5FC9E8', '点击菜单栏图标', '', mseg('mbClick', ['浮窗', '主窗口']))}</div>
    <div class="slabel">小獭的样子</div><div class="sgroup">${srow('', '', '状态会写在小獭脸上', '平静时睡觉 · 忙时睁眼 · 内存告急时冒汗 · 防止休眠时一直睁着眼', '<img src="brand/otter_white.png" style="width:22px;height:22px;background:#1b1829;border-radius:6px;padding:3px" alt="">')}</div>
    <button class="ghost lg" data-act="setTray">预览菜单栏浮窗</button>`,
  scope: () => `<div class="slabel">扫描这些</div><div class="sgroup">${Object.entries(SET.scope).map(([k, v]) => srow('', '', k, k === '邮件附件' || k === '旧的 iOS 设备备份' ? '默认关闭 · 扫出来也不会默认勾选' : '', sw(v, 'setScope', k))).join('')}</div>
    <div class="slabel">白名单 · 永远不碰</div><div class="sgroup">${['~/Projects', '~/Library/Caches/com.figma.Desktop', '~/Movies/Final Cut 素材'].map((p) => srow('folder', '#6EE7A8', `<span style="font-family:var(--mono);font-size:12.5px">${p}</span>`, '', ib('x', 'flashMsg', `已从白名单移除 ${p}`, '移除'))).join('')}${srow('', '', '', '', '<button class="ghost" data-act="flashMsg" data-arg="已添加到白名单">添加文件夹…</button>')}</div>`,
  keys: () => `<div class="sgroup">${[['一键养护', ['⌘', '↩']], ['命令面板', ['⌘', 'K']], ['打开菜单栏浮窗', ['⌥', '⌘', 'O']], ['剪切板历史', ['⌥', '⌘', 'V']], ['释放内存', ['⌥', '⌘', 'M']], ['设置', ['⌘', ',']]]
    .map(([t, k]) => srow('', '', t, '', `<span style="display:flex;gap:3px">${k.map((x) => `<kbd>${x}</kbd>`).join('')}</span><button class="ghost" data-act="flashMsg" data-arg="按下新的快捷键……（原型）">修改</button>`)).join('')}</div>
    <div class="muted">全局快捷键在别的应用里也能用。和其他应用冲突时，小獭会提醒你。</div>`,
  ai: () => `<div class="slabel">模型</div><div class="sgroup">${srow('robot', '#FF8A3D', '服务商', '', mseg('prov', ['火山方舟', 'OpenAI 兼容', '本地 Ollama']))}
      ${srow('lock', '#5FC9E8', 'API Key', aiNoModel ? '还没填' : '存在钥匙串里', `<div class="srch" style="min-width:220px"><input value="${aiNoModel ? '' : 'ark-••••••••••••3f9a'}" placeholder="粘贴 API Key"></div>`)}
      ${srow('spark', '#E8B04B', '模型', '', `<span class="chip on">Doubao‑Seed‑1.6 ▾</span>`)}${srow('', '', '', '', `<button class="ghost" data-act="aiTest">测试连接</button>`)}</div>
    <div class="slabel">小獭能做什么</div><div class="sgroup">${srow('eye', '#6EE7A8', '读取本机状态', '内存、磁盘、启动项、电池、网络', ssw('aiRead'))}${srow('hand', '#FF6B6B', '动手前先问你', '清理、结束进程这类操作，每次都会弹确认卡', tag(`${I('lock').replace('class="i"', 'class="i" style="width:10px;height:10px"')}一直开启`, 'acc'))}</div>`,
  about: () => `<div style="text-align:center;padding:10px 0 4px"><img src="brand/tools_icon.png" data-act="aboutLogo" style="width:96px;height:96px;cursor:pointer" alt=""><h2 style="font-size:20px;font-weight:800;margin-top:10px">水獭工具</h2><div class="muted">v2.0.0（2611）· 小獭帮你看着这台 Mac</div>
      <div style="display:flex;gap:8px;justify-content:center;margin-top:12px"><button class="ghost" data-act="flashMsg" data-arg="已是最新版本">检查更新</button><button class="ghost" data-act="flashMsg" data-arg="已打开更新日志">更新日志</button><button class="ghost" data-act="flashMsg" data-arg="已打开反馈页">反馈</button></div></div>
    ${familyHtml()}<div class="muted" style="text-align:center;margin-top:14px">© 2026 水獭家族 · 石头罐里 ${S.pebbles} 颗石子，一共帮你清掉 ${S.freed.toFixed(1)} GB</div>`,
};
const familyHtml = () => `<div class="family"><div><img src="brand/otter_git_icon.png" alt="">水獭 Git</div><div class="cur"><img src="brand/tools_icon.png" alt="">水獭工具</div><div><img src="brand/family_gametime.png" alt="">游时记</div></div>`;
function sMain() {
  const p = SPANES.find((x) => x[0] === sPane);
  return `<button class="ibs xbtn" data-act="close" data-tip="关闭 esc">${I('x')}</button><div class="shead"><img src="${ex(p[4])}" alt=""><div><h2>${p[1]}</h2><p>${p[5]}</p></div></div><div class="sbody"><div class="in2">${SPANE[sPane]()}</div></div>`;
}
function sKnot() { const on = $('.settings .ni.on'), k = $('.settings .knot'); if (on && k) k.style.top = on.offsetTop + on.offsetHeight / 2 - 5 + 'px'; }
ACTS.settings = (pane) => {
  if (pane && SPANE[pane]) sPane = pane;
  ACTS.palClose(); ACTS.trayClose();
  openDlg(`<div class="snav"><div class="home-card"><img src="brand/tools_icon.png" alt=""><div><b>水獭工具</b><span class="v">v2.0.0 · 水獭家族</span></div></div>
      <div class="navlist"><span class="rail"></span><span class="knot"></span>${SPANES.map(([k, t, ic, c]) => `<div class="ni${k === sPane ? ' on' : ''}" data-act="sPane" data-arg="${k}" style="--c:${c}"><span class="b">${I(ic)}</span>${t}</div>`).join('')}</div></div>
    <div class="smain">${sMain()}</div>`, 'settings');
  requestAnimationFrame(sKnot);
};
ACTS.sPane = (k) => { sPane = k; $$('.settings .ni').forEach((n) => n.classList.toggle('on', n.dataset.arg === k)); $('.settings .smain').innerHTML = sMain(); sKnot(); };
const sRedraw = () => { const b = $('.settings .sbody'); if (!b) return; const st = b.scrollTop; $('.settings .smain').innerHTML = sMain(); $('.settings .in2').style.animation = 'none'; $('.settings .sbody').scrollTop = st; };
ACTS.setSw = (k) => { SET[k] = !SET[k]; sRedraw(); flash(`已${SET[k] ? '开启' : '关闭'}`); };
ACTS.setSeg = (a) => { const [k, v] = a.split('|'); SET[k] = v; sRedraw(); };
ACTS.setScope = (k) => { SET.scope[k] = SET.scope[k] ? 0 : 1; sRedraw(); };
ACTS.setTheme = (k) => { S.theme = k === 'auto' ? (S.time === 'night' ? 'night' : 'day') : k; update(); syncConsole(); sRedraw(); if (k === 'auto') flash('已跟随系统外观'); };
ACTS.setRM = () => { forceRM = !forceRM; sRedraw(); syncConsole(); flash(forceRM ? '已减弱动效' : '动效已恢复'); };
ACTS.setReset = () => ask({ img: 'think', title: '恢复默认设置？', p: '清理范围、白名单、快捷键和提醒都会回到默认值。石头罐和清理记录会保留。', ok: '恢复默认', act: 'setResetGo' });
ACTS.setResetGo = () => { closeDlg(); flash('已恢复默认设置'); };
ACTS.setTray = () => { closeDlg(); setTimeout(ACTS.tray, 280); };
ACTS.aiTest = async (a, el) => { el.innerHTML = '<span class="spin"></span>连接中'; await wait(900); el.textContent = '测试连接'; if (aiNoModel) { aiNoModel = false; if ($('#aip').classList.contains('on')) aiDraw(); } flash('连接正常 · Doubao‑Seed‑1.6 · 延迟 320 ms'); };

/* ══ 关于 ═══════════════════════════════════════════ */
ACTS.about = () => {
  openDlg(`<button class="ibs xbtn" data-act="close">${I('x')}</button>
    <div class="logo" id="abLogo" data-act="aboutLogo" style="position:relative;cursor:pointer"><img class="l1" src="brand/tools_icon.png" style="width:120px;height:120px;position:absolute;inset:0" alt=""></div>
    <h2>水獭工具</h2><div class="tg">小獭帮你看着这台 Mac</div><div class="muted num" style="margin-top:4px">v2.0.0（2611）· macOS 14 及以上</div>
    ${familyHtml()}<div style="display:flex;gap:8px;justify-content:center;margin-top:18px"><button class="ghost" data-act="flashMsg" data-arg="已是最新版本">检查更新</button><button class="ghost" data-act="flashMsg" data-arg="已打开官网">官网</button><button class="ghost" data-act="close">关闭</button></div>
    <div class="muted" style="margin-top:12px;font-size:11.5px">点图标可以再看一次小獭醒来</div>`, 'about');
  ACTS.aboutLogo();
};
ACTS.aboutLogo = (a, el) => {
  const t = (el && el.tagName === 'IMG' ? el : $('#abLogo img')) || null;
  if (!t) return;
  gsap.fromTo(t, { scale: 0.4, rotate: -12, autoAlpha: 0 }, { scale: 1, rotate: 0, autoAlpha: 1, duration: D(0.7), ease: 'back.out(1.8)' });
};

/* ══ 权限引导 ═══════════════════════════════════════ */
ACTS.onb = (perm = '完全磁盘访问') => {
  openDlg(`<div style="display:flex;gap:16px;align-items:center"><img src="${ex('please')}" style="width:84px;height:84px;animation:float 2.4s ease-in-out infinite" alt=""><div><h3>给小獭开一下「${perm}」</h3><p class="muted" style="margin-top:4px">不开也能用，只是${perm === '完全磁盘访问' ? '扫不到应用缓存和日志，能清的会少一大半' : perm === '辅助功能' ? '结束进程、管理启动项用不了' : perm === '定位服务' ? '看不到 Wi‑Fi 名称和附近的网络' : '有些操作用不了'}。小獭只读不改，删除前一定先问你。</p></div></div>
    <div class="st3"><div><i>01</i><b>打开系统设置</b>点下面的按钮，会直接跳到「隐私与安全性 › ${perm}」</div><div><i>02</i><b>打开水獭工具的开关</b>可能要输入开机密码或用触控 ID</div><div><i>03</i><b>回到这里</b>小獭会自动发现，不用重启</div></div>
    <div style="display:flex;gap:8px;align-items:center"><button class="slab" data-act="onbGo" data-arg="${perm}">打开系统设置</button><button class="ghost lg" data-act="close">以后再说</button><span style="flex:1"></span><span class="muted" style="font-size:12px;display:flex;align-items:center;gap:6px">${I('lock').replace('class="i"', 'class="i" style="width:13px;height:13px"')}权限随时可以收回</span></div>`, 'onb');
};
ACTS.onbGo = async (perm, el) => {
  el.innerHTML = '<span class="spin"></span>等你打开开关……';
  await wait(1800);
  closeDlg();
  if (S.page !== 'home') { S.pst = 'normal'; rerender(); syncConsole(); }
  setTimeout(() => moment({ img: 'cheer', title: `「${perm}」已打开`, sub: '谢谢！小獭现在能看得更全了。' }), 300);
};

/* ?shot：隐藏演示台、窗口铺满视口（截图 / 演示用）；?go=clean:junk 直达 */
const QS = new URLSearchParams(location.search);
if (QS.has('shot')) {
  gsap.ticker.lagSmoothing(0);
  $('#console').style.display = 'none';
  Object.assign(win.style, { position: 'fixed', left: '12px', top: '12px', transformOrigin: '0 0', margin: '0' });
  window.fit = () => { scale = Math.min((innerWidth - 24) / 1280, (innerHeight - 24) / 800); win.style.transform = `scale(${scale})`; };
  fit();
  addEventListener('resize', () => window.fit());
}
if (QS.get('go')) setTimeout(() => go(QS.get('go')), QS.has('nosplash') ? 0 : RM() ? 700 : 3200);

/* ══ 演示台（重写：页面 / 状态 / 浮层） ═══════════════ */
(function consoleV2() {
  const grp = (h, k, opts) => `<h2>${h}</h2><div class="opt" data-k="${k}">${opts.map(([v, t]) => `<button data-v="${v}">${t}</button>`).join('')}</div>`;
  const pages = [['home', '概览'], ['check', '体检'], ...Object.entries(SEGS).flatMap(([p, segs]) => segs.map(([id, t]) => [`${p}:${id}`, t]))];
  $('#console').innerHTML = `<h1>水獭工具 · 原型</h1><div class="sub">全部页面 · 浮层 · 状态 · 1280×800</div>
    ${grp('主题', 'theme', [['night', '夜'], ['day', '昼']])}
    ${grp('机器状态（驱动水面与小獭）', 'preset', [['calm', '平静'], ['busy', '忙碌'], ['alarm', '内存告急'], ['full', '磁盘将满']])}
    ${grp('时段', 'time', [['morning', '早上'], ['afternoon', '下午'], ['night', '深夜']])}
    ${grp('页面', 'pageKey', pages)}
    ${grp('页面状态（概览以外）', 'pst', [['normal', '正常'], ['loading', '加载中'], ['empty', '空'], ['error', '出错'], ['denied', '无权限']])}
    <h2>浮层</h2><div class="opt"><button data-ov="tray">菜单栏浮窗</button><button data-ov="pal">⌘K</button><button data-ov="ai">小獭助手</button><button data-ov="aiNo">助手·未接模型</button><button data-ov="settings">设置</button><button data-ov="about">关于</button><button data-ov="onb">权限引导</button><button data-ov="share">分享卡</button></div>
    <h2>演示</h2><div class="opt"><button data-do="splash">重放启动</button><button data-do="care">一键养护</button><button data-do="mem">释放内存</button><button data-do="rm">减弱动效</button></div>
    <p>弹窗全部居中：确认 → 原地变成进度 → 原地变成结果（4.8 秒自动关，悬停暂停）。小事只在底部状态栏闪一下，能撤销的带「撤销」。</p>
    <p>可恢复（进废纸篓）用橙色按钮 + 结果里给撤销；不可恢复（清空废纸篓、清除痕迹、强制结束）用红色按钮。</p>
    <p>快捷键：<b>⌘K</b> 命令面板 · <b>⌘↩</b> 一键养护 · <b>⌘,</b> 设置 · <b>esc</b> 关闭。</p>`;
  $('#console').addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    const k = b.parentElement.dataset.k;
    if (b.dataset.do === 'mem' && S.page !== 'home') { go('boost:mem'); return; }
    if (k === 'pageKey') go(b.dataset.v);
    else if (k === 'pst') { if (S.page === 'home') go('clean:junk'); S.pst = b.dataset.v; rerender(); }
    else if (k === 'preset' || k === 'theme') { if (S.page !== 'home') setTimeout(rerender, 0); }
    const ov = b.dataset.ov;
    if (ov === 'aiNo') { aiNoModel = true; if ($('#aip').classList.contains('on')) aiDraw(); else ACTS.ai(); }
    else if (ov === 'ai') { aiNoModel = false; if ($('#aip').classList.contains('on')) aiDraw(); else ACTS.ai(); }
    else if (ov === 'share') ACTS.share();
    else if (ov) ACTS[ov]();
    syncConsole();
  });
  syncConsole();
})();
