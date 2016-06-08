function loadSVGAndAppend(container) {
  var $img = container;
  var imgID = $img.attr('data-id');
  var imgClass = $img.attr('data-class');
  var imgURL = $img.attr('data-src');

  if(!document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1")) {
    var img = jQuery('<img/>');
    if(typeof imgID !== 'undefined')
      $img.attr('id', imgID);

    if(typeof imgClass !== 'undefined')
      $img.attr('class', imgClass+' replaced-svg');

    $img.attr('src', imgURL.replace("svg", "png"));
    return;
  }

  jQuery.get(imgURL, function(data) {
    var $svg = jQuery(data).find('svg');

    if(typeof imgID !== 'undefined')
      $svg = $svg.attr('id', imgID);
    else
      $svg = $svg.removeAttr('id');

    if(typeof imgClass !== 'undefined')
      $svg = $svg.attr('class', imgClass+' replaced-svg');

    $svg = $svg.removeAttr('xmlns:a');

    $img.replaceWith($svg);
  }, 'xml');
}

function duplicateParagraphs() {
  jQuery('[data-copy-from]').each(function() {
    var target = jQuery(jQuery(this).attr('data-copy-from'));
    if (target.length > 0) {
      jQuery(this).html(target.html());
    }
  });
}

function getJSON(url, data, success) {
  if(success) {
    $.ajax({
      cache: false,
      url: url,
      dataType: "json",
      data: data,
      success: success
    });
  } else {
    $.ajax({
      cache: false,
      url: url,
      dataType: "json",
      data: data
    });
  }
}

jQuery('div.inlineSvg').each(function() {
  loadSVGAndAppend(jQuery(this));
});

duplicateParagraphs();

var learnMore = new LearnMore('#readingList', learnMoreEntries, 2, 6, '#learnMore');
learnMore.render();

var upcomingEvents = new UpcomingEvents('#upcomingEvents', upcomingEventsEntries);
upcomingEvents.render();

window.addEventListener('message', function (e) {
    var iframe = $('.community-section iframe');

    var eventName = e.data[0];
    var data      = e.data[1];

    switch (eventName) {
        case 'setHeight':
            iframe.height(data);
            break;
        case 'sendToAnalytics':
            analytics.send(data);
            break;
    }
}, false);

jQuery('.collapseMobileMenu').click(function () {
   jQuery('.navbar-collapse').collapse('hide');
});

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-78734019-1', 'auto');
ga('send', 'pageview');

analytics.trackScrollSpy('.navbar-fixed-top');
analytics.trackAnalyticsEvents();
