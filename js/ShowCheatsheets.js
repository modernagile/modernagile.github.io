function displayCheatSheets(){
    console.log(cheatsheets);

    for(entry of cheatsheets){
        const thumbnail = entry.thumbnail || "thumbnail";
        const title = entry.title || 'title';
        const url = entry.url || 'url';
        const content = '\
  <div class="col-sm-4">\
  <div class="merchandise">\
    <img src="'+thumbnail+'" alt="'+title+'">\
    <div class="meta">\
      <p class="title">'+title+'</p>\
    </div>\
      <h5>\
        <a href="'+url+'" alt="download and print yourself" target="_blank">Download in English</a><br/>\
        <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"> \
        <img style="width: 80px; margin-top: 10px; display: inline-block;"  \
            alt="Creative Commons License" \
            style="border-width:0" \
            src="https://i.creativecommons.org/l/by-sa/4.0/80x15.png" /> \
        </a>\
      </h5>\
  </div>\
</div>';
//         const domStuff = new DOMParser().parseFromString(content);
//         console.log(domStuff);
      $('#cheatsheet_entries').append(content);
    }
}
