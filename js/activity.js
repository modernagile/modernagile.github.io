function Activity(container, activityName) {
  this.container = container;
  $(container).html(this.buildHtmlFor(activitiesListEntries.find((x) => x.id==activityName)));
} 
Activity.prototype.constructor = Activity;
Activity.prototype.buildHtmlFor = function(activity) {
  return ' \
  <!-- Activities Section --> \
      <div class="sectionTitle">Defense Mapping</div> \
      <div class="container"> \
          <div class="row"> \
            <div class="col-sm-12"> \
              <div class="who-wrote-it"><p>Author:<a href="http://twitter.com/tottinge">Tim Ottinger</a></p></div> \
              <div class="why-do-we-do-it">Objective:<p>Help the team analyze their risks and defenses.</p></div> \
              <div class="duration">Duration:<p>30 minutes</p></div> \
              <div class="rating">Rating: 3 / 5</div> \
              <div class="shortDescription">Short Description:<p>Build a visual aid for the team to describe defenses against any risk or threat that concerns them.</p></div> \
              <div class="fullDescription"> \
                <p>We draw a picture with a stickman at the upper left and a “bang” near (but not in) the lower right corner. I often hand-draw a number of these, but we could have sheets made up:</p> \
                <p><img src="stickman.png"></p> \
                <p>Name the failure the team is concerned about (line provided in “bang”).</p> \
                <p>Between “you” (the person) and the bang (disaster) list the defenses in the system. Note that a lot of orgs only have “we try to do a good job” and “we punish wrongdoers” and “trust the developers to not let this happen” as their only defenses. Below the bang, in the bottom right, list recovery techniques.  Make sure that if there is a recovery mode, there is a defensive practice pre-bang to enable it. </p> \
                <p>As an extra booster, make a pass through the defenses and rank them on effectiveness, and then a second pass rankin them on cost.  If you find an over-defended situation (the french armor “defenses are dangerous” example) then consider removing the items with the highest cost-to-effectiveness.</p> \
                <p>For any significant threat, these must be posted in a prominent place in the workspace, preferably in a place where planning is done.</p> \
              </div> \
            </div> \
            <div class="col-sm-6"> \
              <div id="activitiesList" class="showCategoriesAsIcons fancyList"></div> \
            </div> \
          </div> \
      </div> \
  ';
} 


var activity = new Activity($('#activity'));
