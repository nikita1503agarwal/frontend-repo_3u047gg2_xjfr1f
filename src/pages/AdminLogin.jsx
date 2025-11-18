import { useState } from 'react'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const form = new URLSearchParams()
      form.append('username', email)
      form.append('password', password)

      const res = await fetch(`${backend}/auth/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: form.toString(),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.detail || 'Login failed')
      }
      const data = await res.json()
      localStorage.setItem('admin_token', data.access_token)
      window.location.href = '/admin/media'
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-slate-800/60 border border-white/10 rounded-2xl p-6 shadow-xl">
        <h1 className="text-2xl font-bold text-white text-center">Admin Login</h1>
        <p className="mt-2 text-center text-blue-100/80 text-sm">Sign in to manage gallery photos and videos</p>
        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
            className="px-4 py-3 rounded-lg bg-slate-900/60 border border-white/10 text-white placeholder:text-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
            className="px-4 py-3 rounded-lg bg-slate-900/60 border border-white/10 text-white placeholder:text-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && <div className="text-red-400 text-sm">{error}</div>}
          <button disabled={loading} className="inline-flex justify-center rounded-lg px-5 py-3 bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white font-medium">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
