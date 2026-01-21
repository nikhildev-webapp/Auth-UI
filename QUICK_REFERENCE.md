## Quick Reference Guide - Auth UI

### Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### File Locations

| Feature | File |
|---------|------|
| Authentication Logic | `src/context/AuthContext.tsx` |
| Login Page | `src/pages/Login.tsx` |
| Register Page | `src/pages/Register.tsx` |
| Dashboard | `src/pages/Dashboard.tsx` |
| Route Protection | `src/components/ProtectedRoute.tsx` |
| Routing Config | `src/App.tsx` |
| Auth Styles | `src/styles/AuthPages.css` |
| Dashboard Styles | `src/styles/Dashboard.css` |

### How to Use the Auth Context

```typescript
import { useAuth } from '@/context/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, register, logout } = useAuth();
  
  // user: User | null
  // isAuthenticated: boolean
  
  // Login
  const handleLogin = async () => {
    try {
      await login('email@example.com', 'password');
    } catch (error) {
      console.error(error.message);
    }
  };
  
  // Register
  const handleRegister = async () => {
    try {
      await register('username', 'email@example.com', 'password');
    } catch (error) {
      console.error(error.message);
    }
  };
  
  // Logout
  const handleLogout = () => {
    logout();
  };
}
```

### Demo Account

```
Email: demo@example.com
Password: demo123
```

### localStorage Keys

- `authUser` - Current logged-in user (without password)
- `authUsers` - Array of all registered users

### Routes

| Route | Component | Protected |
|-------|-----------|-----------|
| `/login` | Login | No |
| `/register` | Register | No |
| `/dashboard` | Dashboard | Yes |
| `/` | Redirects to `/dashboard` | N/A |

### Error Messages

- "Invalid email or password" - Wrong login credentials
- "Email already registered" - Email exists
- "Password must be at least 6 characters" - Weak password
- "All fields are required" - Missing form fields
- "Invalid email format" - Malformed email
- "Passwords do not match" - Confirmation password mismatch

### Styling

- **Colors**: Purple gradient (#667eea to #764ba2)
- **Animations**: Smooth transitions on all interactive elements
- **Breakpoints**: 
  - Mobile: < 480px
  - Tablet: 480px - 768px
  - Desktop: > 768px

### Key Features

✅ Context API for state management
✅ localStorage for persistence
✅ Protected routes with redirects
✅ Form validation
✅ Loading states
✅ Error handling
✅ Responsive design
✅ Modern UI with animations
✅ Auto-login after registration
✅ Session persistence

### To Add New Features

1. **Add authentication method:**
   - Update `AuthContext.tsx` with new methods
   - Export from context hook

2. **Add new page:**
   - Create component in `src/pages/`
   - Add route in `App.tsx`
   - Wrap with `<ProtectedRoute>` if needed

3. **Update styles:**
   - Create new CSS file in `src/styles/`
   - Import in component

4. **Add form validation:**
   - Extend validation logic in `AuthContext.tsx` register/login methods
   - Return descriptive error messages
