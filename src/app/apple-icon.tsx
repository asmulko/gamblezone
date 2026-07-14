import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 40,
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
            gap: 14,
            padding: '28px 28px',
          }}
        >
          <div style={{ display: 'flex', gap: 36 }}>
            <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#fff' }} />
            <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#fff' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'rgba(255,255,255,0.85)' }} />
          </div>
          <div style={{ display: 'flex', gap: 36 }}>
            <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#fff' }} />
            <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#fff' }} />
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
