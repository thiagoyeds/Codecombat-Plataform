require.register("templates/play/level/modal/image-gallery-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,state = locals_.state,utils = locals_.utils;buf.push("<div class=\"modal-dialog\"><div class=\"modal-content style-flat\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("</div><div class=\"modal-body\"><div class=\"row modal-body-content\"><div class=\"image-list-container col-sm-7\"><h3>" + (jade.escape(null == (jade.interp = '1. ') ? "" : jade.interp)) + "<span data-i18n=\"web_dev.select_an_image\"></span></h3><ul class=\"image-list\">");
// iterate view.images
;(function(){
  var $$obj = view.images;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var image = $$obj[$index];

var selectedState = state.get('selectedUrl') === image.portraitURL ? 'selected' : ''
buf.push("<li" + (jade.attrs({ 'data-portrait-url':(image.portraitURL), 'selected':(selectedState), "class": [('image-list-item'),('render'),(selectedState)] }, {"class":true,"data-portrait-url":true,"selected":true})) + "><img" + (jade.attrs({ 'src':(image.portraitURL) }, {"src":true})) + "/></li>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var image = $$obj[$index];

var selectedState = state.get('selectedUrl') === image.portraitURL ? 'selected' : ''
buf.push("<li" + (jade.attrs({ 'data-portrait-url':(image.portraitURL), 'selected':(selectedState), "class": [('image-list-item'),('render'),(selectedState)] }, {"class":true,"data-portrait-url":true,"selected":true})) + "><img" + (jade.attrs({ 'src':(image.portraitURL) }, {"src":true})) + "/></li>");
    }

  }
}).call(this);

buf.push("</ul><div class=\"small text-center\"><span data-i18n=\"web_dev.scroll_down_for_more_images\"></span></div></div><div class=\"col-sm-5 flex-col render\"><h3>" + (jade.escape(null == (jade.interp = '2. ') ? "" : jade.interp)) + "<span data-i18n=\"web_dev.copy_the_url\"></span></h3><div data-i18n=\"web_dev.copy_the_url_description\" class=\"text-h3 subtitle\"></div><div class=\"copy-row m-t-1\"><div class=\"copy-textarea-col\"><textarea class=\"image-url copyable\">");
if ( view.state.get('selectedUrl'))
{
buf.push(jade.escape(null == (jade.interp = utils.pathToUrl(view.state.get('selectedUrl'))) ? "" : jade.interp));
}
buf.push("</textarea></div><div class=\"copy-button-col\"><button class=\"btn btn-forest copy-url-button\"><span data-i18n=\"web_dev.copy_url\"></span></button></div></div><div class=\"hr-text m-t-1\"><hr/><span data-i18n=\"general.or\"></span></div><h3 data-i18n=\"web_dev.copy_the_img_tag\"></h3><div data-i18n=\"web_dev.copy_the_img_tag_description\" class=\"text-h3 subtitle\"></div><div class=\"copy-row m-t-1\"><div class=\"copy-textarea-col\"><textarea class=\"image-tag copyable\">");
if ( view.state.get('selectedUrl'))
{
buf.push(jade.escape(null == (jade.interp = '<img src="' + utils.pathToUrl(view.state.get('selectedUrl')) + '"/>') ? "" : jade.interp));
}
buf.push("</textarea></div><div class=\"copy-button-col\"><button class=\"btn btn-forest copy-tag-button\"><span data-i18n=\"web_dev.copy_img\"></span></button></div></div><div class=\"how-to-copy-paste m-t-3\"><div class=\"m-b-1 text-center\"><span data-i18n=\"web_dev.how_to_copy_paste\"></span></div><div class=\"windows-only\"><span data-i18n=\"web_dev.copy\"></span>: Control–C<br/><span data-i18n=\"web_dev.paste\"></span>: Control–V</div><div class=\"mac-only hidden\"><span data-i18n=\"web_dev.copy\"></span>: Command ⌘–C<br/><span data-i18n=\"web_dev.paste\"></span>: Command ⌘–V</div></div><div class=\"close-button\"><a href=\"#\" data-dismiss=\"modal\" aria-hidden=\"true\" data-i18n=\"web_dev.back_to_editing\" class=\"btn btn-lg btn-primary\"></a></div></div></div></div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"></div></div></div>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;
//# sourceMappingURL=/javascripts/app/templates/play/level/modal/image-gallery-modal.js.map