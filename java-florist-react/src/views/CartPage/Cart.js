import React, { Component, useState, useEffect } from 'react'
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
import { useSelector, useDispatch } from 'react-redux';
import { FormGroup, FormControlLabel, Switch } from '@material-ui/core';
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import ProductsGridList from "components/Grid/ProductsGridList";

import {
    IncreaseQuantity,
    GetCart,
    DecreaseQuantity,
    DeleteCarts,
    GetNumberCart,
    UpdateCart,
} from '../../actions/cart.action';

export default function Cart() {
    const dispatch = useDispatch()

    let TotalCart = 0;
    let carts = useSelector(state => state.cart.Carts);//get from root reducer
    let [cart, setCart] = useState([])

    useEffect(() => {
        dispatch(GetCart(1))
        setCart(carts)
    }, [carts == cart == []]);

    cart.forEach(function (item) {
        TotalCart += item.quanity * item.product.price;
    });

    const DecQuantity = (item) => {
        dispatch(DecreaseQuantity(item))
        dispatch(GetCart(1))
        setCart(carts)
    }
    const IncQuantity = (item) => {
        dispatch(IncreaseQuantity(item))
        dispatch(GetCart(1))
        setCart(carts)
    }
    const DeleteCart = (item) => {
        dispatch(DeleteCarts(item))
        dispatch(GetCart(1))
        setCart(carts)
    }
    function TotalPrice(price, tonggia) {
        return Number(price * tonggia).toLocaleString('en-US');
    }
    return (
        <div className="row">
            <div className="col-md-12">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                            <th>Delete product</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart != [] ?
                            cart.map((item, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{item.product.name}</td>
                                        <td><img src={item.product.imgSrc} style={{ width: '100px', height: '80px' }} /></td>
                                        <td>{item.product.price} $</td>
                                        <td>
                                            <span className="btn btn-primary" style={{ margin: '2px' }} onClick={() => DecQuantity(item)}>-</span>
                                            <span className="btn btn-info">{item.quanity}</span>
                                            <span className="btn btn-primary" style={{ margin: '2px' }} onClick={() => IncQuantity(item)}>+</span>
                                        </td>
                                        <td>{TotalPrice(item.product.price, item.quanity)} $</td>
                                        <td><button className="badge badge-danger" onClick={() => DeleteCart(item)}>X</button></td>
                                    </tr>
                                )
                            }) : <></>

                        }
                        <tr>
                            <td colSpan="4">Total Carts</td>
                            <td>{Number(TotalCart).toLocaleString('en-US')} $</td>
                        </tr>
                        <tr>
                            <td colSpan="5"></td>
                            <td><button className="btn btn-primary" onClick={() => ""}>Check out</button></td>
                        </tr>
                    </tbody>

                </table>
            </div>
        </div >
    )
}
