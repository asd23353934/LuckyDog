import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);






export function Home(props) {

  const labels = [];
  props.cinema.map((elm, key) => {
    // console.log(elm);
    if (key < 5) {
      labels.push(elm.name);
    } else {
      labels.push("");
    }

  })
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: "black",
          font: {
            size: 20
          }
        }
      },
      title: {
        display: true,
        text: props.param==="ticketNum"?"影城電影總額":props.param==="salayAll"?"影城總營業額":props.param === "foodSalay"?"影城食物總額":"",
        font: {
          size: 20
        }
      },

    },
    scales: {
      x: {
        ticks: {
          color: "black",
          font: {
            size: 20
          }
        }

      }

    }
  };
  // console.log(props);
  function ticketNum(cinemaName,cinema_key){
    let num = 0;
    if(props.param==="ticketNum" || props.param==="salayAll"){
      props.screen.map((elm)=>{
        if(elm.cinemasName === cinemaName){
          props.ticket.map((elm1)=>{
            if(elm.screen_id === elm1.screen_id){
              let arr = elm1.seat_name.split(",").length;
              // console.log(arr);
              if(props.param==="ticketNum"){
                num += arr ;
              }
              if(props.param==="salayAll"){
                // console.log(props.foodPrice[cinema_key]);
                num += arr * 250;
              }
            }
          });
        }
      });
    }
    if(props.param === "foodSalay"){
      if(props.foodPrice[cinema_key] !== undefined){
        return props.foodPrice[cinema_key];
      }
    }
    
    if(props.param==="ticketNum"){
      return num * 250 ;
    }
    if(props.param==="salayAll"){
      return num + props.foodPrice[cinema_key]*1;
    }

  }

  const data = {
    labels,
    datasets: [
      {
        label: props.param==="ticketNum"?"銷售額":props.param==="salayAll"?"總銷售額":props.param === "foodSalay"?"銷售額":"",
        data: labels.map((elm,key) => {return ticketNum(elm,key)}),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  return <Bar options={options} data={data} />;


}
