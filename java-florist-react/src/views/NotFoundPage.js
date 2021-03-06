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
import SectionJavascript from "./Components/Sections/SectionJavascript.js";
import SectionCarousel from "./Components/Sections/SectionCarousel.js";
import SectionCompletedExamples from "./Components/Sections/SectionCompletedExamples.js";
import SectionLogin from "./Components/Sections/SectionLogin.js";
import SectionExamples from "./Components/Sections/SectionExamples.js";
import SectionDownload from "./Components/Sections/SectionDownload.js";

import styles from "assets/jss/material-kit-react/views/components.js";

const useStyles = makeStyles(styles);

export default function NotFoundPage(props) {
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
                <h1 className={classes.title}>404 Page Not Found</h1>
                <h2 className={classes.subtitle}>
                  Look like you entered a wrong path, please try again!
                </h2>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <Footer />
    </div>
  );
}
