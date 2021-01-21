import React, { useState, useEffect } from "react";
import { Grid, TextField, withStyles, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText } from "@material-ui/core";
import useForm from "../../../../LandingPage/Sections/useForm";
import { connect } from "react-redux";
import * as actions from "../../../../../actions/customer.action";

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 230,
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 230,
    },
    smMargin: {
        margin: theme.spacing(1)
    }
})

const initialFieldValues = {
    name: '',
}

const DetailCustomer = ({ classes, ...props }) => {
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }
    const {
        values,
        setValues,
        errors,
        setErrors,
    } = useForm(initialFieldValues,validate)

    //material-ui select

    useEffect(() => {
        if (props.currentId != 0) {
            setValues({
                ...props.customerReducer.find(x => x.id == props.currentId),
            })
            setErrors({})
        }
    }, [props.currentId])

    return (
        <form>
        <Grid container>
          <Grid item lg={6} align='left' >          
              <h5 style={{ fontWeight: 'bold', color: 'black' }}>Name: {values.name}</h5>
              <h5 style={{ fontWeight: 'bold', color: 'black' }}>UserName: </h5>
              <h5 style={{ fontWeight: 'bold', color: 'black' }}>Email: AAAAAAA</h5>
              <h5 style={{ fontWeight: 'bold', color: 'black' }}>Address: AAAAAAA</h5>
              <h5 style={{ fontWeight: 'bold', color: 'black' }}>Birthday: AAAAAAA</h5>
          </Grid>
          <Grid item lg={6} align='center'>
            <img src=""/>
          </Grid>
        </Grid>
      </form>
    );
}


const mapStateToProps = state => ({
    customerReducer: state.customer.list
})

const mapActionToProps = {
    updateDCandidate: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(DetailCustomer));