import React, { useRef, useEffect, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCcw } from 'lucide-react';

interface TowerCraneProps {
  onBack: () => void;
}

// ── Constants ──
const CANVAS_W = 480;
const CANVAS_H = 640;
const GRAVITY = 0.18;
const DROP_SPEED_INIT = 0;
const CRANE_Y = 40;
const CRANE_SPEED = 2.2;
const GROUND_Y = CANVAS_H - 40;
const TILT_THRESHOLD = 0.45; // radians – generous tolerance
const ALIGN_BONUS_PX = 6;
const BLOCK_COLORS = ['#f5c518', '#d4d4d4', '#a3a3a3', '#f59e0b', '#78716c'];
const LS_KEY = 'tower-crane-best';

interface Block {
  x: number;
  y: number;
  w: number;
  h: number;
  vx: number;
  vy: number;
  color: string;
  settled: boolean;
  tilt: number; // radians
  vTilt: number;
}

type Shape = { w: number; h: number };
const SHAPES: Shape[] = [
  { w: 60, h: 60 },   // square
  { w: 80, h: 40 },   // rectangle
  { w: 40, h: 80 },   // tall
  { w: 100, h: 30 },  // long
  { w: 50, h: 50 },   // compact
];

function randomShape(): Shape {
  return SHAPES[Math.floor(Math.random() * SHAPES.length)];
}
function randomColor(): string {
  return BLOCK_COLORS[Math.floor(Math.random() * BLOCK_COLORS.length)];
}

