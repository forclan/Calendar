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
    this.year = date.getFullYear();
    this.month = date.getMonth() + 1;
    var divObj = document.createElement('div');
    document.body.appendChild(divObj);
    this.divObj = divObj;
    this.render();
  },
   
  render: function () {
    var monthTags = this.getCanlendarMonth(this.year, this.month);
    this.divObj.innerHTML = monthTags;
  },
  setWeekName: function (dayNameSetTo) {
      generateMonthTag.setWeekNames(dayNameSetTo);
      this.render();
  }
};