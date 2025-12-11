# CampusLoop Frontend - AI Coding Agent Instructions

## Project Overview
React Native mobile app (Expo 54 + Expo Router 6) for campus marketplace, events, and resource sharing. Supports iOS/Android/Web via NativeWind (Tailwind CSS). File-based routing with global auth context and dual Axios instances.

## Architecture & Navigation

### File-Based Routing (Expo Router)
All screens in `/app` folder follow this structure:
```
app/
  _layout.jsx           # Root layout (wraps app with UserProvider)
  index.js              # Splash screen (redirects to /(tabs)/Home)
  (auth)/               # Auth group (only shown when unauthenticated)
    _layout.jsx
    Sign.jsx
    SignUp.jsx
  (tabs)/               # Main app group (tab navigation)
    _layout.jsx         # Tab config with custom center button
    Home.jsx
    Explore.jsx
    Post.jsx
    Events.jsx
    Profile.jsx
  products/
    index.jsx           # Product listing with filters/sorting
    [productId].jsx     # Dynamic product detail route
```

**Key pattern**: Route groups in parentheses `(auth)` don't appear in URL but organize navigation flow. Use `router.replace()` to replace entire navigation stack, `router.push()` for screen transition.

### Dynamic Routes
Access parameters via `useLocalSearchParams()`:
```javascript
const { productId } = useLocalSearchParams();
// Fetch data in useEffect triggered by param changes
```

## Global State Management

### UserContext Pattern
Location: `Context/UserContext.jsx`

Provides authentication state across entire app:
```javascript
const { user, loading, isAuthenticated, fetchUser, clearUser, updateUser, error } = useUser();
```

**Key behaviors**:
- Auto-fetches user on app mount (checks AsyncStorage for accessToken)
- 401 responses in privateAPI auto-clear tokens and set `user: null`
- Returns `isAuthenticated: !!user` for conditional rendering
- `fetchUser()` called in login/signup flows to sync user state
- `clearUser()` called during logout (removes tokens + resets state)
## Styling System

### NativeWind + Custom Theme

**Theme colors** (`tailwind.config.js`):
```
campus-forest: #2D473E (primary, dark green)
campus-sage: #8EA77B (medium green)
campus-mint: #D7E4C2 (light mint)
campus-slate: #788881 (blue-gray)
campus-ash: #ABB2B0 (light gray)
campus-pearl: #F6F2EE (off-white)
```

**Typography scales**:
- Headline: `text-headline-lg` (32px), `text-headline-sm` (24px)
- Title: `text-title-lg` (22px), `text-title-md` (16px), `text-title-sm` (14px)
- Body: `text-body-lg` (16px), `text-body-md` (14px)
- Label: `text-label-lg` (14px), `text-label-md` (12px)

**Custom utilities**:
- Shadows: `shadow-campus` (4px 14px), `shadow-campus-lg` (10px 25px)
- Radius: `rounded-campus` (12px), `rounded-campus-lg` (16px)

**Usage example**:
```jsx
<View className="flex-1 bg-campus-pearl px-6 py-4">
  <Text className="text-title-lg font-bold text-campus-forest">Title</Text>
  <TouchableOpacity className="bg-campus-sage rounded-campus py-3">
    <Text className="text-white font-semibold">Action</Text>
  </TouchableOpacity>
</View>
```

**Important**: Always use custom campus colors, NOT generic Tailwind colors (no `bg-blue-600`, use `bg-campus-sage` instead).

## API Integration

### Dual Axios Instances (`lib/api.js`):

**publicAPI** - Unauthenticated endpoints:
```javascript
const res = await publicAPI.get('/item'); // No auth header
```

**privateAPI** - Requires authentication:
```javascript
const res = await privateAPI.get('/user/me'); // Auto-injects token
```

Token format in Authorization header: `` `${token}` `` (note: space prefix, NOT "Bearer token")

### Backend Endpoints (Production: localhost:9000)
**Marketplace**:
- `GET /api/v1/item` - List products (supports: search, category, sellingCategory, maxPrice, sortBy, sortOrder)
- `GET /api/v1/item/:id` - Single product detail
- `POST /api/v1/item` - Create product (requires auth)

**Auth**:
- `POST /api/v1/auth/login` - { email, password } → { accessToken, refreshToken }
- `POST /api/v1/auth/signup` - { email, password, name } → creates user + auto-creates wallet
- `GET /api/v1/user/me` - Fetch authenticated user profile

### Response Format
Backend returns:
```javascript
{
  success: true/false,
  statusCode: 200,
  message: "string",
  data: {...} // Actual payload or null
}
```

Always check `response.data.success` before accessing `response.data.data`.

## Authentication Flow

### Login (`app/(auth)/Sign.jsx`):
1. User enters email + password
2. `POST /auth/login` via publicAPI
3. Save tokens to AsyncStorage: `await AsyncStorage.setItem('accessToken', token)`
4. Fetch user profile: `await fetchUser()` (populates UserContext)
5. Navigate to home: `router.replace('/(tabs)/Home')`

