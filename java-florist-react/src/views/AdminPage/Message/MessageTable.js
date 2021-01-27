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
import * as actions from "../../../actions/contact.action";
import { useSelector, useDispatch } from 'react-redux';
import InputAdornment from '@material-ui/core/InputAdornment';
import Search from '@material-ui/icons/Search';
import MessageDetail from "./MessageDetail";
const MessageTable = ({ classes, ...props }) => {
    const dispatch = useDispatch()
    const [currentId, setCurrentId] = useState(0)
    const [contact, setContact] = useState([])
    let allContact = useSelector(state => state.contact.list);
    const [search, setSearch] = useState("")
    const [filterContact, setFilterContact] = useState([])

    useEffect(() => {
        props.fetchAllContact()
    }, [])//componentDidMount

    useEffect(() => {
        dispatch(actions.fetchAll())
        setContact(allContact)
        // setCategories(allCategories)
    }, [allContact == contact == [],]);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);



    useEffect(() => {
        setFilterContact(
            contact.filter((mess) =>
                mess.name.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, contact]);
    const renderTable = () => {
        return (
            <TableBody>
                {filterContact.map((record, index) => {
                    return (<TableRow key={index} hover >
                        <TableCell>{record.name}</TableCell>
                        <TableCell>{record.email}</TableCell>
                        <TableCell>{record.message}</TableCell>
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
                                <Modal.Title><h4 style={{ fontWeight: 'bold', color: '#0a7cdb' }}>MESSAGE INFORMATION</h4></Modal.Title>
                            </Modal.Header>
                            <Modal.Body >
                                <MessageDetail {...({ currentId, setCurrentId })} />
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
            props.deleteContact(id, window.alert("Delete Successfull !!!"))
            setContact(allContact)
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
            <TableScrollbar rows={15}>
                <Table size="small" stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Message</TableCell>
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
    contactReducer: state.contact.list
})

const mapActionToProps = {
    fetchAllContact: actions.fetchAll,
    deleteContact: actions.Delete
}
export default connect(mapStateToProps, mapActionToProps)(MessageTable);