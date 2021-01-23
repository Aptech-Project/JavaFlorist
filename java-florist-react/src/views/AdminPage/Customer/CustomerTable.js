import React, { useState, useEffect } from "react";
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { ButtonGroup, Button, Grid } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Info";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";
import { connect } from "react-redux";
import { TextField } from "@material-ui/core";
import TableScrollbar from 'react-table-scrollbar';
import { Modal } from "react-bootstrap";
import GridContainer from "components/Grid/GridContainer";
import * as actions from "../../../actions/customer.action";
import CustomerDetail from "./CustomerDetail"
import { Route, Switch } from 'react-router-dom';

const CustomerTable = ({ classes, ...props }) => {
    const path = "/users";
    const [currentId, setCurrentId] = useState(0)
    useEffect(() => {
        props.fetchAllCustomer()
    }, [])

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const onDelete = id => {
        if (window.confirm('Are you sure to delete this record?')) {
            try {
                props.deleteCustomer(id)
            } catch (error) {
                window.alert("Cannot delete this customer")
            }
        }
    }
    // const onDetail = () => {
    //     // props.fetchCusbyId(record.id)
    //     // console.log(record)
    //     setShow(true)
    // }


    return (
        <div>
            <Grid container>
                <Grid item xs={12} align="right">
                    <form>
                        <TextField id="outlined-basic" label="Search" variant="outlined" size="small" />&nbsp;
                            <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Search
                        </Button>&nbsp;
                    </form>
                </Grid>
            </Grid>
            <br />
            <TableScrollbar>
                <Table size="small" stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Birthday</TableCell>
                            <TableCell>Phone Number</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.customerReducer.map((record, index) => {
                            return (<TableRow key={index} hover>
                                <TableCell>{record.name}</TableCell>
                                <TableCell>{record.username}</TableCell>
                                <TableCell>{record.email}</TableCell>
                                <TableCell>{record.address}</TableCell>
                                <TableCell>{record.birthday}</TableCell>
                                <TableCell>{record.phonenumber}</TableCell>
                                <TableCell>
                                    <ButtonGroup variant="text">
                                        <Button><EditIcon color="primary" onClick={() => setShow(true)}
                                        /></Button>
                                        <Button><DeleteIcon color="secondary"
                                            onClick={() => onDelete(record.id)} /></Button>
                                    </ButtonGroup>
                                </TableCell>
                                {/* <Modal show={show} onHide={() => setShow(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered> */}
                                <Modal show={show}>
                                    <Modal.Header >
                                        <Modal.Title>Customer Properties</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body >
                                        <CustomerDetail customer={record} />
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="outlined" color="secondary" onClick={handleClose}>Close</Button>
                                    </Modal.Footer>
                                </Modal>
                            </TableRow>)
                        })
                        }
                    </TableBody>
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
    deleteCustomer: actions.Delete,
    fetchCusbyId: actions.fetchById
}
export default connect(mapStateToProps, mapActionToProps)(CustomerTable);