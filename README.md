# 水獭工具 OtterTools — 官网

OtterTools 产品落地页。纯静态（HTML + CSS + 原生 JS），没有构建步骤，双击 `index.html` 或丢到任何静态托管上就能跑。

- 站点（GitHub Pages）：https://shaoasher.github.io/ottertools-site/
- 仓库：https://github.com/ShaoAsher/ottertools-site
- 安装包：`assets/水獭工具-1.1.0-arm64.dmg`（已 Developer ID 签名 + Apple 公证），
  同时发在 Releases：https://github.com/ShaoAsher/ottertools-site/releases/latest/download/OtterTools-macos-arm64.dmg

> 本仓只放官网与安装包，**不含 App 源码**。

## 目录

```
ottertools-site/
├─ index.html            页面结构（首屏 / 数字 / 功能 / 主题 / 短片 / 下载 / FAQ / 页脚）
├─ style.css             全部样式，设计令牌在文件顶部 :root
├─ main.js               滚动变实底、区块入场、主题切换、视频播放
└─ assets/
   ├─ img/               截图、logo、吉祥物
   ├─ video/             宣传片（63s，来自 ottertools-promo）
   └─ 水獭工具-1.1.0-arm64.dmg   下载按钮指向的安装包
```

## 本地预览

```bash
cd ottertools-site
python3 -m http.server 8899
# 打开 http://127.0.0.1:8899
```

> 直接双击 `index.html` 也能看，但 `file://` 下浏览器可能拦视频自动播放，用本地服务器更稳。

## 改东西的位置

| 想改什么 | 去哪 |
|---|---|
| 文案 | `index.html`，中文都在标签里，没有模板变量 |
| 配色 | `style.css` 顶部 `:root`，`--ink` `--teal` `--mint` 三个是主色 |
| 下载链接 | `index.html` 里 `href="assets/水獭工具-1.1.0-arm64.dmg"`，换版本时改文件名 |
| 主题展示截图 | `assets/img/theme_fresh.jpg` / `theme_cyber.jpg` / `theme_midnight.jpg` / `theme_system.jpg` |
| 视频 | 覆盖 `assets/video/ottertools-promo.mp4` 即可 |

## 设计说明

视觉语言直接沿用宣传片：薄荷绿 `#0DB5A6` + 深墨 `#0A2E2B`，3px 描边配硬投影（无模糊），
大字报式标题。主题切换那张预览图是照 App 的两套 `AppPalette` 做的 CSS 示意，不是截图。

## 上线前记得

- [ ] 换掉 DMG（当前是 1.1.0 arm64，Intel 版还没打）
- [ ] Windows 版按钮现在是禁用态，打包好之后替换
- [ ] 加真实域名 / 统计代码（现在没有任何第三方脚本）
