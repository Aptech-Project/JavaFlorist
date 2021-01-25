import React, { Component, useState, useEffect } from 'react'
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
import { useSelector, useDispatch } from 'react-redux';
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import ProductsGridList from "components/Grid/ProductsGridList";
import { TextField } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import People from "@material-ui/icons/People";
import BusinessIcon from '@material-ui/icons/Business';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import Email from "@material-ui/icons/Email";
import axios from "axios";
import { List, ListItem, ListItemIcon, ListItemText, Tooltip } from "@material-ui/core";
import { useForm } from 'react-hook-form';
import Button from "components/CustomButtons/Button.js";

import {
	IncreaseQuantity,
	GetCart,
	DecreaseQuantity,
	DeleteCarts,
	GetNumberCart,
	UpdateCart,
} from '../../actions/cart.action';
import { loadprofile } from "actions/customer.action";
import { insert } from "actions/checkout.action";
import MenuItem from '@material-ui/core/MenuItem';

const currencies = [
	{
		value: '1',
		label: 'SHIP CODE',
	},
	{
		value: '2',
		label: 'Pay cart',
	},
];
export default function Checkout() {
	const dispatch = useDispatch()
	const SET_USER_AUTHENTICATE = 'user_authenticated';
	let TotalCart = 0;
	let carts = useSelector(state => state.cart.Carts);//get from root reducer
	let [cart, setCart] = useState([])
	const userProfile = useSelector(state => state.customer.userProfile);
	const [count, setCount] = useState(0)
	const userAuth = localStorage.getItem(SET_USER_AUTHENTICATE);
	const formatDate = () => {
		let date = new Date(userProfile.birthday);
		date = date.getDate() + ' - ' + (date.getMonth() + 1) + ' - ' + date.getFullYear();
		return date
	}
	const [currency, setCurrency] = useState('1');

	const handleChange = (event) => {
		setCurrency(event.target.value);
	};

	const [userList, setUserList] = useState([]);

	useEffect(() => {
		dispatch(GetCart(userAuth))
		setCart(carts)
	}, [userProfile]);

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
	const { register, handleSubmit, errors, watch } = useForm({
		defaultValues: { password: '' },
		validateCriteriaMode: 'all',
		mode: 'onChange',
	});

	function TotalPrice(price, tonggia) {
		return Number(price * tonggia).toLocaleString('en-US');
	}
	const onSubmit = (data, e) => {
		e.preventDefault();
		let userExited = 0;
		userList.map((user) => {
			if (user.email === data.email) {
				userExited = userExited + 1;
			}
		})
		if (userExited > 0) {
			alert("Email alredy Exited!!")
		} else {
			let userData = new FormData()
			userData.append('email', data.email)
			userData.append('address', data.address)
			userData.append('receiver', data.fullname)
			userData.append('note', data.note)
			userData.append('paymentmethod', currency)
			userData.append('message', data.note)
			userData.append('phonenumber', data.phone)
			userData.append('totalmoney', TotalCart)
			userData.append('userid', userAuth)
			dispatch(insert(userData))
		}
	};

	return (
		<div className="row">
			<section className="content-header" >
				<div className="container-fluid">
					<div className="row">
						<div className="col-sm-6">
							<h2>Orders </h2>
						</div>
					</div>
				</div>
			</section>
			<div className="body-order">
				<div className=" content-input">
					<form id="formOrder" noValidate onSubmit={handleSubmit(onSubmit)} method="post">
						<section className="content">
							<div className="">
								<div className="col-12">
									<div className="card">
										<div className="card-body">
											<div className="form-group">
												<TextField
													label="Fullname"
													// value={userProfile != null ? userProfile.name : ""}
													id="fullname"
													margin="normal"
													name="fullname"
													fullWidth
													InputProps={{
														endAdornment: (
															<InputAdornment position='end'>
																<People />
															</InputAdornment>
														),
													}}
													inputRef={register({
														required: 'Full Name is required',
													})}
													required
													autoFocus
													autoComplete="fullname"
													error={errors.fullname}
													helperText={errors.fullname && errors.fullname.message}
												/>
											</div>
											<div className="form-group">
												<TextField
													label="Phone Number"
													// defaultValue={userProfile == null ? "" : userProfile.name}
													id="phone"
													margin="normal"
													name="phone"
													fullWidth
													type="number"
													InputProps={{
														endAdornment: (
															<InputAdornment position='end'>
																<PhoneIphoneIcon />
															</InputAdornment>
														),
													}}
													inputRef={register({
														required: 'Phone Number is required',
														maxLength: {
															value: 13,
															message: 'The Phone Number do not exceed 13 numbers',
														},
														minLength: {
															value: 10,
															message: 'The Phone Number must have at least 10 number',
														},
													})}
													required
													autoComplete="phone"
													error={errors.phone}
													helperText={errors.phone && errors.phone.message}
												/>
											</div>

											<div className="form-group">
												<TextField
													label="Email..."
													// defaultValue={userProfile == null ? "" : userProfile.email}
													margin="normal"
													id="email"
													name="email"
													fullWidth
													//type= "text"
													InputProps={{
														endAdornment: (
															<InputAdornment position='end'>
																<Email />
															</InputAdornment>
														),
													}}
													inputRef={register({
														required: 'Email is required',
														pattern: {
															value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
															message: 'Invalid email address',
														},
													})}
													required
													autoComplete="email"
													error={errors.email}
													helperText={errors.email && errors.email.message}
												/>
											</div>
											<div className="form-group">
												<TextField
													label="Address..."
													// defaultValue={userProfile == null ? "" : userProfile.address}
													id="address"
													margin="normal"
													name="address"
													fullWidth
													InputProps={{
														endAdornment: (
															<InputAdornment position='end'>
																<BusinessIcon />
															</InputAdornment>
														),
													}}
													inputRef={register({
														required: 'Address is required',
													})}
													required
													autoComplete="address"
													error={errors.address}
													helperText={errors.address && errors.address.message}
												/>
											</div>
											<div className="form-group">
												<TextField
													label="Payment..."
													id="paymentmethod"
													margin="normal"
													name="paymentmethod"
													fullWidth
													InputProps={{
														endAdornment: (
															<InputAdornment position='end'>
																<BusinessIcon />
															</InputAdornment>
														),
													}}
													inputRef={register({
														required: 'Payment is required',
													})}
													required
													select
													autoComplete="payment"
													error={errors.payment}
													helperText={errors.payment && errors.payment.message}
													value={currency}
													onChange={handleChange}
												>
													{currencies.map((option) => (
														<MenuItem key={option.value} value={option.value}>
															{option.label}
														</MenuItem>
													))}
												</TextField>
											</div>
											<div className="form-group">
												<TextField
													label="Note..."
													id="note"
													margin="normal"
													name="note"
													fullWidth
													InputProps={{
														endAdornment: (
															<InputAdornment position='end'>
																<BusinessIcon />
															</InputAdornment>
														),
													}}
													inputRef={register({
														required: 'Note is required',
													})}
													required
													multiline
													autoComplete="note"
													error={errors.note}
													helperText={errors.note && errors.note.message}
												>
												</TextField>
											</div>
										</div>
									</div>
									<Button simple
										color="primary"
										size="lg"
										type="submit"
										//disabled={!formState.isValid}
										variant="contained">
										Buy
									</Button>
								</div>
							</div>
						</section>
					</form>
				</div>

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
								<td></td>
							</tr>
						</tbody>

					</table>
				</div>
			</div>
		</div >
	)
}
