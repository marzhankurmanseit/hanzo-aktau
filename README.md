# Hanzo Aktau

Суши, роллы и пицца в Актау — доставка и самовывоз.
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
railway up
```

## Что обновить владельцу

- **Цены и позиции меню** в секции «Сеты и комбо» — сейчас ориентировочные.
- Фото категорий (сейчас из Unsplash) — можно заменить на собственные снимки блюд.

## Контакты

- Телефон / WhatsApp: +7 775 428 43 23
- Instagram: [@hanzo_aktau](https://instagram.com/hanzo_aktau)
- Адрес: Актау, 5а мкр., дом 4 (ЖК Twin Towers)
- Часы: ежедневно 12:00 – 00:00
