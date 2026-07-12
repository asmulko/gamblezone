# PLAN.md — Affiliate Casino Showcase Platform

## 1. Назначение документа

Этот файл является основным рабочим планом для AI-агента, который будет проектировать и разрабатывать MVP сайта-витрины с обзорами легальных онлайн-казино и партнёрскими ссылками.

Агент должен использовать этот документ как источник требований, порядка реализации и критериев готовности. При конфликте между скоростью разработки, безопасностью и юридической корректностью приоритет имеют:

1. Законность и защита пользователей.
2. Корректность партнёрского трекинга.
3. Простота поддержки.
4. Скорость выхода MVP.
5. Визуальные улучшения и дополнительные функции.

Проект не должен использовать украденные, купленные без подтверждённого согласия или иным образом незаконно полученные базы email-адресов. Рассылки допускаются только по контактам, для которых документировано законное основание и разрешена маркетинговая коммуникация.

---

## 2. Концепция проекта

Создать быстрый, визуально привлекательный и вызывающий доверие сайт-витрину в тёмной бордово-красной стилистике.

Основной сценарий:

1. Пользователь попадает на лендинг из поисковой системы, партнёрского источника или разрешённой email-рассылки.
2. Видит сравнительную таблицу 6–8 лицензированных казино.
3. Может изучить бонус, преимущества, ограничения, способы оплаты, поддерживаемые страны и подробный обзор.
4. Переходит на сайт оператора по партнёрской ссылке.
5. Переход фиксируется во внутренней аналитике без хранения лишних персональных данных.

Позиционирование MVP:

> Независимый каталог и сравнение легальных онлайн-казино с прозрачным описанием бонусов, условий и рисков.

Проект не является казино, не принимает ставки, не хранит баланс пользователей и не обрабатывает игровые платежи.

---

## 3. Основные ограничения

### 3.1. Юридические и этические ограничения

До публикации в каждой целевой стране необходимо проверить:

- разрешена ли реклама азартных игр;
- какие операторы имеют право рекламироваться;
- требуется ли лицензия самому affiliate-проекту;
- допустимы ли бонусы и формулировки рекламных предложений;
- обязательны ли возрастные предупреждения;
- обязательны ли локальные ссылки на помощь при игровой зависимости;
- разрешено ли продвижение через email;
- нужны ли geo-blocking или исключение отдельных регионов;
- какие cookie и tracking-механизмы разрешены.

Обязательные правила сайта:

- рекламировать только операторов, законность которых подтверждена для выбранной географии;
- явно отмечать партнёрские ссылки;
- не обещать гарантированный выигрыш;
- не использовать фразы вроде «без риска», «лёгкие деньги», «гарантированная прибыль»;
- не ориентировать рекламу на несовершеннолетних;
- не использовать визуальные образы, явно рассчитанные на детей;
- не создавать ложную срочность;
- показывать существенные условия бонуса рядом с предложением;
- предоставлять способ сообщить о неточной информации;
- публиковать материалы об ответственной игре;
- поддерживать быстрое удаление пользователя из email-рассылки.

### 3.2. Ограничения MVP

В первую версию не входят:

- регистрация пользователей;
- личный кабинет;
- собственная платёжная система;
- пополнение баланса;
- ставки или игровые механики;
- собственные стримы;
- комментарии и форум;
- автоматический импорт данных с сайтов казино;
- сложная CMS;
- мобильное приложение;
- персонализация предложений на основе чувствительных данных;
- массовая холодная рассылка.

---

## 4. Целевая аудитория

Первичная аудитория:

- совершеннолетние пользователи, уже интересующиеся онлайн-гемблингом;
- пользователи, ищущие сравнение лицензированных операторов;
- пользователи, которым важны бонусы, способы оплаты, скорость вывода и репутация;
- пользователи из заранее определённых разрешённых географий.

Нельзя предполагать, что один набор казино, текстов и правил подходит для всех стран.

Для каждого рынка необходимо хранить отдельные:

