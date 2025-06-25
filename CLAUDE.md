# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a single-page presentation website showcasing Model Context Protocol (MCP) and EarningsAgent technologies. It's built with vanilla HTML, CSS, and JavaScript without any build tools or frameworks.

## Development Commands

Since this is a static website without build tools:
- **Run locally**: Open `index.html` directly in a browser or serve with any static file server (e.g., `python -m http.server 8000` or `npx serve`)
- **Test Service Worker**: Must be served over HTTPS or localhost (not file://)

## Architecture

### File Structure
- `index.html` - Single-page application with all content sections
- `script.js` - All JavaScript functionality including animations, theme toggle, and interactive features
- `style.css` - Complete styling with CSS custom properties for theming
- `sw.js` - Service Worker for PWA features and offline support

### Key Technical Patterns

1. **No Build Process**: Direct file serving, no compilation or bundling required
2. **Component Organization**: JavaScript features are organized as initialization functions (e.g., `initSmoothScroll()`, `initTabSwitching()`)
3. **Event-Driven Architecture**: Heavy use of event delegation and observers
4. **Progressive Enhancement**: Service Worker and advanced features gracefully degrade

### Established Conventions

1. **CSS Variables**: Theme colors defined as custom properties in `:root`
2. **Animation Timing**: Consistent use of Intersection Observer for scroll-triggered animations
3. **Font Stack**: Inter for body, Space Grotesk for headings, JetBrains Mono for code
4. **Dark Theme**: Primary design with light theme as alternative
5. **Code Examples**: Tab-based switching between different implementations

### Performance Considerations

- Critical CSS is inlined in `index.html`
- Fonts are preloaded with proper fallbacks
- Images should be optimized before adding
- Lazy loading implemented for performance
- Service Worker caches assets for offline use

### When Making Changes

1. **Maintain Vanilla JS**: Don't introduce frameworks or build dependencies
2. **Follow Existing Patterns**: Use the established initialization function pattern in script.js
3. **Test Service Worker**: Changes may require cache invalidation (update version in sw.js)
4. **Preserve Accessibility**: Maintain keyboard navigation and ARIA labels
5. **Keep Single-Page Structure**: All content stays in index.html sections