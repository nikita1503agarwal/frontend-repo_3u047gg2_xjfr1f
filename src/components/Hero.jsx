export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-24 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
      <div className="absolute -top-40 -right-40 w-[32rem] h-[32rem] bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-[32rem] h-[32rem] bg-cyan-400/10 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
              Mala Ceramic — Exterior ACP & WPC Specialists
            </h1>
            <p className="mt-6 text-lg text-blue-100/90 max-w-xl">
              Durable, weather-resistant and modern exterior solutions. We supply and install ACP sheets and WPC cladding for homes, offices and commercial facades.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <a href="#products" className="inline-flex items-center rounded-lg px-5 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium shadow">
                Explore ACP & WPC
              </a>
              <a href="#contact" className="inline-flex items-center rounded-lg px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-medium border border-white/10">
                Get a Quote
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-blue-500/20 via-cyan-400/10 to-transparent border border-white/10 shadow-2xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1600&auto=format&fit=crop" alt="Modern ACP/WPC facade" className="w-full h-full object-cover mix-blend-overlay" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-slate-900/80 border border-white/10 rounded-xl p-4 text-white text-sm shadow-xl backdrop-blur">
              ACP • WPC • Weatherproof • Low maintenance
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
