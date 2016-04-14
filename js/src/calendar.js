function Calendar () {
  this.today = null;
  this.currentYear = null;
  this.currentMonth = null;
  this.previousYear = null;
  this.previousMonth = null;
  this.dayCSS = null;
  this.tableObj = null;
  this.divObj = null;
  // 导入别人写好的公历转农历的对象

}
Calendar.prototype = {
  // create a 5 * 7 td in tables
  monthNames: ['January','February','March','April','May','June',
		'July','August','September','October','November','December'],

  dayNames: ['Monday', 'TuesDay', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  daysInAMonth: [31,28,31,30,31,30,31,31,30,31,30,31],
  daysInAWeek: 7,
  numOfWeekDispInAMonth: 6,
  tanslate: calendar,
  generateTag: generateTag,

  setClassOfChildInTagName: function (childTagName) {
    var that = this;
    return function(classSetTo) {
      var childArray = that.tableObj.getElementsByTagName(childTagName);
      for (var i = 0; i < childArray.length; i++) {
        childArray[i].setAttribute('class', classSetTo);
      }
      return that.childArray;
    };
  },

  createTableWithId: function (IdName) {
    var table = document.createElement('table');
    if (IdName !== undefined) {
      table.setAttribute('id', IdName);
    }
    return table;
  },

  initTable: function (tableId) {
    var that = this;
    var table = that.createTableWithId(tableId);
    document.body.appendChild(table);
    that.tableObj = table;
    var newTable = that.generateTableInnerHtml(2016, 4);
    that.tableObj.innerHTML = newTable;
  },

  isLeapYear:function(year){
		return ( year % 4 === 0 && year % 100 !== 0) || ( year % 400 === 0 );
	},
  
  
  generateTdHtml: function (dayObj, classSetTo) {
    var returnHtml = "";
    var classInTd = classSetTo || "";
  },

  generateDayHtml: function (dayObj) {
    var classSetTo = this.dayCSS;
    var classValue = classSetTo || "";
    var strClassEqual = classValue === "" ? "" : ' class="' + classValue + '"';
    return '<td' + strClassEqual + '>' + dayObj.day + '</td>';
  },

  generateWeekHtml: function (days) {
    var that = this;
    var weekHtml = "";
    for (var i = 0; i < days.length; i++) {
      weekHtml += that.generateDayHtml(days[i]);
    }
    return weekHtml;
  },

  getPreviousMonth: function (year, month) {
    if (month === 1) {
      return {
        year: year - 1,
        month : 12
      };
    }
    else {
      return {
        year : year,
        month: month - 1
      };
    }
  },

  setCurrentYearMonth: function (year, month) {
    this.currentYear = year;
    this.currentMonth = month;
    this.daysInAMonth[1] = this.isLeapYear(year) ? 29 : 28;
//    console.log(this.isLeapYear(year));
  },

  getDayArrayOfAMonth: function (year, month) {
    if (month === 2) {
      return this.isLeapYear(year) ? 29 : 28;
    }
    else {
      // starts at 0;
      return this.daysInAMonth[month - 1];
    }

  },

  getFirstDayOfMonth: function (year, month) {
    // Date(2016, 3, 1) = 2016-4-1; Date's month starts at 0;
    var tmpDate = new Date(year, month - 1, 1);
    var dayOfWeek = tmpDate.getDay();
    return dayOfWeek === 0 ? 7 : dayOfWeek;
  },

  generateTableOfMonth: function (year, month) {
    var that = this;
    var firstDayOfWeek = that.getFirstDayOfMonth(year, month);
    var preMonth = that.getPreviousMonth(year, month);
    var preMonthDays = that.getDayArrayOfAMonth(preMonth.year, preMonth.month);
    var currentMonthDays = that.getDayArrayOfAMonth(year, month);
    var resultMonthData = [];
    // if firstDayOfWeek === 2, generate 4 days ahead
    for (var i = 0; i < firstDayOfWeek - 1; i++) {
      resultMonthData.unshift(preMonthDays - i);
    }
    for (var j = 0; j < currentMonthDays; j++) {
      resultMonthData.push(j + 1);
    }
    // generate next month days
    var nextMonthDays = that.numOfWeekDispInAMonth * that.daysInAWeek - resultMonthData.length;
    for (i = 0; i < nextMonthDays; i++) {
      resultMonthData.push(i + 1);
    }
    return resultMonthData;
  },
  
  splitArrayByLength: function (array, length) {
    var arr = [];
    var inLen = array.length;
    var chips = Math.ceil(inLen / length);
    for (var i = 0; i < chips; i++) {
      arr.push(array.splice(0, length));
    }
    return arr;
  },
  
  generateMonthHtml: function (year, month) {
    var that = this;
    var dayArrayOfMonth = that.generateTableOfMonth(year, month);
    var splicedDayArray = that.splitArrayByLength(dayArrayOfMonth, that.daysInAWeek);
    var monthHtml = '';
    for (var i = 0, length = splicedDayArray.length; i < length; i++) {
      monthHtml += "<tr>";
      monthHtml += that.generateWeekHtml(splicedDayArray[i]);
      monthHtml += "</tr>";
    }
    return monthHtml;
  },

  generateTableInnerHtml: function (year, month) {
    var that = this;
    var inHtml = "";
    for (var i = 0; i < that.daysInAWeek; i++) {
      inHtml += '<th>' + that.dayNames[i] + '</th>';
    }  
    inHtml += that.generateMonthHtml(year, month);
    return inHtml;
  },
  
  render: function () {
    var that = this;
  }
  
  

};

function date2MDate(dateObj) {
  return {
    year: dateObj.getFullYear(),
    month: dateObj.getMonth() + 1,
    day: dateObj.getDate()
  };
}

function mDate2Date(mDateObj) {
  return new Date(mDate.year, mDate.month - 1, mDate.day);
}

function CalendarDay(dateObj) {
  this.tagName = 'td';
  var mDate = date2MDate(dateObj);
  var lunaDate = calendar.solar2lunar(mDate.year, mDate.month, mDate.day);
  this.innerTag = [];
  this.innerTag.push({
    tagName: 'p',
    attribute: {
      class: 'dayNum',
    },
    text: mDate.day 
  });
  this.innerTag.push({
    tagName: 'p',
    attribute: {
      class: 'lunaDayNum'  
    },
    text: lunaDate.IDayCn
  });
}

function CalendayWeek(firstDateObj) {
  var mStartDay = date2MDate(firstDateObj);
  this.tagName = 'tr';
  this.innerTag = [];
  for (var i = 0; i < 7; i++) {
    var dayOfWeek = new Date(mStartDay.year, mStartDay.month - 1, mStartDay.day + i);
    var calDay = new CalendarDay(dayOfWeek);
    this.innerTag.push(calDay);
  }
  this.attribute = {
    class: 'weekClass'
  };
}