import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);

        // Core OG data
        const title = searchParams.get('title') || 'DEULEUX Elite Digital Agency';
        const subtitle = searchParams.get('subtitle') || 'Award-winning digital experiences';
        const context = searchParams.get('context') || 'Portfolio'; // e.g. "Work", "Insight", "Service"
        const bgUrl = searchParams.get('bg') || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop';

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-end',
                        backgroundImage: `url(${bgUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        padding: '80px',
                    }}
                >
                    {/* Overlays to ensure text readability */}
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.4)',
                            backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)',
                        }}
                    />

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            position: 'relative',
                            zIndex: 10,
                            color: 'white',
                            fontFamily: 'sans-serif',
                        }}
                    >
                        {/* Top Badge (Context) */}
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                padding: '8px 20px',
                                borderRadius: '100px',
                                fontSize: 24,
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                marginBottom: '30px',
                                fontWeight: 600,
                            }}
                        >
                            {context}
                        </div>

                        {/* Main Title */}
                        <div
                            style={{
                                fontSize: 84,
                                fontWeight: 800,
                                letterSpacing: '-0.02em',
                                lineHeight: 1.1,
                                marginBottom: '20px',
                                maxWidth: '900px',
                                wordWrap: 'break-word',
                            }}
                        >
                            {title.length > 60 ? `${title.substring(0, 60)}...` : title}
                        </div>

                        {/* Subtitle */}
                        <div
                            style={{
                                fontSize: 36,
                                fontWeight: 400,
                                color: 'rgba(255, 255, 255, 0.7)',
                                maxWidth: '800px',
                                lineHeight: 1.3,
                            }}
                        >
                            {subtitle.length > 80 ? `${subtitle.substring(0, 80)}...` : subtitle}
                        </div>

                        {/* Bottom Branding */}
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: '100%',
                                marginTop: '60px',
                                paddingTop: '40px',
                                borderTop: '2px solid rgba(255, 255, 255, 0.1)',
                            }}
                        >
                            <div style={{ display: 'flex', fontSize: 28, fontWeight: 700, letterSpacing: '0.1em' }}>
                                DEULEUX.COM
                            </div>
                            <div style={{ display: 'flex', fontSize: 24, color: 'rgba(255,255,255,0.6)' }}>
                                GLOBAL SAAS & MARKETING
                            </div>
                        </div>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        );
    } catch (e: any) {
        console.log(`${e.message}`);
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}
