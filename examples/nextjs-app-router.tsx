// Example: Next.js App Router with Environment Banner
// File: app/layout.tsx

import { EnvironmentBanner } from '@creo/env-banner'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	description: 'Example app with environment banner',
	title: 'My App',
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export default function RootLayout({ children }: { children: React.ReactNode }) {
	const { environment, isProduction } = getEnvironmentInfo()
	const deployTime = process.env.NEXT_PUBLIC_BUILD_TIME

	return (
		<html lang="en">
			<head />
			<body>
				<EnvironmentBanner
					deployTime={deployTime}
					enabled={!isProduction}
					environment={environment}
					position="fixed-top"
					rightContent={
						process.env.NEXT_PUBLIC_COMMIT_SHA && (
							<span style={{ fontSize: '12px', opacity: 0.8 }}>
								{process.env.NEXT_PUBLIC_COMMIT_SHA.slice(0, 7)}
							</span>
						)
					}
					showDeployTime={true}
				/>

				{/* Adjust main content for fixed banner */}
				<main style={{ paddingTop: !isProduction ? '40px' : '0' }}>{children}</main>
			</body>
		</html>
	)
}

function getEnvironmentInfo() {
	// Vercel environment detection
	const vercelEnv = process.env.VERCEL_ENV
	if (vercelEnv) {
		return {
			environment:
				vercelEnv === 'production' ? 'Production' : vercelEnv === 'preview' ? 'Preview' : 'Development',
			isProduction: vercelEnv === 'production',
		}
	}

	// Fallback to NODE_ENV
	const nodeEnv = process.env.NODE_ENV

	return {
		environment: nodeEnv === 'production' ? 'Production' : 'Development',
		isProduction: nodeEnv === 'production',
	}
}
