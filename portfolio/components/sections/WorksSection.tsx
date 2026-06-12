'use client'
import { useEffect, useRef, useState } from 'react'
import { useMediaQuery } from '@/lib/useMediaQuery'

type Work = {
  id: string
  title: string
  description: string
  tech_stack: string[]
  site_url: string
  github_url: string
  thumbnail_url: string
}

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])
  return { ref, inView }
}

function WorkCard({ work, index, isMobileOverlay }: { work: Work; index: number; isMobileOverlay: boolean }) {
  const { ref, inView } = useInView(0.1)
  const [hovered, setHovered] = useState(false)

  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(50px)',
      transition: `opacity 0.7s ease ${index * 0.15}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.15}s`,
    }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: '#111118',
          border: '1px solid',
          borderColor: hovered ? 'rgba(249,115,22,0.4)' : 'rgba(255,255,255,0.06)',
          borderRadius: 'clamp(12px, 3vw, 16px)',
          overflow: 'hidden',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
          boxShadow: hovered ? '0 20px 60px rgba(249,115,22,0.08)' : '0 4px 20px rgba(0,0,0,0.3)',
          transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Thumbnail */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: 'clamp(120px, 30vw, 220px)',
          overflow: 'hidden',
          background: '#0D0D14',
          flexShrink: 0,
        }}>
          {work.thumbnail_url ? (
            <img
              src={work.thumbnail_url}
              alt={work.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: hovered ? 'scale(1.05)' : 'scale(1)',
                transition: 'transform 0.5s ease',
              }}
            />
          ) : (
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #111118, #1a1a24)',
              fontSize: 'clamp(1.5rem, 5vw, 3rem)',
            }}>
              🚀
            </div>
          )}

          {/* Overlay on hover - hidden on mobile */}
          {!isMobileOverlay && (
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(10,10,15,0.9) 0%, rgba(10,10,15,0.3) 50%, transparent 100%)',
              opacity: hovered ? 1 : 0,
              transition: 'opacity 0.3s ease',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              padding: 'clamp(1rem, 2vw, 1.5rem)',
              gap: '0.75rem',
              flexWrap: 'wrap',
            }}>
              {work.site_url && (
                <a
                  href={work.site_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  style={{
                    padding: 'clamp(0.4rem, 1vw, 0.5rem) clamp(0.75rem, 2vw, 1.25rem)',
                    background: '#F97316',
                    color: '#0A0A0F',
                    borderRadius: '6px',
                    fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)',
                    fontWeight: 700,
                    textDecoration: 'none',
                    transition: 'background 0.2s ease',
                    fontFamily: 'Inter, sans-serif',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#FB923C')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#F97316')}
                >
                  サイトを見る →
                </a>
              )}
              {work.github_url && (
                <a
                  href={work.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  style={{
                    padding: 'clamp(0.4rem, 1vw, 0.5rem) clamp(0.75rem, 2vw, 1.25rem)',
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(8px)',
                    color: '#E2E8F0',
                    borderRadius: '6px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)',
                    fontWeight: 600,
                    textDecoration: 'none',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  GitHub →
                </a>
              )}
            </div>
          )}

          {/* Index number */}
          <div style={{
            position: 'absolute',
            top: 'clamp(0.6rem, 1.5vw, 1rem)',
            right: 'clamp(0.6rem, 1.5vw, 1rem)',
            width: 'clamp(28px, 5vw, 32px)',
            height: 'clamp(28px, 5vw, 32px)',
            borderRadius: '5px',
            background: 'rgba(10,10,15,0.7)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(249,115,22,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 'clamp(0.6rem, 1.5vw, 0.7rem)',
            fontWeight: 700,
            color: '#F97316',
            fontFamily: 'Syne, sans-serif',
          }}>
            {String(index + 1).padStart(2, '0')}
          </div>
        </div>

        {/* Content - flex grow to fill */}
        <div style={{ 
          padding: 'clamp(1rem, 2vw, 1.5rem)',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          minWidth: 0,
        }}>
          <h3 className="font-display" style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            fontWeight: 700,
            color: '#E2E8F0',
            marginBottom: 'clamp(0.5rem, 1vw, 0.75rem)',
            letterSpacing: '-0.02em',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {work.title}
          </h3>

          {/* Tech stack */}
          {work.tech_stack?.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(0.3rem, 0.8vw, 0.4rem)', marginBottom: 'clamp(0.6rem, 1vw, 0.875rem)' }}>
              {work.tech_stack.slice(0, 3).map((tech) => (
                <span key={tech} style={{
                  fontSize: 'clamp(0.6rem, 1vw, 0.7rem)',
                  fontWeight: 600,
                  padding: '0.2rem 0.5rem',
                  borderRadius: '3px',
                  background: 'rgba(249,115,22,0.08)',
                  color: '#F97316',
                  border: '1px solid rgba(249,115,22,0.2)',
                  letterSpacing: '0.01em',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  {tech}
                </span>
              ))}
              {work.tech_stack.length > 3 && (
                <span style={{
                  fontSize: 'clamp(0.6rem, 1vw, 0.7rem)',
                  fontWeight: 600,
                  padding: '0.2rem 0.5rem',
                  color: '#64748B',
                }}>
                  +{work.tech_stack.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Description */}
          <div style={{
            fontSize: 'clamp(0.7rem, 1.3vw, 0.85rem)',
            lineHeight: 1.6,
            color: '#64748B',
            marginBottom: 'auto',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
            dangerouslySetInnerHTML={{ __html: work.description }}
          />

          {/* Links */}
          <div style={{
            display: 'flex',
            gap: 'clamp(0.6rem, 1.5vw, 0.75rem)',
            marginTop: 'clamp(0.75rem, 1.5vw, 1.25rem)',
            paddingTop: 'clamp(0.75rem, 1.5vw, 1.25rem)',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            flexWrap: 'wrap',
          }}>
            {work.site_url && (
              <a href={work.site_url} target="_blank" rel="noopener noreferrer" style={{
                fontSize: 'clamp(0.68rem, 1.2vw, 0.8rem)',
                fontWeight: 600,
                color: '#F97316',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                transition: 'opacity 0.2s ease',
                cursor: 'pointer',
              }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                サイトを見る →
              </a>
            )}
            {work.github_url && (
              <a href={work.github_url} target="_blank" rel="noopener noreferrer" style={{
                fontSize: 'clamp(0.68rem, 1.2vw, 0.8rem)',
                fontWeight: 600,
                color: '#64748B',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
                cursor: 'pointer',
              }}
                onMouseEnter={e => (e.currentTarget.style.color = '#E2E8F0')}
                onMouseLeave={e => (e.currentTarget.style.color = '#64748B')}
              >
                GitHub →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function WorksSection({ works }: { works: Work[] }) {
  const isMobileOverlay = useMediaQuery('(max-width: 768px)')

  return (
    <section id="works" style={{
      background: '#0A0A0F',
      position: 'relative',
      overflow: 'hidden',
      padding: 'clamp(3rem, 8vw, 8rem) clamp(1.5rem, 4vw, 4rem)',
    }}>
      {/* Background accent */}
      <div style={{
        position: 'absolute',
        bottom: '-100px',
        left: '-100px',
        width: 'clamp(200px, 50vw, 500px)',
        height: 'clamp(200px, 50vw, 500px)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(249,115,22,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Horizontal rule accent */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 'clamp(1rem, 4vw, 2rem)',
        right: 'clamp(1rem, 4vw, 2rem)',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(249,115,22,0.3), transparent)',
      }} />

      <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Section header */}
        <div style={{ marginBottom: 'clamp(1.5rem, 3vw, 3rem)' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '0.75rem',
            flexWrap: 'wrap',
          }}>
            <span style={{ 
              width: 'clamp(20px, 5vw, 32px)', 
              height: '1px', 
              background: '#F97316', 
              display: 'block',
              flexShrink: 0,
            }} />
            <span style={{
              fontSize: 'clamp(0.6rem, 1.5vw, 0.7rem)',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#F97316',
            }}>
              Works
            </span>
          </div>
          <h2 className="font-display" style={{
            fontSize: 'clamp(1.75rem, 6vw, 3.5rem)',
            fontWeight: 800,
            color: '#E2E8F0',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            marginBottom: 'clamp(0.5rem, 1vw, 0.75rem)',
          }}>
            制作物
          </h2>
          <p style={{ color: '#64748B', marginTop: 'clamp(0.5rem, 1vw, 0.75rem)', fontSize: 'clamp(0.75rem, 1.5vw, 0.9rem)' }}>
            これまでに作ったもの
          </p>
        </div>

        {works.length === 0 ? (
          <p style={{ color: '#64748B', textAlign: 'center', padding: 'clamp(2rem, 4vw, 4rem) 0', fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}>
            制作物がまだ登録されていません
          </p>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobileOverlay 
              ? '1fr'
              : 'repeat(auto-fill, minmax(clamp(280px, 380px, 100%), 1fr))',
            gap: 'clamp(1rem, 2vw, 1.5rem)',
          }}>
            {works.map((work, i) => (
              <WorkCard key={work.id} work={work} index={i} isMobileOverlay={isMobileOverlay} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}