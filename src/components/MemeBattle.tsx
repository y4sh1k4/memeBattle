import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { toast } from 'sonner';

const DUMMY_MEMES = [
  {
    id: 1,
    imageUrl: 'https://images.unsplash.com/photo-1546776310-eef45dd6d63c',
    title: 'Coding Life',
  },
  {
    id: 2,
    imageUrl: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79',
    title: 'Developer Moments',
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

  return (
    <div className="flex flex-col items-center justify-center w-screen mt-14">
      <div className="w-full max-w-sm relative max-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMeme}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            animate={{
              x: direction,
              rotate: direction / 20,
            }}
            initial={{ scale: 0.95, opacity: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            whileDrag={{ scale: 1.05 }}
            whileHover={{ scale: 1.02 }}
            className="cursor-grab active:cursor-grabbing"
          >
            <Card className="overflow-hidden shadow-xl">
              <div className="relative aspect-[4/3] md:aspect-[16/9]">
                <img
                  src={DUMMY_MEMES[currentMeme].imageUrl}
                  alt={DUMMY_MEMES[currentMeme].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                  <h3 className="text-3xl md:text-4xl font-bold text-white">
                    {DUMMY_MEMES[currentMeme].title}
                  </h3>
                </div>
              </div>
            </Card>
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