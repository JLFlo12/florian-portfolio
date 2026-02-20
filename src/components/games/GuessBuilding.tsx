import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCcw, CheckCircle, XCircle, ChevronRight } from 'lucide-react';

interface GuessBuildingProps {
  onBack: () => void;
}

interface Building {
  name: string;
  image: string;
  info: string;
  country: string;
}

const ALL_BUILDINGS: Building[] = [
  // --- Iconiques ---
  { name: 'Sydney Opera House', image: '/buildings/sydney-opera.jpg', info: 'Sydney, Australie – 1973 – Arch. Jørn Utzon, voûtes en coquille de béton', country: '🇦🇺' },
  { name: 'Tour Eiffel', image: '/buildings/tour-eiffel.jpg', info: 'Paris, France – 1889 – Structure en fer puddlé, 10 100 tonnes', country: '🇫🇷' },
  { name: 'Burj Khalifa', image: '/buildings/burj-khalifa.jpg', info: 'Dubaï, EAU – 2010 – 828m, plus haut gratte-ciel du monde', country: '🇦🇪' },
  { name: 'Sagrada Familia', image: '/buildings/sagrada-familia.jpg', info: 'Barcelone, Espagne – depuis 1882 – Arch. Gaudí, colonnes arborescentes', country: '🇪🇸' },
  { name: 'Empire State Building', image: '/buildings/empire-state.jpg', info: 'New York, USA – 1931 – Structure acier, 443m, style Art Déco', country: '🇺🇸' },
  { name: 'Colisée', image: '/buildings/colisee.jpg', info: 'Rome, Italie – 80 ap. J.-C. – Béton romain, 50 000 spectateurs', country: '🇮🇹' },
  { name: 'Taj Mahal', image: '/buildings/taj-mahal.jpg', info: 'Agra, Inde – 1653 – Marbre blanc, symétrie parfaite', country: '🇮🇳' },
  { name: 'Guggenheim Bilbao', image: '/buildings/guggenheim-bilbao.jpg', info: 'Bilbao, Espagne – 1997 – Arch. Frank Gehry, revêtement titane', country: '🇪🇸' },
  { name: 'Big Ben', image: '/buildings/big-ben.jpg', info: 'Londres, Royaume-Uni – 1859 – Tour horloge néo-gothique, 96m', country: '🇬🇧' },
  { name: 'Marina Bay Sands', image: '/buildings/marina-bay.jpg', info: 'Singapour – 2010 – Arch. Moshe Safdie, SkyPark de 340m', country: '🇸🇬' },
  { name: 'Petra', image: '/buildings/petra.jpg', info: 'Jordanie – IVe siècle av. J.-C. – Taillé dans le grès rose', country: '🇯🇴' },
  { name: 'Christ Rédempteur', image: '/buildings/christ-redeemer.jpg', info: 'Rio de Janeiro, Brésil – 1931 – Béton armé et stéatite, 30m', country: '🇧🇷' },
  // --- Moins connus, architecturalement remarquables ---
  { name: "Musée d'Art Contemporain de Niterói", image: '/buildings/niteroi.jpg', info: 'Niterói, Brésil – 1996 – Arch. Oscar Niemeyer, forme soucoupe en béton', country: '🇧🇷' },
  { name: 'Habitat 67', image: '/buildings/habitat-67.jpg', info: 'Montréal, Canada – 1967 – Arch. Moshe Safdie, 354 cubes préfabriqués empilés', country: '🇨🇦' },
  { name: 'Heydar Aliyev Center', image: '/buildings/heydar-aliyev.jpg', info: 'Bakou, Azerbaïdjan – 2012 – Arch. Zaha Hadid, structure fluide sans angles', country: '🇦🇿' },
  { name: 'CCTV Headquarters', image: '/buildings/cctv.jpg', info: 'Pékin, Chine – 2012 – Arch. OMA/Rem Koolhaas, boucle structurelle en porte-à-faux', country: '🇨🇳' },
  { name: 'The Interlace', image: '/buildings/interlace.jpg', info: 'Singapour – 2013 – Arch. OMA/Ole Scheeren, 31 blocs empilés hexagonalement', country: '🇸🇬' },
  { name: 'Lotus Temple', image: '/buildings/lotus-temple.jpg', info: 'New Delhi, Inde – 1986 – Arch. Fariborz Sahba, 27 pétales de marbre blanc', country: '🇮🇳' },
  { name: 'Bosco Verticale', image: '/buildings/bosco-verticale.jpg', info: 'Milan, Italie – 2014 – Arch. Stefano Boeri, 900 arbres sur les façades', country: '🇮🇹' },
  { name: 'Elbphilharmonie', image: '/buildings/elbphilharmonie.jpg', info: 'Hambourg, Allemagne – 2017 – Arch. Herzog & de Meuron, acoustique paramétrique', country: '🇩🇪' },
  { name: 'Musée National du Qatar', image: '/buildings/musee-qatar.jpg', info: 'Doha, Qatar – 2019 – Arch. Jean Nouvel, rose des sables géante en béton', country: '🇶🇦' },
  { name: 'Atomium', image: '/buildings/atomium.jpg', info: 'Bruxelles, Belgique – 1958 – Maille cristalline de fer agrandie 165 milliards de fois', country: '🇧🇪' },
];

