// ---------------------------
// Braille Mapping
// ---------------------------
const LETTER_TO_BRAILLE = {
  'a': '⠁', 'b': '⠃', 'c': '⠉', 'd': '⠙', 'e': '⠑',
  'f': '⠋', 'g': '⠛', 'h': '⠓', 'i': '⠊', 'j': '⠚',
  'k': '⠅', 'l': '⠇', 'm': '⠍', 'n': '⠝', 'o': '⠕',
  'p': '⠏', 'q': '⠟', 'r': '⠗', 's': '⠎', 't': '⠞',
  'u': '⠥', 'v': '⠧', 'w': '⠺', 'x': '⠭', 'y': '⠽', 'z': '⠵'
};
const NUMBER_SIGN = '⠼';
const DIGIT_TO_BRAILLE = {
  '1': '⠁', '2': '⠃', '3': '⠉', '4': '⠙', '5': '⠑',
  '6': '⠋', '7': '⠛', '8': '⠓', '9': '⠊', '0': '⠚'
};
const PUNCT_TO_BRAILLE = {
  '.': '⠲', ',': '⠂', '?': '⠦', '!': '⠖', ';': '⠆', ':': '⠒', "'": '⠄', '"': '⠶', '-': '⠤'
};

const BRAILLE_TO_LETTER = {};
const BRAILLE_TO_DIGIT = {};
const BRAILLE_TO_PUNCT = {};

for (let [k, v] of Object.entries(LETTER_TO_BRAILLE)) BRAILLE_TO_LETTER[v] = k;
for (let [k, v] of Object.entries(DIGIT_TO_BRAILLE)) BRAILLE_TO_DIGIT[v] = k;
for (let [k, v] of Object.entries(PUNCT_TO_BRAILLE)) BRAILLE_TO_PUNCT[v] = k;

// ---------------------------
// Morse Mapping
// ---------------------------
const MORSE_CODE_DICT = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
  '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
  '8': '---..', '9': '----.', '.': '.-.-.-', ',': '--..--', '?': '..--..',
  '!': '-.-.--', '-': '-....-', '/': '-..-.', '@': '.--.-.', '(': '-.--.',
  ')': '-.--.-'
};
const MORSE_TO_LETTER = {};
for (let [k, v] of Object.entries(MORSE_CODE_DICT)) MORSE_TO_LETTER[v] = k;

// ---------------------------
// Translation Functions
// ---------------------------
function englishToBraille(text) {
  let out = [];
  let i = 0;
  while (i < text.length) {
    let ch = text[i];
    if (/[a-zA-Z]/.test(ch)) {
      out.push(LETTER_TO_BRAILLE[ch.toLowerCase()] || '?');
      i++;
    } else if (/[0-9]/.test(ch)) {
      out.push(NUMBER_SIGN);
      while (i < text.length && /[0-9]/.test(text[i])) {
        out.push(DIGIT_TO_BRAILLE[text[i]] || '?');
        i++;
      }
    } else if (ch === ' ' || ch === '\n') {
      out.push(ch);
      i++;
    } else {
      out.push(PUNCT_TO_BRAILLE[ch] || '?');
      i++;
    }
  }
  return out.join('');
}

function brailleToEnglish(text) {
  let out = [];
  let inNumber = false;
  for (let i = 0; i < text.length; i++) {
    let c = text[i];
    if (c === ' ') {
      out.push(' ');
      inNumber = false;
    } else if (c === '\n') {
      out.push('\n');
      inNumber = false;
    } else if (c === NUMBER_SIGN) {
      inNumber = true;
    } else if (inNumber) {
      out.push(BRAILLE_TO_DIGIT[c] || '?');
    } else if (c in BRAILLE_TO_LETTER) {
      out.push(BRAILLE_TO_LETTER[c]);
    } else if (c in BRAILLE_TO_PUNCT) {
      out.push(BRAILLE_TO_PUNCT[c]);
    } else {
      out.push('?');
    }
  }
  return out.join('');
}

