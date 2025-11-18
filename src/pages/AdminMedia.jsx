import { useEffect, useState } from 'react'

function useAuthHeader() {
  const token = localStorage.getItem('admin_token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export default function AdminMedia() {
  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function fetchItems() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${backend}/media`, { headers: { 'Content-Type': 'application/json', ...useAuthHeader() } })
      if (res.status === 401) {
        window.location.href = '/admin/login'
        return
      }
      if (!res.ok) throw new Error('Failed to load media')
      const data = await res.json()
      setItems(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchItems() }, [])

  async function handleCreate(e) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const payload = {
      title: form.get('title'),
      description: form.get('description') || undefined,
      media_type: form.get('media_type'),
      url: form.get('url'),
      tags: form.get('tags') ? form.get('tags').split(',').map(t => t.trim()) : undefined,
      is_published: form.get('is_published') === 'on'
    }
    try {
      const res = await fetch(`${backend}/media`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...useAuthHeader() },
        body: JSON.stringify(payload)
      })
      if (res.status === 401) { window.location.href = '/admin/login'; return }
      if (!res.ok) throw new Error('Create failed')
      e.currentTarget.reset()
      fetchItems()
    } catch (e) {
      alert(e.message)
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this item?')) return
    try {
      const res = await fetch(`${backend}/media/${id}`, {
        method: 'DELETE',
        headers: { ...useAuthHeader() }
      })
      if (res.status === 401) { window.location.href = '/admin/login'; return }
      if (!res.ok) throw new Error('Delete failed')
      fetchItems()
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Gallery Manager</h1>
          <a href="/" className="text-blue-300 hover:text-white">Back to site</a>
        </div>

        <form onSubmit={handleCreate} className="grid gap-3 bg-slate-800/60 border border-white/10 p-4 rounded-xl mb-8">
          <div className="grid sm:grid-cols-2 gap-3">
            <input name="title" required placeholder="Title" className="px-3 py-2 rounded bg-slate-900/60 border border-white/10" />
            <select name="media_type" className="px-3 py-2 rounded bg-slate-900/60 border border-white/10">
              <option value="photo">Photo</option>
              <option value="video">Video</option>
            </select>
          </div>
          <input name="url" required placeholder="Image/Video URL" className="px-3 py-2 rounded bg-slate-900/60 border border-white/10" />
          <input name="tags" placeholder="Tags (comma separated)" className="px-3 py-2 rounded bg-slate-900/60 border border-white/10" />
          <textarea name="description" placeholder="Description" className="px-3 py-2 rounded bg-slate-900/60 border border-white/10" />
          <label className="inline-flex items-center gap-2 text-sm">
            <input type="checkbox" name="is_published" defaultChecked className="accent-blue-500" />
            Published
          </label>
          <button className="justify-center inline-flex bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded">Add Item</button>
        </form>

        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-400">{error}</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {items.map((it) => (
              <div key={it._id} className="border border-white/10 rounded-xl overflow-hidden bg-slate-800/60">
                <div className="h-48 bg-slate-900/50 flex items-center justify-center">
                  {it.media_type === 'video' ? (
                    <video src={it.url} className="w-full h-full object-cover" controls />
                  ) : (
                    <img src={it.url} className="w-full h-full object-cover" alt={it.title} />
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{it.title}</h3>
                    <button onClick={() => handleDelete(it._id)} className="text-red-300 hover:text-red-400 text-sm">Delete</button>
                  </div>
                  {it.description && <p className="text-blue-100/80 text-sm mt-1">{it.description}</p>}
                  {it.tags && it.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2 text-xs">
                      {it.tags.map(t => (
                        <span key={t} className="px-2 py-1 rounded bg-white/10 border border-white/10">{t}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
