import Form from "@material-ui/core/FormControl";
import {TextField, Button, Typography} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";

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

  divider :{
    height:50
  },

  buttonDark: {
    color: "#fff",
    background:"#3A8DFF",
    padding: "16px 53px",
    margin: "0px 30px",
    textTransform: "none",
    fontFamily: "'Open Sans', Arial, sans-serif",
    fontSize: 16,
    fontWeight: 600,
  },
});

// Login Form Component
function LoginForm() {
  // set up styles for use by elements
  const classes = useStyles();

  // Set up States
  const [userSubmission, setUserSubmission] = useState({
    password: "",
    email: "",
  });

  // function to aid in setting states
  function handleInputChange(event) {
    const { name, value } = event.target;
    setUserSubmission({ ...userSubmission, [name]: value });
  }


  function handleSubmit(event){
    event.preventDefault();
    console.log("Submitting:",userSubmission);

  }

  // Data returned from function
  //===========================
  return (
    <div>
      <h1> Welcome back!</h1>

      <Form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          id="standard-basic"
          label="E-mail address"
          width="100%"
          name="email"
          onChange={handleInputChange}
        />

        <TextField
          id="standard-basic-password"
          label="Password"
          type="Password"
          name="password"
          onChange={handleInputChange}
        />

        <Typography className={classes.divider} />

        <Button type="submit" variant="contained" className={classes.buttonDark} onClick={handleSubmit}>
          Login
        </Button>
      </Form>
    </div>
  );
}

export default LoginForm;