function englishToMorse(text) {
  return text.split('').map(ch => {
    if (ch === ' ') return '/';
    if (ch === '\n') return '\n/';
    return MORSE_CODE_DICT[ch.toUpperCase()] || '?';
  }).join(' ');
}

function morseToEnglish(text) {
  const lines = text.split('\n');
  let decodedLines = [];
  
  for (let line of lines) {
    const words = line.split('/');
    let decodedWords = [];
    for (let w of words) {
      const letters = w.trim().split(/\s+/);
      const wordDecoded = letters.map(l => {
        if (l === '') return '';
        return MORSE_TO_LETTER[l] || '?';
      }).join('');
      if (wordDecoded) decodedWords.push(wordDecoded);
    }
    decodedLines.push(decodedWords.join(' '));
  }
  return decodedLines.join('\n');
}

// ---------------------------
// Braille Visualizer
// ---------------------------
function brailleUnicodeToDots(ch) {
  const code = ch.charCodeAt(0) - 0x2800;
  if (code < 0 || code > 255) return [0, 0, 0, 0, 0, 0];
  return Array.from({ length: 6 }, (_, i) => (code >> i) & 1);
}

function renderBrailleVisualization(brailleText) {
  const container = document.getElementById('braille-visualizer-container');
  container.innerHTML = '';
  
  if (!brailleText || brailleText.trim() === '') {
    container.innerHTML = '<div class="empty-state">Translate to Braille to view dot cell structures...</div>';
    return;
  }
  
  let inNumber = false;
  
  for (let i = 0; i < brailleText.length; i++) {
    const ch = brailleText[i];
    
    // Spacing handler
    if (ch === ' ' || ch === '\n') {
      const spaceDiv = document.createElement('div');
      spaceDiv.className = 'braille-card space-card';
      spaceDiv.innerHTML = `
        <div class="braille-card-char">&nbsp;</div>
        <div class="braille-svg-container"></div>
        <div class="braille-card-label">${ch === '\n' ? '↵' : 'Space'}</div>
      `;
      container.appendChild(spaceDiv);
      inNumber = false;
      continue;
    }
    
    let label = '?';
    if (ch === NUMBER_SIGN) {
      label = 'Num';
      inNumber = true;
    } else if (inNumber) {
      label = BRAILLE_TO_DIGIT[ch] || '?';
    } else {
      label = BRAILLE_TO_LETTER[ch] || BRAILLE_TO_PUNCT[ch] || '?';
    }
    
    const dots = brailleUnicodeToDots(ch);
    const card = document.createElement('div');
    card.className = 'braille-card';
    
    card.innerHTML = `
      <div class="braille-card-char">${ch}</div>
      <svg class="braille-svg-container" viewBox="0 0 44 64">
        <!-- Row 1 -->
        <circle cx="12" cy="12" r="5" class="braille-dot ${dots[0] ? 'active' : ''}" />
        <circle cx="32" cy="12" r="5" class="braille-dot ${dots[3] ? 'active' : ''}" />
        <!-- Row 2 -->
        <circle cx="12" cy="32" r="5" class="braille-dot ${dots[1] ? 'active' : ''}" />
        <circle cx="32" cy="32" r="5" class="braille-dot ${dots[4] ? 'active' : ''}" />
        <!-- Row 3 -->
        <circle cx="12" cy="52" r="5" class="braille-dot ${dots[2] ? 'active' : ''}" />
        <circle cx="32" cy="52" r="5" class="braille-dot ${dots[5] ? 'active' : ''}" />
      </svg>
      <div class="braille-card-label">${label.toUpperCase()}</div>
    `;
    container.appendChild(card);
  }
}

// ---------------------------
// Audio Engines (Web Speech & Web Audio APIs)
// ---------------------------
let audioCtx = null;
let oscillatorNode = null;
let gainNode = null;
let isPlayingMorse = false;
let morseTimeoutIds = [];

