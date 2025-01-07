import { Link } from 'react-router-dom';
import { Sword, PlusCircle, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="flex space-x-2 bg-background/95 backdrop-blur p-2 rounded-full border shadow-lg">
        <Button variant="ghost" size="icon" asChild className="rounded-full">
          <Link to="/">
            <Sword className="h-5 w-5" />
          </Link>
        </Button>
        <Button variant="ghost" size="icon" asChild className="rounded-full">
          <Link to="/create">
            <PlusCircle className="h-5 w-5" />
          </Link>
        </Button>
        <Button variant="ghost" size="icon" asChild className="rounded-full">
          <Link to="/leaderboard">
            <Trophy className="h-5 w-5" />
          </Link>
        </Button>
      </div>
    </nav>
  );
}