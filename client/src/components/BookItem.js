import React, { useContext, useEffect, Fragment } from "react";
import WitcherContext from "../context/WitcherContext";
import { Box, Grid, Paper, makeStyles } from "@material-ui/core";
import styled from "styled-components";

const BookItem = ({ match }) => {
  const WContext = useContext(WitcherContext);

  const { book, getCurrentBook } = WContext;

  useEffect(() => {
    getCurrentBook(match.params._id);
    //eslint-disable-next-line
  }, []);

  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "left",
      color: theme.palette.text.secondary
    },
    cover: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.primary
    }
  }));

  const classes = useStyles();
  console.log(book);
  return (
    <Fragment>
      <Box component='span' m={1}>
        <Grid container spacing={1}>
          <Grid item xs={5}>
            <Paper className={classes.cover}>
              <h1>{book.book}</h1>
              <ImageWrap src={book.bookImage} alt='' />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <h3>Sypnosis</h3>
              <p>{book.sypnosis}</p>
            </Paper>
            <Paper className={classes.paper}>
              <ul>
                <li>
                  <strong>Author:</strong> {book.author}
                </li>
                <li>
                  <strong>Pages:</strong> {book.pages}
                </li>
                <li>
                  <strong>Published:</strong> {book.published}
                </li>
              </ul>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

const ImageWrap = styled.img`
  width: 50%;
  height: auto;
`;
export default BookItem;
