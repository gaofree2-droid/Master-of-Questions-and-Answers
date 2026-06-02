import { useGame } from '../context/GameContext';
import { useAdsgram } from '../hooks/useAdsgram';
import { useTelegram } from '../hooks/useTelegram';

export function TreasureChest() {
  const { dispatch } = useGame();
  const { showRewardedAd } = useAdsgram();
  const { hapticImpact, hapticNotification } = useTelegram();

  const handleOpenChest = async () => {
    hapticImpact('heavy');
    await showRewardedAd('treasure_chest', {
      onReward: () => {
        dispatch({ type: 'RESTORE_LIFE', amount: 1 });
        hapticNotification('success');
      },
    });
  };

  return (
    <div className="glass-card p-4 mb-4 border-yellow-400/20 bg-gradient-to-r from-yellow-500/5 to-amber-500/5">
      <div className="flex items-center gap-3">
        <button
          onClick={handleOpenChest}
          className="text-4xl active:scale-110 transition-transform"
        >
          🎁
        </button>
        <div className="flex-1">
          <div className="font-bold text-yellow-300 text-sm">免费宝箱</div>
          <div className="text-xs text-white/50">观看广告开启，获得额外生命</div>
        </div>
        <div className="text-yellow-400 text-xs font-medium bg-yellow-400/10 px-2 py-1 rounded">
          AD
        </div>
      </div>
    </div>
  );
}
