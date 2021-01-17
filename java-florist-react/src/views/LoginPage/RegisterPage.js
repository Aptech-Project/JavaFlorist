import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import BusinessIcon from '@material-ui/icons/Business';
import CakeIcon from '@material-ui/icons/Cake';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/login-register.jpg";
import { Link } from "react-router-dom";

const useStyles = makeStyles(styles);

export default function RegisterPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 100);
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="Java Florist"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Register</h4>
                  </CardHeader>
                  <Link to="/login" className={classes.navLink}>
                    <p className={classes.divider} style={{cursor: "pointer"}}>Have an Account?</p>
                  </Link>
                  <CardBody>
                      <GridContainer justify="center">
                          <GridItem xs={6} sm={6} md={6}>
                            <CustomInput
                            labelText="Full Name..."
                            id="first"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                type: "text",
                                endAdornment: (
                                <InputAdornment position="end">
                                    <People className={classes.inputIconsColor} />
                                </InputAdornment>
                                )
                            }}
                            />
                            <CustomInput
                            labelText="Email..."
                            id="email"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                type: "email",
                                endAdornment: (
                                <InputAdornment position="end">
                                    <Email className={classes.inputIconsColor} />
                                </InputAdornment>
                                )
                            }}
                            />
                            <CustomInput
                            labelText="Password"
                            id="pass"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                type: "password",
                                endAdornment: (
                                <InputAdornment position="end">
                                    <Icon className={classes.inputIconsColor}>
                                    lock_outline
                                    </Icon>
                                </InputAdornment>
                                ),
                                autoComplete: "off"
                            }}
                            />
                            <CustomInput
                            labelText="Confirm Password"
                            id="pass"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                type: "password",
                                endAdornment: (
                                <InputAdornment position="end">
                                    <Icon className={classes.inputIconsColor}>
                                    lock_outline
                                    </Icon>
                                </InputAdornment>
                                ),
                                autoComplete: "off"
                            }}
                            />
                          </GridItem>
                          <GridItem xs={6} sm={6} md={6}>
                            <CustomInput
                            labelText="User Name..."
                            id="user"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                type: "text",
                                endAdornment: (
                                <InputAdornment position="end">
                                    <People className={classes.inputIconsColor} />
                                </InputAdornment>
                                )
                            }}
                            />
                            <CustomInput
                            labelText="Address..."
                            id="address"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                type: "text",
                                endAdornment: (
                                <InputAdornment position="end">
                                    <BusinessIcon className={classes.inputIconsColor} />
                                </InputAdornment>
                                )
                            }}
                            />
                            <CustomInput
                            labelText=""
                            id="birthday"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                type: "date",
                                endAdornment: (
                                <InputAdornment position="end">
                                    <CakeIcon className={classes.inputIconsColor} />
                                </InputAdornment>
                                ),
                                autoComplete: "off"
                            }}
                            />
                            <CustomInput
                            labelText="Phone Number"
                            id="phone"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                type: "text",
                                endAdornment: (
                                <InputAdornment position="end">
                                    <PhoneIphoneIcon className={classes.inputIconsColor}/>
                                </InputAdornment>
                                ),
                                autoComplete: "off"
                            }}
                            />
                          </GridItem>
                      </GridContainer>
                      <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={6}>
                            <CustomInput
                                labelText="Avatar"
                                id="ava"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    type: "file",
                                    endAdornment: (
                                    <InputAdornment position="end">
                                        <AccountBoxIcon className={classes.inputIconsColor}/>
                                    </InputAdornment>
                                    ),
                                    autoComplete: "off"
                                }}
                            />
                          </GridItem>
                      </GridContainer>
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button simple color="primary" size="lg">
                    Get Started
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}
