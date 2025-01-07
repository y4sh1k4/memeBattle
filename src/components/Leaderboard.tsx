import { Card } from '@/components/ui/card';
import { Trophy, TrendingUp, Users } from 'lucide-react';
import { useState, useEffect } from 'react';

const DUMMY_PARTICIPANTS = [
  { id: 1, name: 'MemeKing', votes: 1250, memes: 15 },
  { id: 2, name: 'LaughMaster', votes: 980, memes: 12 },
  { id: 3, name: 'GiggleGuru', votes: 750, memes: 8 },
];

const calculateTimeLeft = () => {
  const currentTime = new Date().getTime();
  const resetTime = new Date().setHours(24, 0, 0, 0); // Next reset time at midnight
  const timeLeft = resetTime - currentTime;

  return timeLeft;
};

export default function Leaderboard() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000); // Update every second

    return () => clearInterval(intervalId); // Clean up on component unmount
  }, []);

  const formatTime = (timeInMillis: number) => {
    const hours = Math.floor(timeInMillis / 1000 / 60 / 60);
    const minutes = Math.floor((timeInMillis / 1000 / 60) % 60);
    const seconds = Math.floor((timeInMillis / 1000) % 60);
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 py-8 w-screen flex items-center justify-center flex-col">
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
              <p className="text-sm md:text-base text-muted-foreground">Time Left</p>
              <h3 className="text-3xl md:text-4xl font-bold">
                {formatTime(timeLeft)}
              </h3>
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

      <div className="mx-3 flex items-center justify-center">
        <Card className="p-8 md:p-12 w-screen">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Today's Leaderboard</h2>
          <div className="space-y-6">
            {DUMMY_PARTICIPANTS.map((participant, index) => (
              <div
                key={participant.id}
                className="flex items-center justify-between p-6 md:p-8 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-8">
                  <div
                    className={`text-4xl md:text-5xl font-bold ${
                      index === 0
                        ? 'text-yellow-500'
                        : index === 1
                        ? 'text-gray-400'
                        : index === 2
                        ? 'text-amber-600'
                        : ''
                    }`}
                  >
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
    </div>
  );
}
