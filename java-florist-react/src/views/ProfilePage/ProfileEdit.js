import React, { useEffect, useRef, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { isAuthenticated } from "actions/login.action";
import { useForm } from 'react-hook-form';
import { TextField } from "@material-ui/core";
import { create } from "actions/customer.action";
import axios from "axios";
import defaultImgSrc from "assets/img/userDefault.png";
import { update } from "actions/customer.action";

const useStyles = makeStyles(styles);


export default function ProfileEdit(props) {
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");
  const [image, setImage] = useState({});
  const [userList, setUserList] = useState([]);
  const [changeImage, setChangeImage] = useState(false);

  const editStatus = useSelector(state => state.customer.editStatus)
  const userProfile = useSelector(state => state.customer.userProfile);

  const formatDate = () => {
    let date = new Date(userProfile.birthday);
    date = date.getFullYear() + '/' + (date.getMonth()+1) + '/' +  date.getDate();
    return date
  }
  const initialImageValues = {
    imgSrc: userProfile.imgSrc,
    imgFile: null
  }

  useEffect(()=>{
    if (userProfile !== undefined || userProfile !== null) {
    setImage(initialImageValues)
    }
  },[userProfile])

  setTimeout(function () {
    setCardAnimation("");
  }, 100);
  const classes = useStyles();
  const { ...rest } = props;
  const editProfileDispatch = useDispatch();
  const history = useHistory()

  //let forAuth = 0

  const { register, handleSubmit, errors, watch } = useForm({
    defaultValues: { password: '' },
    validateCriteriaMode: 'all',
    mode: 'onChange',
  });

  useEffect(()=>{
    axios.get('http://localhost:5000/api/Users')
    .then(function (response) {
      console.log(response);
      setUserList(response.data)
    })
    .catch(function (error) {
      console.log(error);
    })
    console.log(userProfile);
  },[])

  const onSubmit = (data, e) => {
    e.preventDefault();
    let userExited = 0;
    userList.map((user)=>{
       if (data.email !== userProfile.email) {
        if (user.email === data.email) {
            userExited = userExited + 1;
          }
       }
    })
    if (userExited > 0) {
      alert("Email alredy Exited!!")
    }else{
        let newBirthday = new Date(data.birthday).toISOString()

      let userData = new FormData()
      userData.append('id', userProfile.id)
      userData.append('email', data.email)
      userData.append('password', userProfile.password)
      userData.append('username', data.username)
      userData.append('role', "customer")
      userData.append('address', data.address)
      userData.append('birthday',newBirthday)
      userData.append('name', data.fullname)
      userData.append('phonenumber', data.phone)
      // if (changeImage) {
      //   userData.append('imgName', image.imgName)
      //   userData.append('imgFile', image.imgFile)
      //   }
      userData.append('imgName', userProfile.imgName)
      userData.append('imgFile', userProfile.imgFile)
      userData.append('imgFile', userProfile.imgSrc)
      userData.append('active', 1)
      editProfileDispatch(update(userProfile.id,userData))
    }
  };
  useEffect(()=>{
    //console.log(forAuth);
    console.log(editStatus);
    if (editStatus === 204 || editStatus == 200) {
      //forAuth = forAuth + userList[userList.length - 1].id + 1
      alert("Your Account Has Been Updated!!");
      //loginDispatch(isAuthenticated(forAuth));
      history.push("/")
    }
    if (editStatus == 500 || editStatus == 404 || editStatus == 400 ) {
      alert("Cannot Create Account!!");
    }
  },[editStatus])

//   const password = useRef({});
//   password.current = watch('password', '');

//   const showPreview = e => {
//     console.log(e)
//     if (e.target.files && e.target.files[0] && changeImage) {
//       let imgFile = e.target.files[0];
//       const reader = new FileReader();
//       reader.onload = x => {
//         setImage({
//           ...image,
//           imgFile,
//           imgSrc: x.target.result
//         })
//       }
//       reader.readAsDataURL(imgFile)
//     }
//     else {
//       setImage({
//         ...image,
//         imgFile: null,
//         imgSrc: userProfile.imgSrc
//       })
//     console.log(image)
//   }
// }

  return (
    // <div>
    //   <Header
    //     absolute
    //     color="transparent"
    //     brand="Java Florist"
    //     rightLinks={<HeaderLinks />}
    //     {...rest}
    //   />
    //   <div
    //     className={classes.pageHeader}
    //     style={{
    //       backgroundImage: "url(" + backgroundImage + ")",
    //       backgroundSize: "cover",
    //       backgroundPosition: "top center"
    //     }}
    //   >
    //     <div className={classes.container}>
          
    //     </div>
    //     <Footer whiteFont />
    //   </div>
    // </div>
    <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Edit Profile</h4>
                  </CardHeader>
                  <CardBody>
                    <GridContainer justify="center">
                      <GridItem xs={6} sm={6} md={6}>
                        <TextField
                          label="Full Name..."
                          id="fullname"
                          margin="normal"
                          name="fullname"
                          defaultValue ={userProfile.name}
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
                          defaultValue ={userProfile.email}
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
                        {/* <TextField
                          label="Password"
                          margin="normal"
                          id="password"
                          name="password"
                          defaultValue = {userProfile.password}
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
                        /> */}
                        <TextField
                          label="Phone Number"
                          id="phone"
                          margin="normal"
                          name="phone"
                          defaultValue ={userProfile.phonenumber}
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
                      <GridItem xs={6} sm={6} md={6}>
                        <TextField
                          label="User Name..."
                          id="username"
                          margin="normal"
                          name="username"
                          defaultValue ={userProfile.username}
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
                          defaultValue ={userProfile.address}
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
                          defaultValue ={formatDate()}
                          fullWidth
                          //type="date"
                          InputLabelProps={{ shrink: true }}
                          inputRef={register({
                            required: 'Birthday is required',
                          })}
                          required
                          autoFocus
                          autoComplete="birthday"
                          error={errors.birthday}
                          helperText={errors.birthday && errors.birthday.message}
                        />
                        
                      </GridItem>
                    </GridContainer>
                    {/* <GridContainer justify="center">
                      <GridItem xs={12} sm={12} md={4} justify="center">
                        {image !== {} ? 
                        <>
                        <img src={image.imgSrc} className="card-img-top" alt="" style={{ width: "90px", marginLeft: "28%", marginTop: "15px" }} />
                        <input style={{marginTop: "15px"}} name="imgInput" type="file" accept="image/*" className="form-control-file" onChange={showPreview} onClick={()=>setChangeImage(true)}/>
                        </>
                        : null
                        }
                        
                      </GridItem>
                    </GridContainer> */}
                    {/* <GridContainer justify="center">
                      <GridItem xs={12} sm={12} md={4} justify="center">
                        
                      </GridItem>
                    </GridContainer> */}
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
  );
}
