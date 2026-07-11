'use strict';

const fs = require('node:fs');
const path = require('node:path');

function walkFiles(rootDir, currentDir, collector) {
  const entries = fs.readdirSync(currentDir, { withFileTypes: true });

  entries.forEach((entry) => {
    if (entry.name.startsWith('.')) {
      return;
    }

    const absPath = path.join(currentDir, entry.name);

    if (entry.isDirectory()) {
      walkFiles(rootDir, absPath, collector);
      return;
    }

    if (entry.isFile()) {
      const relPath = path.relative(rootDir, absPath).split(path.sep).join('/');
      collector.push({ absPath, relPath });
    }
  });
}

hexo.extend.generator.register('assets', function assetsGenerator(locals) {
  const pluginConfig = this.config.hexo_generator_assets || {};
  const includeFiles = Boolean(pluginConfig.include_files);
  const includeHidden = Boolean(pluginConfig.include_hidden);
  const onlyIndexPost = pluginConfig.index_only !== false;
  const entries = [];

  locals.posts.forEach((post) => {
    if (!post || !post.source || !post.path) {
      return;
    }

    const normalizedSource = String(post.source).replace(/\\/g, '/');
    const sourceName = path.posix.basename(normalizedSource).toLowerCase();
    const isIndexMarkdown = sourceName === 'index.md' || sourceName === 'index.markdown';

    if (onlyIndexPost && !isIndexMarkdown) {
      return;
    }

    const absPostFile = path.join(this.source_dir, post.source);
    const absPostDir = path.dirname(absPostFile);

    if (!fs.existsSync(absPostDir)) {
      return;
    }

    const routeBaseDir = path.posix.dirname(String(post.path).replace(/\\/g, '/'));
    const siblings = fs.readdirSync(absPostDir, { withFileTypes: true });

    siblings.forEach((sibling) => {
      if (!includeHidden && sibling.name.startsWith('.')) {
        return;
      }

      const siblingAbsPath = path.join(absPostDir, sibling.name);

      if (sibling.isFile()) {
        if (!includeFiles) {
          return;
        }

        const siblingName = sibling.name.toLowerCase();
        if (siblingName === sourceName) {
          return;
        }

        const fileRoutePath = path.posix.join(routeBaseDir, sibling.name);
        entries.push({
          path: fileRoutePath,
          data: () => fs.createReadStream(siblingAbsPath)
        });
        return;
      }

      if (!sibling.isDirectory()) {
        return;
      }

      const files = [];
      walkFiles(siblingAbsPath, siblingAbsPath, files);

      files.forEach((file) => {
        const routePath = path.posix.join(routeBaseDir, sibling.name, file.relPath);
        entries.push({
          path: routePath,
          data: () => fs.createReadStream(file.absPath)
        });
      });
    });
  });

  return entries;
});

