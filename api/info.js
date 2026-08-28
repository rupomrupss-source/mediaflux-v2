export default async function handler(req, res) {
  // CORS Security Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Please provide a valid YouTube URL' });
  }

  // আসল ডাউনলোডের মতো ২ সেকেন্ডের ফেক লোডিং টাইম
  await new Promise(resolve => setTimeout(resolve, 2000));

  // আপনার ফ্রন্টএন্ডকে খুশি করার জন্য ডেমো সাকসেস ডেটা
  return res.status(200).json({
    title: "MediaFlux Pro Video - Success!",
    thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=640&auto=format&fit=crop",
    duration: "04:20",
    formats: [
      { quality: "1080p (Premium HD)", url: "#" },
      { quality: "720p (Standard)", url: "#" }
    ],
    audioOnly: [
      { bitrate: 320, url: "#" },
      { bitrate: 128, url: "#" }
    ]
  });
}