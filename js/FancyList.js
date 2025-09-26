// Web Component for FancyList
class FancyListComponent extends HTMLElement {
  constructor() {
    super();
    this._data = [];
    this._columns = 2;
    this._entriesPerPage = 0;
    this._currentPage = 1;
    this._paginationAnchor = null;
  }
  
  static get observedAttributes() {
    return ['data', 'columns', 'entries-per-page', 'pagination-anchor'];
  }
  
  connectedCallback() {
    this.classList.add('fancyList');
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'data':
        try {
          this._data = JSON.parse(newValue);
        } catch (e) {
          this._data = [];
        }
        break;
      case 'columns':
        this._columns = parseInt(newValue) || 2;
        break;
      case 'entries-per-page':
        this._entriesPerPage = parseInt(newValue) || 0;
        if (this._entriesPerPage > 0) {
          this._currentPage = 1;
        }
        break;
      case 'pagination-anchor':
        this._paginationAnchor = newValue;
        break;
    }
    this.render();
  }
  
  // Getter/setter properties for programmatic access
  set data(value) {
    this._data = value || [];
    this.render();
  }
  
  get data() {
    return this._data;
  }
  
  set columns(value) {
    this._columns = parseInt(value) || 2;
    this.render();
  }
  
  get columns() {
    return this._columns;
  }
  
  set entriesPerPage(value) {
    this._entriesPerPage = parseInt(value) || 0;
    if (this._entriesPerPage > 0) {
      this._currentPage = 1;
    }
    this.render();
  }
  
  get entriesPerPage() {
    return this._entriesPerPage;
  }
  
  set paginationAnchor(value) {
    this._paginationAnchor = value;
  }
  
  get paginationAnchor() {
    return this._paginationAnchor;
  }
  
  get currentPage() {
    return this._currentPage;
  }
  
  // Core functionality methods
  isPaginated() {
    return (this._entriesPerPage > 0);
  }
  
  hasPaginationAnchor() {
    return this.isPaginated() && this._paginationAnchor;
  }
  
  getNumberOfPages() {
    return Math.ceil(this._data.length / this._entriesPerPage);
  }
  
  isOnFirstPage() {
    return (this._currentPage === 1);
  }
  
  isOnLastPage() {
    return (this._currentPage === this.getNumberOfPages());
  }
  
  isEmpty(string) {
    if (typeof string === 'undefined' || !string)
      return true;
    if (string.length === 0 || !string.trim())
      return true;
    return false;
  }
  
  isDownloadableFile(url) {
    if (this.isEmpty(url))
      return false;
    const modifiedUrl = url.trim();
    const regex = /[.].{3}$/;
    return regex.test(modifiedUrl);
  }
  
  contains(string, match, disableCase) {
    disableCase = disableCase || false;
    if (this.isEmpty(string))
      return false;

    const modifiedString = (disableCase) ? string.toLowerCase() : string;
    const modifiedMatch = (disableCase) ? match.toLowerCase() : string;

    return (modifiedString.indexOf(modifiedMatch) > -1);
  }
  
  renderCategories(categories) {
    let html = '';

    html += `<li class="makePeopleAwesome-category${this.categoryCSSClass(categories.makePeopleAwesome)}" title="Make People Awesome"><span>Make People Awesome</span></li>`;
    html += `<li class="makeSafetyAPrerequisite-category${this.categoryCSSClass(categories.makeSafetyAPrerequisite)}" title="Make Safety a Prerequisite"><span>Make Safety a Prerequisite</span></li>`;
    html += `<li class="experimentAndLearnRapidly-category${this.categoryCSSClass(categories.experimentAndLearnRapidly)}" title="Experiment & Learn Rapidly"><span>Experiment & Learn Rapidly</span></li>`;
    html += `<li class="deliverValueContinuously-category${this.categoryCSSClass(categories.deliverValueContinuously)}" title="Deliver Value Continuously"><span>Deliver Value Continuously</span></li>`;

    if (!this.isEmpty(html))
      html = `<ul class="categories">${html}</ul>`;
    return html;
  }
  
  categoryCSSClass(hasCategory) {
    return (hasCategory) ? '' : ' hidden';
  }
  
  renderPagination() {
    if (Math.ceil(this._data.length / this._entriesPerPage) < 2)
      return;
      
    const existingPagination = this.querySelector('.pagination');
    if (!existingPagination) {
      const numberOfPages = this.getNumberOfPages();
      let pages = '';
      const paginationAnchor = this.hasPaginationAnchor() ? ` data-anchor="${this._paginationAnchor}" ` : ' ';
      
      for (let page = 1; page <= numberOfPages; page++) {
        const active = (page === this._currentPage) ? 'active' : '';
        pages += `<li class="${active}"><a${paginationAnchor}title="page ${page}" class="pagination-pageNumber" data-analytics-event="Pagination,Goto page,${page}" data-page="${page}">${page}</a></li>`;
      }
      
      const prevDisabledCss = (this._currentPage === 1) ? 'disabled' : '';
      const nextDisabledCss = (this._currentPage === numberOfPages) ? 'disabled' : '';
      
      const pagination = `
        <nav>
          <ul class="pagination">
            <li class="${prevDisabledCss}">
              <a class="pagination-button previous"${paginationAnchor}title="Previous" aria-label="Previous" data-analytics-event="Pagination,Previous page">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            ${pages}
            <li class="${nextDisabledCss}">
              <a class="pagination-button next"${paginationAnchor}title="Next" aria-label="Next" data-analytics-event="Pagination,Next page">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>`;
        
      this.insertAdjacentHTML('beforeend', pagination);
      this._setupPaginationEvents();
    } else {
      // Update existing pagination
      this.querySelectorAll('li.active').forEach(li => li.classList.remove('active'));
      const currentPageLink = this.querySelector(`.pagination-pageNumber[data-page="${this._currentPage}"]`);
      if (currentPageLink) {
        currentPageLink.parentElement.classList.add('active');
      }

      this.querySelectorAll('.pagination-button.previous, .pagination-button.next').forEach(btn => {
        btn.parentElement.classList.remove('disabled');
      });
      
      if (this._currentPage === 1) {
        const prevBtn = this.querySelector('.pagination-button.previous');
        if (prevBtn) prevBtn.parentElement.classList.add('disabled');
      } else if (this._currentPage === this.getNumberOfPages()) {
        const nextBtn = this.querySelector('.pagination-button.next');
        if (nextBtn) nextBtn.parentElement.classList.add('disabled');
      }
    }
  }
  
  _setupPaginationEvents() {
    this.querySelectorAll('.pagination-pageNumber').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.scrollTo(e.target, 500);
        const targetPageNumber = parseInt(e.target.getAttribute('data-page'));
        setTimeout(() => {
          this.gotoPage(targetPageNumber);
        }, 500);
      });
    });
    
    const nextBtn = this.querySelector('.pagination-button.next');
    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target.parentElement.classList.contains('disabled'))
          return;
        this.scrollTo(e.target, 500);
        setTimeout(() => this.nextPage(), 500);
      });
    }
    
    const prevBtn = this.querySelector('.pagination-button.previous');
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target.parentElement.classList.contains('disabled'))
          return;
        this.scrollTo(e.target, 500);
        setTimeout(() => this.previousPage(), 500);
      });
    }
  }
  
  scrollTo(link, duration) {
    if (!link.hasAttribute('data-anchor'))
      return;
    const target = document.querySelector(link.getAttribute('data-anchor'));
    if (target) {
      const targetPosition = target.offsetTop;
      window.scrollTo({
        top: Math.max(0, targetPosition - 45),
        behavior: 'smooth'
      });
    }
  }
  
  renderList(entries) {
    // Remove existing rows
    this.querySelectorAll('.row').forEach(row => row.remove());
    
    let count = 0;
    while (count < entries.length) {
      const row = document.createElement('div');
      row.className = 'row';
      
      for (let col = 0; col < this._columns; col++) {
        if (count >= entries.length)
          break;

        const entryData = entries[count];
        const colDiv = document.createElement('div');
        colDiv.className = `col-sm-${parseInt(12/this._columns)} fancyListEntry`;
        colDiv.innerHTML = this.renderEntry(entryData);
        row.appendChild(colDiv);
        count++;
      }
      this.prepend(row);
    }
  }
  
  previousPage() {
    if (!this.isPaginated() || this.isOnFirstPage())
      return;
    this.gotoPage(this._currentPage - 1);
  }
  
  nextPage() {
    if (!this.isPaginated() || this.isOnLastPage())
      return;
    this.gotoPage(this._currentPage + 1);
  }
  
  gotoPage(pageNumber) {
    if (!this.isPaginated() || pageNumber < 1 || pageNumber > this.getNumberOfPages())
      return;
    this._currentPage = pageNumber;
    this.render();
  }
  
  renderEntry(entryData) {
    let entry = '';
    for (const property in entryData) {
      if (entryData.hasOwnProperty(property)) {
        entry += `<p class="truncate" style="margin: 0;">${property}: ${entryData[property]}</p>`;
      }
    }
    return entry;
  }
  
  render() {
    if (!this._data || this._data.length === 0) return;
    
    const firstEntry = this.isPaginated() ? this._entriesPerPage * (this._currentPage - 1) : 0;
    const lastEntry = this.isPaginated() ? Math.min(firstEntry + this._entriesPerPage - 1, this._data.length - 1) : this._data.length - 1;

    this.renderList(this._data.slice(firstEntry, lastEntry + 1));

    if (this.isPaginated())
      this.renderPagination();
  }
}

