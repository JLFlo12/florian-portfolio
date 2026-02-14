import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { RotateCcw, ArrowLeft } from 'lucide-react';

interface DinoRunnerProps {
  onBack: () => void;
}

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 250;
const GROUND_Y = 200;
const DINO_WIDTH = 40;
const DINO_HEIGHT = 50;
const GRAVITY = 0.45;
const JUMP_FORCE = -11;
const OBSTACLE_WIDTH = 18;
const OBSTACLE_MIN_HEIGHT = 25;
const OBSTACLE_MAX_HEIGHT = 42;
const GAME_SPEED_INITIAL = 3;
const GAME_SPEED_INCREMENT = 0.0006;

const DinoRunner: React.FC<DinoRunnerProps> = ({ onBack }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);
  const gameStateRef = useRef({
    dinoY: GROUND_Y - DINO_HEIGHT,
    dinoVelocity: 0,
    isJumping: false,
    obstacles: [] as { x: number; height: number }[],
    gameSpeed: GAME_SPEED_INITIAL,
    score: 0,
    frameCount: 0,
    gameOver: false,
  });

  const isDark = document.documentElement.classList.contains('dark');

  const resetGame = useCallback(() => {
    gameStateRef.current = {
      dinoY: GROUND_Y - DINO_HEIGHT,
      dinoVelocity: 0,
      isJumping: false,
      obstacles: [],
      gameSpeed: GAME_SPEED_INITIAL,
      score: 0,
      frameCount: 0,
      gameOver: false,
    };
    setScore(0);
    setGameOver(false);
    setStarted(true);
  }, []);

  const jump = useCallback(() => {
    if (!started) {
      resetGame();
      return;
    }
    const state = gameStateRef.current;
    if (state.gameOver) return;
    if (!state.isJumping) {
      state.dinoVelocity = JUMP_FORCE;
      state.isJumping = true;
    }
  }, [started, resetGame]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        jump();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [jump]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const fgColor = isDark ? '#f5f5f5' : '#1a1a1a';
    const groundColor = isDark ? '#444' : '#ccc';
    const primaryColor = '#f97316';

    const draw = () => {
      const state = gameStateRef.current;
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Ground
      ctx.strokeStyle = groundColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, GROUND_Y);
      ctx.lineTo(CANVAS_WIDTH, GROUND_Y);
      ctx.stroke();

      // Dino
      ctx.fillStyle = primaryColor;
      const dinoX = 60;
      // Body
      ctx.fillRect(dinoX, state.dinoY, DINO_WIDTH, DINO_HEIGHT);
      // Eye
      ctx.fillStyle = isDark ? '#0f0f0f' : '#fff';
      ctx.fillRect(dinoX + 28, state.dinoY + 8, 6, 6);
      // Legs
      ctx.fillStyle = primaryColor;
      if (state.isJumping) {
        ctx.fillRect(dinoX + 8, state.dinoY + DINO_HEIGHT, 8, 8);
        ctx.fillRect(dinoX + 24, state.dinoY + DINO_HEIGHT, 8, 8);
      } else {
        const legOffset = Math.floor(state.frameCount / 6) % 2 === 0 ? 0 : 6;
        ctx.fillRect(dinoX + 8, state.dinoY + DINO_HEIGHT, 8, 6 + legOffset);
        ctx.fillRect(dinoX + 24, state.dinoY + DINO_HEIGHT, 8, 12 - legOffset);
      }

      // Obstacles
      ctx.fillStyle = fgColor;
      state.obstacles.forEach(obs => {
        ctx.fillRect(obs.x, GROUND_Y - obs.height, OBSTACLE_WIDTH, obs.height);
        // Cactus top spikes
        ctx.fillRect(obs.x - 4, GROUND_Y - obs.height, 4, 10);
        ctx.fillRect(obs.x + OBSTACLE_WIDTH, GROUND_Y - obs.height, 4, 10);
      });

      // Score
      ctx.fillStyle = fgColor;
      ctx.font = '16px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(`Score: ${Math.floor(state.score)}`, CANVAS_WIDTH - 20, 30);

      if (!started) {
        ctx.fillStyle = fgColor;
        ctx.font = '18px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Appuyez sur ESPACE ou cliquez pour jouer', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
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
      state.dinoVelocity += GRAVITY;
      state.dinoY += state.dinoVelocity;
      if (state.dinoY >= GROUND_Y - DINO_HEIGHT) {
        state.dinoY = GROUND_Y - DINO_HEIGHT;
        state.dinoVelocity = 0;
        state.isJumping = false;
      }

      // Obstacles
      state.frameCount++;
      state.gameSpeed += GAME_SPEED_INCREMENT;
      state.score += state.gameSpeed * 0.05;

      if (state.frameCount % Math.max(80, Math.floor(150 - state.score / 5)) === 0) {
        const h = OBSTACLE_MIN_HEIGHT + Math.random() * (OBSTACLE_MAX_HEIGHT - OBSTACLE_MIN_HEIGHT);
        state.obstacles.push({ x: CANVAS_WIDTH, height: h });
      }

      state.obstacles = state.obstacles.filter(obs => {
        obs.x -= state.gameSpeed;
        return obs.x > -OBSTACLE_WIDTH;
      });

      // Collision
      const dinoX = 60;
      for (const obs of state.obstacles) {
        if (
          dinoX + DINO_WIDTH - 5 > obs.x &&
          dinoX + 5 < obs.x + OBSTACLE_WIDTH &&
          state.dinoY + DINO_HEIGHT > GROUND_Y - obs.height
        ) {
          state.gameOver = true;
          setGameOver(true);
          setScore(Math.floor(state.score));
          break;
        }
      }

      if (!state.gameOver) {
        setScore(Math.floor(state.score));
      }

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
          onClick={jump}
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
            <p className="text-lg text-muted-foreground mb-6">
              Score : <span className="text-foreground font-bold">{score}</span>
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
      <p className="text-sm text-muted-foreground">Espace ou clic pour sauter</p>
    </motion.div>
  );
};

export default DinoRunner;
