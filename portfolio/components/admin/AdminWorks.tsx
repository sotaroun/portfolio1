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

  const inputStyle = {
    background: '#f8f7ff',
    border: '2px solid #e5e7eb',
    color: '#1e1b4b',
    borderRadius: '10px',
    padding: '8px 12px',
    width: '100%',
    fontSize: '14px',
    outline: 'none',
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black" style={{ color: '#1e1b4b' }}>制作物編集</h2>
        <div className="flex gap-2">
          <button onClick={add}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold
              transition-all hover:opacity-80"
            style={{ background: '#e0f2fe', color: '#0369a1' }}>
            <Plus size={14} />追加
          </button>
          <button onClick={save} disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold
              text-white shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5
              disabled:opacity-50"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #06b6d4)' }}>
            <Save size={14} />
            {saved ? '✅ 保存しました！' : saving ? '保存中...' : '保存する'}
          </button>
        </div>
      </div>

      {works.length === 0 && (
        <div className="text-center py-16 rounded-3xl"
          style={{ border: '2px dashed #7dd3fc', color: '#9ca3af' }}>
          <p className="text-4xl mb-3">🚀</p>
          <p className="font-medium">「追加」ボタンで制作物を追加できます</p>
        </div>
      )}

      <div className="space-y-4">
        {works.map(work => (
          <div key={work.id} className="rounded-2xl p-6 shadow-sm space-y-4"
            style={{ background: 'white', border: '1px solid #e0f2fe' }}>

            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: '#6b7280' }}>タイトル</label>
              <input value={work.title}
                onChange={e => update(work.id, 'title', e.target.value)}
                style={inputStyle} placeholder="作品名" />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-2" style={{ color: '#6b7280' }}>説明文</label>
              <RichEditor
                content={work.description}
                onChange={html => update(work.id, 'description', html)}
                placeholder="作品の説明..."
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: '#6b7280' }}>
                使用技術（カンマ区切り）
              </label>
              <input
                value={work.tech_stack?.join(', ')}
                onChange={e => update(work.id, 'tech_stack',
                  e.target.value.split(',').map(t => t.trim()).filter(Boolean))}
                style={inputStyle} placeholder="Next.js, Supabase, Vercel" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: '#6b7280' }}>サイトURL</label>
                <input value={work.site_url}
                  onChange={e => update(work.id, 'site_url', e.target.value)}
                  style={inputStyle} placeholder="https://..." />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: '#6b7280' }}>GitHub URL</label>
                <input value={work.github_url}
                  onChange={e => update(work.id, 'github_url', e.target.value)}
                  style={inputStyle} placeholder="https://github.com/..." />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-2" style={{ color: '#6b7280' }}>サムネイル画像</label>
              <div className="flex items-center gap-4">
                {work.thumbnail_url && (
                  <img src={work.thumbnail_url} alt="thumbnail"
                    className="w-24 h-16 object-cover rounded-xl shadow-sm" />
                )}
                <label className="cursor-pointer px-4 py-2 rounded-xl text-sm font-semibold
                  transition-all hover:opacity-80"
                  style={{ background: '#e0f2fe', color: '#0369a1' }}>
                  画像を選択
                  <input type="file" accept="image/*" className="hidden"
                    onChange={e => uploadThumbnail(work.id, e)} />
                </label>
              </div>
            </div>

            <div className="flex justify-end pt-2" style={{ borderTop: '1px solid #f0fdf4' }}>
              <button onClick={() => remove(work.id)}
                className="flex items-center gap-1 text-xs font-medium transition-colors hover:opacity-70"
                style={{ color: '#ef4444' }}>
                <Trash2 size={12} />削除
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}