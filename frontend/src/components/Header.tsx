import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <Link to="/" className="inline-block">
          <h1 className="text-xl font-semibold tracking-tight text-slate-900 hover:text-blue-600 transition-colors">
            Products CRUD - Prueba Técnica Frontend
          </h1>
        </Link>
      </div>
    </header>
  );
}
