import { ImageResponse } from 'next/og'

// Generated social share image for /about
export const alt = 'About CreditKlick - Making finance easy, convenient & transparent'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    background: 'linear-gradient(135deg, #dbe8fd 0%, #ffffff 60%)',
                    fontFamily: 'sans-serif',
                    padding: 72,
                }}
            >
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1 }}>
                    <div
                        style={{
                            display: 'flex',
                            alignSelf: 'flex-start',
                            background: '#1d5fc9',
                            color: '#ffffff',
                            fontSize: 26,
                            fontWeight: 700,
                            padding: '10px 24px',
                            borderRadius: 999,
                            letterSpacing: 4,
                        }}
                    >
                        ABOUT US
                    </div>
                    <div style={{ display: 'flex', marginTop: 28, fontSize: 76, fontWeight: 800, color: '#142c52', lineHeight: 1.05 }}>
                        The CreditKlick Story
                    </div>
                    <div style={{ display: 'flex', marginTop: 24, fontSize: 34, color: '#19468f', maxWidth: 620 }}>
                        We make finance easy, convenient &amp; transparent.
                    </div>
                    <div style={{ display: 'flex', marginTop: 40, fontSize: 26, color: '#1d5fc9', fontWeight: 700 }}>
                        creditklick.com
                    </div>
                </div>

                {/* Score card */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 380 }}>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: 320,
                            padding: 36,
                            borderRadius: 40,
                            background: '#ffffff',
                            boxShadow: '0 30px 60px rgba(20, 44, 82, 0.18)',
                        }}
                    >
                        <svg width="240" height="130" viewBox="0 0 240 130">
                            <path d="M20 120a100 100 0 0 1 200 0" fill="none" stroke="#ebf2fe" strokeWidth="22" strokeLinecap="round" />
                            <path d="M20 120a100 100 0 0 1 180-60" fill="none" stroke="#1d5fc9" strokeWidth="22" strokeLinecap="round" />
                        </svg>
                        <div style={{ display: 'flex', marginTop: -50, fontSize: 64, fontWeight: 800, color: '#142c52' }}>780</div>
                        <div style={{ display: 'flex', fontSize: 22, fontWeight: 700, color: '#1d5fc9', letterSpacing: 2 }}>EXCELLENT</div>
                        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', marginTop: 28 }}>
                            {[170, 130, 90].map((w, i) => (
                                <div
                                    key={i}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        marginTop: i === 0 ? 0 : 12,
                                        padding: 12,
                                        borderRadius: 16,
                                        background: i === 0 ? '#dbe8fd' : '#f5f9ff',
                                    }}
                                >
                                    <div style={{ display: 'flex', width: 28, height: 28, borderRadius: 8, background: i === 0 ? '#1d5fc9' : '#dbe8fd' }} />
                                    <div style={{ display: 'flex', marginLeft: 14, width: w, height: 12, borderRadius: 6, background: i === 0 ? '#1d5fc9' : '#dbe8fd' }} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        ),
        { ...size }
    )
}
