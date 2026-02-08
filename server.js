const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || '';

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf'
};

async function generateIdeas(spark, twist, amplify) {
  if (!DEEPSEEK_API_KEY) {
    throw new Error('DEEPSEEK_API_KEY not configured. Set it in your environment variables.');
  }

  const prompt = `You are a creative business idea generator. Given these brainstorming prompts, generate 3 specific, actionable business or product ideas.

PROBLEM (SPARK): "${spark}"
APPROACH (TWIST): "${twist}"
${amplify ? `AMPLIFY: "${amplify}"` : ''}

Generate exactly 3 creative ideas that combine these prompts. Each idea should be:
- Specific and actionable
- 1-2 sentences max
- Practical to implement

Format as JSON array: ["idea 1", "idea 2", "idea 3"]
Only output the JSON array, nothing else.`;

  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      model: 'deepseek-chat',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.8,
      max_tokens: 500
    });

    const options = {
      hostname: 'api.deepseek.com',
      port: 443,
      path: '/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          if (json.error) {
            reject(new Error(json.error.message || 'API error'));
            return;
          }
          const content = json.choices?.[0]?.message?.content || '[]';
          const match = content.match(/\[[\s\S]*\]/);
          if (match) {
            resolve(JSON.parse(match[0]));
          } else {
            resolve([content]);
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // API endpoint for idea generation
  if (req.method === 'POST' && req.url === '/api/generate') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const { spark, twist, amplify } = JSON.parse(body);
        const ideas = await generateIdeas(spark, twist, amplify);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ideas }));
      } catch (e) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: e.message }));
      }
    });
    return;
  }

  // Serve static files
  let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
  const ext = path.extname(filePath);
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404);
        res.end('Not found');
      } else {
        res.writeHead(500);
        res.end('Server error');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`\n🎯 Idea Collision Cards running on http://localhost:${PORT}`);
  console.log(`\n📋 AI Features: ${DEEPSEEK_API_KEY ? 'Enabled ✅' : 'Disabled (set DEEPSEEK_API_KEY to enable)'}\n`);
});
