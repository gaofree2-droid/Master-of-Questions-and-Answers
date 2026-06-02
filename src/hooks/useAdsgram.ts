import { useCallback, useEffect, useRef, useState } from 'react';
import type { AdCallbacks } from '../types';

interface AdController {
  show(): Promise<void>;
  destroy(): void;
}

interface AdsgramSDK {
  init(options: { blockId: string }): AdController;
}

declare global {
  interface Window {
    Adsgram?: AdsgramSDK;
  }
}

const BLOCK_ID = import.meta.env.VITE_ADSGRAM_BLOCK_ID || 'your-block-id';

export function useAdsgram() {
  const [isLoading, setIsLoading] = useState(false);
  const AdControllerRef = useRef<AdController | undefined>(undefined);

  useEffect(() => {
    AdControllerRef.current = window.Adsgram?.init({ blockId: BLOCK_ID });
  }, []);

  const showRewardedAd = useCallback(async (_adType: string, callbacks?: AdCallbacks) => {
    if (!AdControllerRef.current) {
      callbacks?.onError?.('SDK not initialized');
      return false;
    }

    setIsLoading(true);

    try {
      await AdControllerRef.current.show();
      setIsLoading(false);
      // User watched ad till the end (reward format)
      // or watched till end / closed (interstitial format)
      callbacks?.onReward?.();
      return true;
    } catch (result) {
      // User got error during playing ad, or skipped ad
      setIsLoading(false);
      callbacks?.onError?.(result);
      return false;
    }
  }, []);

  const destroy = useCallback(() => {
    if (AdControllerRef.current) {
      AdControllerRef.current.destroy();
      AdControllerRef.current = undefined;
    }
  }, []);

  return { showRewardedAd, isLoading, destroy };
}
