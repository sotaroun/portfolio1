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
    <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* 背景グラデーション */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[600px] h-[600px] rounded-full opacity-10
          bg-gradient-radial from-violet-500 to-transparent blur-3xl" />
      </div>

      <div className="max-w-3xl w-full text-center relative z-10">
        {profile.avatar_url && (
          <img
            src={profile.avatar_url}
            alt={profile.name}
            className="w-24 h-24 rounded-full mx-auto mb-6 object-cover
              ring-2 ring-violet-500 ring-offset-2 ring-offset-[#0a0a0f]"
          />
        )}
        <p className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-3">
          Portfolio
        </p>
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-slate-400
          bg-clip-text text-transparent">
          {profile.name || 'Your Name'}
        </h1>
        <p className="text-xl text-violet-300 mb-6">
          {profile.tagline || 'Web App Engineer（学習中）'}
        </p>
        <div
          className="text-slate-400 leading-relaxed max-w-xl mx-auto mb-8 prose-invert"
          dangerouslySetInnerHTML={{ __html: profile.bio || '' }}
        />
        <div className="flex gap-4 justify-center">
          {profile.github_url && (
            <a href={profile.github_url} target="_blank" rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-full border border-slate-600
                text-slate-300 hover:border-violet-500 hover:text-violet-300
                transition-all duration-200 text-sm">
              GitHub
            </a>
          )}
          {profile.twitter_url && (
            <a href={profile.twitter_url} target="_blank" rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-full border border-slate-600
                text-slate-300 hover:border-violet-500 hover:text-violet-300
                transition-all duration-200 text-sm">
              Twitter / X
            </a>
          )}
        </div>
      </div>
    </section>
  )
}