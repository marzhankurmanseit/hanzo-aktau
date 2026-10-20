# Samurai Almaty

Суши, роллы и пицца в Алматы — доставка и самовывоз.
Современный одностраничный сайт (KZ / RU) с переключателем языков.

## Стек

- Статический фронтенд: `public/index.html`, `public/styles.css`, `public/script.js`
- Лёгкий сервер без зависимостей: `server.js` (Node.js `http`)
- Деплой: Railway (Nixpacks)

## Локальный запуск

```bash
npm start
# → http://localhost:3000
```

## Деплой на Railway

Проект настроен (`railway.json`) на запуск `node server.js` и слушает `process.env.PORT`.

```bash
railway up --ci --service hanzo-aktau
```

## Что обновить владельцу

- **Телефон, адрес, Instagram** — сейчас заполнены как плейсхолдеры
  (адрес: пр. Абая 10, Instagram: @samurai_almaty). Замените на реальные.
- **Цены и позиции меню** — сейчас ориентировочные.
- Фото категорий и блюд (сейчас из Unsplash) — можно заменить на собственные снимки.

## Контакты (плейсхолдеры)

- Телефон / WhatsApp: +7 775 428 43 23
- Instagram: @samurai_almaty
- Адрес: Алматы, пр. Абая, 10
- Часы: ежедневно 12:00 – 00:00
