'use client'
type Profile = {
  name: string
  tagline: string
  bio: string
  github_url: string
  twitter_url: string
  avatar_url: string
}

export default function HeroSection({ profile }: { profile: Profile }) {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #f8f7ff 0%, #ede9fe 50%, #e0f2fe 100%)' }}>

      {/* 背景の丸いデコレーション */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-20 blur-3xl"
        style={{ background: '#7c3aed' }} />
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full opacity-20 blur-3xl"
        style={{ background: '#06b6d4' }} />
      <div className="absolute top-1/2 left-1/2 w-48 h-48 rounded-full opacity-10 blur-2xl"
        style={{ background: '#f59e0b' }} />

      <div className="max-w-3xl w-full text-center relative z-10">
        {/* アバター */}
        {profile.avatar_url ? (
          <img src={profile.avatar_url} alt={profile.name}
            className="w-28 h-28 rounded-full mx-auto mb-6 object-cover shadow-xl"
            style={{ border: '4px solid white' }} />
        ) : (
          <div className="w-28 h-28 rounded-full mx-auto mb-6 shadow-xl flex items-center
            justify-center text-4xl font-bold text-white"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #06b6d4)', border: '4px solid white' }}>
            {profile.name?.charAt(0) || '?'}
          </div>
        )}

        {/* バッジ */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm
          font-medium mb-4 shadow-sm"
          style={{ background: 'white', color: '#7c3aed', border: '1px solid #ede9fe' }}>
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#7c3aed' }} />
          学習中 / 未経験エンジニア
        </div>

        {/* 名前 */}
        <h1 className="text-6xl font-black mb-4 leading-tight"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          {profile.name || 'Your Name'}
        </h1>

        {/* キャッチコピー */}
        <p className="text-xl font-medium mb-6" style={{ color: '#6b7280' }}>
          {profile.tagline || 'Web App Engineer（学習中）'}
        </p>

        {/* bio */}
        <div className="rounded-2xl p-6 mb-8 text-left shadow-sm max-w-xl mx-auto"
          style={{ background: 'white', border: '1px solid #ede9fe' }}>
          <div className="leading-relaxed" style={{ color: '#374151' }}
            dangerouslySetInnerHTML={{ __html: profile.bio || 'ここに自己紹介が入ります。' }} />
        </div>

        {/* リンク */}
        <div className="flex gap-3 justify-center flex-wrap">
          {profile.github_url && (
            <a href={profile.github_url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-full font-medium
                shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 text-white"
              style={{ background: '#1e1b4b' }}>
              GitHub →
            </a>
          )}
          {profile.twitter_url && (
            <a href={profile.twitter_url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-full font-medium
                shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 text-white"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #06b6d4)' }}>
              Twitter / X →
            </a>
          )}
        </div>
      </div>
    </section>
  )
}