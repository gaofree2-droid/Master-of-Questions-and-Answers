import { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { useAdsgram } from '../hooks/useAdsgram';
import { useTelegram } from '../hooks/useTelegram';

export function LivesDisplay() {
  const { state, dispatch } = useGame();
  const { showRewardedAd } = useAdsgram();
  const { hapticImpact, hapticNotification } = useTelegram();
  const [regenCountdown, setRegenCountdown] = useState('');

  useEffect(() => {
    if (state.lives >= state.maxLives || state.livesRegenTime <= 0) {
      setRegenCountdown('');
      return;
    }

    const interval = setInterval(() => {
      const remaining = state.livesRegenTime - Date.now();
      if (remaining <= 0) {
        dispatch({ type: 'UPDATE_LIVES_REGEN' });
        setRegenCountdown('');
      } else {
        const minutes = Math.floor(remaining / 60000);
        const seconds = Math.floor((remaining % 60000) / 1000);
        setRegenCountdown(`${minutes}:${seconds.toString().padStart(2, '0')}`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [state.lives, state.maxLives, state.livesRegenTime, dispatch]);

  const handleGetLife = async () => {
    hapticImpact('medium');
    await showRewardedAd('extra_life', {
      onReward: () => {
        dispatch({ type: 'RESTORE_LIFE', amount: 1 });
        hapticNotification('success');
      },
    });
  };

  return (
    <div className="glass-card p-4 mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">❤️</span>
          <span className="font-bold">
            {state.lives} / {state.maxLives}
          </span>
        </div>
        {regenCountdown && (
          <span className="text-xs text-white/50">
            下一条生命：{regenCountdown}
          </span>
        )}
      </div>

      <div className="flex gap-1 mb-3">
        {Array.from({ length: state.maxLives }).map((_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full transition-all duration-300 ${
              i < state.lives ? 'bg-red-400' : 'bg-white/10'
            }`}
          />
        ))}
      </div>

      {state.lives < state.maxLives && (
        <button
          onClick={handleGetLife}
          className="w-full text-xs glass-card py-2 text-white/60 flex items-center justify-center gap-1 active:scale-[0.98] transition-transform"
        >
          <span>🎁</span> 看广告获得生命 +1
        </button>
      )}
    </div>
  );
}
