var holidays = {
  solarHolidays: {
    "11": "元旦节",
    "214": "情人节",
    "35": "雷锋日",
    "38": "妇女节",
    "312": "植树节",
    "41": "愚人节",
    "51": "劳动节",
    "54": "青年节",
    "61": "儿童节",
    "71": "建党日",
    "81": "建军节",
    "910": "教师节",
    "101": "国庆节",
    "1224": "平安夜",
    "1225": "圣诞节",
  },
  lunarHolidays: {
    "二月廿七": "清明节",
    "正月初一": "春节",
    "正月初五": "破五",
    "二月初二": "春龙节",
    "五月初六": "立夏节",
    "七月十五": "盂兰盆节",
    "七月三十": "地藏节",
    "腊月廿三": "小年",
    "腊月三十": "除夕",
    "正月十五": "元宵节",
    "五月初五": "端午节",
    "七月初七": "乞巧节",
    "八月十五": "中秋节",
    "九月初九": "重阳节",
    "腊月初八": "腊八节",
    "腊月廿四": "扫房日"
  }
};

var getHoliday = function (dateObj) {
  var solarLunarDate = generateMonthTag.getMDateLunarDate(dateObj);
  var reSolar = holidays.solarHolidays[solarLunarDate.solar];
  var reLunar = holidays.lunarHolidays[solarLunarDate.lunar];
  return {
    solar: reSolar,
    lunal: reLunar
  };
};