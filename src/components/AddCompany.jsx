import { Box, Button, Container, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import styles from './AddCompany.module.css';
import {checkCompanyCode} from '../ApiCall';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
    const { onChange, ...other } = props;
  
    return (
      <NumberFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        thousandsGroupStyle="lakh" prefix={'₹'}
        isNumericString
      />
    );
  });
  
  NumberFormatCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

const AddCompany = () => {

    const [companyCodeConfirmed , setCompanyCodeConfirmed] = useState(false);
    const [vertical , setVertical] = useState('top');
    const [horizontal , setHorizontal] = useState('right');
    const [showAlert , setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState();
    const [alertMsg , setAlertMsg] = useState();

  const [errorState , setErrorState] = useState({
    companyName:false,
    companyCode:false,
    companyCeo:false,
    companyTurnOver:false,
    companyWebsite:false,
    stockExchange:false
  });

  const [values, setValues] = useState({
    companyName:'',
    companyCode:'',
    companyCeo:'',
    companyTurnOver:0,
    companyWebsite:'',
    stockExchange:''
  });
  const [data, setData] = useState({
    companyName:'',
    companyCode:'',
    companyCeo:'',
    companyTurnOver:0,
    companyWebsite:'',
    stockExchange:''
  });
  const [helperTextState , setHelpertextState] = useState({
    companyName:'',
    companyCode:'',
    companyCeo:'',
    companyTurnOver:'',
    companyWebsite:'',
    stockExchange:''
  });

  const showAlertFunc = (alert_type, alert_msg) => {
    setAlertType(alert_type);
    setAlertMsg(alert_msg);
    setShowAlert(true);
  };
  const closeAlertFunc = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertType('');
    setShowAlert(false);
  };

  const addErrorToField =(field)=> {
    console.log('addErrorToField...'+field);
    var err = JSON.parse(JSON.stringify(errorState));
    err[field] = true;
    setErrorState(
        (prev) => {
            if(prev!==err){
                return err;
            } else {
                return prev;
            }
        }
    );
    
  }
  const addHelperTextToField=(field, txtMsg)=> {
    console.log('addHelperTextToField...'+field);
    //var helperTxt = helperTextState;
    //helperTxt[field] = txtMsg? txtMsg : "This field can't be left blank!";
    //setHelpertextState(helperTxt);

    var helperTxt = JSON.parse(JSON.stringify(helperTextState));
    helperTxt[field] = txtMsg? txtMsg : "This field can't be left blank!";
    //'Only Capital Alphabets are allowed for Company Code';
    setHelpertextState(helperTxt);
    
  }
  const removeErrorFromField = (field) => {
    console.log('removeErrorFromField...'+field);
    var err = JSON.parse(JSON.stringify(errorState));
    err[field] = false;
    //setErrorState(err);
    setErrorState(
        (prev) => {
            if(prev!==err){
                return err;
            } else {
                return prev;
            }
        }
    );
}
const removeHelperTextFromField = (field) => {
    console.log('removeHelperTextFromField...'+field);
    var helperTxt = JSON.parse(JSON.stringify(helperTextState));
    helperTxt[field] = "";
    //setHelpertextState(helperTxt);
    setHelpertextState((prev) =>{
        if(prev[field]!==helperTxt[field]){
            return helperTxt;
        } else {
            return prev;
        }
    });
  }
const fieldIsBlank =(value)=>{
    if(value && value!=='' & value.trim()!==''){
        return false;
    } else {
        return true;
    }
}
const getBlankFields = () => {
    var blankFields = JSON.parse(JSON.stringify(errorState));
    for(var field in values){
        var blank = fieldIsBlank(values[field]);
        if(blank){
            blankFields[field]=true;
        } else {
            blankFields[field]=false;
        }
    }
    console.log('blankFields : ',blankFields);
    return blankFields;
}
const setHelperTextForBlankFields =(blankFieldsJson) =>{
    var helpTextForBlankFields =  JSON.parse(JSON.stringify(helperTextState));
    for(var field in blankFieldsJson){
        if(blankFieldsJson[field]){
            helpTextForBlankFields[field]= "This field can't be left empty";
        }
    }
    setHelpertextState(helpTextForBlankFields);
}
const showBlankFields=()=>{
    var blankFields = getBlankFields();
    setErrorState(blankFields);
    setHelperTextForBlankFields(blankFields);
    var fieldsAreBlank = false;
    for(var key in blankFields){
        if(blankFields[key]){
            fieldsAreBlank = true;
        }
    }
    return fieldsAreBlank;
}

  const validateData = () => {
    var validated = true;
    var fieldsAreBlank = showBlankFields();
    if(!fieldsAreBlank){
        console.log('Other validations');
        //checking for company code
        if(!companyCodeConfirmed){
            validated = false;
            showAlertFunc('error','Company Code is not valid!');
        }
        if(values.companyTurnOver<10000000){
            validated = false;
            showAlertFunc('error','Company turnover should be greater than 1Crore!');
        }
    }
    return false;
    if(false){
        var field='';
        if(field==='companyCode'){
            var helperTxt = helperTextState;
            helperTxt[field] = 'This code is not available';
            setHelpertextState({helperTxt});
        } else if(field==='companyName'){
            var helperTxt = helperTextState;
            helperTxt[field] = 'Enter a valid name';
            setHelpertextState({helperTxt});
        } else if(field==='companyTurnOver'){
            var helperTxt = helperTextState;
            helperTxt[field] = 'Enter valid turnover';
            setHelpertextState({helperTxt});
        } else if(field==='companyWebsite'){
            var helperTxt = helperTextState;
            helperTxt[field] = 'Enter valid website name';
            setHelpertextState({helperTxt});
        } else if(field==='companyCeo'){
            var helperTxt = helperTextState;
            helperTxt[field] = 'Enter a valid name';
            setHelpertextState({helperTxt});
        } else if(field==='stockExchange'){
            var helperTxt = helperTextState;
            helperTxt[field] = 'Please select the stock market';
            setHelpertextState({helperTxt});
        } 
    }
    console.log('errorState : ',errorState);
    return validated;
  }

  const registerCompany = () => {
    var validated = validateData();
    if(validated){
        registerCompany()
        .then( resp => {
            console.log('resp -> ', resp);
            setAlertMsg('Company registered successfully!');
            setAlertType('success');
            setShowAlert(true);
        })
        .catch( err =>{
            setAlertMsg('Something went wrong!');
            setAlertType('error');
            setShowAlert(true);
            console.error('err -> ',err);
        })
    }
  }
  var alpha = /[ A-Za-z]/;
  var alphaCaps = /[ A-Z]/;
    var numeric = /[0-9]/; 
    var alphanumeric = /[ A-Za-z0-9]/;

    function validateKeypress(keyChar, validChars) {
        //var keyChar = String.fromCharCode(evt.which || evt.keyCode);
        return validChars.test(keyChar) ? keyChar : false;
    }

  const handleInput =(field, evnt)=>{
    var keyChar = String.fromCharCode(evnt.which || evnt.keyCode);
    console.log(field+':'+keyChar);
    if(field==='companyCode'){
        //evnt.key===32
        if(!validateKeypress(keyChar, alphaCaps)){
            
            
            addHelperTextToField(field,'Only Capital Alphabets are allowed for Company Code');
            evnt.preventDefault();
        }
    }
  }

  const handleChange = (field, value) => {
    console.log(field+'::'+value);
    removeErrorFromField(field);
    removeHelperTextFromField(field);
    if(field==='companyCode'){
        value=value.replaceAll(" ","").toUpperCase();
        if(value.length>=4){
            checkCompanyCode(value)
            .then( res => {
                console.log('Res : ',res);
                setCompanyCodeConfirmed(true);
                removeErrorFromField('companyCode');
                addHelperTextToField('companyCode','Company Code is valid!');
            })
            .catch( err => {
                setCompanyCodeConfirmed(false);
                addErrorToField('companyCode');
                addHelperTextToField('companyCode','Company Code is not valid!');
                console.error('err->',err);
            });
        }
    }
    setValues(
        (prev) => {
            if(prev[field]===value){
                console.log('prev Val :: ',prev);
                return prev;
            } else {
                var newValues = values;
                newValues[field] = value;
                console.log('New values :: ',newValues);
                return newValues;
            }
        }
    );
    console.log('error::',errorState);
    console.log('helperText::',helperTextState);
  }

  return (
    <>
    {
        <Snackbar open={showAlert} autoHideDuration={6000} onClose={closeAlertFunc} anchorOrigin={{ vertical, horizontal }}>
            <Alert onClose={closeAlertFunc} severity={alertType} sx={{ width: '100%' }}>
            {alertMsg}
            </Alert>
        </Snackbar>
    }
    <Container maxWidth="md">
    <Box
      //component="form"
      sx={{
        '& .MuiTextField-root': { 
            m: 1, 
            width: '45%' 
        },
        '& .MuiButton-root': { 
            m: 1, 
            width: '92%' 
        },
        //width: "100%",
        maxWidth: '100%',
        padding:"30px"
      }}
      //noValidate
      autoComplete="off"
    >
        <TextField fullWidth required
            error={errorState.companyCode}
            id="companyCode"
            className={styles.code}
            label="Company Code"
            onChange={(event)=>handleChange('companyCode',event.target.value)}
            onKeyPress={(event)=>handleInput('companyCode',event)}
            defaultValue={values.companyCode}
            helperText={helperTextState.companyCode}
            inputProps={{ style: { textTransform: "uppercase" } , pattern: "[A-Z0-9]"}}
            />
        <TextField fullWidth required
            error={errorState.companyName}
            id="companyName"
            className={styles.text}
            label="Company Name"
            onChange={(event)=>handleChange('companyName',event.target.value)}
            //defaultValue="Hello World"
            helperText={helperTextState.companyName}
            inputProps={{ style: { textTransform: "capitalize" }}}
            />
        <TextField fullWidth required
            error={errorState.companyCeo}
            id="companyCeo"
            label="Company CEO"
            onChange={(event)=>handleChange('companyCeo',event.target.value)}
            //defaultValue="Hello World"
            helperText={helperTextState.companyCeo}
            />
        <TextField fullWidth required
                id='companyTurnOver'
                error={errorState.companyTurnOver}
                label="Company Turn Over"
                value={values.numberformat}
                onChange={(event)=>handleChange('companyTurnOver',event.target.value)}
                name="numberformat"
                //id="formatted-numberformat-input"
                InputProps={{
                    inputComponent: NumberFormatCustom,
                }}
                variant="outlined"
                helperText={helperTextState.companyTurnOver}
            />
        <TextField fullWidth required
            error={errorState.companyWebsite}
            id="companyWebsite"
            label="Company Website"
            onChange={(event)=>handleChange('companyWebsite',event.target.value)}
            //defaultValue="Hello World"
            helperText={helperTextState.companyWebsite}
            multiline
            maxRows={4}
            />
        <TextField id="stockExchange" label="Stock Exchange" defaultValue={values.stockExchange} select required
        onChange={(event)=>handleChange('stockExchange', event.target.value)}
        error={errorState.stockExchange}
        helperText={helperTextState.stockExchange}
        >
            <MenuItem value=""       ><em>NONE</em></MenuItem>
            <MenuItem value="BSE"    >BSE</MenuItem>
            <MenuItem value="NSE"    >NSE</MenuItem>
            <MenuItem value="SENSEX" >SENSEX</MenuItem>
        </TextField>

        <Button variant="outlined" sx={{}}
        size="large"
        fullWidth
        onClick={registerCompany}
        >
            Register Company
        </Button>
        
        
        
    </Box>
    </Container>
    </>
  )
}

export default AddCompany