// Speech synthesis initialization
let voices = [];
function populateVoices() {
  if (typeof speechSynthesis === 'undefined') return;
  voices = speechSynthesis.getVoices();
  const voiceSelect = document.getElementById('voice-select');
  if (!voiceSelect) return;
  
  const currentVal = voiceSelect.value;
  voiceSelect.innerHTML = '';
  
  voices.forEach((voice, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = `${voice.name} (${voice.lang}) ${voice.default ? ' [Default]' : ''}`;
    voiceSelect.appendChild(option);
  });
  
  if (currentVal && voices[currentVal]) {
    voiceSelect.value = currentVal;
  }
}

if (typeof speechSynthesis !== 'undefined') {
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoices;
  }
  populateVoices();
}

function speakText(text) {
  if (!text || typeof speechSynthesis === 'undefined') return;
  
  stopAllAudio();
  
  const utterance = new SpeechSynthesisUtterance(text);
  const voiceSelect = document.getElementById('voice-select');
  
  if (voiceSelect && voiceSelect.value !== '') {
    utterance.voice = voices[parseInt(voiceSelect.value)];
  }
  
  const rateInput = document.getElementById('tts-rate');
  const pitchInput = document.getElementById('tts-pitch');
  
  utterance.rate = rateInput ? parseFloat(rateInput.value) : 1.0;
  utterance.pitch = pitchInput ? parseFloat(pitchInput.value) : 1.0;
  
  const speakInputBtn = document.getElementById('speak-input-btn');
  const stopBtn = document.getElementById('stop-audio-btn');
  
  speakInputBtn.classList.add('btn-primary');
  speakInputBtn.classList.remove('btn-secondary');
  if (stopBtn) stopBtn.removeAttribute('disabled');
  
  utterance.onend = () => {
    speakInputBtn.classList.add('btn-secondary');
    speakInputBtn.classList.remove('btn-primary');
    if (stopBtn) stopBtn.setAttribute('disabled', 'true');
  };
  
  utterance.onerror = () => {
    speakInputBtn.classList.add('btn-secondary');
    speakInputBtn.classList.remove('btn-primary');
    if (stopBtn) stopBtn.setAttribute('disabled', 'true');
  };
  
  speechSynthesis.speak(utterance);
}

// Morse code synthesizer using Web Audio API scheduling
function playMorseAudio(morseString) {
  if (!morseString) return;
  stopAllAudio();
  
  const playBtn = document.getElementById('speak-output-btn');
  const stopBtn = document.getElementById('stop-audio-btn');
  
  // Initialize Web Audio context
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) {
    alert("Web Audio API is not supported in this browser.");
    return;
  }
  audioCtx = new AudioContext();
  
  // Controls settings
  const freq = parseInt(document.getElementById('morse-freq').value) || 700;
  const wpm = parseInt(document.getElementById('morse-wpm').value) || 15;
  const volPercent = parseInt(document.getElementById('morse-volume').value) || 80;
  const volume = volPercent / 100;
  
  // Morse timing units (standard standard)
  const dotDuration = 1.2 / wpm; // Time of 1 dot unit in seconds
  const dashDuration = dotDuration * 3;
  const symbolGap = dotDuration;
  const letterGap = dotDuration * 3;
  const wordGap = dotDuration * 7;
  
  oscillatorNode = audioCtx.createOscillator();
  gainNode = audioCtx.createGain();
  
  oscillatorNode.type = 'sine';
  oscillatorNode.frequency.setValueAtTime(freq, audioCtx.currentTime);
  
  gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
  
  oscillatorNode.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  
  isPlayingMorse = true;
  playBtn.classList.add('btn-primary');
  playBtn.classList.remove('btn-secondary');
  stopBtn.removeAttribute('disabled');
  
  oscillatorNode.start(audioCtx.currentTime);
  
  let time = audioCtx.currentTime + 0.05; // start small offset in the future
  
  const words = morseString.split('/');
  for (let wi = 0; wi < words.length; wi++) {
    const word = words[wi].trim();
    if (word === '') continue;
    
    // Add word gap if not first word
    if (wi > 0) {
      time += (wordGap - letterGap); // adjust because we already add letter gap at end of word
    }
    
    const letters = word.split(' ');
    for (let li = 0; li < letters.length; li++) {
      const letter = letters[li];
      if (letter === '') continue;
      
      // Add letter gap if not first letter of word
      if (li > 0) {
        time += (letterGap - symbolGap); // adjust because we already add symbol gap at end of character
      }
      
      for (let si = 0; si < letter.length; si++) {
        const symbol = letter[si];
        
        // Add symbol gap if not first symbol of letter
        if (si > 0) {
          time += symbolGap;
        }
        
        if (symbol === '.') {
          gainNode.gain.setValueAtTime(volume, time);
          time += dotDuration;
          gainNode.gain.setValueAtTime(0, time);
        } else if (symbol === '-') {
          gainNode.gain.setValueAtTime(volume, time);
          time += dashDuration;
          gainNode.gain.setValueAtTime(0, time);
        }
      }
      // Add final symbol gap spacer
      time += symbolGap;
    }
  }
  
  // Stop oscillator after total schedule time is complete
  oscillatorNode.stop(time);
  
  // Listen for finished playback
  oscillatorNode.onended = () => {
    if (isPlayingMorse) {
      resetAudioUI();
    }
  };
}

