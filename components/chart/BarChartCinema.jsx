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






export function Cinema(props) {

    const labels = [];
    props.movie.map((elm,key)=>{
        if(key < 17){
            labels.push(elm.name_CN) ;
        }
    });
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
                text: `${props.cinemaName}`,
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
                        size: 24
                    }
                }

            }

        }
    };
    function salay(movieName) {
        // console.log(movieName, props.cinemaName);
        let seatNum = 0;
        let ticketNum ="";
        props.screen.map((elm) => {
          if (elm.cinemasName === props.cinemaName && elm.movieName_CN === movieName) {
            props.ticket.map((elm1) => {
                if (elm1.screen_id === elm.screen_id) {
                    ticketNum = elm1.seat_name.split(",").length;
                    seatNum += ticketNum * 250 ;
                }
            });
          }
        });
        return seatNum;
      }
    // console.log(props);
    const data = {
        labels,
        datasets: [
          {
            label: '電影總銷售額',
            data: labels.map((elm) => {return salay(elm)}),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
    };
    return <Bar options={options} data={data} />;
}
