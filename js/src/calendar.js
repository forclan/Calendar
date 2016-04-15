function Calendar () {
  this.today = null;
  this.currentYear = null;
  this.currentMonth = null;
  this.divObj = null;

}
Calendar.prototype = {
  
  setCurrentYearMonth: function (year, month) {
    this.currentYear = year;
    this.currentMonth = month;
  },

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
  
  init: function () {
    var date = new Date();
    var that = this;
    this.currentYear = date.getFullYear();
    this.currentMonth = date.getMonth() + 1;
    this.today = date.getDay() === 0 ? 7 : date.getDay();
    var divObj = document.createElement('div');
    document.body.appendChild(divObj);
    this.divObj = divObj;
    this.render();
  },
  
  addDayClickListen: function () {
    var that = this;
    var divObj = this.divObj;
    var tdArr = divObj.getElementsByTagName('td');
    var a = function (ss) {
      return function () {
         console.log('fff'+ss)  ;
      };
      
    };
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
  render: function () {
    var monthTags = this.getCanlendarMonth(this.currentYear, this.currentMonth);
    this.divObj.innerHTML = monthTags;
    this.addDayClickListen();
  },
  setWeekName: function (dayNameSetTo) {
      generateMonthTag.setWeekNames(dayNameSetTo);
      this.render();
  },
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