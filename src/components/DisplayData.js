import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';


export default function DisplayData({blockNo, noTxns, miner, totalDiff}) {

  const headerStyles ={
    fontSize: 18,
    fontWeight: 600,
    padding: '5px',
    borderBottom: '1px solid #33ff33'
  };

  const cardStyle = {
    backgroundColor: 'black',
    color: '#33ff33',
    border: '2px solid #33ff33',
    borderRadius: 2,
    padding: '5px'
  };
  
  return (

    <Grid container spacing={1}>
      <Grid item xs={12} sm={6} md={2}>
        <Card sx={cardStyle}>
          <Typography sx={headerStyles}>
            Block No.
          </Typography>
          <CardContent>
            <Typography>
              {blockNo}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={2}>
        <Card sx={cardStyle}>
          <Typography sx={headerStyles}>
            No. of Txns
          </Typography>
          <CardContent>
            <Typography>
              {noTxns}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={5}>
        <Card sx={cardStyle}>
          <Typography sx={headerStyles}>
            Miner
          </Typography>
          <CardContent>
            <Typography>
              {miner}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={cardStyle}>
          <Typography sx={headerStyles}>
            Total Difficulty
          </Typography>
          <CardContent>
            <Typography>
              {totalDiff}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>

  );
}
