var generateMonthTag = function () {
  var dayCSS = 'dayCSS',
      weekCSS = 'weekCSS',
      monthCSS = 'monthCSS';
  dayNames =  ['Monday', 'TuesDay', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  function date2MDate(dateObj) {
    return {
      year: dateObj.getFullYear(),
      month: dateObj.getMonth() + 1,
      day: dateObj.getDate()
    };
  }

  function mDate2Date(mDateObj) {
    return new Date(mDateObj.year, mDateObj.month - 1, mDateObj.day);
  }

  function CalendarDay(dateObj) {
    this.tagName = 'td';
    var mDate = date2MDate(dateObj);
    var lunaDate = calendar.solar2lunar(mDate.year, mDate.month, mDate.day);
    this.innerTag = [];
    this.innerTag.push({
      tagName: 'span',
      attribute: {
        class: 'calendar-new-daynumber'
      },
      text: mDate.day 
    });
    this.innerTag.push({
      tagName: 'span',
      attribute: {
        class: 'calendar-new-table-almana'  
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
  
  function WeekHead(dayNameArr) {
    this.tagName = 'tr';
    this.innerTag = [];
    for (var i = 0; i < 7; i++) {
      var weekTag = {
        tagName: 'th',
        attribute: {
          class: 'dayName'
        },
        text: dayNameArr[i],
      };
      this.innerTag.push(weekTag);
    }
  }

  function CalendarMonth(fisrtDayOfMonth) {
    var mStartDay = date2MDate(fisrtDayOfMonth);
    var dayNameTag = new WeekHead(dayNames);
    this.tagName = 'table';
    this.innerTag = [];
    this.innerTag.push(dayNameTag);
    for (var i = 0; i < 6; i++) {
      var week = new CalendayWeek(mDate2Date(mStartDay));
      this.innerTag.push(week);
      mStartDay.day += 7;
    }
    this.attribute = {
      class: 'monthClass'
    };
  }
  
  function getMonthTags(firstDateObj) {
    var calMonth = new CalendarMonth(firstDateObj);
    var monthTags = generateTag(calMonth);
    return monthTags;
  }
  
  var app = {};
  app.getMonthTags = getMonthTags;
  app.setDayCSS = function () {
    return function (dayCSSSetTo) {
      dayCSS = dayCSSSetTo;
    };
  };
  app.setWeekCSS = function () {
    return function (weekCSSSetTo) {
      weekCSS = weekCSSSetTo;
    };
  };
  app.setMonthCSS = function () {
    return function (monthCSSSetTO) {
      monthCSS = monthCSSSetTO;    
    };
  };
  app.setWeekNames = function (dayNameArray) {
      dayNames = dayNameArray;
  };
  return app;
}();