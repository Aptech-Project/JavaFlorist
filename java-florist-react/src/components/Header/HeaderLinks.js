/*eslint-disable*/
import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, CloudDownload, AccountBox, LocalFlorist, Home, Info } from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
import LinkMet from "@material-ui/core/Link";
import ProfileCard from "views/ProfilePage/ProfileCard";
import avatar from "assets/img/faces/christian.jpg";
import { useSelector } from "react-redux";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  const isAuthenticated = useSelector(state => state.login.isAuthenticated)

  return (
    <List className={classes.list}>
      {/* <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="Components"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={Apps}
          dropdownList={[
            <Link to="/" className={classes.dropdownLink}>
              All components
            </Link>,
            <a
              href="https://creativetimofficial.github.io/material-kit-react/#/documentation?ref=mkr-navbar"
              target="_blank"
              className={classes.dropdownLink}
            >
              Documentation
            </a>
          ]}
        />
      </ListItem> */}
      <ListItem className={classes.listItem}>
        <Link to="/" className={classes.navLink}>
          <Home className={classes.icons} /> Home
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Link to="/products" className={classes.navLink}>
          <LocalFlorist className={classes.icons} />Product
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Link to="/about" className={classes.navLink}>
          <Info className={classes.icons} />About Us
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="cart"
          title="Your cart"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}>
          <Button
            color="transparent"
            href=""
            target="_blank"
            className={classes.navLink}>
            <i className={classes.socialIcons + " fas fa-shopping-cart"} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="login-profile"
          title="Login To Order"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}>
            {
              isAuthenticated ?
                <ProfileCard/>
              :
                <Link to="/login" className={classes.navLink}>
                  <i className={classes.socialIcons + " fas fa-user-circle"} />
                </Link>  
            }
          
        </Tooltip>
      </ListItem>
      
    </List>
  );
}
