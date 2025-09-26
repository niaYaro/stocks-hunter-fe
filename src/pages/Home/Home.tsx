import React from 'react';
import styles from './Home.module.scss';
import { Typography } from '@mui/material';
import Loader from '../../components/Loader/Loader';

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <Typography variant="h4" className={styles.title}>Home</Typography>
      <p className={styles.description}>Welcome text!</p>
      <Loader/>
    </div>
  );
};

export default Home;