import React, { Fragment, useContext, useEffect } from "react";
import WitcherContext from "../context/WitcherContext";
import { Box, Grid, Paper, makeStyles } from "@material-ui/core";
import styled from "styled-components";

const CharacterItem = ({ match }) => {
  const witcherContext = useContext(WitcherContext);
  const { getCurrentCharacter, character } = witcherContext;

  useEffect(() => {
    getCurrentCharacter(match.params._id);
    //eslint-disable-next-line
  }, []);
  console.log(character);

  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary
    },
    cover: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.primary
    }
  }));

  const classes = useStyles();

  return (
    <Fragment>
      <div>
        <Box component='span' m={1}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <h1>{character.name}</h1>
              <ImageWrap src={character.characterImage} alt='' />
              <Paper className={classes.paper}>
                <h2>Race: {character.race}</h2>
                <h2>Gender: {character.gender}</h2>
                <h2>Nationality: {character.nationality}</h2>
                <h2>Profession: {character.profession}</h2>
                <h2>Ability: {character.abilities}</h2>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </div>
    </Fragment>
  );
};

const ImageWrap = styled.img`
  width: 20%;
  height: auto;
`;
export default CharacterItem;
