import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import styles from "assets/jss/material-kit-react/components/paginationStyle.js";
import * as actions from 'actions/product.action'

const useStyles = makeStyles(styles);

export default function Pagination(props) {
  const dispatch = useDispatch()
  const classes = useStyles();
  const { pages, color } = props;
  return (
    <ul className={classes.pagination}>
      {pages.map((prop, key) => {
        const paginationLink = classNames({
          [classes.paginationLink]: true,
          [classes[color]]: prop.active,
          [classes.disabled]: prop.disabled
        });
        return (
          <li className={classes.paginationItem} key={key}>
            <Button
              onClick={() => {dispatch(actions.setActiveIndex(prop.text))}}
              className={paginationLink}
              style={{color: "#363940"}}
            >
              {prop.text}
            </Button>
          </li>
        );
      })}
    </ul>
  );
}

Pagination.defaultProps = {
  color: "primary"
};

Pagination.propTypes = {
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      active: PropTypes.bool,
      disabled: PropTypes.bool,
      text: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.oneOf(["PREV", "NEXT", "..."])
      ]).isRequired,
      onClick: PropTypes.func
    })
  ).isRequired,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"])
};
