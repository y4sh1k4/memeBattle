import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '@/components/Navbar';
import MemeBattle from '@/components/MemeBattle';
import CreateMeme from '@/components/CreateMeme';
import Leaderboard from '@/components/Leaderboard';
import { Toaster } from '@/components/ui/sonner';

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="meme-battle-theme">
      <Router>
        <div className="min-h-screen bg-background">
          <main className="container mx-auto px-4 py-16 md:py-20">
            <Routes>
              <Route path="/" element={<MemeBattle />} />
              <Route path="/create" element={<CreateMeme />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
            </Routes>
          </main>
          <Navbar />
          <Toaster position="top-center" />
        </div>
      </Router>
    </ThemeProvider>
  );
}