- доступность казино;
- affiliate-ссылки;
- тексты предупреждений;
- валюты;
- языки;
- юридические страницы;
- ссылки на службы помощи;
- правила показа бонусов.

---

## 5. Ключевые метрики

### 5.1. Метрики продукта

- количество уникальных посетителей;
- CTR карточек казино;
- CTR основной сравнительной таблицы;
- переходы на детальные обзоры;
- глубина просмотра;
- возвраты пользователей;
- подписки на разрешённую рассылку;
- доля мобильного трафика;
- Core Web Vitals.

### 5.2. Affiliate-метрики

- outbound clicks;
- уникальные outbound clicks;
- clicks по каждому оператору;
- clicks по каждой позиции на странице;
- clicks по каждой кампании;
- registrations, если affiliate-сеть передаёт postback;
- first-time deposit, если affiliate-сеть передаёт postback;
- revenue;
- EPC;
- conversion rate;
- доход на 1 000 посетителей.

### 5.3. Email-метрики

Только для разрешённой opt-in базы:

- delivered;
- bounce rate;
- complaint rate;
- open rate, если измерение допустимо;
- click rate;
- unsubscribe rate;
- conversion rate;
- revenue per campaign.

---

## 6. Рекомендуемый технический стек

### 6.1. Frontend

- Next.js с App Router;
- React;
- TypeScript в strict-режиме;
- Tailwind CSS;
- shadcn/ui или собственные простые компоненты;
- Lucide Icons;
- next/image;
- Zod для валидации конфигурации и форм;
- React Hook Form для форм;
- ESLint;
- Prettier;
- Vitest;
- React Testing Library;
- Playwright для ключевых E2E-сценариев.

Причины выбора Next.js:

- SSR и статическая генерация;
- хорошие возможности для SEO;
- простое создание динамических metadata;
- удобная генерация sitemap;
- возможность сделать MVP почти полностью статическим;
- API routes для redirect tracking и форм.

### 6.2. Backend пока не нужен, будем пользоваться vercel статистикой (оставляем на будущее)

Для MVP использовать один из вариантов:

**Предпочтительный вариант:**

- Next.js Route Handlers;
- PostgreSQL;
- Supabase для базы данных и простого администрирования;
- Drizzle ORM.

**Упрощённый старт:**

- данные казино в versioned JSON/TypeScript-файлах;
- аналитика через Plausible или PostHog;
- redirect endpoint без собственной базы либо с минимальным логированием.

Начинать с упрощённого старта. Переносить данные в PostgreSQL только после подтверждения трафика и необходимости часто редактировать контент.

### 6.3. Hosting

Рекомендуемый MVP:

- Vercel для frontend;
- Cloudflare для DNS, WAF и базовой защиты; (не надо сейчас)
- Supabase для PostgreSQL при необходимости; (не надо сейчас)
- отдельный transactional/bulk email provider только для законной opt-in базы. (не надо сейчас)

Не отправлять массовые письма через обычный mailbox домена.

---

## 7. Структура репозитория

```text
/
├── PLAN.md
├── README.md
├── package.json
├── next.config.ts
├── tsconfig.json
├── eslint.config.mjs
├── .env.example
├── public/
│   ├── brand/
│   ├── casinos/
│   ├── payment-methods/
│   └── responsible-gambling/
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── page.tsx
│   │   │   ├── casinos/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── bonuses/page.tsx
│   │   │   ├── guides/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── responsible-gambling/page.tsx
│   │   │   ├── methodology/page.tsx
│   │   │   ├── affiliate-disclosure/page.tsx
│   │   │   ├── privacy/page.tsx
│   │   │   ├── cookies/page.tsx
│   │   │   ├── terms/page.tsx
│   │   │   └── contact/page.tsx
│   │   ├── go/[casino]/route.ts
│   │   ├── api/
│   │   │   ├── newsletter/route.ts
│   │   │   └── health/route.ts
│   │   ├── robots.ts
│   │   ├── sitemap.ts
│   │   ├── layout.tsx
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── casino/
│   │   ├── comparison/
│   │   ├── content/
│   │   ├── forms/
│   │   ├── layout/
│   │   ├── responsible-gambling/
│   │   └── ui/
│   ├── config/
│   │   ├── markets.ts
│   │   ├── navigation.ts
│   │   └── site.ts
│   ├── content/
│   │   ├── casinos/
│   │   ├── guides/
│   │   └── legal/
│   ├── data/
│   │   ├── casinos.ts
│   │   ├── offers.ts
│   │   └── payment-methods.ts
│   ├── lib/
│   │   ├── analytics/
│   │   ├── affiliate/
│   │   ├── compliance/
│   │   ├── email/
│   │   ├── seo/
│   │   ├── validation/
│   │   └── utils/
│   ├── styles/
│   └── types/
└── tests/
    ├── e2e/
    ├── integration/
    └── unit/
```

