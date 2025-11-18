import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Products from "./components/Products";
import About from "./components/About";
import Contact from "./components/Contact";
import { Link } from 'react-router-dom'

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <Navbar />
      <main>
        <Hero />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-end">
            <Link to="/admin/login" className="text-xs text-blue-300/70 hover:text-white underline">Admin</Link>
          </div>
        </div>
        <Products />
        <About />
        <Contact />
        <footer className="border-t border-white/10 py-10 bg-slate-900/95">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-blue-100/70">© {new Date().getFullYear()} Mala Ceramic. All rights reserved.</p>
            <div className="text-blue-100/70 text-sm">ACP • WPC • Aluminium Louvres</div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
