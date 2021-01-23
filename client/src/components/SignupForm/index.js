import Form from "@material-ui/core/FormControl";
import { TextField, Button, Grid, Snackbar } from "@material-ui/core";
import { Alert as MuiAlert } from "@material-ui/lab";
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
  // Setup
  //=============================================================

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

  // Functions
  //=============================================================

  // Validation of user inputs
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
    // cancel the submit if validation finds errors
    if (!validate()) {
      return;
    }

    // otherwise, attempt to sign up the user
    API.SignUp(userSubmission)
      .then((data) => {
        // alert with snackbox if everyhting works and you get a 201 status
        if (data.status === 201) {
          setSnackSettings({
            severity: "success",
            msg: "Congratulations! You have just created an account!",
          });
          handleSuccessAlert();
        }
        // otherwise figure out what went wrong
        else {
          // decrypt errors
          // was username already taken?  show error on username
          if (data.keyPattern && data.keyPattern.username) {
            setSnackSettings({
              severity: "error",
              msg: userSubmission.username + " is already taken",
            });
            handleSuccessAlert();
            setUserSubmission((prevData) => {
              return {
                ...prevData,
                usernameError: prevData.username + " is already taken",
              };
            });
          }
          // Was email already taken? show error on email
          else if (data.keyPattern && data.keyPattern.email) {
            setSnackSettings({
              severity: "error",
              msg: userSubmission.email + " is already taken",
            });
            handleSuccessAlert();
            setUserSubmission((prevData) => {
              return {
                ...prevData,
                emailError: prevData.email + " is already taken",
              };
            });
          }
          // Not sure what would show up here, but the error is logged if it ever does.
          else {
            setSnackSettings({
              severity: "error",
              msg: "Somethign went wrong!  Please try again later.",
            });
            handleSuccessAlert();
            console.log(data);
          }
        }
      })
      .catch((err) => {
        setSnackSettings({
          severity: "error",
          msg: "Somethign went wrong!  Please try again later.",
        });
        handleSuccessAlert();
        console.log(err);
      });
  }

  // Snackbar Settings
  const [open, setOpen] = useState(false);
  const [snackSettings, setSnackSettings] = useState({ msg: "", severity: "" });

  // show the snackbar
  const handleSuccessAlert = () => {
    setOpen(true);
  };

  //hide the snackbar
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // Data returned from component IE the Form
  //=============================================================
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
        <Alert onClose={handleClose} severity={snackSettings.severity}>
          {snackSettings.msg}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default SignupForm;
