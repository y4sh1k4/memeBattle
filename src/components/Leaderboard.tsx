import { Card } from '@/components/ui/card';
import { Trophy, TrendingUp, Users } from 'lucide-react';

const DUMMY_PARTICIPANTS = [
  { id: 1, name: 'MemeKing', votes: 1250, memes: 15 },
  { id: 2, name: 'LaughMaster', votes: 980, memes: 12 },
  { id: 3, name: 'GiggleGuru', votes: 750, memes: 8 },
];

export default function Leaderboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-12 py-8">
      <div className="grid gap-8 md:grid-cols-3">
        <Card className="p-8 md:p-10 hover:bg-accent transition-colors">
          <div className="flex items-center space-x-6">
            <Trophy className="h-12 w-12 md:h-16 md:w-16 text-yellow-500" />
            <div>
              <p className="text-sm md:text-base text-muted-foreground">Total Prize Pool</p>
              <h3 className="text-3xl md:text-4xl font-bold">1,000 DOGE</h3>
            </div>
          </div>
        </Card>
        
        <Card className="p-8 md:p-10 hover:bg-accent transition-colors">
          <div className="flex items-center space-x-6">
            <TrendingUp className="h-12 w-12 md:h-16 md:w-16 text-green-500" />
            <div>
              <p className="text-sm md:text-base text-muted-foreground">Total Votes</p>
              <h3 className="text-3xl md:text-4xl font-bold">2,980</h3>
            </div>
          </div>
        </Card>
        
        <Card className="p-8 md:p-10 hover:bg-accent transition-colors">
          <div className="flex items-center space-x-6">
            <Users className="h-12 w-12 md:h-16 md:w-16 text-blue-500" />
            <div>
              <p className="text-sm md:text-base text-muted-foreground">Participants</p>
              <h3 className="text-3xl md:text-4xl font-bold">{DUMMY_PARTICIPANTS.length}</h3>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-8 md:p-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Today's Leaderboard</h2>
        <div className="space-y-6">
          {DUMMY_PARTICIPANTS.map((participant, index) => (
            <div
              key={participant.id}
              className="flex items-center justify-between p-6 md:p-8 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-8">
                <div className={`text-4xl md:text-5xl font-bold ${
                  index === 0 ? 'text-yellow-500' :
                  index === 1 ? 'text-gray-400' :
                  index === 2 ? 'text-amber-600' : ''
                }`}>
                  #{index + 1}
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold">{participant.name}</h3>
                  <p className="text-sm md:text-base text-muted-foreground">
                    {participant.memes} memes posted
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl md:text-3xl font-bold">{participant.votes} votes</p>
                <p className="text-sm md:text-base text-muted-foreground">
                  {((participant.votes / 2980) * 100).toFixed(1)}% of total
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}