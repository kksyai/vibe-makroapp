# 🔧 Справочник команд и процедур

Этот справочник содержит все необходимые команды для безопасной и эффективной разработки.

---

## 🚀 Основные команды проекта

### Безопасная разработка

```bash
# Локальная разработка (только localhost)
cd ~/vibe-groceries
npm run dev

# Явно localhost (для уверенности)
npm run dev:network

# Только ваша сеть (ОСТОРОЖНО! открывает доступ извне)
npm run dev:lan

# С конкретным портом (если 3000 занят)
npm run dev -- --port 3001
```

### Build & Preview

```bash
# Создать production билд
npm run build

# Preview билда (только localhost)
npm run preview

# Явно localhost preview
npm run preview:local
```

### Проверка качества

```bash
# Запустить ESLint
npm run lint

# Запустить тесты (если настроены)
npm test

# Проверка типов (если TypeScript)
npm run typecheck
```

---

## 🔍 Мониторинг безопасности

### Быстрая проверка портов

```bash
# Полная проверка безопасности
~/check_ports.sh

# Или через bash
bash ~/check_ports.sh
```

### Детальная проверка портов

```bash
# Все открытые порты
lsof -i -P -n | grep LISTEN

# Только внешние порты (доступны извне)
lsof -i -P -n | grep LISTEN | grep -v "127.0.0.1" | grep -v "::1"

# Только локальные порты
lsof -i -P -n | grep LISTEN | grep -E "(127.0.0.1|::1)"

# Только Node.js порты
lsof -i -P -n | grep LISTEN | grep node

# Альтернативная проверка
netstat -an | grep LISTEN
```

### Проверка конкретного порта

```bash
# Проверить, кто использует порт 3000
lsof -i :3000

# Проверить порт 5173
lsof -i :5173

# Тест подключения к порту
nc -zv 127.0.0.1 3000

# Или через telnet (если установлен)
telnet 127.0.0.1 3000
```

### Проверка безопасности в реальном времени

```bash
# Наблюдение за портами (обновление каждые 2 секунды)
lsof -i -P -n -r 2 | grep LISTEN

# Или только критические порты
lsof -i -P -n -r 2 | grep LISTEN | grep -E "(5173|5174|5175)"
```

---

## 💻 Управление процессами

### Поиск процессов

```bash
# Найти все Node.js процессы
ps aux | grep node | grep -v grep

# Найти Vite процессы
ps aux | grep vite | grep -v grep

# Найти процессы на конкретном порту
lsof -i :3000 | grep LISTEN

# Найти все dev процессы
ps aux | grep -E "npm run dev|vite" | grep -v grep
```

### Остановка процессов

```bash
# Остановить все Vite процессы
pkill -f vite

# Остановить все Node.js процессы
pkill -f node

# Остановить конкретный процесс по ID
kill <PID>

# Принудительно остановить процесс (если не реагирует)
kill -9 <PID>

# Остановить dev процессы
pkill -f "npm run dev"
pkill -f "vite.*--port"

# Безопасная остановка (с паузой)
pkill -f vite && sleep 2 && ps aux | grep vite | grep -v grep
```

### Безопасная остановка через скрипты

```bash
# Остановить все dev серверы безопасным способом
~/vibe-groceries/scripts/stop_safe_dev.sh
```

---

## 🔒 Управление Firewall

### Проверка статуса

```bash
# Проверить статус Firewall
/usr/libexec/ApplicationFirewall/socketfilterfw --getglobalstate

# Проверить статус Stealth Mode
/usr/libexec/ApplicationFirewall/socketfilterfw --getstealthmode

# Проверить статус блокировки всех входящих
/usr/libexec/ApplicationFirewall/socketfilterfw --getblockall

# Посмотреть список разрешенных приложений
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --listapps
```

### Настройка Firewall

```bash
# Автоматическая настройка (созданный скрипт)
~/setup_firewall.sh

# Включить Firewall
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setglobalstate on

# Включить Stealth Mode
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setstealthmode on

# Блокировать все входящие (кроме разрешенных)
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setblockall on

# Добавить приложение в разрешенные
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --add /путь/к/приложению.app

# Удалить приложение из разрешенных
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --remove /путь/к/приложению.app
```

### Настройка через GUI

```
System Settings → Network → Firewall
→ Включить Firewall
→ Options
  → Блокировать все входящие (опционально)
  → Включить скрытый режим
  → Разрешенные приложения (настройка)
```

---

## 📤 Git операции

### Безопасный коммит

```bash
# Стандартный коммит (автоматически запустится pre-commit hook)
git add .
git commit -m "feat: добавлена новая функция"

# Добавление конкретных файлов
git add file1.js file2.js
git commit -m "fix: исправлен баг"

# Добавление интерактивное
git add -i
git commit -m "update: изменения"
```

### Проверка изменений

```bash
# Показать изменения (не добавленные)
git diff

# Показать добавленные изменения
git diff --cached

# Показать статус репозитория
git status

# Показать историю коммитов
git log --oneline -10

# Показать изменения в конкретном коммите
git show <commit-hash>
```

### Отмена изменений

```bash
# Отменить изменения в файле (вернуть к последнему коммиту)
git checkout -- filename.js

# Отменить все изменения (не добавленные)
git checkout -- .

# Отменить последний коммит (сохранить изменения)
git reset --soft HEAD~1

# Отменить последний коммит (удалить изменения)
git reset --hard HEAD~1
```

### Работа с ветками

```bash
# Создать новую ветку
git checkout -b feature/new-function

# Переключиться на ветку
git checkout main

# Объединить ветку (merge)
git checkout main
git merge feature/new-function

# Удалить ветку
git branch -d feature/new-function
```

