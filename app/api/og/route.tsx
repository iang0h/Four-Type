import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'
import { BLENDS, BlendKey, getBlendColors } from '@/lib/blends'
import { TemperamentKey } from '@/lib/scoringKey'

export const runtime = 'edge'

const FALLBACK_IMAGE = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fourtype.com%20thumbnail-iBvxwyPcRpCgv7EglTmjplknAe7sh9.jpg'

// Character image URLs — served from Vercel Blob CDN
const CHARACTER_IMAGES: Record<TemperamentKey, string> = {
  Yellow: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Bard-euLHMUxeRi6LvSmqlycXvdRStXiMmI.png',
  Red:    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Commander-vXB8vIN16kna1cGrklqseOHC3gASWk.png',
  Blue:   'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Strategist-41w0Pxn7bABu8gSFUNO21vLrx42NVP.png',
  Green:  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Guardian-zhzjVLCvu9ZK1JKMFkSwdcY4YCabE5.png',
}

// Background colours per temperament (dark tint)
const BG_COLORS: Record<TemperamentKey, string> = {
  Yellow: '#1a1500',
  Red:    '#1a0505',
  Blue:   '#020d14',
  Green:  '#011208',
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const blendKey = searchParams.get('blend') as BlendKey | null
  const heroName = searchParams.get('name') || 'A Hero'

  // ── Fallback: no valid blend → use the site thumbnail ──────────────────────
  if (!blendKey || !(blendKey in BLENDS)) {
    return new ImageResponse(
      (
        <div style={{ display: 'flex', width: '100%', height: '100%' }}>
          <img
            src={FALLBACK_IMAGE}
            width={1200}
            height={630}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      ),
      { width: 1200, height: 630 }
    )
  }

  const blend = BLENDS[blendKey]
  const blendColors = getBlendColors(blend)
  const primaryColor = blendColors.primary
  const secondaryColor = blendColors.secondary
  const characterImage = CHARACTER_IMAGES[blend.primary]
  const bgColor = BG_COLORS[blend.primary]
  const hasSecondary = blend.secondary !== 'Pure'

  // Truncate tagline so it never overflows
  const tagline = blend.tagline.length > 60
    ? blend.tagline.slice(0, 57) + '...'
    : blend.tagline

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: 1200,
          height: 630,
          backgroundColor: bgColor,
          fontFamily: 'Georgia, serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Coloured left-edge accent bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 8,
            height: '100%',
            backgroundColor: primaryColor,
          }}
        />

        {/* ── Left panel: character ─────────────────────────── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            width: 420,
            height: '100%',
            paddingLeft: 24,
            paddingBottom: 0,
            flexShrink: 0,
          }}
        >
          {/* Character card box */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              width: 340,
              height: 520,
              borderRadius: 20,
              border: `2px solid ${primaryColor}`,
              backgroundColor: '#00000060',
              overflow: 'hidden',
            }}
          >
            <img
              src={characterImage}
              width={320}
              height={500}
              style={{ width: 320, height: 500 }}
            />
          </div>
        </div>

        {/* ── Right panel: text ─────────────────────────────── */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flex: 1,
            paddingLeft: 52,
            paddingRight: 60,
            height: '100%',
          }}
        >
          {/* Branding row */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 28 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 36,
                height: 36,
                borderRadius: 8,
                backgroundColor: primaryColor,
                marginRight: 10,
              }}
            >
              <span style={{ color: '#0D0D0F', fontSize: 20, fontWeight: 'bold' }}>F</span>
            </div>
            <span style={{ color: '#888', fontSize: 15, letterSpacing: 4 }}>FOURTYPE</span>
          </div>

          {/* "name is" */}
          <div style={{ display: 'flex', color: '#94A3B8', fontSize: 24, marginBottom: 6 }}>
            {heroName} is
          </div>

          {/* Blend name — large */}
          <div
            style={{
              display: 'flex',
              color: primaryColor,
              fontSize: blend.name.length > 14 ? 62 : 74,
              fontWeight: 900,
              lineHeight: 1,
              marginBottom: 14,
            }}
          >
            {blend.name.toUpperCase()}
          </div>

          {/* Blend subtitle */}
          <div style={{ display: 'flex', color: '#D1D5DB', fontSize: 26, marginBottom: 22 }}>
            {blend.blend}
          </div>

          {/* Colour dots + RPG class */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 28 }}>
            <div
              style={{
                width: 54,
                height: 7,
                borderRadius: 4,
                backgroundColor: primaryColor,
                marginRight: hasSecondary ? 6 : 0,
              }}
            />
            {hasSecondary && (
              <div
                style={{
                  width: 36,
                  height: 7,
                  borderRadius: 4,
                  backgroundColor: secondaryColor,
                  marginRight: 20,
                }}
              />
            )}
            {!hasSecondary && <div style={{ marginRight: 20, display: 'flex' }} />}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                paddingTop: 8,
                paddingBottom: 8,
                paddingLeft: 20,
                paddingRight: 20,
                borderRadius: 30,
                border: `1.5px solid ${primaryColor}`,
                backgroundColor: '#00000040',
              }}
            >
              <span style={{ color: primaryColor, fontSize: 17, fontWeight: 'bold' }}>
                {blend.rpgClass}
              </span>
            </div>
          </div>

          {/* Tagline */}
          <div style={{ display: 'flex', color: '#CBD5E1', fontSize: 22, fontStyle: 'italic', marginBottom: 36 }}>
            {'"'}{tagline}{'"'}
          </div>

          {/* CTA strip */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              paddingTop: 12,
              paddingBottom: 12,
              paddingLeft: 22,
              paddingRight: 22,
              borderRadius: 10,
              backgroundColor: '#ffffff0d',
              border: '1px solid #ffffff20',
            }}
          >
            <span style={{ color: '#9CA3AF', fontSize: 17, marginRight: 10 }}>
              What is your type?
            </span>
            <span style={{ color: primaryColor, fontSize: 17, fontWeight: 'bold' }}>
              fourtype.com
            </span>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
