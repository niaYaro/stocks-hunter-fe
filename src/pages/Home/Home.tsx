import React from 'react';
import styles from './Home.module.scss';

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Домашня сторінка</h1>
      <p className={styles.description}>Ласкаво просимо до нашого додатку!</p>
    </div>
  );
};

export default Home;