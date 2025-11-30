import { EnvironmentBanner } from '@creo/env-banner'

export default function Home() {
    return (
        <div>
            <h1>Environment Banner Examples</h1>
            <p>The banner at the top shows the current environment.</p>
            
            <h2>Different Environment Examples:</h2>
            
            <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px', position: 'relative' }}>
                <h3>Development</h3>
                <EnvironmentBanner environment="development" position="static" />
            </div>
            
            <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px', position: 'relative' }}>
                <h3>Staging</h3>
                <EnvironmentBanner environment="staging" position="static" />
            </div>
            
            <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px', position: 'relative' }}>
                <h3>Preview</h3>
                <EnvironmentBanner environment="preview" position="static" />
            </div>
            
            <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px', position: 'relative' }}>
                <h3>Custom Styling</h3>
                <EnvironmentBanner 
                    environment="hot-fix"
                    position="static"
                    backgroundColor="#ff6b6b"
                    borderColor="#ff4757"
                    fontSize="18px"
                    padding="16px 24px"
                    rightContent={<span>🔥 Emergency Fix</span>}
                />
            </div>
            
            <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px', position: 'relative' }}>
                <h3>With Deploy Time</h3>
                <EnvironmentBanner 
                    environment="staging"
                    position="static"
                    deployTime={new Date().toISOString()}
                    showDeployTime={true}
                />
            </div>
        </div>
    )
}
