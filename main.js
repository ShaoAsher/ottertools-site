/* ============================================================
   水獭工具 OtterTools — 交互脚本
   1. 顶栏滚动变实底
   2. 区块滚动入场
   3. 主题切换（截图联动）
   4. 视频播放控制
   ============================================================ */

(function () {
  "use strict";

  /* ── 1. 顶栏 ───────────────────────────────────────────── */
  var nav = document.getElementById("nav");
  var lastSolid = null;

  function onScroll() {
    if (!nav) return;
    var solid = window.scrollY > 24;
    if (solid !== lastSolid) {
      nav.classList.toggle("is-solid", solid);
      lastSolid = solid;
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ── 2. 滚动入场 ───────────────────────────────────────── */
  var revealTargets = document.querySelectorAll(
    ".sec-head, .feat, .stat, .theme-row, .theme-showcase, .video-frame, .dl-copy, .dl-otter, .faq-list, .screen-card",
  );

  revealTargets.forEach(function (el) {
    el.classList.add("reveal");
  });

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          // 同一批元素错峰出现，读起来像一页页翻过去
          var siblings = Array.prototype.slice.call(el.parentNode.children);
          var idx = Math.max(0, siblings.indexOf(el));
          el.style.transitionDelay = Math.min(idx * 70, 350) + "ms";
          el.classList.add("is-in");
          io.unobserve(el);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    revealTargets.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealTargets.forEach(function (el) {
      el.classList.add("is-in");
    });
  }

  /* ── 3. 主题切换 ───────────────────────────────────────── */
  var THEMES = {
    light: {
      shot: "assets/img/home_light.jpg",
      caption: "浅色 · 冷银底、白卡片、字看得清",
    },
    dark: {
      shot: "assets/img/home.jpg",
      caption: "深色 · 近黑底、只有一点电光青，夜里不刺眼",
    },
    system: {
      shot: "assets/img/home_light.jpg",
      caption: "跟随系统 · 白天浅色，入夜自动转深",
    },
  };

  var themeCards = document.querySelectorAll(".theme-card");
  var themeShot = document.getElementById("themeShot");
  var themeCaption = document.getElementById("themeCaption");

  themeCards.forEach(function (card) {
    card.addEventListener("click", function () {
      var key = card.getAttribute("data-theme");
      var conf = THEMES[key];
      if (!conf || card.classList.contains("is-active")) return;

      themeCards.forEach(function (c) {
        c.classList.remove("is-active");
      });
      card.classList.add("is-active");

      themeShot.classList.add("is-fading");
      window.setTimeout(function () {
        themeShot.src = conf.shot;
        themeShot.alt = conf.caption;
        themeCaption.textContent = conf.caption;
        themeShot.classList.remove("is-fading");
      }, 220);
    });
  });

  /* ── 4. 视频：自定义控制条（进度 / 拖拽快进 / 全屏） ──── */
  var video = document.getElementById("promoVideo");
  var frame = document.getElementById("videoFrame");
  var playBtn = document.getElementById("videoPlay");
  var vcPlay = document.getElementById("vcPlay");
  var bar = document.getElementById("vcBar");
  var fill = document.getElementById("vcFill");
  var knob = document.getElementById("vcKnob");
  var tip = document.getElementById("vcTip");
  var curEl = document.getElementById("vcCur");
  var durEl = document.getElementById("vcDur");
  var fsBtn = document.getElementById("vcFs");

  if (video && frame && bar) {
    var scrubbing = false;
    var idleTimer = null;

    function fmt(sec) {
      if (!isFinite(sec) || sec < 0) sec = 0;
      var s = Math.floor(sec);
      return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
    }

    function paint(t) {
      var d = video.duration || 0;
      var p = d > 0 ? Math.min(1, Math.max(0, t / d)) : 0;
      fill.style.width = p * 100 + "%";
      knob.style.left = p * 100 + "%";
      curEl.textContent = fmt(t);
      bar.setAttribute("aria-valuenow", Math.round(p * 100));
      bar.setAttribute("aria-valuetext", fmt(t) + " / " + fmt(d));
    }

    function syncState() {
      var playing = !video.paused && !video.ended;
      frame.classList.toggle("is-playing", playing);
      if (playBtn) playBtn.classList.toggle("is-hidden", playing || video.ended);
      armIdle();
    }

    function armIdle() {
      frame.classList.remove("is-idle");
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(function () {
        if (!video.paused) frame.classList.add("is-idle");
      }, 2600);
    }

    function toggle() {
      if (video.paused || video.ended) {
        video.play();
      } else {
        video.pause();
      }
    }

    video.addEventListener("loadedmetadata", function () {
      durEl.textContent = fmt(video.duration);
      paint(video.currentTime);
    });
    video.addEventListener("timeupdate", function () {
      if (!scrubbing) paint(video.currentTime);
    });
    video.addEventListener("play", syncState);
    video.addEventListener("pause", syncState);
    video.addEventListener("ended", function () {
      video.currentTime = 0;
      paint(0);
      syncState();
    });
    if (video.readyState >= 1) {
      durEl.textContent = fmt(video.duration);
      paint(video.currentTime);
    }

    if (playBtn) playBtn.addEventListener("click", toggle);
    if (vcPlay) vcPlay.addEventListener("click", toggle);
    video.addEventListener("click", toggle);

    /* 进度条：点击 / 拖拽 / 触摸 —— 全部走 Pointer Events */
    function ratioAt(e) {
      var r = bar.getBoundingClientRect();
      return Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    }

    function seekTo(ratio) {
      if (!video.duration) return;
      video.currentTime = ratio * video.duration;
      paint(video.currentTime);
    }

    bar.addEventListener("pointerdown", function (e) {
      scrubbing = true;
      bar.classList.add("is-dragging");
      try {
        bar.setPointerCapture(e.pointerId);
      } catch (err) {}
      seekTo(ratioAt(e));
      armIdle();
      e.preventDefault();
    });

    bar.addEventListener("pointermove", function (e) {
      var r = ratioAt(e);
      tip.textContent = fmt(r * (video.duration || 0));
      tip.style.left = r * 100 + "%";
      if (scrubbing) seekTo(r);
    });

    function endScrub(e) {
      if (!scrubbing) return;
      scrubbing = false;
      bar.classList.remove("is-dragging");
      try {
        bar.releasePointerCapture(e.pointerId);
      } catch (err) {}
      armIdle();
    }
    bar.addEventListener("pointerup", endScrub);
    bar.addEventListener("pointercancel", endScrub);

    bar.addEventListener("keydown", function (e) {
      var d = video.duration || 0;
      if (!d) return;
      var handled = true;
      if (e.key === "ArrowRight") seekTo(Math.min(1, (video.currentTime + 5) / d));
      else if (e.key === "ArrowLeft") seekTo(Math.max(0, (video.currentTime - 5) / d));
      else if (e.key === "Home") seekTo(0);
      else if (e.key === "End") seekTo(1);
      else if (e.key === " " || e.key === "Enter") toggle();
      else handled = false;
      if (handled) {
        e.preventDefault();
        armIdle();
      }
    });

    /* 全屏 */
    if (fsBtn) {
      fsBtn.addEventListener("click", function () {
        var doc = document;
        if (doc.fullscreenElement || doc.webkitFullscreenElement) {
          (doc.exitFullscreen || doc.webkitExitFullscreen).call(doc);
        } else if (frame.requestFullscreen) {
          frame.requestFullscreen();
        } else if (frame.webkitRequestFullscreen) {
          frame.webkitRequestFullscreen();
        }
      });
    }

    frame.addEventListener("mousemove", armIdle);
    frame.addEventListener("mouseleave", function () {
      if (!video.paused) frame.classList.add("is-idle");
    });
    armIdle();
  }
})();
