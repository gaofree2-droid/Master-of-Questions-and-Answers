import { useCallback, useEffect, useState } from 'react';

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

export function useTelegram() {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('dark');
  const [isReady, setIsReady] = useState(false);

  const tg = typeof window !== 'undefined' ? window.Telegram?.WebApp : undefined;

  useEffect(() => {
    if (!tg) {
      setIsReady(true);
      return;
    }

    tg.ready();
    tg.expand();

    if (tg.initDataUnsafe?.user) {
      setUser(tg.initDataUnsafe.user);
    }

    setColorScheme(tg.colorScheme || 'dark');
    setIsReady(true);

    const handleThemeChanged = () => {
      setColorScheme(tg.colorScheme || 'dark');
    };

    tg.onEvent('themeChanged', handleThemeChanged);
    return () => {
      tg.offEvent('themeChanged', handleThemeChanged);
    };
  }, [tg]);

  const hapticImpact = useCallback(
    (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft' = 'medium') => {
      tg?.HapticFeedback?.impactOccurred(style);
    },
    [tg]
  );

  const hapticNotification = useCallback(
    (type: 'error' | 'success' | 'warning') => {
      tg?.HapticFeedback?.notificationOccurred(type);
    },
    [tg]
  );

  const hapticSelection = useCallback(() => {
    tg?.HapticFeedback?.selectionChanged();
  }, [tg]);

  const close = useCallback(() => {
    tg?.close();
  }, [tg]);

  return {
    user,
    colorScheme,
    isReady,
    hapticImpact,
    hapticNotification,
    hapticSelection,
    close,
    tg,
  };
}
