// Web Component for Cheatsheet List
class CheatsheetListComponent extends HTMLElement {
    constructor() {
        super();
        this._data = [];
    }
    
    connectedCallback() {
        // Use global cheatsheets data if available
        if (typeof cheatsheets !== 'undefined') {
            this.data = cheatsheets;
        }
    }
    
    set data(value) {
        this._data = value;
        this.render();
    }
    
    get data() {
        return this._data;
    }
    
    render() {
        if (!this._data || this._data.length === 0) return;
        
        this.innerHTML = this._data.map(entry => this.cheatsheet(entry)).join('');
    }
    
    cheatsheet(entry) {
        const html = [];
        html.push(this.openingTags());
        html.push(this.thumbnail(entry));
        html.push(this.title(entry));
        html.push(this.links(entry));
        html.push(this.closingTags());
        return html.join('');
    }
    
    thumbnail(entry) {
        return `<img style="border: 1px solid lavender;" src="${entry.thumbnail}" alt="${entry.title}">`;
    }
    
    title(entry) {
        return `<div class="meta"><p class="title">${entry.title}</p></div>`;
    }
    
    links(entry) {
        const html = [];
        html.push(`<h5>`);
        html.push(this.languageLinks(entry.sources));
        html.push(this.creativeCommonsLink());
        html.push(`</h5>`);
        return html.join('');
    }
    
    languageLinks(sources) {
        const links = sources.map(source => {
            return this.languageLink(source);
        });
        return `Download in ` + links.join(', ') + `<br>`;
    }
    
    languageLink(source) {
        return `` +
            `<a style="display: inline-block; 
                margin-top: 5px;" 
                href="${source.url}" alt="download and print yourself" 
                target="_blank">
                ${source.language}
            </a>`;
    }
    
    creativeCommonsLink() {
        return `` +
            `<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">
                <img style="width: 80px; margin-top: 10px; display: inline-block;"
                    alt="Creative Commons License"
                    style="border-width:0"
                    src="https://i.creativecommons.org/l/by-sa/4.0/80x15.png" />
            </a>`;
    }
    
    openingTags() {
        return `<div class="col-sm-4"><div class="merchandise">`;
    }
    
    closingTags() {
        return `</div></div>`;
    }
}

// Register the custom element
customElements.define('cheatsheet-list', CheatsheetListComponent);
