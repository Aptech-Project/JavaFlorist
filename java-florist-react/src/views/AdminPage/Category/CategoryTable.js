import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
import Pagination from "components/Pagination/Pagination";
import { productPagination } from 'shared/productFunction.shared';
import CategoryModal from "./CategoryModal";
import { purple } from '@material-ui/core/colors';
import { FormControlLabel, IconButton, Radio, RadioGroup, Switch, Tooltip } from '@material-ui/core';

const useStyles = makeStyles(styles);
const PurpleSwitch = withStyles({
  switchBase: {
    color: purple[300],
    '&$checked': {
      color: purple[500],
    },
    '&$checked + $track': {
      backgroundColor: purple[500],
    },
  },
  checked: {},
  track: {},
})(Switch);
export default function CategoryTable(props) {
  const classes = useStyles();
  const { tableHead, tableHeaderColor, categories } = props;
  let activeIndex = useSelector(state => state.category.activeIndex) || 1;
  // console.log(props.categories)
  // let { categories, indexCount } = productPagination(props.categories || [], activeIndex, 4)
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {categories.map((category, key) => {
            return (
              <TableRow key={key} className={classes.tableBodyRow}>
                <TableCell className={classes.tableCell}>
                  {category.categoryname}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <FormControlLabel
                    style={{ marginTop: '25px' }}
                    control={
                      <PurpleSwitch
                        disabled
                        checked={category.active == 1}
                        name="active" />
                    }
                  />
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {category.message} $
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <CategoryModal style={{ width: '600px' }}
                    title={"Category Details"}
                    categoryId={category.id}
                    categories={categories}
                    category={category}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="col-md-12 col-sm-12"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: 'auto'
        }}
      >
      </div>
    </div>
  );
}

CategoryTable.defaultProps = {
  tableHeaderColor: "gray"
};

CategoryTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};
