import React, { useState, useEffect } from 'react';
import { Grid, TextField, withStyles, FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@material-ui/core";
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
const ProductFeedback = ({ classes, ...props }) => {
    const [currentId, setCurrentId] = useState(0)
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const [productId, setProductId] = useState([])
    const dispatch = useDispatch()
    const [value, setValue] = useState()
    const { id } = useParams()
    const user = useSelector(state => state.login.userAuth)
    const product = useSelector(state => state.product.product)
    let allComment = useSelector(state => state.feedback.feedback)
    const [comment, setComment] = useState([])
    const [postComment, setPostComment] = useState([])
    const userProfile = useSelector(state => state.customer.userProfile)
    useEffect(() => {
        console.log(userProfile);
    }, [userProfile])

    useEffect(() =>
        setProductId(product)
    )
    useEffect(() => {
        dispatch(actions.fetchByIdPro(id, user))
        setComment(allComment)
    }, [allComment == comment == [],]);
    useEffect(() => {
        setProductId(product)
    })
    console.log(id)
    // console.log(filterComment)
    // console.log(user)

    const addComment = () => {

        console.log(postComment)
        console.log(rating)
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
        console.log(postComment)
        console.log()
    };
    const onSubmit = () => {
        if (value === null) {
            window.alert("Please enter your feedback")
        }
        else if (rating === null) {
            window.alert("Please rate us")
        }
        else {
            props.createFeedback(postComment)
            setComment(allComment)
            window.alert("Your comment has been uploaded")
        }

    }
    console.log(userProfile)
    // const renderRole = () => {
    //     if (userProfile.role === 'admin') {
    //         return (
    //             <div>aaaaaaa</div>
    //         )
    //     }
    //     if (userProfile.role === 'user') {
    //         return (
    //             <div>bbbbb</div>

    //         )
    //     }
    // }
    const renderRepComment = (record) => {
        if (record.fbRep === ' ') {
            return (
                <div></div>
            )
        }
        if (record.fbRep !== ' ') {
            return (
                <div>
                    <Grid item lg={12}> <img src={userImg} style={{ height: "30px", borderRadius: '50%' }} alt="CustomerAvatar" /><p style={{ color: 'black', fontWeight: 'bold' }}>Admin</p></Grid>
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
                                <div>
                                    <br />
                                    <Grid container>
                                        <Grid item lg={12}> <img src={userImg} style={{ height: "30px", borderRadius: '50%' }} alt="CustomerAvatar" /><p style={{ color: 'black', fontWeight: 'bold' }}>{record.name}</p></Grid>
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
                                        <Grid item lg={12}>
                                            <Button size="small"><ReplyIcon size="small" color="primary" />Reply</Button>
                                            <Button size="small"><DeleteIcon color="secondary" />Delete</Button>
                                        </Grid>
                                        <Grid item lg={1}></Grid>
                                        <Grid item lg={11}>{renderRepComment(record)}</Grid>
                                    </Grid>
                                </div>
                            )
                        })
                    }
                </div>
            )
        }

    }
    return (
        <form >
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
                                key={ratingValue}
                                type="radio"
                                name="rating"
                                style={{ display: "none" }}
                                value={ratingValue}
                                onClick={() => setRating(ratingValue)}
                            />
                            <FaStar
                                key={i}
                                style={{ cursor: 'pointer', transition: "color 200ms" }}
                                color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                                size={25}
                                onMouseEnter={() => setHover(ratingValue)}
                                onMouseLeave={() => setHover(null)}
                            />
                        </label>

                    })}
                </div>
                <Button variant="outlined" color="primary" onClick={() => { onSubmit() }}>Send</Button>
                <Button variant="outlined" color="secondary">Reset</Button>
            </Grid>
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
    updateFeedback: actions.update
}
export default connect(mapStateToProps, mapActionToProps)(ProductFeedback);