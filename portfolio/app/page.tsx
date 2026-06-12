import { supabase } from '@/lib/supabase'
import HeroSection from '@/components/sections/HeroSection'
import SkillsSection from '@/components/sections/SkillsSection'
import WorksSection from '@/components/sections/WorksSection'
import NavBar from '@/components/sections/NavBar'

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
    <>
      <NavBar />
      <main>
        <HeroSection profile={profile} />
        <SkillsSection skills={skills ?? []} />
        <WorksSection works={works ?? []} />
        <footer style={{
          background: '#0A0A0F',
          borderTop: '1px solid #1e1e2e',
          padding: 'clamp(1.5rem, 3vw, 3rem)',
          textAlign: 'center',
        }}>
          <p className="font-display" style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            fontWeight: 700,
            color: '#E2E8F0',
            marginBottom: '0.5rem',
            letterSpacing: '-0.02em',
          }}>
            {profile.name || '安部 壮一'}
          </p>
          <p style={{ color: '#64748B', fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)' }}>
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </footer>
      </main>
    </>
  )
}