'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import { supabase } from '@/lib/supabase'
import { Bold, Italic, List, ListOrdered, Heading2, Heading3, ImageIcon, Code } from 'lucide-react'

type Props = {
  content: string
  onChange: (html: string) => void
  placeholder?: string
}

export default function RichEditor({ content, onChange, placeholder = '内容を入力...' }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ inline: false }),
      Placeholder.configure({ placeholder }),
    ],
    content,
    immediatelyRender: false, // ← これを追加
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  })

  if (!editor) return null

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const ext = file.name.split('.').pop()
    const path = `${Date.now()}.${ext}`
    const { error } = await supabase.storage
      .from('portfolio-images')
      .upload(path, file)
    if (error) { alert('画像アップロード失敗'); return }
    const { data } = supabase.storage.from('portfolio-images').getPublicUrl(path)
    editor.chain().focus().setImage({ src: data.publicUrl }).run()
  }

  const btn = (active: boolean) =>
    `p-1.5 rounded transition-colors ${active
      ? 'bg-violet-600 text-white'
      : 'text-slate-400 hover:text-white hover:bg-slate-700'}`

  return (
    <div className="border border-slate-700 rounded-lg overflow-hidden">
      <div className="flex items-center gap-1 px-2 py-1.5 bg-slate-800 border-b border-slate-700 flex-wrap">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()}
          className={btn(editor.isActive('bold'))}><Bold size={14} /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()}
          className={btn(editor.isActive('italic'))}><Italic size={14} /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleCode().run()}
          className={btn(editor.isActive('code'))}><Code size={14} /></button>
        <div className="w-px h-4 bg-slate-600 mx-1" />
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={btn(editor.isActive('heading', { level: 2 }))}><Heading2 size={14} /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={btn(editor.isActive('heading', { level: 3 }))}><Heading3 size={14} /></button>
        <div className="w-px h-4 bg-slate-600 mx-1" />
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={btn(editor.isActive('bulletList'))}><List size={14} /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={btn(editor.isActive('orderedList'))}><ListOrdered size={14} /></button>
        <div className="w-px h-4 bg-slate-600 mx-1" />
        <label className={`${btn(false)} cursor-pointer`}>
          <ImageIcon size={14} />
          <input type="file" accept="image/*" className="hidden" onChange={uploadImage} />
        </label>
      </div>
      <div className="bg-slate-900 min-h-[120px]">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}