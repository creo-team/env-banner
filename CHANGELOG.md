# Changelog

All notable changes to this project will be documented in this file.

## [1.1.0] - 2024-11-30

### Fixed
- Fixed deployment time being cut off on the right side (including intermittent issues):
  - Added box-sizing: border-box for proper width calculations
  - Increased container padding from '0 16px' to '0 20px' for more edge protection
  - Changed default banner padding from '8px 0' to '8px 16px'
  - Added margin-right: 4px to time display itself
  - Changed container width to maxWidth: 100% to prevent overflow
  - Added padding-right instead of margin-right to right content area
  - Added gap between flex items in container
  - Added minWidth: 'fit-content' to time display
- Separated banner padding from container padding for better layout control
- Made deployment time font size fixed at 12px for consistency
- Removed bad overflow solution that added unwanted scrollbars

### Added
- Custom color mapping via `colorMap` prop - define your own environment colors
- Flexible style overrides for all component parts:
  - `environmentStyle` - customize the environment badge
  - `containerStyle` - customize the container
  - `rightContentStyle` - customize right content area
  - `timeStyle` - customize time display
- New `containerPadding` prop to control inner content spacing (defaults to '0 16px')
- Comprehensive test suite using Vitest and React Testing Library
- Test coverage reporting
- Updated GitHub Actions to run tests automatically

## [1.0.0] - 2024-11-30

### Added
- Initial release
- SSR-safe React component for environment banners
- Zero dependencies
- TypeScript support
- Configurable colors, position, and content
- Automatic environment color mapping
- Deploy time display with timezone support
- Examples for Next.js App Router and Create React App
- Standalone example app for testing
