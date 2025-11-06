#!/bin/bash

# Скрипт автоматической настройки Nginx и SSL сертификата
# Использование: sudo ./setup-nginx-ssl.sh ваш-домен.ru ваш@email.com

set -e

# Цвета
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Проверка аргументов
if [ "$#" -lt 2 ]; then
    echo -e "${RED}Ошибка: Недостаточно аргументов${NC}"
    echo "Использование: sudo $0 ваш-домен.ru ваш@email.com"
    echo "Пример: sudo $0 example.ru admin@example.ru"
    exit 1
fi

DOMAIN=$1
EMAIL=$2
WWW_DOMAIN="www.${DOMAIN}"

echo -e "${BLUE}═══════════════════════════════════════${NC}"
echo -e "${BLUE}🚀 Настройка Nginx и SSL для ${DOMAIN}${NC}"
echo -e "${BLUE}═══════════════════════════════════════${NC}"
echo ""

# Проверка прав root
if [ "$EUID" -ne 0 ]; then 
    echo -e "${RED}❌ Этот скрипт нужно запускать с правами root${NC}"
    echo "Используйте: sudo $0 $DOMAIN $EMAIL"
    exit 1
fi

# 1. Установка Nginx
echo -e "${YELLOW}📦 Шаг 1: Установка Nginx...${NC}"
apt update
apt install -y nginx
systemctl enable nginx
systemctl start nginx
echo -e "${GREEN}✓ Nginx установлен${NC}"
echo ""

# 2. Создание конфигурации Nginx
echo -e "${YELLOW}⚙️  Шаг 2: Создание конфигурации Nginx...${NC}"
cat > /etc/nginx/sites-available/autoproject << EOF
upstream nextjs_upstream {
    server localhost:3000;
}

upstream api_upstream {
    server localhost:5000;
}

server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN} ${WWW_DOMAIN};

    # Для сертификата Let's Encrypt
    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }

    # Логи
    access_log /var/log/nginx/autoproject_access.log;
    error_log /var/log/nginx/autoproject_error.log;

    # Максимальный размер загружаемых файлов
    client_max_body_size 10M;

    # API проксирование
    location /api/ {
        proxy_pass http://api_upstream;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }

    # Next.js проксирование
    location / {
        proxy_pass http://nextjs_upstream;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 86400;
    }

    # Статические файлы
    location /_next/static/ {
        proxy_pass http://nextjs_upstream;
        proxy_cache_valid 60m;
        add_header Cache-Control "public, max-age=3600, immutable";
    }

    # Медиа файлы
    location /uploads/ {
        proxy_pass http://nextjs_upstream;
        add_header Cache-Control "public, max-age=31536000";
    }
}
EOF

echo -e "${GREEN}✓ Конфигурация создана${NC}"
echo ""

# 3. Активация конфигурации
echo -e "${YELLOW}🔗 Шаг 3: Активация конфигурации...${NC}"
ln -sf /etc/nginx/sites-available/autoproject /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Проверка конфигурации
if nginx -t; then
    echo -e "${GREEN}✓ Конфигурация валидна${NC}"
    systemctl reload nginx
else
    echo -e "${RED}❌ Ошибка в конфигурации Nginx${NC}"
    exit 1
fi
echo ""

# 4. Установка Certbot
echo -e "${YELLOW}🔒 Шаг 4: Установка Certbot...${NC}"
apt install -y certbot python3-certbot-nginx
echo -e "${GREEN}✓ Certbot установлен${NC}"
echo ""

# 5. Получение SSL сертификата
echo -e "${YELLOW}📜 Шаг 5: Получение SSL сертификата...${NC}"
echo -e "${BLUE}Домены: ${DOMAIN}, ${WWW_DOMAIN}${NC}"
echo -e "${BLUE}Email: ${EMAIL}${NC}"
echo ""

certbot --nginx \
    -d ${DOMAIN} \
    -d ${WWW_DOMAIN} \
    --non-interactive \
    --agree-tos \
    --email ${EMAIL} \
    --redirect

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ SSL сертификат успешно получен${NC}"
else
    echo -e "${RED}❌ Ошибка при получении SSL сертификата${NC}"
    echo "Проверьте:"
    echo "  1. DNS записи указывают на этот сервер"
    echo "  2. Порты 80 и 443 открыты"
    echo "  3. Домен доступен через браузер"
    exit 1
fi
echo ""

# 6. Настройка автообновления сертификата
echo -e "${YELLOW}🔄 Шаг 6: Настройка автообновления сертификата...${NC}"
systemctl enable certbot.timer
systemctl start certbot.timer
echo -e "${GREEN}✓ Автообновление настроено${NC}"
echo ""

# 7. Финальная проверка
echo -e "${YELLOW}✅ Шаг 7: Финальная проверка...${NC}"

# Проверка Nginx
if systemctl is-active --quiet nginx; then
    echo -e "${GREEN}✓ Nginx работает${NC}"
else
    echo -e "${RED}✗ Nginx не работает${NC}"
fi

# Проверка сертификата
if certbot certificates | grep -q ${DOMAIN}; then
    echo -e "${GREEN}✓ SSL сертификат активен${NC}"
else
    echo -e "${YELLOW}⚠ SSL сертификат не найден${NC}"
fi

# Проверка Docker контейнеров
if docker compose ps | grep -q "Up"; then
    echo -e "${GREEN}✓ Docker контейнеры запущены${NC}"
else
    echo -e "${YELLOW}⚠ Проверьте статус Docker контейнеров: docker compose ps${NC}"
fi

echo ""
echo -e "${BLUE}═══════════════════════════════════════${NC}"
echo -e "${GREEN}🎉 Настройка завершена!${NC}"
echo -e "${BLUE}═══════════════════════════════════════${NC}"
echo ""
echo -e "${GREEN}Ваше приложение доступно по адресу:${NC}"
echo -e "${BLUE}🌐 https://${DOMAIN}${NC}"
echo -e "${BLUE}🌐 https://${WWW_DOMAIN}${NC}"
echo ""
echo -e "${YELLOW}Полезные команды:${NC}"
echo "  Просмотр логов Nginx: sudo tail -f /var/log/nginx/autoproject_error.log"
echo "  Просмотр логов приложения: docker compose logs -f"
echo "  Перезапуск Nginx: sudo systemctl restart nginx"
echo "  Проверка сертификата: sudo certbot certificates"
echo "  Обновление сертификата: sudo certbot renew"
echo ""

