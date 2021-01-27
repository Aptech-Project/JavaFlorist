import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import * as actions from 'actions/category.action'
import CategoryTable from "views/AdminPage/Category/CategoryTable";
import CategoryModal from "./CategoryModal";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

export default function CategoryTableList() {
  const classes = useStyles();
  const dispatch = useDispatch()
  let categories = useSelector(state => state.category.categoriesList);//get from root reducer
  useEffect(() => {
    dispatch(actions.fetchAll())
  }, [!categories]); //second parameter use to inform useEffect run when this parameter changes
  console.log(categories)
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Categories Table</h4>
            <p className={classes.cardCategoryWhite}>
              All categories in our site
            </p>
          </CardHeader>
          <div style={{ padding: "5px 20px" }}>
            <CategoryModal
              title={"Add Product"}
            />
          </div>
          <CardBody>
            {categories &&
              <CategoryTable
                tableHeaderColor="primary"
                tableHead={["Name", "Active", "Message", "Action"]}
                categories={categories}
              />
            }
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
