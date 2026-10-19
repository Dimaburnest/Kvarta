export type Interest = "subscription" | "one_time" | "question";

export type Product = {
  id: string;
  name: string;
  notes: string;
  amount: string;
  priceByn: number;
};

export function formatPrice(byn: number): string {
  return `${byn} BYN`;
}

export const brand = {
  name: "Кварта",
  city: "Минск",
  sinceYear: 2019,
  batchKg: 5,
  freshnessDays: "1–3",
} as const;

export const hero = {
  title: brand.name,
  lead: "Обжариваем в четверг. В пятницу зерно уже у вас.",
  about: `Обжариваем небольшими партиями по ${brand.batchKg} кг — так с ${brand.sinceYear} года. К вам зерно приезжает на ${brand.freshnessDays} день после обжарки.`,
} as const;

export const week = {
  thursday: {
    day: "Четверг",
    text: "Обжариваем партию на неделе.",
  },
  friday: {
    day: "Пятница",
    text: "Развозим по Минску и отдаём самовывозом.",
  },
} as const;

export const products: Product[] = [
  {
    id: "ethiopia",
    name: "Эфиопия Иргачеффе",
    notes: "Цветочный, бергамот, светлая обжарка",
    amount: "250 г",
    priceByn: 32,
  },
  {
    id: "colombia",
    name: "Колумбия Уила",
    notes: "Карамель, красное яблоко",
    amount: "250 г",
    priceByn: 29,
  },
  {
    id: "brazil",
    name: "Бразилия Серрадо",
    notes: "Орех, шоколад, под эспрессо",
    amount: "250 г",
    priceByn: 26,
  },
  {
    id: "drip",
    name: "Дрип-пакеты",
    notes: "Ассорти",
    amount: "10 штук",
    priceByn: 18,
  },
];

export const subscription = {
  packs: 2,
  packAmount: "250 г",
  priceByn: 54,
  period: "в месяц",
} as const;

export function subscriptionParagraph(): string {
  return `Две пачки по ${subscription.packAmount} раз в месяц — ${formatPrice(subscription.priceByn)}. Доставка по Минску бесплатно.`;
}

export const delivery = {
  address: "ул. Короля, 9",
  hoursWeekday: "пн–пт 8:00–20:00",
  hoursWeekend: "сб–вс 10:00–18:00",
  fridayNote: "Доставка по Минску в пятницу.",
  freeFromByn: 50,
} as const;

export const interestOptions: { value: Interest; label: string }[] = [
  { value: "subscription", label: "Подписка" },
  { value: "one_time", label: "Разовый заказ" },
  { value: "question", label: "Вопрос" },
];

export const formCopy = {
  title: "Заявка",
  nameLabel: "Имя",
  phoneLabel: "Телефон",
  interestLabel: "Что интересует",
  commentLabel: "Комментарий",
  phoneHint: "Белорусский номер, например +375 29 123-45-67",
  phoneError: "Нужен белорусский номер, например +375 29 123-45-67",
  nameError: "Укажите имя — от 1 до 80 символов",
  commentError: "Комментарий — до 1000 символов",
  submit: "Отправить заявку",
  submitting: "Отправляем",
  success: (name: string) =>
    `Заявка ушла. Менеджер перезвонит и оформит заказ, ${name}.`,
  failure:
    "Не отправилось. Проверьте интернет и нажмите ещё раз. Повтор того же номера в течение 10 минут не создаст вторую заявку.",
} as const;

export const footer = {
  note: "Менеджер перезвонит и оформит.",
} as const;

export const photos = {
  beans: {
    src: "/photos/zerno.jpg",
    alt: "Обжаренное зерно",
    width: 1220,
    height: 1600,
  },
  packaging: {
    src: "/photos/upakovka.jpg",
    alt: "Бумажные пачки кофе на полке",
    width: 2133,
    height: 1600,
  },
  entrance: {
    src: "/photos/vhod.jpg",
    alt: "Вход кофейни со стороны улицы",
    width: 2061,
    height: 1600,
  },
} as const;

export function parseInterestParam(
  value: string | string[] | undefined,
): Interest {
  const raw = Array.isArray(value) ? value[0] : value;
  if (raw === "subscription" || raw === "one_time") {
    return raw;
  }
  return "one_time";
}
