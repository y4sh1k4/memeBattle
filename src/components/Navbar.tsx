import { Link } from 'react-router-dom';
import { Sword, PlusCircle, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  return (
    <nav className="fixed top-1/2 left-8 -translate-y-1/2 z-50">
      <div className="flex flex-col space-y-20 bg-background/95 backdrop-blur p-4 rounded-full border shadow-lg">
        <Button variant="ghost" asChild className="rounded-full">
          <Link to="/">
            <Sword className="h-6 w-6" />
          </Link>
        </Button>
        <Button variant="ghost" asChild className="rounded-full">
          <Link to="/create">
            <PlusCircle className="h-6 w-6" />
          </Link>
        </Button>
        <Button variant="ghost" asChild className="rounded-full">
          <Link to="/leaderboard">
            <Trophy className="h-6 w-6" />
          </Link>
        </Button>
      </div>
    </nav>
  );
}
