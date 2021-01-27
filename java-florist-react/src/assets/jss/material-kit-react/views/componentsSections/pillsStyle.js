import { container, title } from "assets/jss/material-kit-react.js";

const pillsStyle = {
  section: {
    padding: "70px 0"
  },
  container,
  title: {
    margin: "auto!important",
    minHeight: "32px",
    fontWeight: "!400",
    fontSize: "50px",
    textDecoration: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: "20px",
  },
  rootGridPills: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  gridList: {
    width: 500,
    height: 450,
  },
};

export default pillsStyle;
