'use client'

import { EnvironmentBanner } from '@creo/env-banner'
import { useState } from 'react'

export default function TestPage() {
    const [viewportWidth, setViewportWidth] = useState('100%')
    
    return (
        <div>
            {/* Fixed banner at top - this is where the issue happens */}
            <EnvironmentBanner 
                environment="development" 
                deployTime={new Date().toISOString()}
                position="fixed-top"
            />
            
            <div style={{ paddingTop: '60px', padding: '60px 20px 20px' }}>
                <h1>Viewport Width Test</h1>
                
                <div style={{ marginBottom: '20px' }}>
                    <label>Test different viewport widths: </label>
                    <select onChange={(e) => setViewportWidth(e.target.value)} value={viewportWidth}>
                        <option value="100%">100% (Full width)</option>
                        <option value="1200px">1200px (Desktop)</option>
                        <option value="768px">768px (Tablet)</option>
                        <option value="375px">375px (Mobile)</option>
                        <option value="320px">320px (Small Mobile)</option>
                    </select>
                </div>
                
                <div style={{ 
                    border: '2px solid red', 
                    width: viewportWidth, 
                    margin: '0 auto',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{ padding: '10px', background: '#f0f0f0' }}>
                        <h3>Container Width: {viewportWidth}</h3>
                        <p>The banner above should show the full time including timezone (MST/PST/etc)</p>
                        
                        <h4>Static Banner (for comparison):</h4>
                        <div style={{ position: 'relative', marginTop: '10px' }}>
                            <EnvironmentBanner 
                                environment="staging" 
                                deployTime={new Date().toISOString()}
                                position="static"
                            />
                        </div>
                        
                        <h4 style={{ marginTop: '20px' }}>With custom padding:</h4>
                        <EnvironmentBanner 
                            environment="preview" 
                            deployTime={new Date().toISOString()}
                            position="static"
                            containerPadding="0 30px"
                        />
                        
                        <h4 style={{ marginTop: '20px' }}>Edge case - long timezone:</h4>
                        <EnvironmentBanner 
                            environment="test" 
                            deployTime={new Date().toISOString()}
                            position="static"
                            timezone="America/Argentina/Buenos_Aires"
                        />
                    </div>
                </div>
                
                <div style={{ marginTop: '20px', padding: '20px', background: '#f9f9f9', borderRadius: '8px' }}>
                    <h3>Debug Info:</h3>
                    <ul>
                        <li>Default container padding: 0 20px</li>
                        <li>Time display has margin-right: 4px</li>
                        <li>Right content has padding-right: 4px</li>
                        <li>Container uses box-sizing: border-box</li>
                        <li>Container has maxWidth: 100% (not width: 100%)</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