function stopAllAudio() {
  // Stop TTS
  if (typeof speechSynthesis !== 'undefined' && speechSynthesis.speaking) {
    speechSynthesis.cancel();
  }
  
  // Stop Morse Web Audio
  if (audioCtx) {
    try {
      if (oscillatorNode) {
        oscillatorNode.disconnect();
      }
      if (gainNode) {
        gainNode.disconnect();
      }
      if (audioCtx.state !== 'closed') {
        audioCtx.close();
      }
    } catch (e) {
      console.error(e);
    }
    audioCtx = null;
    oscillatorNode = null;
    gainNode = null;
  }
  
  isPlayingMorse = false;
  resetAudioUI();
}

function resetAudioUI() {
  const speakInputBtn = document.getElementById('speak-input-btn');
  const playBtn = document.getElementById('speak-output-btn');
  const stopBtn = document.getElementById('stop-audio-btn');
  
  if (speakInputBtn) {
    speakInputBtn.classList.add('btn-secondary');
    speakInputBtn.classList.remove('btn-primary');
  }
  
  if (playBtn) {
    playBtn.classList.add('btn-secondary');
    playBtn.classList.remove('btn-primary');
  }
  
  if (stopBtn) {
    stopBtn.setAttribute('disabled', 'true');
  }
}

// ---------------------------
// Application Controller State
// ---------------------------
let activeMode = 'eng-to-braille'; // Options: eng-to-braille, braille-to-eng, eng-to-morse, morse-to-eng

function updateActiveButtonUI() {
  const buttons = {
    'eng-to-braille': document.getElementById('btn-eng-to-braille'),
    'braille-to-eng': document.getElementById('btn-braille-to-eng'),
    'eng-to-morse': document.getElementById('btn-eng-to-morse'),
    'morse-to-eng': document.getElementById('btn-morse-to-eng')
  };
  
  Object.keys(buttons).forEach(mode => {
    const btn = buttons[mode];
    if (!btn) return;
    if (mode === activeMode) {
      btn.classList.add('active-mode'); // Highlight active button
      btn.style.boxShadow = '0 0 10px rgba(99, 102, 241, 0.4)';
      btn.style.background = 'var(--accent-gradient)';
    } else {
      btn.classList.remove('active-mode');
      btn.style.boxShadow = 'none';
      btn.style.background = 'var(--accent-primary)';
    }
  });
}

function runTranslation() {
  const inputVal = document.getElementById('text-input').value;
  const outputArea = document.getElementById('text-output');
  let result = '';
  
  switch (activeMode) {
    case 'eng-to-braille':
      result = englishToBraille(inputVal);
      outputArea.value = result;
      renderBrailleVisualization(result);
      break;
      
    case 'braille-to-eng':
      result = brailleToEnglish(inputVal);
      outputArea.value = result;
      renderBrailleVisualization(inputVal); // Visualize Braille inputs
      break;
      
    case 'eng-to-morse':
      result = englishToMorse(inputVal);
      outputArea.value = result;
      renderBrailleVisualization(''); // Clear braille visualization
      break;
      
    case 'morse-to-eng':
      result = morseToEnglish(inputVal);
      outputArea.value = result;
      renderBrailleVisualization(''); // Clear braille visualization
      break;
  }
}

