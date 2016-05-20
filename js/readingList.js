readingList = {
  createList: function(data, cols, parent) {
    var list = jQuery('<div />');
    var count = 0;
    while(count < data.length) {
      var entryObj = data[count];
      var row = jQuery('<div/>').addClass('row');
      for(var col=0; col<cols; col++) {
        if(count >= data.length)
          break;

        row.append('<div class="col-sm-'+cols+'">'+this.listItemTemplate(entryObj.cover, entryObj.title, entryObj.resume, entryObj.categories, entryObj.amazonLink, entryObj.downloadLink)+'</div>');
        count++;
      }
      list.append(row);
    }
    jQuery(parent).append(list);
  },
  listItemTemplate: function(cover, title, resume, categories, amazon, download) {
    var links = '';
    if(amazon || download) {
      if(amazon)
        links += '<a href="'+amazon+'">Buy at Amazon</a>';

      if(download)
        links += '<a href="'+amazon+'">Download</a>';

      links = '<p>'+links+'</p>';
    }
    var html = ' \
      <div class="thumbnail"> \
        <img alt="'+title+'" src="'+cover+'"> \
        <div class="caption"> \
          <h3>'+title+'</h3> \
            <p>'+resume+'</p>'
            +links+
        '</div> \
      </div> \
    ';
    return html;
  },
};
