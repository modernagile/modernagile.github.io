# ModernAgile.org Website

## Quick Start

### New Contributors (First Time)
```bash
# One-command setup for new contributors
./onboard
```
This interactive script will check your system, set up everything needed, and optionally start the development server.

### Returning Contributors
```bash
# Start development server
./run

# Run tests
./run_tests

# Reset to clean state (clean untracked files, pull latest, update deps, test)
./clean_start
```

**💡 Tip:** Run `./clean_start` before beginning each new feature to ensure you're working with the latest code and clean dependencies.

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

The project uses **Playwright** for modern cross-browser integration testing. The test suite includes:
- **Cross-browser testing**: Chrome, Firefox, Safari, Mobile Chrome
- **Integration tests** for interactive components and functionality
- **Visual regression testing** with automated screenshot comparison
- **Content-resilient tests** that won't break when content is updated
- **Current status**: Actively maintained with comprehensive coverage

### Running Tests

Run the full integration test suite:
```bash
./run_tests
```

**Expected output:** All functional tests should pass across all browsers. Tests run on a random port to avoid conflicts with your development server.

### Test Coverage
- ✅ **Component rendering** - Interactive component initialization and data display
- ✅ **Link functionality** - External links, analytics tracking, meaningful text
- ✅ **Pagination system** - Controls, navigation, page transitions, disabled states
- ✅ **Bootstrap integration** - CSS classes, responsive behavior, mobile layouts
- ✅ **Cross-browser compatibility** - Consistent behavior across all modern browsers
- ✅ **Visual regression** - Automated screenshot comparison for UI changes
- ✅ **Error handling** - Graceful degradation with empty or invalid data
- ✅ **Analytics integration** - Event tracking attributes and data consistency

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

