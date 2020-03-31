function getQueryParams() {
    qs = document.location.search.split("+").join(" ");
    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])]
            = decodeURIComponent(tokens[2]);
    }

    return params;
}

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

function getJSON(url, data, success, error) {
  var properties = {
    cache: false,
    url: url,
    dataType: "json"
  }

  if(data)
    properties.data = data;

  if(success)
    properties.success = success;

  if(error)
    properties.error = error;

  jQuery.ajax(properties);
}

jQuery('div.inlineSvg').each(function() {
  loadSVGAndAppend(jQuery(this));
});

duplicateParagraphs();

var learnMore = new LearnMore('#readingList', learnMoreEntries, 2, 6, '#learnMore');
learnMore.render();

var upcomingEvents = new UpcomingEvents('#upcomingEvents', upcomingEventsEntries);
upcomingEvents.render();

function cleanSuggestion() {
  jQuery('.suggestEntry input[data-slack]').val('');
  jQuery('.suggestEntry .suggestionPrinciples input:checked').prop('checked', false);
  jQuery('.suggestEntry').removeClass('open');
}
function cleanMsg(timeout) {
  setTimeout(function() {
    jQuery('.suggestEntry span.titles').removeClass('success');
    jQuery('.suggestEntry span.titles').removeClass('error');
  }, timeout);
}
function addSuggestEventBox(parent) {
  var html = '<div class="row"> \
    <div class="col-sm-12  fancyListEntry suggestEntry"> \
      <div class="content"> \
        <div class="row"> \
          <div class="col-xs-12"> \
            <h4 data-analytics-event="Suggest an event,Open dialog"> \
              <span class="titles"> \
                <span class="title"><span class="successIcon">Thanks, we\'ll add your suggestion shortly</span></span> \
                <span class="title"><span class="addIcon">Suggest an event</span></span> \
                <span class="title"><span class="errorIcon">Oops, could you try again later?</span></span> \
              </span> \
            </h4> \
          </div> \
          <div class="col-xs-12 form"> \
            <form> \
              <input type="text" autocomplete="off" name="suggentionEventTitle" class="form-control" data-slack="Title" placeholder="What is the name of the event?"> \
              <input type="text" autocomplete="off" name="suggentionEventURL" class="form-control" data-slack="Event URL" placeholder="Please supply a URL with info about the event"> \
              <input type="text" autocomplete="off" name="suggentionSpeaker" class="form-control" data-slack="Speaker" placeholder="Who is speaking there?"> \
              <input type="text" autocomplete="off" name="suggentionSpeakerPage" class="form-control" data-slack="Speaker URL" placeholder="Please supply a URL with info about the speaker(s)"> \
              <input type="text" autocomplete="off" name="suggentionLocation" class="form-control" data-slack="Location" placeholder="Where is the event taking place?"> \
              <input type="text" autocomplete="off" name="suggentionDate" class="form-control" data-slack="Date" placeholder="When is the event happening?"> \
              <div class="suggestionPrinciples"> \
                <input type="checkbox" autocomplete="off" name="suggestionPrinciples" value="Make People Awesome">Make People Awesome<br/> \
                <input type="checkbox" autocomplete="off" name="suggestionPrinciples" value="Make Safety a Prerequisite">Make Safety a Prerequisite<br/> \
                <input type="checkbox" autocomplete="off" name="suggestionPrinciples" value="Experiment and Learn Rapidly">Experiment & Learn Rapidly<br/> \
                <input type="checkbox" autocomplete="off" name="suggestionPrinciples" value="Deliver Value Continuously">Deliver Value Continuously<br/> \
              </div> \
                <div class="row"> \
                  <div class="col-sm-6"> \
                    <input type="button" class="btn btn-default btn-block btn-cancel" value="Cancel" data-analytics-event="Suggest an event,Cancel"> \
                  </div> \
                  <div class="col-sm-6"> \
                    <input type="submit" class="btn btn-primary btn-block btn-submit" data-analytics-event="Suggest an event,Submit"> \
                  </div> \
                </div> \
            </form> \
          </div> \
        </div> \
      </div> \
    </div>';

    jQuery(parent).append(html);
    jQuery('.suggestEntry .btn-cancel').click(function() {
      cleanSuggestion();
    });
    jQuery('.suggestEntry h4').click(function() {
      if(jQuery('.suggestEntry .titles').hasClass('error') || jQuery('.suggestEntry .titles').hasClass('success'))
        return;

      jQuery('.suggestEntry').addClass('open');
      $("html, body").animate({ scrollTop: jQuery('.suggestEntry').offset().top });
    });
    jQuery('.suggestEntry form').submit(function(e) {
      e.preventDefault();
      var details = [];
      var principles = [];
      var linebreak = '\n';
      jQuery('.suggestEntry input[data-slack]').each(function() {
        if(jQuery(this).val() != '')
          details.push('*'+ jQuery(this).attr('data-slack') +':* '+ jQuery(this).val());
      });

      if(details.length === 0)
        return;

      jQuery('.suggestEntry .suggestionPrinciples input:checked').each(function() {
        principles.push(jQuery(this).val());
      });

      var msg = '*Event Suggestion*' + linebreak;
      msg += '>>>' + details.join(linebreak);

      if(principles.length != 0)
        msg += linebreak + '*Principles:* '+ principles.join(', ');

      getJSON('https://www.industriallogic.com/ilma/api/slack/',
        {
          key: '0avitm6pOH253DN4ZV6zlY8Pc1pB9kX0',
          teamprefix: 'ma',
          ts: new Date().getTime(),
          message: msg
        },
        function(data) {
          jQuery('.suggestEntry span.titles').addClass('success');
          cleanMsg(5000);
        },
        function(data) {
          jQuery('.suggestEntry span.titles').addClass('error');
          cleanMsg(5000);
        }
      );

      cleanSuggestion();
    });
}
addSuggestEventBox('#upcomingEvents');


jQuery('#contactUsModal .submitContact').click(function() {
  var details = [];
  var linebreak = '\n';
  jQuery('.contactForm input, .contactForm textarea').each(function() {
    if(jQuery(this).val() != '') {
      if(jQuery(this)[0].hasAttribute('data-slack'))
        details.push('*'+ jQuery(this).attr('data-slack') +':* '+ jQuery(this).val());
      else
        details.push(jQuery(this).val());
    }
  });

  if(details.length !== 3)
    return;

  var msg = '*Contact Us*' + linebreak;
  msg += '>>>' + details.join(linebreak);

  getJSON('https://www.industriallogic.com/ilma/api/slack/',
    {
      key: '0avitm6pOH253DN4ZV6zlY8Pc1pB9kX0',
      teamprefix: 'ma',
      ts: new Date().getTime(),
      message: msg
    }
  );

  jQuery('.contactForm input, .contactForm textarea').val('');
});

jQuery('#contactUsModal .cancelContact').click(function() {
  jQuery('.contactForm input, .contactForm textarea').val('');
});

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
