// Vercel serverless function to proxy HAF API requests
export default async function handler(req, res) {
  // Enable CORS for your frontend
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { username } = req.query;
  
  if (!username) {
    res.status(400).json({ error: 'Username is required' });
    return;
  }

  try {
    const response = await fetch(`https://techcoderx.com/haf/account/${username}`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('HAF API Error:', error);
    res.status(500).json({ error: 'Failed to fetch account data' });
  }
}
