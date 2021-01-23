import React, { useRef } from "react";
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
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import backgroundImage from "assets/img/login-register.jpg";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isAuthenticated } from "actions/login.action";
import { useForm } from 'react-hook-form';
import { TextField } from "@material-ui/core";
import { create } from "actions/customer.action";
import axios from "axios";
import defaultImgSrc from "assets/img/userDefault.png";

const useStyles = makeStyles(styles);
const initialImageValues = {
  imgSrc: defaultImgSrc,
  imgFile: null
}

export default function RegisterPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [image, setImage] = React.useState(initialImageValues)

  setTimeout(function () {
    setCardAnimation("");
  }, 100);
  const classes = useStyles();
  const { ...rest } = props;
  const loginDispatch = useDispatch();
  const registerDispatch = useDispatch();
  const history = useHistory()

  const { register, handleSubmit, errors, watch } = useForm({
    defaultValues: { password: '' },
    validateCriteriaMode: 'all',
    mode: 'onChange',
  });
  const onSubmit = (data, e) => {
    e.preventDefault();
    let userData = new FormData()
    userData.append('email', data.email)
    userData.append('password', data.password)
    userData.append('username', data.username)
    userData.append('role', "user")
    userData.append('address', data.address)
    userData.append('birthday', data.birthday)
    userData.append('name', data.name)
    userData.append('phonenumber', data.phone)
    userData.append('imgName', image.imgName)
    userData.append('imgFile', image.imgFile)
    userData.append('active', 1)
    // const userData = {
    //   Email: data.email,
    //   Password: data.password,
    //   Username: data.username,
    //   Role: "Member",
    //   Address: data.address,
    //   Birthday: data.birthday,
    //   Name: data.fullname,
    //   PhoneNumber: data.phone,
    //   ImgName: data.avatar[0].name,
    //   Active: 1
    // }
    console.log(userData);
    registerDispatch(create(userData))
    //loginDispatch(isAuthenticated(true));
    //history.push('/')
  };
  const password = useRef({});
  password.current = watch('password', '');

  const showPreview = e => {
    console.log(e)
    if (e.target.files && e.target.files[0]) {
      let imgFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = x => {
        setImage({
          ...image,
          imgFile,
          imgSrc: x.target.result
        })
      }
      reader.readAsDataURL(imgFile)
    }
    else {
      setImage({
        ...image,
        imgFile: null,
        imgSrc: defaultImgSrc
      })
    }
    console.log(image)
  }

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
          backgroundImage: "url(" + backgroundImage + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Register</h4>
                  </CardHeader>
                  <Link to="/login" className={classes.navLink}>
                    <p className={classes.divider} style={{ cursor: "pointer" }}>Have an Account?</p>
                  </Link>
                  <CardBody>
                    <GridContainer justify="center">
                      <GridItem xs={6} sm={6} md={6}>
                        <TextField
                          label="Full Name..."
                          id="fullname"
                          margin="normal"
                          name="fullname"
                          fullWidth
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='end'>
                                <People className={classes.inputIconsColor} />
                              </InputAdornment>
                            ),
                          }}
                          inputRef={register({
                            required: 'Full Name is required',
                          })}
                          required
                          autoFocus
                          autoComplete="fullname"
                          error={errors.fullname}
                          helperText={errors.fullname && errors.fullname.message}
                        />
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
                                <Email className={classes.inputIconsColor} />
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
                          autoComplete="email"
                          error={errors.email}
                          helperText={errors.email && errors.email.message}
                        />
                        <TextField
                          label="Password"
                          margin="normal"
                          id="password"
                          name="password"
                          fullWidth
                          //type= "text"
                          InputProps={{
                            type: "password",
                            endAdornment: (
                              <InputAdornment position="end">
                                <Icon className={classes.inputIconsColor}>
                                  lock_outline
                                </Icon>
                              </InputAdornment>
                            ),
                          }}
                          inputRef={register({
                            required: 'You must specify a password',
                            minLength: {
                              value: 8,
                              message: 'Min length is 8',
                            },
                          })}
                          required
                          autoFocus
                          autoComplete="off"
                          error={errors.password}
                          helperText={errors.password && errors.password.message}
                        />
                        <TextField
                          label="Confirm Password"
                          margin="normal"
                          id="confirmPassword"
                          name="confirmPassword"
                          fullWidth
                          //type= "text"
                          InputProps={{
                            type: "password",
                            endAdornment: (
                              <InputAdornment position="end">
                                <Icon className={classes.inputIconsColor}>
                                  lock_outline
                                  </Icon>
                              </InputAdornment>
                            ),
                          }}
                          inputRef={register({
                            required: 'You must specify a password',
                            validate: value =>
                              value === password.current || 'The passwords do not match',
                          })}
                          required
                          autoFocus
                          autoComplete="off"
                          error={errors.confirmPassword}
                          helperText={errors.confirmPassword && errors.confirmPassword.message}
                        />
                      </GridItem>
                      <GridItem xs={6} sm={6} md={6}>
                        <TextField
                          label="User Name..."
                          id="username"
                          margin="normal"
                          name="username"
                          fullWidth
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='end'>
                                <People className={classes.inputIconsColor} />
                              </InputAdornment>
                            ),
                          }}
                          inputRef={register({
                            required: 'User Name is required',
                            maxLength: {
                              value: 20,
                              message: 'Max length is 20',
                            },
                            // pattern: {
                            //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            //   message: 'Invalid email address',
                            // },
                          })}
                          required
                          autoFocus
                          autoComplete="username"
                          error={errors.username}
                          helperText={errors.username && errors.username.message}
                        />
                        <TextField
                          label="Address..."
                          id="address"
                          margin="normal"
                          name="address"
                          fullWidth
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='end'>
                                <BusinessIcon className={classes.inputIconsColor} />
                              </InputAdornment>
                            ),
                          }}
                          inputRef={register({
                            required: 'Address is required',
                            // pattern: {
                            //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            //   message: 'Invalid email address',
                            // },
                          })}
                          required
                          autoFocus
                          autoComplete="address"
                          error={errors.address}
                          helperText={errors.address && errors.address.message}
                        />
                        <TextField
                          label="Birthday..."
                          id="birthday"
                          margin="normal"
                          name="birthday"
                          fullWidth
                          type="date"
                          InputLabelProps={{ shrink: true }}
                          // InputProps={{
                          //   endAdornment: (
                          //     <InputAdornment position='end'>
                          //       <CakeIcon className={classes.inputIconsColor} />
                          //     </InputAdornment>
                          //   ),
                          // }}
                          inputRef={register({
                            required: 'Birthday is required',
                            // pattern: {
                            //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            //   message: 'Invalid email address',
                            // },
                          })}
                          required
                          autoFocus
                          autoComplete="birthday"
                          error={errors.birthday}
                          helperText={errors.birthday && errors.birthday.message}
                        />
                        <TextField
                          label="Phone Number"
                          id="phone"
                          margin="normal"
                          name="phone"
                          fullWidth
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='end'>
                                <PhoneIphoneIcon className={classes.inputIconsColor} />
                              </InputAdornment>
                            ),
                          }}
                          inputRef={register({
                            required: 'Phone Number is required',
                            maxLength: {
                              value: 13,
                              message: 'The Phone Number do not exceed 13 numbers',
                            },
                            minLength: {
                              value: 10,
                              message: 'The Phone Number must have at least 10 number',
                            },
                          })}
                          required
                          autoFocus
                          autoComplete="phone"
                          error={errors.phone}
                          helperText={errors.phone && errors.phone.message}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer justify="center">
                      <GridItem xs={12} sm={12} md={6} justify="center">
                        {/* <TextField
                          //label="Address..."
                          id="avatar"
                          margin="normal"
                          name="avatar"
                          onChange={showPreview}
                          InputProps={{
                            type: "file",
                            endAdornment: (
                              <InputAdornment position='end'>
                                <AccountBoxIcon className={classes.inputIconsColor} />
                              </InputAdornment>
                            ),
                          }}
                          inputRef={register({
                            required: 'You need to provide your Avatar',
                            pattern: {
                              value: /^.*\.(jpg|JPG|gif|GIF|png)$/i,
                              message: 'Invalid file type',
                            },
                          })}
                          required
                          autoFocus
                          autoComplete="avatar"
                          error={errors.avatar}
                          helperText={errors.avatar && errors.avatar.message}
                        /> */}
                        <img src={image.imgSrc} className="card-img-top" alt="" style={{ width: "100px" }} />
                        <label>Choose image</label><br></br>
                        <input type="file" accept="image/*" className="form-control-file" onChange={showPreview} />
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button simple
                      color="primary"
                      size="lg"
                      type="submit"
                      //disabled={!formState.isValid}
                      variant="contained">
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
