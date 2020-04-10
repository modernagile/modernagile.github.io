# ModernAgile.org Website

## Static Website
Launch your favorite web server pointed at this directory, and you have a local copy. 

Tim has been using python's httpwatcher, which reloads the web page whenever a file is modified in the file system under the root directory. It makes for a short test cycle.

## Autotest

This environment has not been test-driven. Some tests exist, but most of them cannot work and need to be reworked to be valid tests of the FancyList. 

Don't bother running an autotester, expecting to see green, until after this is resolved.

## CD pipeline

We don't know how this works currently. Someone set it up, so when you push main code line here it will go live in some few minutes. 

## Maintenance

Check out the data/ subdirectory. In there are entries for the cheatsheet and the learn more section. If you edit those data files and deploy, the pages will reflect the additional entries automagically. 

learn more: `data/learnMoreEntries.js`

cheatsheets: `data/cheatSheetEntries.js`

upcoming events: `upcomingEventsEntries.js`

Anything other changes will most likely require editing the `index.html`, and possibly the `./js/*` and/or `./css/* files`.