---

## 8. Модель данных

### 8.1. Casino

```ts
type Casino = {
  id: string;
  slug: string;
  name: string;
  logoUrl: string;
  heroImageUrl?: string;

  status: "draft" | "active" | "paused" | "archived";

  foundedYear?: number;
  operatorName?: string;
  licenses: CasinoLicense[];

  supportedMarkets: string[];
  blockedMarkets: string[];
  supportedLanguages: string[];
  supportedCurrencies: string[];

  rating: number;
  editorialScore: number;
  trustScore?: number;

  minDeposit?: Money;
  minWithdrawal?: Money;
  withdrawalTimeText?: string;

  paymentMethods: string[];
  gameProviders: string[];
  gameTypes: string[];

  pros: string[];
  cons: string[];

  shortDescription: string;
  reviewSummary: string;

  responsibleGamblingTools: string[];
  supportChannels: string[];

  affiliateLinks: AffiliateLink[];
  offers: CasinoOffer[];

  publishedAt?: string;
  reviewedAt?: string;
  nextReviewAt?: string;
};
```

### 8.2. CasinoLicense

```ts
type CasinoLicense = {
  authority: string;
  licenseNumber?: string;
  verificationUrl?: string;
  markets: string[];
  verifiedAt: string;
};
```

### 8.3. CasinoOffer

```ts
type CasinoOffer = {
  id: string;
  casinoId: string;
  market: string;
  title: string;
  shortTerms: string;
  fullTermsUrl?: string;
  bonusCode?: string;
  valueText?: string;
  wageringText?: string;
  minDepositText?: string;
  expiresAt?: string;
  status: "draft" | "active" | "expired" | "paused";
  verifiedAt: string;
};
```

### 8.4. AffiliateLink

```ts
type AffiliateLink = {
  id: string;
  casinoId: string;
  market: string;
  campaign: string;
  destinationUrl: string;
  enabled: boolean;
  rel: "sponsored nofollow";
  createdAt: string;
  updatedAt: string;
};
```

### 8.5. ClickEvent

Хранить минимальный набор данных:

```ts
type ClickEvent = {
  id: string;
  casinoId: string;
  affiliateLinkId: string;
  campaign?: string;
  placement?: string;
  market?: string;
  pagePath?: string;
  referrerHost?: string;
  anonymousSessionId?: string;
  createdAt: string;
};
```

Не хранить полный IP дольше технически необходимого. Не сохранять URL-параметры, которые могут содержать email, имя или иные персональные данные.

---

## 9. Страницы MVP

### 9.1. Главная страница

Блоки:

1. Header.
2. Hero:
   - понятный заголовок;
   - краткое объяснение методологии;
   - CTA к рейтингу;
   - предупреждение 18+.
3. Топ казино:
   - 6–8 карточек;
   - рейтинг;
   - бонус;
   - 3 преимущества;
   - существенные условия;
   - CTA «Открыть сайт».
4. Сравнительная таблица.
5. Как формируется рейтинг.
6. Популярные способы оплаты.
7. Краткие гайды.
8. Responsible gambling block.
9. FAQ.
10. Affiliate disclosure.
11. Footer с юридическими ссылками.

### 9.2. Каталог казино

Функции:

