import { Avatar, Grid, Paper, Stack } from '@mui/material'
import React from 'react'
//import { Container,Col, Row } from 'react-bootstrap'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CompanyHistory from '../components/CompanyHistory'
import CompanyList from '../components/CompanyList'
import Header from '../components/Header'
import SwipableTabs from '../components/SwipableTabs';
import LogoImg from "./../images/stock_colored_image.png";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import {Link} from 'react-router-dom';

const LandingPage = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  return (
    <>
    <Box sx={{ flexGrow: 1,margin:'25px' }}>
      <Grid container spacing={0}>
        
          <SwipableTabs/>
      </Grid>
    </Box>
    {/*
    <Stack direction="horizontal" gap={3}>
      <Paper elevation={0}>
        <Avatar alt="Remy Sharp" src={LogoImg} />
      </Paper>
      <SwipableTabs/>
    </Stack>
    <Grid container spacing={2}>
      <Grid item xs={1}>
      
      </Grid>
      <Grid item xs={11}>
        <SwipableTabs/>
      </Grid>
    </Grid>
    <Container disableGutters >
      <Row>
        <Col lg="1" md="1" sm="1">
        <Stack>
          <Grid item>
            <Paper elevation={0}>
              <Avatar alt="Remy Sharp" src={LogoImg} />
            </Paper>
          </Grid>

        </Stack>
        </Col>
        <Col lg="11" md="11" sm="11">
          <SwipableTabs/>
        </Col>
      </Row>    
    </Container>
    */}
    </>
  )
}

export default LandingPage