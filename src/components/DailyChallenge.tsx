import { useGame } from '../context/GameContext';
import { useTelegram } from '../hooks/useTelegram';

export function DailyChallenge() {
  const { startDaily, state, setScreen } = useGame();
  const { hapticImpact } = useTelegram();

  const isCompleted = state.dailyChallengeCompleted;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-8 animate-fade-in">
      <button
        onClick={() => {
          hapticImpact('light');
          setScreen('start');
        }}
        className="absolute top-6 left-4 text-white/60 text-sm"
      >
        ← 返回
      </button>

      <div className="text-6xl mb-4">🏆</div>
      <h1 className="text-2xl font-bold mb-2">每日挑战</h1>
      <p className="text-white/50 text-center text-sm mb-8">
        每天一套固定题目，全服玩家比拼排名！
      </p>

      <div className="glass-card w-full p-6 mb-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-white/60">题目数量</span>
            <span className="font-bold">15 题</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/60">每题时限</span>
            <span className="font-bold">15 秒</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/60">今日状态</span>
            <span className={isCompleted ? 'text-green-400' : 'text-yellow-400'}>
              {isCompleted ? '✅ 已完成' : '⏳ 未完成'}
            </span>
          </div>
        </div>
      </div>

      {!isCompleted ? (
        <button
          onClick={() => {
            hapticImpact('medium');
            startDaily();
          }}
          className="btn-primary w-full text-lg py-4"
        >
          开始挑战
        </button>
      ) : (
        <div className="text-center">
          <div className="text-white/50 mb-4">你今天已经完成了每日挑战</div>
          <button
            onClick={() => setScreen('leaderboard')}
            className="btn-primary px-8"
          >
            查看排行榜
          </button>
        </div>
      )}
    </div>
  );
}
