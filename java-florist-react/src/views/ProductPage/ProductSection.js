import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import { FormGroup, FormControlLabel, Switch} from '@material-ui/core';
import * as actions from 'actions/product.action'
import productFilter from 'shared/filter.shared';
import Cards from "components/Card/Cards";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import TitlebarGridList from "components/Grid/TitlebarGridList";

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const dispatch = useDispatch()
  // const { path } = match;
  let [products, setProducts] = useState(null)

  //useSelector is the replacement for mapStateToProps to use state in redux store (can use in function only)
  let allProducts = useSelector(state => state.product.list);//get from root reducer

  const [isAdvanceFilter, setIsAdvanceFilter] = useState(false)
  const { register, handleSubmit, setValue, errors } = useForm(); // initialize the react hook form
  useEffect(() => {
      dispatch(actions.fetchAll())
      setProducts(allProducts)
  }, [allProducts == products == [], ]); //second parameter use to inform useEffect run when this parameter changes
  
  function onSubmitFilter (data) {
      console.log(data);
      let filteredList = productFilter(data, allProducts)
      setProducts(filteredList)
  }
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Let{"'"}s talk product</h2>
          <h5 className={classes.description}>
            "There are always flowers for those who want to see them"
          </h5>
        </GridItem>
      </GridContainer>
      <FormGroup>
        <FormControlLabel control={<Switch onChange={e => setIsAdvanceFilter(!isAdvanceFilter)} />} label="Advance Filter"/>
      </FormGroup>
      <form onSubmit={handleSubmit(onSubmitFilter)} style={{boder: '1px solid grey'}}>
          {isAdvanceFilter ?
          <div className="form-row">
              <div className="form-group col-3">
                  <label>Name</label>
                  <input name="name" type="text" ref={register} placeholder="Search by Name..." className="form-control"/>
              </div>
              <div className="form-group col-3">
                  <label>Description</label>
                  <input name="description" ref={register} placeholder="Search by description..." className="form-control"/>
              </div>
              <div className="form-group col-3">
                  <label>Min price</label>
                  <input name="min" ref={register} placeholder="Min price..." type="number" className="form-control"/>
              </div>
              <div className="form-group col-3">
                  <label>Max price</label>
                  <input name="max" ref={register} placeholder="Max price..." type="number" className="form-control"/>
              </div>
          </div>:
          <div className="form-row">
              <div className="form-group col-3">
                  <label>Name</label>
                  <input name="name" type="text" ref={register} placeholder="Search by Name..." className="form-control"/>
              </div>
              <input name="description" ref={register} className="form-control" hidden/>
              <input name="min" ref={register} type="number" className="form-control" hidden/>
              <input name="max" ref={register} type="number" className="form-control" hidden/>
          </div>}
          <div className="form-group">
              <button type="submit" className="btn btn-primary">
                  Filter Products
              </button>
          </div>
      </form>
      <div className="container">
        <div className="row">
            {/* {products && products.map(product =>
            <Cards
              key={product.id}
              id = {product.id}
              src= {product.imgSrc}
              name= {product.name}
              description= {product.description}
              price= {product.price}
            />
            )} */}
            <TitlebarGridList
              products = {products ? products : []}
            />
            {!products &&
                <div className={classes.description +"p-2"}>No Products To Display</div>
            }
            {products && !products.length &&
                <div className={classes.description}>No Products To Display</div>
            }
        </div>
      </div>
      </div>
  );
}
