import { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      // No backend requirement specified; we simply simulate a success message
      await new Promise((r) => setTimeout(r, 800));
      setStatus("sent");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="py-20 bg-slate-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Get a Quote</h2>
          <p className="mt-2 text-blue-100/80">Tell us about your project and we’ll get back to you quickly.</p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4 bg-slate-800/60 border border-white/10 p-6 rounded-2xl">
          <div className="grid sm:grid-cols-2 gap-4">
            <input name="name" required placeholder="Your name" className="px-4 py-3 rounded-lg bg-slate-900/60 border border-white/10 text-white placeholder:text-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input name="phone" required placeholder="Phone number" className="px-4 py-3 rounded-lg bg-slate-900/60 border border-white/10 text-white placeholder:text-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <input name="email" type="email" placeholder="Email (optional)" className="px-4 py-3 rounded-lg bg-slate-900/60 border border-white/10 text-white placeholder:text-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <select name="product" className="px-4 py-3 rounded-lg bg-slate-900/60 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>ACP Sheets</option>
            <option>WPC Cladding</option>
            <option>Aluminium Louvres</option>
            <option>Others</option>
          </select>
          <textarea name="message" rows="4" placeholder="Project details" className="px-4 py-3 rounded-lg bg-slate-900/60 border border-white/10 text-white placeholder:text-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>

          <button disabled={status === "sending"} className="inline-flex justify-center rounded-lg px-5 py-3 bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white font-medium">
            {status === "sending" ? "Sending..." : status === "sent" ? "Sent!" : "Submit"}
          </button>
        </form>
      </div>
    </section>
  );
}