- сортировка по editorial score;
- фильтр по стране;
- фильтр по способу оплаты;
- фильтр по валюте;
- фильтр по типу бонуса;
- фильтр по скорости вывода;
- сброс фильтров;
- человекочитаемый URL для индексируемых категорий;
- запрет индексации бесполезных комбинаций query-параметров.

### 9.3. Детальная страница казино

Структура:

- логотип и общий рейтинг;
- дата последней проверки;
- доступность по странам;
- лицензии;
- бонус с существенными условиями;
- преимущества и недостатки;
- способы оплаты;
- скорость вывода;
- ассортимент игр;
- поддержка;
- инструменты ответственной игры;
- экспертный вывод;
- FAQ;
- affiliate disclosure;
- CTA;
- похожие казино.

### 9.4. Методология рейтинга

Описать критерии и веса:

- лицензия и юридическая прозрачность — 25%;
- безопасность и репутация — 20%;
- выплаты и условия вывода — 15%;
- честность бонусных условий — 15%;
- ассортимент и качество продукта — 10%;
- поддержка — 5%;
- responsible gambling tools — 10%.

Платная позиция не должна незаметно менять редакционную оценку.

Спонсируемое размещение необходимо маркировать отдельно.

### 9.5. Responsible Gambling

Страница должна содержать:

- объяснение рисков;
- признаки проблемного поведения;
- советы по лимитам;
- информацию о самоисключении;
- локальные контакты помощи;
- напоминание, что азартные игры не являются способом заработка;
- экстренные ссылки для каждой поддерживаемой страны.

### 9.6. Юридические страницы

Минимум:

- Privacy Policy;
- Cookie Policy;
- Terms of Use;
- Affiliate Disclosure;
- Responsible Gambling;
- Editorial Methodology;
- Contact;
- Complaints / Corrections Policy.

---

## 10. Визуальная система

### 10.1. Общий стиль

Настроение:

- премиальный;
- тёмный;
- современный;
- не перегруженный;
- без визуальной стилистики дешёвого слот-сайта;
- без мигающих элементов;
- без чрезмерных анимаций.

Цветовая база:

- фон: почти чёрный;
- поверхности: графитовый;
- основной accent: бордовый;
- secondary accent: приглушённый красный;
- текст: тёплый белый;
- muted text: серый;
- success: спокойный зелёный;
- warning: янтарный.

Цвета должны быть оформлены CSS variables, а не разбросаны по компонентам.

### 10.2. Компоненты

Создать:

- Button;
- Badge;
- Card;
- Rating;
- CasinoLogo;
- OfferTerms;
- AffiliateCTA;
- ComparisonTable;
- FilterBar;
- Disclosure;
- AgeNotice;
- ResponsibleGamblingNotice;
- ReviewMetadata;
- ProsCons;
- PaymentMethods;
- LicenseList;
- FAQAccordion;
- NewsletterForm;
- CookieSettings.

### 10.3. Адаптивность

Приоритет:

1. мобильные устройства;
2. desktop;
3. tablet.

На мобильном сравнительная таблица превращается в вертикальные карточки либо горизонтально прокручиваемый блок с закреплённым названием казино.

---

## 11. Affiliate tracking

### 11.1. Redirect endpoint

Все внешние CTA ведут не напрямую на affiliate URL, а через:

```text
/go/{casino}?campaign={campaign}&placement={placement}
```

Endpoint должен:

1. проверить существование казино;
2. определить market;
3. выбрать активную ссылку;
4. проверить URL по allowlist доменов;
5. записать минимальный click event;
6. отправить HTTP 302 или 307 redirect;
7. не принимать произвольный redirect URL из query string.

### 11.2. Защита

Запрещено:

- open redirect;
- пользовательский destination URL;
- выполнение HTML из affiliate-параметров;
- передача email пользователя в ссылке;
- логирование секретных токенов;
- хранение affiliate credentials во frontend.

### 11.3. SubID

Использовать понятную схему:

```text
site_market_page_placement_campaign
```

Пример:

```text
main_de_home_topcard_welcome01
```

Не включать в SubID персональные данные.

---

## 12. Email-маркетинг

### 12.1. Разрешённая модель

