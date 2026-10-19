# Кварта

Лендинг обжарки «Кварта» в Минске. Цель — заявка на подписку или разовый заказ. Корзины, оплаты, личного кабинета и блога нет.

Клиент вымышленный. Факты — только в `docs/brief.md`. Визуальные решения — в `docs/design.md`.

## Запуск

```bash
npm install
npm run dev
```

Открыть [http://localhost:3000](http://localhost:3000).

## Тесты

```bash
npm test
```

Проверяется `lib/phone.ts` через `node:test`.

## Заявки: SQLite и Turso

Заявки хранятся в SQLite через `@libsql/client` (пока не реализовано).

- Локально: `url` = `file:data/leads.db`.
- На публичном сайте: Turso, переменные `TURSO_DATABASE_URL` и `TURSO_AUTH_TOKEN`.

Пример переменных — `.env.example`. Файлы `.env` и `data/*.db` в `.gitignore`.

Почему так: деплой на Vercel, локальный файл там не переживает холодный старт, а форма на живой ссылке обязана сохранять заявку. Vercel — потому что в брифе Next.js плюс.

## Шрифты

Golos Text для текста и полей. Если Golos Text недоступен в `next/font` — Manrope.

## Фото

Лицензия Unsplash / Pexels (свободное использование). Лиц нет. Не претендуем, что кадр — ул. Короля, 9.

| Файл | Автор | Название | URL |
|------|-------|----------|-----|
| `public/photos/zerno.jpg` | Mike Kenneally | Coffee bean lot | https://unsplash.com/photos/coffee-bean-lot-TD4DBagg2wE |
| `public/photos/upakovka.jpg` | Haberdoedas | Bags of coffee beans on shelves | https://unsplash.com/photos/bags-of-coffee-beans-on-shelves-qvRafRg5S2k |
| `public/photos/vhod.jpg` | Drew Anderson | Exterior of building with cafe | https://www.pexels.com/photo/exterior-of-building-with-cafe-5603558/ |

## Допущение

Менеджер перезвонит и оформит заказ. Онлайн-оплаты на сайте нет.

## Заполняет человек

-
-
-
