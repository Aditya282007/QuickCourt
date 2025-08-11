export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'owner' | 'admin';
  avatar?: string;
  joinedAt: string;
  lastActive: string;
}

export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};

export const isAdmin = (): boolean => {
  const user = getCurrentUser();
  return user?.role === 'admin';
};

export const isOwner = (): boolean => {
  const user = getCurrentUser();
  return user?.role === 'owner';
};

export const logout = (): void => {
  localStorage.removeItem('user');
  window.location.href = '/';
};

export const login = (email: string, password: string, role?: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    // Simulate API call delay
    setTimeout(() => {
      // Admin login
      if (email === 'admin@gmail.com' && password === 'admin@123') {
        const user: User = {
          id: 'admin-1',
          email,
          role: 'admin',
          name: 'Admin User',
          joinedAt: new Date().toISOString(),
          lastActive: new Date().toISOString()
        };
        localStorage.setItem('user', JSON.stringify(user));
        resolve(user);
        return;
      }

      // Regular user login (for demo purposes)
      const userRole = (role || (email.includes('owner') ? 'owner' : 'user')) as 'user' | 'owner';
      const user: User = {
        id: Date.now().toString(),
        email,
        role: userRole,
        name: email.split('@')[0],
        joinedAt: new Date().toISOString(),
        lastActive: new Date().toISOString()
      };
      localStorage.setItem('user', JSON.stringify(user));
      resolve(user);
    }, 1000);
  });
};

export const signup = (name: string, email: string, password: string, role: 'user' | 'owner', avatar?: string): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user: User = {
        id: Date.now().toString(),
        email,
        role,
        name,
        avatar,
        joinedAt: new Date().toISOString(),
        lastActive: new Date().toISOString()
      };
      localStorage.setItem('user', JSON.stringify(user));
      resolve(user);
    }, 1000);
  });
};