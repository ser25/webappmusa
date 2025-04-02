declare global {
  interface Window {
    Telegram: {
      WebApp: {
        ready: () => void;
        expand: () => void;
        close: () => void;
        MainButton: {
          show: () => void;
          hide: () => void;
          setText: (text: string) => void;
          onClick: (callback: () => void) => void;
        };
        initData: string;
        initDataUnsafe: {
          user?: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
            language_code?: string;
            start_param?: string;
          };
          auth_date: number;
          hash: string;
        };
      };
    };
  }
}

export const initTelegramApp = () => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    window.Telegram.WebApp.ready();
    window.Telegram.WebApp.expand();
  }
};

export const closeTelegramApp = () => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    window.Telegram.WebApp.close();
  }
};

export const showMainButton = (text: string, onClick: () => void) => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    const { MainButton } = window.Telegram.WebApp;
    MainButton.setText(text);
    MainButton.onClick(onClick);
    MainButton.show();
  }
};

export const hideMainButton = () => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    window.Telegram.WebApp.MainButton.hide();
  }
};

export const getTelegramUser = () => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    return window.Telegram.WebApp.initDataUnsafe.user;
  }
  return null;
}; 