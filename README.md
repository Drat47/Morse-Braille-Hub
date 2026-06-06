# 🌐 Morse & Braille Hub

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://multi-lang-connector-morse-sound.vercel.app/)
[![Render Deployment](https://img.shields.io/badge/Render-Deployed-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://morse-braille-hub.onrender.com)
[![Built with HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Glossary/HTML5)
[![Built with CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Vite Project](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

An interactive, high-fidelity accessibility suite designed for translation, audio synthesis, and visual learning of **Braille and Morse code**. Running completely on the client-side with Zero-Backend dependency, it leverages modern Web APIs to provide instant conversions, responsive visualizations, and hardware-accelerated sound wave synthesis.

---

## 🔗 Live Deployments

Explore the application live on your browser or mobile device:
- **Primary Deployment (Vercel):** [multi-lang-connector-morse-sound.vercel.app](https://multi-lang-connector-morse-sound.vercel.app/)
- **Alternative Mirror (Render):** [morse-braille-hub.onrender.com](https://morse-braille-hub.onrender.com)

---

## 🚀 Key Features

### 1. Multi-Directional Translation Engine
- **English ↔ Braille:** Converts standard alphabets, numbers, and punctuation marks to Unicode Braille cells and back.
- **English ↔ Morse:** Real-time translation to international Morse code standard separators (letters separated by spaces, words separated by `/`).
- **Real-Time Hook:** Translate text instantaneously as you type, or toggle manual mode with dedicated triggers.

### 2. Audio Synthesis Engines
- **Web Audio API Morse Synthesizer:** Direct oscillator sound wave generation. Adjust volume, tone frequency (Hz), and speed (WPM) dynamically using sliders. Offers precise scheduled playback with instant stop features.
- **Web Speech API Speech Engine (TTS):** Integrated browser Text-to-Speech tool that supports localized voices, customizable speed rates, and pitch shifts.

### 3. Braille Cell Dot Grid Visualizer
- Dynamic **vector SVG rendering cards** representing the 6-dot Braille standard.
- Highlights active pin positions with soft neon cyan shadows.
- Displays corresponding English character tags underneath each cell card to enhance learning.

---

## 🛠️ Technical Stack & Architecture

- **Build System:** [Vite](https://vitejs.dev/) (fast modular bundler and hot-module development server).
- **Core Technologies:** HTML5 (semantic layout), Vanilla CSS3 (custom responsive variables, glassmorphism filters, radial neon gradient backdrop), and Vanilla JavaScript (ES6+ modules).
- **Audio Interfaces:** Web Audio API (`AudioContext`, `OscillatorNode`, `GainNode` scheduling) and Web Speech API (`SpeechSynthesisUtterance`).
- **Performance Model:** 100% client-side execution. Pages load instantly, scale efficiently, and host serverless on edge content delivery networks (CDNs).

---

## 💻 Local Development

Run the web version locally to customize or test changes:

### Prerequisites
Ensure you have [Node.js](https://nodejs.org) (v18 or higher recommended) installed.

### Installation
```bash
# Clone the repository
git clone https://github.com/Drat47/Multi_lang_Connector_Morse_sound.git
cd Multi_lang_Connector_Morse_sound

# Install dependencies (Vite)
npm install
```

### Script Tasks
- **Start Development Server:**
  ```bash
  npm run dev
  ```
  *Launches the site at `http://localhost:5173` with hot-module reloading.*

- **Compile Production Bundle:**
  ```bash
  npm run build
  ```
  *Generates optimized assets ready for static hosting in the `/dist` directory.*

- **Preview Production Build:**
  ```bash
  npm run preview
  ```
  *Spins up a local server to test the compiled code at `http://localhost:4173`.*

---

## 🐍 Desktop Version (Legacy Python Script)

The repository retains the original desktop implementation for standalone local use.

### Installation
1. Install Python packages:
   ```bash
   pip install pyttsx3 simpleaudio numpy
   ```
   *Note: Windows systems require Microsoft Visual C++ Build Tools installed to compile `simpleaudio`.*

2. Start the desktop GUI:
   ```bash
   python multi_lang_converter_morse_sound.py
   ```

### Python Stack Features
- Standalone Tkinter window interface.
- Local audio playback using native Windows DLL `winsound` or cross-platform `simpleaudio`.
- Background threading for speech to prevent main thread blocking.

---

## 🛡️ License

This project is open-source and available under the **MIT License**.
