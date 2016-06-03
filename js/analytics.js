var analytics = {
  campaignLabel: 'Initial Launch',
  trackAnalyticsEvents: function() {
    var that = this;
    jQuery('body').on('click', '[data-analytics-event]', function() {
      var eventData = jQuery(this).attr('data-analytics-event').split(',');
      var eventCategory = eventData[0].trim();
      var eventAction = eventData[1].trim();
      if(eventData.length > 2) {
        var eventValue = eventData[2].trim();
        ga('send', 'event', eventCategory, eventAction, that.campaignLabel, eventValue);
      }
      else {
        ga('send', 'event', eventCategory, eventAction, that.campaignLabel);
      }
    });
  },
  trackScrollSpy: function(referenceElement) {
    var that = this;
    jQuery(referenceElement).on('activate.bs.scrollspy', function (event) {
      var url = that.generateURL(jQuery(event.target).children('a').attr('href'));
      ga('set', 'page', url);
      ga('send', 'pageview');
    });
  },
  generateURL: function(id) {
    return id.replace("#", "/") + ".html";
  }
};
