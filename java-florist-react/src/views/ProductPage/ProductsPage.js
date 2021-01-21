import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import HeaderLinks from 'components/Header/HeaderLinks';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ProductDetail from './ProductDetail';
import ProductsIndex from './ProductsIndex';

export default function ProductsPage(props) {
    const path  = "/products";
    const { ...rest } = props;
    return (
        <div>
            <Header
            color="transparent"
            brand="Java Florist"
            rightLinks={<HeaderLinks />}
            fixed
            changeColorOnScroll={{
            height: 250,
            color: "success"
            }}
            {...rest}/>
            <Switch>
                <Route exact path={path} component={ProductsIndex} />
                {/* <Route path={`${path}/add`} component={AddEdit} /> */}
                <Route path={`${path}/:id`} component={ProductDetail} />
            </Switch>
            <Footer />
        </div>
    );
}