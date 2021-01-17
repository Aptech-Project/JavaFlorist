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
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

export default function ProductsGridList(props) {
  const classes = useStyles();
  const {products} = props
  console.log(products)

  return (
    <div className={classes.root + "row"}>
      <GridList cellHeight={180} className={classes.gridList}>
        {/* <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">December</ListSubheader>
        </GridListTile> */}
        {products.map((product) => (
          <GridListTile key={product.id} className={"col-md-3"} style={{minWidth: '200px'}}>
            <img src={product.imgSrc} alt={product.name} />
            <GridListTileBar
              style={{textAlign: 'left'}}
              title={<Link to={{pathname: `/products/${product.id}`, product: {product}}} style={{color: 'white'}}>{product.name}</Link>}
              subtitle={<span>Price: {product.price} $</span>}
              actionIcon={
                <div>
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
    </div>
  );
}