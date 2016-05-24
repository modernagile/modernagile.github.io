learnMore = {
  entriesPerPage: 0,
  currentPage: 1,
  data: null,
  cols: null,
  parent: null,

  setup: function(data, cols, parent, firstEntry, entriesPerPage) {
    this.data = data;
    this.cols = cols;
    this.parent = parent;
    this.entriesPerPage = entriesPerPage;
    this.createList(0);
  },
  createList: function(firstEntry) {
    firstEntry = firstEntry || 0;
    var list = jQuery('<div />');
    var count = firstEntry;
    while(count < this.data.length && count-firstEntry < this.entriesPerPage) {
      var row = jQuery('<div/>').addClass('row');
      for(var col=0; col<this.cols; col++) {
        if(count >= this.data.length)
          break;

        var entryObj = this.data[count];

        row.append('<div class="col-sm-'+parseInt(12/this.cols)+'">'+this.listItemTemplate(entryObj.thumbnail, entryObj.title, entryObj.resume, entryObj.cssClass, entryObj.categories, entryObj.url)+'</div>');
        count++;
      }
      list.append(row);
    }
    jQuery(this.parent).html(list);
    this.createPagination(this.parent);
  },
  nextPage: function() {
    //this.createList(this.data, this.cols, this.parent)
  },
  gotoPage: function(page) {
    var firstEntry = this.entriesPerPage * (page-1);
    this.currentPage = page;
    this.createList(firstEntry);
  },
  createPagination: function(parent) {
    var numberOfPages = Math.ceil(this.data.length/this.entriesPerPage);
    var pages = '';
    for(var page=1; page<=numberOfPages; page++) {
      var active = (page == this.currentPage) ? 'active' : '';
      pages+= '<li class="'+ active +'"><a title="page '+ page +'" class="pagination-pageNumber">'+ page +'</a></li>';
    }
    var prevDisabledCss = (this.currentPage === 1) ? 'disabled' : '';
    var nextDisabledCss = (this.currentPage === numberOfPages) ? 'disabled' : '';
    var pagination = ' \
    <nav> \
      <ul class="pagination"> \
        <li class="'+ prevDisabledCss +'"> \
          <a class="pagination-button" data-page-mod="-1" title="Previous" aria-label="Previous"> \
            <span aria-hidden="true">&laquo;</span> \
          </a> \
        </li>'
        + pages +
        '<li class="'+ nextDisabledCss +'"> \
          <a class="pagination-button" data-page-mod="1" title="Next" aria-label="Next"> \
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
  },
  isEmpty: function(string) {
      if(typeof string === 'undefined' || !string)
        return true;
      if(string.length === 0 || !string.trim())
        return true;
      return false;
  },
  getLink: function(url) {
    if(this.isEmpty(url))
      return '';

    var linkText;
    if(this.contains(url, 'youtube.com', true) || this.contains(linkText, 'youtu.be', true))
      linkText = 'Watch on Youtube';
    else if(this.contains(url, 'amazon.com', true))
      linkText = 'Buy on Amazon';
    else if(this.isDownloadableFile(url))
      linkText = 'Download Article';
    else
      linkText = 'Read Article';

    return '<a href="'+ url +'" target="_blank">'+ linkText +'</a>';
  },
  showCategories: function(categories) {
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
  },
  isDownloadableFile: function(url) {
    if(this.isEmpty(url))
      return false;
    modifiedUrl = url.trim();
    var regex = /[.].{3}$/;
    return regex.test(modifiedUrl);
  },
  contains: function(string, match, disableCase) {
    disableCase = disableCase || false;
    if(this.isEmpty(string))
      return false;

    var modifiedString = (disableCase) ? string.toLowerCase() : string;
    var modifiedMatch = (disableCase) ? match.toLowerCase() : string;

    return (modifiedString.indexOf(modifiedMatch) > -1);
  },
  listItemTemplate: function(thumbnail, title, resume, cssClass, categories, url) {
    var link = this.getLink(url);
    var resumeParagraph = (!this.isEmpty(resume)) ? '<p>'+resume+'</p>' : '';
    cssClass = cssClass || '';
    var html = ' \
      <div class="content"> \
        <div class="row"> \
          <div class="col-xs-3"> \
            <div class="thumbnail square"> \
              <img class="'+ cssClass +'" alt="'+title+'" src="'+thumbnail+'"> \
            </div> \
          </div> \
          <div class="col-xs-9"> \
            <div class="caption"> \
              <h4>'+title+'</h4>'
              + resumeParagraph + this.showCategories(categories) + link +
            '</div> \
          </div> \
        </div> \
      </div> \
    ';
    return html;
  }
};
