#!/bin/bash

# Скрипт для создания бэкапа данных приложения
# Использование: ./backup.sh

set -e

# Настройки
BACKUP_DIR="./backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_NAME="autoshopone_backup_${TIMESTAMP}"
BACKUP_PATH="${BACKUP_DIR}/${BACKUP_NAME}"

# Цвета
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "🔄 Создание бэкапа приложения..."
echo ""

# Создание директории для бэкапов
mkdir -p "${BACKUP_DIR}"

# Создание временной директории для бэкапа
mkdir -p "${BACKUP_PATH}"

# 1. Бэкап данных LowDB
echo "📦 Копирование данных..."
if [ -d "./data" ]; then
    cp -r ./data "${BACKUP_PATH}/"
    echo -e "${GREEN}✓${NC} Данные скопированы"
else
    echo -e "${YELLOW}⚠${NC} Директория data не найдена"
fi

# 2. Бэкап .env файла
echo "🔐 Копирование .env файла..."
if [ -f ".env" ]; then
    cp .env "${BACKUP_PATH}/"
    echo -e "${GREEN}✓${NC} .env файл скопирован"
else
    echo -e "${YELLOW}⚠${NC} .env файл не найден"
fi

# 3. Бэкап docker-compose.yml
echo "🐳 Копирование конфигурации Docker..."
if [ -f "docker-compose.yml" ]; then
    cp docker-compose.yml "${BACKUP_PATH}/"
    echo -e "${GREEN}✓${NC} docker-compose.yml скопирован"
fi

# 4. Бэкап nginx конфигурации (если есть)
if [ -f "nginx.conf" ]; then
    cp nginx.conf "${BACKUP_PATH}/"
    echo -e "${GREEN}✓${NC} nginx.conf скопирован"
fi

# 5. Создание архива
echo ""
echo "📦 Создание архива..."
cd "${BACKUP_DIR}"
tar -czf "${BACKUP_NAME}.tar.gz" "${BACKUP_NAME}"
rm -rf "${BACKUP_NAME}"
cd ..

# Информация о бэкапе
BACKUP_SIZE=$(du -h "${BACKUP_DIR}/${BACKUP_NAME}.tar.gz" | cut -f1)

echo ""
echo "═══════════════════════════════════════"
echo -e "${GREEN}✓ Бэкап успешно создан!${NC}"
echo "═══════════════════════════════════════"
echo "Файл: ${BACKUP_DIR}/${BACKUP_NAME}.tar.gz"
echo "Размер: ${BACKUP_SIZE}"
echo ""

# Список всех бэкапов
echo "📋 Список всех бэкапов:"
ls -lh "${BACKUP_DIR}"/*.tar.gz 2>/dev/null || echo "Нет бэкапов"
echo ""

# Рекомендация по очистке старых бэкапов
BACKUP_COUNT=$(ls -1 "${BACKUP_DIR}"/*.tar.gz 2>/dev/null | wc -l)
if [ "$BACKUP_COUNT" -gt 10 ]; then
    echo -e "${YELLOW}⚠${NC} Найдено более 10 бэкапов. Рекомендуется удалить старые:"
    echo "   Удалить старые бэкапы (оставить последние 5):"
    echo "   cd ${BACKUP_DIR} && ls -t *.tar.gz | tail -n +6 | xargs rm -f"
    echo ""
fi

echo "💡 Восстановление из бэкапа:"
echo "   tar -xzf ${BACKUP_DIR}/${BACKUP_NAME}.tar.gz"
echo "   cp -r ${BACKUP_NAME}/data/* ./data/"
echo "   cp ${BACKUP_NAME}/.env ./"