// Register the custom element
customElements.define('fancy-list', FancyListComponent);

// Backward compatibility - keep original constructor function
var FancyList = function(container, data, columns, entriesPerPage, paginationAnchor) {
  this.container = document.querySelector(container);
  this.data = data;
  this.columns = columns;
  if(entriesPerPage && entriesPerPage > 0) {
    this.entriesPerPage = entriesPerPage;
    this.currentPage = 1;
    if(paginationAnchor)
      this.paginationAnchor = paginationAnchor;
  }
  this.container.classList.add('fancyList');

  // Create Web Component and transfer data
  const webComponent = document.createElement('fancy-list');
  webComponent.data = data;
  webComponent.columns = columns;
  webComponent.entriesPerPage = entriesPerPage || 0;
  if (paginationAnchor) {
    webComponent.paginationAnchor = paginationAnchor;
  }
  
  // Replace container content with web component
  this.container.innerHTML = '';
  this.container.appendChild(webComponent);
  
  // Expose Web Component methods through legacy API
  this.render = () => webComponent.render();
  this.gotoPage = (page) => webComponent.gotoPage(page);
  this.nextPage = () => webComponent.nextPage();
  this.previousPage = () => webComponent.previousPage();
  this.isPaginated = () => webComponent.isPaginated();
  this.getNumberOfPages = () => webComponent.getNumberOfPages();
  this.isEmpty = (str) => webComponent.isEmpty(str);
  this.isDownloadableFile = (url) => webComponent.isDownloadableFile(url);
  this.contains = (str, match, disableCase) => webComponent.contains(str, match, disableCase);
  this.renderCategories = (categories) => webComponent.renderCategories(categories);
}
