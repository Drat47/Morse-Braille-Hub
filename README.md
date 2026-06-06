# Multi-language Connector with Braille, Morse, TTS & Audio Beeps

This project is a multi-language accessibility converter that bridges English, Braille, and Morse code. It features visual dot grid representations for Braille learning, Text-to-Speech (TTS) capabilities, and audio beep synthesis for Morse code.

This repository supports both **a desktop version** (Python Tkinter) and a **web-based client version** (HTML/CSS/JS) designed for quick, serverless deployments on hosting platforms like Vercel and Render.

---

## 🌐 Web Application (Vercel & Render Ready)

The web version is a modern, responsive Single Page Application (SPA) utilizing native browser APIs (`Web Audio API` for Morse beeps, `Web Speech API` for TTS) and vector SVG renders for the Braille cells.

### Features
- **Responsive Layout:** Sleek dark/light theme options with a responsive glassmorphic aesthetic.
- **Real-time Translation:** Type in English, Braille, or Morse to see instant, bidirectional translation.
- **Web Audio API Morse Engine:** Synthesizes dots/dashes using customized sound wave oscillators with live pitch, volume, and Speed (WPM) settings.
- **Braille Cell Visualizer:** Renders dot configurations (1 to 6) in interactive grid cards along with character labels.

### Running Locally
To launch the web application locally, ensure you have [Node.js](https://nodejs.org) installed, then execute:

```bash
# Install dependencies (Vite developer environment)
npm install

# Run the local development server
npm run dev
```
Open the printed local URL (typically `http://localhost:5173`) in your web browser.

### Deploying to Vercel
Vercel automatically detects the Vite config and deploys static sites instantly.

1. **Deploy via Vercel CLI:**
   ```bash
   npm install -g vercel
   vercel
   ```
2. **Deploy via GitHub (Recommended):**
   - Push your code to a Git repository.
   - Go to [Vercel Dashboard](https://vercel.com) and click **Add New** > **Project**.
   - Import this repository.
   - Keep default build settings (`npm run build` and output directory `dist`).
   - Click **Deploy**.

### Deploying to Render
1. Go to [Render Dashboard](https://dashboard.render.com).
2. Click **New +** > **Static Site**.
3. Connect your Git repository.
4. Set the following options:
   - **Name:** `morse-braille-hub` (or any custom name)
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`
5. Click **Create Static Site**.

---

## 🐍 Desktop Application (Python Tkinter)

The original Python desktop application runs locally and utilizes native system audio resources.

### Installation & Run

1. Install required Python packages:
   ```bash
   pip install pyttsx3 simpleaudio numpy
   ```
   *Note: On Windows, make sure you have the Microsoft Visual C++ Build Tools installed to compile `simpleaudio`.*

2. Run the main script:
   ```bash
   python multi_lang_converter_morse_sound.py
   ```

### Features
- Tkinter GUI with dual English and Braille/Morse text editors.
- Local speech output utilizing `pyttsx3`.
- Background threading for audio playback to prevent UI locks.
