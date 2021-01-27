import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from '@material-ui/data-grid';

export default function DataTable({ orderList }) {
  const [rows, setRows] = useState([]);
  // const [orderList, setOrderList] = useState([]);

  // useEffect(()=>{
  //     axios.get('http://localhost:5000/api/Orders')
  //     .then(function (response) {
  //       console.log(response);
  //       setOrderList([...response.data]);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     })
  //   },[])

  useEffect(() => {
    console.log(orderList);
    let rowsCop = [...rows];
    if (orderList.length !== 0) {
      orderList.map((orderItem, index) => {
        const rowObj = {
          id: index,
          userid: orderItem.userid,
          email: orderItem.email,
          receiver: orderItem.receiver,
          date: orderItem.date,
          address: orderItem.address,
          paymentmethod: orderItem.paymentmethod,
          totalmoney: orderItem.totalmoney
        }
        rowsCop.push(rowObj)
        console.log(orderList);
      })
      setRows([...rowsCop]);
      console.log(rows);
    }
  }, [orderList])

  const columns = [
    { field: 'userid', headerName: 'ID', width: 70 },
    { field: 'email', headerName: 'Email', width: 130 },
    { field: 'receiver', headerName: 'Receiver', width: 130 },
    { field: 'date', headerName: 'Date', width: 130 },
    { field: 'address', headerName: 'Address', width: 130 },
    { field: 'paymentmethod', headerName: 'Payment Method', width: 130 },
    { field: 'totalmoney', headerName: 'Amount', width: 130 },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </div>
  );
}