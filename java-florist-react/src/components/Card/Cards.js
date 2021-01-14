import React from "react";
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/views/components.js";
import CardFooter from "./CardFooter";

const useStyles = makeStyles(styles);

export default function Cards(props) {
  const {id, src, name, price, description} = props
  const classes = useStyles();
  return (
    <Card className="col-md-3">
      <img
        style={{height: "180px", width: "100%", display: "block", marginTop: "10px"}}
        className={classes.imgCardTop}
        src={src}
      />
      <CardBody key={id}>
        <h4 className={classes.productTitle}>{name}</h4>
        <p className={classes.subtitle}>{description}</p>
        <h5 className={classes.price}>Price: {price}</h5>
      </CardBody>
      <CardFooter>
        <Button style={{width: '40%'}} color="success">Buy now</Button>
        <Button style={{width: '55%', float:'right'}} color="warning">Add to Cart</Button>
      </CardFooter>
    </Card>
  );
}