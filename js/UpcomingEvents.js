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
    //return (today > eventDate);
    if(today.getFullYear() > eventDate.getFullYear()) 
      return true;
    if(today.getFullYear() == eventDate.getFullYear() && today.getMonth() > eventDate.getMonth())
      return true;
    if(today.getFullYear() == eventDate.getFullYear() && today.getMonth() == eventDate.getMonth() && today.getDate() > eventDate.getDate())
      return true;

    return false;
  }
  this.formatDate = function(dateString) {
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];
    var date = new Date(dateString);
    return monthNames[date.getMonth()] +' '+ date.getDate() +', '+ date.getFullYear();
  }
  this.renderAuthor = function(author, authorPage, eventTitle) {
    if(this.isEmpty(author))
      return '';

    var authorPageLink = author;
    if(!this.isEmpty(authorPage))
      authorPageLink = '<a title="'+ author +'" target="_blank" href="'+ authorPage +'" data-analytics-event="Upcoming Events,'+ author +'">'+ authorPageLink +'</a>';

    return '<span class="eventAuthor">'+ authorPageLink +'</span>';
  }
  this.renderEntry = function(entryData) {
    var cssClass = entryData.cssClass || '';
    var html = ' \
    <div class="content"> \
      <div class="row"> \
        <div class="col-xs-3"> \
          <div class="thumbnail square"> \
            <a title="'+ entryData.title +'" href="'+ entryData.url +'" target="_blank" data-analytics-event="Upcoming Events,'+ entryData.title +',0"><img class="'+ cssClass +'" alt="'+ entryData.title +'" src="'+ entryData.thumbnail +'"></a> \
          </div> \
        </div> \
        <div class="col-xs-9"> \
          <div class="caption"> \
            <a href="'+ entryData.url +'" target="_blank" class="eventTitle" data-analytics-event="Upcoming Events,'+ entryData.title +',1">'+ entryData.title +'</a>'
            + this.renderAuthor(entryData.author, entryData.authorPage, entryData.title) +
            '<span class="eventLocation">'+ entryData.location +' - '+ this.formatDate(entryData.date) +'</span>'
            + this.renderCategories(entryData.categories) +
          '</div> \
        </div> \
        </div> \
      </div> \
    ';
    return html;
  }
  this.cleanOldEvents();
}

UpcomingEvents.prototype = Object.create(FancyList.prototype);
UpcomingEvents.prototype.constructor = UpcomingEvents;
