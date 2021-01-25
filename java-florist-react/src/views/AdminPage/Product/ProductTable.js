import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
import Pagination from "components/Pagination/Pagination";
import { productPagination } from 'shared/productFunction.shared';
import ProductModal from "./ProductModal";

const useStyles = makeStyles(styles);

export default function ProductTable(props) {
  const classes = useStyles();
  const { tableHead, tableHeaderColor } = props;
  let activeIndex = useSelector(state => state.product.activeIndex) || 1;
  let { products, indexCount } = productPagination(props.products, activeIndex, 6)
  const dispatch = useDispatch();
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
          {products.map((product, key) => {
            return (
              <TableRow key={key} className={classes.tableBodyRow}>
                <TableCell className={classes.tableCell}>
                  <img src={product.imgSrc} alt={product.name}
                    style={{
                      display: "block",
                      objectFit: "cover",
                      width: "100px",
                      height: "100px",
                    }}
                  />
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {product.name}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {product.price} $
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {product.active}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {product.categoryname}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <ProductModal
                    title={"Product Details"}
                    product={product}
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
        {products.length > 0 &&
          <Pagination
            color='info'
            activeIndex={activeIndex}
            pages={
              indexCount.map((index) => {
                let indexObject = { text: index }
                if (activeIndex == index) indexObject["active"] = true
                return indexObject
              })
            }
          />
        }
      </div>
    </div>
  );
}

ProductTable.defaultProps = {
  tableHeaderColor: "gray"
};

ProductTable.propTypes = {
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
