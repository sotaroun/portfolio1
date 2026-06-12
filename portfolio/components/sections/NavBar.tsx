'use client'
import { useEffect, useRef, useState } from 'react'
import { useMediaQuery } from '@/lib/useMediaQuery'

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isMobile = useMediaQuery('(max-width: 600px)')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      const sections = ['hero', 'skills', 'works']
      for (const id of sections.reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { id: 'hero', label: 'Profile' },
    { id: 'skills', label: 'Skills' },
    { id: 'works', label: 'Works' },
  ]

  const handleLinkClick = (id: string) => {
    setActiveSection(id)
    setMobileMenuOpen(false)
  }

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1rem, 4vw, 2rem)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      transition: 'all 0.3s ease',
      background: scrolled ? 'rgba(10,10,15,0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(249,115,22,0.1)' : '1px solid transparent',
    }}>
      <a href="#hero" className="font-display" style={{
        fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
        fontWeight: 800,
        color: '#F97316',
        textDecoration: 'none',
        letterSpacing: '-0.03em',
        whiteSpace: 'nowrap',
      }}>
        S.ABE
      </a>

      {/* Desktop menu */}
      {!isMobile && (
        <div style={{ 
          display: 'flex', 
          gap: 'clamp(1rem, 3vw, 2rem)', 
          alignItems: 'center',
        }}>
          {links.map(link => (
            <a 
              key={link.id} 
              href={`#${link.id}`}
              onClick={() => handleLinkClick(link.id)}
              style={{
                fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)',
                fontWeight: 500,
                textDecoration: 'none',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: activeSection === link.id ? '#F97316' : '#64748B',
                transition: 'color 0.2s ease',
                position: 'relative',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                if (activeSection !== link.id) {
                  e.currentTarget.style.color = '#E2E8F0'
                }
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = activeSection === link.id ? '#F97316' : '#64748B'
              }}
            >
              {link.label}
              {activeSection === link.id && (
                <span style={{
                  position: 'absolute',
                  bottom: '-6px',
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: '#F97316',
                  borderRadius: '1px',
                }} />
              )}
            </a>
          ))}
        </div>
      )}

      {/* Mobile menu button */}
      {isMobile && (
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#E2E8F0',
            fontSize: '1.5rem',
            cursor: 'pointer',
            padding: '0.5rem',
            zIndex: 101,
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#F97316')}
          onMouseLeave={e => (e.currentTarget.style.color = '#E2E8F0')}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      )}

      {/* Mobile dropdown menu */}
      {isMobile && mobileMenuOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'rgba(10,10,15,0.95)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(249,115,22,0.2)',
          display: 'flex',
          flexDirection: 'column',
          padding: '1rem',
          gap: '0.75rem',
          animation: 'fade-up 0.2s ease',
        }}>
          {links.map(link => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => handleLinkClick(link.id)}
              style={{
                fontSize: '0.85rem',
                fontWeight: 500,
                textDecoration: 'none',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: activeSection === link.id ? '#F97316' : '#64748B',
                transition: 'color 0.2s ease',
                padding: '0.75rem 1rem',
                borderRadius: '6px',
                background: activeSection === link.id ? 'rgba(249,115,22,0.1)' : 'transparent',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                if (activeSection !== link.id) {
                  e.currentTarget.style.color = '#E2E8F0'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                }
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = activeSection === link.id ? '#F97316' : '#64748B'
                e.currentTarget.style.background = activeSection === link.id ? 'rgba(249,115,22,0.1)' : 'transparent'
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}