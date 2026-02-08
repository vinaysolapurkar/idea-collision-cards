# 🎯 Idea Collision Cards

A brainstorming game that forces breakthrough thinking by combining random prompts from three decks.

**No AI required** — works completely offline with just the cards.  
**Optional AI mode** — connect DeepSeek API to generate ideas from your card combinations.

![Idea Collision Cards](preview.png)

## How It Works

Draw cards from three color-coded decks:

| Deck | Cards | Purpose |
|------|-------|---------|
| 🔥 **SPARK** (Orange) | 30 | Problems and challenges to solve |
| ⚡ **TWIST** (Blue) | 30 | Unexpected approaches that force new thinking |
| 🚀 **AMPLIFY** (Purple) | 20 | Questions to push your ideas further |

## How to Play

### Solo Brainstorming (5-10 min)
1. Draw 1 SPARK + 1 TWIST
2. Set a 5-minute timer
3. Write down every idea that combines them
4. (Optional) Draw AMPLIFY to push ideas further
5. Pick your best idea

### Team Sessions (15-30 min)
1. Each person draws SPARK + TWIST
2. 3 minutes silent brainstorming
3. Share ideas round-robin
4. Vote on best ideas
5. Use AMPLIFY cards to develop winners

### Rapid Fire (2 min per round)
1. Draw random SPARK + TWIST
2. Everyone shouts ideas
3. No judgment, just quantity
4. Repeat 5-10 rounds

## Offline Version (PDF)

Just want to print the cards? Download the PDF:

📥 **[idea-collision-cards.pdf](idea-collision-cards.pdf)** — Print on A4, cut along dotted lines, play anywhere!

No internet, no app, no setup. Just paper and ideas.

## Web App (Optional AI Features)

Want AI-generated ideas from your card combinations? Run the web app:

### Quick Start

```bash
# Clone the repo
git clone https://github.com/vinaysolapurkar/idea-collision-cards.git
cd idea-collision-cards

# Install dependencies (none required for basic features)
# Just run:
node server.js

# Open http://localhost:3000
```

### Enable AI Idea Generation

The web app can use DeepSeek API to generate creative ideas from your card combinations.

1. Get a DeepSeek API key from [platform.deepseek.com](https://platform.deepseek.com)
2. Set the environment variable:

```bash
# Linux/Mac
export DEEPSEEK_API_KEY=your-api-key-here
node server.js

# Windows
set DEEPSEEK_API_KEY=your-api-key-here
node server.js
```

3. Click "✨ Generate AI Ideas" after drawing cards

**Note:** AI features are optional. The card game works perfectly without any API key.

### Using Other AI Providers

You can modify `server.js` to use other OpenAI-compatible APIs:

- **OpenAI**: Change hostname to `api.openai.com`, model to `gpt-4` or `gpt-3.5-turbo`
- **Anthropic Claude**: Requires different API format
- **Local LLMs**: Point to your local Ollama/LMStudio endpoint

## Project Structure

```
idea-collision-cards/
├── server.js              # Node.js server (no dependencies)
├── public/
│   ├── index.html         # Web app interface
│   ├── images/            # Card artwork (80 images)
│   ├── manifest.json      # PWA manifest
│   └── sw.js              # Service worker for offline use
├── idea-collision-cards.pdf  # Print-ready cards
└── README.md
```

## Tips for Better Ideas

- **Quantity over quality** — bad ideas lead to good ones
- **Don't filter yourself** — write everything down
- **Combine weirdly** — the stranger the connection, the more original the idea
- **Use the timer** — pressure creates focus
- **Draw again** — stuck? New cards, new possibilities

## License

MIT — Use it, remix it, sell it, whatever.

---

Made with 💪 by [Vinay Solapurkar](https://twitter.com/solonone)
