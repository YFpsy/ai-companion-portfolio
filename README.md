# FAYNE AI 陪伴作品集

## 本地预览

打开本目录的 `index.html` 即可浏览，五个页面可离线打开。也可以在此目录运行 `python -m http.server 8000`，再访问本机的 `http://localhost:8000/`。

## 修改内容

- `index.html` 是首页，`meituan.html`、`conversation.html`、`prompt.html`、`hardware.html` 是四个项目页。
- `style.css` 管理全站样式，`app.js` 管理移动导航、示例切换和 Prompt 复制。
- 美团图表的数据在 `data/charts.json`，只保留展示用百分比。修改图表时，同步更新 `meituan.html` 中对应的行文字和 `--fill` 数值，确保离线页面也能显示最新图表。

## 部署到 GitHub Pages

1. 将本目录里的文件提交到目标仓库所选的发布位置，保持 `index.html` 位于发布根目录。
2. 在仓库的 **Settings → Pages** 中选择 **Deploy from a branch**，指定分支及对应的根目录或 `/docs`，然后保存。
3. 通过 Pages 面板提供的地址检查导航、移动端版式和复制按钮。
