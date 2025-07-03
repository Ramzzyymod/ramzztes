<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Jam Realtime Indonesia</title>

  <!-- Font Awesome untuk ikon WA -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

  <style>
    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      font-family: 'Courier New', Courier, monospace;
      background: radial-gradient(circle at center, #001020, #000a1f 80%);
      background-size: 400% 400%;
      animation: shimmer 16s ease-in-out infinite;
      color: #00ff99;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      overflow: hidden;
      position: relative;
      box-shadow: inset 0 0 40px 10px rgba(0, 255, 255, 0.2);
      flex-direction: column;
    }

    @keyframes shimmer {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    #snow, #lightning-canvas {
      position: fixed;
      top: 0;
      left: 0;
      pointer-events: none;
      z-index: 1;
    }

    #lightning-canvas {
      z-index: 2;
    }

    .rainbow-text {
      font-size: 2em;
      font-weight: bold;
      text-align: center;
      margin-bottom: 30px;
      background: linear-gradient(270deg, red, orange, yellow, green, cyan, blue, violet);
      background-size: 400% 400%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: rainbow 5s linear infinite;
      text-shadow: 0 0 5px #ffffff55;
      z-index: 4;
    }

    @keyframes rainbow {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    .container {
      position: relative;
      z-index: 3;
      border: 1px solid #00ffcc;
      border-radius: 14px;
      padding: 20px;
      background: rgba(18, 25, 43, 0.95);
      box-shadow: 0 0 25px #00ffee88, inset 0 0 8px #00ffee55;
      max-width: 520px;
      width: 90%;
      backdrop-filter: blur(6px);
      animation: flicker 3s infinite alternate;
    }

    @keyframes flicker {
      0% { box-shadow: 0 0 20px #00ffee55, inset 0 0 6px #00ffee33; }
      100% { box-shadow: 0 0 30px #00ffeeaa, inset 0 0 10px #00ffee66; }
    }

    .header {
      font-weight: bold;
      margin-bottom: 15px;
      color: #00ffff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-shadow: 0 0 4px #00f0ff;
    }

    .modes {
      display: flex;
      gap: 8px;
    }

    .modes button {
      background: #12192b;
      color: #00ffcc;
      border: 1px solid #00ffee55;
      border-radius: 6px;
      padding: 5px 12px;
      cursor: pointer;
      transition: 0.3s;
      box-shadow: 0 0 5px #00ffee33;
    }

    .modes button.active,
    .modes button:hover {
      background: #00ffee33;
      color: #ffffff;
      box-shadow: 0 0 10px #00ffeeaa;
    }

    .poem {
      margin: 25px 0;
      line-height: 1.6;
      text-align: center;
      color: #00ff99;
      font-size: 1rem;
      text-shadow: 0 0 5px #00ff99aa;
      border: 1px solid #00ffee66;
      border-radius: 10px;
      padding: 16px;
      background: rgba(0, 20, 40, 0.6);
      box-shadow: 0 0 12px #00ffee44, inset 0 0 8px #00ffee22;
    }

    .poem span {
      font-weight: bold;
      color: #00ffff;
      text-shadow: 0 0 8px #00ffee;
    }

    .time-box {
      font-size: 1.3em;
      text-align: right;
      color: #00ffff;
      background: #000000cc;
      padding: 8px 14px;
      border-radius: 8px;
      border: 1px solid #00ffee55;
      width: fit-content;
      margin-left: auto;
      box-shadow: 0 0 10px #00ffee55, inset 0 0 6px #00ffee33;
      margin-bottom: 8px;
    }

    #current-date {
      margin-top: -5px;
    }

    .footer {
      margin-top: 10px;
      font-size: 0.8em;
      color: #888;
      text-align: right;
      text-shadow: 0 0 2px #444;
    }

    .marquee {
      margin-top: 10px;
      color: #00ffff;
      font-weight: bold;
      text-shadow: none;
    }

    .wa-button {
      margin-top: 18px;
      text-align: center;
    }

    .wa-button a {
      display: inline-block;
      background: #25D366;
      color: #fff;
      font-weight: bold;
      padding: 10px 20px;
      border-radius: 10px;
      text-decoration: none;
      border: 2px solid #00ffaa88;
      box-shadow: 0 0 12px #00ffaa88, inset 0 0 6px #00ffaa55;
      transition: all 0.3s ease;
    }

    .wa-button a:hover {
      background: #1ebc5e;
      box-shadow: 0 0 20px #00ffaaaa;
      transform: scale(1.05);
    }

    .welcome-dialog {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 100, 0.85);
      color: #00ffcc;
      padding: 24px 36px;
      border: 2px solid #00ffee;
      border-radius: 14px;
      box-shadow: 0 0 20px #00ffeeaa, inset 0 0 10px #00ffee44;
      font-size: 1.3em;
      z-index: 9999;
      opacity: 0;
      transition: opacity 0.5s ease;
      text-align: center;
      max-width: 90%;
      width: 90%;
    }
  </style>
</head>
<body>
  <!-- Teks Judul Pelangi -->
  <div class="rainbow-text">CEK JAM NEGARA INDONESIA</div>

  <canvas id="snow"></canvas>
  <canvas id="lightning-canvas"></canvas>

  <!-- Dialog Sambutan -->
  <div class="welcome-dialog" id="welcome-dialog">
    SELAMAT DATANG DI WEB REALTIME JAM INDONESIA
  </div>

  <div class="container">
    <div class="header">
      <div>JAM REALTIME INDONESIA</div>
      <div class="modes">
        <button onclick="setZone(7)" class="active" id="btn-wib">WIB</button>
        <button onclick="setZone(8)" id="btn-wita">WITA</button>
        <button onclick="setZone(9)" id="btn-wit">WIT</button>
      </div>
    </div>

    <div class="poem">
      Di waktu <span id="time-display">--:--:--</span> yang sunyi<br />
      Jarum jam terus berputar<br />
      Membisikkan cerita hari<br />
      Tentang masa yang kan datang
    </div>

    <div class="time-box" id="current-time">--:--:--</div>
    <div class="time-box" id="current-date">--/--/----</div>

    <div class="wa-button">
      <a href="https://wa.me/+l6283137584867" target="_blank">
        <i class="fab fa-whatsapp"></i> Chat Owner Web
      </a>
    </div>

    <div class="footer">Powered by Ramzz 🛠️</div>
    <marquee behavior="scroll" direction="left" scrollamount="5" class="marquee">
      🌐 WEB BY RAMZZY 🚀
    </marquee>
  </div>

  <!-- TEKS BERJALAN BAWAH -->
  <marquee behavior="scroll" direction="left" scrollamount="6" style="position: fixed; bottom: 0; width: 100%; background: #001020; color: #00ffcc; padding: 6px 0; font-weight: bold; z-index: 9999; box-shadow: 0 -2px 10px #00ffee66;">
    🌐 WEB INI DI BUAT UNTUK CEK JAM INDONESIA 🌐
  </marquee>

  <!-- SCRIPT (biarkan tetap) -->
  <script>
    let timezoneOffset = 7;

    function setZone(offset) {
      timezoneOffset = offset;
      document.querySelectorAll('.modes button').forEach(btn => btn.classList.remove('active'));
      if (offset === 7) document.getElementById("btn-wib").classList.add('active');
      if (offset === 8) document.getElementById("btn-wita").classList.add('active');
      if (offset === 9) document.getElementById("btn-wit").classList.add('active');
    }

    function updateTime() {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const local = new Date(utc + 3600000 * timezoneOffset);

      const timeString = local.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });

      const dateString = local.toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      document.getElementById("current-time").textContent = timeString;
      document.getElementById("time-display").textContent = timeString;
      document.getElementById("current-date").textContent = dateString;
    }

    setInterval(updateTime, 1000);
    updateTime();

    window.addEventListener("load", () => {
      const dialog = document.getElementById("welcome-dialog");
      dialog.style.opacity = 1;
      setTimeout(() => {
        dialog.style.opacity = 0;
      }, 3000);
    });

    // Salju
    const canvas = document.getElementById('snow');
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let snowflakes = [];

    function createSnowflakes() {
      const count = 150;
      for (let i = 0; i < count; i++) {
        snowflakes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 2 + 1,
          d: Math.random() + 0.5
        });
      }
    }

    function drawSnowflakes() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.beginPath();
      for (let f of snowflakes) {
        ctx.moveTo(f.x, f.y);
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
      }
      ctx.fill();
      moveSnowflakes();
    }

    function moveSnowflakes() {
      for (let f of snowflakes) {
        f.y += f.d;
        if (f.y > height) {
          f.y = 0;
          f.x = Math.random() * width;
        }
      }
    }

    function updateSnow() {
      drawSnowflakes();
      requestAnimationFrame(updateSnow);
    }

    window.addEventListener('resize', () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    });

    createSnowflakes();
    updateSnow();

    // Petir
    const lightningCanvas = document.getElementById('lightning-canvas');
    const lightningCtx = lightningCanvas.getContext('2d');

    function resizeLightningCanvas() {
      lightningCanvas.width = window.innerWidth;
      lightningCanvas.height = window.innerHeight;
    }

    resizeLightningCanvas();
    window.addEventListener('resize', resizeLightningCanvas);

    function drawLightningBolt(x, y, segments, spread) {
      lightningCtx.beginPath();
      lightningCtx.moveTo(x, y);
      for (let i = 0; i < segments; i++) {
        x += Math.random() * spread - spread / 2;
        y += Math.random() * 30;
        lightningCtx.lineTo(x, y);
      }
      lightningCtx.strokeStyle = 'rgba(255,255,255,0.8)';
      lightningCtx.lineWidth = 2 + Math.random() * 2;
      lightningCtx.shadowColor = '#ffffff';
      lightningCtx.shadowBlur = 15;
      lightningCtx.stroke();
    }

    function lightningStrike() {
      lightningCtx.clearRect(0, 0, lightningCanvas.width, lightningCanvas.height);
      const bolts = Math.floor(Math.random() * 2) + 1;
      for (let i = 0; i < bolts; i++) {
        const startX = Math.random() * lightningCanvas.width;
        const startY = 0;
        const segments = 10 + Math.floor(Math.random() * 10);
        const spread = 60;
        drawLightningBolt(startX, startY, segments, spread);
      }
      setTimeout(() => {
        lightningCtx.clearRect(0, 0, lightningCanvas.width, lightningCanvas.height);
      }, 200);
    }

    function randomLightning() {
      const delay = Math.random() * 8000 + 2000;
      setTimeout(() => {
        lightningStrike();
        randomLightning();
      }, delay);
    }

    randomLightning();
  </script>
</body>
</html>