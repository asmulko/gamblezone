import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
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
          flexDirection: 'column',
          gap: 0,
        }}
      >
        {/* Dice face — 5-dot pattern */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            padding: '5px 5px',
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
    { ...size },
  );
}
