import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Button from "components/CustomButtons/Button.js";

import {
    IncreaseQuantity,
    GetCart,
    DecreaseQuantity,
    DeleteCarts,
} from '../../actions/cart.action';

export default function Cart() {
    const dispatch = useDispatch()
    const SET_USER_AUTHENTICATE = 'user_authenticated';

    let TotalCart = 0;
    let carts = useSelector(state => state.cart.Carts);//get from root reducer
    let [cart, setCart] = useState([])
    const userAuth = localStorage.getItem(SET_USER_AUTHENTICATE);

    useEffect(() => {
        dispatch(GetCart(userAuth))
        setCart(carts)
    }, [carts == cart == []]);

    cart.forEach(function (item) {
        TotalCart += item.quanity * item.product.price;
    });

    const DecQuantity = async (item) => {
        await dispatch(DecreaseQuantity(item))
        await dispatch(GetCart(userAuth))
        await setCart(carts)
    }
    const IncQuantity = async (item) => {
        await dispatch(IncreaseQuantity(item))
        await dispatch(GetCart(userAuth))
        await setCart(carts)
    }
    const DeleteCart = (item) => {
        dispatch(DeleteCarts(item))
        dispatch(GetCart(userAuth))
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
                            <td>
                                <Button
                                    color="transparent"
                                    href="/checkout"
                                >
                                    Checkout
                                </Button>
                            </td>
                        </tr>
                    </tbody>

                </table>
            </div>
        </div >
    )
}
