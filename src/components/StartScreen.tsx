import { useGame } from '../context/GameContext';
import { useTelegram } from '../hooks/useTelegram';
import { categoryNames } from '../data/questions';

export function StartScreen() {
  const { startGame, startDaily, state, setScreen } = useGame();
  const { user, hapticImpact } = useTelegram();

  const displayName = user?.first_name || '玩家';

  const handleStart = (category?: string) => {
    hapticImpact('medium');
    startGame(category);
  };

  const handleDaily = () => {
    hapticImpact('medium');
    startDaily();
  };

  const categories = Object.entries(categoryNames);

  return (
    <div className="min-h-screen flex flex-col px-4 py-6 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🧠</div>
        <h1 className="text-3xl font-bold text-glow mb-2">知识闯关</h1>
        <p className="text-white/60 text-sm">
          欢迎回来，{displayName}！
        </p>
      </div>

      {/* Stats Bar */}
      <div className="glass-card p-4 mb-6">
        <div className="flex justify-around text-center">
          <div>
            <div className="text-2xl font-bold text-purple-300">{state.totalScore}</div>
            <div className="text-xs text-white/50">总积分</div>
          </div>
          <div className="w-px bg-white/10" />
          <div>
            <div className="text-2xl font-bold text-yellow-300 flex items-center justify-center gap-1">
              ❤️ {state.lives}/{state.maxLives}
            </div>
            <div className="text-xs text-white/50">生命值</div>
          </div>
          <div className="w-px bg-white/10" />
          <div>
            <div className="text-2xl font-bold text-green-300">{state.streakDays}</div>
            <div className="text-xs text-white/50">连续天数</div>
          </div>
        </div>
      </div>

      {/* Daily Challenge */}
      <button
        onClick={handleDaily}
        className="glass-card p-4 mb-4 border-yellow-400/30 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 active:scale-[0.98] transition-transform"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl">🏆</span>
          <div className="text-left flex-1">
            <div className="font-bold text-yellow-300">每日挑战</div>
            <div className="text-xs text-white/50">15题限时挑战，全服排名比拼</div>
          </div>
          <div className="text-yellow-400 text-sm font-medium">
            {state.dailyChallengeCompleted ? '✅ 已完成' : 'GO →'}
          </div>
        </div>
      </button>

      {/* Quick Start */}
      <button
        onClick={() => handleStart()}
        className="btn-primary text-lg py-4 mb-6 flex items-center justify-center gap-2"
      >
        <span className="text-xl">⚡</span>
        快速开始（10题）
      </button>

      {/* Categories */}
      <div className="mb-6">
        <h2 className="text-sm font-medium text-white/50 mb-3 px-1">选择分类</h2>
        <div className="grid grid-cols-2 gap-3">
          {categories.map(([key, name]) => (
            <button
              key={key}
              onClick={() => handleStart(key)}
              className="glass-card p-3 text-left active:scale-[0.97] transition-transform hover:bg-white/15"
            >
              <div className="font-medium text-sm">{name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Leaderboard Link */}
      <button
        onClick={() => {
          hapticImpact('light');
          setScreen('leaderboard');
        }}
        className="glass-card p-3 flex items-center justify-center gap-2 text-white/70"
      >
        <span>📊</span>
        <span className="text-sm">排行榜</span>
      </button>
    </div>
  );
}
