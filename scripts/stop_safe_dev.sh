#!/bin/bash
# Безопасная остановка dev серверов
# Останавливает все dev процессы и проверяет результат

echo "🛑 Остановка всех dev серверов..."
echo ""

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Функции для вывода сообщений
error() {
    echo -e "${RED}⚠️  ОШИБКА:${NC} $1"
}

success() {
    echo -e "${GREEN}✅ $1${NC}"
}

warning() {
    echo -e "${YELLOW}⚠️  ПРЕДУПРЕЖДЕНИЕ:${NC} $1"
}

# 1. Поиск и остановка Vite процессов
echo "1. Поиск Vite процессов..."
VITE_PROCESSES=$(ps aux | grep -E "vite.*--port" | grep -v grep)

if [ -z "$VITE_PROCESSES" ]; then
    echo "   Нет активных Vite процессов"
else
    echo "   Найдены Vite процессы:"
    echo "$VITE_PROCESSES" | awk '{print "   " $2 " - " $11 " " $12 " " $13}'
    echo ""
    echo "   Остановка Vite процессов..."
    pkill -f "vite.*--port"
fi

# 2. Поиск и остановка Node.js dev процессов
echo ""
echo "2. Поиск Node.js dev процессов..."
NODE_DEV_PROCESSES=$(ps aux | grep -E "npm run dev" | grep -v grep)

if [ -z "$NODE_DEV_PROCESSES" ]; then
    echo "   Нет активных Node.js dev процессов"
else
    echo "   Найдены Node.js dev процессы:"
    echo "$NODE_DEV_PROCESSES" | awk '{print "   " $2 " - " $11 " " $12 " " $13 " " $14}'
    echo ""
    echo "   Остановка Node.js dev процессов..."
    pkill -f "npm run dev"
fi

# 3. Остановка всех Node.js процессов (опционально)
echo ""
echo "3. Дополнительная остановка Node.js процессов..."
warning "Остановить все Node.js процессы (не только dev)?"
echo "   Это может повлиять на другие приложения! (yes/no): "
read -r STOP_ALL_NODE

if [ "$STOP_ALL_NODE" = "yes" ]; then
    echo "   Остановка всех Node.js процессов..."
    pkill node
    success "Все Node.js процессы остановлены"
else
    echo "   Остановлены только dev процессы"
fi

# 4. Пауза для завершения процессов
echo ""
echo "4. Пауза для завершения процессов..."
sleep 3

# 5. Проверка критических портов
echo ""
echo "5. Проверка критических портов (5173-5175)..."
CRITICAL_PORTS=$(lsof -i -P -n 2>/dev/null | grep LISTEN | grep -E "(5173|5174|5175)" | wc -l | tr -d ' ')

if [ "$CRITICAL_PORTS" -eq 0 ]; then
    success "✅ Критические порты закрыты"
else
    error "⚠️  Некоторые критические порты все еще открыты!"
    echo ""
    echo "Открытые критические порты:"
    lsof -i -P -n 2>/dev/null | grep LISTEN | grep -E "(5173|5174|5175)"
fi

# 6. Проверка порта 3000
echo ""
echo "6. Проверка порта 3000..."
PORT_3000_USED=$(lsof -i :3000 2>/dev/null | grep LISTEN | wc -l | tr -d ' ')

if [ "$PORT_3000_USED" -eq 0 ]; then
    success "✅ Порт 3000 закрыт"
else
    warning "Порт 3000 все еще используется:"
    lsof -i :3000 2>/dev/null | grep LISTEN
fi

# 7. Финальная проверка всех портов
echo ""
echo "7. Финальная проверка всех открытых портов..."
TOTAL_PORTS=$(lsof -i -P -n 2>/dev/null | grep LISTEN | wc -l | tr -d ' ')
EXTERNAL_PORTS=$(lsof -i -P -n 2>/dev/null | grep LISTEN | grep -v "127.0.0.1" | grep -v "::1" | wc -l | tr -d ' ')

echo "   Всего открытых портов: $TOTAL_PORTS"
echo "   Внешних портов: $EXTERNAL_PORTS"

if [ "$TOTAL_PORTS" -gt 20 ]; then
    warning "Много открытых портов ($TOTAL_PORTS)"
    echo ""
    echo "Все открытые порты:"
    lsof -i -P -n 2>/dev/null | grep LISTEN | head -20
else
    success "Количество портов в норме ($TOTAL_PORTS)"
fi

echo ""

# 8. Финальный отчет
echo "=========================================="
echo "📊 Отчет остановки"
echo "=========================================="
echo ""

if [ "$CRITICAL_PORTS" -eq 0 ]; then
    success "✅ Все критические порты закрыты"
else
    error "❌ Критические порты все еще открыты"
fi

if [ "$PORT_3000_USED" -eq 0 ]; then
    success "✅ Порт 3000 закрыт"
else
    error "❌ Порт 3000 все еще используется"
fi

echo ""
echo "Для полной проверки безопасности:"
echo "  ~/check_ports.sh"
echo ""

echo "✅ Процесс остановки завершен"
echo ""