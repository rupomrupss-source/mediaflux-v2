import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';

const faqs = [
  {
    question: "Is MediaFlux free to use?",
    answer: "Yes, our basic downloader tools are completely free to use for personal downloads. We also offer a Pro tier for batch processing and faster speeds."
  },
  {
    question: "Can I download 4K videos from YouTube?",
    answer: "Absolutely. Our Universal Video Downloader supports extracting videos in 720p, 1080p, and up to 4K resolution when available from the source."
  },
  {
    question: "Does MediaFlux support Instagram Reels?",
    answer: "Yes! Switch the toggle to Instagram mode and paste your Reel URL to download high-quality videos instantly."
  },
  {
    question: "Are there limits on how many MP3s I can convert?",
    answer: "Free users can extract up to 10 MP3s per day at 320kbps. Pro users have unlimited conversion limits and bulk download features."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="w-full max-w-3xl mx-auto py-24 px-4 sm:px-6">
      <div className="text-center mb-16">
        <h2 className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 mb-3">Common Questions</h2>
        <p className="text-slate-400 text-sm">Everything you need to know about using MediaFlux.</p>
      </div>

      <div className="space-y-2">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div 
              key={idx}
              className="glass rounded-lg overflow-hidden transition-colors hover:bg-white/10"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full px-4 py-4 flex items-center justify-between text-left focus:outline-none group"
              >
                <h3 className="text-sm font-bold text-slate-200 group-hover:text-white">{faq.question}</h3>
                <ChevronDown className={cn("w-5 h-5 text-slate-400 transition-transform duration-300", isOpen && "rotate-180")} />
              </button>
              
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-4 pb-4 pt-0 text-slate-400 text-xs">
                      <p>{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
