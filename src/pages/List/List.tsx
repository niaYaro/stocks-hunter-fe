/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, TextField, Button } from '@mui/material';
import UserStocksTable from '../../components/UserStocksTable/UserStocksTable';
import axios from 'axios';
import styles from './List.module.scss';
import cn from 'classnames';

interface StockData {
  general: {
    fullName: string;
    price: number;
    ticker: string;
    type: string;
  }
  technicalIndicators: {
    bbValues: {
      lower: number;
      middle: number;
      pb: number;
      upper: number;
    };
    crossPossition: "Down" | "Up";
    macd: {
      MACD: number;
      histogram: number;
      signal: number;
    }[];
    rsi: number;
  }
}

const List: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [selectedStock, setSelectedStock] = useState<string | null>(null);
  const [requestedStocks, setRequestedStocks] = useState<StockData | null>(null);
  const [stocksList, setStocksList] = useState<StockData[] | []>([]);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const toket = localStorage.getItem('token');
    try {
      const endpoint = `/api/finance/stock/${selectedStock}`;
      const response = await axios.get(`http://localhost:5000${endpoint}`, {
        headers: { Authorization: `Bearer ${toket}` },
      });
      setRequestedStocks(() => response.data);
    } catch (err: any) {
      console.error("Very error", err.axios.error)
      navigate('/auth');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
      navigate('/auth');
    }
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const fetchedUserList = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/finance/user/stocks`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setStocksList(() => response.data.stocks);
        } catch (err: any) {
          console.error("Very error", err.axios.error)
        }
      }
      fetchedUserList();
    } else {
      setIsLogin(false);
    }
  }, []);

  const onePercentPrice = requestedStocks && (requestedStocks?.general.price / 100).toFixed(3) || 0;
  const bbUpperLower = requestedStocks && (requestedStocks?.technicalIndicators.bbValues.upper - requestedStocks?.technicalIndicators.bbValues.lower)?.toFixed(3) || 0;

  return (
    <div className={styles.container}>
      <Typography variant="h4" className={styles.title}>List</Typography>
      {isLogin && (
        <>
          <form onSubmit={handleSubmit} className={styles.searchContainer}>
            <TextField
              label="Stock symbol"
              value={selectedStock}
              onChange={(e) => setSelectedStock(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              className={styles.button}
            >
              Find
            </Button>
          </form>
          {requestedStocks && <div className={styles.foundStockDataContainer}>
            <h3>{requestedStocks?.general.fullName}</h3>
            <Typography>{requestedStocks.general.price}</Typography>
            <Typography>{requestedStocks.general.ticker}</Typography>
            <Typography>{requestedStocks.general.type}</Typography>
            <div className={styles.techInd}>
              <Typography className={cn([
                requestedStocks.technicalIndicators.rsi < 30 && styles.positive,
                requestedStocks.technicalIndicators.rsi > 65 && styles.negative,
              ])}>{requestedStocks.technicalIndicators.rsi}</Typography>
              <Typography className={cn([
                requestedStocks.technicalIndicators.crossPossition === "Up" && styles.positive,
                requestedStocks.technicalIndicators.crossPossition === "Down" && styles.negative,
              ])}>{requestedStocks.technicalIndicators.crossPossition}</Typography>

              <Typography className={cn([
                requestedStocks.technicalIndicators.macd[requestedStocks?.technicalIndicators.macd.length - 1].MACD <= 0 && styles.positive,
                requestedStocks.technicalIndicators.macd[requestedStocks?.technicalIndicators.macd.length - 1].MACD > 0 && styles.negative,
              ])}>{requestedStocks.technicalIndicators.macd[requestedStocks?.technicalIndicators.macd.length - 1].MACD.toFixed(2)}</Typography>
              <Typography className={cn([
                bbUpperLower > onePercentPrice ? styles.negative : styles.positive
              ])}>{bbUpperLower > onePercentPrice ? "No consolidation" : "Consolidation"}</Typography>
            </div>
            <Button
              variant="contained"
              className={styles.button}
            >
              Add to list
            </Button>
          </div>}
          <UserStocksTable userStocks={stocksList} />
        </>
      )}
    </div>
  );
};

export default List;