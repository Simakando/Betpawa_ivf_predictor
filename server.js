const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const BETPAWA_BASE = 'https://www.betpawa.co.zm';

app.use(cors());
app.use(express.json());

// Proxy all /api/* requests to BetPawa
app.use('/api', async (req, res) => {
  try {
    const targetUrl = `${BETPAWA_BASE}/api${req.path}`;
    const params = req.query;

    console.log(`Proxying: ${targetUrl}`);

    const response = await axios({
      method: req.method,
      url: targetUrl,
      params: params,
      headers: {
        'X-Pawa-Brand': 'betpawa-zambia',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://www.betpawa.co.zm/',
        'Origin': 'https://www.betpawa.co.zm'
      },
      data: req.method !== 'GET' ? req.body : undefined,
      timeout: 10000
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Proxy error:', error.message);
    res.status(error.response?.status || 500).json({
      error: 'Proxy request failed',
      message: error.message
    });
  }
});

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'BetPawa Proxy is running ✅' });
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
