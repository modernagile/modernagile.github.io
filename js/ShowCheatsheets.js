function displayCheatSheets() {

    for(let entry of cheatsheets) {
        content = `
            <div class="col-sm-4">
            <div class="merchandise">
                <img src="${entry.thumbnail}" alt="${entry.title}">
                <div class="meta">
                <p class="title">${entry.title}</p>
                </div><h5>`;
        for (source of entry.sources) {
            content = content.concat( `
            <a style="display: inline-block; margin-top: 5px;" href="${source.url}" alt="download and print yourself" target="_blank">
            Download in ${source.language}
            </a><br/>`
            );
        }
        content = content.concat(`<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"> 
            <img style="width: 80px; margin-top: 10px; display: inline-block;"  
                alt="Creative Commons License" 
                style="border-width:0" 
                src="https://i.creativecommons.org/l/by-sa/4.0/80x15.png" /> 
            </a>
            </h5></div></div>`);
        $('#cheatsheet_entries').append(content);
    }
}
