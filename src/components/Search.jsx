import { FormControl, IconButton, InputAdornment, InputBase, InputLabel, OutlinedInput, Paper, Skeleton, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React,{useRef, useState, useEffect} from 'react';
import Input from '@mui/material/Input';
import styles from './Search.module.css';
import { DataGrid } from '@mui/x-data-grid';
import BasicTable from './BasicTable';
import DataTable from './DataTable';
import {getCompany} from '../ApiCall'
import { Container } from '@mui/system';

const columns = [
  {
    field: "id",
    headerName: "ID", //width: 90
    flex: 2,
  },
  {
    field: "companyName",
    headerName: "Company name", //width: 130
    flex: 2,
  },
  {
    field: "stockPrice",
    headerName: "Stock Price", //width: 130
    flex: 2,
  },
  {
    field: "date",
    headerName: "Date",
    type: "date",
    //width: 90,
    flex: 2,
  },
  {
    field: "time",
    headerName: "Time",
    type: "time",
    flex: 2,
    //width: 90,
  },
];

const data = require("./../data/stocks.json");
const rows = data?.stocks;

const TableLoading = () => {
  return (
    <>
    <Typography variant="h3">{<Skeleton animation={false} />}</Typography>
      <Skeleton animation={false} />
    <Typography variant="h3">{<Skeleton />}</Typography>
      <Skeleton />
    <Typography variant="h3">{<Skeleton animation="wave" />}</Typography>
      <Skeleton animation="wave" />
    <Typography variant="h3">{<Skeleton />}</Typography>
      <Skeleton />
    <Typography variant="h3">{<Skeleton animation="wave" />}</Typography>
      <Skeleton animation="wave" />
    <Typography variant="h3">{<Skeleton />}</Typography>
      <Skeleton />
    <Typography variant="h3">{<Skeleton animation="wave" />}</Typography>
      <Skeleton animation="wave" />
    <Typography variant="h3">{<Skeleton />}</Typography>
      <Skeleton />
    <Typography variant="h3">{<Skeleton animation="wave" />}</Typography>
      <Skeleton animation="wave" />
    <Typography variant="h3">{<Skeleton />}</Typography>
      <Skeleton />
    <Typography variant="h3">{<Skeleton animation="wave" />}</Typography>
      <Skeleton animation="wave" />
    </>
  );
}

const Search = () => {

    const [companyName, setCompanyName ] = useState('');
    const [startLoading, setStartLoading] = useState(false);

    useEffect(()=>{
        console.log('companyName : ',companyName);
        if(companyName.length>=4){
          setStartLoading(true);
          getCompany(companyName)
          .then( resp =>{
            console.log(' resp => ',resp);
            setStartLoading(false);
          })
          .catch(err => {
            console.error('err => ',err);
            setStartLoading(false);
          })
        }

    }, companyName);

    const handleCompanyNameChange = (event) => {
        console.log('Company : ',event.target.value);
        setCompanyName(event.target.value);
    }
    const searchCompany = () => {
        console.log('Called');
        //alert('Searching company...');
        setStartLoading(true);
          getCompany(companyName)
          .then( resp =>{
            console.log(' resp => ',resp);
            setStartLoading(false);
          })
          .catch(err => {
            console.error('err => ',err);
            setStartLoading(false);
          })
    }
  return (
    <>
      <TextField id="outlined-search" label="Enter company code" size='small' type="search"  color='primary'
      //onChange={handleCompanyNameChange}
      sx={{marginBottom:'24px'}}
      InputProps={{
        endAdornment: (
          <InputAdornment position="start" classeName={styles.searchBtn}>
            <SearchIcon onClick={searchCompany} classeName={styles.searchBtn}/>
          </InputAdornment>
        ),
      }}
    />
    {
      startLoading && <TableLoading />
    }
    {
      (!startLoading && companyName.length<=4)?
      <Container maxWidth={'md'} m={4}>
        <Typography variant="h3" component="h3" sx={{color:'gray'}}>
          Search with company code
        </Typography>
      </Container>
      :
      <DataTable rows={rows} columns={columns}/>
    }
    </>
  )
}

export default Search