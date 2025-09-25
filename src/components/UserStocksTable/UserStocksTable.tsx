/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { type StockData } from '../../types/types';
import styles from './UserStocksTable.module.scss';
import { Typography } from '@mui/material';

interface Props {
  userStocks: StockData[];
  onStockRemoved: (updatedStocks: StockData[]) => void;
}

const UserStocksTable: React.FC<Props> = ({ userStocks, onStockRemoved }) => {
  const [deleteResponse, setDeleteResponse] = useState<string | null>(null);

  async function handleRemoveStock(symbol: string) {
    try {
      const response = await fetch('http://localhost:5000/api/finance/stock', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ symbol }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to remove stock');
      }

      setDeleteResponse(`${symbol} successfully removed from your list!`);

      onStockRemoved(data.stocks);
    } catch (error: any) {
      console.error('Error removing stock:', error.message);
      setDeleteResponse(`Error: ${error.message}`);
    }
  }
  return (
    <>
      {deleteResponse && <Typography className={styles.message}>{deleteResponse}</Typography>}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className={styles.tableHeader}>
            <TableRow>
              <TableCell align="center">Ticker</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">RSI</TableCell>
              <TableCell align="center">MACD</TableCell>
              <TableCell align="center">Cross Possition</TableCell>
              <TableCell align="center">Cosolidation</TableCell>
              <TableCell align="center" width={70}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userStocks.map((stock) => (
              <TableRow
                key={stock.general.ticker}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {stock.general.ticker}
                </TableCell>
                <TableCell align="center">{stock.general.price}</TableCell>
                <TableCell align="center">{stock.technicalIndicators.rsi}</TableCell>
                <TableCell align="center">{stock.technicalIndicators.macd[stock.technicalIndicators.macd.length - 1].MACD.toFixed(2)}</TableCell>
                <TableCell align="center">{stock.technicalIndicators.crossPossition}</TableCell>
                <TableCell align="center">{((stock.technicalIndicators.bbValues.upper - stock.technicalIndicators.bbValues.lower) <= (stock.general.price / 100)) ? "Cosolidation" : "No Cosolidation"}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    onClick={() => handleRemoveStock(stock.general.ticker)}
                  >
                    Remove
                  </Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default UserStocksTable;