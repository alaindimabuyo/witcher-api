import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton edge='start' className={classes.menuButton} color='inherit' aria-label='menu'>
            <Link to={"/"} style={{ color: "white", textDecoration: "none" }}>
              Home
            </Link>
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            The Witcher
          </Typography>
          <Button color='inherit'>
            <Link to={"/books"} style={{ color: "white", textDecoration: "none" }}>
              Books
            </Link>
          </Button>
          <Button color='inherit'>
            {" "}
            <Link to={"/characters"} style={{ color: "white", textDecoration: "none" }}>
              characters
            </Link>
          </Button>
          <Button color='inherit'>
            {" "}
            <Link to={"/login"} style={{ color: "white", textDecoration: "none" }}>
              Login
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
