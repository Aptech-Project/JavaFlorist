import React, { useEffect } from "react";
import { Grid, withStyles } from "@material-ui/core";
import useForm from "../../LandingPage/Sections/useForm";
import { connect } from "react-redux";
import * as actions from "../../../actions/contact.action";
import userImg from "../../../assets/img/userDefault.png"
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
const MessageDetail = (props) => {
    const {
        values,
        setValues,
        setErrors,
    } = useForm(initialFieldValues, props.setCurrentId)



    useEffect(() => {
        if (props.currentId != 0) {
            setValues({
                ...props.contactReducer.find(x => x.id == props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])

    return (
        <form>
            <Grid container>
                <Grid item lg={6} xs={12} sm={12} md={12} align='center' >

                </Grid>
                <Grid item lg={2} align='left'>

                </Grid>
                <Grid item lg={4} align='left'>

                </Grid>
            </Grid>
        </form>
    );
}


const mapStateToProps = state => ({
    contactReducer: state.contact.list
})

const mapActionToProps = {
    updateContact: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(MessageDetail));