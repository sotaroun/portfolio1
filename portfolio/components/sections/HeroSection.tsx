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
    <section className="relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #f8f7ff 0%, #ede9fe 50%, #e0f2fe 100%)' }}>

      <div className="absolute top-10 left-10 w-48 h-48 rounded-full opacity-20 blur-3xl"
        style={{ background: '#7c3aed' }} />
      <div className="absolute bottom-10 right-10 w-56 h-56 rounded-full opacity-20 blur-3xl"
        style={{ background: '#06b6d4' }} />

      <div className="max-w-3xl mx-auto px-6 relative z-10">

        {/* 大見出し */}
        <div className="py-3 mb-6 -mx-6 px-6"
          style={{ background: 'rgba(0,0,0,0.06)' }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-0.5"
            style={{ color: '#7c3aed' }}>Profile</p>
          <h2 className="text-2xl font-black" style={{ color: '#1e1b4b' }}>自己紹介</h2>
        </div>

        {/* プロフィール横並び */}
        <div className="flex items-center gap-6 mb-6">
          {profile.avatar_url ? (
            <img src={profile.avatar_url} alt={profile.name}
              className="rounded-2xl object-cover shadow-lg shrink-0"
              style={{ width: '100px', height: '100px', border: '3px solid white' }} />
          ) : (
            <div className="rounded-2xl shrink-0 flex items-center justify-center
              text-3xl font-black text-white shadow-lg"
              style={{ width: '100px', height: '100px',
                background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                border: '3px solid white' }}>
              {profile.name?.charAt(0) || '?'}
            </div>
          )}
          <div>
            <h1 className="text-4xl font-black leading-tight"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {profile.name || 'Your Name'}
            </h1>
            <p className="text-sm font-medium mt-1" style={{ color: '#6b7280' }}>
              {profile.tagline || 'Web App Engineer（学習中）'}
            </p>
          </div>
        </div>

        {/* bio */}
        {profile.bio && (
          <div className="rounded-2xl px-5 py-4 mb-5 text-sm leading-relaxed shadow-sm"
            style={{ background: 'white', border: '1px solid #ede9fe', color: '#374151' }}
            dangerouslySetInnerHTML={{ __html: profile.bio }} />
        )}

        {/* リンク */}
        <div className="flex gap-2 flex-wrap pb-10">
          {profile.github_url && (
            <a href={profile.github_url} target="_blank" rel="noopener noreferrer"
              className="px-5 py-2 rounded-full text-sm font-bold shadow
                hover:shadow-md transition-all hover:-translate-y-0.5"
              style={{ background: 'white', color: '#1e1b4b', border: '2px solid #1e1b4b' }}>
              GitHub →
            </a>
          )}
          {profile.twitter_url && (
            <a href={profile.twitter_url} target="_blank" rel="noopener noreferrer"
              className="px-5 py-2 rounded-full text-sm font-bold text-white shadow
                hover:shadow-md transition-all hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #06b6d4)' }}>
              Twitter / X →
            </a>
          )}
        </div>
      </div>
    </section>
  )
}