import { Menu } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Products", href: "#products" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 bg-slate-900/80 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <a href="#home" className="inline-flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-white">Mala Ceramic</span>
            <span className="text-xs text-blue-300/80 hidden sm:block">Exterior ACP & WPC Solutions</span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="text-sm text-blue-100/80 hover:text-white transition-colors">
                {item.label}
              </a>
            ))}
            <a href="#contact" className="inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white shadow transition-colors">
              Get Quote
            </a>
          </nav>

          <button onClick={() => setOpen((v) => !v)} className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-white/10 text-blue-100/90 hover:text-white hover:bg-white/5 transition">
            <Menu size={20} />
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="grid gap-2">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="px-3 py-2 rounded-lg text-blue-100/90 hover:text-white hover:bg-white/5 transition">
                  {item.label}
                </a>
              ))}
              <a href="#contact" onClick={() => setOpen(false)} className="px-3 py-2 rounded-lg bg-blue-500 text-white text-center hover:bg-blue-600 transition">
                Get Quote
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
