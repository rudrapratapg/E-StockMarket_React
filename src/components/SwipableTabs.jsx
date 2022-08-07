import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PhoneMissedIcon from '@mui/icons-material/PhoneMissed';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CompanyList from './CompanyList';
import Search from './Search';
import AddCompany from './AddCompany';
import { Dialog, DialogTitle, Paper, TextField } from '@mui/material';
import { Container } from '@mui/system';
import Login from './Login';
import AppContext from '../context/AppContext';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function SwipableTabs() {

  const MyContext = React.useContext(AppContext);
  const {wantsToLogIn, setWantsToLogIn} = MyContext;

  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleCloseLogin=()=>{
    setWantsToLogIn(false);
  }

  return (
    <>
    <Login closeLogin={handleCloseLogin} openLogin={wantsToLogIn}/>
    <Box sx={{ 
        //"& .MuiBox-root":{width:"inherit"},
        width:"inherit"
    }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="inherit"
          
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab icon={<AddIcon />} iconPosition="start" label="Add Company" {...a11yProps(0)} />
          <Tab icon={<FormatListBulletedIcon />} iconPosition="start" label="List All Companies" {...a11yProps(1)} />
          <Tab icon={<SearchIcon />} iconPosition="start" label="Search Company" {...a11yProps(2)} />
        </Tabs>
    <Paper elevation={3} sx={{minHeight:'380px'}} >
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <AddCompany/>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
            <CompanyList/>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Search/>
        </TabPanel>
      </SwipeableViews>
      </Paper>
    </Box>
    </>
  );
}
