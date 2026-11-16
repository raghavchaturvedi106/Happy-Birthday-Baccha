// Floating Hearts Generator
function createHeart() {
  const container = document.getElementById('heartsContainer');
  if (!container) return;
  const heart = document.createElement('div');
  heart.className = 'floating-heart';
  heart.innerHTML = ['❤️', '💖', '💕', '💗', '✨', '🫠'][Math.floor(Math.random() * 6)];
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.fontSize = (Math.random() * 14 + 14) + 'px';
  const duration = Math.random() * 4 + 4;
  heart.style.animationDuration = duration + 's';
  container.appendChild(heart);
  setTimeout(() => { heart.remove(); }, duration * 1000);
}
setInterval(createHeart, 450);

// Background Music Toggle (Romantic Audio Synth / Tone generator or Soft chime effect)
let isPlaying = false;
let audioCtx = null;

function toggleMusic() {
  const musicText = document.getElementById('musicText');
  const musicIcon = document.getElementById('musicIcon');
  
  isPlaying = !isPlaying;
  if (isPlaying) {
    musicText.innerText = "Playing Melody 🎶";
    musicIcon.innerText = "❤️";
    startSoftMelody();
  } else {
    musicText.innerText = "Play Melody";
    musicIcon.innerText = "🎵";
    if (audioCtx) {
      audioCtx.close();
      audioCtx = null;
    }
  }
}

function startSoftMelody() {
  try {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [261.63, 329.63, 392.00, 523.25, 440.00, 349.23]; // C chord notes
    let index = 0;

    function playTone() {
      if (!isPlaying || !audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = 'sine';
      osc.frequency.value = notes[index % notes.length];
      index++;

      gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 2.5);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 2.5);

      setTimeout(playTone, 2800);
    }
    playTone();
  } catch (e) {
    console.log("Audio not supported or blocked");
  }
}

// Apology Letter Interaction
function openApologyLetter() {
  document.getElementById('letterClosed').classList.add('hidden');
  document.getElementById('letterOpened').classList.remove('hidden');
}

function acceptSorry() {
  document.getElementById('forgiveBtn').classList.add('bg-emerald-600');
  document.getElementById('forgiveBtn').innerText = "Maaf Kar Diya! 🥰";
  document.getElementById('forgiveReply').classList.remove('hidden');
  triggerConfetti();
}

// Cake & Candles Logic
let candlesOut = [false, false, false];

function blowCandle(index) {
  candlesOut[index] = true;
  document.getElementById(`flame-${index}`).classList.add('out');
  checkAllCandles();
}

function blowAllCandles() {
  candlesOut = [true, true, true];
  for (let i = 0; i < 3; i++) {
    document.getElementById(`flame-${i}`).classList.add('out');
  }
  checkAllCandles();
}

function relightCandles() {
  candlesOut = [false, false, false];
  for (let i = 0; i < 3; i++) {
    document.getElementById(`flame-${i}`).classList.remove('out');
  }
  document.getElementById('wishReveal').classList.add('hidden');
}

function checkAllCandles() {
  if (candlesOut.every(val => val === true)) {
    document.getElementById('wishReveal').classList.remove('hidden');
    triggerConfetti();
  }
}

// Swap Photos dynamically
function swapPhoto(event, imgId) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById(imgId).src = e.target.result;
    }
    reader.readAsDataURL(file);
  }
}

// Confetti Effect
function triggerConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let pieces = [];
  const numberOfPieces = 70;
  const colors = ['#f43f5e', '#fb7185', '#f48fb1', '#ffffff', '#ffd700'];

  for (let i = 0; i < numberOfPieces; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: Math.random() * 3 + 2,
      angle: Math.random() * 360,
      spin: Math.random() * 0.2 - 0.1
    });
  }

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach((p, index) => {
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      p.y += p.speed;
      p.x += Math.sin(p.angle);
      p.angle += p.spin;
      if (p.y > canvas.height) pieces.splice(index, 1);
    });
    if (pieces.length > 0) {
      requestAnimationFrame(render);
    }
  }
  render();
}