Рассылку строить только для:

- пользователей, давших проверяемое согласие;
- контактов, для которых юридически подтверждено другое допустимое основание;
- адресов с зафиксированным источником, временем и текстом согласия.

Каждый контакт должен иметь:

```ts
type Subscriber = {
  id: string;
  email: string;
  locale: string;
  market: string;
  status: "pending" | "subscribed" | "unsubscribed" | "suppressed";
  consentSource: string;
  consentTextVersion: string;
  consentAt: string;
  confirmedAt?: string;
  unsubscribedAt?: string;
};
```

Предпочтительно использовать double opt-in.

### 12.2. Запрещённая модель

Не реализовывать:

- импорт базы без provenance;
- обход unsubscribe;
- смену доменов для обхода блокировок;
- ротацию отправителей для обхода spam filters;
- скрытые tracking-механизмы;
- подмену отправителя;
- отправку от чужого бренда;
- покупку «прогретых» mailbox-аккаунтов;
- генерацию случайных адресов;
- scraping email-адресов.

### 12.3. DNS и доставляемость

До первой кампании настроить:

- SPF;
- DKIM;
- DMARC;
- отдельный sending subdomain;
- return-path;
- branded tracking domain;
- TLS;
- List-Unsubscribe;
- one-click unsubscribe, когда поддерживается;
- suppression list;
- bounce handling;
- complaint handling.

Пример разделения:

```text
example.com           — основной сайт
mail.example.com      — маркетинговые ссылки
news.example.com      — sending subdomain
hello@example.com     — обычная коммуникация
```

### 12.4. Email pipeline

```text
Consent form
  -> validation
  -> double opt-in
  -> subscriber store
  -> segmentation
  -> campaign approval
  -> provider send
  -> webhook events
  -> suppression updates
  -> analytics
```

### 12.5. Campaign approval checklist

Перед отправкой агент должен проверить:

- оператор разрешён в market получателя;
- предложение не истекло;
- условия бонуса актуальны;
- есть 18+ warning;
- есть responsible gambling notice;
- есть affiliate disclosure;
- есть unsubscribe;
- адрес и идентичность отправителя указаны;
- список не содержит suppressed users;
- ссылка ведёт на правильный market;
- текст не обещает выигрыш;
- нет ложной срочности;
- письмо протестировано в мобильном виде;
- UTM и SubID не содержат PII.

---

## 13. SEO

### 13.1. Техническое SEO

Реализовать:

- статические или server-rendered страницы;
- canonical URLs;
- hreflang для локалей и рынков;
- robots.txt;
- sitemap.xml;
- корректные 404;
- metadata API;
- Open Graph;
- Twitter cards;
- breadcrumbs;
- Schema.org;
- оптимизацию изображений;
- lazy loading;
- noindex для технических страниц;
- noindex для пустых фильтров;
- контроль дубликатов.

### 13.2. Schema.org

Допустимые типы:

- WebSite;
- Organization;
- BreadcrumbList;
- Article;
- FAQPage, только когда FAQ реально виден пользователю;
- ItemList.

Не использовать фиктивные AggregateRating или Review, если рейтинг не основан на прозрачной методологии и реальном содержимом страницы.

### 13.3. Контентные кластеры

MVP-кластеры:

- best online casinos;
- casino reviews;
- casino bonuses;
- payment methods;
- fast withdrawal casinos;
- mobile casinos;
- licensed casinos;
- responsible gambling;
- guides for beginners;
- glossary.

Каждая статья должна:

- отвечать на конкретный intent;
- содержать автора или редактора;
- иметь дату проверки;
- ссылаться на методологию;
- избегать шаблонного AI-текста;
- проверяться человеком перед публикацией.

### 13.4. Программное SEO

Не запускать массовую генерацию сотен страниц в MVP.

Допустимы только полезные страницы, для которых есть:

- уникальный контент;
- подтверждённые данные;
- реальная пользовательская ценность;
- понятная стратегия обновления.

---

## 14. Аналитика

### 14.1. События

