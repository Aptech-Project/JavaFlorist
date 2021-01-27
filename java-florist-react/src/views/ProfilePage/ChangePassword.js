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
import { backStatusCode } from "actions/customer.action";

const useStyles = makeStyles(styles);

export default function ChangePass(props) {
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");
  const [image, setImage] = useState({});
  const [userList, setUserList] = useState([]);
  const [changeImage, setChangeImage] = useState(false);

  const editStatus = useSelector(state => state.customer.editInfoStatus)
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
  const statusCode = useDispatch();

  //let forAuth = 0

  const { register, handleSubmit, errors, watch } = useForm({
    defaultValues: { password: '' },
    validateCriteriaMode: 'all',
    mode: 'onChange',
  });

  useEffect(()=>{
    axios.get('http://localhost:5000/api/Users')
    .then(function (response) {
      setUserList(response.data)
    })
    .catch(function (error) {
      console.log(error);
    })
  },[])

  const onSubmit = (data, e) => {
    e.preventDefault();
    let checkPass = 0;
    console.log(data);
    userList.map((user)=>{
       if (user.email !== userProfile.email) {
        if (data.oldPassword !== user.password) {
            checkPass = checkPass + 1;
          }
       }
    })
    if (checkPass > 0) {
      alert("Wrong Old Password!!")
    }else{
      let userData = new FormData()
      userData.append('id', userProfile.id)
      userData.append('email', userProfile.email)
      userData.append('password', data.password)
      userData.append('username', userProfile.username)
      userData.append('role', userProfile.role)
      userData.append('address', userProfile.address)
      userData.append('birthday',userProfile.birthday)
      userData.append('name', userProfile.name)
      userData.append('phonenumber', userProfile.phonenumber)
      // if (changeImage) {
      //   userData.append('imgName', image.imgName)
      //   userData.append('imgFile', image.imgFile)
      //   }
      userData.append('imgName', userProfile.imgName)
      userData.append('imgFile', userProfile.imgFile)
      userData.append('imgFile', userProfile.imgSrc)
      userData.append('active', 1)
      console.log(userData);
      editProfileDispatch(update(userProfile.id,userData))
    }
  };
  useEffect(()=>{
    //console.log(forAuth);
    console.log(editStatus);
    if (editStatus === 204 || editStatus == 200) {
      //forAuth = forAuth + userList[userList.length - 1].id + 1
      alert("Your Password Has Been Changed!!");
      //loginDispatch(isAuthenticated(forAuth));
      statusCode(backStatusCode())
      history.push("/")
    }
    if (editStatus == 500 || editStatus == 404 || editStatus == 400 ) {
      alert("Cannot Create Account!!");
    }
  },[editStatus])

  const password = useRef({});
  password.current = watch('password', '');

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
    <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Change Password</h4>
                  </CardHeader>
                  <CardBody>
                    <GridContainer justify="center">
                      <GridItem xs={12} sm={12} md={10}>
                      <TextField
                          label="Old Password"
                          margin="normal"
                          id="oldPassword"
                          name="oldPassword"
                          fullWidth
                          autoFocus
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
                          label="New Password"
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
                          autoComplete="off"
                          error={errors.password}
                          helperText={errors.password && errors.password.message}
                        />
                        <TextField
                          label="Confirm New Password"
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
                          autoComplete="off"
                          error={errors.confirmPassword}
                          helperText={errors.confirmPassword && errors.confirmPassword.message}
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
