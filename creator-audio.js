(function () {
  const MUSIC_KEY = "schooltopia_music_enabled";
  const SOUND_KEY = "schooltopia_sound_enabled";
  const musicButton = document.getElementById("creatorMusicToggle");
  const soundButton = document.getElementById("creatorSoundToggle");
  const musicLabel = document.getElementById("creatorMusicLabel");
  const soundLabel = document.getElementById("creatorSoundLabel");

  let musicEnabled = readPreference(MUSIC_KEY);
  let soundEnabled = readPreference(SOUND_KEY);
  let audioContext = null;
  let musicGain = null;
  let musicTimer = 0;
  let musicNodes = [];
  let ambienceNodes = [];
  let audioUnlocked = false;
  let lastTypingSound = 0;

  function readPreference(key) {
    try {
      return localStorage.getItem(key) !== "false";
    } catch {
      return true;
    }
  }

  function savePreference(key, value) {
    try {
      localStorage.setItem(key, value ? "true" : "false");
    } catch {
      // Audio preferences are optional.
    }
  }

  function syncControls() {
    if (musicButton && musicLabel) {
      musicButton.setAttribute("aria-pressed", musicEnabled ? "true" : "false");
      musicLabel.textContent = musicEnabled ? "音乐 开" : "音乐 关";
    }
    if (soundButton && soundLabel) {
      soundButton.setAttribute("aria-pressed", soundEnabled ? "true" : "false");
      soundLabel.textContent = soundEnabled ? "音效 开" : "音效 关";
    }
  }

  function ensureContext() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    if (!audioContext) audioContext = new AudioContextClass();
    if (audioContext.state === "suspended") audioContext.resume?.().catch(() => {});
    return audioContext;
  }

  function playTone(frequency, duration = 0.08, options = {}) {
    if (!soundEnabled) return;
    const context = ensureContext();
    if (!context) return;
    const start = context.currentTime + (options.delay || 0);
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = options.type || "sine";
    oscillator.frequency.setValueAtTime(frequency, start);
    if (options.slide) {
      oscillator.frequency.exponentialRampToValueAtTime(Math.max(50, frequency + options.slide), start + duration);
    }
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(options.gain || 0.022, start + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(start);
    oscillator.stop(start + duration + 0.03);
  }

  function playNoise(duration = 0.08, options = {}) {
    if (!soundEnabled) return;
    const context = ensureContext();
    if (!context) return;
    const start = context.currentTime + (options.delay || 0);
    const buffer = context.createBuffer(1, Math.max(1, Math.floor(context.sampleRate * duration)), context.sampleRate);
    const data = buffer.getChannelData(0);
    for (let index = 0; index < data.length; index += 1) {
      const decay = 1 - index / data.length;
      data[index] = (Math.random() * 2 - 1) * decay * decay;
    }
    const source = context.createBufferSource();
    const filter = context.createBiquadFilter();
    const gain = context.createGain();
    source.buffer = buffer;
    filter.type = options.filter || "bandpass";
    filter.frequency.value = options.frequency || 1100;
    filter.Q.value = options.q || 1.2;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(options.gain || 0.014, start + 0.006);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    source.connect(filter);
    filter.connect(gain);
    gain.connect(context.destination);
    source.start(start);
    source.stop(start + duration + 0.03);
  }

  function playKeyboard() {
    playNoise(0.04, { filter: "highpass", frequency: 1700, gain: 0.013 });
    playTone(330, 0.032, { type: "triangle", gain: 0.006, delay: 0.01, slide: -35 });
  }

  function playPaper() {
    playNoise(0.28, { filter: "bandpass", frequency: 1200, q: 0.7, gain: 0.017 });
    playNoise(0.2, { filter: "highpass", frequency: 1800, q: 0.5, gain: 0.009, delay: 0.11 });
  }

  function playConfirm() {
    playTone(523, 0.08, { type: "triangle", gain: 0.018 });
    playTone(659, 0.1, { type: "sine", gain: 0.016, delay: 0.07 });
    playTone(784, 0.14, { type: "sine", gain: 0.011, delay: 0.15 });
  }

  function playError() {
    playTone(280, 0.1, { type: "triangle", gain: 0.018, slide: -70 });
    playTone(190, 0.12, { type: "sine", gain: 0.014, delay: 0.07 });
  }

  function startAmbience() {
    if (!soundEnabled || ambienceNodes.length || document.hidden) return;
    const context = ensureContext();
    if (!context) return;
    const buffer = context.createBuffer(1, context.sampleRate * 4, context.sampleRate);
    const data = buffer.getChannelData(0);
    let smooth = 0;
    for (let index = 0; index < data.length; index += 1) {
      smooth = smooth * 0.986 + (Math.random() * 2 - 1) * 0.014;
      data[index] = smooth;
    }
    const source = context.createBufferSource();
    const lowpass = context.createBiquadFilter();
    const bandpass = context.createBiquadFilter();
    const gain = context.createGain();
    source.buffer = buffer;
    source.loop = true;
    lowpass.type = "lowpass";
    lowpass.frequency.value = 600;
    bandpass.type = "bandpass";
    bandpass.frequency.value = 250;
    bandpass.Q.value = 0.42;
    gain.gain.value = 0.014;
    source.connect(lowpass);
    lowpass.connect(bandpass);
    bandpass.connect(gain);
    gain.connect(context.destination);
    source.start();
    ambienceNodes = [source, gain];
  }

  function stopAmbience() {
    const [source, gain] = ambienceNodes;
    if (gain && audioContext) gain.gain.setTargetAtTime(0.0001, audioContext.currentTime, 0.12);
    if (source) {
      window.setTimeout(() => {
        try { source.stop(); } catch { /* Already stopped. */ }
      }, 380);
    }
    ambienceNodes = [];
  }

  function midiFrequency(note) {
    return 440 * (2 ** ((note - 69) / 12));
  }

  function scheduleMusicNote(context, note, start, duration, volume, type = "sine") {
    if (!musicGain) return;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(midiFrequency(note), start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + 0.08);
    gain.gain.setTargetAtTime(0.0001, start + Math.max(0.16, duration - 0.36), 0.18);
    oscillator.connect(gain);
    gain.connect(musicGain);
    oscillator.start(start);
    oscillator.stop(start + duration + 0.4);
    musicNodes.push(oscillator);
  }

  function scheduleMusic() {
    if (!musicEnabled || document.hidden) return;
    const context = ensureContext();
    if (!context) return;
    if (!musicGain) {
      musicGain = context.createGain();
      musicGain.gain.value = 0.0001;
      musicGain.connect(context.destination);
    }
    stopScheduledMusic(false);
    const now = context.currentTime;
    musicGain.gain.cancelScheduledValues(now);
    musicGain.gain.setValueAtTime(Math.max(0.0001, musicGain.gain.value), now);
    musicGain.gain.setTargetAtTime(0.55, now, 0.9);
    const beat = 0.82;
    const start = now + 0.14;
    const chords = [
      { bass: 43, notes: [55, 59, 62, 66] },
      { bass: 38, notes: [50, 54, 57, 61] },
    ];
    for (let bar = 0; bar < 16; bar += 1) {
      const chord = chords[bar % 2];
      const barStart = start + bar * beat * 3;
      scheduleMusicNote(context, chord.bass, barStart, beat * 2.75, 0.017);
      chord.notes.forEach((note, index) => {
        scheduleMusicNote(context, note, barStart + beat * 0.9, beat * 1.75, 0.0062 - index * 0.0004, "triangle");
      });
    }
    const melody = [
      [66, 0, 2], [69, 2, 1], [68, 3, 2], [66, 5, 1],
      [61, 6, 2], [59, 8, 1], [61, 9, 2], [62, 11, 1],
      [57, 12, 2], [59, 14, 1], [61, 15, 2], [62, 17, 1],
      [66, 18, 2], [64, 20, 1], [62, 21, 2], [61, 23, 1],
      [59, 24, 2], [61, 26, 1], [62, 27, 2], [66, 29, 1],
      [69, 30, 2], [68, 32, 1], [66, 33, 3],
      [61, 36, 2], [62, 38, 1], [59, 39, 2], [57, 41, 1], [54, 42, 4],
    ];
    melody.forEach(([note, offset, duration]) => {
      scheduleMusicNote(context, note, start + offset * beat, duration * beat * 0.94, 0.017);
      scheduleMusicNote(context, note + 12, start + offset * beat + 0.01, duration * beat * 0.72, 0.003, "triangle");
    });
    musicTimer = window.setTimeout(scheduleMusic, beat * 47 * 1000);
  }

  function stopScheduledMusic(fade = true) {
    window.clearTimeout(musicTimer);
    musicTimer = 0;
    musicNodes.forEach((node) => {
      try { node.stop(); } catch { /* Already stopped. */ }
    });
    musicNodes = [];
    if (fade && musicGain && audioContext) {
      const now = audioContext.currentTime;
      musicGain.gain.cancelScheduledValues(now);
      musicGain.gain.setTargetAtTime(0.0001, now, 0.16);
    }
  }

  function unlockAudio() {
    audioUnlocked = true;
    ensureContext();
    if (musicEnabled && !musicTimer) scheduleMusic();
    if (soundEnabled) startAmbience();
  }

  function toggleMusic(event) {
    event.stopPropagation();
    unlockAudio();
    musicEnabled = !musicEnabled;
    savePreference(MUSIC_KEY, musicEnabled);
    syncControls();
    if (musicEnabled) scheduleMusic();
    else stopScheduledMusic();
  }

  function toggleSound(event) {
    event.stopPropagation();
    unlockAudio();
    soundEnabled = !soundEnabled;
    savePreference(SOUND_KEY, soundEnabled);
    syncControls();
    if (soundEnabled) {
      playConfirm();
      startAmbience();
    } else {
      stopAmbience();
    }
  }

  musicButton?.addEventListener("click", toggleMusic);
  soundButton?.addEventListener("click", toggleSound);

  document.addEventListener("pointerdown", unlockAudio, { once: true, capture: true });
  document.addEventListener("keydown", unlockAudio, { once: true, capture: true });
  document.addEventListener("click", (event) => {
    const target = event.target.closest("button, a");
    if (!target || target.closest(".creator-audio-controls")) return;
    if (target.classList.contains("skin-preset")) playConfirm();
    else playKeyboard();
  });
  document.addEventListener("focusin", (event) => {
    if (event.target.matches("textarea")) playPaper();
  });
  document.addEventListener("input", (event) => {
    if (!event.target.matches('input:not([type="color"]):not([type="number"]), textarea')) return;
    const now = Date.now();
    if (now - lastTypingSound < 85) return;
    lastTypingSound = now;
    playKeyboard();
  });
  window.addEventListener("creator-status", (event) => {
    if (!audioUnlocked || !soundEnabled) return;
    const { message = "", error = false } = event.detail || {};
    if (error) playError();
    else if (/已创建|已保存|已重置|已把|已复制/.test(message)) playConfirm();
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopScheduledMusic();
      stopAmbience();
      return;
    }
    if (!audioUnlocked) return;
    if (musicEnabled) scheduleMusic();
    if (soundEnabled) startAmbience();
  });

  syncControls();
  window.CreatorAudio = {
    getState() {
      return {
        musicEnabled,
        soundEnabled,
        unlocked: audioUnlocked,
        contextState: audioContext?.state || "not-created",
        scheduledMusicNodes: musicNodes.length,
        ambienceActive: ambienceNodes.length > 0,
      };
    },
  };
})();
