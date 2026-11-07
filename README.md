# 水獭工具 OtterTools — 官网

水獭工具 2.0 的产品落地页。纯静态（一个 `index.html` + 原生 JS + GSAP），没有构建步骤，丢到任何静态托管上就能跑。

- 站点（GitHub Pages）：https://shaoasher.github.io/ottertools-site/
- 仓库：https://github.com/ShaoAsher/ottertools-site
- 安装包只发在 Releases，官网用稳定文件名直链：
  - macOS：https://github.com/ShaoAsher/ottertools-site/releases/latest/download/OtterTools-macos-arm64.dmg
  - Windows：https://github.com/ShaoAsher/ottertools-site/releases/latest/download/OtterTools-windows-x64.zip

> 本仓只放官网，**不含 App 源码，也不放安装包**（源码在私有库 `ShaoAsher/otter-tools`）。

## 目录

```
ottertools-site/
├─ index.html            页面结构与全部样式（设计令牌在 <style> 顶部 :root）
├─ assets/
│  ├─ site.js            背景水面、小獭问候、水面章节切换、在线试用控制、GSAP 动效
│  ├─ vendor/            gsap.min.js、ScrollTrigger.min.js
│  ├─ shots/             2560×1600 WebP 截图，从交互原型截的
│  ├─ og.jpg             分享卡片图
│  └─ *_icon.png         水獭工具 / 水獭 Git 图标
└─ demo/                 交互原型（App 仓 docs/mockup 导出），首页 iframe 嵌入 index.html?embed
```

## 本地预览

```bash
cd ottertools-site
python3 -m http.server 8811
# 打开 http://127.0.0.1:8811
```

## 更新素材（在 App 仓 otter_tools 里执行）

| 要更新什么 | 命令 |
|---|---|
| 在线试用 `demo/` | `./tool/export_demo.sh` |
| 截图 `assets/shots/` | `node tool/site_shots.mjs`（需要 Chrome 和 cwebp） |
| 发新版安装包 | `./tool/release_github.sh`（打包、公证、上传 Release；Windows zip 从 CI 下载到 `dist/` 后会一并上传） |

## 设计说明

画布和 App 深色主题同源：底色 `#0B0A14`，主色獭橙 `#FA5A1E → #FFB04A`。
背景是一片水，颜色和水位跟着当前章节的机器状态变（平静水蓝、忙碌暖橙、告急珊瑚、磁盘将满水位升高），
与 App 首页水面是同一套语义。减少动态效果时所有动效关闭、内容直接落位。
