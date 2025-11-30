import React from 'react'

export interface EnvironmentBannerProps {
	// eslint-disable-next-line prettier/prettier

	/**
	 * Background color of the banner. Defaults to appropriate color based on environment.
	 */
	backgroundColor?: string

	/**
	 * Border color of the banner. Defaults to a darker shade of background.
	 */
	borderColor?: string

	/**
	 * Border width. Defaults to '1px'.
	 */
	borderWidth?: string

	/**
	 * Additional CSS class names to apply to the banner container.
	 */
	className?: string

	/**
	 * Custom color mapping for environments. Merges with defaults.
	 * @example { staging: { bg: '#custom', border: '#darker', text: '#fff' } }
	 */
	colorMap?: Record<string, { bg: string; border: string; text: string }>

	/**
	 * Padding for the inner container. Defaults to '0 20px' to prevent edge cutoff.
	 */
	containerPadding?: string

	/**
	 * Custom styles for the container holding all content.
	 */
	containerStyle?: React.CSSProperties

	/**
	 * Optional deployment time to display. Should be an ISO string.
	 */
	deployTime?: string

	/**
	 * Whether the banner should be displayed. Defaults to true.
	 */
	enabled?: boolean

	/**
	 * The environment name to display (e.g., "Development", "Staging", "Preview")
	 */
	environment: string

	/**
	 * Custom styles for the environment badge.
	 */
	environmentStyle?: React.CSSProperties

	/**
	 * Font size of the environment text. Defaults to '14px'.
	 */
	fontSize?: string

	/**
	 * Font weight of the environment text. Defaults to '600'.
	 */
	fontWeight?: number | string

	/**
	 * Padding of the banner. Defaults to '8px 16px' for better edge spacing.
	 */
	padding?: string

	/**
	 * Position of the banner. Defaults to 'fixed-top'.
	 * - 'fixed-top': Fixed at the top of the viewport
	 * - 'fixed-bottom': Fixed at the bottom of the viewport
	 * - 'static': Normal document flow
	 */
	position?: 'fixed-bottom' | 'fixed-top' | 'static'

	/**
	 * Additional content to render on the right side of the banner.
	 */
	rightContent?: React.ReactNode

	/**
	 * Custom styles for the right content area.
	 */
	rightContentStyle?: React.CSSProperties

	/**
	 * Whether to show the deployment time. Defaults to true if deployTime is provided.
	 */
	showDeployTime?: boolean

	/**
	 * Custom inline styles to apply to the banner container.
	 */
	style?: React.CSSProperties

	/**
	 * Text color of the banner. Defaults to white.
	 */
	textColor?: string

	/**
	 * Custom styles for the deployment time.
	 */
	timeStyle?: React.CSSProperties

	/**
	 * Timezone to display deployment time in. Defaults to user's local timezone.
	 */
	timezone?: string

	/**
	 * Z-index of the banner when position is fixed. Defaults to 9999.
	 */
	zIndex?: number
}

