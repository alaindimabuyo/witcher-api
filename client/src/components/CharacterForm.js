import React, { Fragment, useContext, useEffect, useState } from "react";
import WitcherContext from "../context/WitcherContext";
import { Box, Grid, Paper, makeStyles, TextField, Button } from "@material-ui/core";
import styled from "styled-components";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
const BookForm = () => {
  const WContext = useContext(WitcherContext);
  const {} = WContext;

  const useStyles = makeStyles(theme => ({
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "right",
      padding: 50
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 600
    },
    dense: {
      marginTop: theme.spacing(4)
    },
    menu: {
      width: 500
    },
    button: {
      margin: theme.spacing(1),
      width: 600,
      textAlign: "left"
    }
  }));

  //styles
  const classes = useStyles();
  const [values, setValues] = useState({
    name: "",
    pages: "",
    date: new Date("2014-08-18T21:11:54")
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <Fragment>
      <form className={classes.container} noValidate autoComplete='off'>
        <h1>Add Characters</h1>
        <TextField
          id='standard-name'
          label='Book Name'
          className={classes.textField}
          value={values.name}
          onChange={handleChange("name")}
          margin='normal'
        />
        <TextField
          id='Pages'
          label='Pages'
          value={values.age}
          onChange={handleChange("pages")}
          type='number'
          className={classes.textField}
          margin='normal'
        />
        <TextField
          id='standard-name'
          label='Sypnosis'
          className={classes.textField}
          value={values.name}
          onChange={handleChange("sypnosis")}
          margin='normal'
        />
        <TextField
          id='date'
          label='Book Published'
          type='date'
          defaultValue='2017-05-24'
          className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
        />
        <input
          accept='image/*'
          className={classes.input}
          id='outlined-button-file'
          multiple
          type='file'
        />

        <Button variant='contained' className={classes.button}>
          Submit
        </Button>
      </form>
    </Fragment>
  );
};

export default BookForm;
