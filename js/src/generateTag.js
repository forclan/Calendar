var generateTag = function(){
  function getAttr(attrObj) {
    var re = '';
    for (var i in attrObj) {
      re += ' ' + i + '="' + attrObj[i] + '"';
    } 
    return re;
  }

  function getTag(tagObj) {
    var re = '';
    if (tagObj === null || tagObj === undefined) {
      return '';
    }
    // 没有文本时，将其设置为空字符串
    var text = tagObj.text == null ? '' : tagObj.text;
    // 获取该tag的子tag, attribute
    var attrTag = getAttr(tagObj.attribute);
    var subTag = tagObj.innerTag;
    
    // 返回的子tag的html结果
    var innerTagHtml = '';
    if (Array.isArray(subTag)) {
      for (var tag = 0, len = subTag.length; tag < len; tag++) {
        innerTagHtml += getTag(subTag[tag]);
      }
    }
    else {
      innerTagHtml += getTag(subTag);
    }
    
    re = '<' + tagObj.tagName + attrTag + '>' + text + 
      innerTagHtml + '</' + tagObj.tagName + '>';
    return re;
  }
  var app = {};
  app.getTag = getTag;
  return app;
  
}();