const products = [
  {
    id: "acp",
    title: "ACP Sheets",
    description:
      "Aluminium Composite Panels for sleek, durable facades and signage.",
    features: ["UV resistant", "Lightweight", "Multiple finishes"],
    image:
      "https://images.unsplash.com/photo-1527195575508-5b9c2b27d017?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "wpc",
    title: "WPC Cladding",
    description:
      "Wood Polymer Composite cladding combining natural look with high performance.",
    features: ["Termite-proof", "Low maintenance", "Natural textures"],
    image:
      "https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "louvres",
    title: "Aluminium Louvres",
    description:
      "Architectural louvres for shading, ventilation and modern facades.",
    features: ["Weather-resistant", "Custom profiles", "Powder-coated finishes"],
    image:
      "https://images.unsplash.com/photo-1541542684-4a88a04a67ee?q=80&w=1600&auto=format&fit=crop",
  }
];

export default function Products() {
  return (
    <section id="products" className="py-20 bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Exterior Products</h2>
          <p className="mt-3 text-blue-100/80">ACP Sheets • WPC Cladding • Aluminium Louvres</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div key={p.id} className="group rounded-2xl overflow-hidden border border-white/10 bg-slate-800/50 hover:bg-slate-800 transition shadow">
              <div className="h-48 overflow-hidden">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold text-white">{p.title}</h3>
                <p className="mt-2 text-sm text-blue-100/80">{p.description}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {p.features.map((f) => (
                    <li key={f} className="text-xs px-2 py-1 rounded bg-white/10 text-blue-100/90 border border-white/10">
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
