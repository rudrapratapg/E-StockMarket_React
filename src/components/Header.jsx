import { Avatar, Button, Grid, Paper } from '@mui/material'
import React from 'react';
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined';
import Icon from '@mui/material/Icon';
import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/system';
import Search from './Search';
import LogoImg from "./../images/stock_colored_image.png";

const Header = () => {
  return (    
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      p={2}
    >
      <Paper  elevation={0}>
        <Grid container spacing={2}>
          <Grid item>
            <Paper elevation={0}>
              <Avatar alt="Remy Sharp" src={LogoImg} />
            </Paper>
          </Grid>
          <Grid item>
            <Paper elevation={0}>
              <Button variant="outlined" size='medium' startIcon={<AddIcon />}>
                Add Company
              </Button>

            </Paper>
          </Grid>
        </Grid>
      </Paper>
      <Paper elevation={0}>
        <Button variant="outlined" size='medium' startIcon={<AddIcon />}>
          List All Companies
        </Button>
      </Paper>
      <Paper elevation={0}>
        <Search />
      </Paper>
      
    </Grid>
  )
}

export default Header