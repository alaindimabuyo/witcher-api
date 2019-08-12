import React, { Fragment, useContext, useEffect } from "react";
import WitcherContext from "../context/WitcherContext";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Container, Box, Paper, makeStyles } from "@material-ui/core";

const WitcherCharacters = () => {
  const witcherContext = useContext(WitcherContext);

  const { characters, getCharacters } = witcherContext;

  useEffect(() => {
    getCharacters();
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

  return (
    <Fragment>
      <Box component='span' m={1}>
        <Container maxWidth='md'>
          <Grid>
            {characters.map(item => (
              <div key={item._id}>
                <Paper className={classes.paper}>
                  <Link to={`/characters/${item._id}`}>
                    <ImageWrap src={item.characterImage} alt='asd' />
                  </Link>
                  <h2>{item.name}</h2>
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
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2rem;
  padding-top: 50px;
`;

const ImageWrap = styled.img`
  width: 100%;
  height: auto;
`;

export default WitcherCharacters;
