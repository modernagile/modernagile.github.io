var fs = require('fs');

//Including activity list
eval(fs.readFileSync('activitiesListEntries.js')+'');

for(var i=0; i<activitiesListEntries.length; i++) {
  var activity = activitiesListEntries[i];
  if(!test('-d', activity.id)) {
    echo('Generating folder structure for ' + activity.title + '...');
    mkdir(activity.id);
    touch(activity.id + '/index.html');
  }
}
echo('Done!')
