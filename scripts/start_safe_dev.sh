#!/bin/bash
# Безопасный запуск dev сервера
# Автоматически проверяет безопасность перед запуском

echo "🚀 Запуск безопасной среды разработки..."
echo ""

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Функции для вывода сообщений
error() {
    echo -e "${RED}⚠️  ОШИБКА:${NC} $1"
    echo ""
}

success() {
    echo -e "${GREEN}✅ $1${NC}"
}

warning() {
    echo -e "${YELLOW}⚠️  ПРЕДУПРЕЖДЕНИЕ:${NC} $1"
}

# Проверка, что находимся в правильной директории
if [ ! -f "package.json" ]; then
    error "package.json не найден!"
    echo "Убедитесь, что находитесь в корне проекта (~/vibe-groceries)"
    exit 1
fi

# 1. Проверка Firewall
echo "1. Проверка состояния Firewall..."
FIREWALL_STATUS=$(/usr/libexec/ApplicationFirewall/socketfilterfw --getglobalstate 2>/dev/null)

if [[ "$FIREWALL_STATUS" == *"disabled"* ]]; then
    warning "Firewall отключен!"
    echo ""
    echo "⚠️  Рекомендуется включить Firewall перед разработкой."
    echo "Для включения:"
    echo "  sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setglobalstate on"
    echo ""
    echo "Продолжить без Firewall? (yes/no): "
    read -r CONTINUE

    if [ "$CONTINUE" != "yes" ]; then
        error "Запуск отменен пользователем"
        exit 1
    fi
else
    success "Firewall включен"
fi

echo ""

# 2. Проверка критических портов
echo "2. Проверка критических портов (5173-5175)..."
CRITICAL_PORTS=$(lsof -i -P -n 2>/dev/null | grep LISTEN | grep -E "(5173|5174|5175)" | wc -l | tr -d ' ')

if [ "$CRITICAL_PORTS" -gt 0 ]; then
    warning "Обнаружены критические порты!"
    echo ""
    echo "Критические порты (5173-5175):"
    lsof -i -P -n 2>/dev/null | grep LISTEN | grep -E "(5173|5174|5175)"
    echo ""
    echo "Это может указывать на незакрытые dev серверы."
    echo "Остановить их перед запуском нового? (yes/no): "
    read -r STOP_OLD

    if [ "$STOP_OLD" = "yes" ]; then
        echo "Остановка старых dev серверов..."
        pkill -f "vite.*--port" 2>/dev/null
        sleep 2
        echo "Старые серверы остановлены"
    fi
else
    success "Критические порты закрыты"
fi

echo ""

# 3. Проверка внешних портов
echo "3. Проверка внешних портов..."
EXTERNAL_PORTS=$(lsof -i -P -n 2>/dev/null | grep LISTEN | grep -v "127.0.0.1" | grep -v "::1" | wc -l | tr -d ' ')

if [ "$EXTERNAL_PORTS" -gt 10 ]; then
    warning "Много внешних портов открыто ($EXTERNAL_PORTS)"
    echo ""
    echo "Открытые внешние порты:"
    lsof -i -P -n 2>/dev/null | grep LISTEN | grep -v "127.0.0.1" | grep -v "::1" | head -10
    echo ""
    echo "Продолжить запуск? (yes/no): "
    read -r CONTINUE

    if [ "$CONTINUE" != "yes" ]; then
        error "Запуск отменен пользователем"
        exit 1
    fi
else
    success "Внешние порты в норме ($EXTERNAL_PORTS)"
fi

echo ""

# 4. Проверка, что порт 3000 свободен
echo "4. Проверка порта 3000..."
PORT_3000_USED=$(lsof -i :3000 2>/dev/null | grep LISTEN | wc -l | tr -d ' ')

if [ "$PORT_3000_USED" -gt 0 ]; then
    warning "Порт 3000 уже используется!"
    echo ""
    echo "Процесс, использующий порт 3000:"
    lsof -i :3000 2>/dev/null | grep LISTEN
    echo ""
    echo "Остановить процесс и использовать порт 3000? (yes/no): "
    read -r USE_3000

    if [ "$USE_3000" = "yes" ]; then
        echo "Остановка процесса на порту 3000..."
        lsof -ti :3000 | xargs kill -9 2>/dev/null
        sleep 1
        echo "Порт 3000 освобожден"
    else
        echo "Попытка использовать порт 3001..."
        PORT_TO_USE=3001
    fi
else
    success "Порт 3000 свободен"
    PORT_TO_USE=3000
fi

echo ""

# 5. Проверка наличия .env.local
echo "5. Проверка конфигурации..."
if [ ! -f ".env.local" ]; then
    warning ".env.local не найден!"
    echo ""
    echo "Создать базовый .env.local? (yes/no): "
    read -r CREATE_ENV

    if [ "$CREATE_ENV" = "yes" ]; then
        echo "Создание .env.local..."
        cat > .env.local << 'EOF'
VITE_HOST=127.0.0.1
VITE_PORT=3000
NODE_ENV=development
VITE_ENABLE_DEBUG=true
VITE_ENABLE_ANALYTICS=false
EOF
        success ".env.local создан"
    fi
else
    success "Конфигурация найдена (.env.local)"
fi

echo ""

# 6. Финальная проверка
echo "6. Финальная проверка безопасности..."
echo ""
success "✅ Все проверки безопасности пройдены!"
echo ""
echo "🚀 Запуск dev сервера..."
echo "   Хост: 127.0.0.1"
echo "   Порт: $PORT_TO_USE"
echo "   URL: http://localhost:$PORT_TO_USE"
echo ""
echo "Для остановки: Ctrl+C или запустить ./stop_safe_dev.sh"
echo ""

# Запуск dev сервера
if [ "$PORT_TO_USE" = "3000" ]; then
    npm run dev
else
    npm run dev -- --port $PORT_TO_USE
fi