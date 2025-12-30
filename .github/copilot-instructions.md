# Copilot Instructions for Audiophile E-Commerce Store

## Architecture Overview

This is a **SolidJS-based e-commerce SPA** for audio equipment with Appwrite backend (BaaS). Two distinct user flows:
- **Customer flow**: Browse products by category → view product details → add to cart
- **Admin flow**: Login/signup → create/edit/delete products with image uploads

## SolidJS Patterns

- **Reactive state**: Use `createSignal()` for local state. Example: `const [user, setUser] = createSignal(null);`
- **Lifecycle**: Use `onMount()` for data fetching, not `useEffect`. See [src/pages/products/DynamicProduct.jsx](src/pages/products/DynamicProduct.jsx#L12)
- **Conditional rendering**: Use `<Show when={condition()}>` component, not ternaries
- **List rendering**: Use `<For each={array()}>` component with accessor functions
- **Routing**: `@solidjs/router` with `<Route>` components in [src/index.jsx](src/index.jsx). Access params via `useParams()`

## Appwrite Integration

**Config location**: [src/lib/appwrite.js](src/lib/appwrite.js) - centralized client, database IDs, and storage bucket

### Key modules:
- **Products** ([src/lib/products.js](src/lib/products.js)): 
  - `fetchProducts()` - list all products
  - `fetchProductsByCategory(category)` - filter by "headphones", "speakers", or "earphones"
  - `fetchProductById(id)` - find by `productId` (integer, not document ID)
  - `getImageUrl(imageId)` - construct Appwrite storage URLs
  
- **Auth** ([src/lib/auth.js](src/lib/auth.js)):
  - Global `user()` signal for auth state
  - `checkAuth()` - verify session on mount
  - `login(email, password)`, `register(email, password, name)`, `logout()`

### Data flow:
1. Fetch from Appwrite → local signals → reactive UI updates
2. Product images: Upload to Storage → get file ID → store in `featuredImage`/`additionalImages` fields
3. Product schema uses **custom `productId`** (auto-incremented integer), not Appwrite's document ID

## Product Management Workflow

**Creating products** ([src/pages/admin/CreateProduct.jsx](src/pages/admin/CreateProduct.jsx)):
1. Auto-fetch next `productId` by finding max ID + 1
2. Upload featured image → get file ID
3. Upload additional images (array) → join IDs with commas
4. Parse "In The Box" items as quantity + item pairs (e.g., "1x Headphone Unit")
5. Create document with all fields

**Image handling**:
- Featured image: Single file, stored as string ID
- Additional images: Multiple files, stored as comma-separated IDs
- Display: Use `getImageUrl(imageId)` to construct view URLs

## Styling Conventions

- **Tailwind v4** with custom theme in [src/index.css](src/index.css#L4-L12)
- Primary colors: `text-theme-orange` (#D87D4A), `bg-theme-light-gray` (#F1F1F1)
- Typography: Manrope font family via Google Fonts
- Container: `.container` class for max-width 1110px with responsive padding
- Responsive: Mobile-first with `md:` and `lg:` breakpoints

## File Structure Rules

- **Pages** in `src/pages/`: Top-level routes and feature pages
  - `*FromDB.jsx` - category pages that fetch from Appwrite
  - `admin/` - protected admin routes
  - `products/DynamicProduct.jsx` - parameterized route for `/products/:id`
  
- **Components** in `src/components/`: Reusable UI elements
  - `ProductDetail.jsx` - main product display with add-to-cart
  - `fragments/` - smallest reusable pieces
  
- **Lib** in `src/lib/`: Business logic and API wrappers (no JSX)

## Dev Workflow

```bash
npm start          # Dev server on :3000
npm run build      # Production build (target: esnext)
npm run serve      # Preview production build
```

- **No database migrations**: Schema changes require manual updates in Appwrite Console
- **Auth testing**: Use `/admin/signup` to create test accounts (no admin/user distinction in current auth)
- **Image debugging**: Check Appwrite Console → Storage → `product-images` bucket for uploads

## Common Patterns

**Category filtering**:
```javascript
const products = await fetchProductsByCategory('headphones'); // Returns array
```

**Product display with image**:
```javascript
<img src={getImageUrl(product().featuredImage)} alt={product().productName} />
```

**Admin route guard** (not implemented - currently open):
```javascript
// Check user() signal in admin pages, redirect if null
```

**Dynamic route params**:
```javascript
const params = useParams(); // In DynamicProduct.jsx
const productData = await fetchProductById(params.id);
```

## Known Quirks

- Products fetched by listing all docs then filtering by `productId` field (not using Appwrite queries)
- Additional images stored as comma-separated string, must be split for display
- "In The Box" items parsed via regex (`/^\d+x?/`) to extract quantity prefix
- No admin role enforcement - any authenticated user can manage products
- `LastCall` component only renders on non-admin pages (see [src/App.jsx](src/App.jsx#L17))

## When Adding Features

- **New category**: Add route in [src/index.jsx](src/index.jsx), create `[Category]FromDB.jsx` page with `fetchProductsByCategory()`
- **New product field**: Update Appwrite schema → modify `CreateProduct.jsx` form → update `ProductDetail.jsx` display
- **Protected routes**: Wrap with auth check in component's `onMount()`, redirect via `navigate()` from `@solidjs/router`
