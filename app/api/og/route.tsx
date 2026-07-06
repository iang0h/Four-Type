import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'
import { BLENDS, BlendKey, getBlendColors } from '@/lib/blends'
import { TemperamentKey } from '@/lib/scoringKey'
import { getShareMetadata } from '@/lib/share-copy'

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
  const shareMetadata = getShareMetadata(heroName, blend)
  const displayName = blend.name.replace(/^The\s+/i, '').toUpperCase()

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: 1200,
          height: 630,
          backgroundColor: '#08080B',
          fontFamily: 'Georgia, serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background layers */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at 24% 48%, ${primaryColor}55 0, ${bgColor} 31%, #08080B 70%)`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: -120,
            right: -120,
            width: 520,
            height: 520,
            borderRadius: 520,
            backgroundColor: `${secondaryColor}25`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -180,
            left: 380,
            width: 540,
            height: 300,
            borderRadius: 540,
            backgroundColor: `${primaryColor}20`,
          }}
        />

        {/* Accent frame */}
        <div
          style={{
            position: 'absolute',
            top: 34,
            left: 34,
            right: 34,
            bottom: 34,
            border: `2px solid ${primaryColor}55`,
            borderRadius: 28,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 58,
            left: 58,
            width: 120,
            height: 5,
            backgroundColor: primaryColor,
          }}
        />

        {/* Character panel */}
        <div
          style={{
            position: 'absolute',
            left: 54,
            top: 78,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            width: 430,
            height: 500,
          }}
        >
          <div
            style={{
              position: 'absolute',
              bottom: 20,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              width: 370,
              height: 456,
              borderRadius: 28,
              border: `2px solid ${primaryColor}99`,
              backgroundColor: '#00000088',
              overflow: 'hidden',
            }}
          >
            <img
              src={characterImage}
              width={350}
              height={520}
              style={{ width: 350, height: 520 }}
            />
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              display: 'flex',
              padding: '12px 24px',
              borderRadius: 999,
              backgroundColor: primaryColor,
              color: '#08080B',
              fontSize: 22,
              fontWeight: 900,
              letterSpacing: 2,
            }}
          >
            {blend.rpgClass}
          </div>
        </div>

        {/* Text panel */}
        <div
          style={{
            position: 'absolute',
            left: 525,
            top: 82,
            display: 'flex',
            flexDirection: 'column',
            width: 595,
            height: 480,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 26 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 42,
                height: 42,
                borderRadius: 12,
                backgroundColor: primaryColor,
                marginRight: 12,
              }}
            >
              <span style={{ color: '#08080B', fontSize: 23, fontWeight: 900 }}>F</span>
            </div>
            <span style={{ color: '#94A3B8', fontSize: 16, letterSpacing: 5 }}>FOURTYPE</span>
          </div>

          <div
            style={{
              display: 'flex',
              color: '#F8FAFC',
              fontSize: 42,
              fontWeight: 900,
              lineHeight: 1.05,
              marginBottom: 18,
            }}
          >
            {shareMetadata.hook}
          </div>

          <div
            style={{
              display: 'flex',
              color: '#94A3B8',
              fontSize: 24,
              marginBottom: 7,
            }}
          >
            {heroName} got
          </div>

          <div
            style={{
              display: 'flex',
              color: primaryColor,
              fontSize: displayName.length > 12 ? 58 : 70,
              fontWeight: 900,
              lineHeight: 1,
              marginBottom: 14,
            }}
          >
            {displayName}
          </div>

          <div style={{ display: 'flex', color: '#E2E8F0', fontSize: 25, marginBottom: 24 }}>
            {blend.blend}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 28 }}>
            <div
              style={{
                width: 72,
                height: 8,
                borderRadius: 999,
                backgroundColor: primaryColor,
                marginRight: hasSecondary ? 8 : 0,
              }}
            />
            {hasSecondary && (
              <div
                style={{
                  width: 48,
                  height: 8,
                  borderRadius: 999,
                  backgroundColor: secondaryColor,
                }}
              />
            )}
          </div>

          <div style={{ display: 'flex', gap: 12, marginBottom: 28 }}>
            {shareMetadata.chips.map((chip) => (
              <div
                key={chip}
                style={{
                  display: 'flex',
                  padding: '10px 14px',
                  borderRadius: 999,
                  border: `1.5px solid ${primaryColor}66`,
                  backgroundColor: '#FFFFFF12',
                  color: '#CBD5E1',
                  fontSize: 18,
                  textTransform: 'capitalize',
                }}
              >
                {chip}
              </div>
            ))}
          </div>

          <div
            style={{
              display: 'flex',
              color: '#CBD5E1',
              fontSize: 25,
              lineHeight: 1.28,
              marginBottom: 34,
            }}
          >
            It caught the pattern behind how I decide, stress, and show up around people.
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 22px',
              borderRadius: 16,
              backgroundColor: '#FFFFFF12',
              border: '1.5px solid #FFFFFF24',
            }}
          >
            <span style={{ color: '#E2E8F0', fontSize: 22, fontWeight: 700 }}>
              {shareMetadata.cta}
            </span>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 38,
                height: 38,
                borderRadius: 999,
                backgroundColor: primaryColor,
                color: '#08080B',
                fontSize: 24,
                fontWeight: 900,
              }}
            >
              →
            </div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
