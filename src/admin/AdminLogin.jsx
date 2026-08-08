import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAdminAuth } from './AdminAuthContext.jsx';

export default function AdminLogin() {
  const { user, login } = useAdminAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (user) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username.trim(), password);
      navigate('/admin/dashboard', { replace: true });
    } catch (err) {
      setError(err.message === 'Invalid credentials' ? 'Nome utente o password non validi.' : 'Accesso non riuscito.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-login">
      <div className="admin-login__card">
        <p className="admin-login__eyebrow">Bacco Perbacco</p>
        <h1>Dashboard titolare</h1>
        <p className="admin-login__sub">Accedi per gestire foto, menu, eventi e feedback.</p>

        <form onSubmit={onSubmit} className="admin-form">
          <label>
            Nome utente
            <input
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {error ? <p className="admin-msg admin-msg--err">{error}</p> : null}
          <button type="submit" className="admin-btn admin-btn--primary" disabled={loading}>
            {loading ? 'Accesso…' : 'Accedi'}
          </button>
        </form>
      </div>
    </div>
  );
}
