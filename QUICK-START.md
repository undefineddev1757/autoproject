# ⚡ Быстрый старт деплоя на Ubuntu 22.04

## 🎯 Краткая инструкция (5 минут)

### 1. Установка Docker (на сервере)

```bash
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER
newgrp docker
```

### 2. Клонирование проекта

```bash
git clone <URL_репозитория> autoshopone
cd autoshopone
```

### 3. Настройка переменных окружения

```bash
# Создайте .env файл
cat > .env << EOF
NODE_ENV=production
TELEGRAM_BOT_TOKEN=ваш_токен
TELEGRAM_CHAT_ID=ваш_chat_id
EOF
```

### 4. Запуск

```bash
docker compose up -d --build
```

✅ **Готово!** Приложение работает на:
- Web: http://ваш-ip:3000
- API: http://ваш-ip:5000

---

## 🌐 Настройка домена и SSL (опционально)

### Установка Nginx

```bash
sudo apt install -y nginx
```

### Настройка

```bash
# Создайте конфигурацию
sudo nano /etc/nginx/sites-available/autoshopone
```

Скопируйте содержимое из `nginx.conf`, замените `ваш_домен.com` на реальный домен.

```bash
# Активируйте конфигурацию
sudo ln -s /etc/nginx/sites-available/autoshopone /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
```

### SSL сертификат

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d ваш_домен.com -d www.ваш_домен.com
```

---

## 📊 Полезные команды

```bash
# Просмотр логов
docker compose logs -f

# Перезапуск
docker compose restart

# Обновление (после git pull)
./deploy.sh

# Остановка
docker compose down

# Статус
docker compose ps
```

---

## 🔧 Решение проблем

### Порт занят
```bash
sudo lsof -i :3000
sudo lsof -i :5000
sudo kill -9 <PID>
```

### Полная пересборка
```bash
docker compose down -v
docker system prune -a -f
docker compose up -d --build
```

### Проверка логов контейнера
```bash
docker compose logs -f web
docker compose logs -f api
```

---

**📖 Полная документация**: см. [DEPLOY.md](./DEPLOY.md)

