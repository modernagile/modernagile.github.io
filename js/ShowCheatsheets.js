function displayCheatSheets() {
    for (const entry of cheatsheets) {
        $('#cheatsheet_entries').append(cheatsheet(entry));
    }
}

function cheatsheet(entry) {
    const html = [];
    html.push(`<div class="col-sm-4">`);
    html.push(`<div class="merchandise">`);
    html.push(thumb(entry));
    html.push(title(entry));
    html.push(links(entry));
    html.push(`</div></div>`);
    return html.join('');
}

function thumb(entry) {
    return `<img src="${entry.thumbnail}" alt="${entry.title}">`;
}

function title(entry) {
    return `<div class="meta"><p class="title">${entry.title}</p></div>`;
}

function links(entry) {
    const html = [];
    html.push(`<h5 style="border: 1px solid red">`);
    html.push(languageLinks(entry));
    html.push(creativeCommonsLink());
    html.push(`</h5>`);
    return html.join('');
}

function languageLinks(entry) {
    const links = [];
    for (const source of entry.sources) {
        links.push(languageLink(source) + `<br/>`);
    }
    return links.join('');
}

function languageLink(source) {
    return `` +
        `<a style="display: inline-block; margin-top: 5px;" href="${source.url}" alt="download and print yourself" target="_blank">
            Download in ${source.language}
        </a>`;
}

function creativeCommonsLink() {
    return `` +
        `<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">
            <img style="width: 80px; margin-top: 10px; display: inline-block;"
                alt="Creative Commons License"
                style="border-width:0"
                src="https://i.creativecommons.org/l/by-sa/4.0/80x15.png" />
        </a>`;
}