// ---------------------------
// Event Listeners & UI Binding
// ---------------------------
document.addEventListener('DOMContentLoaded', () => {
  const textInput = document.getElementById('text-input');
  const textOutput = document.getElementById('text-output');
  const autoTranslateCheck = document.getElementById('auto-translate');
  
  // Real-time input listener
  textInput.addEventListener('input', () => {
    // Char counter
    document.getElementById('input-char-count').textContent = textInput.value.length;
    
    if (autoTranslateCheck.checked) {
      runTranslation();
    }
  });
  
  // Manual trigger if auto translate is off
  const triggerTranslation = (mode) => {
    activeMode = mode;
    updateActiveButtonUI();
    runTranslation();
  };
  
  document.getElementById('btn-eng-to-braille').addEventListener('click', () => triggerTranslation('eng-to-braille'));
  document.getElementById('btn-braille-to-eng').addEventListener('click', () => triggerTranslation('braille-to-eng'));
  document.getElementById('btn-eng-to-morse').addEventListener('click', () => triggerTranslation('eng-to-morse'));
  document.getElementById('btn-morse-to-eng').addEventListener('click', () => triggerTranslation('morse-to-eng'));
  
  // Initial UI state
  updateActiveButtonUI();
  
  // Clear button
  document.getElementById('clear-input').addEventListener('click', () => {
    textInput.value = '';
    textOutput.value = '';
    document.getElementById('input-char-count').textContent = '0';
    renderBrailleVisualization('');
    stopAllAudio();
  });
  
  // Copy clipboard button
  document.getElementById('copy-output').addEventListener('click', () => {
    if (!textOutput.value) return;
    navigator.clipboard.writeText(textOutput.value).then(() => {
      const toast = document.getElementById('copy-toast');
      toast.classList.remove('hidden');
      setTimeout(() => {
        toast.classList.add('hidden');
      }, 2000);
    });
  });
  
  // Speech controls settings accordion toggles
  document.querySelectorAll('.settings-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const target = document.getElementById(targetId);
      if (target) {
        target.classList.toggle('collpased');
      }
    });
  });
  
  // Speech input buttons binding
  document.getElementById('speak-input-btn').addEventListener('click', () => {
    speakText(textInput.value);
  });
  
  // Play translation (TTS or Morse Audio)
  document.getElementById('speak-output-btn').addEventListener('click', () => {
    const outVal = textOutput.value.trim();
    if (!outVal) return;
    
    // Detect output type
    const isBraille = /[⠁-⠽⠼⠲⠂⠦⠖⠆⠒⠄⠶⠤]/.test(outVal);
    const isMorse = /^[\.\-\s\/\\↵\n]+$/.test(outVal);
    
    if (isBraille) {
      // Speak translation
      speakText(brailleToEnglish(outVal));
    } else if (isMorse) {
      // Play Morse beeps
      playMorseAudio(outVal);
    } else {
      // Normal speech
      speakText(outVal);
    }
  });
  
  // Stop audio button
  document.getElementById('stop-audio-btn').addEventListener('click', () => {
    stopAllAudio();
  });
  
  // Slider values live indicators
  const bindSliderLabel = (sliderId, valId, suffix = '') => {
    const slider = document.getElementById(sliderId);
    const label = document.getElementById(valId);
    if (!slider || !label) return;
    slider.addEventListener('input', () => {
      label.textContent = slider.value + suffix;
    });
  };
  
  bindSliderLabel('tts-rate', 'tts-rate-val');
  bindSliderLabel('tts-pitch', 'tts-pitch-val');
  bindSliderLabel('morse-freq', 'morse-freq-val');
  bindSliderLabel('morse-wpm', 'morse-wpm-val');
  bindSliderLabel('morse-volume', 'morse-volume-val');
  
  // Theme toggle mode
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
  });
});
