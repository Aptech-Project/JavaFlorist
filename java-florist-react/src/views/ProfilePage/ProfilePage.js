import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
import Favorite from "@material-ui/icons/Favorite";
import BusinessIcon from '@material-ui/icons/Business';
import CakeIcon from '@material-ui/icons/Cake';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import EditIcon from '@material-ui/icons/Edit';
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import NavPills from "components/NavPills/NavPills.js";
import Parallax from "components/Parallax/Parallax.js";

import profile from "assets/img/faces/christian.jpg";

import studio1 from "assets/img/examples/studio-1.jpg";
import studio2 from "assets/img/examples/studio-2.jpg";
import studio3 from "assets/img/examples/studio-3.jpg";
import studio4 from "assets/img/examples/studio-4.jpg";
import studio5 from "assets/img/examples/studio-5.jpg";
import work1 from "assets/img/examples/olu-eletu.jpg";
import work2 from "assets/img/examples/clem-onojeghuo.jpg";
import work3 from "assets/img/examples/cynthia-del-rio.jpg";
import work4 from "assets/img/examples/mariya-georgieva.jpg";
import work5 from "assets/img/examples/clem-onojegaw.jpg";

import styles from "assets/jss/material-kit-react/views/profilePage.js";
import { useSelector } from "react-redux";
import { List, ListItem, ListItemIcon, ListItemText, Tooltip } from "@material-ui/core";
import { Email, People } from "@material-ui/icons";
import { date } from "yup";
import { Link } from "react-router-dom";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import ProfileEdit from "./ProfileEdit";

const useStyles = makeStyles(styles);
const useCusStyle = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width:"100%"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    //border: '2px solid #000',
    boxShadow: theme.shadows[5],
    //padding: theme.spacing(12, 8, 9),
  },
}));

export default function ProfilePage(props) {
  const classes = useStyles();
  const cusClasses = useCusStyle();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);

  const userProfile = useSelector(state => state.customer.userProfile);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formatDate = () => {
    let date = new Date(userProfile.birthday);
    date = date.getDate() + ' - ' + (date.getMonth()+1) + ' - ' + date.getFullYear();
    return date
  }

  return (
    <div>
      <Header
        color="transparent"
        brand="Java Florist"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 500,
          color: "white"
        }}
        {...rest}
      />
      {
        userProfile !== null 
        ?
        <>
        <Parallax small filter image={require("assets/img/shop-bg1.jpg")} />
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div>
            <div className={classes.container}>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={6}>
                  <div className={classes.profile}>
                    <div>
                      <img src={userProfile.imgSrc} alt="..." className={imageClasses}/>
                    </div>
                    <div className={classes.name}>
                      <h3 className={classes.title}>{userProfile.username}</h3>
                      {/* <Button justIcon link className={classes.margin5}>
                        <i className={"fab fa-twitter"} />
                      </Button>
                      <Button justIcon link className={classes.margin5}>
                        <i className={"fab fa-instagram"} />
                      </Button>
                      <Button justIcon link className={classes.margin5}>
                        <i className={"fab fa-facebook"} />
                      </Button> */}
                        {/* <Link onClick={handleOpen} className={classes.description}> */}
                        {/* <div type="button" onClick={handleOpen} className={classes.description}> */}
                        {/* </div> */}
                        {/* </Link> */}
                    </div>
                  </div>
                </GridItem>
              </GridContainer>
              <div className={classes.description}>
              <h4 style={{marginLeft:"5%"}} className={classes.title}>My Infomation</h4> &nbsp; 
              <Tooltip title="Edit Profile">
                <Link onClick={handleOpen} className={classes.description}>
                {/* <div type="button" onClick={handleOpen} className={classes.description}> */}
                  <EditIcon fontSize="small"/>
                {/* </div> */}
                </Link>
              </Tooltip>
                <Modal
                className={cusClasses.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                // BackdropComponent={Backdrop}
                // BackdropProps={{
                //   timeout: 500,
                // }}
              >
                <Fade in={open}>
                  <ProfileEdit/>
                </Fade>
              </Modal>
                <GridContainer style={{marginLeft: '8%'}}>
                  <GridItem xs={12} sm={12} md={6}>
                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <People />
                        </ListItemIcon>
                        <ListItemText primary={userProfile.name}/>
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CakeIcon />
                        </ListItemIcon>
                        <ListItemText>{formatDate()}</ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <BusinessIcon />
                        </ListItemIcon>
                        <ListItemText primary={userProfile.address} />
                      </ListItem>
                    </List>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <Email />
                        </ListItemIcon>
                        <ListItemText primary={userProfile.email} />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <PhoneIphoneIcon />
                        </ListItemIcon>
                        <ListItemText primary={userProfile.phonenumber} />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <EditIcon fontSize="small"/>
                        </ListItemIcon>
                        <ListItemText primary="Change Password" />
                      </ListItem>
                    </List>
                  </GridItem>
                </GridContainer>
              </div>
              {/* <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                  <NavPills
                    alignCenter
                    color="primary"
                    tabs={[
                      {
                        tabButton: "Studio",
                        tabIcon: Camera,
                        tabContent: (
                          <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={4}>
                              <img
                                alt="..."
                                src={studio1}
                                className={navImageClasses}
                              />
                              <img
                                alt="..."
                                src={studio2}
                                className={navImageClasses}
                              />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                              <img
                                alt="..."
                                src={studio5}
                                className={navImageClasses}
                              />
                              <img
                                alt="..."
                                src={studio4}
                                className={navImageClasses}
                              />
                            </GridItem>
                          </GridContainer>
                        )
                      },
                      {
                        tabButton: "Work",
                        tabIcon: Palette,
                        tabContent: (
                          <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={4}>
                              <img
                                alt="..."
                                src={work1}
                                className={navImageClasses}
                              />
                              <img
                                alt="..."
                                src={work2}
                                className={navImageClasses}
                              />
                              <img
                                alt="..."
                                src={work3}
                                className={navImageClasses}
                              />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                              <img
                                alt="..."
                                src={work4}
                                className={navImageClasses}
                              />
                              <img
                                alt="..."
                                src={work5}
                                className={navImageClasses}
                              />
                            </GridItem>
                          </GridContainer>
                        )
                      },
                      {
                        tabButton: "Favorite",
                        tabIcon: Favorite,
                        tabContent: (
                          <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={4}>
                              <img
                                alt="..."
                                src={work4}
                                className={navImageClasses}
                              />
                              <img
                                alt="..."
                                src={studio3}
                                className={navImageClasses}
                              />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                              <img
                                alt="..."
                                src={work2}
                                className={navImageClasses}
                              />
                              <img
                                alt="..."
                                src={work1}
                                className={navImageClasses}
                              />
                              <img
                                alt="..."
                                src={studio1}
                                className={navImageClasses}
                              />
                            </GridItem>
                          </GridContainer>
                        )
                      }
                    ]}
                  />
                </GridItem>
              </GridContainer> */}
            </div>
          </div>
        </div> 
        <Footer />
        </>
        :
        null
      }
      
    </div>
  );
}
