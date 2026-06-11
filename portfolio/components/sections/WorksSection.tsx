'use client'
import { useEffect, useRef, useState } from 'react'

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

function WorkCard({ work, index }: { work: Work; index: number }) {
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
          borderRadius: '16px',
          overflow: 'hidden',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
          boxShadow: hovered ? '0 20px 60px rgba(249,115,22,0.08)' : '0 4px 20px rgba(0,0,0,0.3)',
          transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        }}
      >
        {/* Thumbnail */}
        <div style={{
          position: 'relative',
          height: '220px',
          overflow: 'hidden',
          background: '#0D0D14',
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
              fontSize: '3rem',
            }}>
              🚀
            </div>
          )}

          {/* Overlay on hover */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(10,10,15,0.9) 0%, rgba(10,10,15,0.3) 50%, transparent 100%)',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            padding: '1.5rem',
            gap: '0.75rem',
          }}>
            {work.site_url && (
              <a
                href={work.site_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                style={{
                  padding: '0.5rem 1.25rem',
                  background: '#F97316',
                  color: '#0A0A0F',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
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
                  padding: '0.5rem 1.25rem',
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(8px)',
                  color: '#E2E8F0',
                  borderRadius: '6px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                GitHub →
              </a>
            )}
          </div>

          {/* Index number */}
          <div style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            width: '32px',
            height: '32px',
            borderRadius: '6px',
            background: 'rgba(10,10,15,0.7)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(249,115,22,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.7rem',
            fontWeight: 700,
            color: '#F97316',
            fontFamily: 'Syne, sans-serif',
          }}>
            {String(index + 1).padStart(2, '0')}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '1.5rem' }}>
          <h3 className="font-display" style={{
            fontSize: '1.2rem',
            fontWeight: 700,
            color: '#E2E8F0',
            marginBottom: '0.75rem',
            letterSpacing: '-0.02em',
          }}>
            {work.title}
          </h3>

          {/* Tech stack */}
          {work.tech_stack?.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.875rem' }}>
              {work.tech_stack.map((tech) => (
                <span key={tech} style={{
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  padding: '0.25rem 0.6rem',
                  borderRadius: '4px',
                  background: 'rgba(249,115,22,0.08)',
                  color: '#F97316',
                  border: '1px solid rgba(249,115,22,0.2)',
                  letterSpacing: '0.02em',
                }}>
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Description */}
          <div style={{
            fontSize: '0.85rem',
            lineHeight: 1.7,
            color: '#64748B',
          }}
            dangerouslySetInnerHTML={{ __html: work.description }}
          />

          {/* Links (desktop fallback) */}
          <div style={{
            display: 'flex',
            gap: '0.75rem',
            marginTop: '1.25rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid rgba(255,255,255,0.05)',
          }}>
            {work.site_url && (
              <a href={work.site_url} target="_blank" rel="noopener noreferrer" style={{
                fontSize: '0.8rem',
                fontWeight: 600,
                color: '#F97316',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                transition: 'opacity 0.2s ease',
              }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                サイトを見る →
              </a>
            )}
            {work.github_url && (
              <a href={work.github_url} target="_blank" rel="noopener noreferrer" style={{
                fontSize: '0.8rem',
                fontWeight: 600,
                color: '#64748B',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
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
  return (
    <section id="works" style={{
      background: '#0A0A0F',
      position: 'relative',
      overflow: 'hidden',
      padding: '8rem 0',
    }}>
      {/* Background accent */}
      <div style={{
        position: 'absolute',
        bottom: '-100px',
        left: '-100px',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(249,115,22,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Horizontal rule accent */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '2rem',
        right: '2rem',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(249,115,22,0.3), transparent)',
      }} />

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 2rem' }}>

        {/* Section header */}
        <div style={{ marginBottom: '3rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '0.75rem',
          }}>
            <span style={{ width: '32px', height: '1px', background: '#F97316', display: 'block' }} />
            <span style={{
              fontSize: '0.7rem',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#F97316',
            }}>
              Works
            </span>
          </div>
          <h2 className="font-display" style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 800,
            color: '#E2E8F0',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
          }}>
            制作物
          </h2>
          <p style={{ color: '#64748B', marginTop: '0.75rem', fontSize: '0.9rem' }}>
            これまでに作ったもの
          </p>
        </div>

        {works.length === 0 ? (
          <p style={{ color: '#64748B', textAlign: 'center', padding: '4rem 0', fontSize: '0.875rem' }}>
            制作物がまだ登録されていません
          </p>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
            gap: '1.5rem',
          }}>
            {works.map((work, i) => (
              <WorkCard key={work.id} work={work} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}