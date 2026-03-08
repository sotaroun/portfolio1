'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import RichEditor from '@/components/editor/RichEditor'
import { Plus, Trash2, Save } from 'lucide-react'

type Work = {
  id: string
  title: string
  description: string
  tech_stack: string[]
  site_url: string
  github_url: string
  thumbnail_url: string
  sort_order: number
}

const emptyWork = (): Work => ({
  id: crypto.randomUUID(),
  title: '',
  description: '',
  tech_stack: [],
  site_url: '',
  github_url: '',
  thumbnail_url: '',
  sort_order: 0,
})

export default function AdminWorks() {
  const [works, setWorks] = useState<Work[]>([])
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    supabase.from('works').select('*').order('sort_order')
      .then(({ data }) => { if (data) setWorks(data) })
  }, [])

  const add = () => setWorks([...works, { ...emptyWork(), sort_order: works.length }])
  const remove = (id: string) => setWorks(works.filter(w => w.id !== id))
  const update = (id: string, key: keyof Work, value: string | string[]) =>
    setWorks(works.map(w => w.id === id ? { ...w, [key]: value } : w))

  const uploadThumbnail = async (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const path = `works/${Date.now()}.${file.name.split('.').pop()}`
    const { error } = await supabase.storage.from('portfolio-images').upload(path, file)
    if (error) { alert('アップロード失敗'); return }
    const { data } = supabase.storage.from('portfolio-images').getPublicUrl(path)
    update(id, 'thumbnail_url', data.publicUrl)
  }

  const save = async () => {
    setSaving(true)
    await supabase.from('works').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    await supabase.from('works').insert(works.map((w, i) => ({ ...w, sort_order: i })))
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const inputClass = `w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2
    text-white text-sm placeholder-slate-600 focus:outline-none
    focus:border-violet-500 transition-colors`

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">制作物編集</h2>
        <div className="flex gap-2">
          <button onClick={add}
            className="flex items-center gap-2 px-4 py-2 border border-slate-600
              hover:border-violet-500 rounded-lg text-sm text-slate-400
              hover:text-violet-300 transition-colors">
            <Plus size={14} />追加
          </button>
          <button onClick={save} disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-violet-600
              hover:bg-violet-500 rounded-lg text-sm font-medium transition-colors
              disabled:opacity-50">
            <Save size={14} />
            {saved ? '保存しました！' : saving ? '保存中...' : '保存する'}
          </button>
        </div>
      </div>

      {works.length === 0 && (
        <div className="text-center py-12 text-slate-500 border border-dashed
          border-slate-700 rounded-2xl">
          「追加」ボタンで制作物を追加できます
        </div>
      )}

      <div className="space-y-4">
        {works.map(work => (
          <div key={work.id}
            className="bg-[#111118] border border-slate-800 rounded-xl p-5 space-y-4">
            <div>
              <label className="text-xs text-slate-500 mb-1 block">タイトル</label>
              <input value={work.title}
                onChange={e => update(work.id, 'title', e.target.value)}
                className={inputClass} placeholder="作品名" />
            </div>

            <div>
              <label className="text-xs text-slate-500 mb-2 block">説明文</label>
              <RichEditor
                content={work.description}
                onChange={html => update(work.id, 'description', html)}
                placeholder="作品の説明..."
              />
            </div>

            <div>
              <label className="text-xs text-slate-500 mb-1 block">
                使用技術（カンマ区切り）
              </label>
              <input
                value={work.tech_stack?.join(', ')}
                onChange={e => update(work.id, 'tech_stack',
                  e.target.value.split(',').map(t => t.trim()).filter(Boolean))}
                className={inputClass} placeholder="Next.js, Supabase, Vercel" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-500 mb-1 block">サイトURL</label>
                <input value={work.site_url}
                  onChange={e => update(work.id, 'site_url', e.target.value)}
                  className={inputClass} placeholder="https://..." />
              </div>
              <div>
                <label className="text-xs text-slate-500 mb-1 block">GitHub URL</label>
                <input value={work.github_url}
                  onChange={e => update(work.id, 'github_url', e.target.value)}
                  className={inputClass} placeholder="https://github.com/..." />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-500 mb-2 block">サムネイル画像</label>
              <div className="flex items-center gap-4">
                {work.thumbnail_url && (
                  <img src={work.thumbnail_url} alt="thumbnail"
                    className="w-24 h-16 object-cover rounded-lg" />
                )}
                <label className="cursor-pointer px-4 py-2 border border-slate-600
                  rounded-lg text-sm text-slate-400 hover:border-violet-500
                  hover:text-violet-300 transition-colors">
                  画像を選択
                  <input type="file" accept="image/*" className="hidden"
                    onChange={e => uploadThumbnail(work.id, e)} />
                </label>
              </div>
            </div>

            <div className="flex justify-end">
              <button onClick={() => remove(work.id)}
                className="flex items-center gap-1 text-xs text-slate-600
                  hover:text-red-400 transition-colors">
                <Trash2 size={12} />削除
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}