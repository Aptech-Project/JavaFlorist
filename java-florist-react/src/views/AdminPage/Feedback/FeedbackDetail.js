import React, { useState, useEffect } from "react";
import { Grid, Paper, withStyles } from "@material-ui/core";
import useForm from "../../LandingPage/Sections/useForm";
import { connect } from "react-redux";
import * as actions from "../../../actions/feedback.action";
import TextField from '@material-ui/core/TextField';
import { ButtonGroup, Button } from "@material-ui/core";
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
const FeedbackDetail = (props) => {
    const {
        values,
        setValues,
        setErrors,
    } = useForm(initialFieldValues, props.setCurrentId)
    const [value, setValue] = useState()
    useEffect(() => {
        if (props.currentId != 0) {
            setValues({
                ...props.feedbackReducer.find(x => x.id == props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])
    const repComment = () => {
        if (value === '') {
            window.alert("Please enter your comment to reply")
        }
        else if (value === undefined) {
            window.alert("Please enter your comment to reply")
        }
        else if (value !== undefined) {
            props.repCommentFB(values.id, value)
            window.alert("This comment has been reply !!!")
        }

    }
    const handleChange = e => {
        setValue(e.target.value)
    };
    return (
        <form onSubmit={() => repComment()}>
            <Grid container>
                <Grid item lg={12} align='left' >
                    <h6 style={{ fontWeight: 'bold', color: 'red' }}>INFORMATION FEEDBACK</h6>
                </Grid>
                <Grid item lg={3} align='left' >
                    <p style={{ fontWeight: 'bold', color: 'black' }}>User Name </p>
                    <p style={{ fontWeight: 'bold', color: 'black' }}>Product Name</p>
                    <p style={{ fontWeight: 'bold', color: 'black' }}>Feedback</p>
                </Grid>
                <Grid item lg={9} align='left' >
                    <p style={{ color: 'black' }}>{values.name} </p>
                    <p style={{ color: 'black' }}>{values.pname}</p>
                    <div style={{ paddingRight: '10px', wordWrap: 'break-word' }}>
                        <p style={{ color: 'black' }} >{values.fb}</p>
                    </div>

                </Grid>
                <Grid item lg={12} align='left' style={{ borderTop: '1px solid #cccccc' }}>
                    <Grid item lg={12} align='left' >
                        <h6 style={{ fontWeight: 'bold', color: 'red', paddingTop: "10px" }}>FEEDBACK REPLY</h6>
                    </Grid>
                    <Grid item lg={12}>
                        <p style={{ fontWeight: 'bold', color: 'black' }}>Admin </p>
                    </Grid>

                    <Grid item lg={12}>
                        <div style={{ padding: '5px' }}>
                            <TextField
                                id="outlined-multiline-static"
                                label="Reply"
                                fullWidth
                                multiline
                                rows={4}
                                variant="outlined"
                                value={value}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </Grid>
                </Grid>
                <Grid item lg={12} align='left'>
                    <div style={{ paddingTop: '20px' }}>
                        <Button variant="outlined" color="primary" style={{ marginLeft: '10px' }} type="submit" >Send</Button>
                        <Button variant="outlined" style={{ marginLeft: '10px' }}>Reset</Button>
                    </div>

                </Grid>
            </Grid>
        </form>
    );
}


const mapStateToProps = state => ({
    feedbackReducer: state.feedback.list
})

const mapActionToProps = {
    updateFeedback: actions.update,
    repCommentFB: actions.repComment
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(FeedbackDetail));