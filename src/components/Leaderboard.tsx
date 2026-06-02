import { useGame } from '../context/GameContext';
import { useTelegram } from '../hooks/useTelegram';

const mockLeaderboard = [
  { userId: '1', username: '知识达人', score: 15200, rank: 1 },
  { userId: '2', username: '学霸小明', score: 12800, rank: 2 },
  { userId: '3', username: '答题王', score: 11500, rank: 3 },
  { userId: '4', username: '智慧之星', score: 9800, rank: 4 },
  { userId: '5', username: '百科全书', score: 8200, rank: 5 },
  { userId: '6', username: '聪明的猫', score: 7100, rank: 6 },
  { userId: '7', username: '好奇宝宝', score: 6500, rank: 7 },
  { userId: '8', username: '爱学习的人', score: 5800, rank: 8 },
  { userId: '9', username: '夜猫子', score: 4200, rank: 9 },
  { userId: '10', username: '早起的鸟', score: 3100, rank: 10 },
];

const rankEmojis = ['🥇', '🥈', '🥉'];

export function Leaderboard() {
  const { setScreen, state } = useGame();
  const { hapticImpact, user } = useTelegram();

  const playerName = user?.first_name || '我';
  const myRank = mockLeaderboard.findIndex((e) => e.userId === '0') + 1 || 11;

  return (
    <div className="min-h-screen flex flex-col px-4 py-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => {
            hapticImpact('light');
            setScreen('start');
          }}
          className="text-white/60 text-sm"
        >
          ← 返回
        </button>
        <h1 className="text-lg font-bold">🏆 排行榜</h1>
        <div className="w-10" />
      </div>

      {/* My Rank */}
      <div className="glass-card p-4 mb-4 border-purple-400/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-lg font-bold">
            {myRank <= 3 ? rankEmojis[myRank - 1] : myRank}
          </div>
          <div className="flex-1">
            <div className="font-bold">{playerName}（你）</div>
            <div className="text-sm text-white/50">排名 #{myRank}</div>
          </div>
          <div className="text-right">
            <div className="font-bold text-purple-400">{state.totalScore}</div>
            <div className="text-xs text-white/50">积分</div>
          </div>
        </div>
      </div>

      {/* Leaderboard List */}
      <div className="space-y-2">
        {mockLeaderboard.map((entry, index) => (
          <div
            key={entry.userId}
            className={`glass-card p-3 flex items-center gap-3 ${
              index < 3 ? 'border-yellow-400/20' : ''
            }`}
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0">
              {index < 3 ? (
                <span className="text-xl">{rankEmojis[index]}</span>
              ) : (
                <span className="text-white/50">{entry.rank}</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm truncate">{entry.username}</div>
            </div>
            <div className="text-right shrink-0">
              <div className={`font-bold text-sm ${
                index < 3 ? 'text-yellow-400' : 'text-white/70'
              }`}>
                {entry.score.toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
