import React, { useEffect, useState } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
import PaymentIcon from '@material-ui/icons/Payment';
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { bugs, website, server } from "variables/general.js";
import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
//payment
import mastercard from "assets/img/PaymentIcons/mastercard.png";

import axios from "axios";
import DataTable from "./DataTable";
import DashboardChart from "./DashboardChart"

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  const [orderList, setOrderList] = useState([]);

  let yearRevenue = 50000;
  let monthRevenue = 20000;
  useEffect(()=>{
    axios.get('http://localhost:5000/api/Orders')
    .then(function (response) {
      //console.log(response);
      setOrderList([...response.data]);
    })
    .catch(function (error) {
      console.log(error);
    })
  },[])

  useEffect(()=>{
    if (orderList.length !== 0) {
        orderList.map((orderItem)=>{
            const countYear = new Date(orderItem.deliverydate);
            const thisTime = new Date();
            if (countYear.getFullYear() === thisTime.getFullYear()) {
              yearRevenue = yearRevenue + orderItem.totalmoney
            }
            if (countYear.getMonth() === thisTime.getMonth()) {
              monthRevenue = monthRevenue + orderItem.totalmoney
            }
    //console.log(dataChart);
    })}
  },[orderList]) 

  const paymentMethod = (method) => {
    switch (method) {
      case "mastercard":
        return <img src={mastercard} />
      default:
        break;
    }
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" >
              <CardIcon color="warning">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Year Revenue</p>
              <h4 className={classes.cardTitle}>${yearRevenue}</h4>
            </CardHeader>
            <CardFooter>
              <div className={classes.stats}>
                <DateRange />
                This Year
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" >
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Revenue</p>
              <h4 className={classes.cardTitle}>${monthRevenue}</h4>
            </CardHeader>
            <CardFooter>
              <div className={classes.stats}>
                <DateRange />
                This Month
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" >
              <CardIcon color="danger">
                <LocalFloristIcon/>
              </CardIcon>
              <p className={classes.cardCategory}>BestSellers</p>
              <h4 className={classes.cardTitle}>Rose</h4>
            </CardHeader>
            <CardFooter>
              <div className={classes.stats}>
                <LocalFloristIcon />
                BestSellers of Month
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" >
              <CardIcon color="info">
                <PaymentIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Pay Method</p>
              <h4 className={classes.cardTitle} style={{textAlign: "center"}}>{paymentMethod('mastercard')}</h4>
            </CardHeader>
            <CardFooter>
              <div className={classes.stats}>
                <PaymentIcon />
                Highest Payment Method
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="success">
              <h4 style={{textAlign:'center'}}>Year Revenue</h4>
            </CardHeader>
            <CardBody>
              {/* <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              /> */}
              <DashboardChart orderList={orderList}/>
            </CardBody>
            <CardFooter>
              {/* <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div> */}
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Revenue Details</h4>
              <p className={classes.cardCategoryWhite}>
                Revenue from this month
              </p>
            </CardHeader>
            <CardBody>
              <DataTable orderList={orderList}/>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
