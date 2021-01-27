import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import HeaderLinks from 'components/Header/HeaderLinks';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import OrdersIndex from './OrdersIndex';

export default function OrderPage(props) {
    const path = "/order";
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
                <Route exact path={path} component={OrdersIndex} />
            </Switch>
            <Footer />
        </div>
    );
}