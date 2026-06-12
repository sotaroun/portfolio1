'use client'
import { useEffect, useRef, useState } from 'react'
import { useMediaQuery } from '@/lib/useMediaQuery'

type Skill = {
  id: string
  category: string
  name: string
  level: number
  description: string
}

const levelLabel = ['', '入門', '基礎', '実践', '応用', '熟練']
const levelColor = ['', '#64748B', '#64748B', '#FB923C', '#F97316', '#FBBF24']

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

function SkillBar({ skill, visible, delay }: { skill: Skill; visible: boolean; delay: number }) {
  const pct = (skill.level / 5) * 100
  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateX(0)' : 'translateX(-20px)',
      transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
      padding: 'clamp(0.75rem, 2vw, 0.875rem)',
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: 'clamp(8px, 2vw, 10px)',
    }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(249,115,22,0.3)')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', gap: '0.5rem', minWidth: 0 }}>
        <span style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)', fontWeight: 600, color: '#E2E8F0', fontFamily: 'Inter, sans-serif', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {skill.name}
        </span>
        <span style={{
          fontSize: 'clamp(0.55rem, 1vw, 0.65rem)',
          fontWeight: 700,
          letterSpacing: '0.05em',
          color: levelColor[skill.level] || '#64748B',
          background: 'rgba(249,115,22,0.08)',
          padding: '0.2rem 0.5rem',
          borderRadius: '3px',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}>
          {levelLabel[skill.level]}
        </span>
      </div>
      <div style={{
        height: '3px',
        background: 'rgba(255,255,255,0.06)',
        borderRadius: '2px',
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: visible ? `${pct}%` : '0%',
          background: `linear-gradient(90deg, #F97316, #FB923C)`,
          borderRadius: '2px',
          transition: `width 1s cubic-bezier(0.16,1,0.3,1) ${delay + 0.2}s`,
          boxShadow: visible ? '0 0 8px rgba(249,115,22,0.5)' : 'none',
        }} />
      </div>
    </div>
  )
}

const categoryIcons: Record<string, string> = {
  'フレームワーク': '⬡',
  '言語': '</>',
  'インフラ / クラウド / デプロイ': '☁',
  'DB': '◈',
  'Frontend': '⬡',
  'Backend': '⚙',
  'Database': '◈',
  'DevOps': '☁',
}

export default function SkillsSection({ skills }: { skills: Skill[] }) {
  const categories = [...new Set(skills.map(s => s.category))]
  const [activeTab, setActiveTab] = useState<string>(categories[0] ?? '')
  const { ref: sectionRef, inView } = useInView(0.05)
  const isMobile = useMediaQuery('(max-width: 640px)')

  useEffect(() => {
    if (categories.length > 0 && !activeTab) setActiveTab(categories[0])
  }, [categories.length])

  const activeSkills = skills.filter(s => s.category === activeTab)

  return (
    <section id="skills" style={{
      background: '#0D0D14',
      position: 'relative',
      overflow: 'hidden',
      padding: 'clamp(3rem, 8vw, 8rem) clamp(1.5rem, 4vw, 4rem)',
    }}>
      {/* Background accent */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        right: '-100px',
        width: 'clamp(200px, 50vw, 500px)',
        height: 'clamp(200px, 50vw, 500px)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(249,115,22,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
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
              Skills
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
            技術スタック
          </h2>
          <p style={{ color: '#64748B', marginTop: 'clamp(0.5rem, 1vw, 0.75rem)', fontSize: 'clamp(0.75rem, 1.5vw, 0.9rem)' }}>
            習得中の技術スタック一覧
          </p>
        </div>

        {/* Category tabs */}
        <div style={{
          display: 'flex',
          gap: 'clamp(0.4rem, 1vw, 0.5rem)',
          flexWrap: 'wrap',
          marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
        }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              style={{
                padding: 'clamp(0.4rem, 1vw, 0.5rem) clamp(0.75rem, 2vw, 1.25rem)',
                borderRadius: 'clamp(5px, 1vw, 6px)',
                border: '1px solid',
                borderColor: activeTab === cat ? '#F97316' : 'rgba(255,255,255,0.08)',
                background: activeTab === cat ? 'rgba(249,115,22,0.12)' : 'transparent',
                color: activeTab === cat ? '#F97316' : '#64748B',
                fontSize: 'clamp(0.65rem, 1.2vw, 0.8rem)',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '0.02em',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => {
                if (activeTab !== cat) {
                  e.currentTarget.style.color = '#E2E8F0'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
                }
              }}
              onMouseLeave={e => {
                if (activeTab !== cat) {
                  e.currentTarget.style.color = '#64748B'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                }
              }}
            >
              <span style={{ marginRight: '0.3rem', opacity: 0.8 }}>{categoryIcons[cat]}</span>
              <span style={{ display: 'inline-block', maxWidth: 'calc(100% - 20px)', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {cat}
              </span>
              <span style={{
                marginLeft: '0.4rem',
                fontSize: 'clamp(0.55rem, 1vw, 0.65rem)',
                opacity: 0.6,
              }}>
                {skills.filter(s => s.category === cat).length}
              </span>
            </button>
          ))}
        </div>

        {/* Skills grid - responsive columns */}
        <div ref={sectionRef} style={{
          display: 'grid',
          gridTemplateColumns: isMobile 
            ? '1fr'
            : 'repeat(auto-fit, minmax(clamp(200px, 280px, 100%), 1fr))',
          gap: 'clamp(0.6rem, 1.5vw, 0.75rem)',
        }}>
          {activeSkills.map((skill, i) => (
            <SkillBar key={skill.id} skill={skill} visible={inView} delay={i * 0.06} />
          ))}
        </div>

        {activeSkills.length === 0 && (
          <p style={{ color: '#64748B', fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)', textAlign: 'center', padding: 'clamp(2rem, 4vw, 3rem) 0' }}>
            スキルがまだ登録されていません
          </p>
        )}
      </div>
    </section>
  )
}