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

  try {
    // Cobalt-এর মতো আনলিমিটেড এবং ফ্রি Open API কল করা হচ্ছে
    const apiUrl = `https://api.nyxs.pw/dl/yt-direct?url=${encodeURIComponent(url)}`;
    
    const response = await fetch(apiUrl);
    const data = await response.json();

    // API থেকে ডেটা না পেলে
    if (!data || !data.result) {
      return res.status(500).json({ error: 'Could not extract video data. Video might be private.' });
    }

    // আপনার 3D ডিজাইনের জন্য আসল ডেটাগুলো সুন্দর করে সাজানো
    const responseData = {
      title: data.result.title || "MediaFlux Ready to Download",
      thumbnail: data.result.thumbnail || "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=640&auto=format&fit=crop",
      duration: data.result.duration || "Auto",
      formats: [
        { quality: "Download MP4 Video", url: data.result.urlVideo }
      ],
      audioOnly: [
        { bitrate: 320, url: data.result.urlAudio }
      ]
    };

    return res.status(200).json(responseData);

  } catch (error) {
    return res.status(500).json({ error: 'Server error: Unlimited API connection failed.' });
  }
}