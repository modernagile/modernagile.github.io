// Web Component for Upcoming Events List
class UpcomingEventsListComponent extends FancyListComponent {
  constructor() {
    super();
    // Force single column for events
    this._columns = 1;
  }
  
  set data(value) {
    this._rawData = value || [];
    this.cleanOldEvents();
    this.render();
  }
  
  get data() {
    return this._data;
  }
  
  cleanOldEvents() {
    const cleanedData = [];
    for (let i = 0; i < this._rawData.length; i++) {
      const entry = this._rawData[i];
      if (!this.hasHappened(entry.date))
        cleanedData.push(entry);
    }
    // Sort by date ascending
    cleanedData.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA - dateB;
    });
    this._data = cleanedData;
  }
  
  hasHappened(dateString) {
    const eventDate = new Date(dateString);
    const today = new Date();
    
    if (today.getFullYear() > eventDate.getFullYear()) 
      return true;
    if (today.getFullYear() === eventDate.getFullYear() && today.getMonth() > eventDate.getMonth())
      return true;
    if (today.getFullYear() === eventDate.getFullYear() && today.getMonth() === eventDate.getMonth() && today.getDate() > eventDate.getDate())
      return true;

    return false;
  }
  
  formatDate(dateString) {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const date = new Date(dateString);
    return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  }
  
  renderAuthor(author, authorPage, eventTitle) {
    if (this.isEmpty(author))
      return '';

    let authorPageLink = author;
    if (!this.isEmpty(authorPage))
      authorPageLink = `<a title="${author}" target="_blank" href="${authorPage}" data-analytics-event="Upcoming Events,${author}">${authorPageLink}</a>`;

    return `<span class="eventAuthor">${authorPageLink}</span>`;
  }
  
  renderEntry(entryData) {
    const cssClass = entryData.cssClass || '';
    const html = `
      <div class="content">
        <div class="row">
          <div class="col-xs-3">
            <div class="thumbnail square">
              <a title="${entryData.title}" href="${entryData.url}" target="_blank" data-analytics-event="Upcoming Events,${entryData.title},0"><img class="${cssClass}" alt="${entryData.title}" src="${entryData.thumbnail}"></a>
            </div>
          </div>
          <div class="col-xs-9">
            <div class="caption">
              <a href="${entryData.url}" target="_blank" class="eventTitle" data-analytics-event="Upcoming Events,${entryData.title},1">${entryData.title}</a>
              ${this.renderAuthor(entryData.author, entryData.authorPage, entryData.title)}
              <span class="eventLocation">${entryData.location} - ${this.formatDate(entryData.date)}</span>
              ${this.renderCategories(entryData.categories)}
            </div>
          </div>
        </div>
      </div>
    `;
    return html;
  }
}

// Register the custom element
customElements.define('upcoming-events-list', UpcomingEventsListComponent);

// Backward compatibility - keep original constructor function
function UpcomingEvents(container, data, entriesPerPage) {
  this.container = document.querySelector(container);
  this.data = data;
  this.entriesPerPage = entriesPerPage || 0;
  this.currentPage = 1;
  this.container.classList.add('fancyList');

  // Create Upcoming Events Web Component and transfer data
  const webComponent = document.createElement('upcoming-events-list');
  webComponent.data = data; // This will trigger cleanOldEvents automatically
  webComponent.entriesPerPage = entriesPerPage || 0;
  
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
  this.hasHappened = (dateString) => webComponent.hasHappened(dateString);
  this.formatDate = (dateString) => webComponent.formatDate(dateString);
  this.renderAuthor = (author, authorPage, eventTitle) => webComponent.renderAuthor(author, authorPage, eventTitle);
  this.cleanOldEvents = () => webComponent.cleanOldEvents();
}

UpcomingEvents.prototype = Object.create(FancyList.prototype);
UpcomingEvents.prototype.constructor = UpcomingEvents;
