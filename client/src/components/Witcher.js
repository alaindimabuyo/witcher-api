import React, { Fragment, useContext, useEffect } from "react";
import WitherContext from "../context/WitcherContext";
import styled from "styled-components";
import { Container, Box } from "@material-ui/core";

const Witcher = () => {
  const context = useContext(WitherContext);

  const { books, getProduct } = context;

  useEffect(() => {
    getProduct();
    //eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <Box component='span' m={1}>
        <Container maxWidth='md'>
          <Grid>
            {books.map(item => (
              <div key={item._id}>
                <ImageWrap src={item.productImage} alt='asd' />
                <h4>{item.name}</h4>
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
export default Witcher;
