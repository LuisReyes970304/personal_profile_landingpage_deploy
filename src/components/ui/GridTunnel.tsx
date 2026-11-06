"use client";

import { useCallback, useEffect, useImperativeHandle, useRef } from "react";
import type { Ref } from "react";

/** Cross-sections drawn between the viewer and the back wall. */
const RING_COUNT = 16;
/** Depth between two cross-sections. With RING_COUNT, it sets the back wall's size. */
const DEPTH_STEP = 0.25;
/** Approximate cell size, in pixels, at the tunnel's outer edge. */
const CELL_SIZE = 110;
/** Largest dot radius, in pixels, at the tunnel's outer edge. */
const DOT_RADIUS = 2.5;
/** Cross-sections deeper than this scale get no dots, which would only add noise there. */
const MIN_DOT_SCALE = 0.3;
const RING_OPACITY_NEAR = 0.28;
const RING_OPACITY_FAR = 0.6;
const LENGTHWISE_OPACITY = 0.32;
const DOT_OPACITY = 0.5;

const BACK_SCALE = 1 / (1 + RING_COUNT * DEPTH_STEP);

/** An even count, so a line always runs through the tunnel's center. */
function divisions(size: number) {
  return Math.max(4, 2 * Math.round(size / 2 / CELL_SIZE));
}

export type GridTunnelHandle = {
  /** Moves the grid inward by a number of cross-sections. */
  advance: (rings: number) => void;
};

type GridTunnelProps = {
  className?: string;
  ref?: Ref<GridTunnelHandle>;
};

/**
 * Decorative ink grid in one-point perspective with a soft shade at its center.
 * Every point is mirrored around the center, so all four walls stay symmetric.
 * It only moves when `advance` is called through the ref.
 * Size and position come entirely from `className`.
 */
export function GridTunnel({ className = "", ref }: GridTunnelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Fraction of the way from one cross-section to the next, in [0, 1).
  const offset = useRef(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (!width || !height) return;

    const halfWidth = width / 2;
    const halfHeight = height / 2;
    const columns = divisions(width);
    const rows = divisions(height);
    const color = getComputedStyle(canvas).color;

    context.setTransform(canvas.width / width, 0, 0, canvas.height / height, 0, 0);
    context.clearRect(0, 0, width, height);
    context.translate(halfWidth, halfHeight);
    context.strokeStyle = color;
    context.fillStyle = color;
    context.lineWidth = 1;

    // Lines running from the outer edge to the back wall, and the back wall's grid.
    context.globalAlpha = LENGTHWISE_OPACITY;
    context.beginPath();
    for (let i = 0; i <= columns; i++) {
      const x = (-1 + (2 * i) / columns) * halfWidth;
      for (const side of [-1, 1]) {
        context.moveTo(x, side * halfHeight);
        context.lineTo(x * BACK_SCALE, side * halfHeight * BACK_SCALE);
      }
      context.moveTo(x * BACK_SCALE, -halfHeight * BACK_SCALE);
      context.lineTo(x * BACK_SCALE, halfHeight * BACK_SCALE);
    }
    for (let j = 0; j <= rows; j++) {
      const y = (-1 + (2 * j) / rows) * halfHeight;
      for (const side of [-1, 1]) {
        context.moveTo(side * halfWidth, y);
        context.lineTo(side * halfWidth * BACK_SCALE, y * BACK_SCALE);
      }
      context.moveTo(-halfWidth * BACK_SCALE, y * BACK_SCALE);
      context.lineTo(halfWidth * BACK_SCALE, y * BACK_SCALE);
    }
    context.stroke();

    for (let ring = 0; ring < RING_COUNT; ring++) {
      const scale = 1 / (1 + (ring + offset.current) * DEPTH_STEP);
      const ringX = halfWidth * scale;
      const ringY = halfHeight * scale;
      const depth = (1 - scale) / (1 - BACK_SCALE);

      context.globalAlpha =
        RING_OPACITY_NEAR + (RING_OPACITY_FAR - RING_OPACITY_NEAR) * depth;
      context.strokeRect(-ringX, -ringY, ringX * 2, ringY * 2);

      if (scale < MIN_DOT_SCALE) continue;

      // A dot wherever this cross-section meets a lengthwise line.
      const radius = Math.max(0.7, DOT_RADIUS * scale);
      const addDot = (x: number, y: number) => {
        context.moveTo(x + radius, y);
        context.arc(x, y, radius, 0, Math.PI * 2);
      };
      context.globalAlpha = DOT_OPACITY;
      context.beginPath();
      for (let i = 0; i <= columns; i++) {
        const x = (-1 + (2 * i) / columns) * ringX;
        addDot(x, -ringY);
        addDot(x, ringY);
      }
      for (let j = 1; j < rows; j++) {
        const y = (-1 + (2 * j) / rows) * ringY;
        addDot(-ringX, y);
        addDot(ringX, y);
      }
      context.fill();
    }
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      advance(rings) {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        offset.current = (offset.current + rings) % 1;
        draw();
      },
    }),
    [draw],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const observer = new ResizeObserver(() => {
      const pixelRatio = Math.min(window.devicePixelRatio, 2);
      canvas.width = Math.round(canvas.clientWidth * pixelRatio);
      canvas.height = Math.round(canvas.clientHeight * pixelRatio);
      draw();
    });
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [draw]);

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute ${className}`}>
      <div className="absolute inset-0 bg-ink/45 mask-[radial-gradient(ellipse_50%_50%_at_center,black_10%,transparent_100%)]" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full text-ink" />
    </div>
  );
}
