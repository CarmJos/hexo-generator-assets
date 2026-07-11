# **hexo-generator-assets**

_**"一个用于生成文章目录静态资源条目的 Hexo 插件。**_

一个 Hexo 生成器插件，可自动为文章提供图片和其他静态文件服务。当文章有关联的资源（如子文件夹中的图片）时，此插件会生成相应的静态文件条目，使其正确包含在构建的站点中。

## 功能与优势

- **自动资源发现**：自动检测并服务文章目录中的文件
- **目录支持**：递归处理文章文件夹中的子目录
- **文件模式**：可选择包含 `index.md` 旁边的松散文件
- **隐藏文件控制**：可配置是否包含隐藏文件（以点开头的文件）
- **仅索引模式**：默认仅处理源文件为 `index.md` 的文章
- **零配置**：使用合理的默认值，开箱即用

## 安装

### 通过 npm _（推荐）_

```bash
npm install hexo-generator-assets --save
```

### 手动安装

1. 从 [GitHub Releases][gh:releases] 下载最新版本
2. 将 `hexo-generator-assets.js` 放置到 Hexo 项目的 `scripts/` 目录中
3. 下次构建时，Hexo 将自动加载该插件

> **注意**：如果 Hexo 项目根目录下不存在 `scripts/` 目录，请先创建该目录。Hexo 会自动加载该目录中的所有 `.js` 文件作为插件。

## 配置

在 Hexo 的 `_config.yml` 中添加以下内容以自定义行为：

```yaml
hexo_generator_assets:
  include_files: false    # 是否包含文章文件夹中的松散文件（非目录）
  include_hidden: false   # 是否包含隐藏文件（以 . 开头的文件）
  index_only: true        # 是否仅处理源文件为 index.md 的文章
```

### 配置选项

| 选项            | 类型    | 默认值  | 描述                                                  |
| --------------- | ------- | ------- | ----------------------------------------------------- |
| `include_files` | 布尔值  | `false` | 是否包含文章目录中的松散文件（不在子目录中的文件）    |
| `include_hidden`| 布尔值  | `false` | 是否包含隐藏文件（以 `.` 开头的文件）                 |
| `index_only`    | 布尔值  | `true`  | 是否仅处理源文件为 `index.md` 的文章                  |

## 使用方法

将文章与资源组织在同一目录中：

```
source/_posts/my-post/
├── index.md
├── images/
│   ├── screenshot.png
│   └── diagram.svg
└── downloads/
    └── example.zip
```

插件将自动生成所有资源文件的路由：

- `/my-post/images/screenshot.png`
- `/my-post/images/diagram.svg`
- `/my-post/downloads/example.zip`

## 示例

给定以下文章结构：

```
source/_posts/hello-world/
├── index.md
└── images/
    ├── photo.jpg
    └── banner.png
```

构建后，以下路由将可用：

- `/hello-world/` - 文章本身
- `/hello-world/images/photo.jpg` - 静态资源
- `/hello-world/images/banner.png` - 静态资源

## 支持与捐赠

如果您喜欢这个插件，请考虑通过 [GitHub Sponsors](https://github.com/sponsors/CarmJos) 或 [爱发电](https://www.ifdian.net/a/carmjos/plan) 支持我！

**感谢您对开源项目的支持！**

## 开源许可证

本项目的源代码基于 [GNU 通用公共许可证第三版](https://www.gnu.org/licenses/gpl-3.0.html) 授权。

[gh:releases]: https://github.com/CarmJos/hexo-generator-assets/releases
