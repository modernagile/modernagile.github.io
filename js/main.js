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

jQuery('div.inlineSvg').each(function() {
  loadSVGAndAppend(jQuery(this));
});

duplicateParagraphs();

var learnMore = new LearnMore('#readingList', learnMoreEntries, 2, 6, '#learnMore');
learnMore.render();

function sortList(selector) {
    $(selector).find("li").sort(function(a, b) {
        return $(a).text().localeCompare($(b).text());
    }).each(function(index, el) {
        $(el).parent().append(el);
    });
}

$.getJSON('mediakit/mediaKit.json')
.done(function( json ) {
  var mediaKit = json;
  for (var language in mediaKit) {
    if (mediaKit.hasOwnProperty(language)) {
      $('#mediaKit-languages ul').append('<li><a title="' + language + '" data-analytics-event="Media Kit,' + language + '">' + language + '</a></li>');
      for(var i=0; i<mediaKit[language].length; i++) {
        var kit = mediaKit[language][i];
        $('#mediaKit-files ul').prepend('<li data-language="' + language + '"><a href="mediakit/' + kit.file + '" data-analytics-event="Media Kit,' + kit.label + '">' + kit.label + '</a></li>');
      }
    }
  }

  sortList('#mediaKit-languages ul');
  var index = 0;
  $('#mediaKit-languages ul li a').each(function() {
    var language = $(this).text();
    var spinner = '<div class="item" data-language="' + language + '">' +
    '<img id="modernAgileWheel" alt="Modern Agile Principles in "' + language + ' src="img/modernAgileWheel/modern_agile_wheel_' + language + '.svg" />' +
    '<div class="carousel-caption">' + language + '</div>' +
    '</div>';
    $('.carousel-inner').append(spinner);
    $('.carousel-indicators').append('<li data-target="#carousel-spinner" data-language="' + language + '" data-slide-to="' + index + '"></li>');
    index++;
  });

  $('.carousel-indicators li[data-language="english"]').addClass('active');
  $('.item[data-language="english"]').addClass('active');

  $('#mediaKit-languages ul li a').click(function() {
    $('#mediaKit-languages button').html($(this).text() + '<span class="caret"></span>');
    $('#mediaKit-files li').hide();
    $('#mediaKit-files li[data-language="all"]').show();
    $('#mediaKit-files li[data-language="' + $(this).text() + '"]').show();
    $('#mediaKit-files').show();
  });

  var defaultLanguage = 'english';
  $('#mediaKit-languages a:contains("' + defaultLanguage + '")').click();
})
.fail(function( jqxhr, textStatus, error ) {
  //TODO: Handle fail
});

function scrollTo(id) {
  $("html, body").animate({ scrollTop: Math.max(0, jQuery(id).offset().top - 45)});
}

addThanksTo('#mediaKitIntro');

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
