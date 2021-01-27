import React, { useState, useEffect } from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { ButtonGroup, Button, Grid } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Info";
import CheckCircle from "@material-ui/icons/CheckCircle";
import Cancel from "@material-ui/icons/Cancel";
import DeleteIcon from "@material-ui/icons/Delete";
import { connect } from "react-redux";
import { TextField } from "@material-ui/core";
import TableScrollbar from 'react-table-scrollbar';
import { Modal } from "react-bootstrap";
import * as actions from "../../../actions/customer.action";
import CustomerDetail from "./CustomerDetail"
import { useSelector, useDispatch } from 'react-redux';
import InputAdornment from '@material-ui/core/InputAdornment';
import Search from '@material-ui/icons/Search';

const CustomerTable = ({ classes, ...props }) => {
    const dispatch = useDispatch()
    const [currentId, setCurrentId] = useState(0)
    const [customer, setCustomer] = useState([])
    const [value, setValues] = useState([])
    let allCustomer = useSelector(state => state.customer.list);
    const [search, setSearch] = useState("")
    const [filterCustomer, setFilterCustomer] = useState([])

    useEffect(() => {
        props.fetchAllCustomer()
    }, [])//componentDidMount

    useEffect(() => {
        dispatch(actions.fetchAll())
        setCustomer(allCustomer)
        // setCategories(allCategories)
    }, [allCustomer == customer == [],]);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    useEffect(() => {
        setFilterCustomer(
            customer.filter((customers) =>
                customers.name.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, customer]);
    const onInActive = (record) => {
        if (window.confirm("Account will be deactivate !!!")) {
            props.updateActiveCustomer(record.id)
            setCustomer(allCustomer)
        }
    }
    const onActive = (record) => {
        if (window.confirm("Account will be activate !!!")) {
            props.updateInActiveCustomer(record.id)
            setCustomer(allCustomer)
        }
    }
    const renderTable = () => {
        return (
            <TableBody>
                {filterCustomer.map((record, index) => {
                    return (<TableRow key={index} hover>
                        <TableCell>{record.name}</TableCell>
                        <TableCell>{record.username}</TableCell>
                        <TableCell>{record.email}</TableCell>
                        <TableCell>{record.address}</TableCell>
                        <TableCell>{record.role}</TableCell>
                        <TableCell>{record.active}</TableCell>
                        <TableCell>
                            <ButtonGroup variant="text">
                                <Button><CheckCircle style={{ color: 'green' }} onClick={() => onActive(record)} /></Button>
                                <Button><Cancel style={{ color: 'red' }} onClick={() => onInActive(record)} /></Button>
                            </ButtonGroup>

                        </TableCell>
                        <TableCell>
                            <ButtonGroup variant="text">
                                <Button><EditIcon color="primary" onClick={() => { setCurrentId(record.id); setShow(true) }} /></Button>
                            </ButtonGroup>
                        </TableCell>
                        {/* <Modal show={show} onHide={() => setShow(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered> */}
                        <Modal show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                            <Modal.Header>
                                <Modal.Title><h4 style={{ fontWeight: 'bold', color: '#0a7cdb' }}>USER INFORMATION</h4></Modal.Title>
                            </Modal.Header>
                            <Modal.Body >
                                <CustomerDetail {...({ currentId, setCurrentId })} />
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
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Active</TableCell>
                            <TableCell>Active/InActive</TableCell>
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
    customerReducer: state.customer.list
})

const mapActionToProps = {
    fetchAllCustomer: actions.fetchAll,
    updateActiveCustomer: actions.updateActive,
    updateInActiveCustomer: actions.updateInActive
}
export default connect(mapStateToProps, mapActionToProps)(CustomerTable);