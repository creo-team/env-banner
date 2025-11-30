// Example: Standard React App with Environment Banner
// File: src/App.tsx

import React from 'react'
import { EnvironmentBanner, type EnvironmentBannerProps } from '@creo/env-banner'

// Configuration based on environment
const bannerConfig: Record<string, Partial<EnvironmentBannerProps>> = {
	development: {
		backgroundColor: '#3b82f6',
		environment: 'Development',
		rightContent: <span style={{ fontSize: '12px' }}>🚧 Local Development</span>,
	},
	staging: {
		backgroundColor: '#f59e0b',
		environment: 'Staging',
		rightContent: (
			<a
				href="/api/health"
				style={{
					color: 'white',
					fontSize: '12px',
					textDecoration: 'underline',
				}}
			>
				API Status
			</a>
		),
	},
	test: {
		backgroundColor: '#10b981',
		environment: 'Test',
		rightContent: <span style={{ fontSize: '12px' }}>✅ Test Environment</span>,
	},
}

// eslint-disable-next-line @typescript-eslint/naming-convention
function App() {
	// Determine environment
	const env = process.env.REACT_APP_ENV ?? process.env.NODE_ENV ?? 'development'
	const config = bannerConfig[env] ?? bannerConfig.development
	const isProduction = env === 'production'

	// Get build info from environment
	const buildTime = process.env.REACT_APP_BUILD_TIME
	const commitHash = process.env.REACT_APP_COMMIT_HASH

	return (
		<div className="app">
			<EnvironmentBanner
				{...config}
				deployTime={buildTime}
				enabled={!isProduction}
				position="fixed-top"
				rightContent={
					<div style={{ alignItems: 'center', display: 'flex', gap: '16px' }}>
						{config.rightContent}
						{commitHash && (
							<span style={{ fontSize: '11px', opacity: 0.7 }}>#{commitHash.slice(0, 7)}</span>
						)}
					</div>
				}
				showDeployTime={Boolean(buildTime)}
				style={{
					// Custom styles
					boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
				}}
			/>

			{/* Main app content */}
			<div style={{ paddingTop: !isProduction ? '50px' : '0' }}>
				<header>
					<h1>My React App</h1>
				</header>

				{/* Your app content */}
				<main />
			</div>
		</div>
	)
}

export default App

/*
 * Example .env files:
 *
 * .env.development:
 * REACT_APP_ENV=development
 *
 * .env.staging:
 * REACT_APP_ENV=staging
 * REACT_APP_BUILD_TIME=2024-01-15T10:30:00Z
 * REACT_APP_COMMIT_HASH=abc123def456
 *
 * .env.production:
 * REACT_APP_ENV=production
 */
