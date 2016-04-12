function Calendar () {
  var monthNames = ['January','February','March','April','May','June',
		'July','August','September','October','November','December'],
      dayNames = ['Monday', 'TuesDay', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  var divObj = null,
      tableObj = null;
  var today = 0;


}
Calendar.prototype = {
  // create a 5 * 7 td in tables
  monthNames: ['January','February','March','April','May','June',
		'July','August','September','October','November','December'],
    
  dayNames: ['Monday', 'TuesDay', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  
  initTdAndTr: function (table) {
    // var tableObj = document.getElementById(tableName);
    var inHtml = "";
    for (var i = 0; i < 7; i++) {
      inHtml += '<th>' + this.dayNames[i] + '</th>';    
    }
    for (var index = 0; index < 5; index++) {
      inHtml += '<tr>';
      for (var j = 0; j < 7; j++) {
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
    return '<td class="' + classSet + '">' + day + '</td>';
  }
    
};