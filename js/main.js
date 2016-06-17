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

      getJSON('https://www.industriallogic.com/maAPI/sendToSlack.php',
        {
          key: '0avitm6pOH253DN4ZV6zlY8Pc1pB9kX0',
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

  getJSON('https://www.industriallogic.com/maAPI/sendToSlack.php',
    {
      key: '0avitm6pOH253DN4ZV6zlY8Pc1pB9kX0',
      message: msg
    }
  );

  jQuery('.contactForm input, .contactForm textarea').val('');
});

jQuery('#contactUsModal .cancelContact').click(function() {
  jQuery('.contactForm input, .contactForm textarea').val('');
});


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

function addSpinnerAppLink() {
  var isMobile = !jQuery('#mobilePhone').is(':visible');
  var attrs = '';
  var text = '';
  if(isMobile) {
    attrs = ' class="btn btn-lg btn-primary" title="Install Web App" href="./wheel" target="_blank" ';
    text = 'Install Web App';
  } else {
    attrs = ' class="btn btn-lg btn-default disabled" title="Install Web App" ';
    text = 'Access from a mobile browser to install';
  }
  jQuery('#installSpinnerApp').html('<a'+ attrs +'>'+ text +'</a>');
}
addSpinnerAppLink();

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-78734019-1', 'auto');
ga('send', 'pageview');

analytics.trackScrollSpy('.navbar-fixed-top');
analytics.trackAnalyticsEvents();
