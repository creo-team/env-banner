# @creo/env-banner

<div align="center">

![Version](https://img.shields.io/github/v/release/krauters/env-banner)
[![npm version](https://img.shields.io/npm/v/@creo/env-banner.svg?style=flat-square)](https://www.npmjs.org/package/@creo/env-banner)
![License](https://img.shields.io/github/license/krauters/env-banner)

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
| `className` | `string` | `''` | Additional CSS class names |
| `position` | `'fixed-top' \| 'fixed-bottom' \| 'static'` | `'fixed-top'` | Banner position |
| `style` | `React.CSSProperties` | `{}` | Custom inline styles |
| `zIndex` | `number` | `9999` | Z-index when position is fixed |
| `deployTime` | `string` | `undefined` | ISO string of deployment time |
| `showDeployTime` | `boolean` | `true` | Whether to show deploy time |
| `timezone` | `string` | Local timezone | Timezone for deploy time display |
| `padding` | `string` | `'8px 16px'` | Banner padding |
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
git clone https://github.com/krauters/env-banner.git

# Install dependencies
npm install

# Build the package
npm run build

# Run linting
npm run lint
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
