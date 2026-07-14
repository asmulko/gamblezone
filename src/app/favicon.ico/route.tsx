import { ImageResponse } from 'next/og';

// Serves an identical 32×32 PNG at /favicon.ico
// so direct requests and older browsers all get the icon.
export async function GET() {
  const img = new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: 'linear-gradient(135deg, #b0143c 0%, #7c0f2a 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            padding: '5px',
          }}
        >
          <div style={{ display: 'flex', gap: 7 }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#fff' }} />
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#fff' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(255,255,255,0.85)' }} />
          </div>
          <div style={{ display: 'flex', gap: 7 }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#fff' }} />
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#fff' }} />
          </div>
        </div>
      </div>
    ),
    { width: 32, height: 32 },
  );

  return new Response(await img.arrayBuffer(), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
