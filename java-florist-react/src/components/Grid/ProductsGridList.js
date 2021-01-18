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
}));



export default function ProductsGridList(props) {

  const classes = useStyles();
  const {products} = props

  function productPagination(){
    let indexCount = []
    let index
    indexCount.push("PREV")
    for (index = 1; index <= products.length/9; index++) {
        indexCount.push(index)
    }
    if(products.length%3!=0){
        indexCount.push(index)
    }
    indexCount.push("NEXT")
    console.log(indexCount)
    return indexCount
  }

  const indexCount = productPagination()
  console.log(indexCount)

  return (
    <div className={classes.root + "row"}>
      <GridList cellHeight={240} className={classes.gridList}>
        {products.map((product) => (
          <GridListTile key={product.id} className={"col-sm-6 col-md-4"} style={{minWidth: '200px'}}>
            <img src={product.imgSrc} alt={product.name} />
            <GridListTileBar
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
        product={products}
        pages={
          indexCount.map((index)=>{return {text: index}})
        }
        color="info"
      />
    </div>
  );
}