const QUESTIONS_PER_GAME = 10;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateChoices(correct: Building, all: Building[]): string[] {
  const others = shuffle(all.filter(b => b.name !== correct.name)).slice(0, 3).map(b => b.name);
  return shuffle([correct.name, ...others]);
}

const LS_KEY = 'guess-building-best';

const GuessBuilding: React.FC<GuessBuildingProps> = ({ onBack }) => {
  const [phase, setPhase] = useState<'playing' | 'feedback' | 'end'>('playing');
  const [questions, setQuestions] = useState<Building[]>(() => shuffle(ALL_BUILDINGS).slice(0, QUESTIONS_PER_GAME));
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [bestScore, setBestScore] = useState(() => {
    const s = localStorage.getItem(LS_KEY);
    return s ? parseInt(s, 10) : 0;
  });

  const current = questions[qIndex];
  const choices = useMemo(() => current ? generateChoices(current, ALL_BUILDINGS) : [], [current]);
  const isCorrect = selected === current?.name;

  const handleAnswer = useCallback((choice: string) => {
    if (phase !== 'playing') return;
    setSelected(choice);
    if (choice === current.name) setScore(s => s + 1);
    setPhase('feedback');
  }, [phase, current]);

  const handleNext = useCallback(() => {
    const next = qIndex + 1;
    if (next >= questions.length) {
      const finalScore = score + (isCorrect ? 0 : 0); // score already updated
      if (finalScore > bestScore) {
        localStorage.setItem(LS_KEY, String(finalScore));
        setBestScore(finalScore);
      }
      setPhase('end');
    } else {
      setQIndex(next);
      setSelected(null);
      setPhase('playing');
    }
  }, [qIndex, questions.length, score, isCorrect, bestScore]);

  const restart = useCallback(() => {
    setQuestions(shuffle(ALL_BUILDINGS).slice(0, QUESTIONS_PER_GAME));
    setQIndex(0);
    setScore(0);
    setSelected(null);
    setPhase('playing');
  }, []);

  const getRank = (s: number) => {
    if (s <= 3) return { label: 'Apprenti 🧱', color: 'text-muted-foreground' };
    if (s <= 7) return { label: 'Compagnon 🏗️', color: 'text-yellow-500' };
    return { label: "Maître d'œuvre 🏛️", color: 'text-primary' };
  };

  if (phase === 'end') {
    const rank = getRank(score);
    // Update best score on end
    if (score > bestScore) {
      localStorage.setItem(LS_KEY, String(score));
    }
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-6 max-w-lg mx-auto">
        <div className="rounded-2xl border border-border bg-card/90 backdrop-blur-md p-8 shadow-lg w-full text-center">
          <h2 className="text-3xl font-black mb-2">Résultat</h2>
          <p className="text-5xl font-bold text-primary my-4">{score}/{questions.length}</p>
          <p className={`text-xl font-semibold ${rank.color} mb-1`}>{rank.label}</p>
          <p className="text-sm text-muted-foreground mb-6">Meilleur score : {Math.max(score, bestScore)}</p>
          <div className="flex gap-4 justify-center">
            <Button onClick={restart} className="gap-2"><RotateCcw className="h-4 w-4" /> Rejouer</Button>
            <Button variant="outline" onClick={onBack} className="gap-2"><ArrowLeft className="h-4 w-4" /> Mini-jeux</Button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-4 w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <span className="text-sm text-muted-foreground font-mono">Question {qIndex + 1}/{questions.length}</span>
        <span className="text-sm font-bold text-primary">Score : {score}</span>
      </div>

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={qIndex}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3 }}
          className="w-full rounded-2xl border border-border overflow-hidden bg-muted shadow-lg aspect-video relative"
        >
          <img
            src={current.image}
            alt="Building"
            className="w-full h-full object-cover"
            loading="eager"
          />
          {phase === 'feedback' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`absolute inset-0 flex flex-col items-center justify-center backdrop-blur-[2px] ${isCorrect ? 'bg-primary/20' : 'bg-destructive/20'}`}
            >
              {isCorrect ? <CheckCircle className="h-16 w-16 text-primary mb-2" /> : <XCircle className="h-16 w-16 text-destructive mb-2" />}
              <p className="text-lg font-bold text-foreground">{current.name} {current.country}</p>
              <p className="text-sm text-muted-foreground">{current.info}</p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Choices */}
      {phase === 'playing' ? (
        <div className="grid grid-cols-2 gap-3 w-full">
          {choices.map((c) => (
            <Button
              key={c}
              variant="outline"
              onClick={() => handleAnswer(c)}
              className="h-auto py-3 text-sm font-medium hover:border-primary/60 hover:bg-primary/5 transition-all"
            >
              {c}
            </Button>
          ))}
        </div>
      ) : (
        <Button onClick={handleNext} className="gap-2 mt-2">
          {qIndex + 1 >= questions.length ? 'Voir le résultat' : 'Suivant'} <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </motion.div>
  );
};

export default GuessBuilding;
