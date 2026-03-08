'use client'
type Work = {
  id: string
  title: string
  description: string
  tech_stack: string[]
  site_url: string
  github_url: string
  thumbnail_url: string
}

export default function WorksSection({ works }: { works: Work[] }) {
  return (
    <section id="works" className="py-24 px-6 bg-[#0d0d14]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-2">Works</h2>
        <p className="text-slate-500 text-center mb-12">制作物・プロジェクト</p>

        {works.length === 0 && (
          <p className="text-slate-500 text-center">制作物がまだ登録されていません</p>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {works.map(work => (
            <div key={work.id}
              className="bg-[#111118] border border-slate-800 rounded-2xl overflow-hidden
                hover:border-violet-500/30 transition-all duration-300 hover:-translate-y-1">
              {work.thumbnail_url && (
                <img src={work.thumbnail_url} alt={work.title}
                  className="w-full h-48 object-cover" />
              )}
              {!work.thumbnail_url && (
                <div className="w-full h-48 bg-gradient-to-br from-violet-900/30 to-slate-800
                  flex items-center justify-center text-slate-600 text-4xl">
                  📦
                </div>
              )}
              <div className="p-5">
                <h3 className="font-bold text-lg mb-2">{work.title}</h3>
                <div
                  className="text-slate-400 text-sm mb-4 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: work.description }}
                />
                <div className="flex flex-wrap gap-2 mb-4">
                  {work.tech_stack?.map(tech => (
                    <span key={tech}
                      className="text-xs px-2.5 py-1 rounded-full
                        bg-violet-900/30 text-violet-300 border border-violet-800/50">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  {work.site_url && (
                    <a href={work.site_url} target="_blank" rel="noopener noreferrer"
                      className="text-sm text-violet-400 hover:text-violet-300 transition-colors">
                      サイトを見る →
                    </a>
                  )}
                  {work.github_url && (
                    <a href={work.github_url} target="_blank" rel="noopener noreferrer"
                      className="text-sm text-slate-400 hover:text-slate-300 transition-colors">
                      GitHub →
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}