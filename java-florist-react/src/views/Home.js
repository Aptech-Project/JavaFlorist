import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Parallax from "components/Parallax/Parallax.js";
// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.js";
import SectionPillsHome from "./Components/Sections/SectionPillsHome.js";
import styles from "assets/jss/material-kit-react/views/components.js";
import SectionHotProduct from "./Components/Sections/SectionHotProducts.js";
import * as actions from 'actions/product.action'
import SectionCarouselHome from "./Components/Sections/SectionCarouselHome.js";
import {
  GetCart,
} from '../actions/cart.action';
const useStyles = makeStyles(styles);

export default function Home(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const dispatch = useDispatch()
  const userAuth = useSelector(state => state.login.userAuth)
  let products = useSelector(state => state.product.list);//get from root reducer
  useEffect(() => {
    dispatch(actions.fetchAll())
    dispatch(GetCart(userAuth))
  }, [!products]); //second parameter use to inform useEffect run when this parameter changes
  return (
    <div>
      <Header
        brand="Java Florist"
        rightLinks={<HeaderLinks />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 400,
          color: "primary"
        }}
        {...rest}
      />
      <Parallax image={require("assets/img/shop-bg2.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title}>Java Florist</h1>
                <h3 className={classes.subtitle}>
                  “We don’t ask a flower any special reason for its existence. We just look at it and are able to accept it as being something different for ourselves.”
                </h3>
                <p style={{ paddingLeft: '300px' }}>Gwendolyn Brooks</p>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <div className={classNames(classes.main, classes.mainRaised)}>
        <SectionPillsHome products={products} />
        <SectionHotProduct products={products} />
        <SectionCarouselHome />
        <div className={classes.textCenter + " " + classes.sharingArea}>
          <GridContainer justify="center">
            <h3>Thank you for supporting us!</h3>
          </GridContainer>
          <Button color="twitter">
            <i className={classes.socials + " fab fa-twitter"} /> Tweet
          </Button>
          <Button color="facebook">
            <i className={classes.socials + " fab fa-facebook-square"} /> Share
          </Button>
          <Button color="google">
            <i className={classes.socials + " fab fa-google-plus-g"} />
            Share
          </Button>
          <Button color="github">
            <i className={classes.socials + " fab fa-github"} /> Star
          </Button>
        </div>
        <br /><br /><br />
      </div>
      <Footer />
    </div>
  );
}
