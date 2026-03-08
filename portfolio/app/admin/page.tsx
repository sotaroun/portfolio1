'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import AdminProfile from '../../components/admin/AdminProfile'
import AdminSkills from '../../components/admin/AdminSkills'
import AdminWorks from '../../components/admin/AdminWorks'
import { LogOut, User, Code2, Briefcase } from 'lucide-react'

type Tab = 'profile' | 'skills' | 'works'

export default function AdminPage() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('profile')
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) router.push('/admin/login')
      else setChecking(false)
    })
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-slate-500">読み込み中...</div>
      </div>
    )
  }

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: 'profile', label: '自己紹介', icon: <User size={16} /> },
    { key: 'skills',  label: 'スキル',   icon: <Code2 size={16} /> },
    { key: 'works',   label: '制作物',   icon: <Briefcase size={16} /> },
  ]

  return (
    <div className="min-h-screen">
      {/* ヘッダー */}
      <header className="border-b border-slate-800 bg-[#111118] sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="font-bold text-lg">管理画面</h1>
          <div className="flex items-center gap-4">
            <a href="/" target="_blank"
              className="text-sm text-slate-400 hover:text-white transition-colors">
              サイトを見る →
            </a>
            <button onClick={handleLogout}
              className="flex items-center gap-1.5 text-sm text-slate-400
                hover:text-red-400 transition-colors">
              <LogOut size={14} />ログアウト
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* タブ */}
        <div className="flex gap-2 mb-8 bg-[#111118] border border-slate-800
          rounded-xl p-1 w-fit">
          {tabs.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm
                font-medium transition-all ${
                  tab === t.key
                    ? 'bg-violet-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}>
              {t.icon}{t.label}
            </button>
          ))}
        </div>

        {/* コンテンツ */}
        {tab === 'profile' && <AdminProfile />}
        {tab === 'skills'  && <AdminSkills />}
        {tab === 'works'   && <AdminWorks />}
      </div>
    </div>
  )
}