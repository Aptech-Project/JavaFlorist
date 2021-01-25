// import React, { useState, useEffect } from "react";
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import { ButtonGroup, Button, Grid } from "@material-ui/core";
// import EditIcon from "@material-ui/icons/Info";
// import DeleteIcon from "@material-ui/icons/Delete";
// import { connect } from "react-redux";
// import { TextField } from "@material-ui/core";
// import TableScrollbar from 'react-table-scrollbar';
// import { Modal } from "react-bootstrap";
// import * as actions from "../../actions/customer.action";
// import {
//     GetOrder
// } from '../../actions/order.action';
// // import CustomerDetail from "./CustomerDetail"
// import { useSelector, useDispatch } from 'react-redux';
// import InputAdornment from '@material-ui/core/InputAdornment';
// import Search from '@material-ui/icons/Search';

// export default function OrderTable() {

//     const dispatch = useDispatch()
//     const [currentId, setCurrentId] = useState(0)
//     const [customer, setCustomer] = useState([])
//     let allCustomer = useSelector(state => state.customer.list);
//     const [search, setSearch] = useState("")
//     const [filterCustomer, setFilterCustomer] = useState([])
//     const SET_USER_AUTHENTICATE = 'user_authenticated';
//     const userAuth = localStorage.getItem(SET_USER_AUTHENTICATE);
//     // let orders = useSelector(state => state.order.Orders);//get from root reducer
//     // console.log("order")
//     // console.log(order)
//     // let [order, setOrder] = useState([])
//     // useEffect(() => {
//     //     dispatch(GetOrder(userAuth))
//     //     setOrder(orders)
//     // }, [orders == order == []]);
//     useEffect(() => {
//         dispatch(actions.fetchAll());
//     }, [])//componentDidMount

//     useEffect(() => {
//         dispatch(actions.fetchAll())
//         setCustomer(allCustomer)
//         // setCategories(allCategories)
//     }, [allCustomer == customer == [],]);

//     const [show, setShow] = useState(false);

//     const handleClose = () => setShow(false);

//     useEffect(() => {
//         setFilterCustomer(
//             customer.filter((customers) =>
//                 customers.name.toLowerCase().includes(search.toLowerCase())
//             )
//         );
//     }, [search, customer]);
//     const renderTable = () => {
//         return (
//             <TableBody>
//                 {filterCustomer.map((record, index) => {
//                     return (<TableRow key={index} hover>
//                         <TableCell>{record.name}</TableCell>
//                         <TableCell>{record.username}</TableCell>
//                         <TableCell>{record.email}</TableCell>
//                         <TableCell>{record.address}</TableCell>
//                         <TableCell>{record.birthday}</TableCell>
//                         <TableCell>{record.phonenumber}</TableCell>
//                         <TableCell>
//                             <ButtonGroup variant="text">
//                                 <Button><EditIcon color="primary" onClick={() => { setCurrentId(record.id); setShow(true) }} /></Button>
//                             </ButtonGroup>
//                         </TableCell>
//                         {/* <Modal show={show} onHide={() => setShow(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered> */}
//                         <Modal show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
//                             <Modal.Header>
//                                 <Modal.Title><h4 style={{ fontWeight: 'bold', color: '#0a7cdb' }}>USER INFORMATION</h4></Modal.Title>
//                             </Modal.Header>
//                             <Modal.Body >
//                                 {/* <CustomerDetail {...({ currentId, setCurrentId })} /> */}
//                             </Modal.Body>
//                             <Modal.Footer>
//                                 <Button variant="outlined" color="secondary" onClick={handleClose}>Close</Button>
//                             </Modal.Footer>
//                         </Modal>
//                     </TableRow>)
//                 })
//                 }
//             </TableBody>
//         )
//     }
//     return (
//         <div>
//             <Grid container>
//                 <Grid item xs={12} align="right">
//                     <form>
//                         <TextField
//                             id="outlined-basic"
//                             label="Search by name"
//                             name="search"
//                             variant="outlined"
//                             size="small"
//                             onChange={e => setSearch(e.target.value)}
//                             InputProps={{
//                                 startAdornment: (
//                                     <InputAdornment position="start">
//                                         <Search />
//                                     </InputAdornment>
//                                 ),
//                             }}
//                         />&nbsp;
//                     </form>
//                 </Grid>
//             </Grid>
//             <br />
//             <TableScrollbar rows={15}>
//                 <Table size="small" stickyHeader aria-label="sticky table">
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>Name</TableCell>
//                             <TableCell>Username</TableCell>
//                             <TableCell>Email</TableCell>
//                             <TableCell>Address</TableCell>
//                             <TableCell>Birthday</TableCell>
//                             <TableCell>Phone Number</TableCell>
//                             <TableCell></TableCell>
//                         </TableRow>
//                     </TableHead>
//                     {renderTable()}
//                 </Table>
//             </TableScrollbar>
//         </div>
//     );
// }
