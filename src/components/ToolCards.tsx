import { DownloadCloud, PlaySquare, Music, Instagram, Headphones, BarChart } from 'lucide-react';
import { cn } from '../lib/utils';

const tools = [
  {
    title: "Universal Video Downloader",
    description: "Download videos in up to 4K quality from major platforms with one click.",
    icon: DownloadCloud,
    tag: "Core Tool",
    tagColor: "text-red-500",
    color: "from-red-500/20 to-orange-500/20",
    text: "text-red-400",
  },
  {
    title: "YouTube Shorts Downloader",
    description: "Save YouTube Shorts instantly in their original vertical format.",
    icon: PlaySquare,
    tag: "Fast Link",
    tagColor: "text-blue-500",
    color: "from-blue-500/20 to-cyan-500/20",
    text: "text-blue-400",
  },
  {
    title: "YouTube to MP3 (320kbps)",
    description: "Extract the highest quality audio directly from any YouTube video.",
    icon: Music,
    tag: "Pro Only",
    tagColor: "text-purple-500",
    color: "from-purple-500/20 to-indigo-500/20",
    text: "text-purple-400",
  },
  {
    title: "Instagram Reels Downloader",
    description: "Keep your favorite Instagram Reels saved offline without watermarks.",
    icon: Instagram,
    tag: "Social",
    tagColor: "text-pink-500",
    color: "from-pink-500/20 to-rose-500/20",
    text: "text-pink-400",
  },
  {
    title: "Reels to MP3 Extractor",
    description: "Pull trending audio tracks directly from Instagram Reels in seconds.",
    icon: Headphones,
    tag: "Pro Only",
    tagColor: "text-emerald-500",
    color: "from-emerald-500/20 to-teal-500/20",
    text: "text-emerald-400",
  },
  {
    title: "Media Metadata Insights",
    description: "Analyze video tags, descriptions, and thumbnail data before downloading.",
    icon: BarChart,
    tag: "Analytics",
    tagColor: "text-orange-500",
    color: "from-orange-500/20 to-amber-500/20",
    text: "text-orange-400",
  }
];

export function ToolCards() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 w-full">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-tight">Complete Toolkit</h2>
        <p className="text-slate-400 text-sm">Everything you need to capture and convert online media.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {tools.map((tool, idx) => (
          <article 
            key={idx}
            className="tool-card glass p-6 rounded-2xl transition-all cursor-pointer flex flex-col justify-between group min-h-[200px]"
            onClick={() => console.log(`Clicked on tool: ${tool.title}`)}
          >
            <div>
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br transition-transform group-hover:scale-110",
                tool.color
              )}>
                <tool.icon className={cn("w-5 h-5", tool.text)} />
              </div>
              <h3 className="text-white font-bold text-lg mb-1 transition-colors">
                {tool.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                {tool.description}
              </p>
            </div>
            <div className={cn("text-[10px] font-bold uppercase tracking-widest", tool.tagColor)}>
              {tool.tag}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
