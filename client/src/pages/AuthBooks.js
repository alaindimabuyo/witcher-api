import React, { Fragment } from "react";
import BookForm from "../components/BookForm";
import BookSaves from "../components/BookFormUserSaves";
import CharacterForm from "../components/CharacterForm";
import { Box, Grid, Paper, makeStyles } from "@material-ui/core";
const AuthBooks = () => {
  return (
    <Fragment>
      <Box>
        <Grid container spacing={1}>
          <Grid>
            <BookForm />
          </Grid>
          <Grid>
            <BookSaves />
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Grid container spacing={1}>
          <Grid>
            <CharacterForm />
          </Grid>
          <Grid>
            <BookSaves />
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default AuthBooks;
