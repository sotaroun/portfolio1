import { supabase } from '@/lib/supabase'
import HeroSection from '@/components/sections/HeroSection'
import SkillsSection from '@/components/sections/SkillsSection'
import WorksSection from '@/components/sections/WorksSection'

export const revalidate = 0

export default async function Home() {
  const [{ data: profiles }, { data: skills }, { data: works }] = await Promise.all([
    supabase.from('profiles').select('*').limit(1),
    supabase.from('skills').select('*').order('sort_order'),
    supabase.from('works').select('*').order('sort_order'),
  ])

  const profile = profiles?.[0] ?? {
    name: '', tagline: '', bio: '',
    github_url: '', twitter_url: '', avatar_url: ''
  }

  return (
    <main>
      <HeroSection profile={profile} />
      <SkillsSection skills={skills ?? []} />
      <WorksSection works={works ?? []} />

      {/* フッター */}
      <footer className="py-8 text-center text-slate-600 text-sm border-t border-slate-800">
        © {new Date().getFullYear()} {profile.name || 'Portfolio'}
      </footer>
    </main>
  )
}