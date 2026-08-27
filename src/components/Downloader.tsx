import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Youtube, Instagram, Download, Loader2, CheckCircle, Link } from 'lucide-react';
import { cn } from '../lib/utils';

export function Downloader() {
  const [platform, setPlatform] = useState<'youtube' | 'instagram'>('youtube');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const isYouTube = platform === 'youtube';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    setLoading(true);
    setSuccess(false);
    
    // Simulated processing time (3 seconds)
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      
      setTimeout(() => setSuccess(false), 4000);
    }, 3000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-1 rounded-3xl mb-10 w-full"
      >
        <div className="glass-dark rounded-[calc(1.5rem-1px)] p-6 md:p-10 flex flex-col items-center">
          
          {/* Platform Toggle */}
          <div className="flex gap-2 mb-8 justify-center">
            <button
              type="button"
              onClick={() => setPlatform('youtube')}
              className={cn(
                "px-6 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all duration-300",
                isYouTube ? "bg-red-600 text-white glow-red" : "bg-white/5 text-slate-400 hover:bg-white/10"
              )}
            >
              <Youtube className="w-4 h-4" />
              YouTube
            </button>
            <button
              type="button"
              onClick={() => setPlatform('instagram')}
              className={cn(
                "px-6 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all duration-300",
                !isYouTube ? "bg-blue-600 text-white glow-blue" : "bg-white/5 text-slate-400 hover:bg-white/10"
              )}
            >
              <Instagram className="w-4 h-4" />
              Instagram
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full flex flex-col md:flex-row gap-4 relative">
            <div className="relative flex-1 group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Link className="h-5 w-5 text-slate-400 group-focus-within:text-white transition-colors" />
              </div>
              <input
                type="url"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={isYouTube ? "Paste YouTube video URL here..." : "Paste Instagram URL here..."}
                className={cn(
                  "w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-slate-400 focus:outline-none transition-all shadow-inner",
                  isYouTube ? "focus:border-red-500/50" : "focus:border-blue-500/50"
                )}
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading || !url}
              className={cn(
                "px-8 py-4 rounded-xl font-black text-sm tracking-wide text-white flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100",
                isYouTube 
                  ? "bg-gradient-to-r from-red-600 to-red-500" 
                  : "bg-gradient-to-r from-blue-600 to-blue-500"
              )}
            >
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-2"
                  >
                    <Loader2 className="w-4 h-4 animate-spin" />
                    PROCESSING...
                  </motion.div>
                ) : success ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    READY!
                  </motion.div>
                ) : (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    ANALYZE MEDIA
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </form>

        </div>
      </motion.div>
    </div>
  );
}
