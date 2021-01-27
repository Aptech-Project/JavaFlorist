import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
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
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isAuthenticated } from "actions/login.action";
import { useForm } from 'react-hook-form';
import { TextField } from "@material-ui/core";
import { login } from "actions/customer.action";
import axios from "axios";

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 100);
  const classes = useStyles();
  const { ...rest } = props;
  const loginDispatch = useDispatch();
  const history = useHistory()

  const [userList, setUserList] = useState([]);

  const { register, handleSubmit, errors } = useForm({
    //mode: 'onChange',
  });
  useEffect(() => {
    axios.get('http://localhost:5000/api/Users')
      .then(function (response) {
        //console.log(response);
        setUserList(response.data)
      })
      .catch(function (error) {
        // console.log(error);
      })
  }, [])
  const onSubmit = (data, e) => {
    e.preventDefault();
    // console.log(data);
    let userExited = 0;
    let userExitedid = "";
    userList.map((user) => {
      if (user.email === data.email && user.password === data.pass) {
        userExited = userExited + 1;
        userExitedid = user.id
      }
    })
    // console.log(userExited);
    if (userExited > 0) {
      alert("Login Success!!")
      loginDispatch(isAuthenticated(userExitedid));
      history.push('/')
    } else {
      alert("Login Faill!! Check your Email and Password")
    }
  };

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
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Login</h4>
                    {/* <div className={classes.socialLine}>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}
                      >
                        <i className={"fab fa-twitter"} />
                      </Button>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}
                      >
                        <i className={"fab fa-facebook"} />
                      </Button>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}
                      >
                        <i className={"fab fa-google-plus-g"} />
                      </Button>
                    </div> */}
                  </CardHeader>
                  <Link to="/register" className={classes.navLink}>
                    <p className={classes.divider} style={{ cursor: "pointer" }}>Don't have an Account?</p>
                  </Link>
                  <CardBody>
                    <TextField
                      label="Email..."
                      margin="normal"
                      id="email"
                      name="email"
                      fullWidth
                      //type= "text"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                      inputRef={register({
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address',
                        },
                      })}
                      required
                      autoFocus
                      autoComplete="email"
                      error={errors.email}
                      helperText={errors.email && errors.email.message}
                    />
                    <TextField
                      label="Password"
                      margin="normal"
                      id="pass"
                      name="pass"
                      fullWidth
                      InputProps={{
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
                      inputRef={register({
                        required: 'Password is required',
                        minLength: {
                          value: 8,
                          message: 'Min length is 8',
                        },
                      })}
                      required
                      autoComplete="pass"
                      error={errors.pass}
                      helperText={errors.pass && errors.pass.message}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button
                      simple
                      color="primary"
                      //size="lg" 
                      type="submit"
                      //disabled={!formState.isValid}
                      variant="contained"
                    >
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
