import Form from "@material-ui/core/FormControl";
import {
  TextField,
  Button,
  Grid,
  Snackbar,
  Typography,
} from "@material-ui/core";
import { Alert as MuiAlert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";

import API from "../../utils/API";
import Validation from "../../utils/Validate";

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
    } else if (!Validation.validateEmail(userSubmission.email)) {
      isError = true;
      errors.emailError = "Ensure a valid Email Address!";
    }

    // Set Errors
    setUserSubmission({ ...userSubmission, ...errors });

    return !isError;
  }

  // function to aid in setting states
  function handleInputChange(event) {
    const { name, value } = event.target;
    setUserSubmission((prevData) => {
      return { ...prevData, [name]: value };
    });
  }

  // handle snackbar errors and alerts
  function handleSnackApi(severity, msg, name = null) {
    setSnackSettings({
      severity,
      msg,
    });
    handleSuccessAlert();
    // if no name passed, don't bother changing the error data
    if (!name) {
      return;
    }
    setUserSubmission((prevData) => {
      return {
        ...prevData,
        [name + "Error"]: msg,
      };
    });
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
          handleSnackApi(
            "success",
            "Congratulations! You have just created an account!"
          );
        }
        // otherwise print error sent back from API
        else {
          handleSnackApi(data.severity, data.msg, data.name)
        }
      })
      .catch((err) => {
        handleSnackApi(
          "error",
          "Somethign went wrong!  Please try again later.",
        );
        return
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
      <Typography variant="h1">Create an account.</Typography>
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
              color="primary"
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
