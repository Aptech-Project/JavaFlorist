import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import HeaderLinks from 'components/Header/HeaderLinks';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CartsIndex from './CartsIndex';

export default function CartPage(props) {
    const path = "/cart";
    const { ...rest } = props;
    return (
        <div>
            <Header
                color="transparent"
                brand="Java Florist"
                rightLinks={<HeaderLinks />}
                fixed
                changeColorOnScroll={{
                    height: 400,
                    color: "success"
                }}
                {...rest} />
            <Switch>
                <Route exact path={path} component={CartsIndex} />
            </Switch>
            <Footer />
        </div>
    );
}