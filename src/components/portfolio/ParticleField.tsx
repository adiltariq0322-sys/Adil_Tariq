import { useEffect, useRef, memo } from "react";

const ParticleField = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationId: number;
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 10 : 35;
    const connectionDist = 140;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number; color: string }[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    resize();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 250);
    };
    window.addEventListener("resize", debouncedResize);

    const colors = ["rgba(52,168,115,", "rgba(42,148,100,", "rgba(200,165,60,"];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        size: Math.random() * 1.2 + 0.4,
        opacity: Math.random() * 0.35 + 0.08,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let lastTime = 0;
    const targetFPS = isMobile ? 30 : 60;
    const frameInterval = 1000 / targetFPS;

    const animate = (timestamp: number) => {
      const delta = timestamp - lastTime;
      if (delta < frameInterval) {
        animationId = requestAnimationFrame(animate);
        return;
      }
      lastTime = timestamp - (delta % frameInterval);

      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.opacity})`;
        ctx.fill();
      });

      if (!isMobile) {
        for (let i = 0; i < particles.length; i++) {
          const a = particles[i];
          for (let j = i + 1; j < particles.length; j++) {
            const b = particles[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const distSq = dx * dx + dy * dy;
            const maxDistSq = connectionDist * connectionDist;
            if (distSq < maxDistSq) {
              const alpha = 0.05 * (1 - distSq / maxDistSq);
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.strokeStyle = `rgba(52,168,115,${alpha})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ willChange: "auto" }} />;
});

ParticleField.displayName = "ParticleField";
export default ParticleField;
