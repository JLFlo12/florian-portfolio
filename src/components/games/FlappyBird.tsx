import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { RotateCcw, ArrowLeft } from 'lucide-react';

interface FlappyBirdProps {
  onBack: () => void;
}

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 600;
const BIRD_SIZE = 24;
const BIRD_X = 80;
const GRAVITY = 0.48;
const FLAP_FORCE = -6.6;
const PIPE_WIDTH = 50;
const PIPE_GAP = 150;
const PIPE_GAP_MIN = 120;
const PIPE_SPEED_INITIAL = 3.6;
const PIPE_SPAWN_INTERVAL = 80; // frames
const HITBOX_SHRINK = 4; // pixels to shrink bird hitbox

const FlappyBird: React.FC<FlappyBirdProps> = ({ onBack }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => {
    return parseInt(localStorage.getItem('flappy-best') || '0', 10);
  });
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);

  const isDark = document.documentElement.classList.contains('dark');

  const gameStateRef = useRef({
    birdY: CANVAS_HEIGHT / 2,
    birdVelocity: 0,
    pipes: [] as { x: number; topH: number; scored: boolean }[],
    score: 0,
    frameCount: 0,
    gameOver: false,
    speed: PIPE_SPEED_INITIAL,
    birdRotation: 0,
  });

  const resetGame = useCallback(() => {
    gameStateRef.current = {
      birdY: CANVAS_HEIGHT / 2,
      birdVelocity: 0,
      pipes: [],
      score: 0,
      frameCount: 0,
      gameOver: false,
      speed: PIPE_SPEED_INITIAL,
      birdRotation: 0,
    };
    setScore(0);
    setGameOver(false);
    setStarted(true);
  }, []);

  const flap = useCallback(() => {
    if (!started) {
      resetGame();
      return;
    }
    const state = gameStateRef.current;
    if (state.gameOver) return;
    state.birdVelocity = FLAP_FORCE;
  }, [started, resetGame]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        flap();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [flap]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const fgColor = isDark ? '#f5f5f5' : '#1a1a1a';
    const bgColor = isDark ? '#1a1a1a' : '#f0f4f8';
    const pipeColor = isDark ? '#3a3a3a' : '#6b7280';
    const primaryColor = '#f97316';
    const groundColor = isDark ? '#333' : '#a3a3a3';

    const draw = () => {
      const state = gameStateRef.current;
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Background
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Pipes
      state.pipes.forEach(pipe => {
        ctx.fillStyle = pipeColor;
        // Top pipe
        ctx.beginPath();
        ctx.roundRect(pipe.x, 0, PIPE_WIDTH, pipe.topH, [0, 0, 8, 8]);
        ctx.fill();
        // Bottom pipe
        const bottomY = pipe.topH + PIPE_GAP;
        ctx.beginPath();
        ctx.roundRect(pipe.x, bottomY, PIPE_WIDTH, CANVAS_HEIGHT - bottomY - 40, [8, 8, 0, 0]);
        ctx.fill();

        // Pipe caps
        ctx.fillStyle = isDark ? '#4a4a4a' : '#4b5563';
        ctx.fillRect(pipe.x - 4, pipe.topH - 20, PIPE_WIDTH + 8, 20);
        ctx.fillRect(pipe.x - 4, bottomY, PIPE_WIDTH + 8, 20);
      });

      // Ground
      ctx.fillStyle = groundColor;
      ctx.fillRect(0, CANVAS_HEIGHT - 40, CANVAS_WIDTH, 40);

      // Bird
      ctx.save();
      ctx.translate(BIRD_X + BIRD_SIZE / 2, state.birdY + BIRD_SIZE / 2);
      const rotation = Math.min(Math.max(state.birdVelocity * 4, -30), 70) * (Math.PI / 180);
      ctx.rotate(rotation);

      // Body
      ctx.fillStyle = primaryColor;
      ctx.beginPath();
      ctx.ellipse(0, 0, BIRD_SIZE / 2 + 2, BIRD_SIZE / 2, 0, 0, Math.PI * 2);
      ctx.fill();

      // Eye
      ctx.fillStyle = isDark ? '#0f0f0f' : '#fff';
      ctx.beginPath();
      ctx.arc(6, -4, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(7, -4, 2, 0, Math.PI * 2);
      ctx.fill();

      // Beak
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.moveTo(BIRD_SIZE / 2, -2);
      ctx.lineTo(BIRD_SIZE / 2 + 8, 2);
      ctx.lineTo(BIRD_SIZE / 2, 6);
      ctx.closePath();
      ctx.fill();

      // Wing
      ctx.fillStyle = '#ea580c';
      ctx.beginPath();
      ctx.ellipse(-4, 4, 8, 5, -0.3, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // Score
      ctx.fillStyle = fgColor;
      ctx.font = 'bold 28px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`${Math.floor(state.score)}`, CANVAS_WIDTH / 2, 50);

      if (!started) {
        ctx.fillStyle = fgColor;
        ctx.font = '16px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Cliquez ou ESPACE pour jouer', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 60);
      }
    };

    const update = () => {
      const state = gameStateRef.current;
      if (state.gameOver || !started) {
        draw();
        animationRef.current = requestAnimationFrame(update);
        return;
      }

      // Physics
      state.birdVelocity += GRAVITY;
      state.birdY += state.birdVelocity;

      // Ceiling
      if (state.birdY < 0) {
        state.birdY = 0;
        state.birdVelocity = 0;
      }

      // Ground collision
      if (state.birdY + BIRD_SIZE >= CANVAS_HEIGHT - 40) {
        state.gameOver = true;
        setGameOver(true);
        setScore(Math.floor(state.score));
        const best = Math.max(Math.floor(state.score), parseInt(localStorage.getItem('flappy-best') || '0', 10));
        localStorage.setItem('flappy-best', String(best));
        setBestScore(best);
      }

      // Spawn pipes
      state.frameCount++;
      if (state.frameCount % PIPE_SPAWN_INTERVAL === 0) {
        const minTop = 60;
        const maxTop = CANVAS_HEIGHT - PIPE_GAP - 100;
        const topH = minTop + Math.random() * (maxTop - minTop);
        state.pipes.push({ x: CANVAS_WIDTH, topH, scored: false });
      }

      // Speed increase — after 3 points, moderate
      if (state.score >= 3) {
        state.speed = PIPE_SPEED_INITIAL + (state.score - 3) * 0.045;
      }

      // Update gap — moderate reduction, never below PIPE_GAP_MIN
      const currentGap = Math.max(PIPE_GAP_MIN, PIPE_GAP - Math.floor(state.score / 5) * 4);

      // Move pipes & check collision
      state.pipes = state.pipes.filter(pipe => {
        pipe.x -= state.speed;

        // Score
        if (!pipe.scored && pipe.x + PIPE_WIDTH < BIRD_X) {
          pipe.scored = true;
          state.score += 1;
          setScore(state.score);
        }

        // Collision with pipes (shrunken hitbox)
        if (
          BIRD_X + BIRD_SIZE - HITBOX_SHRINK > pipe.x &&
          BIRD_X + HITBOX_SHRINK < pipe.x + PIPE_WIDTH
        ) {
          if (state.birdY + HITBOX_SHRINK < pipe.topH || state.birdY + BIRD_SIZE - HITBOX_SHRINK > pipe.topH + currentGap) {
            state.gameOver = true;
            setGameOver(true);
            setScore(Math.floor(state.score));
            const best = Math.max(Math.floor(state.score), parseInt(localStorage.getItem('flappy-best') || '0', 10));
            localStorage.setItem('flappy-best', String(best));
            setBestScore(best);
          }
        }

        return pipe.x > -PIPE_WIDTH;
      });

      draw();
      animationRef.current = requestAnimationFrame(update);
    };

    animationRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationRef.current);
  }, [started, isDark]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center gap-6"
    >
      <div className="relative rounded-2xl border border-border bg-background/80 backdrop-blur-md p-4 shadow-lg overflow-hidden">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          onClick={flap}
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
      <p className="text-sm text-muted-foreground">Espace ou clic pour flap</p>
    </motion.div>
  );
};

export default FlappyBird;
