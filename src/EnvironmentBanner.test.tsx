import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { EnvironmentBanner } from './EnvironmentBanner'

describe('EnvironmentBanner', () => {
	describe('Rendering', () => {
		it('renders the environment text', () => {
			render(<EnvironmentBanner environment="Development" />)
			expect(screen.getByText('Development')).toBeDefined()
		})

		it('does not render when enabled is false', () => {
			const { container } = render(<EnvironmentBanner enabled={false} environment="Development" />)
			expect(container.firstChild).toBeNull()
		})

		it('renders deployment time when provided', () => {
			const deployTime = '2024-01-15T10:30:00Z'
			render(<EnvironmentBanner deployTime={deployTime} environment="Staging" />)
			expect(screen.getByText(/Deployed:/)).toBeDefined()
		})

		it('does not render deployment time when showDeployTime is false', () => {
			const deployTime = '2024-01-15T10:30:00Z'
			render(<EnvironmentBanner deployTime={deployTime} environment="Staging" showDeployTime={false} />)
			expect(screen.queryByText(/Deployed:/)).toBeNull()
		})

		it('renders custom right content', () => {
			render(<EnvironmentBanner environment="Preview" rightContent={<span>v1.2.3</span>} />)
			expect(screen.getByText('v1.2.3')).toBeDefined()
		})
	})

	describe('Default Colors', () => {
		it('applies default colors based on environment', () => {
			const { container } = render(<EnvironmentBanner environment="development" />)
			const banner = container.firstChild as HTMLElement
			expect(banner.style.backgroundColor).toBe('#3b82f6')
		})

		it('uses default colors for unknown environments', () => {
			const { container } = render(<EnvironmentBanner environment="custom-env" />)
			const banner = container.firstChild as HTMLElement
			expect(banner.style.backgroundColor).toBe('#6b7280')
		})
	})

	describe('Custom Colors', () => {
		it('applies custom background color', () => {
			const { container } = render(<EnvironmentBanner backgroundColor="#ff0000" environment="Test" />)
			const banner = container.firstChild as HTMLElement
			expect(banner.style.backgroundColor).toBe('#ff0000')
		})

		it('applies custom text color', () => {
			const { container } = render(<EnvironmentBanner environment="Test" textColor="#000000" />)
			const banner = container.firstChild as HTMLElement
			expect(banner.style.color).toBe('#000000')
		})

		it('uses custom color map', () => {
			const colorMap = {
				custom: { bg: '#123456', border: '#234567', text: '#ffffff' },
			}
			const { container } = render(<EnvironmentBanner colorMap={colorMap} environment="custom" />)
			const banner = container.firstChild as HTMLElement
			expect(banner.style.backgroundColor).toBe('#123456')
		})
	})

	describe('Positioning', () => {
		it('applies fixed-top positioning by default', () => {
			const { container } = render(<EnvironmentBanner environment="Dev" />)
			const banner = container.firstChild as HTMLElement
			expect(banner.style.position).toBe('fixed')
			expect(banner.style.top).toBe('0px')
		})

		it('applies fixed-bottom positioning', () => {
			const { container } = render(<EnvironmentBanner environment="Dev" position="fixed-bottom" />)
			const banner = container.firstChild as HTMLElement
			expect(banner.style.position).toBe('fixed')
			expect(banner.style.bottom).toBe('0px')
		})

		it('applies static positioning', () => {
			const { container } = render(<EnvironmentBanner environment="Dev" position="static" />)
			const banner = container.firstChild as HTMLElement
			expect(banner.style.position).toBe('')
		})
	})

	describe('Custom Styles', () => {
		it('applies custom banner styles', () => {
			const { container } = render(<EnvironmentBanner environment="Test" style={{ opacity: '0.8' }} />)
			const banner = container.firstChild as HTMLElement
			expect(banner.style.opacity).toBe('0.8')
		})

		it('applies custom environment badge styles', () => {
			render(<EnvironmentBanner environment="Test" environmentStyle={{ textTransform: 'none' }} />)
			const badge = screen.getByText('Test')
			expect(badge.style.textTransform).toBe('none')
		})

		it('applies custom container styles', () => {
			const { container } = render(
				<EnvironmentBanner containerStyle={{ maxWidth: '800px' }} environment="Test" />,
			)

			// First div is banner, second div is container
			const containerDiv = container.firstChild?.firstChild as HTMLElement
			expect(containerDiv).toBeDefined()
			expect(containerDiv.style.maxWidth).toBe('800px')
		})
	})

	describe('Time Formatting', () => {
		it('formats deployment time correctly', () => {
			const deployTime = '2024-01-15T22:30:00Z'
			render(<EnvironmentBanner deployTime={deployTime} environment="Staging" />)

			// The exact format depends on the user's timezone, so we just check it rendered
			expect(screen.getByText(/Deployed:/)).toBeDefined()
			expect(screen.getByText(/PM|AM/)).toBeDefined()
		})

		it('handles invalid deployment time gracefully', () => {
			render(<EnvironmentBanner deployTime="invalid-date" environment="Staging" />)
			expect(screen.queryByText(/Deployed:/)).toBeNull()
		})

		it('formats time in specified timezone', () => {
			const deployTime = '2024-01-15T22:30:00Z'
			render(<EnvironmentBanner deployTime={deployTime} environment="Staging" timezone="America/New_York" />)
			expect(screen.getByText(/Deployed:/)).toBeDefined()
		})
	})

	describe('Custom Props', () => {
		it('applies custom padding', () => {
			const { container } = render(<EnvironmentBanner environment="Test" padding="16px 32px" />)
			const banner = container.firstChild as HTMLElement
			expect(banner.style.padding).toBe('16px 32px')
		})

		it('applies custom container padding', () => {
			const { container } = render(<EnvironmentBanner containerPadding="10px 24px" environment="Test" />)

			// First div is banner, second div is container
			const containerDiv = container.firstChild?.firstChild as HTMLElement
			expect(containerDiv).toBeDefined()
			expect(containerDiv.style.padding).toBe('10px 24px')
		})

		it('applies custom font size', () => {
			const { container } = render(<EnvironmentBanner environment="Test" fontSize="18px" />)
			const banner = container.firstChild as HTMLElement
			expect(banner.style.fontSize).toBe('18px')
		})

		it('applies custom z-index', () => {
			const { container } = render(<EnvironmentBanner environment="Test" zIndex={5000} />)
			const banner = container.firstChild as HTMLElement
			expect(banner.style.zIndex).toBe('5000')
		})
	})
})
