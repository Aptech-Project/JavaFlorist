import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
// import Face from "@material-ui/icons/Face";
// import Chat from "@material-ui/icons/Chat";
// import Build from "@material-ui/icons/Build";
import { AddShoppingCart, Shop, Face, Chat, Build } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Parallax from "components/Parallax/Parallax.js";
import styles from "assets/jss/material-kit-react/views/landingPage.js";
import * as actions from 'actions/product.action'
import CustomTabs from 'components/CustomTabs/CustomTabs';
import ProductFeedback from './ProductFeedback'

const useStyles = makeStyles(styles);

const initialFieldValues = {
  name: '',
  price: '',
  description: '',
  imgSrc: '',
  imgFile: null
}

export default function ProductDetail(props) {
  let values = useSelector(state => state.product.product)
  const [product, setProduct] = useState(initialFieldValues)
  const [rating, setRating] = useState(null)
  const dispatch = useDispatch()
  const { id } = props.match.params;

  useEffect(() => {
    dispatch(actions.fetchById(id))
    values && setProduct(values)
  }, [values == null, values && (id != values.id)])

  const classes = useStyles();
  return (
    <div>
      <Parallax filter image={product.imgSrc}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12} style={{ paddingLeft: "5rem" }}>
              <h1 className={classes.title}>{product.name}</h1>
              <h3>
                Price: {product.price} $
              </h3>
              <h4>
                {product.description}
              </h4>
              <br />
              <Button
                color="success"
                size="lg"
                target="_blank"
                rel="noopener noreferrer">
                <i className="fab fa-amazon-pay" />
                Buy now
              </Button>
              &emsp;
              <Button
                color="warning"
                size="lg"
                target="_blank"
                rel="noopener noreferrer">
                <i className="fas fa-cart-plus" />
                Add to Cart
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <CustomTabs
            headerColor="primary"
            tabs={[
              {
                tabName: "Comments",
                tabIcon: Chat,
                tabContent: (
                  <ProductFeedback />
                )
              },
              // {
              //   tabName: "Settings",
              //   tabIcon: Build,
              //   tabContent: (
              //     <p className={classes.textCenter}>
              //       think that’s a responsibility that I have, to push
              //       possibilities, to show people, this is the level that
              //       things could be at. So when you get something that has
              //       the name Kanye West on it, it’s supposed to be pushing
              //       the furthest possibilities. I will be the leader of a
              //       company that ends up being worth billions of dollars,
              //       because I got the answers. I understand culture. I am
              //       the nucleus.
              //     </p>
              //   )
              // }
            ]}
          />
        </div>
      </div>
    </div>
  );
}
