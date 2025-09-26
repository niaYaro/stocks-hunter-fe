import React, { useState } from 'react';

import Button from '@mui/material/Button';
import { type StockData } from '../../types/types';
import styles from './StockPreview.module.scss';
import { Alert, Typography } from '@mui/material';
import cn from 'classnames';

interface Props {
  stock: StockData;
  onStockAdd: (updatedStocks: string) => void;
}

const StockPreview: React.FC<Props> = ({ stock, onStockAdd }) => {
  const [success, setSuccess] = useState<string | null>(null);
  const onePercentPrice = stock && (stock.general.price / 100).toFixed(3) || 0;
  const bbUpperLower = stock && (stock.technicalIndicators.bbValues.upper - stock.technicalIndicators.bbValues.lower)?.toFixed(3) || 0;

  const handleAddStock = () => {
    onStockAdd(stock.general.ticker);
    setSuccess(`Stock ${stock.general.ticker} added successfully`);
  };

  return (
    <>
      <div className={styles.foundStockDataContainer}>
        <h3>{stock.general.fullName}</h3>
        <Typography>{stock.general.price}</Typography>
        <Typography>{stock.general.ticker}</Typography>
        <Typography>{stock.general.type}</Typography>
        <div className={styles.techInd}>
          <Typography className={cn([
            stock.technicalIndicators.rsi < 30 && styles.positive,
            stock.technicalIndicators.rsi > 65 && styles.negative,
          ])}>{stock.technicalIndicators.rsi}</Typography>
          <Typography className={cn([
            stock.technicalIndicators.crossPossition === "Up" && styles.positive,
            stock.technicalIndicators.crossPossition === "Down" && styles.negative,
          ])}>{stock.technicalIndicators.crossPossition}</Typography>

          <Typography className={cn([
            stock.technicalIndicators.macd[stock.technicalIndicators.macd.length - 1].MACD <= 0 && styles.positive,
            stock.technicalIndicators.macd[stock.technicalIndicators.macd.length - 1].MACD > 0 && styles.negative,
          ])}>{stock.technicalIndicators.macd[stock.technicalIndicators.macd.length - 1].MACD.toFixed(2)}</Typography>
          <Typography className={cn([
            bbUpperLower > onePercentPrice ? styles.negative : styles.positive
          ])}>{bbUpperLower > onePercentPrice ? "No consolidation" : "Consolidation"}</Typography>
        </div>
        <Button
          variant="contained"
          className={styles.button}
          onClick={handleAddStock}
        >
          Add to list
        </Button>
      </div>
      {success && <Alert severity="success">{success}</Alert>}
    </>
  );
}

export default StockPreview;