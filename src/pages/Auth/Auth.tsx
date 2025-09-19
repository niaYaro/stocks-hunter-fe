import React, { useState } from 'react';
import axios from 'axios';
import { Tabs, Tab, Box, TextField, Button, Typography } from '@mui/material';
import styles from './Auth.module.scss';

interface FormErrors {
  username?: string;
  password?: string;
  email?: string;
  general?: string;
}

const Auth: React.FC = () => {
  const [tabValue, setTabValue] = useState(0); // 0: Login, 1: Register
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setErrors({});
    setUsername('');
    setPassword('');
    setEmail('');
    setToken(null);
  };

  const validateLogin = (): boolean => {
    const newErrors: FormErrors = {};
    if (!username.trim()) {
      newErrors.username = "Ім'я користувача обов'язкове";
    }
    if (!password) {
      newErrors.password = "Пароль обов'язковий";
    } else if (password.length < 6) {
      newErrors.password = 'Пароль має містити щонайменше 6 символів';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRegister = (): boolean => {
    const newErrors: FormErrors = {};
    if (!username.trim()) {
      newErrors.username = "Ім'я користувача обов'язкове";
    }
    if (!email.trim()) {
      newErrors.email = "Email обов'язковий";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Невалідний email';
    }
    if (!password) {
      newErrors.password = "Пароль обов'язковий";
    } else if (password.length < 6) {
      newErrors.password = 'Пароль має містити щонайменше 6 символів';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const isLogin = tabValue === 0;

    if (isLogin && !validateLogin()) return;
    if (!isLogin && !validateRegister()) return;

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const payload = isLogin ? { username, password } : { username, email, password };
      const response = await axios.post(`http://localhost:5000${endpoint}`, payload);
      
      if (isLogin) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
      } else {
        setToken(null);
        setErrors({ general: 'Реєстрація успішна! Увійдіть.' });
        setTabValue(0); // Переключити на вкладку логіну
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setErrors({ general: err.response?.data?.error || 'Помилка сервера' });
    }
  };

  return (
    <div className={styles.container}>
      <Typography variant="h4" className={styles.title}>
        Authentication
      </Typography>
      <Box sx={{ width: '100%', maxWidth: 400 }}>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="Log in" />
          <Tab label="Registration" />
        </Tabs>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <TextField
              label="User name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              error={!!errors.username}
              helperText={errors.username}
              className={styles.input}
            />
          </div>
          {tabValue === 1 && (
            <div className={styles.inputGroup}>
              <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                error={!!errors.email}
                helperText={errors.email}
                className={styles.input}
              />
            </div>
          )}
          <div className={styles.inputGroup}>
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              error={!!errors.password}
              helperText={errors.password}
              className={styles.input}
            />
          </div>
          <Button
            type="submit"
            variant="contained"
            className={styles.button}
            fullWidth
          >
            {tabValue === 0 ? 'Log In' : 'Register'}
          </Button>
          {errors.general && <p className={styles.error}>{errors.general}</p>}
          {token && (
            <p className={styles.token}>
              Token: {token}
            </p>
          )}
        </form>
      </Box>
    </div>
  );
};

export default Auth;