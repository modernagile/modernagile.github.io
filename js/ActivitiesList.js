function ActivitiesList(container, data, entriesPerPage) {
  //Cleaning old events;
  FancyList.call(this, container, data, 1, entriesPerPage);
  this.cleanOldEvents = function() {
    var cleanedData = [];
    for(var i=0; i<data.length; i++) {
      cleanedData.push(data[i]);
    }
    this.data = cleanedData;
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
        <div class="col-xs-1"></div> \
        <!--div class="col-xs-3"> \
          <div class="thumbnail square"> \
            <a title="'+ entryData.title +'" href="'+ entryData.url +'" target="_blank" data-analytics-event="Upcoming Events,'+ entryData.title +',0"><img class="'+ cssClass +'" alt="'+ entryData.title +'" src="'+ entryData.thumbnail +'"></a> \
          </div> \
        </div--> \
        <div class="col-xs-9"> \
          <div class="caption"> \
            <a href="'+ entryData.url +'" target="_blank" class="eventTitle" data-analytics-event="Upcoming Events,'+ entryData.title +',1">'+ entryData.title +'</a>' 
            + this.renderAuthor(entryData.author, entryData.authorPage, entryData.title)
            + '<div class="objective"><span class="title">Objective:</span> <p>' + entryData.objective + '</p></div>'
            + this.renderCategories(entryData.categories)
            + '<div class="duration"><span class="title">Approximate Time:</span> '+ entryData.duration +'</div>'
            + '<div class="score"><span class="title">Score:</span> ' + entryData.score + ' / 5</div>' +
          '</div> \
        </div> \
        </div> \
      </div> \
    ';
    return html;
  }
  this.cleanOldEvents();
}

ActivitiesList.prototype = Object.create(FancyList.prototype);
ActivitiesList.prototype.constructor = ActivitiesList;
