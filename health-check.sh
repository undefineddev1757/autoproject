#!/bin/bash

# Скрипт проверки здоровья приложения
# Использование: ./health-check.sh

set -e

echo "🏥 Проверка здоровья приложения..."
echo ""

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Функция проверки
check_status() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✓${NC} $2"
        return 0
    else
        echo -e "${RED}✗${NC} $2"
        return 1
    fi
}

# Счетчик проблем
issues=0

# 1. Проверка Docker
echo "═══════════════════════════════════════"
echo "1. Проверка Docker"
echo "═══════════════════════════════════════"
if command -v docker &> /dev/null; then
    check_status 0 "Docker установлен"
    docker --version
else
    check_status 1 "Docker не установлен"
    ((issues++))
fi
echo ""

# 2. Проверка Docker Compose
echo "═══════════════════════════════════════"
echo "2. Проверка Docker Compose"
echo "═══════════════════════════════════════"
if docker compose version &> /dev/null; then
    check_status 0 "Docker Compose доступен"
    docker compose version
else
    check_status 1 "Docker Compose не доступен"
    ((issues++))
fi
echo ""

# 3. Проверка .env файла
echo "═══════════════════════════════════════"
echo "3. Проверка .env файла"
echo "═══════════════════════════════════════"
if [ -f .env ]; then
    check_status 0 ".env файл существует"
    
    # Проверка обязательных переменных
    if grep -q "TELEGRAM_BOT_TOKEN=" .env && grep -q "TELEGRAM_CHAT_ID=" .env; then
        check_status 0 "Переменные окружения настроены"
    else
        check_status 1 "Не все переменные окружения настроены"
        ((issues++))
    fi
else
    check_status 1 ".env файл не найден"
    ((issues++))
fi
echo ""

# 4. Проверка контейнеров
echo "═══════════════════════════════════════"
echo "4. Проверка контейнеров"
echo "═══════════════════════════════════════"
if docker compose ps | grep -q "Up"; then
    check_status 0 "Контейнеры запущены"
    echo ""
    docker compose ps
else
    check_status 1 "Контейнеры не запущены"
    ((issues++))
fi
echo ""

# 5. Проверка портов
echo "═══════════════════════════════════════"
echo "5. Проверка доступности портов"
echo "═══════════════════════════════════════"

# Проверка Web (3000)
if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 | grep -q "200"; then
    check_status 0 "Web доступен на порту 3000"
elif nc -z localhost 3000 2>/dev/null; then
    echo -e "${YELLOW}⚠${NC} Порт 3000 открыт, но HTTP запрос не прошел"
    ((issues++))
else
    check_status 1 "Web не доступен на порту 3000"
    ((issues++))
fi

# Проверка API (5000)
if nc -z localhost 5000 2>/dev/null; then
    check_status 0 "API доступен на порту 5000"
else
    check_status 1 "API не доступен на порту 5000"
    ((issues++))
fi
echo ""

# 6. Проверка использования ресурсов
echo "═══════════════════════════════════════"
echo "6. Использование ресурсов"
echo "═══════════════════════════════════════"
if docker compose ps | grep -q "Up"; then
    docker stats --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}" $(docker compose ps -q)
else
    echo -e "${YELLOW}⚠${NC} Контейнеры не запущены"
fi
echo ""

# 7. Проверка логов на ошибки
echo "═══════════════════════════════════════"
echo "7. Последние ошибки в логах (последние 10)"
echo "═══════════════════════════════════════"
if docker compose ps | grep -q "Up"; then
    errors=$(docker compose logs --tail=50 2>&1 | grep -i "error" | tail -10 || true)
    if [ -z "$errors" ]; then
        check_status 0 "Критических ошибок не обнаружено"
    else
        echo -e "${YELLOW}⚠${NC} Найдены ошибки в логах:"
        echo "$errors"
        ((issues++))
    fi
else
    echo -e "${YELLOW}⚠${NC} Контейнеры не запущены, логи недоступны"
fi
echo ""

# 8. Проверка директории data
echo "═══════════════════════════════════════"
echo "8. Проверка директории data"
echo "═══════════════════════════════════════"
if [ -d "./data" ]; then
    check_status 0 "Директория data существует"
    echo "Содержимое:"
    ls -lah ./data/ 2>/dev/null || echo "Пусто"
else
    check_status 1 "Директория data не найдена"
    ((issues++))
fi
echo ""

# Итоговый результат
echo "═══════════════════════════════════════"
echo "ИТОГИ ПРОВЕРКИ"
echo "═══════════════════════════════════════"
if [ $issues -eq 0 ]; then
    echo -e "${GREEN}✓ Все проверки пройдены успешно!${NC}"
    exit 0
else
    echo -e "${RED}✗ Обнаружено проблем: $issues${NC}"
    echo ""
    echo "Рекомендации:"
    echo "1. Проверьте логи: docker compose logs -f"
    echo "2. Перезапустите контейнеры: docker compose restart"
    echo "3. Пересоберите образы: docker compose up -d --build"
    exit 1
fi

