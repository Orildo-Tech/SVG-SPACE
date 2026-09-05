# Contributing Guide

Thank you for your interest in contributing to SVG-SPACE. This document provides guidelines and instructions for contributing to the project.

## Getting Started

### Prerequisites

Before contributing, ensure you have:

- A GitHub account
- Node.js 18+ and npm installed
- Basic knowledge of React and JavaScript
- Familiarity with Git and GitHub workflows

### Setting Up Your Development Environment

1. Fork the repository on GitHub
2. Clone your fork locally:

```bash
git clone https://github.com/YOUR_USERNAME/SVG-SPACE.git
cd SVG-SPACE
```

3. Add the original repository as upstream:

```bash
git remote add upstream https://github.com/Orildo-Tech/SVG-SPACE.git
```

4. Install dependencies:

```bash
npm install
```

5. Create a feature branch:

```bash
git checkout -b feature/your-feature-name
```

## Types of Contributions

### Icon Submissions

We welcome new icon submissions to expand our library. Before submitting:

1. Check if the icon already exists in our library
2. Ensure you have the legal right to distribute the icon
3. Prepare SVG files in multiple variants (default, mono, dark, light, wordmark)
4. Verify the icon follows our quality standards

#### Icon Quality Standards

- Clean, optimized SVG paths
- Proper viewBox attributes
- Consistent sizing (24x24 default)
- No unnecessary metadata
- Properly named layers and groups

#### Submission Process

1. Use the submission form on the live site
2. Provide accurate metadata (name, categories, brand colors)
3. Upload all available variants
4. Wait for the 7-minute ingestion pipeline to process
5. Verify the icon appears correctly on the site

### Bug Reports

When reporting bugs, provide:

- Clear description of the issue
- Steps to reproduce the problem
- Expected vs actual behavior
- Browser and operating system information
- Screenshots if applicable
- Console errors if present

Use the GitHub Issues tab with the "bug" label.

### Feature Requests

For feature requests:

- Clearly describe the desired feature
- Explain the use case and benefits
- Provide examples if possible
- Consider implementation complexity
- Check if similar requests already exist

Use the GitHub Issues tab with the "enhancement" label.

### Code Contributions

#### Setting Up for Development

1. Follow the setup instructions above
2. Create a feature branch for your changes
3. Make your changes following our coding standards
4. Test thoroughly before submitting

#### Coding Standards

- Follow existing code style and patterns
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions focused and concise
- Handle errors appropriately
- Write tests for new functionality (when applicable)

#### Pull Request Process

1. Update your branch with the latest changes:

```bash
git fetch upstream
git rebase upstream/main
```

2. Commit your changes with clear messages:

```bash
git commit -m "Add feature: description of changes"
```

3. Push to your fork:

```bash
git push origin feature/your-feature-name
```

4. Create a pull request on GitHub
5. Fill in the PR template with details
6. Wait for code review and address feedback

#### Pull Request Guidelines

- Small, focused PRs are preferred
- Include tests for new features
- Update documentation as needed
- Ensure all existing tests pass
- Address all review comments before merging

### Documentation Contributions

Documentation improvements are always welcome:

- Fix typos and grammatical errors
- Improve clarity of existing documentation
- Add missing information
- Create tutorials or guides
- Translate documentation to other languages

## Development Workflow

### Branch Naming

Use descriptive branch names:

- `feature/add-icon-search-filter`
- `bugfix/mobile-menu-issue`
- `docs/update-installation-guide`
- `refactor/optimize-icon-loading`

### Commit Messages

Follow conventional commit format:

```
type: subject

body

footer
```

Types: feat, fix, docs, style, refactor, test, chore

Example:
```
feat: add dark mode support for icon detail pages

Implements dark mode styling for all icon detail page components
including the preview area, code snippets, and download buttons.

Closes #123
```

### Code Review Process

1. Submit a pull request
2. Wait for maintainer review
3. Address feedback and make requested changes
4. Update PR as needed
5. Wait for approval and merge

## Testing

### Manual Testing

Before submitting changes:

- Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- Test on mobile devices if relevant
- Verify the feature works as expected
- Check for console errors
- Test edge cases and error conditions

### Automated Testing

We currently use manual testing. Future plans include:

- Unit tests for utility functions
- Component tests for React components
- Integration tests for critical workflows
- E2E tests for user flows

## Project Structure Understanding

Before making significant changes, familiarize yourself with:

- Component architecture (see ARCHITECTURE.md)
- Data flow and state management
- API endpoints and their purposes
- Caching strategies
- Build and deployment process

## Communication

### Discussion Channels

- GitHub Issues: For bugs and feature requests
- GitHub Discussions: For general questions and ideas
- Pull Requests: For code review and collaboration

### Getting Help

If you need help:

- Check existing documentation
- Search GitHub Issues for similar problems
- Ask in GitHub Discussions
- Contact maintainers directly for urgent matters

## Recognition

Contributors are recognized in:

- Contributors section in README
- Release notes for significant contributions
- Special acknowledgment for major features

## License

By contributing, you agree that your contributions will be licensed under the Apache License 2.0.

## Code of Conduct

Please be respectful and constructive in all interactions. Harassment or disrespectful behavior will not be tolerated.

## Questions

If you have questions about contributing that are not covered here, please open a GitHub Discussion or contact the maintainers.

Thank you for contributing to SVG-SPACE!