const defaultColors: Record<string, { bg: string; border: string; text: string }> = {
	default: { bg: '#6b7280', border: '#4b5563', text: '#ffffff' },
	development: { bg: '#3b82f6', border: '#2563eb', text: '#ffffff' },
	local: { bg: '#6366f1', border: '#4f46e5', text: '#ffffff' },
	preview: { bg: '#8b5cf6', border: '#7c3aed', text: '#ffffff' },
	staging: { bg: '#f59e0b', border: '#d97706', text: '#ffffff' },
	test: { bg: '#10b981', border: '#059669', text: '#ffffff' },
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export function EnvironmentBanner({
	backgroundColor,
	borderColor,
	borderWidth = '1px',
	className = '',
	colorMap,
	containerPadding = '0 20px',
	containerStyle,
	deployTime,
	enabled = true,
	environment,
	environmentStyle,
	fontSize = '14px',
	fontWeight = 600,
	padding = '8px 16px',
	position = 'fixed-top',
	rightContent,
	rightContentStyle,
	showDeployTime = true,
	style = {},
	textColor,
	timeStyle,
	timezone,
	zIndex = 9999,
}: EnvironmentBannerProps) {
	// Don't render if not enabled
	if (!enabled) {
		return null
	}

	const colors = getDefaultColors(environment, colorMap)
	const bgColor = backgroundColor ?? colors.bg
	const txtColor = textColor ?? colors.text
	const brdColor = borderColor ?? colors.border

	const formattedTime = deployTime && showDeployTime ? formatDeployTime(deployTime, timezone) : null

	const positionStyles: React.CSSProperties =
		position === 'fixed-top'
			? {
					left: 0,
					position: 'fixed',
					right: 0,
					top: 0,
					width: '100%',
					zIndex,
				}
			: position === 'fixed-bottom'
				? {
						bottom: 0,
						left: 0,
						position: 'fixed',
						right: 0,
						width: '100%',
						zIndex,
					}
				: {}

	const bannerStyles: React.CSSProperties = {
		backgroundColor: bgColor,
		borderBottom:
			position === 'fixed-top' || position === 'static' ? `${borderWidth} solid ${brdColor}` : undefined,
		borderTop: position === 'fixed-bottom' ? `${borderWidth} solid ${brdColor}` : undefined,
		boxSizing: 'border-box',
		color: txtColor,
		fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
		fontSize,
		padding,
		...positionStyles,
		...style,
	}

	const containerStyles: React.CSSProperties = {
		alignItems: 'center',
		boxSizing: 'border-box',
		display: 'flex',
		gap: '16px',
		justifyContent: 'space-between',
		maxWidth: '100%',
		padding: containerPadding,
		...containerStyle,
	}

	const environmentStyles: React.CSSProperties = {
		alignItems: 'center',
		backgroundColor: 'rgba(255, 255, 255, 0.2)',
		border: '1px solid rgba(255, 255, 255, 0.3)',
		borderRadius: '6px',
		display: 'inline-flex',
		flexShrink: 0,
		fontSize,
		fontWeight,
		letterSpacing: '0.05em',
		padding: '4px 12px',
		textTransform: 'uppercase' as const,
		...environmentStyle,
	}

	const rightContentStyles: React.CSSProperties = {
		alignItems: 'center',
		display: 'flex',
		flexShrink: 0,
		gap: '12px',
		paddingRight: '4px',
		...rightContentStyle,
	}

	const timeStyles: React.CSSProperties = {
		alignItems: 'center',
		display: 'flex',
		fontSize: '12px',
		marginRight: '4px',
		minWidth: 'fit-content',
		opacity: 0.9,
		whiteSpace: 'nowrap',
		...timeStyle,
	}

	return (
		<div className={className} style={bannerStyles}>
			<div style={containerStyles}>
				<div style={environmentStyles}>{environment}</div>

				<div style={rightContentStyles}>
					{formattedTime && showDeployTime && (
						<div style={timeStyles}>
							<span>Deployed: {formattedTime}</span>
						</div>
					)}
					{rightContent}
				</div>
			</div>
		</div>
	)
}

function formatDeployTime(deployTime: string, timezone?: string): null | string {
	try {
		const date = new Date(deployTime)
		if (isNaN(date.getTime())) return null

		const options: Intl.DateTimeFormatOptions = {
			hour: '2-digit',
			minute: '2-digit',
			timeZone: timezone,
			timeZoneName: 'short',
		}

		return new Intl.DateTimeFormat('en-US', options).format(date)
	} catch {
		return null
	}
}

function getDefaultColors(
	environment: string,
	customColorMap?: Record<string, { bg: string; border: string; text: string }>,
) {
	const envLower = environment.toLowerCase()
	const mergedColors = { ...defaultColors, ...customColorMap }

	return mergedColors[envLower] || mergedColors.default || defaultColors.default
}
