require.register("lib/image_filter", function(exports, require, module) {
var Filters, darkenImage, revertImage,
  slice = [].slice;

Filters = {};

Filters.getPixels = function(img) {
  var c, ctx;
  c = this.getCanvas(img.naturalWidth, img.naturalHeight);
  ctx = c.getContext('2d');
  ctx.drawImage(img, 0, 0);
  return ctx.getImageData(0, 0, c.width, c.height);
};

Filters.getCanvas = function(w, h) {
  var c;
  c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return c;
};

Filters.filterImage = function() {
  var args, filter, image;
  filter = arguments[0], image = arguments[1], args = 3 <= arguments.length ? slice.call(arguments, 2) : [];
  args = [this.getPixels(image)].concat(args);
  return filter.apply(null, args);
};

Filters.brightness = function(pixels, adjustment) {
  var d, i;
  d = pixels.data;
  i = 0;
  while (i < d.length) {
    d[i] *= adjustment;
    d[i + 1] *= adjustment;
    d[i + 2] *= adjustment;
    i += 4;
  }
  return pixels;
};

module.exports.darkenImage = darkenImage = function(img, borderImageSelector, pct) {
  var c, cachedValue, ctx, imageData, jqimg;
  if (pct == null) {
    pct = 0.5;
  }
  jqimg = $(img);
  cachedValue = jqimg.data('darkened');
  if (cachedValue) {
    $(borderImageSelector).css('border-image-source', 'url(' + cachedValue + ')');
    return img.src = cachedValue;
  }
  if (!jqimg.data('original')) {
    jqimg.data('original', img.src);
  }
  if (!(img.naturalWidth > 0 && img.naturalHeight > 0)) {
    console.warn('Tried to darken image', img, 'but it has natural dimensions', img.naturalWidth, img.naturalHeight);
    return img;
  }
  imageData = Filters.filterImage(Filters.brightness, img, pct);
  c = Filters.getCanvas(img.naturalWidth, img.naturalHeight);
  ctx = c.getContext('2d');
  ctx.putImageData(imageData, 0, 0);
  img.src = c.toDataURL();
  $(borderImageSelector).css('border-image-source', 'url(' + img.src + ')');
  return jqimg.data('darkened', img.src);
};

module.exports.revertImage = revertImage = function(img, borderImageSelector) {
  var jqimg;
  jqimg = $(img);
  if (!jqimg.data('original')) {
    return;
  }
  $(borderImageSelector).css('border-image-source', 'url(' + jqimg.data('original') + ')');
  return img.src = jqimg.data('original');
};
});

;
//# sourceMappingURL=/javascripts/app/lib/image_filter.js.map