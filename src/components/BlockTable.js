import { useEffect, useRef, useState } from 'react';

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
  margin: '0px auto',
  fontWeight: 700
};

const blockNoStyles = {
  color: 'black',
  borderRadius: 2,
  backgroundColor: '#33ff33',
  padding: '8px 12px',
  minWidth: '30px',
  maxWidth: '40px',
  textAligin: 'center',
  fontWeight: 700,
  margin: '0px auto'
};


export default function CustomizedTable({ rows }) {
  // console.log(rows);
  let counter = useRef(0);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const formatHash = (txnHash) => {
    const dots = "...";
    const firstFour = txnHash.substring(0, 7);
    const lastFour = txnHash.substring(35, 42);
    const displayAcct = " " + firstFour + dots + lastFour;
    // setFormattedAcct(displayAcct);
    return displayAcct;
  }

  useEffect(() => {
    counter.current = 0;
  }, [rows]);

  return (
    <Grid>
    <TableContainer component={Paper} sx={{backgroundColor: 'black', color: '#33ff33'}}>
      <Table sx={{ minWidth: '700px' }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center"><Typography sx={blockNoStyles}>S/N</Typography></StyledTableCell>
            <StyledTableCell align="center"><Typography sx={txnStyles}>Txn Hash</Typography></StyledTableCell>
            <StyledTableCell align="center"><Typography sx={headerStyles}>Eth Amount</Typography></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{backgroundColor: 'black', color: '#33ff33'}}>
          {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => row != null && (
            <StyledTableRow key={index}>
              <StyledTableCell sx={{textAlign: 'center', maxWidth: '40px', margin: '0px auto', padding: '0px'}} align="center">{((index + 1) + (page * rowsPerPage))}</StyledTableCell>
              <StyledTableCell align="center"><a style={{color: "#33ff33", textAlign: "center"}} target="_blank" rel='noreferrer noopener' href={row.hash != null && `https://etherscan.io/tx/${row.hash}`}>{formatHash(row.hash)}</a></StyledTableCell>
              <StyledTableCell align="center">{row.value === "Loading..." ? row.value : (row.value != null ? (Number(row.value/10**18)).toFixed(5) : "0.00000")}</StyledTableCell>
            </StyledTableRow>
          )
          
          )}
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

    
  );
}
