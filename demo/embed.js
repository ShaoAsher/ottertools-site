/* ═══ 嵌入模式：官网用 iframe 载入 index.html?embed ═══
   ?embed           隐藏右侧演示台，窗口按 iframe 尺寸缩放
   &theme=day       浅色
   &preset=busy     机器状态（calm / busy / alarm / full）
   &time=afternoon  时段（morning / afternoon / night）
   &go=clean:junk   起始页
   &nosplash        跳过启动动画（在 app.js 里判断）
   外部控制：postMessage({type:'otter-demo',action,value}) 或 window.demo.<action>(value)
   状态回传：parent 收到 {type:'otter-demo-state',page,theme,preset,ai} */
(() => {
  const q = new URLSearchParams(location.search);
  const report = () => {
    if (parent === window) return;
    parent.postMessage({ type: 'otter-demo-state', page: S.pageKey || S.page, theme: S.theme, preset: S.preset, ai: $('#aip').classList.contains('on') }, '*');
  };
  const setPreset = (v) => {
    if (!PRESETS[v]) return;
    const old = S.score;
    Object.assign(S, JSON.parse(JSON.stringify(PRESETS[v])), { preset: v, safe: 8.2 });
    update();
    if (S.page === 'home') scoreIn(old, S.score); else rerender();
  };
  const setTheme = (v) => { S.theme = v === 'day' ? 'day' : 'night'; update(); if (S.page !== 'home') rerender(); };
  const closeAll = () => { if ($('#pal').classList.contains('on')) ACTS.palClose(); if ($('#tray').classList.contains('on')) ACTS.trayClose(); if ($('#aip').classList.contains('on')) ACTS.ai(); closeDlg(); };
  const actions = {
    page: (v) => { closeAll(); go(v); },
    theme: setTheme,
    preset: setPreset,
    care: () => { if (S.page !== 'home') go('home'); setTimeout(askCare, 260); },
    mem: () => { closeAll(); if (S.page !== 'home') go('home'); setTimeout(releaseMem, 260); },
    ai: () => { closeDlg(); ACTS.ai(); },
    tray: () => { closeDlg(); ACTS.tray(); },
    pal: () => { closeDlg(); ACTS.pal(); },
    settings: () => { closeAll(); ACTS.settings(); },
    reset: () => location.reload(),
  };
  window.demo = actions;
  addEventListener('message', (e) => {
    const d = e.data;
    if (d && d.type === 'otter-demo' && actions[d.action]) { actions[d.action](d.value); setTimeout(report, 60); }
  });
  const _go = go;
  go = (arg) => { _go(arg); report(); };
  win.addEventListener('click', () => setTimeout(report, 60));

  if (q.get('theme')) setTheme(q.get('theme'));
  if (q.get('time')) { S.time = q.get('time'); update(); }
  if (q.get('preset')) setPreset(q.get('preset'));
  if (!q.has('embed')) return;
  document.documentElement.classList.add('embed');
  document.head.insertAdjacentHTML('beforeend', '<style>.embed #console{display:none}.embed #stage{padding:0}.embed,.embed body{background:transparent}.embed #win{box-shadow:none}</style>');
  window.fit = () => { scale = Math.max(0.2, Math.min((innerWidth - 2) / 1280, (innerHeight - 2) / 800, 1.25)); win.style.transform = `scale(${scale})`; };
  addEventListener('resize', () => window.fit());
  window.fit();
  report();
})();
