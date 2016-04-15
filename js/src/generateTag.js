// 用于将一个Objec对象转换为html标签
/*
  对象结构为{
    tagName:  当前需要转换的标签名
    attribute: 标签内的参数
    text:   标签的内部数据
    innerTag: 该标签的内部标签，为一个数组
  }
*/
var generateTag = function(){
  // 返回参数的字符串
  function getAttr(attrObj) {
    var re = '';
    for (var i in attrObj) {
      re += ' ' + i + '="' + attrObj[i] + '"';
    } 
    return re;
  }

  // 递归将对象转换为标签:w
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
  return getTag;
  
}();