```text
page_view
casino_card_view
casino_card_click
comparison_sort
comparison_filter
affiliate_click
offer_terms_open
newsletter_submit
newsletter_confirm
newsletter_unsubscribe
responsible_gambling_open
```

### 14.2. Параметры

Разрешённые параметры:

- casino_id;
- market;
- locale;
- placement;
- campaign;
- page_type;
- rank_position.

Не отправлять в аналитику:

- email;
- имя;
- полный IP;
- содержимое форм;
- полный affiliate URL с секретами;
- произвольные query-параметры.

### 14.3. Consent mode

До согласия пользователя активировать только строго необходимые механизмы.

Необязательную аналитику и marketing cookies запускать только в соответствии с требованиями выбранного рынка.

---

## 15. Безопасность

Обязательные меры:

- strict TypeScript;
- Zod validation;
- Content Security Policy;
- secure headers;
- rate limiting для API;
- CSRF-защита там, где применимо;
- bot protection для форм;
- server-side allowlist внешних доменов;
- secrets только в environment variables;
- dependency scanning;
- lockfile;
- регулярное обновление зависимостей;
- логирование ошибок без PII;
- резервные копии базы;
- role-based access для будущей CMS;
- preview deployment без индексации;
- защита webhook endpoints подписью провайдера.

---

## 16. Локализация и geo-awareness

MVP должен поддерживать минимум один market и один язык, но архитектура должна быть готова к расширению.

Принципы:

- locale и market — разные сущности;
- язык интерфейса не гарантирует страну пользователя;
- market нельзя определять только по языку браузера;
- IP geo используется как подсказка, а не как единственный источник;
- пользователь может вручную выбрать регион;
- affiliate-link выбирается по market;
- запрещённый market не получает активный CTA.

При отсутствии разрешённого предложения показать:

> Этот оператор недоступен для выбранного региона.

---

## 17. Администрирование контента

### 17.1. MVP

На первом этапе контент хранить в типизированных файлах:

```text
src/content/casinos/{slug}/{locale}.mdx
src/data/casinos.ts
src/data/offers.ts
```

### 17.2. Вторая версия

После появления трафика добавить admin panel:

- вход только для команды;
- роли editor/admin;
- CRUD казино;
- CRUD offers;
- affiliate links;
- market availability;
- scheduled publishing;
- audit log;
- preview;
- обязательная дата следующей проверки;
- статус «pause», мгновенно отключающий CTA.

---

## 18. Стримы и расширение платформы

Не включать в MVP, но предусмотреть будущий модуль.

Возможности:

- каталог стримеров;
- легальные embed-плееры;
- расписание стримов;
- карточки live/offline;
- фильтр по игре и языку;
- sponsor label;
- moderation;
- жалобы на контент;
- geo restrictions;
- удаление недоступных embed;
- отдельные правила рекламы.

Перед интеграцией проверить разрешение платформы, стримера и право использования embed-контента.

---

## 19. Этапы разработки

## Phase 0 — Discovery and compliance

Задачи:

- выбрать первый market;
- определить язык;
- проверить правила рекламы;
- составить allowlist операторов;
- подтвердить affiliate agreements;
- определить brand name;
- проверить домен и товарные знаки;
- создать список обязательных юридических текстов;
- определить источник контента;
- определить владельца проверки бонусов;
- определить lawful basis email-рассылок.

Результат:

- заполненный `docs/market-requirements.md`;
- список из 6–8 допустимых операторов;
- подтверждённые affiliate URLs;
- согласованный brand brief.

Стоп-условие:

Нельзя переходить к публикации, пока legality выбранных операторов и маркетинговых каналов не подтверждена.

## Phase 1 — Project foundation

Задачи:

- создать Next.js-проект;
- включить TypeScript strict;
- настроить ESLint и Prettier;
- настроить Tailwind;
- создать CSS variables;
- настроить aliases;
- создать базовый layout;
- создать `.env.example`;
- добавить тесты;
- добавить CI;
- добавить preview deployment;
- добавить health endpoint.

Критерий готовности:

