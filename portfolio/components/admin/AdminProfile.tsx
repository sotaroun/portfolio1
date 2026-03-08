'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import RichEditor from '@/components/editor/RichEditor'
import { Save } from 'lucide-react'

type Profile = {
  id: string
  name: string
  tagline: string
  bio: string
  github_url: string
  twitter_url: string
  avatar_url: string
}

export default function AdminProfile() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    supabase.from('profiles').select('*').limit(1).single()
      .then(({ data }) => { if (data) setProfile(data) })
  }, [])

  const save = async () => {
    if (!profile) return
    setSaving(true)
    await supabase.from('profiles').upsert(profile)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const uploadAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !profile) return
    const path = `avatars/${Date.now()}.${file.name.split('.').pop()}`
    const { error } = await supabase.storage.from('portfolio-images').upload(path, file)
    if (error) { alert('アップロード失敗'); return }
    const { data } = supabase.storage.from('portfolio-images').getPublicUrl(path)
    setProfile({ ...profile, avatar_url: data.publicUrl })
  }

  if (!profile) return <div className="text-slate-500">読み込み中...</div>

  const inputClass = `w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5
    text-white placeholder-slate-600 focus:outline-none focus:border-violet-500 transition-colors`

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">自己紹介編集</h2>
        <button onClick={save} disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-500
            rounded-lg text-sm font-medium transition-colors disabled:opacity-50">
          <Save size={14} />
          {saved ? '保存しました！' : saving ? '保存中...' : '保存する'}
        </button>
      </div>

      <div className="bg-[#111118] border border-slate-800 rounded-2xl p-6 space-y-5">
        {/* アバター */}
        <div>
          <label className="text-sm text-slate-400 mb-2 block">プロフィール画像</label>
          <div className="flex items-center gap-4">
            {profile.avatar_url && (
              <img src={profile.avatar_url} alt="avatar"
                className="w-16 h-16 rounded-full object-cover ring-2 ring-violet-500" />
            )}
            <label className="cursor-pointer px-4 py-2 border border-slate-600
              rounded-lg text-sm text-slate-400 hover:border-violet-500
              hover:text-violet-300 transition-colors">
              画像を選択
              <input type="file" accept="image/*" className="hidden" onChange={uploadAvatar} />
            </label>
          </div>
        </div>

        <div>
          <label className="text-sm text-slate-400 mb-1 block">名前</label>
          <input value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})}
            className={inputClass} placeholder="山田 太郎" />
        </div>

        <div>
          <label className="text-sm text-slate-400 mb-1 block">キャッチコピー</label>
          <input value={profile.tagline}
            onChange={e => setProfile({...profile, tagline: e.target.value})}
            className={inputClass} placeholder="Web App Engineer（学習中）" />
        </div>

        <div>
          <label className="text-sm text-slate-400 mb-2 block">自己紹介文</label>
          <RichEditor
            content={profile.bio}
            onChange={html => setProfile({...profile, bio: html})}
            placeholder="自己紹介を入力..."
          />
        </div>

        <div>
          <label className="text-sm text-slate-400 mb-1 block">GitHub URL</label>
          <input value={profile.github_url}
            onChange={e => setProfile({...profile, github_url: e.target.value})}
            className={inputClass} placeholder="https://github.com/yourname" />
        </div>

        <div>
          <label className="text-sm text-slate-400 mb-1 block">Twitter / X URL</label>
          <input value={profile.twitter_url}
            onChange={e => setProfile({...profile, twitter_url: e.target.value})}
            className={inputClass} placeholder="https://x.com/yourname" />
        </div>
      </div>
    </div>
  )
}