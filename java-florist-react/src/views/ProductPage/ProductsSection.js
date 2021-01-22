import React, { useState, useEffect, useRef } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import { FormGroup, FormControlLabel, Switch, TextField } from '@material-ui/core';
import * as actions from 'actions/product.action'
import { productFilter } from 'shared/productFunction.shared';
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import ProductsGridList from "components/Grid/ProductsGridList";
import noProduct from "assets/img/noProduct.jpg";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CustomInput from "components/CustomInput/CustomInput";
import { Search } from "@material-ui/icons";

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
  }, [allProducts == products == [],]); //second parameter use to inform useEffect run when this parameter changes

  function onSubmitFilter(data) {
    let filteredList = productFilter(data, allProducts)
    setProducts(filteredList)
    dispatch(actions.setActiveIndex(1))
  }
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <div className="row">
        <div className="col-md-3 col-sm-6">
          <form onSubmit={handleSubmit(onSubmitFilter)} style={{ boder: '1px solid grey' }}>
            {isAdvanceFilter ?
              <div className="form-row">
                <div className="form-group col-12">
                  <label>Name</label>
                  <input name="name" type="text" ref={register} placeholder="Search by Name..." className="form-control" />
                  <Button type="submit" color="white" aria-label="edit" justIcon round>
                    <Search />
                  </Button>
                </div>
                <div className="form-group col-6">
                  <label>Min price</label>
                  <input name="min" ref={register} placeholder="Min price..." type="number" className="form-control" />
                </div>
                <div className="form-group col-6">
                  <label>Max price</label>
                  <input name="max" ref={register} placeholder="Max price..." type="number" className="form-control" />
                </div>
              </div> :
              <div className="form-row">
                <div className="form-group col-12" style={{ marginLeft: "10px" }}>

                  <TextField
                    label="Search by Name..."
                    margin="normal"
                    id="name"
                    name="name"
                    inputRef={register}
                  />
                  {/* <CustomInput
                    onChange={e => console.log(e)}
                    inputProps={{
                      placeholder: "Search",
                      inputProps: {
                        "aria-label": "Search"
                      }
                    }}
                  /> */}
                  <Button color="primary" aria-label="edit" style={{ marginTop: "30px", width: "100px" }}>
                    <Search />
                  </Button>
                </div>


                <div className="form-group col-12">

                  {/* <CustomInput
                        name="name" 
                        type="text" 
                        inputRef={register}
                        onClick={e => console.log(e)}
                        onChange={e => console.log(e)}
                        id="name"
                        inputProps={{
                          placeholder: "Search by Name"
                        }}
                        formControlProps={{
                          fullWidth: true
                        }}
                      /> */}

                  <label>Name</label>
                  <input name="name" type="text" ref={register} placeholder="Search by Name..." className="form-control" />
                </div>
              </div>}
            <div className="form-row">
              <div className="form-group col-6">
                <FormControlLabel control={<Switch onChange={e => setIsAdvanceFilter(!isAdvanceFilter)} />} label="Advance" />
              </div>
              <div className="form-group col-6">
                <Button type="submit" color="primary" aria-label="edit">
                  <Search />
                </Button>
              </div>
            </div>
          </form>
        </div>
        <div className="col-md-9 col-sm-6">
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <h2 className={classes.title}>Let{"'"}s talk product</h2>
              <h5 className={classes.description}>
                "There are always flowers for those who want to see them"
              </h5>
            </GridItem>
          </GridContainer>
        </div>
      </div>
      <br />
      <div className="container">
        <div className="row">
          <div className="col-md-3 col-sm-12">
            <ButtonGroup
              orientation="vertical"
              color="primary"
              aria-label="vertical contained primary button group"
              variant="text"
            >
              <Button style={{ width: '200px' }}>Anniversary</Button>
              <Button>Birthday</Button>
              <Button>Lover</Button>
              <Button>Mother's Day</Button>
              <Button>Special Day</Button>
            </ButtonGroup>
          </div>
          <div className="col-md-9 col-sm-12">
            <ProductsGridList
              products={products ? products : []}
            />
            {(!products || products.length == 0) &&
              <img src={noProduct} style={{ margin: 'auto' }} />
            }
          </div>
        </div>
      </div>
    </div>
  );
}
