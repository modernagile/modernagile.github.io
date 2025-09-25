(AI generated)


# Contributing to ModernAgile.org

Thank you for your interest in contributing to the ModernAgile.org website! This document provides guidelines for contributing to this static website project.

## Project Overview

The ModernAgile.org website is a static HTML/CSS/JavaScript website that promotes Modern Agile principles. The site includes:

- Main website content (`index.html`)
- Specialized pages (analytics, chartering, evolutionary design, flow)
- Interactive JavaScript components (`FancyList.js`, `LearnMore.js`)
- Data-driven content sections (cheat sheets, learn more entries, upcoming events)
- Automated testing with QUnit and Grunt

## Getting Started

### Prerequisites

- Node.js (version 6 or higher)
- npm (comes with Node.js)
- A local web server (Python's httpwatcher recommended for development)

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd ModernAgile
   ```

2. **Install test dependencies**
   ```bash
   cd tests
   npm install
   ```

3. **Install Grunt globally** (if not already installed)
   ```bash
   npm install -g grunt
   npm install -g grunt-contrib-qunit --save-dev
   ```

4. **Start a local web server**
   
   For Python users (recommended):
   ```bash
   # Install httpwatcher if you haven't already
   pip install httpwatcher
   
   # Start the server (auto-reloads on file changes)
   httpwatcher
   ```
   
   Alternative options:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   
   # Node.js (if you have http-server installed)
   npx http-server
   ```

5. **Visit the site**
   Open your browser to `http://localhost:8000` (or the port shown by your server)

## Development Workflow

### Content Updates

#### Data-Driven Content
The easiest way to contribute is by updating the data files:

- **Learn More entries**: Edit `data/learnMoreEntries.js`
- **Cheat sheets**: Edit `data/cheatSheetEntries.js`  
- **Upcoming events**: Edit `data/upcomingEventsEntries.js`

These changes will automatically appear on the website when deployed.

#### HTML/CSS/JavaScript Changes
For other modifications, you'll need to edit:
- `index.html` - Main page structure
- `css/*.css` - Styling (main.css, bootstrap customizations, etc.)
- `js/*.js` - Interactive components

### Testing

#### Running Tests
Before submitting changes, ensure all tests pass:

```bash
# From the project root
cd tests
grunt

# Or run with watch mode during development
grunt watch
```

#### Test Structure
- Tests are written using QUnit
- Test files are located in the `tests/` directory
- Main test file: `tests/FancyList-tests.html`
- Tests focus on the `FancyList.js` component functionality

**Note**: The current test suite needs maintenance. Some tests may not work properly and require rework to be valid tests of the FancyList component.

#### Continuous Integration
- The project uses Travis CI for automated testing
- Tests run automatically on pull requests
- Deployment happens automatically when changes are pushed to the main branch

### JavaScript Components

#### FancyList Component
The main interactive component (`js/FancyList.js`) provides:
- Paginated list display
- Category filtering
- Responsive grid layout
- Analytics event tracking

When modifying this component:
- Ensure backward compatibility
- Update tests accordingly
- Test pagination and filtering functionality
- Verify responsive behavior

## Contribution Guidelines

### Code Style
- Follow existing code patterns and formatting
- Use consistent indentation (spaces preferred)
- Add comments for complex functionality
- Ensure cross-browser compatibility (modern browsers)

### Commit Messages
- Use clear, descriptive commit messages
- Reference issues when applicable
- Keep commits focused on a single change

### Pull Request Process

1. **Fork the repository** and create a feature branch
2. **Make your changes** following the guidelines above
3. **Test your changes** locally
4. **Run the test suite** to ensure nothing is broken
5. **Submit a pull request** with a clear description of changes

### What to Include in Pull Requests
- Description of the change and why it's needed
- Screenshots for visual changes
- Test results confirmation
- Any breaking changes or migration notes

## Deployment

The project has automated deployment configured:
- Changes to the main branch automatically deploy to production
- Deployment typically takes a few minutes to complete
- Uses Cloud Foundry (Pivotal) for hosting

## Translation and Media Kits

For MA Wheel translations, see the separate [Template Engine](git@github.com:modernagile/template-engine.git) project. Instructions for creating new media kits for translations are in that project's README.md.

## Getting Help

- Check existing issues for similar problems or feature requests
- Create a new issue for bugs or feature requests
- Include relevant details: browser, OS, steps to reproduce

## Project Structure

```
ModernAgile/
├── index.html              # Main website page
├── css/                    # Stylesheets
│   ├── main.css           # Primary styles
│   ├── bootstrap.css      # Bootstrap framework
│   └── ...
├── js/                     # JavaScript components
│   ├── FancyList.js       # Main interactive component
│   └── LearnMore.js       # Learn more functionality
├── data/                   # Data files for content
│   ├── cheatSheetEntries.js
│   ├── learnMoreEntries.js
│   └── upcomingEventsEntries.js
├── tests/                  # Test suite
│   ├── package.json       # Test dependencies
│   ├── Gruntfile.js       # Test configuration
│   └── FancyList-tests.html
├── analytics/              # Analytics page
├── chartering/             # Chartering page
├── evolutionarydesign/     # Evolutionary design page
├── flow/                   # Flow page
└── .travis.yml            # CI configuration
```

## License

By contributing to this project, you agree that your contributions will be licensed under the same license as the project.

Thank you for contributing to Modern Agile!
