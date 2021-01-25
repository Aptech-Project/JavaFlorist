import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.9.0";
import { Provider, useSelector } from "react-redux";
// pages for this product
import Components from "views/Components/Components.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import { store } from "reducers/store";
import Home from "views/Home";
import ProductsPage from "views/ProductPage/ProductsPage";
import AboutPage from "views/AboutPage/AboutPage";
import RegisterPage from "views/LoginPage/RegisterPage.js";
import Dashboard from "views/AdminPage/Dashboard";
import CartPage from "views/CartPage/CartPage";
import OrderPage from "views/OrderPage/OrderPage";
import CheckOut from "views/CheckoutPage/CheckoutPage";
import Admin from "views/AdminPage/Admin";
import ProfileEdit from "views/ProfilePage/ProfileEdit";
import NotFoundPage from "views/NotFoundPage";

var hist = createBrowserHistory();


const render = () => {
  //const userAuth = useSelector(state => state.login.userAuth)
  const SET_USER_AUTHENTICATE = 'user_authenticated';
  let userAuth = localStorage.getItem(SET_USER_AUTHENTICATE)
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/profile" component={ProfilePage} />
      <Route path="/editProfile" component={ProfileEdit} />
      <Route path="/admin" component={Admin} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/components" component={Components} />
      <Route path="/products" component={ProductsPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/cart" component={CartPage} />
      <Route path="/order" component={OrderPage} />
      <Route path="/checkout" component={CheckOut} />
      <Route path='/404' component={NotFoundPage} />
      <Redirect from='*' to='/404' />
    </Switch>
  )
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      {render()}
    </Router>
  </Provider>,
  document.getElementById("root")
);
