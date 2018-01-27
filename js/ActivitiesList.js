function ActivitiesList(container, data, columns, entriesPerPage, paginationAnchor) {
  columns = columns || 1;
  //Cleaning old events;
  FancyList.call(this, container, data, columns, entriesPerPage, paginationAnchor);
  this.cleanOldEvents = function() {
    var cleanedData = [];
    for(var i=0; i<data.length; i++) {
      cleanedData.push(data[i]);
    }
    this.data = cleanedData;
  }
  this.filterRelatedActivities = function(tags, amount, excludeId) {
    var related = [];
    for(var i=0; i<this.data.length; i++) {
      var found = false;
      for (var tag in tags) {
        if (tags.hasOwnProperty(tag) && !found) {
          if(this.data[i].metadata[tag] === "yes") {
            if(excludeId && excludeId === this.data[i].id) {}
            else {
              related.push(this.data[i]);
              found = true;
            }
          }
        }
      }
    }

    if(amount && amount > 1) {
      amount = Math.min(amount, related.length);
      related = related.slice(0, amount);
    }

    this.data = related;
  }
  this.renderAuthor = function(author) {
    if(this.isEmpty(author.name))
      return '';

    var authorPageLink = author.name;
    if(!this.isEmpty(author.url))
      authorPageLink = '<a title="'+ author.name +'" target="_blank" href="'+ authorPage.url +'" data-analytics-event="Activity Events,'+ author +'">'+ authorPageLink +'</a>';

    return '<span class="eventAuthor">'+ authorPageLink +'</span>';
  }
  this.renderAllAuthors = function(authors) {
    if(authors.length === 0)
      return;

    var authorsHtml = [];

    for(var i=0; i<authors.length; i++) {
        var author = authors[i];
        authorsHtml.push(this.renderAuthor(author));
    }
    return authorsHtml.join(', ');
  }
  this.categoryCSSClass = function(hasCategory) {
    return (hasCategory == "yes") ? '' : ' hidden';
  }
  this.renderEntry = function(entryData) {
    var cssClass = entryData.cssClass || '';
    var html = ' \
    <div class="content"> \
      <div class="row"> \
        <div class="col-xs-12"> \
          <div class="activityContent"> \
            <div class="caption"> \
              <a href="./activities?activityId='+ entryData.id +'" target="_blank" class="eventTitle" data-analytics-event="Activity Catalog,'+ entryData.title +',1">'+ entryData.title +'</a>'
              + '<span class="eventAuthor">'+ entryData.metadata.author +'</span>'
              + '<div class="objective"><span class="title">Objective:</span> <p>' + entryData.metadata.objective + '</p></div>'
              + '<div class="duration"><span class="title">Approximate Time:</span> '+ entryData.metadata.duration +'</div>'
              + this.renderCategories(entryData.metadata)
              + '<div class="rw-ui-container" data-title="' + entryData.id + '"></div>'
            '</div> \
          </div> \
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
