import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import avatar from "assets/img/faces/christian.jpg";
import { Avatar, Divider } from '@material-ui/core';
import { Link, Route, Switch } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
      
    //maxWidth: 500,
  },
  media: {
    width: "100%",
    height: 120,
  },
  dividerFullWidth: {
    margin: `5px 0 0 ${theme.spacing(2)}px`,
  },
}));

export default function ProfileCard(props) {
  const {setIsAuthenticated} = props
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={avatar}
          title=""
        />
        <CardContent>
          <Typography >
            Hello Admin
          </Typography>
          <hr/>
          <Typography >
            <Link to="/adminpage" className={classes.navLink} style={{color: "black"}}>
              Management Page
            </Link> 
          </Typography>
          <hr/>
          <Typography >
            <Link to="/profile" className={classes.navLink} style={{color: "black"}}>
                Profile
            </Link>
          </Typography>
          <hr/>
          <Typography>
              <div onClick={()=>{setIsAuthenticated(false)}}>Logout</div>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
