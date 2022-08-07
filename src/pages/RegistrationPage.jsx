import LoadingButton from "@mui/lab/LoadingButton";
import {
  Alert,
  Box,
  CssBaseline,
  Paper,
  Snackbar,
  TextField,
} from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import { registerUserApi } from "../ApiCall";
import {
  validateEmail,
  validatePassword2,
  validateUserFullName,
} from "../Util";
import { useNavigate } from "react-router-dom";

const RegistrationPage = () => {
  let navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorState, setErrorState] = useState({
    userFullName: false,
    emailId: false,
    passWord: false,
    confirmPassWord: false,
  });
  const [values, setValues] = useState({
    userFullName: "",
    emailId: "",
    passWord: "",
    confirmPassWord: "",
  });

  const [helperTextState, setHelperTextState] = useState({
    userFullName: "",
    emailId: "",
    passWord: "",
    confirmPassWord: "",
  });

  const validationHelperText = {
    userFullName: "Name format not correct",
    emailId: "Email format is not correct",
    passWord:
      "Password should have atleast 1 lowercase, uppercase, symbol, special character",
    confirmPassWord: "Passwords do not match!",
  };

  const blankHelpertext = {
    userFullName: "This field can not be left blank.",
    emailId: "This field can not be left blank.",
    passWord: "This field can not be left blank.",
    confirmPassWord: "This field can not be left blank.",
  };

  const [validState, setValidState] = useState({
    userFullName: false,
    emailId: false,
    passWord: false,
    confirmPassWord: false,
  });

  const [vertical, setVertical] = useState("top");
  const [horizontal, setHorizontal] = useState("right");
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState();
  const [alertMsg, setAlertMsg] = useState();

  const closeAlertFunc = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertType("");
    setShowAlert(false);
  };
  const addErrorToField = (field) => {
    console.log("addErrorToField..." + field);
    var err = JSON.parse(JSON.stringify(errorState));
    err[field] = true;
    setErrorState((prev) => {
      if (prev !== err) {
        return err;
      } else {
        return prev;
      }
    });
  };
  const addHelperTextToField = (field, txtMsg) => {
    console.log("addHelperTextToField..." + field);
    //var helperTxt = helperTextState;
    //helperTxt[field] = txtMsg? txtMsg : "This field can't be left blank!";
    //setHelperTextState(helperTxt);

    var helperTxt = JSON.parse(JSON.stringify(helperTextState));
    helperTxt[field] = txtMsg ? txtMsg : "This field can't be left blank!";
    //'Only Capital Alphabets are allowed for Company Code';
    setHelperTextState(helperTxt);
  };
  const removeErrorFromField = (field) => {
    console.log("removeErrorFromField..." + field);
    var err = JSON.parse(JSON.stringify(errorState));
    err[field] = false;
    //setErrorState(err);
    setErrorState((prev) => {
      if (prev !== err) {
        return err;
      } else {
        return prev;
      }
    });
  };
  const removeHelperTextFromField = (field) => {
    console.log("removeHelperTextFromField..." + field);
    var helperTxt = JSON.parse(JSON.stringify(helperTextState));
    helperTxt[field] = "";
    //setHelperTextState(helperTxt);
    setHelperTextState((prev) => {
      if (prev[field] !== helperTxt[field]) {
        return helperTxt;
      } else {
        return prev;
      }
    });
  };

  const handleChange = (fieldName, value) => {
    console.log("handleChange :: ", fieldName);
    var tempValue = JSON.parse(JSON.stringify(values));
    tempValue[fieldName] = value;
    if (fieldName === "userFullName") {
      var isBlank = checkForBlank(value);
      if (isBlank) {
        addHelperTextToField(fieldName);
        return;
      } else {
        removeHelperTextFromField(fieldName);
      }
      var validated = validateUserFullName(value);
      if (!validated) {
        addErrorToField(fieldName);
        addHelperTextToField(fieldName, validationHelperText[fieldName]);
        return;
      } else {
        removeHelperTextFromField(fieldName);
        removeErrorFromField(fieldName);
      }
      var tempValidated = JSON.parse(JSON.stringify(validState));
      if (!isBlank && validated) {
        tempValidated[fieldName] = true;
      } else {
        tempValidated[fieldName] = false;
      }
      setValidState(tempValidated);
    }
    if (fieldName === "emailId") {
      var isBlank = checkForBlank(value);
      if (isBlank) {
        addHelperTextToField(fieldName);
        return;
      } else {
        removeHelperTextFromField(fieldName);
        removeErrorFromField(fieldName);
      }
      var validated = validateEmail(value);
      if (!validated) {
        addErrorToField(fieldName);
        addHelperTextToField(fieldName, validationHelperText[fieldName]);
        return;
      } else {
        removeHelperTextFromField(fieldName);
        removeErrorFromField(fieldName);
      }
      var tempValidated = JSON.parse(JSON.stringify(validState));
      if (!isBlank && validated) {
        tempValidated[fieldName] = true;
      } else {
        tempValidated[fieldName] = false;
      }
      setValidState(tempValidated);
    }
    if (fieldName === "passWord") {
      var isBlank = checkForBlank(value);
      if (isBlank) {
        addHelperTextToField(fieldName);
        return;
      } else {
        removeHelperTextFromField(fieldName);
        removeErrorFromField(fieldName);
      }
      var validated = passwordValidation(value, fieldName);
      if (!validated) {
        addErrorToField(fieldName);
        addHelperTextToField(fieldName, validationHelperText[fieldName]);
        return;
      } else {
        removeHelperTextFromField(fieldName);
        removeErrorFromField(fieldName);
      }
      var tempValidated = JSON.parse(JSON.stringify(validState));
      if (!isBlank && validated) {
        tempValidated[fieldName] = true;
      } else {
        tempValidated[fieldName] = false;
      }
      setValidState(tempValidated);

      if (values.confirmPassWord.length !== 0) {
        var passwordMatch = value === values.confirmPassWord;
        if (!passwordMatch) {
        }
      }
    }
    if (fieldName === "confirmPassWord") {
      var isBlank = checkForBlank(value);
      if (isBlank) {
        addHelperTextToField(fieldName);
        return;
      } else {
        removeHelperTextFromField(fieldName);
        removeErrorFromField(fieldName);
      }
      var validated = passwordMatchValidation(value, fieldName);
      if (!validated) {
        addErrorToField(fieldName);
        addHelperTextToField(fieldName, validationHelperText[fieldName]);
        return;
      } else {
        removeHelperTextFromField(fieldName);
        removeErrorFromField(fieldName);
      }
      var tempValidated = JSON.parse(JSON.stringify(validState));
      if (!isBlank && validated) {
        tempValidated[fieldName] = true;
      } else {
        tempValidated[fieldName] = false;
      }
      setValidState(tempValidated);
    }
    setValues(tempValue);
  };
  const handleInput = (fieldName, evt) => {
    var key = evt.keyCode || evt.which;

    if (
      fieldName === "emailId" ||
      fieldName === "passWord" ||
      fieldName === "confirmPassWord"
    ) {
      if (key === 32) {
        addHelperTextToField(fieldName, "Space key not allowed!");
        evt.stopPropagation();
        evt.preventDefault();
      } else {
        removeHelperTextFromField(fieldName);
      }
    }
  };
  const checkForBlank = (valueStr) => {
    console.log(valueStr + ":" + valueStr.trim().length);
    if (valueStr.trim().length === 0) {
      return true;
    }
    return false;
  };
  const passwordValidation = (passwordStr, fieldName) => {
    var validated = validatePassword2(passwordStr);
    console.log("Validated :: ", validated);
    /*
    if(validated!==true){
      var tmpHelperTxt = JSON.parse(JSON.stringify(helperTextState));
      tmpHelperTxt[fieldName] = validated;
      setHelperTextState(tmpHelperTxt);
    }
    */
    if (!validated) {
      var tmpHelperTxt = JSON.parse(JSON.stringify(helperTextState));
      tmpHelperTxt[fieldName] = validationHelperText[fieldName];
      setHelperTextState(tmpHelperTxt);
    }
    return validated;
  };

  const passwordMatchValidation = (passwordStr) => {
    if (values.passWord !== passwordStr) {
      return false;
    }
    return true;
  };

  const handleClickShowPassword = () => {
    setShowPassword(true);
  };
  const handleMouseDownPassword = () => {
    setShowPassword(false);
  };

  const registerUser = () => {
    var shouldSubmit = true;
    var anyBlankField = checkForAnyBlankField();
    if (anyBlankField) {
      shouldSubmit = false;
    } else {
      for (var key in validState) {
        console.log(key + ":" + validState[key]);
        shouldSubmit = shouldSubmit && validState[key];
      }
    }
    console.log("ShouldSubmit :: " + shouldSubmit);
    if (shouldSubmit) {
      setLoading(true);
      //const timer = setTimeout(() => {
      //console.log('This will run after 1 second!')
      registerUserApi(values)
        .then((resp) => {
          setLoading(false);
          console.log("resp :: ", resp);
          setAlertType("success");
          setAlertMsg("Registered successfully");
          setShowAlert(true);
          setTimeout(() => {
            navigate("../dashboard", { replace: true });
          }, 2000);
        })
        .catch((err) => {
          setLoading(false);
          console.log("Error :: ", err);
          setAlertType("error");
          setAlertMsg("Something went wrong! Error :" + err);
          setShowAlert(true);
        });
      //setLoading(false);
      //}, 3000);
    }
    //return () => clearTimeout(timer);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    await registerUser();
  }

  const checkForAnyBlankField = () => {
    var anyBlankField = false;
    var tempBlankJson = {};
    var tempHelperTextState = {};
    for (var key in values) {
      var isBlank = checkForBlank(values[key]);
      tempBlankJson[key] = isBlank;
      if (isBlank) {
        tempHelperTextState[key] = blankHelpertext[key];
      }
      /*
    if(isBlank) {
      anyBlankField = true;
      addHelperTextToField(key);
      addErrorToField(key);
      //return ;
    } else {
      removeHelperTextFromField(key);
      removeErrorFromField(key);
    }
    */
    }
    setErrorState(tempBlankJson);
    setHelperTextState(tempHelperTextState);
    return anyBlankField;
  };
  return (
    <>
      {
        <Snackbar
          open={showAlert}
          autoHideDuration={6000}
          onClose={closeAlertFunc}
          anchorOrigin={{ vertical, horizontal }}
        >
          <Alert
            onClose={closeAlertFunc}
            severity={alertType}
            sx={{ width: "100%" }}
          >
            {alertMsg}
          </Alert>
        </Snackbar>
      }
      <CssBaseline />
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            marginTop: "10vh",
            //bgcolor: '#cfe8fc',
            minHeight: "60vh",
            overflowY: "auto",
          }}
        >
          <Box
            //component="form"
            sx={{
              "& .MuiTextField-root": {
                //m: 1,
                //width: '25%'
              },
              //width: "50%",
              //maxWidth: '100%',
              padding: "30px",
            }}
            //noValidate
            autoComplete="off"
          >
            <TextField
              fullWidth
              required
              margin="normal"
              error={errorState.userFullName}
              id="userFullName"
              //className={styles.code}
              label="Full Name"
              onChange={(event) =>
                handleChange("userFullName", event.target.value)
              }
              onKeyPress={(event) => handleInput("userFullName", event)}
              defaultValue={values.userFullName}
              helperText={helperTextState.userFullName}
              inputProps={{
                style: {
                  //textTransform: "uppercase"
                },
                pattern: "[A-Z ]",
              }}
            />
            <TextField
              fullWidth
              required
              margin="normal"
              error={errorState.emailId}
              id="emailId"
              //className={styles.code}
              label="Email"
              onChange={(event) => handleChange("emailId", event.target.value)}
              onKeyPress={(event) => handleInput("emailId", event)}
              defaultValue={values.emailId}
              helperText={helperTextState.emailId}
              inputProps={{
                style: {
                  //textTransform: "uppercase"
                },
                pattern: "[A-Za-z0-9@.]",
              }}
            />
            <TextField
              fullWidth
              required
              margin="normal"
              id="passWord"
              error={errorState.passWord}
              //className={styles.code}
              label="Password"
              type="password"
              onChange={(event) => handleChange("passWord", event.target.value)}
              onKeyPress={(event) => handleInput("passWord", event)}
              defaultValue={values.passWord}
              helperText={helperTextState.passWord}
              inputProps={{
                style: {
                  //textTransform: "uppercase"
                },
                pattern: "[A-Za-z0-9@.]",
              }}
            />
            <TextField
              fullWidth
              required
              margin="normal"
              id="confirmPassWord"
              error={errorState.confirmPassWord}
              //className={styles.code}
              label="Confirm Password"
              type="password"
              onChange={(event) =>
                handleChange("confirmPassWord", event.target.value)
              }
              onKeyPress={(event) => handleInput("confirmPassWord", event)}
              defaultValue={values.confirmPassWord}
              helperText={helperTextState.confirmPassWord}
              inputProps={{
                style: {
                  //textTransform: "uppercase"
                },
                pattern: "[A-Za-z0-9@.]",
              }}
            />
            {/*
        <FormControl  variant="outlined" fullWidth margin="normal">
          <InputLabel htmlFor="passWord" required>Password</InputLabel>
          <OutlinedInput
            id="passWord"
            fullWidth
            error={errorState.passWord}
            type={showPassword ? 'text' : 'password'}
            defaultValue={values.passWord}
            onChange={(event)=>handleChange('passWord',event.target.value)}
            onKeyPress={(event)=>handleInput('passWord',event)}
            helperText={helperTextState.passWord}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <FormControl  variant="outlined" fullWidth margin="normal">
          <InputLabel htmlFor="confirmPassWord" required>Confirm Password</InputLabel>
          <OutlinedInput
            id="confirmPassWord"
            fullWidth
            error={errorState.confirmPassWord}
            type={showPassword ? 'text' : 'password'}
            defaultValue={values.confirmPassWord}
            onChange={(event)=>handleChange('confirmPassWord',event.target.value)}
            onKeyPress={(event)=>handleInput('confirmPassWord',event)}
            helperText={helperTextState.confirmPassWord}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Confirm Password"
          />
        </FormControl>
       */}
            <LoadingButton
              onClick={handleSubmit}
              loading={loading}
              //loadingIndicator="Loading…"
              loadingPosition="end"
              variant="outlined"
              margin="normal"
              fullWidth
              size="large"
            >
              Register
            </LoadingButton>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default RegistrationPage;
