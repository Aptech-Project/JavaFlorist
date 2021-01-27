import React, { useState, useEffect } from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Button, Grid } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import TableScrollbar from 'react-table-scrollbar';
import {
  GetOrder,
  deleteOrder
} from '../../actions/order.action';
import { useSelector, useDispatch } from 'react-redux';
import InputAdornment from '@material-ui/core/InputAdornment';
import Search from '@material-ui/icons/Search';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

export default function OrderTable() {

  const dispatch = useDispatch()
  const [currentId, setCurrentId] = useState(0)
  const [search, setSearch] = useState("")
  const [filterCustomer, setFilterCustomer] = useState([])
  const SET_USER_AUTHENTICATE = 'user_authenticated';
  const userAuth = localStorage.getItem(SET_USER_AUTHENTICATE);
  let orders = useSelector(state => state.order.Order);//get from root reducer
  let [order, setOrder] = useState([])
  useEffect(() => {
    dispatch(GetOrder(userAuth))
    setOrder(orders)
  }, [orders == order == [],]);

  const [open, setOpen] = useState(false);

  function handleClose() {
    setOpen(false);
  };
  async function cancelOrder() {
    await dispatch(deleteOrder(currentId))
    handleClose()
    await dispatch(GetOrder(userAuth))
    await setOrder(orders)
  }

  useEffect(() => {
    setFilterCustomer(
      order.filter((item) =>
        item.phonenumber.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, order]);
  return (
    <div>
      <Grid container>
        <Grid item xs={12} align="right">
          <form>
            <TextField
              id="outlined-basic"
              label="Search by phone"
              name="search"
              type="number"
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
              <TableCell>NO.</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell size="15">Address</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell>Status</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterCustomer.map((record, index) => {
              return (<TableRow key={index} hover>
                <TableCell>{index}</TableCell>
                <TableCell>{record.receiver}</TableCell>
                <TableCell>{record.phonenumber}</TableCell>
                <TableCell>{record.address}</TableCell>
                <TableCell>{record.message}</TableCell>
                <TableCell>{record.totalmoney}$</TableCell>
                <TableCell>{record.paymentmethod == "shipcode" ? "Ship Code" : "Card Pay"}</TableCell>
                <TableCell>{record.status}</TableCell>
                <TableCell>
                  <Button disabled={record.status === "Delivered" || record.status === "Canceled"} onClick={() => { setCurrentId(record.id); setOpen(true) }} variant="contained" color="secondary">
                    Cancel
              </Button>
                </TableCell>
              </TableRow>)
            })
            }
          </TableBody>
        </Table>
      </TableScrollbar>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <DialogTitle id="alert-dialog-title">{}</DialogTitle> */}
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to cancel this order?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            NO
          </Button>
          <Button onClick={cancelOrder} color="primary" autoFocus>
            YES
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
