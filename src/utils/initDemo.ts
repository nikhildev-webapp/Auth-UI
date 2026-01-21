// Initialize demo user on first load
export const initializeDemoUser = () => {
  const existingUsers = localStorage.getItem('authUsers');
  
  // Only add demo user if no users exist yet
  if (!existingUsers) {
    const demoUsers = [
      {
        id: '1',
        username: 'demo',
        email: 'demo@example.com',
        password: 'demo123',
      },
    ];
    localStorage.setItem('authUsers', JSON.stringify(demoUsers));
  }
};
