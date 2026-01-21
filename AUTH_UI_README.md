# Authentication UI - Frontend Only

A modern, responsive authentication system built with React, TypeScript, and Vite. Features include user registration, login, and a protected dashboard with Context API state management and localStorage for persistence.

## Features

✨ **Three Main Pages:**
- **Login Page** - User authentication with email and password
- **Register Page** - New user account creation with validation
- **Dashboard** - Protected page showing user information and account options

🔐 **Authentication Features:**
- Context API for global user state management
- Fake authentication using localStorage
- Protected routes that redirect unauthenticated users to login
- Auto-login after registration
- Session persistence across page refreshes

🎨 **Modern UI/UX:**
- Responsive design (mobile, tablet, desktop)
- Smooth animations and transitions
- Gradient backgrounds and modern styling
- Error handling with user-friendly messages
- Loading states on buttons

## Project Structure

```
src/
├── components/
│   └── ProtectedRoute.tsx       # Route protection component
├── context/
│   └── AuthContext.tsx           # Authentication Context API
├── pages/
│   ├── Login.tsx                 # Login page
│   ├── Register.tsx              # Registration page
│   └── Dashboard.tsx             # Protected dashboard
├── styles/
│   ├── AuthPages.css             # Login/Register styles
│   └── Dashboard.css             # Dashboard styles
├── utils/
│   └── initDemo.ts               # Demo user initialization
├── App.tsx                       # Main app with routing
├── App.css                       # Global styles
└── main.tsx                      # Entry point
```

## Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## Demo Credentials

A demo user is automatically created on first load:

```
Email: demo@example.com
Password: demo123
```

## Usage

### Login Flow
1. Visit the login page
2. Enter email and password
3. Click "Sign In" to authenticate
4. Get redirected to the dashboard

### Registration Flow
1. Click "Sign up" on the login page
2. Enter username, email, and password
3. Confirm password and click "Sign Up"
4. Automatically logged in and redirected to dashboard

### Dashboard
- View your profile information
- See user account details (username, email, ID, status)
- Access account management options
- Logout to return to login page

## Technical Details

### Technology Stack
- **React 19.2** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **Context API** - State management

### Context API (AuthContext)

The authentication state is managed globally using React Context:

```typescript
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}
```

### localStorage Structure

**Users Database:**
```javascript
// Key: 'authUsers'
// Value: Array of user objects
[
  {
    id: string,
    username: string,
    email: string,
    password: string // Note: Never store plain passwords in production!
  }
]
```

**Current User Session:**
```javascript
// Key: 'authUser'
// Value: Current logged-in user (without password)
{
  id: string,
  username: string,
  email: string
}
```

### Protected Routes

Routes are protected using the `ProtectedRoute` component:
- Unauthenticated users are redirected to `/login`
- Dashboard page requires authentication
- Login/Register redirect authenticated users to dashboard

## Responsive Design

The application is fully responsive with breakpoints for:
- **Desktop** (1024px+) - Full layout with all features
- **Tablet** (768px - 1023px) - Optimized grid layouts
- **Mobile** (< 768px) - Stacked layouts and touch-friendly buttons

## Validation

### Registration Form
- ✅ All fields required
- ✅ Email must contain '@'
- ✅ Password minimum 6 characters
- ✅ Password and confirm password must match
- ✅ Email uniqueness check

### Login Form
- ✅ Valid email format
- ✅ Password matches registered user

## Security Notes

⚠️ **Important:** This is a demo/frontend-only implementation for educational purposes. In a production application:

1. **Never store passwords in localStorage** - Always use secure authentication servers
2. **Use HTTPS** - All authentication traffic must be encrypted
3. **Implement server-side validation** - Don't trust client-side checks alone
4. **Use secure authentication tokens** - Consider JWT with httpOnly cookies
5. **Implement CSRF protection** - Prevent cross-site request forgery
6. **Add rate limiting** - Prevent brute force attacks
7. **Use proper session management** - Server-side sessions or tokens

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
