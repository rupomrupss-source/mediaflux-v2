import { useState } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-red-500 to-purple-600 flex items-center justify-center transition-transform group-hover:scale-105">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-black text-xl text-white tracking-tighter uppercase">MediaFlux</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center text-sm font-medium text-slate-400">
            <a href="#" onClick={() => console.log('Navigated to Tools')} className="text-white hover:text-red-400 transition-colors">Tools</a>
            <a href="#" onClick={() => console.log('Navigated to Pricing')} className="hover:text-red-400 transition-colors">Pricing</a>
            <a href="#" onClick={() => console.log('Navigated to Dashboard')} className="hover:text-red-400 transition-colors">Dashboard</a>
          </nav>

          {/* Get Pro Button & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => console.log('Get Pro Clicked')}
              className="hidden md:flex items-center justify-center bg-white text-slate-950 px-5 py-2 rounded-full font-bold text-xs hover:bg-red-500 hover:text-white transition-colors"
            >
              GET PRO
            </button>
            <button 
              className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-900 border-b border-white/10"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              <a href="#" onClick={() => console.log('Mobile Nav: Tools')} className="block px-3 py-3 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-white/5">Tools</a>
              <a href="#" onClick={() => console.log('Mobile Nav: Pricing')} className="block px-3 py-3 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-white/5">Pricing</a>
              <a href="#" onClick={() => console.log('Mobile Nav: Dashboard')} className="block px-3 py-3 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-white/5">Dashboard</a>
              <button 
                onClick={() => console.log('Get Pro Clicked (Mobile)')}
                className="w-full mt-4 flex items-center justify-center bg-white text-slate-950 px-5 py-3 rounded-xl font-bold text-sm hover:bg-red-500 hover:text-white transition-colors"
              >
                GET PRO
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
