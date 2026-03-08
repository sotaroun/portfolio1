'use client'
type Skill = {
  id: string
  category: string
  name: string
  level: number
  description: string
}

export default function SkillsSection({ skills }: { skills: Skill[] }) {
  const categories = [...new Set(skills.map(s => s.category))]

  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-2">Skills</h2>
        <p className="text-slate-500 text-center mb-12">学習履歴・技術スタック</p>

        {categories.length === 0 && (
          <p className="text-slate-500 text-center">スキルがまだ登録されていません</p>
        )}

        {categories.map(category => (
          <div key={category} className="mb-10">
            <h3 className="text-violet-400 text-sm font-semibold tracking-widest
              uppercase mb-4 border-b border-slate-800 pb-2">
              {category}
            </h3>
            <div className="grid gap-3">
              {skills.filter(s => s.category === category).map(skill => (
                <div key={skill.id}
                  className="bg-[#111118] border border-slate-800 rounded-xl p-4
                    hover:border-violet-500/30 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-slate-200">{skill.name}</span>
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map(i => (
                        <div key={i}
                          className={`w-2 h-2 rounded-full ${
                            i <= skill.level ? 'bg-violet-500' : 'bg-slate-700'
                          }`} />
                      ))}
                    </div>
                  </div>
                  {skill.description && (
                    <p className="text-slate-500 text-sm">{skill.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}