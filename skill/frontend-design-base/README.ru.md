# Скилл Frontend Design

Скилл для Claude Code — создание пользовательских frontend-дизайнов с фокусом на accessibility, responsiveness и современные UX паттерны.

## Проблема

Frontend-дизайн часто страдает от отсутствия системного подхода:
- Несогласованные间距 и типографика
- Игнорирование accessibility
- Слабая mobile-адаптация
- Отсутствие дизайн-системы

## Решение

- Пользовательский подход first (user needs → implementation)
- Accessibility-first mindset
- Mobile-first responsive design
- Чёткие паттерны и компоненты
- Гайдлайны по CSS архитектуре

## Установка

```bash
cp -r skills/frontend-design ~/.claude/skills/
```

## Краткий справочник

### Принципы дизайна

| Принцип | Суть |
|---------|------|
| Accessibility First | Семантический HTML, ARIA labels, клавиатурная навигация |
| Mobile-First | Старт с мобильного, progressive enhancement |
| Visual Hierarchy | Чёткая структура, ограниченная палитра (3-5 цветов) |

### Процесс дизайна

1. **Understand** — Понять цель пользователя
2. **Identify** — Определить контентные потребности
3. **Sketch** — Набросать layout
4. **Structure** — Определить структуру компонента
5. **Responsive** — Добавить breakpoints
6. **Accessibility** — Проверить доступность
7. **Implement** — Реализовать с CSS

### Паттерны Layout-ов

| Паттерн | Использование | Ключевые моменты |
|---------|---------------|-----------------|
| Single Column | Mobile-first, простой контент | Max-width для читаемости |
| Two Column | Контент + sidebar | Grid или flexbox |
| Card Grid | Списки продуктов, галереи | Адаптивные колонки (1→2→3→4) |
| Hero Section | Landing pages | Явный CTA |
| Dashboard | Админ-панели | Баланс плотности информации |

### Система spacing (base 8px)

- 4px — тёсный spacing (иконка + label)
- 8px — дефолт spacing (связанные элементы)
- 16px — секционный spacing (группы)
- 24px — компонентный spacing
- 32px — секции страницы

### Типографика

| Уровень | Размер | Weight | Использование |
|---------|--------|--------|---------------|
| H1 | 32-48px | Bold | Заголовок страницы |
| H2 | 24-32px | Semibold | Заголовки секций |
| H3 | 18-24px | Medium | Подсекции |
| Body | 16-18px | Regular | Основной контент |
| Small | 14px | Regular | Captions, метаданные |

### Система цветов

```
Primary (бренд цвет)
├── 50 — очень светлый (фон)
├── 100-200 — светлый (hover)
├── 400-500 — базовый
├── 600-700 — тёмный (active)
└── 900 — очень тёмный (текст)

Neutral (серые)
├── text-primary (900)
├── text-secondary (600)
├── borders (300)
├── backgrounds (50-100)

Semantic
├── success (зелёный)
├── error (красный)
├── warning (жёлтый)
└── info (синий)
```

### Компоненты: Buttons

| Тип | Использование | Состояния |
|-----|---------------|-----------|
| Primary | Основное действие | default, hover, active, disabled |
| Secondary | Альтернативное действие | default, hover, active, disabled |
| Ghost | Низкий акцент | default, hover, active, disabled |
| Danger | Деструктивное действие | default, hover, active, disabled |

**Touch target:** Минимум 44x44px
**Focus:** Видимый outline с отступом

### Компоненты: Form Elements

- Labels выше или слева (не внутри поля)
- Ошибки inline с полем
- Валидация на blur или submit
- Character count для текстовых областей
- Связанные поля в fieldsets

### Компоненты: Cards

- Consistent padding (16-24px)
- Subtle shadow на hover
- Border radius (4-8px)
- Чёткая визуальная иерархия
- Action buttons внизу

### Компоненты: Modals

- Overlay с backdrop blur
- Кнопка закрытия top-right
- Focus trap
- ESC для закрытия
- Mobile: bottom sheet

## Responsive Breakpoints

| Устройство | Ширина | Колонки |
|------------|--------|---------|
| Mobile | < 640px | 1 |
| Tablet | 640-1024px | 2-3 |
| Desktop | 1024-1440px | 3-4 |
| Large | > 1440px | 4+ |

**Approach:** Mobile-first, `min-width` media queries
```css
/* Base (mobile) */
.container { width: 100%; }

/* Tablet */
@media (min-width: 640px) {
  .container { width: 50%; }
}

/* Desktop */
@media (min-width: 1024px) {
  .container { width: 33.33%; }
}
```

## Accessibility Checklist

- [ ] Семантический HTML (header, main, nav, section)
- [ ] Alt текст для изображений (пустой alt для декоративных)
- [ ] ARIA labels на интерактивных элементах
- [ ] Клавиатурная навигация (tab, arrows, space, enter)
- [ ] Focus indicators видны на всех интерактивных элементах
- [ ] Контраст цветов соответствует WCAG AA
- [ ] Ошибки форм ассоциированы с inputs
- [ ] Ссылка "skip to main content"
- [ ] Логическая иерархия заголовков (без пропусков)
- [ ] Текст масштабируется до 200%

## CSS Архитектура

### BEM Convention

```css
.card { /* Block */ }
.card__title { /* Element */ }
.card__image { /* Element */ }
.card--featured { /* Modifier */ }
.card--large { /* Modifier */ }
```

### Utility-First

```css
.mt-4 { margin-top: 16px; }
.p-2 { padding: 8px; }
.text-center { text-align: center; }
.flex { display: flex; }
```

### Современные CSS фичи

- CSS Custom Properties (variables)
- Flexbox для 1D layouts
- Grid для 2D layouts
- Container queries (когда поддерживается)
- `clamp()` для responsive типографики
- Aspect ratio boxes

## Частые ошибки

| Ошибка | Решение |
|--------|---------|
| Фиксированные ширины на основном контенте | Использовать max-width и fluid widths |
| Touch targets слишком маленькие | Минимум 44x44px |
| Плохой контраст | Тестировать с contrast checker |
| Нет focus styles | Добавить видимый focus outline |
| Только цвет для индикации | Добавить icon + цвет |
| Infinite scroll без pagination | Предоставить альтернативы |
| Auto-play медиа | Добавить пользовательский контроль |
| Крошечные шрифты | Минимум 16px для body |

## Тестирование

### Cross-Browser
- Chrome, Firefox, Safari, Edge
- iOS Safari, Android Chrome

### Screen Readers
- NVDA (Windows)
- VoiceOver (macOS/iOS)
- TalkBack (Android)

### Устройства
- Mobile (320px-428px)
- Tablet (768px-1024px)
- Desktop (1440px+)

## Быстрый справочник

| Задача | Решение |
|--------|---------|
| Responsive grid | CSS Grid с `minmax()` |
| Центрирование контента | Flexbox `justify-content: center` |
| Sticky footer | `min-height: 100vh; grid-template-rows: auto 1fr auto` |
| Равная высота карточек | `align-items: stretch` |
| Mobile меню | CSS hamburger + drawer |
| Dark mode | CSS custom properties с `@media (prefers-color-scheme)` |
