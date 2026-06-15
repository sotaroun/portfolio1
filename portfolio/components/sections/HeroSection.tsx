'use client'
import { useEffect, useRef, useState } from 'react'
import { useMediaQuery } from '@/lib/useMediaQuery'

type Profile = {
  name: string
  tagline: string
  bio: string
  github_url: string
  twitter_url: string
  avatar_url: string
}

export default function HeroSection({ profile }: { profile: Profile }) {
  const [mounted, setMounted] = useState(false)
  const orbRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const isMobileOrb = useMediaQuery('(max-width: 768px)')
  const isMobile = useMediaQuery('(max-width: 640px)')

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100)

    // Cursor-following orb
    const handleMouseMove = (e: MouseEvent) => {
      if (!orbRef.current || !sectionRef.current || isMobileOrb) return
      const rect = sectionRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      orbRef.current.style.transform = `translate(${x - 300}px, ${y - 300}px)`
    }
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isMobileOrb])

  const displayName = profile.name || '安部 壮一'
  const nameChars = displayName.split('')
  const avatarSize = isMobile ? '100px' : '200px'

  return (
    <section id="hero" ref={sectionRef} style={{
      minHeight: '100vh',
      background: '#0A0A0F',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      paddingTop: 'clamp(4rem, 8vw, 6rem)',
    }}>

      {/* Grid background texture */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(249,115,22,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(249,115,22,0.03) 1px, transparent 1px)
        `,
        backgroundSize: 'clamp(40px, 10vw, 60px) clamp(40px, 10vw, 60px)',
        pointerEvents: 'none',
      }} />

      {/* Cursor-following orb - hidden on mobile */}
      {!isMobileOrb && (
        <div ref={orbRef} style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
          transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          top: 0,
          left: 0,
          zIndex: 0,
        }} />
      )}

      {/* Static ambient orbs - scaled for mobile */}
      <div className="animate-pulse-glow" style={{
        position: 'absolute',
        top: '20%',
        right: '10%',
        width: 'clamp(150px, 40vw, 350px)',
        height: 'clamp(150px, 40vw, 350px)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />
      <div className="animate-float" style={{
        position: 'absolute',
        bottom: '15%',
        left: '5%',
        width: 'clamp(120px, 30vw, 250px)',
        height: 'clamp(120px, 30vw, 250px)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(251,146,60,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
        animationDelay: '2s',
      }} />

      {/* Decorative corner lines */}
      <div style={{
        position: 'absolute',
        top: 'clamp(0.5rem, 2vw, 2rem)',
        left: 'clamp(0.5rem, 2vw, 2rem)',
        width: 'clamp(40px, 8vw, 60px)',
        height: 'clamp(40px, 8vw, 60px)',
        borderTop: '1px solid rgba(249,115,22,0.4)',
        borderLeft: '1px solid rgba(249,115,22,0.4)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />
      <div style={{
        position: 'absolute',
        bottom: 'clamp(0.5rem, 2vw, 2rem)',
        right: 'clamp(0.5rem, 2vw, 2rem)',
        width: 'clamp(40px, 8vw, 60px)',
        height: 'clamp(40px, 8vw, 60px)',
        borderBottom: '1px solid rgba(249,115,22,0.4)',
        borderRight: '1px solid rgba(249,115,22,0.4)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      {/* Content */}
      <div style={{
        maxWidth: '100%',
        margin: '0 auto',
        padding: 'clamp(2rem, 5vw, 8rem) clamp(1.5rem, 4vw, 4rem) clamp(2rem, 5vw, 4rem)',
        position: 'relative',
        zIndex: 1,
        width: '100%',
      }}>

        {/* Eyebrow label */}
        <div style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'none' : 'translateY(20px)',
          transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: 'clamp(0.75rem, 2vw, 1.5rem)',
          flexWrap: 'wrap',
        }}>
          <span style={{
            width: 'clamp(20px, 5vw, 32px)',
            height: '1px',
            background: '#F97316',
            display: 'block',
          }} />
          <span style={{
            fontSize: 'clamp(0.6rem, 1.5vw, 0.7rem)',
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#F97316',
            fontFamily: 'Inter, sans-serif',
          }}>
            Frontend Engineer
          </span>
        </div>

        {/* Main layout container */}
        <div style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'none' : 'translateY(20px)',
          transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
          marginBottom: 'clamp(1.5rem, 3vw, 3rem)',
        }}>
          {/* Name + Avatar row (aligned at bottom) */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: '20px',
            marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
            width: '100%',
          }}>
            {/* Name */}
            <h1 className="font-display" style={{
              fontSize: 'clamp(2rem, 9vw, 7rem)',
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: '-0.04em',
              margin: 0,
              marginRight: '20px',
              overflow: 'visible',
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'clamp(0.05em, 1vw, 0.1em)',
              wordBreak: 'break-word',
              flex: '1 1 auto',
              minWidth: 0,
            }}>
              {nameChars.map((char, i) => (
                <span key={i} style={{
                  display: 'inline-block',
                  color: '#E2E8F0',
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0) skewY(0deg)' : 'translateY(80px) skewY(10deg)',
                  transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${0.2 + i * 0.04}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${0.2 + i * 0.04}s`,
                }}>
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </h1>

            {/* Avatar - aligned with Name bottom */}
            {profile.avatar_url && (
              <div style={{
                flexShrink: 0,
                alignSelf: 'flex-end',
                marginBottom: 0,
              }}>
                <div style={{
                  position: 'relative',
                  width: avatarSize,
                  height: avatarSize,
                }}>
                  <div style={{
                    position: 'absolute',
                    inset: '-3px',
                    borderRadius: isMobile ? '8px' : '12px',
                    background: 'linear-gradient(135deg, #F97316, #FB923C, rgba(249,115,22,0.2))',
                    animation: 'border-glow 2s ease-in-out infinite',
                  }} />
                  <img
                    src={profile.avatar_url}
                    alt={profile.name}
                    style={{
                      position: 'relative',
                      width: avatarSize,
                      height: avatarSize,
                      borderRadius: isMobile ? '6px' : '10px',
                      objectFit: 'cover',
                      zIndex: 1,
                      display: 'block',
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Tagline - separate below Name+Avatar */}
          <p style={{
            fontSize: 'clamp(0.85rem, 2vw, 1.25rem)',
            color: '#64748B',
            fontWeight: 400,
            lineHeight: 1.5,
            maxWidth: '100%',
            margin: 0,
          }}>
            {profile.tagline || 'フロントエンドエンジニア。Next.js・TypeScript・Reactを中心に、バックエンドもキャッチアップ中。'}
          </p>
        </div>

        {/* Bio */}
        {profile.bio && (
          <div style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'none' : 'translateY(20px)',
            transition: 'opacity 0.7s ease 0.75s, transform 0.7s ease 0.75s',
            maxWidth: '100%',
          }}>
            <div style={{
              background: 'rgba(249,115,22,0.05)',
              border: '1px solid rgba(249,115,22,0.15)',
              borderRadius: 'clamp(8px, 2vw, 12px)',
              padding: 'clamp(1rem, 2vw, 1.25rem)',
              fontSize: 'clamp(0.75rem, 1.2vw, 0.9rem)',
              lineHeight: 1.8,
              color: '#94A3B8',
            }}
              dangerouslySetInnerHTML={{ __html: profile.bio }}
            />
          </div>
        )}

        {/* CTA Buttons */}
        <div style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'none' : 'translateY(20px)',
          transition: 'opacity 0.7s ease 0.9s, transform 0.7s ease 0.9s',
          display: 'flex',
          gap: 'clamp(0.75rem, 2vw, 1rem)',
          flexWrap: 'wrap',
          marginTop: 'clamp(1.5rem, 3vw, 2rem)',
        }}>
          {profile.github_url && (
            <a
              href={profile.github_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: 'clamp(0.6rem, 1.5vw, 0.75rem) clamp(1rem, 2vw, 1.75rem)',
                background: '#F97316',
                color: '#0A0A0F',
                borderRadius: 'clamp(6px, 1vw, 8px)',
                fontSize: 'clamp(0.75rem, 1.2vw, 0.85rem)',
                fontWeight: 700,
                textDecoration: 'none',
                letterSpacing: '0.02em',
                transition: 'all 0.2s ease',
                fontFamily: 'Inter, sans-serif',
                border: 'none',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#FB923C'
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(249,115,22,0.35)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#F97316'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              GitHub →
            </a>
          )}
          <a
            href="#works"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: 'clamp(0.6rem, 1.5vw, 0.75rem) clamp(1rem, 2vw, 1.75rem)',
              background: 'transparent',
              color: '#E2E8F0',
              borderRadius: 'clamp(6px, 1vw, 8px)',
              border: '1px solid rgba(226,232,240,0.2)',
              fontSize: 'clamp(0.75rem, 1.2vw, 0.85rem)',
              fontWeight: 600,
              textDecoration: 'none',
              letterSpacing: '0.02em',
              transition: 'all 0.2s ease',
              fontFamily: 'Inter, sans-serif',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(249,115,22,0.5)'
              e.currentTarget.style.color = '#F97316'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(226,232,240,0.2)'
              e.currentTarget.style.color = '#E2E8F0'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            制作物を見る
          </a>
        </div>
      </div>

      {/* Scroll indicator - hidden on mobile */}
      {!isMobileOrb && (
        <div style={{
          position: 'absolute',
          bottom: 'clamp(1rem, 3vw, 2rem)',
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: mounted ? 1 : 0,
          transition: 'opacity 0.7s ease 1.2s',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          zIndex: 1,
        }}>
          <span style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: '#64748B', textTransform: 'uppercase' }}>
            Scroll
          </span>
          <div style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, #F97316, transparent)',
            animation: 'fade-up 1.5s ease-in-out infinite alternate',
          }} />
        </div>
      )}
    </section>
  )
}