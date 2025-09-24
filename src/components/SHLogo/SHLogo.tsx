import React from 'react';
import stocksChart from '../../assets/logo/SH_logo_stocksChart.png';
import gunScopeInner from '../../assets/logo/SH_logo_gunScopeInner.png';
import gunScopeOuter from '../../assets/logo/SH_logo_gunScopeOuter.png';
import styles from './SHLogo.module.scss';
import cn from 'classnames';
import { Typography } from '@mui/material';

interface SHLogoProps extends React.HTMLAttributes<HTMLDivElement> {
  animationDuration?: "infinite" | "none";
  withTitle?: {
    isTitle: boolean;
    direction?: "horisontal" | "vertical";
  }
}
const SHLogo: React.FC<SHLogoProps> = ({ animationDuration = "none", withTitle = {isTitle: true}, className }) => {

  return (
    <div className={cn(styles.logoWrapper, className, [
          withTitle.direction === "vertical" && styles.column,
        ])}>
      <div className={styles.logoImgWrapper}>
        <img className={styles.stocksChart} src={stocksChart} alt="Stocks chart" />
        <img className={cn(styles.gunScopeInner, styles.atSpin, [
          animationDuration === "infinite" && styles.adInfinite,
        ])} src={gunScopeInner} alt="Gun scope inner" />
        <img className={cn(styles.gunScopeOuter, styles.atPendulum, [
          animationDuration === "infinite" && styles.adInfinite,
        ])} src={gunScopeOuter} alt="Gun scope outer" />
      </div>
      {withTitle && <Typography variant='h2'>Stocks Hunter</Typography>}
    </div>
  );
};

export default SHLogo;