- проект собирается;
- lint проходит;
- typecheck проходит;
- unit tests проходят;
- preview доступен;
- preview закрыт от индексации.

## Phase 2 — Design system

Задачи:

- реализовать typography;
- реализовать цвета;
- создать Button;
- Card;
- Badge;
- Rating;
- CTA;
- Disclosure;
- AgeNotice;
- Header;
- Footer;
- responsive container;
- loading states;
- empty states;
- error states.

Критерий готовности:

- компоненты работают на mobile и desktop;
- keyboard navigation работает;
- контраст приемлем;
- focus states видимы.

## Phase 3 — Content model

Задачи:

- создать Zod schemas;
- создать TypeScript-типы;
- добавить 2 mock casino;
- добавить валидатор offers;
- добавить market configuration;
- добавить функцию выбора affiliate-link;
- добавить тесты на expired offer;
- добавить тесты на blocked market;
- добавить тесты на disabled affiliate link.

Критерий готовности:

- некорректные данные ломают build с понятной ошибкой;
- истёкший offer не отображается;
- запрещённый market не получает CTA.

## Phase 4 — MVP pages

Порядок:

1. Home.
2. Casino catalog.
3. Casino detail.
4. Methodology.
5. Responsible Gambling.
6. Affiliate Disclosure.
7. Privacy/Cookies/Terms.
8. Contact.
9. 404.

Критерий готовности:

- навигация полная;
- нет пустых ссылок;
- весь основной контент доступен без JavaScript там, где возможно;
- страницы имеют metadata;
- CTA маркированы.

## Phase 5 — Affiliate redirect and analytics

Задачи:

- реализовать `/go/[casino]`;
- добавить allowlist;
- добавить placement;
- добавить campaign;
- добавить anonymous event logging;
- добавить rate limiting;
- добавить тест open redirect;
- добавить тест blocked casino;
- добавить тест disabled offer;
- настроить аналитику.

Критерий готовности:

- произвольный redirect невозможен;
- каждый CTA имеет корректный placement;
- outbound clicks видны в dashboard;
- PII не записывается.

## Phase 6 — SEO

Задачи:

- sitemap;
- robots;
- canonical;
- hreflang;
- Open Graph;
- breadcrumbs;
- schema;
- оптимизация изображений;
- проверка Lighthouse;
- проверка indexability;
- проверка duplicated titles;
- проверка broken links.

Критерий готовности:

- нет критических SEO-ошибок;
- sitemap содержит только индексируемые страницы;
- preview не индексируется;
- production robots корректен.

## Phase 7 — Email foundation

Выполнять только после подтверждения законности базы.

Задачи:

- выбрать provider;
- настроить sending subdomain;
- SPF;
- DKIM;
- DMARC;
- branded tracking domain;
- newsletter form;
- double opt-in;
- unsubscribe;
- suppression;
- provider webhooks;
- consent logging;
- campaign templates;
- seed-list testing;
- monitoring bounce/complaints.

Критерий готовности:

- невозможно добавить контакт без consent metadata;
- unsubscribe применяется немедленно;
- suppressed contact не отправляется повторно;
- webhook signatures проверяются;
- письмо содержит обязательные disclosures.

## Phase 8 — Launch

Перед запуском:

- провести ручную проверку всех казино;
- проверить affiliate links;
- проверить market routing;
- проверить мобильную версию;
- проверить accessibility;
- проверить legal pages;
- проверить cookie behavior;
- проверить monitoring;
- проверить backups;
- проверить error alerts;
- проверить 404;
- проверить redirect analytics;
- проверить email unsubscribe;
- включить production indexing;
- отправить sitemap в search consoles.

---

## 20. Definition of Done

Задача считается завершённой только если:

- код написан;
- типы корректны;
- нет lint errors;
- есть необходимые тесты;
- mobile view проверен;
- accessibility проверена;
- ошибки обработаны;
- данные валидируются;
- нет PII в логах;
- нет небезопасного redirect;
- тексты не нарушают responsible gambling policy;
- affiliate content промаркирован;
- документация обновлена.

---

## 21. Начальный backlog

