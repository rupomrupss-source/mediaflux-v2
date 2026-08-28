export default async function handler(req, res) {
  // CORS Security Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // ইউজার ওয়েবসাইট থেকে যে লিংকটা দেবে সেটা রিসিভ করা
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Please provide a valid YouTube URL' });
  }

  // RapidAPI-এর জন্য লিংকের ফরম্যাট ঠিক করা
  const encodedUrl = encodeURIComponent(url);
  const apiUrl = `https://youtube-downloader6.p.rapidapi.com/video_info.php?url=${encodedUrl}`;
  
  // আপনার RapidAPI-এর সিক্রেট চাবি
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '53cf3f8608mshe47ba06f0f0ed86p1008b3jsn4505ab220ada',
      'x-rapidapi-host': 'youtube-downloader6.p.rapidapi.com',
      'Content-Type': 'application/json'
    }
  };

  try {
    // RapidAPI-এর সার্ভার থেকে ভিডিওর ডেটা আনা
    const apiResponse = await fetch(apiUrl, options);
    const rawData = await apiResponse.json();

    // যদি API থেকে এরর আসে
    if (rawData.error || !rawData.title) {
        return res.status(500).json({ error: 'Could not fetch video details from server.' });
    }

    // আপনার 3D ওয়েবসাইটের ডিজাইনের জন্য ডেটাগুলো সুন্দর করে সাজানো
    const responseData = {
      title: rawData.title,
      thumbnail: rawData.thumbnail || rawData.thumbnails?.[0]?.url || 'https://via.placeholder.com/640x360?text=No+Thumbnail',
      duration: rawData.lengthSeconds || rawData.duration || 'Unknown',
      
      // ভিডিও+অডিও ফরম্যাটগুলো আলাদা করা
      formats: Array.isArray(rawData.formats) ? rawData.formats
        .filter(f => f.hasVideo && f.hasAudio)
        .map(f => ({
          quality: f.qualityLabel,
          url: f.url
        })) : [],
        
      // শুধু MP3 অডিওগুলো আলাদা করা
      audioOnly: Array.isArray(rawData.formats) ? rawData.formats
        .filter(f => !f.hasVideo && f.hasAudio)
        .map(f => ({
          bitrate: f.audioBitrate,
          url: f.url
        })) : []
    };

    return res.status(200).json(responseData);

  } catch (error) {
    return res.status(500).json({ error: 'Server error: RapidAPI connection failed.' });
  }
}