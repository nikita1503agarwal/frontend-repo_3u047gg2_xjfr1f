import { useEffect, useState } from "react";

const API = import.meta.env.VITE_BACKEND_URL || "";

export default function Admin() {
  const [token, setToken] = useState(localStorage.getItem("mc_token") || "");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", media_type: "photo", url: "", tags: "", is_published: true });
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (token) {
      fetch(`${API}/admin/media`, { headers: { Authorization: `Bearer ${token}` } })
        .then((r) => r.json())
        .then(setItems)
        .catch(() => {});
    }
  }, [token]);

  const login = async (e) => {
    e.preventDefault();
    setStatus("logging");
    const body = new URLSearchParams();
    body.append("username", email);
    body.append("password", password);
    try {
      const res = await fetch(`${API}/auth/login`, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body });
      if (!res.ok) throw new Error("Login failed");
      const data = await res.json();
      localStorage.setItem("mc_token", data.access_token);
      setToken(data.access_token);
      setStatus("");
    } catch (e) {
      setStatus("error");
    }
  };

  const create = async (e) => {
    e.preventDefault();
    setStatus("saving");
    const payload = { ...form, tags: form.tags ? form.tags.split(",").map((t) => t.trim()) : [] };
    const res = await fetch(`${API}/admin/media`, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify(payload) });
    if (res.ok) {
      const id = (await res.json()).id;
      setItems([{ id, ...payload }, ...items]);
      setForm({ title: "", description: "", media_type: "photo", url: "", tags: "", is_published: true });
      setStatus("");
    } else setStatus("error");
  };

  const remove = async (id) => {
    const res = await fetch(`${API}/admin/media/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
    if (res.ok) setItems(items.filter((i) => i.id !== id));
  };

  if (!token) {
    return (
      <section className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
        <form onSubmit={login} className="w-full max-w-sm space-y-4 bg-slate-800/60 border border-white/10 p-6 rounded-xl">
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <input required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full px-4 py-3 rounded-lg bg-slate-900/60 border border-white/10" />
          <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full px-4 py-3 rounded-lg bg-slate-900/60 border border-white/10" />
          <button disabled={status === "logging"} className="w-full px-4 py-3 rounded-lg bg-blue-500 hover:bg-blue-600">{status === "logging" ? "Logging in..." : "Login"}</button>
        </form>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Media Manager</h1>
          <button onClick={() => { localStorage.removeItem("mc_token"); setToken(""); }} className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20">Logout</button>
        </div>

        <form onSubmit={create} className="grid gap-3 bg-slate-800/60 border border-white/10 p-4 rounded-xl mb-8">
          <div className="grid sm:grid-cols-2 gap-3">
            <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Title" className="px-3 py-2 rounded bg-slate-900/60 border border-white/10" />
            <select value={form.media_type} onChange={(e) => setForm({ ...form, media_type: e.target.value })} className="px-3 py-2 rounded bg-slate-900/60 border border-white/10">
              <option value="photo">Photo</option>
              <option value="video">Video</option>
            </select>
          </div>
          <input value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder="Media URL" className="px-3 py-2 rounded bg-slate-900/60 border border-white/10" />
          <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="Tags (comma separated)" className="px-3 py-2 rounded bg-slate-900/60 border border-white/10" />
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" className="px-3 py-2 rounded bg-slate-900/60 border border-white/10" />
          <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={form.is_published} onChange={(e) => setForm({ ...form, is_published: e.target.checked })} /> Published</label>
          <button className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600">Add Media</button>
        </form>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((i) => (
            <div key={i.id} className="rounded-xl overflow-hidden border border-white/10 bg-slate-800/50">
              <div className="h-40 bg-black/20">
                {i.media_type === "photo" ? (
                  <img src={i.url} alt={i.title} className="w-full h-full object-cover" />
                ) : (
                  <video src={i.url} className="w-full h-full object-cover" controls />
                )}
              </div>
              <div className="p-3">
                <div className="font-semibold">{i.title}</div>
                <div className="text-xs text-blue-100/70">{i.media_type}</div>
              </div>
              <div className="p-3 flex items-center justify-between">
                <span className="text-xs px-2 py-1 rounded bg-white/10">{i.is_published ? "Published" : "Hidden"}</span>
                <button onClick={() => remove(i.id)} className="text-red-300 hover:text-red-200 text-sm">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
