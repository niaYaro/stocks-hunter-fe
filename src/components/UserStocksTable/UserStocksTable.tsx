import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { type StockData } from '../../types/types';

interface Props {
  userStocks: StockData[];
}

const UserStocksTable: React.FC<Props> = (userStocks) => {
  const stocks = userStocks.userStocks
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
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
          {stocks.map((stock) => (
            <TableRow
              key={stock.general.ticker}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">
                {stock.general.ticker}
              </TableCell>
              <TableCell align="center">{stock.technicalIndicators.rsi}</TableCell>
              <TableCell align="center">{stock.general.price}</TableCell>
              <TableCell align="center">{stock.technicalIndicators.macd[stock.technicalIndicators.macd.length - 1].MACD.toFixed(2)}</TableCell>
              <TableCell align="center">{stock.technicalIndicators.crossPossition}</TableCell>
              <TableCell align="center">{((stock.technicalIndicators.bbValues.upper - stock.technicalIndicators.bbValues.lower) <= (stock.general.price /100)) ? "Cosolidation" : "No Cosolidation"}</TableCell>
              <TableCell align="center"><Button
              variant="contained"
              // className={styles.button}
            >
              Remove
            </Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UserStocksTable;