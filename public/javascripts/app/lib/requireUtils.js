require.register("lib/requireUtils", function(exports, require, module) {
module.exports.getParentFolders = function(subPath, urlPrefix) {
  var parts, paths;
  if (urlPrefix == null) {
    urlPrefix = '/test/';
  }
  if (!subPath) {
    return [];
  }
  paths = [];
  parts = subPath.split('/');
  while (parts.length) {
    parts.pop();
    paths.unshift({
      name: parts[parts.length - 1] || 'All',
      url: urlPrefix + parts.join('/')
    });
  }
  return paths;
};

module.exports.parseImmediateChildren = function(allChildren, subPath, baseRequirePath, urlPrefix) {
  var children, f, files, folders, group, i, j, k, len, len1, len2, name, parts, ref, ref1, requirePrefix;
  if (baseRequirePath == null) {
    baseRequirePath = 'test/app/';
  }
  if (urlPrefix == null) {
    urlPrefix = '/test/';
  }
  if (!allChildren) {
    return [];
  }
  folders = {};
  files = {};
  requirePrefix = baseRequirePath + subPath;
  if (requirePrefix[requirePrefix.length - 1] !== '/') {
    requirePrefix += '/';
  }
  for (i = 0, len = allChildren.length; i < len; i++) {
    f = allChildren[i];
    f = f.slice(requirePrefix.length);
    if (!f) {
      continue;
    }
    parts = f.split('/');
    name = parts[0];
    group = parts.length === 1 ? files : folders;
    if (group[name] == null) {
      group[name] = 0;
    }
    group[name] += 1;
  }
  children = [];
  urlPrefix += subPath;
  if (urlPrefix[urlPrefix.length - 1] !== '/') {
    urlPrefix += '/';
  }
  ref = _.keys(folders);
  for (j = 0, len1 = ref.length; j < len1; j++) {
    name = ref[j];
    children.push({
      type: 'folder',
      url: urlPrefix + name,
      name: name + '/',
      size: folders[name]
    });
  }
  ref1 = _.keys(files);
  for (k = 0, len2 = ref1.length; k < len2; k++) {
    name = ref1[k];
    children.push({
      type: 'file',
      url: urlPrefix + name,
      name: name
    });
  }
  return children;
};
});

;
//# sourceMappingURL=/javascripts/app/lib/requireUtils.js.map