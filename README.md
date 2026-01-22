# Vibe Groceries

Modern shopping list application with collaborative sharing and mobile-first design.

Create, organize, and share shopping lists with ease. Perfect for family use or personal shopping trips.

## Features

- **Dual Mode Interface:** Edit mode for managing your inventory, Shopping mode for in-store purchases
- **Categorized Organization:** Separate categories for Edit mode (home inventory) and Shopping mode (store aisles)
- **Inline Editing:** Update quantities directly in the list without opening modals
- **Collaborative Sharing:** Share lists via URL with base64 encoded data
- **Local Storage:** All data persists in your browser's localStorage (no backend required)
- **Mobile-First Design:** Optimized for one-handed use with touch-friendly targets
- **Accessibility Compliant:** WCAG AA standards with full keyboard navigation
- **Responsive UI:** Bottom sheet modals on mobile, centered modals on desktop

## Quick Start

```bash
# Clone the repository
git clone https://github.com/kksyai/vibe-makroapp.git
cd vibe-makroapp
git checkout second

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/) to start using the app.

## Requirements

- Node.js 18+
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No login or backend required (runs entirely in browser)

## Tech Stack

| Layer | Technology |
|--------|------------|
| **Frontend** | React 19.2.0 |
| **Build Tool** | Vite 7.2.4 |
| **Language** | JavaScript (ES6+) |
| **Styling** | CSS3 with CSS Variables |
| **Storage** | localStorage (browser API) |
| **Sharing** | URL query parameters + Base64 encoding |

## Architecture

The application follows a component-based architecture with custom hooks for state management:

```
src/
├── components/          # React UI components
│   ├── Header.jsx         # App header with toggle switch
│   ├── Item.jsx           # Single item component
│   ├── CategorySection.jsx # Category container
│   ├── ItemEditModal.jsx  # Edit product modal
│   ├── AddProductModal.jsx # Create product modal
│   ├── FloatingButton.jsx  # FAB for creating items
│   └── ModalOverlay.jsx   # Modal wrapper
├── hooks/              # Custom React hooks
│   ├── useLocalStorage.js # localStorage management
│   ├── useShareUrl.js    # URL sharing logic
│   ├── useModal.js       # Modal state management
│   └── useMobileDetect.js # Device detection
├── utils/              # Utility functions
│   ├── storage.js       # localStorage operations
│   ├── share.js         # Serialization/deserialization
│   ├── migration.js     # Data migration
│   └── validation.js    # Form validation
├── App.jsx             # Main component
└── main.jsx            # Entry point
```

### Data Model

```javascript
{
  id: string,              // Unique identifier
  name: string,            // Product name
  quantity: number,         // Quantity (default 0)
  unit: string,            // 'pcs' | 'kg' | 'g' | 'l' | 'pack'
  categoryEdit: string,    // Category for Edit mode
  categoryShop: string,    // Category for Shopping mode
  checked: boolean,        // Marked as purchased
  order: number,           // Sort order within category
  createdAt: number        // Timestamp
}
```

## Usage

### Edit Mode

- View all products organized by Edit categories
- Click product name to edit details
- Adjust quantity inline with +/- buttons or direct input
- Create new products with floating "+" button
- Delete products from edit modal

### Shopping Mode

- Only shows products with quantity > 0
- Tap checkbox to mark as purchased
- Purchased items move to end of their category
- Tap "Undo" to unmark as purchased

### Sharing

1. Click "Share" button in header
2. URL is copied to clipboard
3. Share URL with others
4. Recipients open link to view your list

## Categories

### Edit Mode Categories
- Vegetables/Fruits
- Proteins
- Dairy's
- Dried fruits
- Jars
- Frozen
- Spices
- Suppliers
- Oils
- Bread

### Shopping Mode Categories
- Fruits & Vegetables
- Dairy
- Meat & Fish
- Nuts
- Canned Goods
- Frozen Foods
- Baking
- Spices & Herbs
- Pasta & Grains
- Alcohol
- Drinks
- Household

## Design System

### Color Palette
```css
--primary: #6366f1;      /* Indigo */
--primary-light: #e0e7ff;
--primary-dark: #4f46e5;
--text-primary: #1f2937;
--text-secondary: #6b7280;
--background: #f9fafb;
--card: #ffffff;
--border: #e5e7eb;
--success: #10b981;
--danger: #ef4444;
```

### Spacing Scale
8px grid system: 4px, 8px, 12px, 16px, 24px, 32px

### Typography
- H1: 24px, bold, -0.02em letter-spacing
- H2: 14px, semibold, uppercase, 0.06em letter-spacing
- Body: 16px, regular

## Accessibility

- WCAG AA compliant color contrast (4.5:1 minimum)
- Full keyboard navigation (Tab, Enter, Space, Escape)
- ARIA labels on all interactive elements
- Touch targets minimum 44x44px
- Screen reader friendly with semantic HTML
- Reduced motion support via prefers-reduced-motion

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Preview production build
npm run preview
```

## Migration

This branch includes automatic data migration from version 1 to version 2:

- Old `category` field → copies to both `categoryEdit` and `categoryShop`
- Old `qty` field → migrates to `quantity`
- All existing products maintain their data structure

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 10+)

## License

Private project. All rights reserved.

## Contributing

This is a personal project. Contributions are welcome via pull requests.

## Changes in This Branch (Second)

### Complete Redesign
- Refactored monolithic App.jsx into modular components
- Introduced dual-mode interface (Edit/Shopping)
- Added separate categories for each mode
- Implemented bottom sheet modals for mobile
- Added floating action button for creating products
- Improved mobile experience with touch-friendly targets
- Enhanced accessibility (WCAG AA, keyboard navigation)
- Created custom hooks for state management
- Improved URL sharing with compressed data format
- Added inline quantity editing
- Implemented data migration system
