import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400
  },
  dense: {
    marginTop: theme.spacing(4)
  },
  menu: {
    width: 500
  },
  button: {
    margin: theme.spacing(1),
    width: 400
  }
}));

export default function OutlinedTextFields() {
  const classes = useStyles();

  return (
    <form className={classes.container} noValidate autoComplete='off'>
      <TextField
        id='outlined-email-input'
        label='Email'
        className={classes.textField}
        type='email'
        name='email'
        autoComplete='email'
        margin='normal'
        variant='outlined'
      />
      <TextField
        id='outlined-password-input'
        label='Password'
        className={classes.textField}
        type='password'
        autoComplete='current-password'
        margin='normal'
        variant='outlined'
      />
      <Button variant='contained' className={classes.button}>
        Login
      </Button>
    </form>
  );
}
