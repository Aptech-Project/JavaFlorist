import React, { useState, useEffect } from 'react';
import { Grid, TextField, withStyles, FormControl, InputLabel, Select, MenuItem, FormHelperText, Paper } from "@material-ui/core";
import { FaStar } from "react-icons/fa"
import Button from "components/CustomButtons/Button.js";
import { ButtonGroup } from "@material-ui/core";
import ReplyIcon from "@material-ui/icons/Reply";
import DeleteIcon from "@material-ui/icons/Delete";
import { connect } from "react-redux";
import * as actions from "../../actions/feedback.action";
import EditIcon from "@material-ui/icons/Message";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import { Send } from '@material-ui/icons';
import userImg from "../../assets/img/userDefault.png"
import { Modal } from "react-bootstrap";
import FeedbackDetail from "./FeedbackDetail";
const ProductFeedback = ({ classes, ...props }) => {
    const [currentId, setCurrentId] = useState(0)
    const [rating, setRating] = useState(null);
    const [postComment, setPostComment] = useState([])
    const [hover, setHover] = useState(null);
    const dispatch = useDispatch()
    const [value, setValue] = useState()
    const { id } = useParams()
    const user = useSelector(state => state.login.userAuth)
    let allComment = useSelector(state => state.feedback.feedback)
    let [comment, setComment] = useState([])
    // useEffect(() => { console.log(postComment) }, [postComment])
    useEffect(() => {
        dispatch(actions.fetchByIdPro(id, user))
        setComment(allComment)
    }, [allComment == comment == [],]);
    const onDelete = id => {
        if (window.confirm('Are you sure to delete this record?')) {
            props.deleteFeedback(id, window.alert("Delete Successfull !!!"))
            setComment(allComment)
            setComment(allComment)
        }
    }
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    }
    const handleChange = e => {
        setValue(e.target.value)
        setPostComment({
            userid: parseInt(user),
            productid: parseInt(id),
            feedback: value,
            fbReply: ' ',
            vote: rating
        })
        setValue(e.target.value)
    };
    const onSubmit = () => {
        setPostComment({
            userid: parseInt(user),
            productid: parseInt(id),
            feedback: value,
            fbReply: ' ',
            vote: rating
        })
        if (value === null) {
            window.alert("Please enter your feedback")
        }
        if (value === "") {
            window.alert("Please enter your feedback")
        }
        else if (value === undefined) {
            window.alert("Please enter your feedback")
        }
        else if (rating === null) {
            window.alert("Please rate us")
        }
        else {
            props.createFeedback(postComment)
            setComment(allComment)
            setComment(allComment)
            window.alert("Your comment has been uploaded")
            setRating(null)
            setValue("")
        }
        console.log(postComment)
    }
    const renderRepComment = (record) => {
        if (record.fbRep === ' ') {
            return (
                <div></div>
            )
        }
        if (record.fbRep !== ' ') {
            return (

                <div>
                    <span>|</span>
                    <Grid item lg={11}> <p style={{ color: 'black', fontWeight: 'bold' }}>The administrator replied</p></Grid>
                    <TextField
                        key={record.name}
                        id="filled-read-only-input"
                        value={record.fbRep}
                        disabled
                        variant="outlined"
                        name="feedback"
                        fullWidth
                        multiline
                        rows={2}
                        style={{ color: 'black' }}
                    />
                </div>

            )
        }
    }

    const renderAction = (record) => {
        if (parseInt(user) !== 1) {
            return (
                <div></div>
            )
        }
        if (parseInt(user) === 1) {
            return (
                <Grid item lg={12}>
                    &nbsp;<a style={{ color: 'blue', cursor: 'pointer' }} onClick={() => { setCurrentId(record.id); setShow(true) }}>Reply</a>&nbsp;&nbsp;&nbsp;&nbsp;
                    <a style={{ color: 'red', cursor: 'pointer' }} onClick={() => onDelete(record.id)}>Delete</a>
                </Grid>
            )
        }
    }
    const setRatingUpdate = (ratingValue) => {
        setRating(ratingValue)
        setPostComment({
            userid: parseInt(user),
            productid: parseInt(id),
            feedback: value,
            fbReply: ' ',
            vote: rating
        })
        setRating(ratingValue)
    }
    const renderComment = () => {
        if (comment == undefined) {
            return (
                <div>Loading</div>
            )
        }
        if (comment !== undefined) {
            return (
                <div>
                    {
                        comment.map((record, key) => {
                            return (

                                <div style={{ borderBottom: '1px solid #cccccc', paddingBottom: '8px' }} >
                                    <br />
                                    <Grid container>
                                        <Grid item lg={12}><p style={{ color: 'black', fontWeight: 'bold' }}>{record.name} - rate {record.vote} {<FaStar
                                            color={"ffc107"}
                                            size={25}
                                            style={{ paddingBottom: '5px' }}
                                        />}</p></Grid>
                                    </Grid>
                                    <TextField
                                        key={record.name}
                                        id="filled-read-only-input"
                                        value={record.fb}
                                        disabled
                                        variant="outlined"
                                        name="feedback"
                                        fullWidth
                                        multiline
                                        rows={2}
                                        style={{ color: 'black' }}
                                    />
                                    <Grid container>
                                        {renderAction(record)}
                                        <Grid item lg={1}></Grid>
                                        <Grid item lg={11}>{renderRepComment(record)}</Grid>
                                    </Grid>
                                    {/* <Modal show={show} onHide={() => setShow(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered> */}
                                    <Modal show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                                        <Modal.Header>
                                            <Modal.Title><h4 style={{ fontWeight: 'bold', color: '#0a7cdb' }}>FEEDBACK</h4></Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body >
                                            <FeedbackDetail {...({ currentId, setCurrentId })} />
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="outlined" color="secondary" onClick={handleClose}>Close</Button>
                                        </Modal.Footer>
                                    </Modal>
                                </div>
                            )
                        })
                    }
                </div>
            )
        }

    }
    const renderFormComment = () => {
        if (user !== 'undefined') {
            return (
                <Grid item lg={12}>
                    <h5 style={{ fontWeight: 'bold', color: 'black' }}>Name</h5>
                    <TextField
                        id="outlined-multiline-static"
                        multiline
                        rows={4}
                        placeholder="Your comment"
                        variant="outlined"
                        name="feedback"
                        fullWidth
                        value={value}
                        onChange={handleChange}
                    />
                    <div>
                        {[...Array(5)].map((star, i) => {
                            const ratingValue = i + 1;
                            return <label>
                                <input
                                    type="radio"
                                    name="rating"
                                    style={{ display: "none" }}
                                    value={ratingValue}
                                    onClick={() => { setRating(ratingValue); setRatingUpdate(ratingValue) }}
                                />
                                <FaStar
                                    key={i}
                                    style={{ cursor: 'pointer', transition: "color 200ms" }}
                                    color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                                    size={25}
                                    onMouseEnter={() => { setHover(ratingValue); setRatingUpdate(ratingValue) }}
                                    onMouseLeave={() => setHover(null)}
                                />
                            </label>

                        })}
                    </div>
                    <Button variant="outlined" color="primary" onClick={() => { onSubmit() }}>Send</Button>
                </Grid>
            )
        }
        if (user === 'undefined') {
            return (
                <div>Please login to comment</div>
            )
        }
    }
    return (
        <form >
            {renderFormComment()}
            <h5 style={{ fontWeight: 'bold', color: 'black' }}>Comments <EditIcon color="primary" /></h5>
            { renderComment()}
        </form >
    );
};
const mapStateToProps = state => ({
    feedbackReducer: state.feedback.list
})
const mapActionToProps = {
    fetchAllFeedback: actions.fetchAll,
    fetchFeedbackById: actions.fetchByIdPro,
    createFeedback: actions.create,
    updateFeedback: actions.update,
    deleteFeedback: actions.Delete
}
export default connect(mapStateToProps, mapActionToProps)(ProductFeedback);