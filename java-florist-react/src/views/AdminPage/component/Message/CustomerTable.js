import React, { useState, useEffect } from "react";
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { ButtonGroup, Button, Grid } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Message";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";
import { connect } from "react-redux";
import * as actions from "../../../../actions/customer.action";
import { TextField } from "@material-ui/core";
import Title from '../../Title';
import TableScrollbar from 'react-table-scrollbar';

// Generate Order Data

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));
const Customercomponent = ({ classes, ...props }) => {
  const [currentId, setCurrentId] = useState(0)

  useEffect(() => {
    props.fetchAllCustomer()
  }, [])//componentDidMount

  //toast msg.

  const onDelete = id => {
    if (window.confirm('Are you sure to delete this record?')){
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
      <Table size="big" stickyHeader aria-label="sticky table">
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
                    <Button><EditIcon color="primary"
                      onClick={() => { setCurrentId(record.id) }} /></Button>
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
  deleteCustomer: actions.Delete
}
export default connect(mapStateToProps, mapActionToProps)(Customercomponent);