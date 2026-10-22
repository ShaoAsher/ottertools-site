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
    fresh: {
      shot: "assets/img/theme_fresh.jpg",
      caption: "清新简约 · 白卡片、青绿色、字看得清",
    },
    cyber: {
      shot: "assets/img/theme_cyber.jpg",
      caption: "赛博科技 · 深空底、霓虹描边、夜里不刺眼",
    },
    midnight: {
      shot: "assets/img/theme_midnight.jpg",
      caption: "午夜蓝 · 深蓝底配冷光，屏幕看着不累",
    },
    system: {
      shot: "assets/img/theme_system.jpg",
      caption: "跟随系统 · 白天清新、入夜自动切深色",
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

  /* ── 4. 视频 ───────────────────────────────────────────── */
  var video = document.getElementById("promoVideo");
  var playBtn = document.getElementById("videoPlay");

  if (video && playBtn) {
    function start() {
      video.play();
      playBtn.classList.add("is-hidden");
    }

    playBtn.addEventListener("click", start);
    video.addEventListener("click", function () {
      if (video.paused) start();
    });
    video.addEventListener("ended", function () {
      playBtn.classList.remove("is-hidden");
      video.currentTime = 0;
    });
    video.addEventListener("pause", function () {
      if (video.currentTime > 0 && !video.ended) {
        playBtn.classList.remove("is-hidden");
      }
    });
  }
})();
