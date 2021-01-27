import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as productActions from 'actions/category.action'
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
// core components
import Button from "components/CustomButtons/Button.js";
import { makeStyles } from '@material-ui/core/styles';
import modalStyle from "assets/jss/material-kit-react/modalStyle.js";
import { FormControlLabel, IconButton, Radio, RadioGroup, Switch, TextField, Tooltip } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import avatar from "assets/img/faces/marc.jpg";
import { purple } from '@material-ui/core/colors';
import defaultImage from "assets/img/default.jpg";
import * as categoryActions from 'actions/category.action'
import { Alert } from '@material-ui/lab';
import { checkProductName } from 'shared/productFunction.shared';
import useStateWithPromise from 'shared/useStateWithPromise';
import { useAlert } from 'react-alert'
import { useHistory } from 'react-router'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

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
const useStyles = makeStyles(modalStyle);
const initialFieldValues = {
  categoryname: '',
  message: '',
  active: 1,
}
export default function CategoryModal(props) {
  const history = useHistory()
  const alert = useAlert()
  const dispatch = useDispatch()
  const { category, categoryId } = props;
  const [modal, setModal] = useState(false);
  const [active, setActive] = useState(true);
  const [error, setError] = useState({});
  const [missingInput, setMissingInput] = useState(null);
  const [values, setValues] = useState(category ? category : initialFieldValues)
  let allCategories = useSelector(state => state.category.categoriesList);//get from root reducer
  let categories = useSelector(state => state.category.list);//get from root reducer
  let status = useSelector(state => state.category.status);//get from root reducer
  const isAddMode = !category;
  const classes = useStyles();

  useEffect(() => {
    dispatch(categoryActions.fetchAll())
  }, [!allCategories, categories]);

  function onSubmit(e) {
    let keepRun = true

    Object.keys(values).some(key => {
      let value = values[key]
      if (value == null && isAddMode) {
        keepRun = false
      }
    })
    if (keepRun) {
      e.preventDefault()
      let formData = new FormData()
      formData.append('categoryname', values.categoryname)
      formData.append('message', values.message)
      formData.append('active', values.active)
      if (isAddMode) {
        dispatch(categoryActions.create(formData))
      } else {
        formData.append('id', category.id)
        dispatch(categoryActions.update(category.id, formData))
        history.go(0)
      }
    }
  }

  async function vaidateField(name, value) {
    if (name == "categoryname") {
      if (value.length < 3) {
        setError({ ...error, [name]: "Name must be at least 3 characters!" })
      } else {
        setError({ ...error, [name]: null })
      }
    }
    if (name == "message") {
      if (value.length < 20) {
        setError({ ...error, [name]: "Message must be at least 20 characters!" })
      } else {
        setError({ ...error, [name]: null })
      }
    }
  }

  const handleInputChange = e => {
    let { name, value } = e.target;
    vaidateField(name, value)
    if (name == "active") {
      setActive(!active)
      value = !active ? 1 : 0
    }
    setValues({
      ...values,
      [name]: value
    })
    setMissingInput(null)
  }

  return (
    <div>
      <div>
        {isAddMode ?
          <Button color="primary" round onClick={() => setModal(true)}>
            Add Category
          </Button> :
          <Tooltip
            title="Edit data"
            placement={window.innerWidth > 959 ? "top" : "left"}>
            <IconButton className={classes.icon} onClick={e => setModal(true)}>
              <Edit />
            </IconButton>
          </Tooltip>
        }

      </div>
      <Dialog
        classes={{
          root: classes.center,
          paper: classes.modal
        }}
        open={modal}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setModal(false)}
        aria-labelledby="modal-slide-title"
        aria-describedby="modal-slide-description"
      >
        <DialogTitle
          id="classic-modal-slide-title"
          disableTypography
          className={classes.modalHeader}
        >
          <IconButton
            className={classes.modalCloseButton}
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={() => setModal(false)}
          >
            <Close className={classes.modalClose} />
          </IconButton>
        </DialogTitle>
        <DialogContent
          id="modal-slide-description"
          className={classes.modalBody}
        >


          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>{category ? "Edit Category" : "Add Category"}</h4>
                  <p className={classes.cardCategoryWhite}>Category information</p>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    {(isAddMode && status == "201") &&
                      <Alert severity="success">Create new category success!</Alert>
                    }
                    {(isAddMode && status && status != "201") &&
                      <Alert severity="error">Create new category failed!</Alert>
                    }
                    {missingInput &&
                      <Alert severity="error">{missingInput}</Alert>
                    }
                    <GridItem xs={12} sm={6} md={6}>
                      <FormControl className="col-12">
                        <TextField
                          name="categoryname"
                          label="Name"
                          type="text"
                          onChange={handleInputChange}
                          defaultValue={values.categoryname}
                        />
                        <FormHelperText error>{error.categoryname}</FormHelperText>
                      </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={6} md={6}>
                      <FormControlLabel
                        style={{ marginTop: '25px' }}
                        control={
                          <PurpleSwitch
                            name="active"
                            checked={active}
                            onChange={handleInputChange} />
                        }
                        classes={{
                          label: classes.label
                        }}
                        label={active ? "Active" : "Inactive"}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <FormControl className="col-12">
                        <TextField
                          name="message"
                          label="Message"
                          multiline
                          onChange={handleInputChange}
                          defaultValue={values.message}
                          rows={8}
                        />
                        <FormHelperText error>{error.message}</FormHelperText>
                      </FormControl>
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Button color="primary" onClick={onSubmit}>{isAddMode ? "Add Category" : "Update Category"}</Button>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        </DialogContent>
      </Dialog>
    </div>
  );
}