import Form from "@material-ui/core/FormControl";
import { TextField, Button, Typography, Grid, Snackbar } from "@material-ui/core";
import { Alert as MuiAlert } from '@material-ui/lab';
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";

import API from "../../utils/API";

// Styles
const useStyles = makeStyles({
  form: {
    width: "100%",
    "& label.Mui-focused": {
      color: "grey",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#3A8DFF",
    },
  },

  divider: {
    height: 50,
  },

  buttonDark: {
    color: "#fff",
    background: "#3A8DFF",
    padding: "16px 53px",
    margin: "0px 30px",
    textTransform: "none",
  },
});


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// Login Form Component
function SignupForm() {
  // set up styles for use by elements
  const classes = useStyles();

  // Set up States
  const [userSubmission, setUserSubmission] = useState({
    password: "",
    passwordError: "",
    email: "",
    emailError: "",
    firstName: "",
    firstNameError: "",
    lastName: "",
    lastNameError: "",
    username: "",
    usernameError: "",
  });

  // function for Validation
  function validate() {
    let isError = false;
    // reset error messages between validation attempts
    const errors = {
      passwordError: "",
      emailError: "",
      firstNameError: "",
      lastNameError: "",
      usernameError: "",
    };

    // check password
    if (userSubmission.password.length < 1) {
      isError = true;
      errors.passwordError = "Password is required!";
    } else if (userSubmission.password.length < 6) {
      isError = true;
      errors.passwordError = "Password must be longer than 6 characters!";
    }

    // check Username
    if (userSubmission.username.length < 1) {
      isError = true;
      errors.usernameError = "Username is required!";
    }

    // check FirstName
    if (userSubmission.firstName.length < 1) {
      isError = true;
      errors.firstNameError = "First Name is required!";
    }

    // check LastName
    if (userSubmission.lastName.length < 1) {
      isError = true;
      errors.lastNameError = "Last Name is required!";
    }

    // check Email Address
    if (userSubmission.email.length < 1) {
      isError = true;
      errors.emailError = "Email Address is required!";
    } else if (!validateEmail(userSubmission.email)) {
      isError = true;
      errors.emailError = "Ensure a valid Email Address!";
    }

    // Set Errors
    setUserSubmission({ ...userSubmission, ...errors });

    return !isError;
  }

  // compare email against a regular expression
  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  // function to aid in setting states
  function handleInputChange(event) {
    const { name, value } = event.target;
    setUserSubmission({ ...userSubmission, [name]: value });
  }

  // Handle submit, and explain errors if any come back
  function handleSubmit(event) {
    event.preventDefault();
    if (!validate()) {
      return console.log("Contains Errors!");
    }

    API.SignUp(userSubmission)
      .then((data) => {
        if (data.status === 201) {
          handleSuccessAlert();
        } else {
          // decrypt errors
          // was username already taken?
          if (data.keyPattern && data.keyPattern.username) {
            setUserSubmission((prevData) => {
              return {
                ...prevData,
                usernameError: prevData.username + " is already taken",
              };
            });
          }
          // Was email already taken?
          else if (data.keyPattern && data.keyPattern.email) {
            setUserSubmission((prevData) => {
              return {
                ...prevData,
                emailError: prevData.email + " is already taken",
              };
            });
          } else {
            console.log(data);
          }
        }
      })
      .catch((err) => console.log(err));
  }


  // Snackbar Settings
    const [open, setOpen] = React.useState(false);
  
    const handleSuccessAlert = () => {
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };

  // Data returned from function
  //===========================
  return (
    <div>
      <h1> Create an account.</h1>
      <Form className={classes.form} onSubmit={handleSubmit}>
        <Grid container spacing={3} justify="center" alignItems="center">
          <Grid item xs={12} sm={6}>
            <TextField
              id="standard-basic-fname"
              label="First Name"
              fullWidth
              name="firstName"
              onChange={handleInputChange}
              helperText={userSubmission.firstNameError}
              error={userSubmission.firstNameError !== ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="standard-basic-lname"
              label="Last Name"
              fullWidth
              name="lastName"
              onChange={handleInputChange}
              helperText={userSubmission.lastNameError}
              error={userSubmission.lastNameError !== ""}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="standard-basic-username"
              label="Username"
              fullWidth
              name="username"
              onChange={handleInputChange}
              helperText={userSubmission.usernameError}
              error={userSubmission.usernameError !== ""}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="standard-basic-email"
              label="E-mail address"
              fullWidth
              name="email"
              onChange={handleInputChange}
              helperText={userSubmission.emailError}
              error={userSubmission.emailError !== ""}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="standard-basic-password"
              label="Password"
              type="Password"
              fullWidth
              name="password"
              onChange={handleInputChange}
              helperText={userSubmission.passwordError}
              error={userSubmission.passwordError !== ""}
            />
          </Grid>
          <Grid item xs={6} container display="flex" justify="center">
            <Button
              type="submit"
              variant="contained"
              className={classes.buttonDark}
              onClick={handleSubmit}
            >
              Create
            </Button>
          </Grid>
        </Grid>
      </Form>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          You have just created an account!
        </Alert>
      </Snackbar>

    </div>
  );
}

export default SignupForm;
