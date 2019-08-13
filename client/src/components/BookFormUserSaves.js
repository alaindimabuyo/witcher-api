import React, { Fragment, useContext, useEffect } from "react";
import WitcherContext from "../context/WitcherContext";
import Chip from "@material-ui/core/Chip";
import styled from "styled-components";
import { Container, Box, Paper, makeStyles, Button } from "@material-ui/core";
const BookFormUserSaves = () => {
  const WContext = useContext(WitcherContext);
  const { books, getBook } = WContext;

  //styling
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
    },
    chip: {
      margin: theme.spacing(1)
    },
    button: {
      margin: theme.spacing(1)
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
                  <Labelwrapper>
                    <h3>{item.book}</h3>
                  </Labelwrapper>

                  <ImageWrap src={item.bookImage} alt='asd' />
                  <Labelwrapper>
                    <Chip label={item.pages} className={classes.chip} variant='outlined' />
                    <Chip label={item.published} className={classes.chip} variant='outlined' />
                  </Labelwrapper>

                  <Labelwrapper>{item.sypnosis}</Labelwrapper>

                  <Button variant='outlined' color='primary' className={classes.button}>
                    Edit
                  </Button>
                  <Button variant='outlined' color='secondary' className={classes.button}>
                    Delete
                  </Button>
                </Paper>
              </div>
            ))}
          </Grid>
        </Container>
      </Box>
    </Fragment>
  );
};
const Labelwrapper = styled.div`
  word-wrap: break-word;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
  padding-top: 50px;
`;

const ImageWrap = styled.img`
  width: 30%;
  height: auto;
`;

export default BookFormUserSaves;
