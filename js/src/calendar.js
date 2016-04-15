function Calendar () {
  this.today = null;
  this.currentYear = null;
  this.currentMonth = null;
  this.calendarObj = null;
  this.tableObj = null;
  this.divObj = null;
  this.preMonthButton = null;
  this.nextMonthButton = null;
}
Calendar.prototype = {
  
  // 设置当前的日期并显示
  setCurrentYearMonth: function (year, month) {
    this.currentYear = year;
    this.currentMonth = month;
    this.render();
  },

  // 获取一个月的日历
  getCanlendarMonth: function (year, month) {
    var getFirstDayOfMonth =  function (year, month) {
    // Date(2016, 3, 1) = 2016-4-1; Date's month starts at 0;
      var tmpDate = new Date(year, month - 1, 1);
      var dayOfWeek = tmpDate.getDay();
      return dayOfWeek === 0 ? 7 : dayOfWeek;
    };

    var firstDayOfMonth = getFirstDayOfMonth(year, month);
    var preMonthDays = firstDayOfMonth - 1;
    var calendarStartDay = new Date(year, month - 1, 1 - preMonthDays);
    var monthTags = generateMonthTag.getMonthTags(calendarStartDay);
    return monthTags;
  },
  
  getButtonDoc: function (id, value) {
    var buttonDoc = document.createElement('input');
    buttonDoc.setAttribute('id', id);
    buttonDoc.setAttribute('type', 'button');
    buttonDoc.setAttribute('value', value);
    return buttonDoc;
  },
  
  // 初始化函数
  init: function () {
    var date = new Date();
    var that = this;
    this.currentYear = date.getFullYear();
    this.currentMonth = date.getMonth() + 1;
    this.today = date.getDay() === 0 ? 7 : date.getDay();
    var calendarObj = document.createElement('div');
    calendarObj.setAttribute('id', 'calerdar-frame');
    
    var operationDiv = document.createElement('div');
    var nextMonthButton = this.getButtonDoc('next-month-button', 'nextMonth');
    var preMonthButton = this.getButtonDoc('pre-month-button', 'preMonth');
    var currentMonth = this.getButtonDoc('currentMonth', this.currentMonth);
    var preYearButton = this.getButtonDoc('pre-year-button', 'preYear');
    var currentYear = this.getButtonDoc('currentYear', this.currentYear);
    var nextYearButton = this.getButtonDoc('next-year-button', 'nextYear');
    operationDiv.appendChild(preMonthButton);
    operationDiv.appendChild(currentMonth);
    operationDiv.appendChild(nextMonthButton);
    operationDiv.appendChild(preYearButton);
    operationDiv.appendChild(currentYear);
    operationDiv.appendChild(nextYearButton);
    calendarObj.appendChild(operationDiv);
    var divObj = document.createElement('div');
    calendarObj.appendChild(divObj);
    this.divObj = divObj;
    document.body.appendChild(calendarObj);
    this.calendarObj = calendarObj;
    this.render();
    var monthOperation = function (monthAddNum) {
      return function () {
        // create a new date
        var date = new Date(that.currentYear, that.currentMonth - 1 + monthAddNum);
        that.currentYear = date.getFullYear();
        that.currentMonth = date.getMonth() + 1;
        that.render();
      };
    };
    var yearOperation = function (yearAddNum) {
      return function () {
        var date = new Date(that.currentYear + yearAddNum, that.currentMonth - 1);
        that.currentYear = date.getFullYear();
        that.currentMonth = date.getMonth() + 1;
        that.render();
      };
    };
    var preMonth = monthOperation(-1);
    var nextMonth = monthOperation(1);
    var preYear = yearOperation(-1);
    var nextYear = yearOperation(1);
    
    nextMonthButton.addEventListener('click', nextMonth, false);
    preMonthButton.addEventListener('click', preMonth, false);
    preYearButton.addEventListener('click', preYear, false);
    nextYearButton.addEventListener('click', nextYear, false);
  },
  
  // 添加td按键绑定
  addDayClickListen: function () {
    var that = this;
    var divObj = this.divObj;
    var tdArr = divObj.getElementsByTagName('td');
    
    // td 的按键绑定
    var tdClick = function (mDateObj) {
      return function () {
        // console.log(mDateObj.year);
        console.log(that);
        that.currentYear = mDateObj.year;
        that.currentMonth = mDateObj.month;
        that.render();       
      };
    };
    for (var i = 0, len = tdArr.length; i < len; i++) {
      // tdArr[i].onclick = that.setCalerdarDate.apply(that);
      var mDateObj = that.getTdDay(tdArr[i]);
      tdArr[i].addEventListener('click', tdClick(mDateObj), false);
    }
    
  },
  
  // 用于显示日历的函数
  render: function () {
    var monthTags = this.getCanlendarMonth(this.currentYear, this.currentMonth);
    this.divObj.innerHTML = monthTags;
    this.addDayClickListen();
    var currentYear = document.getElementById('currentYear');
    currentYear.setAttribute('value', this.currentYear);
    var currentMonth = document.getElementById('currentMonth');
    currentMonth.setAttribute('value', this.currentMonth);
    // var preMonthButtonObj =  document.getElementById('pre-month-button');
    // preMonthButtonObj.setAttribute('value', this.currentMonth);
    // var preYearButtonObj = document.getElementById('pre-year-button');
    // preYearButtonObj.setAttribute('value', this.currentYear);
    console.log(this.currentMonth);
    console.log(this.currentYear);
  },
  
  // api 用于设置每周的名称
  setWeekName: function (dayNameSetTo) {
      generateMonthTag.setWeekNames(dayNameSetTo);
      this.render();
  },
  
  // 设置td的格式 
  getTdDay: function (tdObj) {
    var dateStr = tdObj.getAttribute('date'); 
    var dateArr = dateStr.split('-');
    var year = parseInt(dateArr[0]);
    var month = parseInt(dateArr[1]);
    var day = parseInt(dateArr[2]);
    return {
      year: year,
      month: month,
      day: day
    };
  },
  
  // 设置日历显示的日期
  setCalerdarDate: function (mouseEvent) {
    var tdTarget = mouseEvent.currentTarget;
    var dateStr = tdTarget.getAttribute('date'); 
    var dateArr = dateStr.split('-');
    var year = parseInt(dateArr[0]);
    var month = parseInt(dateArr[1]);
    var day = parseInt(dateArr[2]);
    this.currentYear = year;
    this.currentMonth = month;
    this.today = new Date(year, month - 1, day);
    this.render();
  }
};