'use client'
import { useEffect, useState } from 'react'

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

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

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      padding: '1rem 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      transition: 'all 0.3s ease',
      background: scrolled ? 'rgba(10,10,15,0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(249,115,22,0.1)' : '1px solid transparent',
    }}>
      <a href="#hero" className="font-display" style={{
        fontSize: '1.1rem',
        fontWeight: 800,
        color: '#F97316',
        textDecoration: 'none',
        letterSpacing: '-0.03em',
      }}>
        S.ABE
      </a>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        {links.map(link => (
          <a key={link.id} href={`#${link.id}`} style={{
            fontSize: '0.8rem',
            fontWeight: 500,
            textDecoration: 'none',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: activeSection === link.id ? '#F97316' : '#64748B',
            transition: 'color 0.2s ease',
            position: 'relative',
          }}
            onMouseEnter={e => (e.currentTarget.style.color = '#E2E8F0')}
            onMouseLeave={e => (e.currentTarget.style.color = activeSection === link.id ? '#F97316' : '#64748B')}
          >
            {link.label}
            {activeSection === link.id && (
              <span style={{
                position: 'absolute',
                bottom: '-4px',
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
    </nav>
  )
}