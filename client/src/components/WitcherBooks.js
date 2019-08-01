import React, { Fragment, useContext, useEffect } from "react";
import WitherContext from "../context/WitcherContext";
import styled from "styled-components";
import { Container, Box, Paper, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

const Witcher = () => {
  const context = useContext(WitherContext);

  const { books, getBook } = context;

  useEffect(() => {
    getBook();
    //eslint-disable-next-line
  }, []);
  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.primary
    }
  }));

  const classes = useStyles();
  console.log(books);
  return (
    <Fragment>
      <Box component='span' m={1}>
        <Container maxWidth='md'>
          <Grid>
            {books.map(item => (
              <div key={item._id}>
                <Paper className={classes.paper}>
                  <Link to={`/books/${item._id}`}>
                    <ImageWrap src={item.bookImage} alt='asd' />
                  </Link>
                  <h2>{item.book}</h2>
                </Paper>
              </div>
            ))}
          </Grid>
        </Container>
      </Box>
    </Fragment>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
  padding-top: 50px;
`;

const ImageWrap = styled.img`
  width: 100%;
  height: auto;
`;
export default Witcher;
