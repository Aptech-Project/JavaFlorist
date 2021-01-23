import React, {useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

import avatar from "assets/img/faces/christian.jpg";
import { Avatar, Divider, Menu, MenuItem, Fade  } from "@material-ui/core";
import { Link, Route, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userlogout } from "actions/login.action";
import { loadprofile } from "actions/customer.action";
import axios from "axios";

const SET_USER_AUTHENTICATE = 'user_authenticated'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 5,
    alignContent: "center"
  },
  media: {
    width: "100%",
    height: 120,
  },
  dividerFullWidth: {
    margin: `5px 0 0 ${theme.spacing(2)}px`,
  },
  avatar:{
    width: 25,
    height: 25
  },
  
}));
const useTemStyles = makeStyles(styles);


export default function ProfileCard(props) {
  const {} = props;
  const classes = useStyles();
  const classesTem = useTemStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const expanded = Boolean(anchorEl);

  const logoutDispatch = useDispatch()
  const loadProfileDispatch = useDispatch()

  const handleExpandClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //const history = useHistory()

  const userProfile = useSelector(state => state.customer.userProfile)

  useEffect(()=>{
    let userAuth = parseInt(localStorage.getItem(SET_USER_AUTHENTICATE))
    axios.get(`http://localhost:5000/api/Users/${userAuth}`)
    .then(function (response) {
      console.log(response);
      loadProfileDispatch(loadprofile(response.data))
    })
    .catch(function (error) {
      console.log(error);
    })
  },[])
  useEffect(()=>{
    console.log(userProfile);
  },[userProfile])

  return (
    <>
    {userProfile !== null 
    ? 
    <>
      <Button
      ref={anchorEl}
      aria-controls="fade-menu"
      aria-haspopup="true"
      color="transparent"
      onClick={handleExpandClick}
      className={classesTem.navLink}
      >
        <Avatar alt="Remy Sharp" src={userProfile.imgSrc} className={classes.avatar}/>
      </Button>
      <Menu 
        elevation={0}
        className={classes.root}
        getContentAnchorEl={null}
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={expanded}
        onClose={handleClose}
        //TransitionComponent={Fade}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MenuItem>
          <CardMedia className={classes.media} image={userProfile.imgSrc} title="" />
        </MenuItem>
        <MenuItem className={classes.text}>Hello {userProfile.username}</MenuItem>
        <Divider light />
        <MenuItem to="/adminpage" component={Link} className={classes.navLink}>
          Management Page
          {/* <Link to="/adminpage" className={classes.navLink} style={{color: "black"}}>
                Management Page
              </Link>  */}
        </MenuItem>
        <Divider light />
        <MenuItem to="/profile" component={Link} className={classes.navLink}>
          Profile
          {/* <Link to="/profile" className={classes.navLink} style={{color: "black"}}>
                  Profile
              </Link> */}
        </MenuItem>
        <Divider light />
        <MenuItem to="/" component={Link} className={classes.navLink}>
          <div
            onClick={() => {
              logoutDispatch(userlogout());
            }}
          >
            Logout
          </div>
        </MenuItem>
      </Menu>
    </>
    :
    null  
    }
    
    </>
  );
}
