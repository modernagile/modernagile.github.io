var FancyList = function(container, data, cols, entriesPerPage) {
  this.conainer = container;
  this.data = data;
  this.columnsPerPage = columns;
  if(entriesPerPage && entriesPerPage > 0) {
    this.entriesPerPage = entriesPerPage;
    this.currentPage = 1;
  }

  //Pivate Methods
  var isPaginated = function() {
    return (this.entriesPerPage > 0);
  }
  var getNumberOfPages = function() {
    var numberOfPages = Math.ceil(this.data.length/this.entriesPerPage);
    return numberOfPages;
  }
  var isOnFirstPage = function() {
    return (this.currentPage === 1);
  }
  var isOnLastPage = function() {
    return (this.currentPage === this.getNumberOfPages());
  }
  var isEmpty = function(string) {
      if(typeof string === 'undefined' || !string)
        return true;
      if(string.length === 0 || !string.trim())
        return true;
      return false;
  }
  var isDownloadableFile = function(url) {
    if(this.isEmpty(url))
      return false;
    modifiedUrl = url.trim();
    var regex = /[.].{3}$/;
    return regex.test(modifiedUrl);
  }
  var contains = function(string, match, disableCase) {
    disableCase = disableCase || false;
    if(this.isEmpty(string))
      return false;

    var modifiedString = (disableCase) ? string.toLowerCase() : string;
    var modifiedMatch = (disableCase) ? match.toLowerCase() : string;

    return (modifiedString.indexOf(modifiedMatch) > -1);
  }
  var renderCategories = function(categories) {
    var html = '';

    if(categories.makePeopleAwesome)
      html += '<li class="makePeopleAwesome-category">Make People Awesome</li>';
    if(categories.makeSafetyAPrerequisite)
      html += '<li class="makeSafetyAPrerequisite-category">Make Safety a Prerequisite</li>';
    if(categories.experimentAndLearnRapidly)
      html += '<li class="experimentAndLearnRapidly-category">Experiment & Learn Rapidly</li>';
    if(categories.deliverValueContinuously)
      html += '<li class="deliverValueContinuously-category">Deliver Value Continuously</li>';

    if(!this.isEmpty(html))
      html = '<ul class="categories">'+ html +'</ul>';
    return html;
  }
  var renderPagination = function(parent) {
    var numberOfPages = Math.ceil(this.data.length/this.entriesPerPage);
    var pages = '';
    var scrollTo = '#'+jQuery(this.parent).closest('section').attr('id');
    for(var page=1; page<=numberOfPages; page++) {
      var active = (page == this.currentPage) ? 'active' : '';
      pages+= '<li class="'+ active +'"><a href="'+scrollTo+'" title="page '+ page +'" class="pagination-pageNumber">'+ page +'</a></li>';
    }
    var prevDisabledCss = (this.currentPage === 1) ? 'disabled' : '';
    var nextDisabledCss = (this.currentPage === numberOfPages) ? 'disabled' : '';
    var pagination = ' \
    <nav> \
      <ul class="pagination"> \
        <li class="'+ prevDisabledCss +'"> \
          <a class="pagination-button" href="#'+scrollTo+'" data-page-mod="-1" title="Previous" aria-label="Previous"> \
            <span aria-hidden="true">&laquo;</span> \
          </a> \
        </li>'
        + pages +
        '<li class="'+ nextDisabledCss +'"> \
          <a class="pagination-button" href="'+scrollTo+'" data-page-mod="1" title="Next" aria-label="Next"> \
            <span aria-hidden="true">&raquo;</span> \
          </a> \
        </li> \
      </ul> \
      </nav>';
    jQuery(parent).append(pagination);
    jQuery('.pagination-pageNumber').click(function() {
      learnMore.gotoPage(parseInt(jQuery(this).text()));
    });
    jQuery('.pagination-button').click(function() {
      if(jQuery(this).parent().hasClass('disabled'))
        return;

      learnMore.gotoPage(learnMore.currentPage+parseInt(jQuery(this).attr('data-page-mod')));
    });
  }
  var renderList = function(entries) {
    var list = '';
    var numberOfEntries = entries.length;
    for(var i=0; i<numberOfEntries; i++) {
      var entryData = entries[i];
      var entry = '<div class="col-sm-'+parseInt(12/this.columnsPerPage)+'">'+this.renderEntry(entryData)+'</div>';
      if(i % columnsPerPage === 0)
        entry = '<div class="row">'+ entry +'</div>';
      list += entry;
    }
    jQuery(this.parent).html(list);
  }

  //Privileged methods
  this.previousPage = function() {
    if(!this.isPaginated() || this.isOnFirstPage())
      return;

    this.gotoPage(this.currentPage-1);
  }
  this.nextPage = function() {
    if(!this.isPaginated() || this.isOnLastPage())
      return;

    this.gotoPage(this.currentPage+1);
  }
  this.gotoPage = function(pageNumber) {
    if(!this.isPaginated() || pageNumber < 1 || pageNumber > this.getNumberOfPages())
      return;

    //var pageEntry = this.entriesPerPage * (pageNumber-1);
    this.currentPage = pageNumber;
    this.render();
  }
  this.render function() {
    var firstEntry = (this.isPaginated()) ? this.entriesPerPage * (this.currentPage-1) : 0;
    var lastEntry = (this.isPaginated()) ? Math.min(firstEntry + this.entriesPerPage, this.data.length-1) : this.data.length-1;

    this.renderList(this.data.slice(firstEntry, lastEntry+1));

    if (this.isPaginated())
      this.renderPagination();
  }
}

//Public methods
FancyList.renderEntry = function(entryData) {
  var entry = '';
  for (var property in entryData) {
    if (entryData.hasOwnProperty(property)) {
        entry += '<p>'+ property + ':'+ entryData.property +'</p>';
    }
  }
  return entry;
}
