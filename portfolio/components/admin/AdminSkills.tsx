'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Plus, Trash2, Save } from 'lucide-react'

type Skill = {
  id: string
  category: string
  name: string
  level: number
  description: string
  sort_order: number
}

const emptySkill = (): Skill => ({
  id: crypto.randomUUID(),
  category: '',
  name: '',
  level: 3,
  description: '',
  sort_order: 0,
})

export default function AdminSkills() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    supabase.from('skills').select('*').order('sort_order')
      .then(({ data }) => { if (data) setSkills(data) })
  }, [])

  const add = () => setSkills([...skills, { ...emptySkill(), sort_order: skills.length }])
  const remove = (id: string) => setSkills(skills.filter(s => s.id !== id))
  const update = (id: string, key: keyof Skill, value: string | number) =>
    setSkills(skills.map(s => s.id === id ? { ...s, [key]: value } : s))

  const save = async () => {
    setSaving(true)
    // 削除してから全件upsert
    await supabase.from('skills').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    await supabase.from('skills').insert(skills.map((s, i) => ({ ...s, sort_order: i })))
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const inputClass = `bg-slate-900 border border-slate-700 rounded-lg px-3 py-2
    text-white text-sm placeholder-slate-600 focus:outline-none
    focus:border-violet-500 transition-colors`

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">スキル編集</h2>
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

      {skills.length === 0 && (
        <div className="text-center py-12 text-slate-500 border border-dashed
          border-slate-700 rounded-2xl">
          「追加」ボタンでスキルを追加できます
        </div>
      )}

      <div className="space-y-3">
        {skills.map((skill, i) => (
          <div key={skill.id}
            className="bg-[#111118] border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-500 mb-1 block">カテゴリ</label>
                <input value={skill.category}
                  onChange={e => update(skill.id, 'category', e.target.value)}
                  className={`${inputClass} w-full`} placeholder="例: Frontend" />
              </div>
              <div>
                <label className="text-xs text-slate-500 mb-1 block">スキル名</label>
                <input value={skill.name}
                  onChange={e => update(skill.id, 'name', e.target.value)}
                  className={`${inputClass} w-full`} placeholder="例: React" />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-500 mb-1 block">
                レベル（{skill.level}/5）
              </label>
              <input type="range" min={1} max={5} value={skill.level}
                onChange={e => update(skill.id, 'level', Number(e.target.value))}
                className="w-full accent-violet-500" />
            </div>

            <div>
              <label className="text-xs text-slate-500 mb-1 block">説明（任意）</label>
              <input value={skill.description}
                onChange={e => update(skill.id, 'description', e.target.value)}
                className={`${inputClass} w-full`} placeholder="簡単な説明..." />
            </div>

            <div className="flex justify-end">
              <button onClick={() => remove(skill.id)}
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