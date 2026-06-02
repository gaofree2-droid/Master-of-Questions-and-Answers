import { useGame } from '../context/GameContext';
import { useAdsgram } from '../hooks/useAdsgram';
import { useTelegram } from '../hooks/useTelegram';

export function ResultScreen() {
  const { getGameResult, setScreen, startGame, state, doubleReward, revive } = useGame();
  const { showRewardedAd, isLoading } = useAdsgram();
  const { hapticImpact, hapticNotification } = useTelegram();

  const result = getGameResult();
  const accuracy = result.totalQuestions > 0
    ? Math.round((result.correctCount / result.totalQuestions) * 100)
    : 0;

  const getGrade = () => {
    if (result.isPerfect) return { emoji: '🏆', text: '完美通关！', color: 'text-yellow-400' };
    if (accuracy >= 90) return { emoji: '🌟', text: '非常优秀！', color: 'text-purple-400' };
    if (accuracy >= 70) return { emoji: '👍', text: '表现不错！', color: 'text-green-400' };
    if (accuracy >= 50) return { emoji: '💪', text: '继续加油！', color: 'text-blue-400' };
    return { emoji: '📚', text: '还需努力！', color: 'text-white/60' };
  };

  const grade = getGrade();

  const handleDoubleReward = async () => {
    hapticImpact('medium');
    await showRewardedAd('double_reward', {
      onReward: () => {
        doubleReward();
        hapticNotification('success');
      },
    });
  };

  const handleRevive = async () => {
    hapticImpact('medium');
    await showRewardedAd('revive', {
      onReward: () => {
        revive();
        hapticNotification('success');
      },
    });
  };

  const handleShare = () => {
    hapticImpact('light');
    const text = `🧠 知识闯关\n我答对了 ${result.correctCount}/${result.totalQuestions} 题！\n得分：${state.score}\n最高连击：${result.maxCombo}🔥\n\n来挑战我吧！`;

    const tg = window.Telegram?.WebApp;
    if (tg) {
      tg.openTelegramLink(
        `https://t.me/share/url?url=${encodeURIComponent('https://t.me/YourBotName/quiz')}&text=${encodeURIComponent(text)}`
      );
    } else {
      if (navigator.share) {
        navigator.share({ text });
      } else {
        navigator.clipboard?.writeText(text);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-8 animate-fade-in">
      {/* Grade */}
      <div className="text-7xl mb-4 animate-bounce-in">{grade.emoji}</div>
      <h1 className={`text-2xl font-bold mb-2 ${grade.color}`}>{grade.text}</h1>
      <p className="text-white/50 text-sm mb-8">
        {result.correctCount} / {result.totalQuestions} 题正确
      </p>

      {/* Score */}
      <div className="glass-card w-full p-6 mb-6">
        <div className="text-center mb-4">
          <div className="text-sm text-white/50 mb-1">本局得分</div>
          <div className="text-5xl font-bold text-purple-400 text-glow animate-bounce-in">
            {state.score}
          </div>
          {state.doubleRewardAvailable && (
            <div className="text-xs text-white/40 mt-1">看广告可翻倍</div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-green-400">{accuracy}%</div>
            <div className="text-xs text-white/50">正确率</div>
          </div>
          <div>
            <div className="text-lg font-bold text-orange-400">{result.maxCombo}x</div>
            <div className="text-xs text-white/50">最高连击</div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-400">
              {Math.round(result.totalTimeUsed)}s
            </div>
            <div className="text-xs text-white/50">总用时</div>
          </div>
        </div>
      </div>

      {/* Ad Buttons */}
      <div className="w-full space-y-3 mb-6">
        {state.doubleRewardAvailable && (
          <button
            onClick={handleDoubleReward}
            disabled={isLoading}
            className="w-full flex items-center gap-3 glass-card p-4 border-yellow-400/30 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 active:scale-[0.98] transition-transform"
          >
            <span className="text-2xl">🎁</span>
            <div className="text-left flex-1">
              <div className="font-bold text-yellow-300">积分翻倍</div>
              <div className="text-xs text-white/50">观看广告，积分 x2</div>
            </div>
            <span className="text-yellow-400 text-sm">AD</span>
          </button>
        )}

        {state.isGameOver && state.lives <= 0 && (
          <button
            onClick={handleRevive}
            disabled={isLoading}
            className="w-full flex items-center gap-3 glass-card p-4 border-red-400/30 bg-gradient-to-r from-red-500/10 to-pink-500/10 active:scale-[0.98] transition-transform"
          >
            <span className="text-2xl">❤️</span>
            <div className="text-left flex-1">
              <div className="font-bold text-red-300">复活继续</div>
              <div className="text-xs text-white/50">观看广告，获得1条生命</div>
            </div>
            <span className="text-red-400 text-sm">AD</span>
          </button>
        )}
      </div>

      {/* Action Buttons */}
      <div className="w-full space-y-3">
        <button
          onClick={() => {
            hapticImpact('medium');
            startGame();
          }}
          className="btn-primary w-full text-lg py-4"
        >
          再来一局
        </button>

        <button
          onClick={handleShare}
          className="btn-success w-full py-3 flex items-center justify-center gap-2"
        >
          <span>📤</span> 分享成绩
        </button>

        <button
          onClick={() => {
            hapticImpact('light');
            setScreen('start');
          }}
          className="w-full py-3 text-white/50 text-sm"
        >
          返回首页
        </button>
      </div>
    </div>
  );
}
