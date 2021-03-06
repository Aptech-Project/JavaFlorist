import React, { useState, useEffect } from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { ButtonGroup, Button, Grid } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Info";
import DeleteIcon from "@material-ui/icons/Delete";
import { connect } from "react-redux";
import { TextField } from "@material-ui/core";
import TableScrollbar from 'react-table-scrollbar';
import { Modal } from "react-bootstrap";
import * as actions from "../../../actions/feedback.action";
import { useSelector, useDispatch } from 'react-redux';
import InputAdornment from '@material-ui/core/InputAdornment';
import Search from '@material-ui/icons/Search';
import FeedbackDetail from "./FeedbackDetail";
const FeedbackTable = ({ classes, ...props }) => {
    const dispatch = useDispatch()
    const [currentId, setCurrentId] = useState(0)
    const [feedback, setFeedback] = useState([])
    let allFeedback = useSelector(state => state.feedback.list);
    const [search, setSearch] = useState("")
    const [filterFeedback, setFilterFeedback] = useState([])

    useEffect(() => {
        props.fetchAllFeedback()
    }, [])//componentDidMount

    useEffect(() => {
        dispatch(actions.fetchAll())
        setFeedback(allFeedback)
        // setCategories(allCategories)
    }, [allFeedback == feedback == [],]);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    useEffect(() => {
        setFilterFeedback(
            feedback.filter((fb) =>
                fb.name.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, feedback]);
    const renderTable = () => {
        return (
            <TableBody>
                {filterFeedback.map((record, index) => {
                    return (<TableRow key={index} hover >
                        <TableCell>{record.name}</TableCell>
                        <TableCell>{record.pname}</TableCell>
                        <TableCell>{record.fb}</TableCell>
                        <TableCell>{record.fbRep}</TableCell>
                        <TableCell>{record.vote}</TableCell>
                        <TableCell>
                            <ButtonGroup variant="text">
                                <Button><EditIcon color="primary" onClick={() => { setCurrentId(record.id); setShow(true) }} /></Button>
                                <Button><DeleteIcon color="secondary"
                                    onClick={() => onDelete(record.id)} /></Button>
                            </ButtonGroup>
                        </TableCell>
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
                    </TableRow>)
                })
                }
            </TableBody>
        )
    }
    const onDelete = id => {
        if (window.confirm('Are you sure to delete this record?')) {
            props.deleteFeedback(id, window.alert("Delete Successfull !!!"))
            setFeedback(allFeedback)
        }
    }
    return (
        <div>
            <Grid container>
                <Grid item xs={12} align="right">
                    <form>
                        <TextField
                            id="outlined-basic"
                            label="Search by name"
                            name="search"
                            variant="outlined"
                            size="small"
                            onChange={e => setSearch(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>
                                ),
                            }}
                        />&nbsp;
                    </form>
                </Grid>
            </Grid>
            <br />
            <TableScrollbar rows={15}>
                <Table size="small" stickyHeader aria-label="sticky table">
                    <TableHead align='left'>
                        <TableRow>
                            <TableCell>UserName</TableCell>
                            <TableCell>Product name</TableCell>
                            <TableCell>Feedback</TableCell>
                            <TableCell>Feedback Replay</TableCell>
                            <TableCell>Vote</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    {renderTable()}
                </Table>
            </TableScrollbar>
        </div>
    );
}
const mapStateToProps = state => ({
    feedbackReducer: state.feedback.list
})

const mapActionToProps = {
    fetchAllFeedback: actions.fetchAll,
    deleteFeedback: actions.Delete
}
export default connect(mapStateToProps, mapActionToProps)(FeedbackTable);