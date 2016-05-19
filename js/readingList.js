readingList = {
  cols: 0;
  createList: function(data, cols) {

  },
  listItemTemplate: function(cover, title, resume, amazon, download) {
    var links = '';
    if(amazon || download) {
      if(amazon)
        links += '<a href="'+amazon+'">Buy at Amazon</a>';

      if(download)
        links += '<a href="'+amazon+'">Download</a>';

      links = '<p>'+links+'</p>';
    }
    var html = '
      <div class="thumbnail"> \
        <img alt="'+title+'" src="'+cover+'"> \
        <div class="caption"> \
          <h3>'+title+'</h3> \
            <p>'+resume+'</p>'
            +links+
        '</div> \
      </div> \
    ';
  },
};
