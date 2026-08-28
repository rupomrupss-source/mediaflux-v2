export default async function handler(req, res) {
  // CORS Security Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Please provide a valid YouTube URL' });
  }

  try {
    // Cobalt API-কে রিকোয়েস্ট পাঠানো
    const cobaltResponse = await fetch('https://api.cobalt.tools/api/json', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: url
      })
    });

    const data = await cobaltResponse.json();

    // Cobalt থেকে এরর আসলে
    if (data.status === 'error') {
      return res.status(500).json({ error: data.text || 'Error fetching from Cobalt API' });
    }

    // আপনার 3D ফ্রন্টএন্ড ডিজাইনের জন্য ডেটা সাজানো
    const responseData = {
      title: "Media Ready to Download", 
      thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=640&auto=format&fit=crop", // ডিফল্ট থাম্বনেইল
      duration: "Auto",
      formats: [],
      audioOnly: []
    };

    // Cobalt সরাসরি ডাউনলোডের লিংক দিলে
    if (data.url) {
      responseData.formats.push({
        quality: 'Max Quality (Direct)',
        url: data.url
      });
    }

    return res.status(200).json(responseData);

  } catch (error) {
    return res.status(500).json({ error: 'Server error: Cobalt API connection failed.' });
  }
}