(AI generated)


# Contributing to ModernAgile.org

Thank you for your interest in contributing to the ModernAgile.org website! This document provides guidelines for contributing to this static website project.

## Quick Start

### First-Time Contributors (Recommended)
```bash
# 1. Clone and enter the project
git clone [repository-url]
cd ModernAgile

# 2. Run the interactive onboarding script
./onboard
```

The `./onboard` script will:
- ✅ Check your system prerequisites (Node.js, npm, Git)
- ✅ Set up all project scripts with proper permissions  
- ✅ Optionally pre-install test dependencies
- ✅ Guide you through next steps
- ✅ Optionally start the development server

### Manual Setup (Alternative)
```bash
# 1. Clone and enter the project
git clone [repository-url]
cd ModernAgile

# 2. Start the development server
./run

# 3. Run tests (in another terminal)
./run_tests

# 4. Reset to clean state when needed
./clean_start
```

## Project Overview

The ModernAgile.org website is a static HTML/CSS/JavaScript website that promotes Modern Agile principles. The site includes:

- Main website content (`index.html`)
- Specialized pages (analytics, chartering, evolutionary design, flow)
- Interactive JavaScript components for dynamic functionality
- Data-driven content sections (cheat sheets, learn more entries, upcoming events)
- Modern cross-browser testing with Playwright

## Getting Started

### Prerequisites

- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** for version control

That's it! The `./run` and `./run_tests` scripts handle all other dependencies automatically.

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd ModernAgile
   ```

2. **Start the development server** (recommended)
   ```bash
   ./run
   ```
   
   This will:
   - Start a Node.js server on `http://localhost:8080`
   - Automatically open your browser
   - Serve all files with proper MIME types
   - Enable CORS for development
   - Show real-time request logs

3. **Alternative server options** (if you prefer):
   ```bash
   # Node.js http-server
   npx http-server . -p 8080 -o --cors
   
   # Python 3 (basic)
   python -m http.server 8000
   
   # Any other static web server
   ```

## Clean Start Script

When you need to reset your development environment to a pristine state:

```bash
./clean_start
```

**What it does:**
1. **Pull latest changes** - `git pull -r` to get updates with rebase
2. **Interactive cleanup** - Shows untracked files and lets you choose what to delete
3. **Update dependencies** - Fresh `npm install` in integration-tests directory
4. **Run tests** - Verify everything works with modern Playwright integration tests

**When to use:**
- **Before starting each new feature** (recommended workflow)
- After pulling changes that affect dependencies
- When tests start behaving unexpectedly
- After system updates or long breaks from the project
- Before submitting pull requests (clean environment testing)
- When dependency conflicts or cache issues arise

**Safety:** The script uses `git clean -i` (interactive mode), so you maintain full control over what gets deleted.

### Recommended Feature Development Workflow

```bash
# 1. Start each new feature with a clean slate
./clean_start

# 2. Create feature branch (after clean_start pulls latest)
git checkout -b feature/my-new-feature

# 3. Develop and test
./run          # Start development server
./run_tests    # Run tests frequently

# 4. Before submitting PR, verify clean environment
./clean_start && ./run_tests
```

This ensures you're always working with:
- ✅ Latest codebase
- ✅ Clean dependencies
- ✅ No stale artifacts
- ✅ Passing tests

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
# Recommended: Use the automated test runner
./run_tests

# This script will:
# - Check and install all required dependencies (Playwright)
# - Set up the test environment automatically
# - Run the full integration test suite across all browsers
# - Handle any dependency issues and browser installations
```

**Manual testing** (if needed):
```bash
# Install dependencies first
cd integration-tests && npm install

# Run tests manually
npm test

# Run tests with UI mode for debugging
npm run test:ui

# Run only specific tests
npx playwright test --grep "pagination"
```

#### Test Structure
- Tests are written using **Playwright** for modern cross-browser testing
- Test files are located in the `integration-tests/` directory
- Main test file: `integration-tests/tests/fancylist-integration.spec.js`
- Tests cover interactive components and core functionality
- **Comprehensive test assertions** across **4 browsers** (Chrome, Firefox, Safari, Mobile Chrome)
- **Content-resilient**: Tests won't break when learning resources are updated
- **Visual regression testing**: Automated screenshot comparison for UI changes

**Test Coverage:**
- ✅ Component rendering and data display
- ✅ Pagination functionality and navigation
- ✅ Cross-browser compatibility 
- ✅ Responsive design behavior
- ✅ Analytics event tracking
- ✅ Error handling and edge cases

#### Continuous Integration
- The project uses Travis CI for automated testing
- Tests run automatically on pull requests
- Deployment happens automatically when changes are pushed to the main branch

### JavaScript Components

#### Interactive Components
The JavaScript components (`js/` directory) provide:
- Paginated list displays
- Category filtering
- Responsive grid layouts
- Analytics event tracking

When modifying components:
- Ensure backward compatibility
- Update tests accordingly
- Test interactive functionality
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
├── onboard                 # 🎯 Interactive onboarding script for new contributors
├── clean_start             # 🧹 Clean environment reset script
├── run                     # 🚀 Node.js development server script
├── run_tests               # 🧪 Automated test runner script
├── index.html              # Main website page
├── CONTRIBUTING.md         # This file - contribution guidelines
├── css/                    # Stylesheets
│   ├── main.css           # Primary styles
│   ├── bootstrap.css      # Bootstrap framework
│   └── ...
├── js/                     # JavaScript components
│   ├── *.js               # Interactive components
├── data/                   # Data files for content
│   ├── cheatSheetEntries.js
│   ├── learnMoreEntries.js
│   └── upcomingEventsEntries.js
├── integration-tests/      # Modern Playwright test suite
│   ├── package.json       # Test dependencies
│   ├── playwright.config.js # Test configuration
│   └── tests/
│       └── fancylist-integration.spec.js
├── analytics/              # Analytics page
├── chartering/             # Chartering page
├── evolutionarydesign/     # Evolutionary design page
├── flow/                   # Flow page
└── .travis.yml            # CI configuration
```

## License

By contributing to this project, you agree that your contributions will be licensed under the same license as the project.

Thank you for contributing to Modern Agile!
