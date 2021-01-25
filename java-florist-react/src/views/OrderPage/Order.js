import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Button from "components/CustomButtons/Button.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import OrderTable from './OrderTable';
import {
    GetOrder
} from '../../actions/order.action';
const useStyles1 = makeStyles((styles) => ({
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    }
}));

export default function Order() {
    const classes = useStyles1();
    const dispatch = useDispatch()
    const SET_USER_AUTHENTICATE = 'user_authenticated';
    const userAuth = localStorage.getItem(SET_USER_AUTHENTICATE);
    let orders = useSelector(state => state.order);//get from root reducer
    let [order, setOrder] = useState([])
    console.log("orders")
    console.log(orders)
    useEffect(() => {
        dispatch(GetOrder(userAuth))
        setOrder(orders)
    }, []);

    return (
        <div className="row">
            <div className="col-md-12">
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader color="primary">
                                <h4 className={classes.cardTitleWhite}>LIST OF Order</h4>
                            </CardHeader>
                            <CardBody>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>
                                        {/* <OrderTable /> */}
                                    </GridItem>
                                </GridContainer>
                            </CardBody>
                            <CardFooter>
                            </CardFooter>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
        </div >
    )
}
