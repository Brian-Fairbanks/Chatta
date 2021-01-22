import Form from "@material-ui/core/FormControl";
import { TextField, Button, Typography } from "@material-ui/core";
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
    }
    else if (userSubmission.password.length < 6) {
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
    }
    else if (!validateEmail(userSubmission.email)) {
      isError = true;
      errors.emailError = "Ensure a valid Email Address!";
    }

    // Set Errors
    if (isError) {
      setUserSubmission({ ...userSubmission, ...errors });
    }
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

  function handleSubmit(event) {
    event.preventDefault();
    if (!validate()) {
      return console.log("Contains Errors!");
    }

    API.SignUp(userSubmission)
      .then((data) => {
        if (data.status === 200) {
          console.log({ status: data.status, message: data.statusText });
        } else {
          console.log({ status: data.status, message: data.statusText });
        }
      })
      .catch((err) => console.log(err));
  }

  // Data returned from function
  //===========================
  return (
    <div>
      <h1> Create an account.</h1>

      <Form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          id="standard-basic-fname"
          label="First Name"
          width="100%"
          name="firstName"
          onChange={handleInputChange}
        />

        <Typography className={classes.divider} />

        <TextField
          id="standard-basic-lname"
          label="Last Name"
          width="100%"
          name="lastName"
          onChange={handleInputChange}
        />

        <Typography className={classes.divider} />

        <TextField
          id="standard-basic-email"
          label="E-mail address"
          width="100%"
          name="email"
          onChange={handleInputChange}
        />

        <Typography className={classes.divider} />

        <TextField
          id="standard-basic-username"
          label="Username"
          width="100%"
          name="username"
          onChange={handleInputChange}
        />

        <Typography className={classes.divider} />

        <TextField
          id="standard-basic-password"
          label="Password"
          type="Password"
          name="password"
          onChange={handleInputChange}
        />

        <Typography className={classes.divider} />

        <Button
          type="submit"
          variant="contained"
          className={classes.buttonDark}
          onClick={handleSubmit}
        >
          Create
        </Button>
      </Form>
    </div>
  );
}

export default SignupForm;
