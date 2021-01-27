import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Schedule from "@material-ui/icons/Schedule";
import List from "@material-ui/icons/List";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import NavPills from "components/NavPills/NavPills.js";

import styles from "assets/jss/material-kit-react/views/componentsSections/pillsStyle.js";
import { GridList, GridListTile } from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function SectionPillsHome(props) {
  const { products } = props;
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <div id="navigation-pills">
          <div className={classes.title}>
            <h2>What We Offer</h2>
          </div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6} lg={6}>
              <NavPills
                color="primary"
                tabs={[
                  {
                    tabButton: "Best Products",
                    tabIcon: Dashboard,
                    tabContent: (
                      <span>
                        <p>
                          Java Florist has created timeless florals for weddings & events since 1990.
                          Creatively led by the owner herself, Wadia Oneid.
                          At Java Florist, we strive to make your dream wedding come true!
                          Our creative & talented staff will ensure that your wedding decor defines your style & works within your budget to create a stunning floralscape for your big day!
                        </p>
                        <p>
                          As a full-service florist, our team can handle all your floral needs.
                          We offer a multitude of services including retail, residential, full-scale wedding and event planning.
                        </p>
                        <p>
                          Our corporate team oversees weekly flowers, plant maintenance holiday decor, galas and events.
                        </p>
                      </span>
                    )
                  },
                  {
                    tabButton: "Working Hours",
                    tabIcon: Schedule,
                    tabContent: (
                      <span>
                        <div className={classes.title}>
                          <h3>
                            <small>Mon-Fri: 9:00 AM – 9:00 PM<br></br>
                          Saturday & Sunday: 7:00 AM – 9:00 PM</small>
                          </h3>
                        </div>
                        <div>
                          The bouquet will be delivered within the five hour of the booking.
                          The working hour of the florist is morning 9 a.m  to evening 9 p.m.
                          If the booking order is within the five hours of working hour the bouquet will be delivered on the same day otherwise it will be delivered on the next day.
                        </div>
                      </span>
                    )
                  }
                ]}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={6} lg={6}>
              <div className={classes.root}>
                <GridList cellHeight={160} className={classes.gridList} cols={3}>
                  {products.map((product, index) => (
                    index < 10 &&
                    <GridListTile key={product.imgSrc} cols={[0, 6].includes(index) ? 2 : 1}>
                      <img src={product.imgSrc} />
                    </GridListTile>
                  ))}
                </GridList>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
