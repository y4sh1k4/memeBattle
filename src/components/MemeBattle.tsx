import { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { toast } from 'sonner';

const DUMMY_MEMES = [
  {
    id: 1,
    imageUrl: 'https://images.unsplash.com/photo-1546776310-eef45dd6d63c',
    title: 'Coding Life',
    description: 'The struggles and joys of a developer.',
    votes: 125,
    creator: 'John Doe',
  },
  {
    id: 2,
    imageUrl: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79',
    title: 'Developer Moments',
    description: 'Relatable moments every coder knows.',
    votes: 98,
    creator: 'Jane Smith',
  },
];

export default function MemeBattle() {
  const [currentMeme, setCurrentMeme] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleDragEnd = (event: any, info: PanInfo) => {
    const swipeThreshold = 100;
    const swipe = info.offset.x;
    const isSwipeRight = swipe > swipeThreshold;
    const isSwipeLeft = swipe < -swipeThreshold;

    if (isSwipeRight || isSwipeLeft) {
      const liked = isSwipeRight;
      toast(liked ? 'Voted Up! 🚀' : 'Voted Down! 👎', {
        position: 'top-center',
      });
      setDirection(swipe);
      setTimeout(() => {
        setCurrentMeme((prev) => (prev + 1) % DUMMY_MEMES.length);
        setDirection(0);
      }, 200);
    }
  };

  const rotation = (direction / 100) * 10;
  const opacity = Math.min(Math.abs(direction) / 100, 1);

  return (
    <div className="flex flex-col items-center justify-center w-screen mt-14 px-4">
      <div className="w-full max-w-sm relative max-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMeme}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            animate={{
              x: direction,
              rotate: rotation,
            }}
            initial={{ scale: 0.95, opacity: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            whileDrag={{ scale: 1.05 }}
            whileHover={{ scale: 1.02 }}
            className="cursor-grab active:cursor-grabbing"
          >
            <div
              className="glass-card w-full rounded-xl overflow-hidden shadow-2xl relative"
              style={{
                transform: `translateX(${direction}px) rotate(${rotation}deg)`,
                transition: 'all 0.3s ease-out',
              }}
            >
              {direction > 0 && (
                <div
                  className="absolute top-4 left-4 bg-[#1488FC] rounded-full p-2 z-10 transition-opacity shadow-lg shadow-[#1488FC]/20"
                  style={{ opacity }}
                >
                  <ThumbsUp className="w-6 h-6 text-white" />
                </div>
              )}
              {direction < 0 && (
                <div
                  className="absolute top-4 right-4 bg-red-500 rounded-full p-2 z-10 transition-opacity shadow-lg shadow-red-500/20"
                  style={{ opacity }}
                >
                  <ThumbsDown className="w-6 h-6 text-white" />
                </div>
              )}

              <img
                src={DUMMY_MEMES[currentMeme].imageUrl}
                alt={DUMMY_MEMES[currentMeme].title}
                className="w-full h-48 sm:h-64 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2 text-white">
                  {DUMMY_MEMES[currentMeme].title}
                </h2>
                <p className="text-gray-400 mb-4">{DUMMY_MEMES[currentMeme].description}</p>

                <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
                  <p>Creator: {DUMMY_MEMES[currentMeme].creator}</p>
                  <p>Votes: {DUMMY_MEMES[currentMeme].votes}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-x-0 -bottom-10 flex justify-center text-muted-foreground">
          <p className="text-lg md:text-xl font-medium animate-pulse">
            Swipe right to like, left to pass
          </p>
        </div>
      </div>
    </div>
  );
}
