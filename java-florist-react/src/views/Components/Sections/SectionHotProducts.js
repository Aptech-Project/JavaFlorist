import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Small from "components/Typography/Small.js";
import Danger from "components/Typography/Danger.js";
import Warning from "components/Typography/Warning.js";
import Success from "components/Typography/Success.js";
import Info from "components/Typography/Info.js";
import Primary from "components/Typography/Primary.js";
import Muted from "components/Typography/Muted.js";
import Quote from "components/Typography/Quote.js";

import image from "assets/img/faces/avatar.jpg";

import styles from "assets/jss/material-kit-react/views/componentsSections/typographyStyle.js";
import { Link } from "react-router-dom";

const useStyles = makeStyles(styles);

export default function SectionHotProduct(props) {
  const { products } = props;
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <div />
        <div id="images">
          <div className={classes.title}>
            <h2>Newest Products</h2>
          </div>
          <br />
          <GridContainer>
            {products.reverse().map((product, index) => (
              index <= 3 &&
              <GridItem xs={12} sm={3} className={classes.marginLeft}>
                <h4
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                ><Link to={{ pathname: `/products/${product.id}`, product: { product } }} style={{ color: 'black', fontSize: '20px' }}>{product.name}</Link></h4>
                <img
                  src={product.imgSrc}
                  className={classes.imgRoundedCircle + " " + classes.imgFluid}
                />
              </GridItem>
            ))}
          </GridContainer>
        </div>
        <div className={classes.space50} />
      </div>
    </div>
  );
}
