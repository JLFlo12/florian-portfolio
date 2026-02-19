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
  { name: 'Sydney Opera House', image: 'https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?w=800&q=80&fit=crop', info: 'Sydney, Australie – 1973 – Arch. Jørn Utzon, voûtes en coquille de béton', country: '🇦🇺' },
  { name: 'Tour Eiffel', image: 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?w=800&q=80&fit=crop', info: 'Paris, France – 1889 – Structure en fer puddlé, 10 100 tonnes', country: '🇫🇷' },
  { name: 'Burj Khalifa', image: 'https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=800&q=80&fit=crop', info: 'Dubaï, EAU – 2010 – 828m, plus haut gratte-ciel du monde', country: '🇦🇪' },
  { name: 'Sagrada Familia', image: 'https://images.unsplash.com/photo-1583779457094-ab6f9164a1b8?w=800&q=80&fit=crop', info: 'Barcelone, Espagne – depuis 1882 – Arch. Gaudí, colonnes arborescentes', country: '🇪🇸' },
  { name: 'Empire State Building', image: 'https://images.unsplash.com/photo-1546436836-07a91091f160?w=800&q=80&fit=crop', info: 'New York, USA – 1931 – Structure acier, 443m, style Art Déco', country: '🇺🇸' },
  { name: 'Colisée', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80&fit=crop', info: 'Rome, Italie – 80 ap. J.-C. – Béton romain, 50 000 spectateurs', country: '🇮🇹' },
  { name: 'Taj Mahal', image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80&fit=crop', info: 'Agra, Inde – 1653 – Marbre blanc, symétrie parfaite', country: '🇮🇳' },
  { name: 'Guggenheim Bilbao', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80&fit=crop', info: 'Bilbao, Espagne – 1997 – Arch. Frank Gehry, revêtement titane', country: '🇪🇸' },
  { name: 'Big Ben', image: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=800&q=80&fit=crop', info: 'Londres, Royaume-Uni – 1859 – Tour horloge néo-gothique, 96m', country: '🇬🇧' },
  { name: 'Marina Bay Sands', image: 'https://images.unsplash.com/photo-1496939376851-89342e90adcd?w=800&q=80&fit=crop', info: 'Singapour – 2010 – Arch. Moshe Safdie, SkyPark de 340m', country: '🇸🇬' },
  { name: 'Petra', image: 'https://images.unsplash.com/photo-1579606032821-4e6161c81571?w=800&q=80&fit=crop', info: 'Jordanie – IVe siècle av. J.-C. – Taillé dans le grès rose', country: '🇯🇴' },
  { name: 'Christ Rédempteur', image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&q=80&fit=crop', info: 'Rio de Janeiro, Brésil – 1931 – Béton armé et stéatite, 30m', country: '🇧🇷' },
  // --- Moins connus, architecturalement remarquables ---
  { name: 'Musée d\'Art Contemporain de Niterói', image: 'https://images.unsplash.com/photo-1591106568977-385da2a6a7c2?w=800&q=80&fit=crop', info: 'Niterói, Brésil – 1996 – Arch. Oscar Niemeyer, forme soucoupe en béton', country: '🇧🇷' },
  { name: 'Habitat 67', image: 'https://images.unsplash.com/photo-1605283176568-9b41fde3672e?w=800&q=80&fit=crop', info: 'Montréal, Canada – 1967 – Arch. Moshe Safdie, 354 cubes préfabriqués empilés', country: '🇨🇦' },
  { name: 'Heydar Aliyev Center', image: 'https://images.unsplash.com/photo-1597466599360-3b9775841aec?w=800&q=80&fit=crop', info: 'Bakou, Azerbaïdjan – 2012 – Arch. Zaha Hadid, structure fluide sans angles', country: '🇦🇿' },
  { name: 'CCTV Headquarters', image: 'https://images.unsplash.com/photo-1529921879218-f99546d83e31?w=800&q=80&fit=crop', info: 'Pékin, Chine – 2012 – Arch. OMA/Rem Koolhaas, boucle structurelle en porte-à-faux', country: '🇨🇳' },
  { name: 'The Interlace', image: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800&q=80&fit=crop', info: 'Singapour – 2013 – Arch. OMA/Ole Scheeren, 31 blocs empilés hexagonalement', country: '🇸🇬' },
  { name: 'Lotus Temple', image: 'https://images.unsplash.com/photo-1597040663342-45b6af3d7489?w=800&q=80&fit=crop', info: 'New Delhi, Inde – 1986 – Arch. Fariborz Sahba, 27 pétales de marbre blanc', country: '🇮🇳' },
  { name: 'Bosco Verticale', image: 'https://images.unsplash.com/photo-1586981267466-005b69069c09?w=800&q=80&fit=crop', info: 'Milan, Italie – 2014 – Arch. Stefano Boeri, 900 arbres sur les façades', country: '🇮🇹' },
  { name: 'Elbphilharmonie', image: 'https://images.unsplash.com/photo-1570698473651-b2de99bae12f?w=800&q=80&fit=crop', info: 'Hambourg, Allemagne – 2017 – Arch. Herzog & de Meuron, acoustique paramétrique', country: '🇩🇪' },
  { name: 'Musée National du Qatar', image: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=800&q=80&fit=crop', info: 'Doha, Qatar – 2019 – Arch. Jean Nouvel, rose des sables géante en béton', country: '🇶🇦' },
  { name: 'Atomium', image: 'https://images.unsplash.com/photo-1559113513-d5e09c78b9dd?w=800&q=80&fit=crop', info: 'Bruxelles, Belgique – 1958 – Maille cristalline de fer agrandie 165 milliards de fois', country: '🇧🇪' },
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
