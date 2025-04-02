# MUSE - Telegram Mini App

MUSE - это мини-приложение для Telegram, которое помогает пользователям справляться с тревожностью и стрессом через медитации и чат с ИИ-ассистентом.

## Особенности

- 🧘‍♀️ Медитации для снятия стресса и тревожности
- 💬 Чат с ИИ-ассистентом для поддержки
- 🎨 Современный и удобный интерфейс
- 📱 Адаптивный дизайн для мобильных устройств
- 🔒 Безопасная интеграция с Telegram

## Технологии

- Next.js
- TypeScript
- Tailwind CSS
- React
- Telegram Mini App API

## Установка

1. Клонируйте репозиторий:
```bash
git clone https://github.com/yourusername/muse-telegram-app.git
cd muse-telegram-app
```

2. Установите зависимости:
```bash
npm install
```

3. Создайте файл `.env.local` в корневой директории и добавьте необходимые переменные окружения:
```env
NEXT_PUBLIC_TELEGRAM_BOT_TOKEN=your_bot_token
```

4. Запустите приложение в режиме разработки:
```bash
npm run dev
```

5. Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## Разработка

### Структура проекта

```
src/
  ├── components/     # React компоненты
  │   ├── common/    # Общие компоненты
  │   ├── layout/    # Компоненты макета
  │   └── screens/   # Экраны приложения
  ├── pages/         # Страницы Next.js
  ├── styles/        # Глобальные стили
  ├── types/         # TypeScript типы
  └── utils/         # Утилиты
```

### Скрипты

- `npm run dev` - Запуск в режиме разработки
- `npm run build` - Сборка для продакшена
- `npm run start` - Запуск собранного приложения
- `npm run lint` - Проверка кода линтером

## Развертывание

1. Соберите приложение:
```bash
npm run build
```

2. Запустите собранное приложение:
```bash
npm run start
```

## Лицензия

MIT 