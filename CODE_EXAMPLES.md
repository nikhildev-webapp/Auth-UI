## Code Examples - Auth UI Usage

### Using the Auth Context in Components

#### Basic Usage

```typescript
import { useAuth } from '../context/AuthContext';

export function MyComponent() {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }

  return (
    <div>
      <h1>Welcome, {user?.username}</h1>
      <p>Email: {user?.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

#### Login Implementation

```typescript
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {error && <p className="error">{error}</p>}
      
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
```

#### Registration Implementation

```typescript
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export function RegisterForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      await register(username, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      {error && <p className="error">{error}</p>}
      
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
        required
      />
      
      <button type="submit" disabled={loading}>
        {loading ? 'Creating account...' : 'Sign Up'}
      </button>
    </form>
  );
}
```

#### Logout Implementation

```typescript
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export function LogoutButton() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return <button onClick={handleLogout}>Logout</button>;
}
```

#### Conditional Rendering Based on Auth

```typescript
import { useAuth } from '../context/AuthContext';

export function Navigation() {
  const { isAuthenticated, user } = useAuth();

  return (
    <nav>
      {isAuthenticated ? (
        <>
          <span>Welcome, {user?.username}</span>
          <a href="/dashboard">Dashboard</a>
          <a href="/logout">Logout</a>
        </>
      ) : (
        <>
          <a href="/login">Login</a>
          <a href="/register">Sign Up</a>
        </>
      )}
    </nav>
  );
}
```

### Working with localStorage Directly

#### Get Current User

```typescript
function getCurrentUser() {
  const userJson = localStorage.getItem('authUser');
  return userJson ? JSON.parse(userJson) : null;
}

const user = getCurrentUser();
console.log(user); // { id: '...', username: '...', email: '...' }
```

#### Get All Users

```typescript
function getAllUsers() {
  const usersJson = localStorage.getItem('authUsers');
  return usersJson ? JSON.parse(usersJson) : [];
}

const users = getAllUsers();
console.log(users); // Array of all registered users
```

#### Clear Auth Data

```typescript
function clearAuth() {
  localStorage.removeItem('authUser');
  localStorage.removeItem('authUsers');
}
```

#### Reset to Demo User

```typescript
function resetToDemoUser() {
  const demoUsers = [
    {
      id: '1',
      username: 'demo',
      email: 'demo@example.com',
      password: 'demo123',
    },
  ];
  localStorage.setItem('authUsers', JSON.stringify(demoUsers));
  localStorage.removeItem('authUser');
}

resetToDemoUser();
```

### Routing Examples

#### Protected Route with Redirect

```typescript
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

// Usage in routing
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

#### Conditional Route Redirect

```typescript
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LoginRoute() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Login />;
}

// Usage in routing
<Route path="/login" element={<LoginRoute />} />
```

### Custom Hooks

#### Create a useRequireAuth Hook

```typescript
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export function useRequireAuth() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated;
}

// Usage in component
export function ProtectedComponent() {
  useRequireAuth(); // Redirects to login if not authenticated
  
  return <div>Protected Content</div>;
}
```

#### Create a useUser Hook

```typescript
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export function useUser() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('/login');
  }

  return user;
}

// Usage in component
export function UserProfile() {
  const user = useUser();
  
  return (
    <div>
      <h1>{user?.username}</h1>
      <p>{user?.email}</p>
    </div>
  );
}
```

### Error Handling Patterns

#### Comprehensive Error Handling

```typescript
const [error, setError] = useState<string | null>(null);
const [success, setSuccess] = useState<string | null>(null);

const handleLogin = async (email: string, password: string) => {
  setError(null);
  setSuccess(null);

  try {
    await login(email, password);
    setSuccess('Login successful!');
    // Redirect after short delay
    setTimeout(() => navigate('/dashboard'), 500);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'An error occurred';
    setError(errorMessage);
  }
};
```

#### Error Types and Messages

```typescript
interface AuthError {
  code: string;
  message: string;
}

async function handleAuth(action: 'login' | 'register', ...args: any[]) {
  try {
    if (action === 'login') {
      await login(args[0], args[1]);
    } else {
      await register(args[0], args[1], args[2]);
    }
  } catch (err) {
    if (err instanceof Error) {
      // Handle specific error messages
      if (err.message.includes('Invalid')) {
        // Handle invalid credentials
      } else if (err.message.includes('already')) {
        // Handle duplicate email
      } else if (err.message.includes('characters')) {
        // Handle weak password
      }
    }
  }
}
```

### Advanced Patterns

#### Form State Management

```typescript
interface FormState {
  email: string;
  password: string;
  errors: Record<string, string>;
  isSubmitting: boolean;
}

const [form, setForm] = useState<FormState>({
  email: '',
  password: '',
  errors: {},
  isSubmitting: false,
});

const handleChange = (field: keyof FormState, value: string) => {
  setForm((prev) => ({
    ...prev,
    [field]: value,
    errors: { ...prev.errors, [field]: '' },
  }));
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setForm((prev) => ({ ...prev, isSubmitting: true }));

  try {
    await login(form.email, form.password);
  } catch (err) {
    setForm((prev) => ({
      ...prev,
      errors: {
        ...prev.errors,
        submit: err instanceof Error ? err.message : 'Login failed',
      },
    }));
  } finally {
    setForm((prev) => ({ ...prev, isSubmitting: false }));
  }
};
```

#### Validation Helpers

```typescript
export const validateEmail = (email: string): string | null => {
  if (!email.includes('@')) {
    return 'Invalid email format';
  }
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (password.length < 6) {
    return 'Password must be at least 6 characters';
  }
  return null;
};

export const validatePasswords = (
  password: string,
  confirm: string
): string | null => {
  if (password !== confirm) {
    return 'Passwords do not match';
  }
  return null;
};

// Usage
const emailError = validateEmail(email);
const passwordError = validatePassword(password);
const confirmError = validatePasswords(password, confirmPassword);
```

---

These examples demonstrate the most common patterns and use cases for the Authentication UI system. Adapt them to your specific needs!
