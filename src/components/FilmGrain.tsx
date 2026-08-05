import { useEffect, useRef } from 'react';

export default function FilmGrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = 256;
    const h = 256;
    canvas.width = w;
    canvas.height = h;

    const buffer = new Uint8ClampedArray(w * h * 4);
    let animId: number;

    const draw = () => {
      for (let i = 0; i < buffer.length; i += 4) {
        const brightness = Math.random() * 255;
        buffer[i] = brightness;
        buffer[i + 1] = brightness;
        buffer[i + 2] = brightness;
        buffer[i + 3] = 8;
      }
      const imageData = new ImageData(buffer, w, h);
      ctx.putImageData(imageData, 0, 0);
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: 0.35,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
