# Кварта

Лендинг обжарки «Кварта» в Минске. Цель — заявка на подписку или разовый заказ. Корзины, оплаты, личного кабинета и блога нет.


Проверяются `lib/phone.ts` и дедуп заявок (`lib/dedup.ts`) через `node:test`.

## Заявки: SQLite и Turso

Заявки сохраняются через `POST /api/lead` в SQLite (`@libsql/client`).

- Локально: `file:data/leads.db` (каталог `data/` создаётся сам).
- На публичном сайте: Turso, переменные `TURSO_DATABASE_URL` и `TURSO_AUTH_TOKEN`.

Пример переменных — `.env.example`. Файлы `.env` и `data/*.db` в `.gitignore`.

Почему так: деплой на Vercel, локальный файл там не переживает холодный старт, а форма на живой ссылке обязана сохранять заявку. Vercel — потому что в брифе Next.js плюс.

### Посмотреть заявки локально

После отправки формы:

```bash
sqlite3 data/leads.db "SELECT id, created_at, name, phone, interest, comment, attribution FROM leads ORDER BY created_at DESC;"
```

Если `sqlite3` нет — откройте `data/leads.db` в любом SQLite-клиенте.

### Атрибуция

При первой загрузке страницы в `sessionStorage` (ключ `kvarta_attr`) один раз пишется объект с полями:

`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `yclid`, `gclid`, `fbclid`, `referrer`, `landing_path`, `landing_url` (чего нет — `null`).

Форма добавляет `page_url` (адрес в момент отправки). Сервер сохраняет всё вместе в колонку `attribution` как JSON.

Повтор того же нормализованного телефона в течение 10 минут не создаёт вторую строку.

Дубль в Telegram выключен, пока не заданы `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID`.

## Шрифты

Golos Text для текста и полей. Если Golos Text недоступен в `next/font` — Manrope.

## Фото

Лицензия Unsplash / Pexels (свободное использование). Лиц нет. Не претендуем, что кадр — ул. Короля, 9.

| Файл | Автор | Название | URL |
|------|-------|----------|-----|
| `public/photos/zerno.jpg` | Mike Kenneally | Coffee bean lot | https://unsplash.com/photos/coffee-bean-lot-TD4DBagg2wE |
| `public/photos/upakovka.jpg` | Haberdoedas | Bags of coffee beans on shelves | https://unsplash.com/photos/bags-of-coffee-beans-on-shelves-qvRafRg5S2k |
| `public/photos/vhod.jpg` | Drew Anderson | Exterior of building with cafe | https://www.pexels.com/photo/exterior-of-building-with-cafe-5603558/ |

## заметки

проблема с разрешением строки "разовый заказ" не смог исправить.
в основе всё сделал ИИ, больше проблем не увидел.