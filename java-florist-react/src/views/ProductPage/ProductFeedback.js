import React, { useState, useEffect } from 'react';
import { Grid, TextField, withStyles, FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@material-ui/core";
import { FaStar } from "react-icons/fa"
import Button from "components/CustomButtons/Button.js";
import { connect } from "react-redux";
import * as actions from "../../actions/feedback.action";
import EditIcon from "@material-ui/icons/Message";
const ProductFeedback = ({ classes, ...props }) => {
    const [currentId, setCurrentId] = useState(0)
    const [rating, setRating] = useState(null);
    const [hover,setHover]=useState(null);
    useEffect(() => {
        props.fetchAllFeedback()
    }, [])//componentDidMount

    return (
        <form>
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
                            color={ratingValue <= (hover||rating) ? "#ffc107" : "#e4e5e9"} 
                            size={25} 
                            onMouseEnter={()=>setHover(ratingValue)}
                            onMouseLeave={()=>setHover(null)}
                            />
                        </label>
                        
                    })}
                </div>
                <Button variant="outlined" color="primary">Send</Button>
                <Button variant="outlined" color="secondary">Reset</Button>
            </Grid>
            <h5 style={{ fontWeight: 'bold', color: 'black' }}>Comments <EditIcon color="primary"/></h5>
            {
                props.feedbackReducer.map((record) => {
                    return (
                        <div>
                            <br />
                            <h6 style={{ color: 'blue' }}>{record.name} was comment this product</h6>
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
                            <p>Edit your comment</p>
                        </div>

                    )
                })
            }
        </form >
    );
};
const mapStateToProps = state => ({
    feedbackReducer: state.feedback.list
})
const mapActionToProps = {
    fetchAllFeedback: actions.fetchAll,
    createFeedback: actions.create,
    updateFeedback: actions.update
}
export default connect(mapStateToProps, mapActionToProps)(ProductFeedback);