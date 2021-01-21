import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import { TextField, Grid, Button, withWidth, TextareaAutosize, withStyles} from "@material-ui/core";
import * as actions from "../../../actions/contact.action";
import { connect } from "react-redux";
import useForm from "./useForm";
import { useToasts } from 'react-toast-notifications'
const styles = theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      minWidth: 230,
      padding: theme.spacing(1),
    }
  },
  smMargin: {
    margin: theme.spacing(1)
  }
})
const initialFieldValues = {
  name: '',
  email: '',
  message: ''
}

const WorkSection = ({ classes, ...props }) => {

  //toast msg.
  const { addToast } = useToasts()

  //validate()
  //validate({fullName:'jenny'})
  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if ('name' in fieldValues)
      temp.name = fieldValues.name ? "" : "Name is required."
    if ('message' in fieldValues)
      temp.message = fieldValues.message ? "" : "Message is required."
    if ('email' in fieldValues){
      temp.email = (/^$|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
      temp.email = fieldValues.email?"" : "Email is not valid."
    }
      
    setErrors({
      ...temp
    })

    if (fieldValues == values)
      return Object.values(temp).every(x => x == "")
  }

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
    reset
  } = useForm(initialFieldValues, validate, props.setCurrentId)

  //material-ui select

  const handleSubmit = e => {
    e.preventDefault()
    if (validate()) {
      reset()
      window.alert("Your message has been sent to us")
      console.log(values)
      props.createContact(values)
    }
  }

  return (
    <form autoComplete="off"  className={classes.root} onSubmit={handleSubmit}>
      <Grid container >
        <Grid item lg={12}>
          <h2 align="center" style={{ fontWeight: 'bold', color: 'black' }}  >Contact us</h2>
        </Grid>
        <Grid item lg={12}>
          <h4 align="center" style={{ color: 'black' }}>
            If you have any questions, please contact us by filling in the information below
          </h4>
        </Grid>
        <Grid item lg={6}>
          <TextField className={classes.smMargin}
            fullWidth
            name="name"
            label="Name"
            value={values.name}
            onChange={handleInputChange}
            {...(errors.name && { error: true, helperText: errors.name })}
          />
        </Grid>
        <Grid item lg={6} >
          <TextField
            fullWidth
            name="email"
            label="Email"
            value={values.email}
            type="email"
            onChange={handleInputChange}
            {...(errors.email && { error: true, helperText: errors.email })}
          />
        </Grid>
        <Grid item lg={12}>
          <TextField
            multiline
            rows={5}
            fullWidth
            name="message"
            label="Message"
            value={values.message}
            onChange={handleInputChange}
            {...(errors.message && { error: true, helperText: errors.message })}
          />
        </Grid>

        <div>
          <Button className={classes.smMargin}
            variant="contained"
            color="primary"
            type="submit"
          >
            Send
                      </Button>
          <Button
            variant="contained"
            onClick={reset}>
            Reset
                      </Button>
        </div>
      </Grid>
    </form>
  );
}
const mapStateToProps = state => ({
  contactReducer: state.contact.list
})
const mapActionToProp = {
  createContact: actions.create,
}
export default connect(mapStateToProps, mapActionToProp)(withStyles(styles)(WorkSection));