import Form from "@material-ui/core/FormControl";
import { TextField, Button, Typography, Snackbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Alert as MuiAlert } from "@material-ui/lab";
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
function LoginForm() {
  // set up styles for use by elements
  const classes = useStyles();

  // Set up States
  const [userSubmission, setUserSubmission] = useState({
    password: "",
    passwordError: "",
    email: "",
    emailError: "",
  });

  // function to aid in setting states
  function handleInputChange(event) {
    const { name, value } = event.target;
    setUserSubmission({ ...userSubmission, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!validate()) {
      return;
    }
    API.LogIn(userSubmission)
      .then((data) => {
        console.log(data);
        if (data.status === 200) {
          setSnackSettings({
            severity: "success",
            msg: "You are now signed on!",
          });
          handleAlert();
        } else if (data.status === 401) {
          setSnackSettings({
            severity: "error",
            msg: "Either your username or password are incorrect",
          });
          handleAlert();
        } else {
          setSnackSettings({
            severity: "error",
            msg: "An unknown error has occurred!  Please try again later.",
          });
          handleAlert();
          console.log({ status: data.status, message: data.statusText });
        }
      })
      .catch((err) => {
        setSnackSettings({
          severity: "error",
          msg: "An unknown error has occurred!  Please try again later.",
        });
        handleAlert();
        console.log(err);
      });
  }

  //
  // Validation of user inputs
  function validate() {
    let isError = false;
    // reset error messages between validation attempts
    const errors = {
      passwordError: "",
      emailError: "",
    };

    // check password
    if (userSubmission.password.length < 1) {
      isError = true;
      errors.passwordError = "Password is required!";
    } else if (userSubmission.password.length < 6) {
      isError = true;
      errors.passwordError = "We required a password longer than 6 characters!";
    }

    // check Email Address
    if (userSubmission.email.length < 1) {
      isError = true;
      errors.emailError = "Email Address is required!";
    } else if (!Validation.validateEmail(userSubmission.email)) {
      isError = true;
      errors.emailError = "Your email address doesnt quite look right!";
    }

    // Set Errors
    setUserSubmission({ ...userSubmission, ...errors });

    return !isError;
  }

  // Snackbar Settings
  //===============================================

  const [open, setOpen] = useState(false);
  const [snackSettings, setSnackSettings] = useState({ msg: "", severity: "" });

  // show the snackbar
  const handleAlert = () => {
    setOpen(true);
  };

  //hide the snackbar
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // Data returned from function
  //===========================
  return (
    <div>
      <Typography variant="h1"> Welcome back!</Typography>

      <Form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          id="standard-basic"
          label="E-mail address"
          width="100%"
          name="email"
          onChange={handleInputChange}
          helperText={userSubmission.emailError}
          error={userSubmission.emailError !== ""}
        />

        <Typography className={classes.divider} />

        <TextField
          id="standard-basic-password"
          label="Password"
          type="Password"
          name="password"
          onChange={handleInputChange}
          helperText={userSubmission.passwordError}
          error={userSubmission.passwordError !== ""}
        />

        <Typography className={classes.divider} />

        <Button
          type="submit"
          variant="contained"
          className={classes.buttonDark}
          onClick={handleSubmit}
        >
          Login
        </Button>
      </Form>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snackSettings.severity}>
          {snackSettings.msg}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default LoginForm;
