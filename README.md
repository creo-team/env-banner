# @creo/env-banner

<div align="center">

![Version](https://img.shields.io/github/v/release/creo-team/env-banner)
[![npm version](https://img.shields.io/npm/v/@creo/env-banner.svg?style=flat-square)](https://www.npmjs.org/package/@creo/env-banner)
![License](https://img.shields.io/github/license/creo-team/env-banner)

</div>

A lightweight, SSR-safe React component for displaying environment banners in your application. Perfect for clearly identifying development, staging, and preview environments at a glance.

## Quick Start

```bash
npm install @creo/env-banner
```

```tsx
import { EnvironmentBanner } from '@creo/env-banner'

// Just one line! Automatic colors, fixed position, everything works
<EnvironmentBanner environment="development" />
```

## Features

- 🚀 **100% SSR-Safe** - No client-side hooks or browser APIs
- 🎨 **Zero Dependencies** - Pure React component with inline styles
- 📦 **Tiny Bundle** - Minimal impact on your application size
- 🎯 **TypeScript Support** - Fully typed for excellent DX
- 🔧 **Highly Configurable** - Customize colors, position, content, and more
- ⚡ **Next.js App Router Ready** - Works seamlessly with server components
- 🎨 **Custom Color Maps** - Define your own environment color schemes
- 💅 **Flexible Styling** - Override any component's styles
- ✅ **Well Tested** - Comprehensive test suite with Vitest

## Installation

```bash
npm install @creo/env-banner
```

## Usage

### Simplest Usage - One Line!

```tsx
import { EnvironmentBanner } from '@creo/env-banner'

// That's it! Automatic colors, fixed position, SSR-safe
<EnvironmentBanner environment="development" />
```

### Basic Next.js Example

```tsx
export default function RootLayout({ children }) {
    const isProduction = process.env.NODE_ENV === 'production'
    
    return (
        <html>
            <body>
                <EnvironmentBanner 
                    environment={process.env.VERCEL_ENV || 'development'} 
                    enabled={!isProduction}
                />
                {children}
            </body>
        </html>
    )
}
```

### Advanced Configuration

```tsx
import { EnvironmentBanner } from '@creo/env-banner'

function App() {
    return (
        <EnvironmentBanner
            environment="Staging"
            enabled={true}
            backgroundColor="#f59e0b"
            textColor="#ffffff"
            borderColor="#d97706"
            position="fixed-top"
            deployTime={process.env.NEXT_PUBLIC_BUILD_TIME}
            showDeployTime={true}
            timezone="America/New_York"
            rightContent={
                <button onClick={() => console.log('Custom action')}>
                    View Logs
                </button>
            }
        />
    )
}
```

### Custom Color Mapping

Define your own environment colors:

```tsx
const customColors = {
    production: { bg: '#dc2626', border: '#b91c1c', text: '#ffffff' },
    hotfix: { bg: '#f97316', border: '#ea580c', text: '#ffffff' },
    canary: { bg: '#8b5cf6', border: '#7c3aed', text: '#ffffff' }
}

<EnvironmentBanner 
    environment="canary" 
    colorMap={customColors}
/>
```

### Flexible Style Overrides

Customize any part of the component:

```tsx
<EnvironmentBanner
    environment="development"
    // Override banner styles
    style={{ backdropFilter: 'blur(10px)' }}
    // Override environment badge
    environmentStyle={{ 
        borderRadius: '20px',
        textTransform: 'capitalize' 
    }}
    // Override container
    containerStyle={{ maxWidth: '1200px' }}
    // Override time display
    timeStyle={{ fontWeight: 'bold' }}
/>
```

### Next.js App Router Example

```tsx
// app/layout.tsx
import { EnvironmentBanner } from '@creo/env-banner'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const isDevelopment = process.env.VERCEL_ENV === 'development'
    const isPreview = process.env.VERCEL_ENV === 'preview'
    
    return (
        <html lang="en">
            <body>
                <EnvironmentBanner
                    environment={
                        isDevelopment ? 'Development' 
                        : isPreview ? 'Preview' 
                        : 'Unknown'
                    }
                    enabled={process.env.VERCEL_ENV !== 'production'}
                    deployTime={process.env.NEXT_PUBLIC_BUILD_TIME}
                />
                {children}
            </body>
        </html>
    )
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `environment` | `string` | Required | The environment name to display |
| `enabled` | `boolean` | `true` | Whether to render the banner |
| `backgroundColor` | `string` | Based on environment | Background color of the banner |
| `textColor` | `string` | `'#ffffff'` | Text color of the banner |
| `borderColor` | `string` | Based on backgroundColor | Border color of the banner |
| `colorMap` | `Record<string, Colors>` | `undefined` | Custom color mapping for environments |
| `className` | `string` | `''` | Additional CSS class names |
| `position` | `'fixed-top' \| 'fixed-bottom' \| 'static'` | `'fixed-top'` | Banner position |
| `style` | `React.CSSProperties` | `{}` | Custom inline styles |
| `environmentStyle` | `React.CSSProperties` | `{}` | Custom styles for environment badge |
| `containerStyle` | `React.CSSProperties` | `{}` | Custom styles for container |
| `rightContentStyle` | `React.CSSProperties` | `{}` | Custom styles for right content |
| `timeStyle` | `React.CSSProperties` | `{}` | Custom styles for time display |
| `zIndex` | `number` | `9999` | Z-index when position is fixed |
| `deployTime` | `string` | `undefined` | ISO string of deployment time |
| `showDeployTime` | `boolean` | `true` | Whether to show deploy time |
| `timezone` | `string` | Local timezone | Timezone for deploy time display |
| `padding` | `string` | `'8px 16px'` | Banner padding |
| `containerPadding` | `string` | `'0 20px'` | Inner container padding |
| `fontSize` | `string` | `'14px'` | Font size |
| `fontWeight` | `string \| number` | `600` | Font weight |
| `borderWidth` | `string` | `'1px'` | Border width |
| `rightContent` | `React.ReactNode` | `undefined` | Custom content for right side |

## Default Colors

The component includes sensible default colors for common environment names:

- **development**: Blue (#3b82f6)
- **staging**: Orange (#f59e0b) 
- **preview**: Purple (#8b5cf6)
- **test**: Green (#10b981)
- **local**: Indigo (#6366f1)
- **default**: Gray (#6b7280)

## Environment Detection Patterns

### Vercel

```tsx
const environment = process.env.VERCEL_ENV === 'production' 
    ? 'Production'
    : process.env.VERCEL_ENV === 'preview'
    ? 'Preview'
    : 'Development'
```

### Generic Node.js

```tsx
const environment = process.env.NODE_ENV === 'production'
    ? 'Production'
    : process.env.NODE_ENV === 'test'
    ? 'Test'
    : 'Development'
```

### Custom Environment Variables

```tsx
const environment = process.env.DEPLOY_ENV || 
                   process.env.ENVIRONMENT || 
                   'Unknown'
```

## Styling

### Using className

```tsx
<EnvironmentBanner
    environment="Staging"
    className="my-custom-banner"
/>
```

### Using style prop

```tsx
<EnvironmentBanner
    environment="Preview"
    style={{
        fontFamily: 'monospace',
        letterSpacing: '0.1em'
    }}
/>
```

### CSS Variables for Spacing

When using `position="fixed-top"`, you might want to adjust your layout to account for the banner height:

```css
/* Adjust your main content padding */
main {
    padding-top: 40px; /* Approximate banner height */
}

/* Or use a CSS variable approach */
:root {
    --banner-height: 40px;
}

body.has-env-banner main {
    padding-top: var(--banner-height);
}
```

## Build Configuration

### Next.js Build Time

To capture build time in Next.js, add this to your `next.config.js`:

```js
module.exports = {
    env: {
        NEXT_PUBLIC_BUILD_TIME: new Date().toISOString(),
    },
}
```

## Development

### Setup

```bash
# Clone the repo
git clone https://github.com/creo-team/env-banner.git

# Install dependencies
npm install

# Build the package
npm run build

# Run linting
npm run lint

# Run tests
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

### Running Examples

#### Option 1: Standalone Example App

```bash
# Navigate to the standalone example
cd examples/standalone

# Install dependencies
npm install

# Run the development server
npm run dev

# Open http://localhost:3000
```

#### Option 2: Test in Your Own App

```bash
# From the env-banner root directory
npm link

# In your app directory
npm link @creo/env-banner
```

### Testing Locally

1. In the env-banner directory:
```bash
npm link
```

2. In your project:
```bash
npm link @creo/env-banner
```

3. When done testing:
```bash
npm unlink @creo/env-banner
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License.
