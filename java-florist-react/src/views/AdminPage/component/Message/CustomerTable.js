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
import * as actions from "../../../../actions/customer.action";
import { TextField } from "@material-ui/core";
import Title from '../../Title';
import TableScrollbar from 'react-table-scrollbar';
import { Modal } from "react-bootstrap";
import Components from "views/Components/Components";
import GridContainer from "components/Grid/GridContainer";
import DetailCustomer from "./Detail/DetailCustomer";

const Customercomponent = ({ classes, ...props }) => {
  const [currentId, setCurrentId] = useState(0)
  useEffect(() => {
    props.fetchAllCustomer()
  }, [])

  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true)
  }
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

  return (
    <React.Fragment>
      <br />
      <Grid container>
        <Title><h3 style={{ fontWeight: 'bold', color: 'black' }}>&nbsp;LIST OF CUSTOMER</h3></Title>
        <Grid item xs={12} align="right">
          <form>&nbsp;
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
            {
              props.customerReducer.map((record, index) => {
                return (<TableRow key={index} hover>
                  <TableCell>{record.name}</TableCell>
                  <TableCell>{record.username}</TableCell>
                  <TableCell>{record.email}</TableCell>
                  <TableCell>{record.address}</TableCell>
                  <TableCell>{record.birthday}</TableCell>
                  <TableCell>{record.phonenumber}</TableCell>
                  <TableCell>
                    <ButtonGroup variant="text">
                      <Button><EditIcon color="primary" onClick={() => { setCurrentId(record.id) }}
                        onClick={() => handleShow()} /></Button>
                      <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                        <Modal.Header closeButton>
                          <Modal.Title>Customer Properties</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <DetailCustomer {...({ currentId, setCurrentId })} />
                        </Modal.Body>
                        <Modal.Footer>
                          <Button Button variant="outlined" color="secondary" onClick={handleClose}>Close</Button>
                        </Modal.Footer>
                      </Modal>
                      <Button><DeleteIcon color="secondary"
                        onClick={() => onDelete(record.id)} /></Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>)
              })
            }
          </TableBody>

        </Table>
      </TableScrollbar>
    </React.Fragment>
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
export default connect(mapStateToProps, mapActionToProps)(Customercomponent);