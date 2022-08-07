import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import LoadingButton from "@mui/lab/LoadingButton";

const Login = (props) => {

  const { closeLogin, openLogin } = props;

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

  const handleChange =()=>{};
  const handleInput =()=>{};
  const handleSubmit =()=>{};

  return (
    <Dialog onClose={closeLogin} open={openLogin} maxWidth={'md'}>
        <DialogTitle align='center'>Login to your account</DialogTitle>
        <DialogContent>
        <Container maxWidth={'sm'}>
        <TextField
              fullWidth
              required
              margin="dense"
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
              margin="dense"
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
            {/*

          <LoadingButton
              onClick={handleSubmit}
              loading={loading}
              //loadingIndicator="Loading…"
              loadingPosition="end"
              variant="outlined"
              //margin="normal"
              fullWidth
              size="large"
            >
              Login
            </LoadingButton>
        */}
        </Container>
        </DialogContent>
        <DialogActions>
            <Container maxWidth={'sm'}>
                <Box>
                    <Button variant='outlined'>
                        Cancel
                    </Button>
                    <LoadingButton
                        onClick={handleSubmit}
                        loading={loading}
                        //loadingIndicator="Loading…"
                        loadingPosition="end"
                        variant="filled"
                        //margin="normal"
                        //fullWidth
                        size="large"
                        >
                        Login
                    </LoadingButton>
                </Box>
            </Container>
        </DialogActions>
      </Dialog>
  )
}

export default Login