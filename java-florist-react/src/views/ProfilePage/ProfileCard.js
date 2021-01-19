import React, {useState} from "react";
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
import { Link, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isAuthenticated } from "actions/login.action";

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

  const loginDispatch = useDispatch()

  const handleExpandClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
    <Button
    ref={anchorEl}
    aria-controls="fade-menu"
    aria-haspopup="true"
    color="transparent"
    onClick={handleExpandClick}
    className={classesTem.navLink}
    >
      <Avatar alt="Remy Sharp" src={avatar} className={classes.avatar}/>
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
        <CardMedia className={classes.media} image={avatar} title="" />
      </MenuItem>
      <MenuItem className={classes.text}>Hello Admin</MenuItem>
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
      <MenuItem>
        <div
          onClick={() => {
            const action = isAuthenticated(false);
            loginDispatch(action);
          }}
        >
          Logout
        </div>
      </MenuItem>
    </Menu>
    </>
  );
}
