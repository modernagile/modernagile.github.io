String.prototype.i

learnMore = {
  createList: function(data, cols, parent) {
    var list = jQuery('<div />');
    var count = 0;
    while(count < data.length) {
      var row = jQuery('<div/>').addClass('row');
      for(var col=0; col<cols; col++) {
        if(count >= data.length)
          break;

        var entryObj = data[count];

        row.append('<div class="col-sm-'+cols+'">'+this.listItemTemplate(entryObj.thumbnail, entryObj.title, entryObj.resume, entryObj.categories, entryObj.url)+'</div>');
        count++;
      }
      list.append(row);
    }
    jQuery(parent).html(list);
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
  isDownloadableFile: function(url) {
    if(this.isEmpty(url))
      return false;
    modifiedUrl = url.trim();
    var regex = /[.].{3}$/;
    return regex.text(modifiedUrl);
  },
  contains: function(string, match, disableCase) {
    disableCase = disableCase || false;
    if(this.isEmpty(string))
      return false;

    var modifiedString = (disableCase) ? string.toLowerCase() : string;
    var modifiedMatch = (disableCase) ? match.toLowerCase() : string;

    return (modifiedString.indexOf(modifiedMatch) > -1);
  },
  listItemTemplate: function(thumbnail, title, resume, categories, url) {
    var link = this.getLink(url);
    var resumeParagraph = (!this.isEmpty(resume)) ? '<p>'+resume+'</p>' : '';
    var html = ' \
      <div class="content"> \
        <div class="row"> \
          <div class="col-xs-3"> \
            <div class="thumbnail square"> \
              <img alt="'+title+'" src="'+thumbnail+'"> \
            </div> \
          </div> \
          <div class="col-xs-9"> \
            <div class="caption"> \
              <h4>'+title+'</h4>'
              + resumeParagraph + link +
            '</div> \
          </div> \
        </div> \
      </div> \
    ';
    return html;
  }
};
