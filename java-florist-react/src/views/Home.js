import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
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
import SectionBasics from "./Components/Sections/SectionBasics.js";
import SectionNavbars from "./Components/Sections/SectionNavbars.js";
import SectionTabs from "./Components/Sections/SectionTabs.js";
import SectionPills from "./Components/Sections/SectionPills.js";
import SectionNotifications from "./Components/Sections/SectionNotifications.js";
import SectionTypography from "./Components/Sections/SectionTypography.js";
import SectionCarousel from "./Components/Sections/SectionCarousel.js";
import image from "assets/img/faces/avatar.jpg";
import styles from "assets/jss/material-kit-react/views/components.js";

const useStyles = makeStyles(styles);

export default function Home(props) {
  const classes = useStyles();
  const { ...rest } = props;
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
        <SectionTypography />
        <SectionCarousel />
        <SectionPills />
      </div>
      <Footer />
    </div>
  );
}