const TowerCrane: React.FC<TowerCraneProps> = ({ onBack }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<{
    blocks: Block[];
    crane: { x: number; dir: number };
    pending: { shape: Shape; color: string } | null;
    dropping: Block | null;
    score: number;
    bestScore: number;
    gameOver: boolean;
    shakeFrames: number;
    started: boolean;
  }>({
    blocks: [],
    crane: { x: CANVAS_W / 2, dir: 1 },
    pending: { shape: randomShape(), color: randomColor() },
    dropping: null,
    score: 0,
    bestScore: parseInt(localStorage.getItem(LS_KEY) || '0', 10),
    gameOver: false,
    shakeFrames: 0,
    started: false,
  });
  const rafRef = useRef<number>(0);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => parseInt(localStorage.getItem(LS_KEY) || '0', 10));
  const [gameOver, setGameOver] = useState(false);

  // ── Drop handler ──
  const drop = useCallback(() => {
    const s = stateRef.current;
    if (s.gameOver || s.dropping || !s.pending) return;
    s.started = true;
    const shape = s.pending.shape;
    const block: Block = {
      x: s.crane.x - shape.w / 2,
      y: CRANE_Y + 30,
      w: shape.w,
      h: shape.h,
      vx: 0,
      vy: DROP_SPEED_INIT,
      color: s.pending.color,
      settled: false,
      tilt: 0,
      vTilt: 0,
    };
    s.dropping = block;
    s.pending = null;
  }, []);

  // ── Restart ──
  const restart = useCallback(() => {
    const s = stateRef.current;
    s.blocks = [];
    s.crane = { x: CANVAS_W / 2, dir: 1 };
    s.pending = { shape: randomShape(), color: randomColor() };
    s.dropping = null;
    s.score = 0;
    s.gameOver = false;
    s.shakeFrames = 0;
    s.started = false;
    setScore(0);
    setGameOver(false);
  }, []);

  // ── Game loop ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const loop = () => {
      const s = stateRef.current;
      // ── Update ──
      if (!s.gameOver) {
        // Crane movement
        if (!s.dropping) {
          s.crane.x += CRANE_SPEED * s.crane.dir;
          if (s.crane.x > CANVAS_W - 40) s.crane.dir = -1;
          if (s.crane.x < 40) s.crane.dir = 1;
        }

        // Dropping block physics
        if (s.dropping) {
          const b = s.dropping;
          b.vy += GRAVITY;
          b.y += b.vy;

          // Check landing
          let landY = GROUND_Y - b.h;
          let landedOn: Block | null = null;

          for (const sb of s.blocks) {
            if (sb.settled) {
              const overlapX = Math.min(b.x + b.w, sb.x + sb.w) - Math.max(b.x, sb.x);
              if (overlapX > 4) {
                const topOfBlock = sb.y - b.h;
                if (topOfBlock < landY) {
                  landY = topOfBlock;
                  landedOn = sb;
                }
              }
            }
          }

          if (b.y >= landY) {
            b.y = landY;
            b.vy = 0;
            b.settled = true;

            // Check if out of bounds
            if (b.x + b.w < 0 || b.x > CANVAS_W) {
              s.gameOver = true;
              if (s.score > s.bestScore) {
                s.bestScore = s.score;
                localStorage.setItem(LS_KEY, String(s.score));
                setBestScore(s.score);
              }
              setGameOver(true);
            } else {
              // Calculate overhang for tilt check
              let overhang = 0;
              if (landedOn) {
                const blockCenter = b.x + b.w / 2;
                const supportCenter = landedOn.x + landedOn.w / 2;
                overhang = Math.abs(blockCenter - supportCenter);
                const supportEdge = landedOn.w / 2;
                const ratio = overhang / (supportEdge + b.w / 2);

                if (ratio > TILT_THRESHOLD) {
                  // Tower collapses
                  s.shakeFrames = 12;
                  s.gameOver = true;
                  if (s.score > s.bestScore) {
                    s.bestScore = s.score;
                    localStorage.setItem(LS_KEY, String(s.score));
                    setBestScore(s.score);
                  }
                  setGameOver(true);
                } else {
                  // Score
                  s.score += 1;
                  if (overhang < ALIGN_BONUS_PX) s.score += 1; // alignment bonus
                  setScore(s.score);
                  s.shakeFrames = 4;
                }
              } else {
                // Landed on ground
                s.score += 1;
                setScore(s.score);
              }

              s.blocks.push(b);
              s.dropping = null;
              s.pending = { shape: randomShape(), color: randomColor() };
            }
          }
        }
      }

      if (s.shakeFrames > 0) s.shakeFrames--;

      // ── Draw ──
      ctx.save();
      // Camera shake
      if (s.shakeFrames > 0) {
        const sx = (Math.random() - 0.5) * 6;
        const sy = (Math.random() - 0.5) * 6;
        ctx.translate(sx, sy);
      }

      // Sky gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, CANVAS_H);
      skyGrad.addColorStop(0, '#1a1a2e');
      skyGrad.addColorStop(1, '#2d2d44');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

      // Ground
      ctx.fillStyle = '#4a4a4a';
      ctx.fillRect(0, GROUND_Y, CANVAS_W, CANVAS_H - GROUND_Y);
      // Ground stripe
      ctx.fillStyle = '#f5c518';
      ctx.fillRect(0, GROUND_Y, CANVAS_W, 3);

      // Crane structure
      const craneX = s.dropping ? s.dropping.x + (s.dropping.w / 2) : s.crane.x;
      // Vertical arm
      ctx.strokeStyle = '#f5c518';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(craneX, 0);
      ctx.lineTo(craneX, CRANE_Y + 20);
      ctx.stroke();
      // Hook
      ctx.fillStyle = '#a3a3a3';
      ctx.fillRect(craneX - 3, CRANE_Y + 20, 6, 12);
      // Horizontal arm (top)
      ctx.strokeStyle = '#f5c518';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, 8);
      ctx.lineTo(CANVAS_W, 8);
      ctx.stroke();

      // Cable from arm to hook
      if (s.pending && !s.dropping) {
        ctx.strokeStyle = '#78716c';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(craneX, 8);
        ctx.lineTo(craneX, CRANE_Y + 20);
        ctx.stroke();
      }

      // Pending block (on crane)
      if (s.pending && !s.dropping) {
        const shape = s.pending.shape;
        const bx = s.crane.x - shape.w / 2;
        const by = CRANE_Y + 32;
        ctx.fillStyle = s.pending.color;
        ctx.fillRect(bx, by, shape.w, shape.h);
        ctx.strokeStyle = 'rgba(0,0,0,0.3)';
        ctx.lineWidth = 1;
        ctx.strokeRect(bx, by, shape.w, shape.h);
      }

      // Dropping block
      if (s.dropping) {
        const b = s.dropping;
        ctx.fillStyle = b.color;
        ctx.fillRect(b.x, b.y, b.w, b.h);
        ctx.strokeStyle = 'rgba(0,0,0,0.3)';
        ctx.lineWidth = 1;
        ctx.strokeRect(b.x, b.y, b.w, b.h);
        // Cable
        ctx.strokeStyle = '#78716c';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(b.x + b.w / 2, 8);
        ctx.lineTo(b.x + b.w / 2, b.y);
        ctx.stroke();
      }

      // Settled blocks
      for (const b of s.blocks) {
        ctx.fillStyle = b.color;
        ctx.fillRect(b.x, b.y, b.w, b.h);
        ctx.strokeStyle = 'rgba(0,0,0,0.25)';
        ctx.lineWidth = 1;
        ctx.strokeRect(b.x, b.y, b.w, b.h);
      }

      // Score HUD
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 18px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`Score: ${s.score}`, 12, 30);
      ctx.textAlign = 'right';
      ctx.fillText(`Best: ${s.bestScore}`, CANVAS_W - 12, 30);

      // Start hint
      if (!s.started && !s.gameOver) {
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.font = '16px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Espace / Clic pour lâcher', CANVAS_W / 2, CANVAS_H / 2);
      }

      // Game over overlay
      if (s.gameOver) {
        ctx.fillStyle = 'rgba(0,0,0,0.6)';
        ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
        ctx.fillStyle = '#f5c518';
        ctx.font = 'bold 32px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', CANVAS_W / 2, CANVAS_H / 2 - 30);
        ctx.fillStyle = '#ffffff';
        ctx.font = '20px monospace';
        ctx.fillText(`Score: ${s.score}`, CANVAS_W / 2, CANVAS_H / 2 + 10);
        ctx.fillText(`Best: ${s.bestScore}`, CANVAS_W / 2, CANVAS_H / 2 + 40);
      }

      ctx.restore();
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // ── Input handlers ──
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        drop();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [drop]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center gap-4 w-full max-w-xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <Button variant="ghost" onClick={onBack} className="gap-2 text-muted-foreground">
          <ArrowLeft className="h-4 w-4" /> Retour
        </Button>
        <div className="flex gap-3 items-center">
          <span className="text-sm font-bold text-primary font-mono">Score : {score}</span>
          <span className="text-sm text-muted-foreground font-mono">Best : {bestScore}</span>
        </div>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={CANVAS_W}
        height={CANVAS_H}
        onClick={drop}
        onTouchStart={(e) => { e.preventDefault(); drop(); }}
        className="rounded-2xl border border-border shadow-lg cursor-pointer bg-card max-w-full"
        style={{ touchAction: 'none', aspectRatio: `${CANVAS_W}/${CANVAS_H}`, width: '100%', maxWidth: CANVAS_W }}
      />

      {/* Controls */}
      {gameOver && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-4">
          <Button onClick={restart} className="gap-2">
            <RotateCcw className="h-4 w-4" /> Rejouer
          </Button>
          <Button variant="outline" onClick={onBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Mini-jeux
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TowerCrane;
