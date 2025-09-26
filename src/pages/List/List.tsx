/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Typography, TextField, Button, Box, Tabs, Tab } from '@mui/material';
import UserStocksTable from '../../components/UserStocksTable/UserStocksTable';
import StockPreview from '../../components/StockPreview/StockPreview';
import { type StockData } from '../../types/types';
import styles from './List.module.scss';

const List: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [selectedStock, setSelectedStock] = useState<string | null>(null);
  const [requestedStocks, setRequestedStocks] = useState<StockData | null>(null);
  const [stocksList, setStocksList] = useState<StockData[] | []>([]);
  const navigate = useNavigate();

  const handleTabChange = () => {
    if (tabValue === 0) {
      setTabValue(1);
    } else {
      setTabValue(0);
    }
  };

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
      console.error(err.AxiosError.message)
      navigate('/auth');
    }
  };

  const handleAddStock = async (ticker: string) => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        'http://localhost:5000/api/finance/stock',
        { symbol: ticker.trim().toUpperCase() },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (err: any) {
      console.error(err.AxiosError.message)
      navigate('/auth');
    }
  };

  const handleStockRemoved = (updatedStocks: StockData[]) => {
    setStocksList(updatedStocks);
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
          console.error(err.AxiosError.message)
        }
      }
      fetchedUserList();
    } else {
      setIsLogin(false);
    }
  }, [stocksList]);

  return (
    <div>
      <Box sx={{ width: '100%' }}>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="Search" />
          <Tab label="List" />
        </Tabs>
      </Box>
      <div className={styles.container}>
        <Typography variant="h4" className={styles.title}>List</Typography>
        {isLogin && (
          <>
            {tabValue === 0 && <div className={styles.searchContainer}>
              <form onSubmit={handleSubmit} className={styles.searchForm}>
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
              {requestedStocks && <StockPreview stock={requestedStocks} onStockAdd={handleAddStock} />}
            </div>}
            {tabValue === 1 && <UserStocksTable userStocks={stocksList} onStockRemoved={handleStockRemoved} />}
          </>
        )}
      </div>
    </div>
  );
};

export default List;