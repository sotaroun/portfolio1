'use client'
type Skill = {
  id: string
  category: string
  name: string
  level: number
  description: string
}

const categoryColors: Record<string, { bg: string; text: string; dot: string }> = {
  default: { bg: '#ede9fe', text: '#7c3aed', dot: '#7c3aed' },
  Frontend: { bg: '#e0f2fe', text: '#0369a1', dot: '#06b6d4' },
  Backend:  { bg: '#fef3c7', text: '#92400e', dot: '#f59e0b' },
  Database: { bg: '#dcfce7', text: '#166534', dot: '#22c55e' },
  DevOps:   { bg: '#fce7f3', text: '#9d174d', dot: '#ec4899' },
}

export default function SkillsSection({ skills }: { skills: Skill[] }) {
  const categories = [...new Set(skills.map(s => s.category))]

  const getColor = (cat: string) => categoryColors[cat] ?? categoryColors.default

  return (
    <section id="skills" className="py-24 px-6" style={{ background: 'white' }}>
      <div className="max-w-4xl mx-auto">
        {/* タイトル */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
            style={{ background: '#ede9fe', color: '#7c3aed' }}>
            Skills
          </span>
          <h2 className="text-4xl font-black" style={{ color: '#1e1b4b' }}>学習履歴・技術スタック</h2>
        </div>

        {categories.length === 0 && (
          <p className="text-center" style={{ color: '#9ca3af' }}>
            スキルがまだ登録されていません
          </p>
        )}

        {categories.map(category => {
          const color = getColor(category)
          return (
            <div key={category} className="mb-12">
              <div className="flex items-center gap-2 mb-5">
                <span className="w-3 h-3 rounded-full" style={{ background: color.dot }} />
                <h3 className="font-bold text-lg" style={{ color: '#1e1b4b' }}>{category}</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {skills.filter(s => s.category === category).map(skill => (
                  <div key={skill.id}
                    className="rounded-2xl p-4 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
                    style={{ background: 'white', border: `1px solid ${color.bg}` }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold" style={{ color: '#1e1b4b' }}>{skill.name}</span>
                      <div className="flex gap-1">
                        {[1,2,3,4,5].map(i => (
                          <div key={i} className="w-2.5 h-2.5 rounded-full transition-colors"
                            style={{ background: i <= skill.level ? color.dot : '#e5e7eb' }} />
                        ))}
                      </div>
                    </div>
                    {skill.description && (
                      <p className="text-sm" style={{ color: '#6b7280' }}>{skill.description}</p>
                    )}
                    <div className="mt-2">
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{ background: color.bg, color: color.text }}>
                        {['', '入門', '基礎', '実践', '応用', '熟練'][skill.level]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}