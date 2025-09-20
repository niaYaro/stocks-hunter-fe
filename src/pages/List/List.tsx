import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import styles from './List.module.scss';

const List: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
      navigate('/auth'); // Перенаправлення на /auth, якщо токена немає
    }
  }, [navigate]);

  return (
    <div className={styles.container}>
      <Typography variant="h4" className={styles.title}>List</Typography>
      {isLogin ? (
        <p className={styles.description}>Welcome, you are logged in! Here is your list.</p>
      ) : (
        <p className={styles.description}>Redirecting to login...</p>
      )}
    </div>
  );
};

export default List;