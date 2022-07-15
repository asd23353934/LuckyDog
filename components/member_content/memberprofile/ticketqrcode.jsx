import imgNavigation from '../../../image/大專首頁圖庫/R.jpg';
import imgqrcode from '../../../qrcode.jpg';
import { useState } from 'react';
export default function Ticketqrcode(props){
    const [count,setcount] = useState(0);
    async function seatnumber(e){
        console.log(e.target.className);
        if(e.target.className === "add"){
            if(count === props.seat.length -1){
                setcount(0);
            }else{
                setcount(count + 1);
            }
        }
        if(e.target.className === "reduce"){
            if(count === 0){
                setcount(props.seat.length-1);
            }else{
                setcount(count - 1);
            }
        }
    }
    return(
        <div id="content" className="tab-content">
            <div className="tab-pane active" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                <button type="button" onClick={(e)=>{seatnumber(e)}} className="reduce"></button>
                <button type="button" onClick={(e)=>{seatnumber(e)}} className="add"></button> 
                <div id="down_image">
                    <img src={imgNavigation} alt=''/>
                <div id="down_content">
                    <div><p>2<span>樓</span></p></div>
                    <div><p>{props.ticket.theatersName}<span>廳</span></p></div>
                    <div><p>{props.seat[count]}<span>座</span></p></div>
                    <div><p>放映時間</p></div>
                    <div><p>{props.ticket.show_date} {props.ticket.show_time}</p></div>
                    <div><p>{props.ticket.movieName_CN}</p></div>
                </div>
            </div>
            <div id="down_qrcode">
                <p>第{count + 1}張,共{props.seat.length}張</p>
                <img src={imgqrcode} alt=''/>
                <p>請出示此畫面給服務人員核銷入場</p>
                </div>
            </div>
        </div>
    )
}