export function Hero() {
  return (
    <section className="relative pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
      {/* Background Glows (Removed as we rely on grad-bg in main) */}
      
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-slate-300 font-bold text-xs uppercase tracking-widest mb-8">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </span>
        MediaFlux v2.0 is live
      </div>

      <h1 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tight mb-6 uppercase">
        Unlimited <br className="hidden md:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-500">
          Media Freedom.
        </span>
      </h1>
      
      <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto font-medium">
        The most advanced 4K video toolkit for creators. Fast, secure, and SEO-optimized downloading at your fingertips.
      </p>
    </section>
  );
}

