'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    console.log('data:', data)
    console.log('error:', error)

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    // 直接リダイレクト
    window.location.href = '/admin'
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-2">管理画面</h1>
        <p className="text-slate-500 text-center text-sm mb-8">ログインしてください</p>

        <form onSubmit={handleLogin}
          className="bg-[#111118] border border-slate-800 rounded-2xl p-6 space-y-4">
          <div>
            <label className="text-sm text-slate-400 mb-1 block">メールアドレス</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5
                text-white placeholder-slate-600 focus:outline-none focus:border-violet-500
                transition-colors"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="text-sm text-slate-400 mb-1 block">パスワード</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5
                text-white placeholder-slate-600 focus:outline-none focus:border-violet-500
                transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm bg-red-900/20 border border-red-800/50
              rounded-lg px-3 py-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-violet-600 hover:bg-violet-500
              text-white font-medium transition-colors disabled:opacity-50">
            {loading ? 'ログイン中...' : 'ログイン'}
          </button>
        </form>
      </div>
    </div>
  )
}