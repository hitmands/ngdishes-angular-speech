(function() {
  'use strict';

  /**
   *
   * @constructor
   */
  function HtmlUtils() {}


  HtmlUtils.prototype.tagScript = function(src, attrs) {
    var tag = "<script type=\"text/javascript\" src=\""+ src +"\"";

    if(attrs) {
      for(var attr in attrs) {
        if(attrs.hasOwnProperty(attr)) {
          var value = attrs[attr];
          tag += " " + attr + "=\"" + value + "\" ";
        }
      }
    }

    tag += "></script>";

    return tag;
  };

  HtmlUtils.prototype.tagCss = function(src, attrs) {
    var tag = "<link rel=\"stylesheet\" href=\""+ src +"\" media=\"all\"";

    if(attrs) {
      for(var attr in attrs) {
        if(attrs.hasOwnProperty(attr)) {
          var value = attrs[attr];
          tag += " " + attr + "=\"" + value + "\" ";
        }
      }
    }

    tag += "/>";

    return tag;
  };

  module.exports = new HtmlUtils();
}).call(this);

