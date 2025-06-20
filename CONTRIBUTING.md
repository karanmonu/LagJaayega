# Contributing to JobFlow

Thank you for your interest in contributing to JobFlow! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Reporting Issues
- Use the GitHub issue tracker to report bugs
- Include detailed steps to reproduce the issue
- Provide information about your environment (browser, OS, etc.)
- Include screenshots if applicable

### Suggesting Features
- Open an issue with the "feature request" label
- Describe the feature and its benefits
- Explain how it would help Indian job seekers
- Consider the scope and complexity

### Code Contributions

#### Getting Started
1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/jobflow.git`
3. Create a branch: `git checkout -b feature-name`
4. Install dependencies: `npm install`
5. Start development server: `npm run dev`

#### Development Guidelines

**Code Style:**
- Use TypeScript for all new code
- Follow existing code formatting
- Use meaningful variable and function names
- Add comments for complex logic

**Component Structure:**
- Keep components focused and single-purpose
- Use proper TypeScript interfaces
- Follow React best practices
- Ensure responsive design

**Indian Market Focus:**
- Consider Indian job market specifics
- Include relevant company examples
- Use appropriate cultural context
- Test with Indian user scenarios

#### Testing
- Test your changes thoroughly
- Ensure responsive design works
- Check browser compatibility
- Verify data persistence

#### Commit Guidelines
- Use clear, descriptive commit messages
- Start with a verb (Add, Fix, Update, etc.)
- Reference issue numbers when applicable
- Keep commits focused and atomic

Example:
```
Add TCS interview preparation guide

- Include technical round expectations
- Add behavioral question examples
- Reference issue #123
```

## 🎯 Areas for Contribution

### High Priority
- **Company-specific guidance**: Add more Indian companies
- **Interview questions**: Real interview experiences
- **Resume templates**: Indian market optimized formats
- **Accessibility**: Improve screen reader support

### Medium Priority
- **Data export**: PDF/Excel export functionality
- **Analytics**: Advanced progress tracking
- **Mobile optimization**: Better mobile experience
- **Performance**: Loading time improvements

### Low Priority
- **Themes**: Dark mode, custom themes
- **Integrations**: Job portal APIs
- **Advanced features**: Team collaboration
- **Internationalization**: Regional language support

## 🔧 Technical Details

### Project Structure
```
src/
├── components/          # React components
├── types/              # TypeScript interfaces
├── utils/              # Utility functions
└── styles/             # CSS and styling
```

### Key Technologies
- **React 18**: Component framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **Vite**: Build tool
- **Lucide React**: Icons

### State Management
- Local state with React hooks
- localStorage for persistence
- No external state management library

### Styling Guidelines
- Use Tailwind CSS classes
- Follow existing color scheme
- Ensure responsive design
- Maintain accessibility standards

## 📝 Documentation

### Code Documentation
- Add JSDoc comments for complex functions
- Document component props with TypeScript
- Include usage examples for utilities
- Update README for new features

### User Documentation
- Update help text for new features
- Add tooltips for complex UI elements
- Include examples in AI responses
- Maintain consistency in terminology

## 🧪 Quality Assurance

### Before Submitting
- [ ] Code follows project conventions
- [ ] All features work as expected
- [ ] Responsive design is maintained
- [ ] No console errors or warnings
- [ ] TypeScript compilation succeeds
- [ ] Changes are documented

### Review Process
1. Submit pull request with clear description
2. Maintainers will review within 48 hours
3. Address any feedback or requested changes
4. Once approved, changes will be merged

## 🌟 Recognition

Contributors will be:
- Listed in the project README
- Credited in release notes
- Invited to join the core team (for significant contributions)

## 📞 Getting Help

- **Questions**: Open a GitHub discussion
- **Real-time chat**: Join our Discord server
- **Email**: contribute@jobflow.dev

## 🎉 First-Time Contributors

New to open source? We welcome you! Look for issues labeled "good first issue" or "help wanted". These are designed to be beginner-friendly.

### Good First Issues
- Fix typos in documentation
- Add new company information
- Improve error messages
- Add new quick prompts for AI chat

## 📋 Code of Conduct

### Our Pledge
We are committed to making participation in this project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards
- Use welcoming and inclusive language
- Be respectful of differing viewpoints
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

### Enforcement
Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by contacting the project team at conduct@jobflow.dev.

## 📄 License

By contributing to JobFlow, you agree that your contributions will be licensed under the MIT License.

---

Thank you for helping make JobFlow better for the Indian tech community! 🚀