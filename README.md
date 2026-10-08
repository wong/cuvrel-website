# CUVREL LTD website

纯静态官网项目，可直接发布到 Cloudflare Pages。运行时只使用 HTML、CSS 和少量原生 JavaScript，不需要 PHP、数据库、Node 构建步骤或宝塔。

## 项目结构

```text
cuvrel-website/
├── index.html                 # 首页内容、导航和 SEO 描述
├── assets/
│   ├── css/style.css          # 颜色、排版、布局和响应式样式
│   ├── js/main.js             # 手机导航和动态版权年份
│   ├── icons/favicon.svg      # 浏览器标签图标
│   └── images/                # 放置后续使用的图片
└── README.md                  # 本说明
```

## 以后修改哪些文件

- 修改页面文字、导航、品牌和联系邮箱：编辑 `index.html`。
- 修改颜色、字体大小、间距、动效和手机布局：编辑 `assets/css/style.css`。
- 修改手机菜单或页面交互：编辑 `assets/js/main.js`。
- 替换图标：编辑 `assets/icons/favicon.svg`，或将新图标放入 `assets/images/` 并在 `index.html` 更新引用。
- 添加照片/品牌图：把文件放在 `assets/images/`，然后在 `index.html` 中使用相对路径，例如 `assets/images/team.jpg`。

首页中的品牌行、全球节点和联系信息目前是展示用内容。正式上线前请核对公司注册信息、联系邮箱、品牌名称和隐私/法律页面内容。页脚的 Privacy / Legal 暂时链接至邮件咨询入口；有正式政策页面后，可把它们改为对应页面链接。

## 本地预览

最简单的方法是在文件管理器中打开 `index.html`。如果浏览器对本地文件有任何限制，可以在项目目录运行一个本地静态服务器：

```bash
cd cuvrel-website
python3 -m http.server 8000
```

然后访问 <http://localhost:8000>。结束预览时在终端按 `Ctrl+C`。

## GitHub + Cloudflare Pages 部署

1. 在 GitHub 创建一个空仓库，例如 `cuvrel-website`。
2. 将本项目文件夹中的内容提交并推送到仓库。第一次推送可在此文件夹执行：

   ```bash
   git init
   git add .
   git commit -m "Create CUVREL website"
   git branch -M main
   git remote add origin https://github.com/你的用户名/cuvrel-website.git
   git push -u origin main
   ```

3. 登录 Cloudflare Dashboard，进入 **Workers & Pages → Create application → Pages → Connect to Git**，授权并选择该 GitHub 仓库。
4. 配置构建：Production branch 选 `main`；Framework preset 选 **None**；Build command 填 `exit 0`；Build output directory 填 `.`（仓库根目录）。保存并部署。
5. 部署完成后，Cloudflare 会提供 `*.pages.dev` 地址。需要绑定域名时，在该 Pages 项目的 **Custom domains** 中添加域名并按提示配置 DNS。

## 后续自动更新

以后在本地修改并推送到 GitHub 的 `main` 分支：

```bash
git add .
git commit -m "Update CUVREL website"
git push
```

Cloudflare Pages 会自动检测新的提交、重新发布网站。普通页面更新不需要登录服务器操作。推送到其他分支通常会生成预览部署，便于先检查再合并到 `main`。这符合 [Cloudflare 静态 HTML 部署说明](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/)中的 Git 集成流程。

## 发布前检查

- 确认 `hello@cuvrel.com` 是可收信地址。
- 将 Privacy / Legal 邮件入口替换为实际政策页面（如果已准备）。
- 校对公司注册信息和对外品牌描述；首页地图与品牌栏目当前是概念性展示。
- 使用手机和桌面浏览器检查 Cloudflare 预览网址。
