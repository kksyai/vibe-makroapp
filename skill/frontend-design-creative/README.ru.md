# Frontend Design Creative

Скилл для Claude Code — создание уникальных frontend-интерфейсов высокого качества, избегая типичных AI-шаблонов. Фокус на креативном дизайне и запоминающихся визуальных решениях.

## Проблема

AI часто генерирует одинаковые, предсказуемые интерфейсы:
- Типичные шрифты (Inter, Roboto, Arial)
- Кэшированные цветовые схемы (фиолетовые градиенты на белом фоне)
- Предсказуемые layout-ы и компоненты
- Отсутствие характерной, контекстуальной эстетики

## Решение

- Креативный подход к дизайну
- Смелые эстетические решения
- Уникальные, запоминающиеся интерфейсы
- Внимание к каждой детали
- Полная приверженность выбранной эстетике

## Установка

```bash
cp -r skills/frontend-design-creative ~/.claude/skills/
```

## Краткий справочник

### Процесс дизайна

Перед кодом понять контекст и выбрать СМЕЛУЮ эстетику:
1. **Purpose** — Какую проблему решает интерфейс? Кто пользуется?
2. **Tone** — Выбрать экстремум: brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian
3. **Constraints** — Технические требования (framework, performance, accessibility)
4. **Differentiation** — Что делает этот дизайн ЗАПОМИНАЮЩИМСЯ?

**КРИТИЧЕСКИ ВАЖНО:** Выбрать чёткое концептуальное направление и выполнить его с точностью. Работают оба подхода — смелый максимализм и утончённый минимализм. Ключ — намеренность, не интенсивность.

### Когда использовать

- Создание сайтов и landing pages
- Разработка dashboards и admin-панелей
- Дизайн React/Vue компонентов
- HTML/CSS layout-ы
- Beautifying существующих UI

### Гайдлайны по эстетике

**Фокус на:**

- **Typography** — Выбирать красивые, уникальные, интересные шрифты. Избегать Arial и Inter; использовать характерные, выразительные шрифты. Парировать display font с утончённым body font.
- **Color & Theme** — Приверженность cohesive aesthetic. Использовать CSS переменные для консистентности. Доминантные цвета с резкими акцентами лучше, чем робкие, равномерно распределённые палитры.
- **Motion** — Использовать анимации для эффектов и micro-interactions. Приоритет CSS-only решений для HTML. Фокус на высокоимпактных моментах: один хорошо оркестрированный page load со staggered reveals создаёт больше delight чем разбросанные micro-interactions.
- **Spatial Composition** — Неожиданные layouts. Асимметрия. Наложения. Диагональный flow. Grid-breaking элементы. Щедрый negative space ИЛИ контролируемая плотность.
- **Backgrounds & Visual Details** — Создавать атмосферу и глубину вместо solid colors. Добавлять контекстуальные эффекты и текстуры. Применять gradient meshes, noise textures, geometric patterns, layered transparencies, dramatic shadows, decorative borders, custom cursors, grain overlays.

**НИКОГДА не использовать типичные AI-эстетики:**
- Перенасыщенные font families (Inter, Roboto, Arial, system fonts)
- Кэшированные цветовые схемы (особенно purple gradients на белом фоне)
- Предсказуемые layouts и компоненты
- Cookie-cutter дизайн без контекстуального характера

### Принципы реализации

Интерпретировать креативно и делать неожиданные выборы, которые ощущаются действительно спроектированными для контекста. Никакой дизайн не должен быть таким же. Варьировать между light и dark themes, разными шрифтами, разными эстетиками. НИКОГДА не конвергировать на общих выборах.

**ВАЖНО:** Соответствовать сложности реализации эстетическому видению. Maximalist дизайны требуют сложного кода с обширными анимациями и эффектами. Minimalist или refined дизайны требуют сдержанности, точности и внимания к spacing, типографике и деталям.

Помните: возможна extraordinary creative работа. Приверженность полностью к distinctive vision.

## Примеры эстетических направлений

| Эстетика | Ключевые черты |
|---------|---------------|
| **Brutally Minimal** | Чистый, строгий, минимум визуальных элементов |
| **Maximalist Chaos** | Яркий, переполненный, контрастный, дерзкий |
| **Retro-Futuristic** | 80s/90s aesthetics, neon, chrome, futuristic retro |
| **Organic/Natural** | Тёплые тона, органические формы, природные мотивы |
| **Luxury/Refined** | Элегантный, премиальный, тонкий, золотые акценты |
| **Playful/Toy-like** | Весёлый, яркий, дружелюбный, игривый |
| **Editorial/Magazine** | Журнальный стиль, editorial layout, serif шрифты |
| **Brutalist/Raw** | Сырой, грубый, raw edges, industrial feel |
| **Art Deco/Geometric** | Геометрический, 1920s aesthetics, золотой age |
| **Soft/Pastel** | Мягкий, пастельный, dreamy, лёгкий |
| **Industrial/Utilitarian** | Утилитарный, functional, raw, technical |

## Ключевые фичи

- Anti "AI slop" — избегание типичных AI-шаблонов
- Креативный подход к каждой задаче
- Внимание к деталям и эстетике
- Production-grade функциональность
- Cohesive визуальный стиль

## См. также

- [Design Principles](../frontend-design/SKILL.md) — системный подход к дизайну
- [Frontend Accessibility](#) — accessibility стандарты
