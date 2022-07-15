import Ticketqrcode from "./ticketqrcode";
import { useState } from "react";
import axios from "axios";
export default function TicketContent(props) {
  const [qrcode, setqrcode] = useState("");
  const [cancel, setcancel] = useState("");
  function handqrcode(seat) {
    console.log(seat.split(","));
    setqrcode(seat.split(","));
    // setqrcode()
  }
  console.log(props);
  function handcancel(cancel){
    console.log(cancel.ticket_id);
    setcancel(cancel.ticket_id);
  }
  function deleteticke(e){
    axios.get(`http://localhost/icedog/ajax/Controller.php?id=ticket&q=${props.ticket.ticket_id}`).then((response) => {
        if(response.data){
          document.location.href = "http://localhost:3000/user/profile/ticket";
        }
    })
  }
  console.log(props.ticket);
  const cancelcheck = 
    <div id="content" className="tab-content">
        <div className="tab-pane active" id="profile" role="tabpanel" aria-labelledby="profile-tab">
            <div id="cancel_form">
                <div>確定後將全額退款</div>
                <button className="btn btn-primary" style={{left:"0"}} onClick={(e)=>{deleteticke(e)}}>確認取消</button>
            </div>
        </div>
    </div>
  ;
  const content = (
    <div id="content" className="tab-content">
      <div className="tab-pane active" id="profile" role="tabpanel" aria-labelledby="profile-tab">
        <div id="record" className="list-group">
          <p id="record_name" className="record-list-group-item-heading">
            <span>{props.ticket.categorysName}</span> {props.ticket.movieName_CN}
          </p>
          <div id="next_content">
            <p className="list-group-item-heading">
              上映場次
              <span id="date">{props.ticket.show_date} </span>
              <span>{props.ticket.show_time}</span>
            </p>
            <p className="list-group-item-heading">
              上映廳院
              <span id="cinemas">冰狗影城@</span>
              <span>{props.ticket.cinemasName}</span>
              <span>{props.ticket.theatersName}廳</span>
            </p>
            <p className="list-group-item-heading">
              電影分類
              <span id="categorys">{props.ticket.type}</span>
            </p>
            <p className="list-group-item-heading">
              票券張數
              <span id="categorys">{props.ticket.number}</span>
            </p>
            <p className="list-group-item-heading">
              劃位座號
              <span id="categorys">{props.ticket.seat_name}</span>
            </p>
            <p className="list-group-item-heading">
              餐點食物
              <span id="categorys">{props.ticket.foodAll}</span>
            </p>
            <p className="list-group-item-heading">
              付款金額
              <span id="categorys">{props.ticket.priceAll}</span>
            </p>
            <button id="download" style={{width:"106px"}} onClick={() => {handqrcode(props.ticket.seat_name);}} className="btn btn-primary">
              電子票下載
            </button>
            <button id="cancel" onClick={()=>{handcancel(props.ticket)}} className="btn btn-primary">
              取消訂單
            </button>
          </div>
        </div>
        </div>
    </div>
  );
  return (
        <div>
            {qrcode === "" && cancel === ""? content : ""}
            {qrcode && cancel === ""?<Ticketqrcode ticket={props.ticket} seat={qrcode}/>:""}
            {cancel === ""?"":cancelcheck}
        </div>
  );
}
