import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Youtube, Instagram, Download, Loader2, CheckCircle, Link, AlertCircle, Play, Music } from 'lucide-react';
import { cn } from '../lib/utils';

// API থেকে আসা ডেটার ধরন
interface MediaData {
  title: string;
  thumbnail: string;
  duration: string;
  formats: { quality: string; url: string }[];
  audioOnly: { bitrate: number; url: string }[];
}

export function Downloader() {
  const [platform, setPlatform] = useState<'youtube' | 'instagram'>('youtube');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // নতুন স্টেট: ডেটা এবং এরর ধরে রাখার জন্য
  const [mediaData, setMediaData] = useState<MediaData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isYouTube = platform === 'youtube';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    setLoading(true);
    setSuccess(false);
    setError(null);
    setMediaData(null);
    
    try {
      if (platform === 'youtube') {
        // আমাদের আসল Vercel API কে কল করা হচ্ছে
        const response = await fetch(`/api/info?url=${encodeURIComponent(url)}`);
        const data = await response.json();

        if (!response.ok || data.error) {
          throw new Error(data.error || 'Failed to analyze video.');
        }

        setMediaData(data); // ডেটা সেভ করা
        setSuccess(true);   // সাকসেস দেখানো
        setTimeout(() => setSuccess(false), 4000);
      } else {
        throw new Error('Instagram downloader is coming soon!');
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please check the URL.');
    } finally {
      setLoading(false);
    }
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
              onClick={() => {
                setPlatform('youtube');
                setError(null);
                setMediaData(null);
              }}
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
              onClick={() => {
                setPlatform('instagram');
                setError(null);
                setMediaData(null);
              }}
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

          {/* Error Message Display */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs flex items-center gap-2.5 w-full"
            >
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Results Card Display */}
          {mediaData && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 p-6 rounded-2xl bg-white/[0.03] border border-white/10 w-full"
            >
              <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center pb-6 border-b border-white/5">
                <img
                  src={mediaData.thumbnail}
                  alt={mediaData.title}
                  className="w-full sm:w-44 h-28 object-cover rounded-xl border border-white/10 shadow-lg"
                />
                <div className="flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-green-400 bg-green-500/10 px-2.5 py-1 rounded-md">
                    Success
                  </span>
                  <h3 className="font-bold text-white text-lg mt-2 line-clamp-2">{mediaData.title}</h3>
                </div>
              </div>

              {/* Video Format Buttons */}
              <div className="mt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                  <Play className="w-3.5 h-3.5 text-blue-400" /> Download Links
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {mediaData.formats.map((fmt, i) => (
                    <a
                      key={i}
                      href={fmt.url}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 rounded-xl bg-white/5 hover:bg-red-600 hover:text-white border border-white/5 transition-all text-center group flex flex-col justify-center gap-1"
                    >
                      <span className="text-sm font-bold block">{fmt.quality}</span>
                      <span className="text-[10px] text-slate-400 group-hover:text-white/80">Click to Download</span>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </motion.div>
    </div>
  );
}