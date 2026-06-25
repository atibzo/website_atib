"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reusable scratch-to-reveal canvas. Children are rendered underneath an
 * opaque foreground that the guest scratches away with pointer/touch. Once
 * ~55% is cleared, the rest fades out automatically. The whole thing is
 * clipped to `shapePath` (a heart by default).
 *
 * Accessibility: keyboard users (and reduced-motion) can reveal instantly via
 * the underlying button role — Enter/Space clears it.
 */
export default function ScratchCard({
  width = 168,
  height = 156,
  shapePath = "M84,150 C18,104 6,56 36,34 C58,18 80,28 84,50 C88,28 110,18 132,34 C162,56 150,104 84,150 Z",
  foreground = "#BC5836",
  label = "SCRATCH",
  children,
}: {
  width?: number;
  height?: number;
  shapePath?: string;
  foreground?: string;
  label?: string;
  children: React.ReactNode;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const drawing = useRef(false);

  const paint = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    ctx.fillStyle = foreground;
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "rgba(255,253,250,0.85)";
    ctx.font = "600 15px Georgia, serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label, width / 2, height / 2 + 6);
  };

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setRevealed(true);
      return;
    }
    paint();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearedRatio = () => {
    const canvas = canvasRef.current;
    if (!canvas) return 0;
    const ctx = canvas.getContext("2d");
    if (!ctx) return 0;
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let clear = 0;
    const total = data.length / 4;
    for (let i = 3; i < data.length; i += 4 * 16) {
      if (data[i] === 0) clear++;
    }
    return clear / (total / 16);
  };

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 20 * dpr, 0, Math.PI * 2);
    ctx.fill();
    if (clearedRatio() > 0.55) setRevealed(true);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={revealed ? "Revealed" : `Scratch to reveal: ${label}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setRevealed(true);
        }
      }}
      onPointerDown={(e) => {
        drawing.current = true;
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        scratch(e.clientX, e.clientY);
      }}
      onPointerMove={(e) => {
        if (drawing.current) scratch(e.clientX, e.clientY);
      }}
      onPointerUp={() => (drawing.current = false)}
      onPointerLeave={() => (drawing.current = false)}
      className="relative cursor-pointer touch-none select-none transition-transform hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
      style={{ width, height }}
    >
      {/* revealed content underneath, clipped to the shape */}
      <div
        className="absolute inset-0 flex items-center justify-center bg-card"
        style={{ clipPath: `path('${shapePath}')` }}
      >
        {children}
      </div>
      {/* scratch layer */}
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="absolute inset-0 h-full w-full transition-opacity duration-700"
        style={{
          clipPath: `path('${shapePath}')`,
          opacity: revealed ? 0 : 1,
          pointerEvents: revealed ? "none" : "auto",
        }}
      />
    </div>
  );
}
