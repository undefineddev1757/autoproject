This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npx next dev
# or
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Contact Page
After selecting a car you will be redirected to `/contact` to provide your email and phone.

## 🚀 Деплой

### Быстрый старт (Локально)

```bash
# Установите зависимости
pnpm install

# Запустите в режиме разработки
pnpm dev
```

### 🐳 Docker (Локальная разработка)

```bash
# Режим разработки
NODE_ENV=development docker compose up --build

# Режим продакшена
docker compose up --build
```

### 🌐 Деплой на сервер Ubuntu 22.04

**Быстрая инструкция**: См. [QUICK-START.md](./QUICK-START.md)

**Полная документация**: См. [DEPLOY.md](./DEPLOY.md)

#### Краткие шаги:

1. Установите Docker на сервере
2. Клонируйте репозиторий
3. Создайте `.env` файл (используйте `.env.example` как шаблон)
4. Запустите: `docker compose up -d --build`

```bash
# На сервере
curl -fsSL https://get.docker.com | sudo sh
git clone <URL_репозитория> autoshopone
cd autoshopone
cp .env.example .env
nano .env  # заполните переменные
docker compose up -d --build
```

**Готово!** Приложение доступно на портах:
- Web: 3000
- API: 5000

Для настройки домена и SSL см. [DEPLOY.md](./DEPLOY.md)
# autoproject
