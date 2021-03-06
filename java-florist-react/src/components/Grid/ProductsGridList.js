import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import { AddShoppingCart, FavoriteBorder, Shop } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import Pagination from 'components/Pagination/Pagination';
import { productPagination } from 'shared/productFunction.shared';
import { AddCart } from '../../actions/cart.action';
import { Button, Tooltip } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    transition: 'all .3s ease-in-out 0s',
    // width: 500,
    // height: 450, //scrollbar appear
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
    "&:hover,&:focus": {
      color: "inherit",
      background: "rgba(200, 200, 200, 0.2)"
    },
  },
  image: {
    "&:hover": {
    }
  },
  smooth: {
    transition: 'all .3s ease-in-out 0s',
  },
  tileBar: {
    "&:hover": {
      transition: 'all .3s ease-in-out 0s',
      background: "rgb(166, 12, 71, 0.6)",
    }
  },
}));



export default function ProductsGridList(props) {

  let activeIndex = useSelector(state => state.product.activeIndex) || 1;
  const classes = useStyles();
  let { products, indexCount } = productPagination(props.products.filter(product => product?.categoryActive == product?.active == 1), activeIndex, 9)
  const dispatch = useDispatch();
  const userAuth = localStorage.getItem("user_authenticated");

  return (
    <div>
      <div className={classes.root + "row"}>
        <GridList cellHeight={240} className={classes.gridList}>
          {products.map((product) => (
            <GridListTile key={product.id} className={classes.smooth + "col-xs-8 col-sm-6 col-md-4"}>
              <img src={product.imgSrc} alt={product.name} className={classes.image} />
              <GridListTileBar
                className={classes.tileBar}
                style={{ textAlign: 'left' }}
                title={<Link to={{ pathname: `/products/${product.id}`, product: { product } }} style={{ color: 'white', width: '70%' }}>{product.name}</Link>}
                subtitle={<span>Price: {product.price} $</span>}
                actionIcon={
                  <div style={{ minWidth: '50px' }}>
                    {/* <Tooltip
                      title="Buy now"
                      placement={window.innerWidth > 959 ? "top" : "left"}>
                      <IconButton className={classes.icon} onClick={() => { console.log("Buy now clicked") }}>
                        <Shop />
                      </IconButton>
                    </Tooltip> */}
                    <Tooltip
                      title="Add to cart"
                      placement={window.innerWidth > 959 ? "top" : "left"}>
                      <IconButton className={classes.icon} onClick={() => dispatch(AddCart(userAuth, product))}>
                        <AddShoppingCart />
                      </IconButton>
                    </Tooltip>
                  </div>
                }
              />
            </GridListTile>
          ))}
        </GridList>
        <br /><br />
        {products.length > 0 &&
          <Pagination
            style={{}}
            color='info'
            activeIndex={activeIndex}
            pages={
              indexCount.map((index) => {
                let indexObject = { text: index }
                if (activeIndex == index) indexObject["active"] = true
                return indexObject
              })
            }
          />
        }
      </div>
    </div>
  );
}