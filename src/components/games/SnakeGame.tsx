import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { RotateCcw, ArrowLeft, Pause, Play } from 'lucide-react';

interface SnakeGameProps {
  onBack: () => void;
}

const CELL_SIZE = 20;
const GRID_W = 22;
const GRID_H = 22;
const CANVAS_WIDTH = GRID_W * CELL_SIZE;
const CANVAS_HEIGHT = GRID_H * CELL_SIZE;
const BASE_TICK_MS = 115; // ~8.7 ticks/sec
const MIN_TICK_MS = 62;   // ~16 ticks/sec cap
const SPEED_STEP = 4;     // every 4 points, speed up

type Dir = 'up' | 'down' | 'left' | 'right';
type Pos = { x: number; y: number };

const opposite: Record<Dir, Dir> = { up: 'down', down: 'up', left: 'right', right: 'left' };

const SnakeGame: React.FC<SnakeGameProps> = ({ onBack }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => parseInt(localStorage.getItem('snake-best') || '0', 10));
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);

  const isDark = document.documentElement.classList.contains('dark');

  const stateRef = useRef({
    snake: [{ x: 10, y: 11 }, { x: 9, y: 11 }, { x: 8, y: 11 }] as Pos[],
    dir: 'right' as Dir,
    nextDir: 'right' as Dir,
    food: { x: 15, y: 11 } as Pos,
    score: 0,
    gameOver: false,
    paused: false,
    popAnim: 0,
  });

  const spawnFood = useCallback(() => {
    const s = stateRef.current;
    let pos: Pos;
    do {
      pos = { x: Math.floor(Math.random() * GRID_W), y: Math.floor(Math.random() * GRID_H) };
    } while (s.snake.some(p => p.x === pos.x && p.y === pos.y));
    s.food = pos;
  }, []);

  const resetGame = useCallback(() => {
    stateRef.current = {
      snake: [{ x: 10, y: 11 }, { x: 9, y: 11 }, { x: 8, y: 11 }],
      dir: 'right',
      nextDir: 'right',
      food: { x: 15, y: 11 },
      score: 0,
      gameOver: false,
      paused: false,
      popAnim: 0,
    };
    setScore(0);
    setGameOver(false);
    setPaused(false);
    setStarted(true);
  }, []);

  const getTickMs = useCallback((sc: number) => {
    return Math.max(MIN_TICK_MS, BASE_TICK_MS - Math.floor(sc / SPEED_STEP) * 8);
  }, []);

  // Draw
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const s = stateRef.current;

    const bg = isDark ? '#1a1a1a' : '#f0f4f8';
    const gridLine = isDark ? '#222' : '#e2e8f0';
    const snakeColor = '#f97316';
    const snakeHead = '#ea580c';
    const foodColor = '#ef4444';

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Grid lines (subtle)
    ctx.strokeStyle = gridLine;
    ctx.lineWidth = 0.5;
    for (let x = 0; x <= GRID_W; x++) {
      ctx.beginPath();
      ctx.moveTo(x * CELL_SIZE, 0);
      ctx.lineTo(x * CELL_SIZE, CANVAS_HEIGHT);
      ctx.stroke();
    }
    for (let y = 0; y <= GRID_H; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * CELL_SIZE);
      ctx.lineTo(CANVAS_WIDTH, y * CELL_SIZE);
      ctx.stroke();
    }

    // Food
    const foodRadius = CELL_SIZE / 2 - 2 + (s.popAnim > 0 ? 3 : 0);
    ctx.fillStyle = foodColor;
    ctx.beginPath();
    ctx.arc(s.food.x * CELL_SIZE + CELL_SIZE / 2, s.food.y * CELL_SIZE + CELL_SIZE / 2, foodRadius, 0, Math.PI * 2);
    ctx.fill();
    // Stem
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(s.food.x * CELL_SIZE + CELL_SIZE / 2, s.food.y * CELL_SIZE + CELL_SIZE / 2 - foodRadius);
    ctx.lineTo(s.food.x * CELL_SIZE + CELL_SIZE / 2 + 3, s.food.y * CELL_SIZE + CELL_SIZE / 2 - foodRadius - 5);
    ctx.stroke();

    // Snake
    s.snake.forEach((seg, i) => {
      const r = CELL_SIZE / 2 - 1;
      ctx.fillStyle = i === 0 ? snakeHead : snakeColor;
      ctx.beginPath();
      ctx.roundRect(seg.x * CELL_SIZE + 1, seg.y * CELL_SIZE + 1, CELL_SIZE - 2, CELL_SIZE - 2, [4]);
      ctx.fill();

      // Eyes on head
      if (i === 0) {
        ctx.fillStyle = isDark ? '#0f0f0f' : '#fff';
        const cx = seg.x * CELL_SIZE + CELL_SIZE / 2;
        const cy = seg.y * CELL_SIZE + CELL_SIZE / 2;
        const offsets: Record<Dir, [number, number][]> = {
          right: [[4, -3], [4, 3]],
          left: [[-4, -3], [-4, 3]],
          up: [[-3, -4], [3, -4]],
          down: [[-3, 4], [3, 4]],
        };
        offsets[s.dir].forEach(([ox, oy]) => {
          ctx.beginPath();
          ctx.arc(cx + ox, cy + oy, 2, 0, Math.PI * 2);
          ctx.fill();
        });
      }
    });

    // Score
    const fgColor = isDark ? '#f5f5f5' : '#1a1a1a';
    ctx.fillStyle = fgColor;
    ctx.font = 'bold 16px monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`Score: ${s.score}`, 8, 18);
    ctx.textAlign = 'right';
    ctx.fillText(`Best: ${Math.max(s.score, parseInt(localStorage.getItem('snake-best') || '0', 10))}`, CANVAS_WIDTH - 8, 18);

    if (!started) {
      ctx.fillStyle = fgColor;
      ctx.font = '14px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('Cliquez ou ESPACE pour jouer', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 40);
    }

    if (s.paused && !s.gameOver) {
      ctx.fillStyle = fgColor;
      ctx.font = 'bold 24px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('PAUSE', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    }

    if (s.popAnim > 0) s.popAnim--;
  }, [isDark, started]);

  // Tick
  const tick = useCallback(() => {
    const s = stateRef.current;
    if (s.gameOver || s.paused) return;

    s.dir = s.nextDir;
    const head = { ...s.snake[0] };
    if (s.dir === 'up') head.y--;
    else if (s.dir === 'down') head.y++;
    else if (s.dir === 'left') head.x--;
    else head.x++;

    // Wall collision
    if (head.x < 0 || head.x >= GRID_W || head.y < 0 || head.y >= GRID_H) {
      s.gameOver = true;
      setGameOver(true);
      setScore(s.score);
      const best = Math.max(s.score, parseInt(localStorage.getItem('snake-best') || '0', 10));
      localStorage.setItem('snake-best', String(best));
      setBestScore(best);
      return;
    }

    // Self collision
    if (s.snake.some(seg => seg.x === head.x && seg.y === head.y)) {
      s.gameOver = true;
      setGameOver(true);
      setScore(s.score);
      const best = Math.max(s.score, parseInt(localStorage.getItem('snake-best') || '0', 10));
      localStorage.setItem('snake-best', String(best));
      setBestScore(best);
      return;
    }

    s.snake.unshift(head);

    // Eat food
    if (head.x === s.food.x && head.y === s.food.y) {
      s.score++;
      s.popAnim = 4;
      setScore(s.score);
      spawnFood();
    } else {
      s.snake.pop();
    }
  }, [spawnFood]);

  // Game loop
  useEffect(() => {
    if (!started || gameOver) {
      // Still draw
      const raf = requestAnimationFrame(draw);
      return () => cancelAnimationFrame(raf);
    }

    let lastTick = 0;
    let rafId: number;

    const loop = (time: number) => {
      const ms = getTickMs(stateRef.current.score);
      if (time - lastTick >= ms) {
        tick();
        lastTick = time;
      }
      draw();
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [started, gameOver, paused, draw, tick, getTickMs]);

  // Input
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !started) {
        e.preventDefault();
        resetGame();
        return;
      }

      if (e.code === 'KeyP') {
        const s = stateRef.current;
        if (!s.gameOver && started) {
          s.paused = !s.paused;
          setPaused(s.paused);
        }
        return;
      }

      const s = stateRef.current;
      if (s.gameOver || s.paused) return;

      let newDir: Dir | null = null;
      if (e.code === 'ArrowUp' || e.code === 'KeyW') newDir = 'up';
      else if (e.code === 'ArrowDown' || e.code === 'KeyS') newDir = 'down';
      else if (e.code === 'ArrowLeft' || e.code === 'KeyA') newDir = 'left';
      else if (e.code === 'ArrowRight' || e.code === 'KeyD') newDir = 'right';

      if (newDir && newDir !== opposite[s.dir]) {
        e.preventDefault();
        s.nextDir = newDir;
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [started, resetGame]);

  // Touch/swipe support
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let touchStart: Pos | null = null;

    const onTouchStart = (e: TouchEvent) => {
      if (!started) { resetGame(); return; }
      const t = e.touches[0];
      touchStart = { x: t.clientX, y: t.clientY };
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (!touchStart) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - touchStart.x;
      const dy = t.clientY - touchStart.y;
      const s = stateRef.current;
      if (s.gameOver || s.paused) return;

      if (Math.abs(dx) > Math.abs(dy)) {
        const newDir: Dir = dx > 0 ? 'right' : 'left';
        if (newDir !== opposite[s.dir]) s.nextDir = newDir;
      } else {
        const newDir: Dir = dy > 0 ? 'down' : 'up';
        if (newDir !== opposite[s.dir]) s.nextDir = newDir;
      }
      touchStart = null;
    };

    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    canvas.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchend', onTouchEnd);
    };
  }, [started, resetGame]);

  const togglePause = () => {
    const s = stateRef.current;
    if (!s.gameOver && started) {
      s.paused = !s.paused;
      setPaused(s.paused);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center gap-4"
    >
      <div className="flex gap-2 mb-2">
        {started && !gameOver && (
          <Button size="sm" variant="outline" onClick={togglePause} className="gap-1">
            {paused ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
            {paused ? 'Reprendre' : 'Pause'}
          </Button>
        )}
      </div>

      <div className="relative rounded-2xl border border-border bg-background/80 backdrop-blur-md p-4 shadow-lg overflow-hidden">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          onClick={() => { if (!started) resetGame(); }}
          className="cursor-pointer max-w-full"
          style={{ imageRendering: 'pixelated' }}
        />
        {gameOver && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm rounded-2xl"
          >
            <h3 className="text-3xl font-bold text-primary mb-2">Game Over</h3>
            <p className="text-lg text-muted-foreground mb-1">
              Score : <span className="text-foreground font-bold">{score}</span>
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Best : <span className="text-primary font-bold">{bestScore}</span>
            </p>
            <div className="flex gap-4">
              <Button onClick={resetGame} className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                <RotateCcw className="h-4 w-4" /> Rejouer
              </Button>
              <Button variant="outline" onClick={onBack} className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Mini-jeux
              </Button>
            </div>
          </motion.div>
        )}
      </div>
      <p className="text-sm text-muted-foreground">Flèches / WASD pour diriger · P pour pause · Swipe sur mobile</p>
    </motion.div>
  );
};

export default SnakeGame;
