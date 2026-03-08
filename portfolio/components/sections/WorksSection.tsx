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

const tagColors = [
  { bg: '#ede9fe', text: '#7c3aed' },
  { bg: '#e0f2fe', text: '#0369a1' },
  { bg: '#fef3c7', text: '#92400e' },
  { bg: '#dcfce7', text: '#166534' },
  { bg: '#fce7f3', text: '#9d174d' },
]

export default function WorksSection({ works }: { works: Work[] }) {
  return (
    <section id="works" className="py-24 px-6" style={{ background: '#f8f7ff' }}>
      <div className="max-w-4xl mx-auto">
        {/* タイトル */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
            style={{ background: '#e0f2fe', color: '#0369a1' }}>
            Works
          </span>
          <h2 className="text-4xl font-black" style={{ color: '#1e1b4b' }}>制作物・プロジェクト</h2>
        </div>

        {works.length === 0 && (
          <p className="text-center" style={{ color: '#9ca3af' }}>
            制作物がまだ登録されていません
          </p>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {works.map(work => (
            <div key={work.id}
              className="rounded-3xl overflow-hidden shadow-md hover:shadow-xl
                transition-all duration-300 hover:-translate-y-1"
              style={{ background: 'white', border: '1px solid #e5e7eb' }}>
              {/* サムネイル */}
              {work.thumbnail_url ? (
                <img src={work.thumbnail_url} alt={work.title}
                  className="w-full h-48 object-cover" />
              ) : (
                <div className="w-full h-48 flex items-center justify-center text-5xl"
                  style={{ background: 'linear-gradient(135deg, #ede9fe, #e0f2fe)' }}>
                  🚀
                </div>
              )}

              <div className="p-6">
                <h3 className="font-black text-xl mb-2" style={{ color: '#1e1b4b' }}>
                  {work.title}
                </h3>
                <div className="text-sm leading-relaxed mb-4" style={{ color: '#6b7280' }}
                  dangerouslySetInnerHTML={{ __html: work.description }} />

                {/* タグ */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {work.tech_stack?.map((tech, i) => {
                    const c = tagColors[i % tagColors.length]
                    return (
                      <span key={tech} className="text-xs px-3 py-1 rounded-full font-medium"
                        style={{ background: c.bg, color: c.text }}>
                        {tech}
                      </span>
                    )
                  })}
                </div>

                {/* リンク */}
                <div className="flex gap-3">
                  {work.site_url && (
                    <a href={work.site_url} target="_blank" rel="noopener noreferrer"
                      className="flex-1 text-center py-2 rounded-xl text-sm font-semibold
                        text-white transition-all hover:opacity-90"
                      style={{ background: 'linear-gradient(135deg, #7c3aed, #06b6d4)' }}>
                      サイトを見る →
                    </a>
                  )}
                  {work.github_url && (
                    <a href={work.github_url} target="_blank" rel="noopener noreferrer"
                      className="flex-1 text-center py-2 rounded-xl text-sm font-semibold
                        transition-all hover:opacity-90"
                      style={{ background: '#f3f4f6', color: '#374151' }}>
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