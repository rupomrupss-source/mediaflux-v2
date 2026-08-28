import ytdl from '@distube/ytdl-core';

export default async function handler(req, res) {
  // CORS Security Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { url } = req.query;

  if (!url || !ytdl.validateURL(url)) {
    return res.status(400).json({ error: 'Please provide a valid YouTube URL' });
  }

  try {
    const info = await ytdl.getInfo(url);
    
    const responseData = {
      title: info.videoDetails.title,
      thumbnail: info.videoDetails.thumbnails[info.videoDetails.thumbnails.length - 1].url,
      duration: info.videoDetails.lengthSeconds,
      formats: info.formats
        .filter(f => f.hasVideo && f.hasAudio)
        .map(f => ({
          quality: f.qualityLabel,
          url: f.url
        })),
      audioOnly: info.formats
        .filter(f => !f.hasVideo && f.hasAudio)
        .map(f => ({
          bitrate: f.audioBitrate,
          url: f.url
        }))
    };

    return res.status(200).json(responseData);
  } catch (error) {
    return res.status(500).json({ error: 'Server error: Could not fetch video details' });
  }
}