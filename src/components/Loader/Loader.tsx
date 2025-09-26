import React from 'react';
import gunScopeInner from '../../assets/logo/SH_logo_gunScopeInner.png';
import gunScopeOuter from '../../assets/logo/SH_logo_gunScopeOuter.png';
import styles from './Loader.module.scss';

const Loader: React.FC = () => {

  return (
    <div className={styles.loaderWrapper}>
        <img className={styles.loaderGunScopeOuter} src={gunScopeOuter} alt="Gun Scope Outer" />
        <img className={styles.loaderGunScopeInner} src={gunScopeInner} alt="Gun Scope Inner" />
        <div className={styles.candlesWrapper}>
          <div className={styles.candle}></div>
          <div className={styles.candle}></div>
          <div className={styles.candle}></div>
          <div className={styles.candle}></div>
        </div>
      </div>
  );
};

export default Loader;