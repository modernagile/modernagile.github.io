# ModernAgile.org Website

## Quick Start

To run the website locally:
```bash
./run
```

To run all tests:
```bash
./run_tests
```

## Development Server

The project includes a custom Node.js development server that:
- Serves all static files with proper MIME types
- Automatically opens your browser
- Provides real-time request logging  
- Enables CORS for development
- Handles all project file types (HTML, CSS, JS, images, fonts, etc.)

### Alternative Server Options
If you prefer other web servers:
- **Node.js http-server**: `npx http-server . -p 8080 -o --cors`
- **Python 3**: `python -m http.server 8000` (basic, no auto-reload)
- **Other**: Any static web server of your choice

## Testing

The project uses QUnit + Grunt + PhantomJS for testing. The test suite includes:
- **19 total test assertions** 
- **Tests for FancyList component** (pagination, filtering, etc.)
- **Current status**: Some tests need maintenance and may fail

Run tests with detailed output:
```bash
./run_tests
```

View tests in browser: `http://localhost:8080/tests/FancyList-tests.html` (when server is running)

## MA Wheel Translations
See the [Template Engine](git@github.com:modernagile/template-engine.git) project to create a new media kit for each translation.  Instructions are in its README.md file.


## CD pipeline

We don't know how this works currently. Someone set it up, so when you push main code line here it will go live in some few minutes.

## Maintenance

Check out the data/ subdirectory. In there are entries for the cheatsheet and the learn more section. If you edit those data files and deploy, the pages will reflect the additional entries automagically. 

learn more: `data/learnMoreEntries.js`

cheatsheets: `data/cheatSheetEntries.js`

upcoming events: `upcomingEventsEntries.js`

Anything other changes will most likely require editing the `index.html`, and possibly the `./js/*` and/or `./css/* files`.

