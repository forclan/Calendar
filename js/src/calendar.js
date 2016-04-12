function Calendar () {
  this.today = null;
  this.currentYear = null;
  this.currentMonth = null;
  this.previousYear = null;
  this.previousMonth = null;


}
Calendar.prototype = {
  // create a 5 * 7 td in tables
  monthNames: ['January','February','March','April','May','June',
		'July','August','September','October','November','December'],
    
  dayNames: ['Monday', 'TuesDay', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  daysInAMonth: [31,28,31,30,31,30,31,31,30,31,30,31],
  daysOfAWeek: 7,
  numOfWeekDispInAMonth: 6,
  initTdAndTr: function (table) {
    // var tableObj = document.getElementById(tableName);
    var inHtml = "";
    for (var i = 0; i < this.daysOfAWeek; i++) {
      inHtml += '<th>' + this.dayNames[i] + '</th>';    
    }
    for (var index = 0; index < this.numOfWeekDispInAMonth; index++) {
      inHtml += '<tr>';
      for (var j = 0; j < this.daysOfAWeek; j++) {
        inHtml += '<td>' + j + '</td>';
      }
      inHtml += '</tr>';
    }
    table.innerHTML = inHtml;
  },
  
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
  
  setTdClass: function (classSetTo) {
    var that = this;
    // var settdClass = that.getChildOfTagName('td');
    // settdClass(classSetTo);
    return that.setClassOfChildInTagName('td')(classSetTo);
  },
  
  setThClass: function (classSetTo) {
    var that = this;
    return that.setClassOfChildInTagName('th')(classSetTo);
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
    that.initTdAndTr(table);
  },
  
  isLeapYear:function(year){
		return ( year % 4 === 0 && year % 100 !== 0) || ( year % 400 === 0 );
	},
  
  generateDayHtml: function (day, classSetTo) {
    classSet = this.day === day ? this.TodayClass : classSetTo || this.tdClass || "";
    var strClassEqual = classSet === "" ? "" : ' class="' + classSet + '"';
    return '<td' + strClassEqual + '>' + day + '</td>';
  },
  
  generateWeekHtml: function (days, classSetTo) {
    var weekHtml = "";
    for (var i = 0; i < days.length; i++) {
      weekHtml += this.generateDayHtml(days[i], classSetTo);
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
    var nextMonthDays = that.numOfWeekDispInAMonth * that.daysOfAWeek - resultMonthData.length;
    for (i = 0; i < nextMonthDays; i++) {
      resultMonthData.push(i + 1);
    }
    return resultMonthData;
  },
  
 
  generateDaysOfMonth: function (year, month) { 
    var fisrtDayOfMonth = this.getFirstDayOfMonth(year, month);
  }  
    
};