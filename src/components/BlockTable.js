import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { TableFooter, TablePagination } from '@mui/material';
import Grid from '@mui/material/Grid';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: '#33ff33'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    backgroundColor: theme.palette.common.black,
    color: '#33ff33',
    paddingRight: 4,
    paddingLeft: 5,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const headerStyles = {
  color: 'black',
  borderRadius: 2,
  backgroundColor: '#33ff33',
  padding: '8px',
  fontWeight: 700
};

const txnStyles = {
  color: 'black',
  borderRadius: 2,
  backgroundColor: '#33ff33',
  padding: '8px 12px',
  width: '100px',
  fontWeight: 700
};

const blockNoStyles = {
  color: 'black',
  borderRadius: 2,
  backgroundColor: '#33ff33',
  padding: '8px 12px',
  minWidth: '100px',
  textAligin: 'center',
  fontWeight: 700
};


export default function CustomizedTable({ rows }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  return (
    <Grid>
    <TableContainer component={Paper} sx={{backgroundColor: 'black', color: '#33ff33'}}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center"><Typography sx={blockNoStyles}>S/N</Typography></StyledTableCell>
            <StyledTableCell align="center"><Typography sx={txnStyles}>Txn Hash</Typography></StyledTableCell>
            <StyledTableCell align="center"><Typography sx={headerStyles}>Eth Amount</Typography></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{backgroundColor: 'black', color: '#33ff33'}}>
          {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell sx={{textAlign: 'center'}} align="center">{index + 1}</StyledTableCell>
              <StyledTableCell align="center">{row.hash}</StyledTableCell>
              <StyledTableCell align="center">{row.value}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
        <TableFooter sx={{backgroundColor: 'black', color: '#33ff33'}}>
          <TablePagination
            sx={{backgroundColor: 'black', color: '#33ff33'}}
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            // onChangeRowsPerPage={handleChangeRowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            
          />
        </TableFooter>
      </Table>
    </TableContainer>
    </Grid>

    // <Grid>
    // <TableContainer component={Paper} sx={{backgroundColor: 'black', color: '#33ff33'}}>
    //   <Table sx={{ minWidth: 700 }} aria-label="customized table">
    //     <TableHead>
    //       <TableRow>
    //         <StyledTableCell align="center"><Typography sx={blockNoStyles}>Block No.</Typography></StyledTableCell>
    //         <StyledTableCell align="center"><Typography sx={txnStyles}>No. Txns</Typography></StyledTableCell>
    //         <StyledTableCell align="center"><Typography sx={headerStyles}>Miner</Typography></StyledTableCell>
    //         <StyledTableCell align="center"><Typography sx={headerStyles}>Total Difficulty</Typography></StyledTableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody sx={{backgroundColor: 'black', color: '#33ff33'}}>
    //       {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
    //         <StyledTableRow key={row.number}>
    //           <StyledTableCell sx={{textAlign: 'center'}} align="center">{row.number}</StyledTableCell>
    //           <StyledTableCell align="center">{row.transactions.length}</StyledTableCell>
    //           <StyledTableCell align="center">{row.miner}</StyledTableCell>
    //           <StyledTableCell align="center">{row.totalDifficulty}</StyledTableCell>
    //         </StyledTableRow>
    //       ))}
    //     </TableBody>
    //     <TableFooter sx={{backgroundColor: 'black', color: '#33ff33'}}>
    //       <TablePagination
    //         sx={{backgroundColor: 'black', color: '#33ff33'}}
    //         rowsPerPageOptions={[5, 10, 15]}
    //         component="div"
    //         count={rows.length}
    //         rowsPerPage={rowsPerPage}
    //         page={page}
    //         onPageChange={handleChangePage}
    //         onChangeRowsPerPage={handleChangeRowsPerPage}
    //       />
    //     </TableFooter>
    //   </Table>
    // </TableContainer>
    // </Grid>


  );
}
