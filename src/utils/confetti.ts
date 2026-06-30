'use client';

interface ConfettiParticle {
  x: number;
  y: number;
  w: number;
  h: number;
  vx: number;
  vy: number;
  angle: number;
  rotationSpeed: number;
  color: string;
  shape: 'leaf' | 'coconut' | 'sparkle' | 'circle';
  opacity: number;
  decay: number;
}

export function triggerConfetti() {
  if (typeof window === 'undefined') return;

  // Check if canvas already exists, otherwise create it
  let canvas = document.getElementById('ksr-global-confetti') as HTMLCanvasElement;
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'ksr-global-confetti';
    canvas.style.position = 'fixed';
    canvas.style.inset = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ['#00C853', '#4ADE80', '#A7F45D', '#FFFFFF', '#66BB6A', '#FAB818'];
  const shapes: ('leaf' | 'coconut' | 'sparkle' | 'circle')[] = ['leaf', 'coconut', 'sparkle', 'circle'];
  
  const particles: ConfettiParticle[] = [];
  const particleCount = 140;

  // Initialize confetti particles originating from the bottom corners / center
  for (let i = 0; i < particleCount; i++) {
    const fromLeft = Math.random() > 0.5;
    
    particles.push({
      x: fromLeft ? 0 : canvas.width,
      y: canvas.height * 0.85,
      w: 8 + Math.random() * 12,
      h: 4 + Math.random() * 8,
      vx: (fromLeft ? 3 : -3) + (Math.random() - 0.5) * 8,
      vy: -12 - Math.random() * 10,
      angle: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.25,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      opacity: 1,
      decay: 0.007 + Math.random() * 0.008,
    });
  }

  let frameId: number;

  const drawParticle = (p: ConfettiParticle) => {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle);
    ctx.globalAlpha = p.opacity;

    if (p.shape === 'leaf') {
      // Curve green leaf
      ctx.fillStyle = '#4ADE80';
      ctx.beginPath();
      ctx.moveTo(-p.w / 2, 0);
      ctx.quadraticCurveTo(0, -p.h, p.w / 2, 0);
      ctx.quadraticCurveTo(0, p.h, -p.w / 2, 0);
      ctx.closePath();
      ctx.fill();
    } else if (p.shape === 'coconut') {
      // Circle representing coconut (brown shell + white center)
      const size = p.w * 0.5;
      
      // Brown shell
      ctx.fillStyle = '#6d4c41';
      ctx.beginPath();
      ctx.arc(0, 0, size, 0, Math.PI * 2);
      ctx.fill();

      // White flesh
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.75, 0, Math.PI * 2);
      ctx.fill();

      // Green husk dot
      ctx.fillStyle = '#4ADE80';
      ctx.beginPath();
      ctx.arc(-size * 0.3, -size * 0.3, size * 0.25, 0, Math.PI * 2);
      ctx.fill();
    } else if (p.shape === 'sparkle') {
      // 4-point twinkle star
      ctx.fillStyle = '#FAB818';
      const size = p.w * 0.7;
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.lineTo(size * 0.25, -size * 0.25);
      ctx.lineTo(size, 0);
      ctx.lineTo(size * 0.25, size * 0.25);
      ctx.lineTo(0, size);
      ctx.lineTo(-size * 0.25, size * 0.25);
      ctx.lineTo(-size, 0);
      ctx.lineTo(-size * 0.25, -size * 0.25);
      ctx.closePath();
      ctx.fill();
    } else {
      // Green circles
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(0, 0, p.w * 0.45, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  };

  const update = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let activeParticles = 0;

    particles.forEach((p) => {
      // Gravity & air resistance
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.28; // gravity
      p.vx *= 0.98; // air resistance
      p.angle += p.rotationSpeed;
      p.opacity -= p.decay;

      if (p.opacity > 0) {
        drawParticle(p);
        activeParticles++;
      }
    });

    if (activeParticles > 0) {
      frameId = requestAnimationFrame(update);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(frameId);
    }
  };

  update();
}
