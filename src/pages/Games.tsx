import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Play, Lock, Building2, Construction } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DinoRunner from '@/components/games/DinoRunner';
import FlappyBird from '@/components/games/FlappyBird';
import SnakeGame from '@/components/games/SnakeGame';
import GuessBuilding from '@/components/games/GuessBuilding';
import TowerCrane from '@/components/games/TowerCrane';

interface GameCard {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  available: boolean;
}

const games: GameCard[] = [
  {
    id: 'dino',
    name: 'Dino Runner',
    description: 'Évite les obstacles et bats ton record !',
    icon: <span className="text-3xl">🦕</span>,
    available: true,
  },
  {
    id: 'flappy',
    name: 'Flappy Bird',
    description: 'Passe entre les tuyaux. Un clic = un flap.',
    icon: <span className="text-3xl">🐦</span>,
    available: true,
  },
  {
    id: 'snake',
    name: 'Snake',
    description: 'Mange, grandis, évite-toi.',
    icon: <span className="text-3xl">🐍</span>,
    available: true,
  },
  {
    id: 'guess-building',
    name: 'Guess the Building',
    description: 'Reconnais les bâtiments iconiques du monde.',
    icon: <Building2 className="h-8 w-8 text-primary" />,
    available: true,
  },
  {
    id: 'tower-crane',
    name: 'Tower Crane Challenge',
    description: 'Construis la tour la plus stable possible.',
    icon: <Construction className="h-8 w-8 text-primary" />,
    available: true,
  },
  {
    id: 'coming-1',
    name: 'Bientôt…',
    description: 'Un nouveau mini-jeu arrive.',
    icon: <Lock className="h-8 w-8 text-muted-foreground" />,
    available: false,
  },
];

const Games = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  const renderGame = () => {
    if (activeGame === 'dino') {
      return (
        <motion.div
          key="dino"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="flex flex-col items-center pt-10"
        >
          <h2 className="text-3xl font-bold text-primary mb-8">Dino Runner</h2>
          <DinoRunner onBack={() => setActiveGame(null)} />
        </motion.div>
      );
    }
    if (activeGame === 'flappy') {
      return (
        <motion.div
          key="flappy"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="flex flex-col items-center pt-10"
        >
          <h2 className="text-3xl font-bold text-primary mb-8">Flappy Bird</h2>
          <FlappyBird onBack={() => setActiveGame(null)} />
        </motion.div>
      );
    }
    if (activeGame === 'snake') {
      return (
        <motion.div
          key="snake"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="flex flex-col items-center pt-10"
        >
          <h2 className="text-3xl font-bold text-primary mb-8">Snake</h2>
          <SnakeGame onBack={() => setActiveGame(null)} />
        </motion.div>
      );
    }
    if (activeGame === 'guess-building') {
      return (
        <motion.div
          key="guess-building"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="flex flex-col items-center pt-10 w-full"
        >
          <h2 className="text-3xl font-bold text-primary mb-8">Guess the Building</h2>
          <GuessBuilding onBack={() => setActiveGame(null)} />
        </motion.div>
      );
    }
    if (activeGame === 'tower-crane') {
      return (
        <motion.div
          key="tower-crane"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="flex flex-col items-center pt-10 w-full"
        >
          <h2 className="text-3xl font-bold text-primary mb-8">Tower Crane Challenge</h2>
          <TowerCrane onBack={() => setActiveGame(null)} />
        </motion.div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen px-6 py-20">
      <div className="max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          {activeGame ? (
            renderGame()
          ) : (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Header */}
              <div className="text-center mb-12">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-3 mb-4"
                >
                  <Gamepad2 className="h-10 w-10 text-primary" />
                  <h1 className="text-5xl font-black text-foreground">Mini Games</h1>
                </motion.div>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg text-muted-foreground"
                >
                  Quelques mini-jeux cachés dans mon portfolio.
                </motion.p>
              </div>

              {/* Game Cards Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {games.map((game, index) => (
                  <motion.div
                    key={game.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                    whileHover={game.available ? { scale: 1.03, y: -4 } : {}}
                    className={`group relative rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-6 shadow-sm transition-shadow duration-300 ${
                      game.available
                        ? 'hover:shadow-lg hover:shadow-primary/10 hover:border-primary/40 cursor-pointer'
                        : 'opacity-60'
                    }`}
                  >
                    <div className="flex flex-col items-center text-center gap-4">
                      <div className="p-4 rounded-xl bg-muted/50 group-hover:bg-primary/10 transition-colors duration-300">
                        {game.icon}
                      </div>
                      <h3 className="text-xl font-bold text-foreground">{game.name}</h3>
                      <p className="text-sm text-muted-foreground">{game.description}</p>
                      {game.available ? (
                        <Button
                          onClick={() => setActiveGame(game.id)}
                          className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 mt-2"
                        >
                          <Play className="h-4 w-4" /> Play
                        </Button>
                      ) : (
                        <Button disabled variant="outline" className="mt-2 gap-2">
                          <Lock className="h-4 w-4" /> Bientôt
                        </Button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Games;