### Пропуск Git hook (не рекомендуется)

```bash
# Пропустить pre-commit hook
git commit --no-verify -m "message"

# ⚠️ ВНИМАНИЕ: Используйте только в крайних случаях!
```

---

## 🛠️ Диагностика проблем

### Если dev сервер не запускается

**Проблема 1: Порт занят**
```bash
# Проверить, кто использует порт
lsof -i :3000

# Остановить процесс, занимающий порт
kill <PID>

# Или использовать другой порт
npm run dev -- --port 3001
```

**Проблема 2: Ошибка "Port in use"**
```bash
# Остановить все Vite процессы
pkill -f vite

# Подождать пару секунд
sleep 2

# Попробовать снова
npm run dev
```

**Проблема 3: Ошибка разрешения**
```bash
# Проверить права на файлы
ls -la node_modules/

# Переустановить node_modules
rm -rf node_modules package-lock.json
npm install
```

### Если Firewall блокирует

**Проблема 1: Firewall блокирует соединение**
```bash
# Проверить статус Firewall
/usr/libexec/ApplicationFirewall/socketfilterfw --getglobalstate

# Если отключен - включить
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setglobalstate on

# Добавить приложение в разрешенные
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --add /Applications/YourApp.app
```

**Проблема 2: Нельзя подключиться к localhost**
```bash
# Проверить, что порт открыт
lsof -i :3000 | grep LISTEN

# Проверить, что подключаетесь к localhost
nc -zv 127.0.0.1 3000

# Если не работает - проверьте Firewall
```

### Если Git hook блокирует коммит

**Проблема 1: Критические порты открыты**
```bash
# Проверить открытые порты
lsof -i -P -n | grep LISTEN | grep -E "(5173|5174|5175)"

# Остановить процессы
pkill -f vite

# Попробовать снова
git commit -m "message"
```

**Проблема 2: Lint не пройден**
```bash
# Запустить lint
npm run lint

# Исправить ошибки

# Или пропустить hook (не рекомендуется)
git commit --no-verify -m "message"
```

**Проблема 3: Firewall отключен**
```bash
# Включить Firewall
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setglobalstate on

# Или временно пропустить проверку (не рекомендуется)
git commit --no-verify -m "message"
```

### Если автоматический мониторинг не работает

**Проблема 1: Логи не создаются**
```bash
# Проверить crontab
crontab -l | grep check_ports

# Если нет задач - запустить setup скрипт
cd ~/vibe-groceries
./setup_cron_monitoring.sh
```

**Проблема 2: Скрипт мониторинга не найден**
```bash
# Проверить, существует ли скрипт
ls -la ~/check_ports.sh

# Если нет - создать или найти
# (Используйте SECURITY_GUIDE.md для создания)
```

### Если изменения не видны в браузере

**Проблема 1: Кэш браузера**
```bash
# Очистить кэш браузера
# Cmd+Shift+R (Chrome/Firefox)

# Или отключить кэш в DevTools
# Network → Disable cache
```

**Проблема 2: Кэш Vite**
```bash
# Очистить кэш Vite
rm -rf node_modules/.vite

# Перезапустить dev сервер
npm run dev
```

**Проблема 3: Wrong port**
```bash
# Проверить, на каком порту запущен сервер
lsof -i | grep node

# Подключиться к правильному порту
# http://localhost:<port>
```

---

## 📊 Работа с логами

### Просмотр логов мониторинга

```bash
# Последние 20 строк детального лога
tail -20 ~/port_monitoring_logs/half_hourly.log

# Последние 50 строк ежедневного лога
tail -50 ~/port_monitoring_logs/hourly.log

# Следить за логом в реальном времени
tail -f ~/port_monitoring_logs/half_hourly.log

# Искать в логах
grep "КРИТИЧЕСКИЙ" ~/port_monitoring_logs/*.log
```

### Очистка логов

```bash
# Очистить все логи мониторинга
rm ~/port_monitoring_logs/*.log

# Очистить логи старше определенного времени
find ~/port_monitoring_logs -name '*.log' -mtime +7 -delete

# Создать новый файл (старый сохранится)
echo "=== New log $(date) ===" >> ~/port_monitoring_logs/custom.log
```

---

## 🔧 Полезные алиасы (опционально)

Добавьте в `~/.zshrc` или `~/.bashrc`:

```bash
# Алиасы для быстрого доступа
alias check-ports='~/check_ports.sh'
alias dev='cd ~/vibe-groceries && npm run dev'
alias stop-dev='pkill -f vite'
alias git-status='git status'
alias firewall-status='/usr/libexec/ApplicationFirewall/socketfilterfw --getglobalstate'
```

Перезагрузите конфигурацию:
```bash
source ~/.zshrc  # или ~/.bashrc
```

Теперь можно использовать короткие команды:
```bash
check-ports    # вместо ~/check_ports.sh
dev            # вместо cd ~/vibe-groceries && npm run dev
stop-dev       # вместо pkill -f vite
```

---

## 📞 Полезные ресурсы

- **Полный checklist:** `.opencode/DEV_CHECKLIST.md`
- **Руководство безопасности:** `~/SECURITY_GUIDE.md`
- **Скрипт мониторинга:** `~/check_ports.sh`
- **Скрипт настройки Firewall:** `~/setup_firewall.sh`
- **Настройка cron:** `~/vibe-groceries/setup_cron_monitoring.sh`
- **Безопасный запуск:** `~/vibe-groceries/scripts/start_safe_dev.sh`
- **Безопасная остановка:** `~/vibe-groceries/scripts/stop_safe_dev.sh`

---

*Последнее обновление: 2026-01-26*
*Версия: 1.0*