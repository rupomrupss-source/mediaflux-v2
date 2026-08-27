export function Footer() {
  return (
    <footer className="w-full border-t border-white/5 bg-slate-950/50 py-12 px-4 sm:px-6 lg:px-8 z-10 relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-tr from-red-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-white">M</div>
          <span className="font-black text-xl text-white tracking-tighter uppercase">MediaFlux</span>
        </div>
        
        <nav className="flex items-center gap-6 text-[10px] text-slate-400 font-medium tracking-widest uppercase">
          <a href="#" className="hover:text-white transition-colors">API Docs</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors underline decoration-red-500">Support</a>
        </nav>
        
        <div className="text-[10px] text-slate-500 uppercase tracking-widest">
          &copy; {new Date().getFullYear()} MediaFlux Labs
        </div>
      </div>
    </footer>
  );
}
