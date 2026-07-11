# **hexo-generator-assets**

_**"A Hexo plugin that generates static asset entries for post directories."**_

A Hexo generator plugin that automatically serves images and other static files alongside your posts. When a post has associated assets (like images in a subfolder), this plugin generates the corresponding static file entries so they are properly included in the built site.

## Features & Advantages

- **Automatic Asset Discovery**: Automatically detects and serves files in post directories
- **Directory Support**: Recursively processes subdirectories within post folders
- **File Mode**: Optionally include loose files alongside `index.md`
- **Hidden File Control**: Configurable inclusion of hidden files (dotfiles)
- **Index-Only Mode**: By default, only processes posts with `index.md` as the source file
- **Zero Configuration**: Works out of the box with sensible defaults

## Installation

### Via npm

```bash
npm install @carmjos/hexo-generator-assets --registry=https://npm.pkg.github.com
```

Or add the following to your project's `.npmrc` file to always use GitHub Packages for this scope:

```
@carmjos:registry=https://npm.pkg.github.com
```

Then install normally:

```bash
npm install @carmjos/hexo-generator-assets
```

### Manual Installation _(Recommended)_

1. Download the latest release from [GitHub Releases][gh:releases]
2. Place `hexo-generator-assets.js` into your Hexo project's `scripts/` directory
3. The plugin will be automatically loaded by Hexo during the next build

> **Note**: If the `scripts/` directory does not exist in your Hexo project root, create it first. Hexo automatically loads all `.js` files in this directory as plugins.

## Configuration

Add the following to your Hexo `_config.yml` to customize behavior:

```yaml
hexo_generator_assets:
  include_files: false    # Include loose files (non-directory) in post folders
  include_hidden: false   # Include hidden files (files starting with .)
  index_only: true        # Only process posts with index.md as source
```

### Configuration Options

| Option          | Type    | Default | Description                                                  |
| --------------- | ------- | ------- | ------------------------------------------------------------ |
| `include_files` | Boolean | `false` | Whether to include loose files (not in subdirectories) in post directories |
| `include_hidden`| Boolean | `false` | Whether to include hidden files (files starting with `.`)    |
| `index_only`    | Boolean | `true`  | Whether to only process posts with `index.md` as the source file |

## Usage

Organize your post with assets in the same directory:

```
source/_posts/my-post/
├── index.md
├── images/
│   ├── screenshot.png
│   └── diagram.svg
└── downloads/
    └── example.zip
```

The plugin will automatically generate routes for all asset files:

- `/my-post/images/screenshot.png`
- `/my-post/images/diagram.svg`
- `/my-post/downloads/example.zip`

## Example

Given the following post structure:

```
source/_posts/hello-world/
├── index.md
└── images/
    ├── photo.jpg
    └── banner.png
```

After building, the following routes will be available:

- `/hello-world/` - The post itself
- `/hello-world/images/photo.jpg` - Static asset
- `/hello-world/images/banner.png` - Static asset

## Support and Donation

If you appreciate this plugin, consider supporting me with a donation at
[GitHub Sponsors](https://github.com/sponsors/CarmJos) or
[爱发电](https://www.ifdian.net/a/carmjos/plan) !

**Thank you for supporting open-source projects!**

## Open Source License

This project's source code is licensed under
the [GNU General Public License, Version 3](https://www.gnu.org/licenses/gpl-3.0.html).

[gh:releases]: https://github.com/CarmJos/hexo-generator-assets/releases
