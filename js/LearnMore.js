// Web Component for Learn More List
class LearnMoreListComponent extends FancyListComponent {
  getLink(url, title, type) {
    if(this.isEmpty(url))
      return '';

    let linkText;
    if(this.contains(url, 'youtube.com', true) || this.contains(url, 'youtu.be', true) || type === 'video')
      linkText = 'Watch Video';
    else if(this.contains(url, 'amazon.com', true))
      linkText = 'Buy on Amazon';
    else if(this.isDownloadableFile(url))
      linkText = 'Download Article';
    else
      linkText = 'Read Article';

    return `<a href="${url}" target="_blank" data-analytics-event="Learn More,${title},1">${linkText}</a>`;
  }
  
  renderEntry(entryData) {
    const link = this.getLink(entryData.url, entryData.title, entryData.type);
    const resumeParagraph = (!this.isEmpty(entryData.resume)) ? `<p>${entryData.resume}</p>` : '';
    const cssClass = entryData.cssClass || '';
    const html = `
      <div class="content">
        <div class="row">
          <div class="col-xs-3">
            <div class="thumbnail square">
              <a title="${entryData.title}" href="${entryData.url}" target="_blank" data-analytics-event="Learn More,${entryData.title},0"><img class="${cssClass}" alt="${entryData.title}" src="${entryData.thumbnail}"></a>
            </div>
          </div>
          <div class="col-xs-9">
            <div class="caption">
              <h4>${entryData.title}</h4>
              ${resumeParagraph}${this.renderCategories(entryData.categories)}${link}
            </div>
          </div>
        </div>
      </div>
    `;
    return html;
  }
}

// Register the custom element
customElements.define('learn-more-list', LearnMoreListComponent);

// Backward compatibility - keep original constructor function
function LearnMore(container, data, columns, entriesPerPage, paginationAnchor) {
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

  // Create Learn More Web Component and transfer data
  const webComponent = document.createElement('learn-more-list');
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
  this.getLink = (url, title, type) => webComponent.getLink(url, title, type);
}

LearnMore.prototype = Object.create(FancyList.prototype);
LearnMore.prototype.constructor = LearnMore;
