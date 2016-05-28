function LearnMore(container, data, columns, entriesPerPage) {
  FancyList.call(this, container, data, columns, entriesPerPage);
  this.getLink =  function(url) {
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
  }
  this.renderEntry = function(entryData) {
    var link = this.getLink(entryData.url);
    var resumeParagraph = (!this.isEmpty(entryData.resume)) ? '<p>'+ entryData.resume +'</p>' : '';
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
            <h4>'+ entryData.title +'</h4>'
            + resumeParagraph + this.renderCategories(entryData.categories) + link +
          '</div> \
        </div> \
      </div> \
    ';
    return html;
  }
}

LearnMore.prototype = Object.create(FancyList.prototype);
LearnMore.prototype.constructor = LearnMore;
