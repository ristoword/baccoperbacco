import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { fetchAdminMe, loginAdmin, setAdminToken } from './adminApi.js';

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const me = await fetchAdminMe();
        if (!cancelled) setUser(me);
      } finally {
        if (!cancelled) setBooting(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(
    () => ({
      user,
      booting,
      async login(username, password) {
        const data = await loginAdmin(username, password);
        setUser({ username: data.username });
      },
      logout() {
        setAdminToken(null);
        setUser(null);
      },
    }),
    [user, booting]
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return ctx;
}
