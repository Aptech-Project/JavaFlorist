import React, { useEffect } from "react";
import { Grid, withStyles } from "@material-ui/core";
import useForm from "../../LandingPage/Sections/useForm";
import { connect } from "react-redux";
import * as actions from "../../../actions/customer.action";
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
const CustomerDetail = (props) => {
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, props.setCurrentId)



    useEffect(() => {
        if (props.currentId != 0) {
            setValues({
                ...props.customerReducer.find(x => x.id == props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])
    const renderImg = (values) => {
        if (values.imgName === null) {
            return (
                <img src={userImg} style={{ width: '250px', height: "250px", borderRadius: '50%' }} alt="CustomerAvatar" />
            )
        }
        if (values.imgName !== "") {
            return (
                <img src={values.imgSrc} style={{ width: '250px', height: "250px", borderRadius: '50%' }} alt="CustomerAvatar" />
            )
        }
    }
    return (
        <form>
            <Grid container>
                <Grid item lg={6} xs={12} sm={12} md={12} align='center' >
                    <div>
                        {renderImg(values)}
                    </div>
                </Grid>
                <Grid item lg={2} align='left'>
                    <p style={{ fontWeight: 'bold', color: 'black' }}>Name </p>
                    <p style={{ fontWeight: 'bold', color: 'black' }}>Username</p>
                    <p style={{ fontWeight: 'bold', color: 'black' }}>Email</p>
                    <p style={{ fontWeight: 'bold', color: 'black' }}>Address</p>
                    <p style={{ fontWeight: 'bold', color: 'black' }}>Birthday</p>
                    <p style={{ fontWeight: 'bold', color: 'black' }}>Phone</p>
                    <p style={{ fontWeight: 'bold', color: 'black' }}>Active</p>
                    <p style={{ fontWeight: 'bold', color: 'black' }}>Role</p>
                </Grid>
                <Grid item lg={4} align='left'>
                    <p style={{ fontWeight: 'bold', color: 'black' }}>{values.name}</p>
                    <p style={{ fontWeight: 'bold', color: 'black' }}>{values.username}</p>
                    <p style={{ fontWeight: 'bold', color: 'black' }}>{values.email}</p>
                    <p style={{ fontWeight: 'bold', color: 'black' }}>{values.address}</p>
                    <p style={{ fontWeight: 'bold', color: 'black' }}>{values.birthday}</p>
                    <p style={{ fontWeight: 'bold', color: 'black' }}>{values.phonenumber}</p>
                    <p style={{ fontWeight: 'bold', color: 'black' }}>{values.active}</p>
                    <p style={{ fontWeight: 'bold', color: 'black' }}>{values.role}</p>
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

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(CustomerDetail));