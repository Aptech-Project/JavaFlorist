import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from 'react-chartjs-2';

function DashboardChart({ orderList }) {
    //const [orderList, setOrderList] = useState([]);

    const [dataForChart, setDataForChart] = useState([]);
    // useEffect(()=>{
    //     axios.get('http://localhost:5000/api/Orders')
    //     .then(function (response) {
    //       //console.log(response);
    //       setOrderList([...response.data]);
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     })
    //   },[])

    useEffect(() => {
        console.log(orderList);
        let Feb = 0, Apr = 0, Jun = 0, Aug = 0, Oct = 0, Dec = 0;
        let dataChart = [];
        if (orderList.length !== 0) {
            orderList.map((orderItem) => {
                const countYear = new Date(orderItem.deliverydate);
                const thisYear = new Date().getFullYear();
                if (countYear.getFullYear() === thisYear) {
                    switch (countYear.getMonth()) {
                        case 1:
                            Feb = Feb + orderItem.totalmoney
                            break;
                        case 3:
                            Apr = Apr + orderItem.totalmoney
                            break;
                        case 5:
                            Jun = Jun + orderItem.totalmoney
                            break;
                        case 7:
                            Aug = Aug + orderItem.totalmoney
                            break;
                        case 9:
                            Oct = Oct + orderItem.totalmoney
                            break;
                        case 11:
                            Dec = Dec + orderItem.totalmoney
                            break;
                        default:
                            break;
                    }
                }
            })
        }
        dataChart.push(Feb, Apr, Jun, Aug, Oct, Dec)
        //console.log(dataChart);
        setDataForChart([...dataChart])
    }, [orderList])
    //For LineChart
    const dataLine = {
        labels: ['Feb', 'Apr', 'Jun', 'Aug', 'Oct', 'Dec'],
        datasets: [
            {
                label: "Revenue",
                fill: false,
                data: dataForChart,
                borderColor: ["rgba(153, 102, 255, 0.8)"],
                backgroundColor: ["rgba(153, 102, 255, 0.8)"],
                pointbackgroundColor: "rgba(153, 102, 255, 0.8)",
                pointborderColor: "rgba(153, 102, 255, 0.8)",
            },
        ],
    };
    const optionsLine = {
        title: {
            display: true,
        },
    };
    return (
        <div>
            <Line data={dataLine} options={optionsLine} />
        </div>
    );
}

export default DashboardChart;