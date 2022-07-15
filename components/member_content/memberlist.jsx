import { Link } from "react-router-dom";



export default function Memberlist(props) {
  console.log(props.param);
  function list(props) {
    if (props !== "") {
      let active = props;
      return (
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            {active === "account"?<Link className="nav-link" to="/user/account/home" style={{backgroundColor:"#783ee4",textAlign:"center",color:"black",borderRadius:"10px"}}>個人資訊</Link>:<Link className="nav-link" to="/user/account/home">個人資訊</Link>}
          </li>
          <li className="nav-item" role="presentation">
            {active === "profile"?<Link className="nav-link active"to="/user/profile/ticket" style={{backgroundColor:"#783ee4",textAlign:"center",color:"black",borderRadius:"10px"}}>我的票夾</Link>:<Link className="nav-link"to="/user/profile/ticket">我的票夾</Link>}
          </li>
          <li className="nav-item" role="presentation">
            {active === "messages"?<Link className="nav-link active"to={"/user/messages/record"} style={{backgroundColor:"#783ee4",textAlign:"center",color:"black",borderRadius:"10px"}}>消費紀錄</Link>:<Link className="nav-link"to={"/user/messages/record"}>消費紀錄</Link>}
          </li>
          <li className="nav-item" role="presentation">
            {active === "settings"?<Link className="nav-link active"to="/user/settings/cards" style={{backgroundColor:"#783ee4",textAlign:"center",color:"black",borderRadius:"10px"}}>信用卡夾</Link>:<Link className="nav-link"to="/user/settings/cards">信用卡夾</Link>}
          </li>
        </ul>
      )
    }
  }
  return (
    <div style={{marginTop:"150px"}}>{props !== "" ? list(props.param) : ""}</div>
  )
}
