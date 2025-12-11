# CampusLoop - AI Coding Instructions

## Project Overview
React Native mobile app (Expo + Expo Router) for campus community marketplace, events, and resource sharing. Targets iOS/Android/Web with NativeWind (Tailwind CSS).

## Architecture & Navigation

**File-based routing** via Expo Router in `/app`:
- `index.js` - Splash → auto-redirects to `/Home`
- `(auth)/` - Auth group: `Sign.jsx`, `SignUp.jsx`
- `(tabs)/` - Main app tabs: `Home.jsx`, `Explore.jsx`, `Post.jsx`, `Events.jsx`, `Profile.jsx`
- `products/[productId].jsx` - Dynamic product detail route

**Root layout** (`app/_layout.jsx`):
- Wraps entire app with `<UserProvider>` for global auth state
- Imports `global.css` once at root (NativeWind setup)
- Uses `<Stack>` navigation wrapping all route groups

**Tab navigation** (`app/(tabs)/_layout.jsx`):
- Custom raised center button for "Post" with negative margin (`marginTop: -20`)
- Hardcoded brand colors: forest `#2D473E`, pearl `#F6F2EE`, mint `#D7E4C2`
- Icons from `@expo/vector-icons/Ionicons`

## Styling System

**NativeWind with custom theme** (`tailwind.config.js`):
- Custom color palette: `campus-forest`, `campus-sage`, `campus-mint`, `campus-slate`, `campus-ash`, `campus-pearl`
- Semantic colors map to palette: `primary-500` = forest, `primary-50` = pearl
- Typography: Roboto font family with custom scales: `text-headline-lg`, `text-title-md`, `text-body-md`, `text-label-md`
- Custom shadows: `shadow-campus`, `shadow-campus-lg`
- Custom border radius: `rounded-campus` (12px), `rounded-campus-lg` (16px)

**Styling conventions**:
- Use NativeWind classes: `className="flex-1 bg-primary-50 px-6"`
- Import `"nativewind"` in screen files to enable className prop
- Import `global.css` only in root `_layout.jsx` (already done)

## API Integration

**Dual Axios instances** (`lib/api.js`):
- `publicAPI` - Unauthenticated requests
- `privateAPI` - Auto-injects token from AsyncStorage via interceptor
  - Authorization header: `` ` ${token}` `` (note space prefix)
  - 401 responses auto-clear tokens and force re-auth

**Backend**: `API_BASE_URL` from `.env` via `react-native-dotenv`
- Import: `import { API_BASE_URL } from "@env"`
- Configured in `babel.config.js` plugin `module:react-native-dotenv`

**Example API calls**:
```javascript
// Public
const res = await publicAPI.get('/item/123');

// Authenticated
const res = await privateAPI.post('/auth/login', { email, password });
const profile = await privateAPI.get('/user/me');
```

## Authentication Pattern

**Global auth state** via Context (`Context/UserContext.jsx`):
- Hook: `const { user, loading, isAuthenticated, fetchUser, clearUser } = useUser()`
- Tokens stored in AsyncStorage: `accessToken`, `refreshToken`
- Auto-fetches user on mount, clears tokens on 401

**Login flow** (`app/(auth)/Sign.jsx`):
1. POST `/auth/login` with email/password
2. Save tokens to AsyncStorage
3. Navigate to `/(tabs)/Home` via `router.replace()`

**Logout**: Call `clearUser()` to wipe tokens and reset user state

## Development Workflow

**Start dev server**: `npx expo start`
- Opens QR for Expo Go, or use emulator/simulator/web
- Metro bundler serves on port 8081 by default

**Environment setup**:
- Create `.env` file with `API_BASE_URL=<backend-url>`
- Babel plugin `react-native-dotenv` makes vars available via `@env`

**Common issues**:
- If NativeWind styles missing: ensure `global.css` imported in root layout
- If env vars undefined: restart Metro bundler after `.env` changes
- Token format: Authorization header has space before token (not `Bearer`)

## Component Patterns

**Cards** (`app/Components/Card.jsx`, `RentalCard.jsx`):
- Use `<TouchableOpacity>` for pressable containers
- Images via `<Image source={{ uri }}>` with `resizeMode="cover"`
- Badges/tags as absolute positioned `<View>` overlays
- Call-to-action buttons: `bg-green-600` or `bg-campus-forest`

**Dynamic routes** (`products/[productId].jsx`):
- Access params: `const { productId } = useLocalSearchParams()`
- Fetch data in `useEffect` on param change
- Show loading state with `<ActivityIndicator>`

**Navigation**:
- Use `useRouter()` from `expo-router`
- Navigate: `router.push('/path')` or `router.replace('/path')`
- Go back: `router.back()`

## Project-Specific Conventions

- **File extensions**: Screens/components use `.jsx` even with TypeScript setup
- **Import aliases**: `@/` maps to root (configured in `tsconfig.json`) for imports like `@/lib/api`
- **Color usage**: Prefer semantic Tailwind classes (`bg-primary-500`) over hex codes
- **Spacing**: Use custom Tailwind spacing (`px-6`, `py-8`) defined in theme
- **Fonts**: Roboto loaded via Expo (don't manually import font files)
- **Icons**: Always use Ionicons from `@expo/vector-icons`, not other icon libraries

## Key Files to Reference

- `tailwind.config.js` - Full color palette and typography scale
- `lib/api.js` - API client setup and interceptor logic
- `Context/UserContext.jsx` - Auth state management pattern
- `app/(tabs)/_layout.jsx` - Custom tab bar styling
- `app/(auth)/Sign.jsx` - Login flow example
