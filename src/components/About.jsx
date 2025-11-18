export default function About() {
  return (
    <section id="about" className="py-20 bg-slate-900/95">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">About Mala Ceramic</h2>
          <p className="mt-4 text-blue-100/90">
            We specialize in exterior-grade materials that combine aesthetics with performance. From ACP to WPC and aluminium louvres, our products are sourced from trusted manufacturers and installed by experienced teams.
          </p>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-white/10 bg-slate-800/50">
              <p className="text-3xl font-bold text-white">10+ yrs</p>
              <p className="text-blue-100/80">Industry experience</p>
            </div>
            <div className="p-4 rounded-xl border border-white/10 bg-slate-800/50">
              <p className="text-3xl font-bold text-white">200+</p>
              <p className="text-blue-100/80">Projects delivered</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden border border-white/10 bg-slate-800/40">
          <img src="https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1600&auto=format&fit=crop" alt="Team installing exterior cladding" className="w-full h-full object-cover" />
        </div>
      </div>
    </section>
  );
}
