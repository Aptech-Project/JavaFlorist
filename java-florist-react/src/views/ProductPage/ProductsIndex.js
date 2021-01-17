import React, { useEffect, useState } from 'react';

// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Parallax from "components/Parallax/Parallax.js";
import styles from "assets/jss/material-kit-react/views/landingPage.js";


// Sections for this page
import ProductSection from "./ProductsSection";

const useStyles = makeStyles(styles);

export default function ProductsIndex(props) {
  const classes = useStyles();
  return (
    <div>
      <Parallax filter image={require("assets/img/product-bg1.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Your Love Starts With Us</h1>
              <h4>
                “Happiness is to hold flowers in both hands.”
              </h4>
              <br />
              <Button
                color="danger"
                size="lg"
                href="https://www.youtube.com/watch?v=Pc0lvxMLmjs&ab_channel=%EC%89%90%EC%9D%B4%EB%93%9C%EA%B7%B8%EB%A6%B0shadegreen"
                target="_blank"
                rel="noopener noreferrer">
                <i className="fas fa-play" />
                Watch video
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <ProductSection/>
        </div>
      </div>
    </div>
  );
}
