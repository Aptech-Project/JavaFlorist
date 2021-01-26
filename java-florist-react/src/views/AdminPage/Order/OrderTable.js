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
    GetAllOrder,
    deleteOrder,
    confirmRevOrder
} from '../../../actions/order.action';
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
    let orders = useSelector(state => state.order.allOrder);//get from root reducer
    const [search, setSearch] = useState("")
    const [filterCustomer, setFilterCustomer] = useState([])
    const [open, setOpen] = useState(false);
    const [openConfirm , setOpenConfirm] = useState(false);
    let [order, setOrder] = useState([])

    useEffect(() => {
        dispatch(GetAllOrder())
        setOrder(orders)
        // setCategories(allCategories)
    }, [orders == order == [],]);

    useEffect(() => {
        setFilterCustomer(
            order.filter((item) =>
                item.phonenumber.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, order]);
 function handleClose() {
     setOpen(false);
     setOpenConfirm(false);
    };
     async function ConfirmRev() {
    await dispatch(confirmRevOrder(currentId))
    handleClose()
    await dispatch(GetAllOrder())
    await setOrder(orders)
  }
  async function cancelOrder() {
    await dispatch(deleteOrder(currentId))
    handleClose()
    await dispatch(GetAllOrder())
    await setOrder(orders)
  }
    return (
        <div>
            <Grid container>
                <Grid item xs={12} align="right">
                    <form>
                        <TextField
                            id="outlined-basic"
                            label="Search by phone"
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
            <TableScrollbar rows={20}>
                <Table size="small" stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell >NO.</TableCell>
                            <TableCell >Name</TableCell>
                            <TableCell >Phone</TableCell>
                            <TableCell >Address</TableCell>
                            <TableCell  style={{ maxWight: 200 }}>Message</TableCell>
                            <TableCell >Note</TableCell>
                            <TableCell >Payment</TableCell>
                            <TableCell >Status</TableCell>
                            <TableCell ></TableCell>
                            <TableCell ></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filterCustomer.map((record, index) => {
                            return (<TableRow key={index} hover>
                                <TableCell size="small">{index}</TableCell>
                                <TableCell size="small">{record.receiver}</TableCell>
                                <TableCell size="small">{record.phonenumber}</TableCell>
                                <TableCell size="small">{record.address}</TableCell>
                                <TableCell size="small">{record.message}</TableCell>
                                <TableCell size="small">{record.note}</TableCell>
                                <TableCell size="small">{record.paymentmethod == "shipcode" ? "Ship Code" : "Card Pay"}</TableCell>
                                <TableCell size="small">{record.status}</TableCell>
                                <TableCell>
                                    <Button disabled={record.status === "Delivered" || record.status === "Canceled" || record.paymentmethod !== "shipcode"} onClick={() => { setCurrentId(record.id); setOpenConfirm(true) }} variant="contained" color="secondary">
                                        Delivery
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button disabled={record.status === "Delivered" || record.status === "Canceled" || record.paymentmethod !== "shipcode"} onClick={() => { setCurrentId(record.id); setOpen(true) }} variant="contained" color="secondary">
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
            <Dialog
                open={openConfirm}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {/* <DialogTitle id="alert-dialog-title">{}</DialogTitle> */}
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to confirm delivery this order?
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        NO
          </Button>
                    <Button onClick={ConfirmRev} color="primary" autoFocus>
                        YES
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