### P0

- [ ] Определить первый market.
- [ ] Определить brand name.
- [ ] Выбрать домен.
- [ ] Подтвердить 6–8 legal operators.
- [ ] Получить affiliate links.
- [ ] Создать Next.js repository.
- [ ] Настроить TypeScript strict.
- [ ] Реализовать design tokens.
- [ ] Реализовать Home.
- [ ] Реализовать CasinoCard.
- [ ] Реализовать ComparisonTable.
- [ ] Реализовать casino detail.
- [ ] Реализовать affiliate redirect.
- [ ] Добавить Responsible Gambling.
- [ ] Добавить Affiliate Disclosure.
- [ ] Добавить Privacy/Cookies/Terms.
- [ ] Добавить sitemap и robots.
- [ ] Добавить analytics.
- [ ] Провести launch audit.

### P1

- [ ] Каталог с фильтрами.
- [ ] Payment method pages.
- [ ] Bonus pages.
- [ ] Editorial methodology.
- [ ] MDX guides.
- [ ] Локализация.
- [ ] Consent-based newsletter.
- [ ] Provider webhooks.
- [ ] Postback integration.
- [ ] Admin panel.

### P2

- [ ] Стримы.
- [ ] Расписание.
- [ ] Персональные подборки без чувствительного профилирования.
- [ ] Saved casinos.
- [ ] User accounts.
- [ ] Advanced affiliate dashboard.
- [ ] A/B testing.
- [ ] Automated offer expiry alerts.

---

## 22. Первые задачи для coding agent

Агент должен начать со следующего:

1. Прочитать весь `PLAN.md`.
2. Создать `README.md` с командами запуска.
3. Инициализировать Next.js, TypeScript и Tailwind.
4. Настроить strict type checking.
5. Создать структуру директорий.
6. Создать `site.ts` и `markets.ts`.
7. Создать Zod schema для `Casino`, `CasinoOffer` и `AffiliateLink`.
8. Добавить два mock casino без реальных affiliate credentials.
9. Создать базовую тёмно-бордовую тему.
10. Реализовать Header, Footer, Button, CasinoCard и Disclosure.
11. Собрать первую версию Home.
12. Добавить unit tests для схем данных.
13. Не подключать email-отправку до появления подтверждённого lawful consent flow.
14. Не добавлять реальные casino claims, лицензии или бонусы без предоставленных и проверенных данных.
15. После каждого этапа обновлять checklist в этом файле либо в `docs/progress.md`.

---

## 23. Правила поведения AI-агента

Агент обязан:

- не придумывать лицензии, бонусы, рейтинги и условия;
- помечать mock-данные;
- не использовать непроверенные affiliate URLs;
- не добавлять tracking без документированной цели;
- не реализовывать spam tooling;
- не создавать инструменты обхода anti-spam систем;
- не хранить secrets в Git;
- не публиковать production deployment без legal checklist;
- делать небольшие понятные commits;
- сохранять приложение работоспособным после каждого этапа;
- сначала реализовывать простое решение;
- не добавлять базу данных, если статические данные пока достаточны;
- не добавлять CMS до появления реальной потребности;
- документировать компромиссы;
- задавать вопрос только при блокирующей неопределённости;
- в остальных случаях выбирать безопасное минимальное решение.

---

## 24. Предлагаемая стратегия MVP

Самый быстрый и разумный первый релиз:

- один рынок;
- один язык;
- 6–8 казино;
- ручное управление данными;
- Next.js static generation;
- главная;
- каталог;
- детальные обзоры;
- affiliate redirect;
- privacy-friendly analytics;
- без аккаунтов;
- без CMS;
- без собственной базы пользователей;
- без email-рассылки до подтверждения законности и согласия контактов;
- без стримов.

Сначала необходимо доказать:

1. Пользователи переходят на сайт.
2. Пользователи кликают по предложениям.
3. Affiliate tracking работает.
4. Контент индексируется.
5. Экономика хотя бы потенциально положительная.

Только после этого добавлять CMS, расширенную аналитику, рассылки, новые рынки и стримы.