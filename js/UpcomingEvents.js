function UpcomingEvents(container, data, entriesPerPage) {
  //Cleaning old events;
  FancyList.call(this, container, data, 1, entriesPerPage);
  this.cleanOldEvents = function() {
    var cleanedData = [];
    for(var i=0; i<data.length; i++) {
      var entry = data[i];
      if(!this.hasHappened(entry.date))
        cleanedData.push(entry);
    }
    cleanedData.sort(function(a, b){
      var dateA=new Date(a.date), dateB=new Date(b.date)
      return dateA-dateB //sort by date ascending
    });
    this.data = cleanedData;
  }
  this.hasHappened = function(dateString) {
    var eventDate = new Date(dateString);
    var today = new Date();
    return (today > eventDate);
  }
  this.formatDate = function(dateString) {
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];
    var date = new Date(dateString);
    return monthNames[date.getMonth()] +' '+ date.getDay() +', '+ date.getFullYear();
  }
  this.renderEntry = function(entryData) {
    var cssClass = entryData.cssClass || '';
    var html = ' \
      <div class="row"> \
        <div class="col-xs-3"> \
          <div class="thumbnail square"> \
            <img class="'+ cssClass +'" alt="'+ entryData.title +'" src="'+ entryData.thumbnail +'"> \
          </div> \
        </div> \
        <div class="col-xs-9"> \
          <div class="caption"> \
            <a href="'+ entryData.url +'" target="_blank">'+ entryData.title +'</a> \
            <span>'+ entryData.location +' - '+ this.formatDate(entryData.date) +'</span>'
            + this.renderCategories(entryData.categories) +
          '</div> \
        </div> \
      </div> \
    ';
    return html;
  }
  this.cleanOldEvents();
}

UpcomingEvents.prototype = Object.create(FancyList.prototype);
UpcomingEvents.prototype.constructor = UpcomingEvents;
