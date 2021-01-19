import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { AddShoppingCart, Shop } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import Pagination from 'components/Pagination/Pagination';
import {productPagination} from 'shared/filter.shared';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    // width: 500,
    // height: 450,
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
  tileBar: {
    "&:hover": {
      transition: 'all .3s ease-in-out 0s',
      background: "rgb(166, 12, 71, 0.6)",
    }
  }
}));



export default function ProductsGridList(props) {

  let activeIndex = useSelector(state => state.product.activeIndex) || 1;
  const classes = useStyles();
  const {products} = props
  const indexCount = productPagination(products)

  return (
    <div className={classes.root + "row"}>
      <GridList cellHeight={240} className={classes.gridList}>
        {products.map((product) => (
          <GridListTile key={product.id} className={"col-sm-6 col-md-4"} style={{minWidth: '200px'}}>
            <img src={product.imgSrc} alt={product.name} className={classes.image}/>
            <GridListTileBar
              className={classes.tileBar}
              style={{textAlign: 'left'}}
              title={<Link to={{pathname: `/products/${product.id}`, product: {product}}} style={{color: 'white', width: '70%'}}>{product.name}</Link>}
              subtitle={<span>Price: {product.price} $</span>}
              actionIcon={
                <div style={{minWidth: '100px'}}>
                <IconButton className={classes.icon} onClick={()=>{console.log("Buy now clicked")}}>
                  <Shop/>
                </IconButton>
                <IconButton className={classes.icon} onClick={()=>{console.log("Add cart clicked")}}>
                  <AddShoppingCart />
                </IconButton>
                </div>
              }
            />
          </GridListTile>
        ))}
        {!products &&
          <div className={classes.description +"p-2"}>No Products To Display</div>
        }
        {products && !products.length &&
          <div className={classes.description}>No Products To Display</div>
        }
      </GridList>
      <br></br>
      <Pagination
        pages={
          indexCount.map((index)=>{
            let indexObject = {text: index}
            if (activeIndex == index) indexObject["active"] = true
            return indexObject
          })
        }
        color="info"
      />
    </div>
);
}