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
import * as actions from "../../../../actions/contact.action";
import { TextField } from "@material-ui/core";
import Title from '../../Title';
import TableScrollbar from 'react-table-scrollbar';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(0, 'Khang', 'Khangletuan098@gmail.com', 'K co gi'),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));
const Messagecomponent = ({ classes, ...props }) => {
  const [currentId, setCurrentId] = useState(0)

  useEffect(() => {
    props.fetchAllContact()
  }, [])//componentDidMount

  //toast msg.

  const onDelete = id => {
    if (window.confirm('Are you sure to delete this record?'))
      props.deleteContact(id)
  }
  return (

    <React.Fragment>
      <br />
      <Grid container>
        <Title><h3 style={{ fontWeight: 'bold', color: 'black' }}>&nbsp;LIST OF MESSAGE</h3></Title>
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
            <TableCell>Email</TableCell>
            <TableCell>Message</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            props.contactReducer.map((record, index) => {
              return (<TableRow key={index} hover>
                <TableCell>{record.name}</TableCell>
                <TableCell>{record.email}</TableCell>
                <TableCell>{record.message}</TableCell>
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
  contactReducer: state.contact.list
})

const mapActionToProps = {
  fetchAllContact: actions.fetchAll,
  deleteContact: actions.Delete
}
export default connect(mapStateToProps, mapActionToProps)(Messagecomponent);