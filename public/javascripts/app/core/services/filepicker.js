require.register("core/services/filepicker", function(exports, require, module) {
var initializeFilepicker;

module.exports = initializeFilepicker = function() {
  return (function(a) {
    var b, c, d, e, f, g;
    if (window.filepicker) {
      return;
    }
    b = a.createElement('script');
    b.type = 'text/javascript';
    b.async = !0;
    b.src = ('https:' === a.location.protocol ? 'https:' : 'http:') + '//api.filepicker.io/v1/filepicker.js';
    c = a.getElementsByTagName('script')[0];
    c.parentNode.insertBefore(b, c);
    d = {};
    d._queue = [];
    e = 'pick,pickMultiple,pickAndStore,read,write,writeUrl,export,convert,store,storeUrl,remove,stat,setKey,constructWidget,makeDropPane'.split(',');
    f = function(a, b) {
      return function() {
        b.push([a, arguments]);
      };
    };
    g = 0;
    while (g < e.length) {
      d[e[g]] = f(e[g], d._queue);
      g++;
    }
    d.setKey('AvlkNoldcTOU4PvKi2Xm7z');
    window.filepicker = d;
  })(document);
};
});

;
//# sourceMappingURL=/javascripts/app/core/services/filepicker.js.map