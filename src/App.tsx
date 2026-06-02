import { GameProvider, useGame } from './context/GameContext';
import { StartScreen } from './components/StartScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultScreen } from './components/ResultScreen';
import { DailyChallenge } from './components/DailyChallenge';
import { Leaderboard } from './components/Leaderboard';

function GameRouter() {
  const { state } = useGame();

  switch (state.screen) {
    case 'start':
      return <StartScreen />;
    case 'quiz':
      return <QuizScreen />;
    case 'result':
      return <ResultScreen />;
    case 'daily':
      return <DailyChallenge />;
    case 'leaderboard':
      return <Leaderboard />;
    default:
      return <StartScreen />;
  }
}

export default function App() {
  return (
    <GameProvider>
      <div className="min-h-screen bg-tg-bg text-tg-text">
        <GameRouter />
      </div>
    </GameProvider>
  );
}
