import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from '@material-ui/data-grid';

export default function DataTable({orderList}) {
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

    useEffect(()=>{
        if (orderList.length !== 0) {
            orderList.map((orderItem)=>{
                const rowObj = {
                    userid: orderItem.userid,
                    email: orderItem.email,
                    lastName: orderItem.lastName,
                    deliverydate: orderItem.deliverydate,
                    address: orderItem.address,
                    paymentmethod: orderItem.paymentmethod,
                    totalmoney: orderItem.totalmoney
                }
                rows.push(rowObj)
            })
            console.log(rows);
        }
    },[orderList])

    const columns = [
        { field: 'userid', headerName: 'ID', width: 70 },
        { field: 'email', headerName: 'Email', width: 130 },
        { field: 'lastName', headerName: 'Last name', width: 130 },
        { field: 'deliverydate', headerName: 'Delivery Date', width: 130 },
        { field: 'address', headerName: 'Address', width: 130 },
        { field: 'paymethod', headerName: 'Payment Method', width: 130 },
        { field: 'totalmoney', headerName: 'Amount', width: 130 },
    ];
    const rows = [];
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5}/>
    </div>
  );
}