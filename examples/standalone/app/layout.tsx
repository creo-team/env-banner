import { EnvironmentBanner } from '@creo/env-banner'

export default function RootLayout({ children }: { children: React.ReactNode }) {
    // Simple environment detection
    const environment = process.env.NODE_ENV === 'production' ? 'production' : 'development'
    const isProduction = environment === 'production'
    
    return (
        <html lang="en">
            <body>
                <EnvironmentBanner 
                    environment={environment}
                    enabled={!isProduction}
                    deployTime={new Date().toISOString()}
                    showDeployTime={true}
                />
                <main style={{ padding: '20px', paddingTop: !isProduction ? '60px' : '20px' }}>
                    {children}
                </main>
            </body>
        </html>
    )
}