### Signup (`app/(auth)/SignUp.jsx`):
1. User enters email + password + name
2. `POST /auth/signup` via publicAPI (auto-validates @university email)
3. Save tokens
4. Call `fetchUser()`
5. Navigate to home

### Logout:
```javascript
const { clearUser } = useUser();
await clearUser(); // Removes tokens + resets user state
router.replace('/(auth)/Sign'); // Force back to auth
```

### Protected Routes
Wrap screens in conditional:
```jsx
const { isAuthenticated, loading } = useUser();

if (loading) return <Splash />;
if (!isAuthenticated) return null; // Router handles redirect via layout logic
```

## Development Workflow

### Start dev server:
```bash
npm start
# Scan QR code with Expo Go, or:
npm run ios      # iOS simulator
npm run android  # Android emulator
npm run web      # Browser
```

**Hot reload**: Changes to `.jsx` auto-reload. Changes to `.env` require Metro restart.

### Linting:
```bash
npm run lint
```

## Common Gotchas & Conventions

### 1. Token Format
Authorization header is **bare token**, NOT "Bearer token":
```javascript
// ✅ Correct
config.headers.Authorization = `${token}`;
// ❌ Wrong
config.headers.Authorization = `Bearer ${token}`;
```

### 2. Import global.css Only Once
Must import in root layout (`app/_layout.jsx`) only. Do NOT import in individual screens.

### 3. NativeWind ClassName
Enabled by importing `"nativewind"` in screen files (or globally). Ensure `className` prop is available on View/Text components.

### 4. AsyncStorage for Auth Tokens
Always use `AsyncStorage` for persistence:
```javascript
const token = await AsyncStorage.getItem('accessToken');
await AsyncStorage.setItem('accessToken', newToken);
await AsyncStorage.removeItem('accessToken');
```

### 5. useLocalSearchParams vs useRoute
Always use `useLocalSearchParams()` (Expo Router), NOT `useRoute()` (React Navigation). It's simpler and returns parsed params directly.

### 6. Images Property Name
Backend returns `picture` (singular), NOT `images` (plural):
```javascript
// ✅ Correct
<Image source={{ uri: product.picture }} />
// ❌ Wrong
<Image source={{ uri: product.images[0] }} />
```

### 7. 401 Handling
When 401 occurs, `privateAPI` interceptor auto-clears tokens. Always handle logout UI in app root or UserContext, NOT individual screens.

### 8. Responsive Layout
Use Flexbox + NativeWind utilities:
- `flex-1` = fill available space
- `flex-row` = horizontal layout
- `items-center` = vertical centering
- `justify-between` = space distribution

## Environment Setup

### Required `.env` file:
```
API_BASE_URL=http://localhost:9000/api/v1
```

**Imported via**:
```javascript
import { API_BASE_URL } from "@env";
```

**Babel config** (`babel.config.js`) includes `react-native-dotenv` plugin - restart Metro after changing `.env`.

## File Structure Reference
```
frontend/
├── app/                       # All routes (Expo Router)
│   ├── _layout.jsx           # Root with UserProvider
│   ├── index.js              # Splash
│   ├── (auth)/               # Auth group
│   ├── (tabs)/               # Main tabs group
│   └── products/             # Product routes
├── Context/UserContext.jsx    # Global auth state
├── lib/api.js                # Axios instances
├── Components/               # Reusable UI (Card, Header, etc.)
├── assets/images/            # Static images
├── tailwind.config.js        # Custom theme config
├── package.json
└── .env                      # Local config (git-ignored)
```

## Quick Reference: Adding New Features

### New Screen:
1. Create file in appropriate group folder
2. Import hooks: `useRouter`, `useUser`, `useLocalSearchParams`
3. Use NativeWind classes from theme
4. Call API via `publicAPI` or `privateAPI`
5. Handle loading/error states

### New Dynamic Route:
1. Create `[paramName].jsx` file
2. Get param: `const { paramName } = useLocalSearchParams()`
3. Fetch in `useEffect` when param changes
4. Navigate to it: `router.push('/path/${value}')`

### New API Integration:
1. Call `publicAPI.get(...)` or `privateAPI.get(...)`
2. Check `response.data.success` before accessing data
3. Handle errors with try/catch
4. Show loading/error states in UI

## Key Files to Reference

- `tailwind.config.js` - Full color palette and typography scale
- `lib/api.js` - API client setup and interceptor logic
- `Context/UserContext.jsx` - Auth state management pattern
- `app/(tabs)/_layout.jsx` - Custom tab bar styling
- `app/(auth)/Sign.jsx` - Login flow example
- `app/products/index.jsx` - Filter/sort and list pattern
- `app/products/[productId].jsx` - Dynamic route pattern
