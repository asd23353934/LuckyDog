import axios from "axios";
import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
export default function Memberhome(props) {
  // const [users, setusers] = useState([]);
  // const [usersImage, setusersImage] = useState([]);
let image_change = document.getElementById("image_change");
function inputImage(e){
  console.log(e.target.files[0]);
  let file = e.target.files[0];
  let formData = new FormData();
  formData.append("image",file);
  console.log(props.users.userName);
  axios.post(`http://localhost/icedog/ajax/Controller.php?d=${props.users.userName}`,formData).then((response) => {
    if(response.data){
      // console.log(response.data);
      document.location.href = "http://localhost:3000/user/account/home";
    }
  });
}
  return (
    <div className="tab-pane active" id="home" role="tabpanel" aria-labelledby="home-tab" >
      <div className="row">
        <p id="name">
          姓<span id="firstName">{props.users.firstName}</span>
          名字
          <span id="lastName">{props.users.lastName}</span>
        </p>
      </div>
      <Link className="btn btn-primary" to={"../user/account/name"}>
        變更
      </Link>
      <div className="row">
        <p id="name">
          Email
          <span id="email">{props.users.email}</span>
        </p>
      </div>
      <Link className="btn btn-primary" to={"../user/account/email"}>
        變更
      </Link>
      <div className="row">
        <p id="name">
          手機號碼
          <span id="phone">{props.users.phone}</span>
        </p>
      </div>
      <Link className="btn btn-primary" to={"../user/account/phone"}>
        變更
      </Link>
      <div className="row">
        <p id="name">
          密碼
          <span id="password">{props.users.password}</span>
        </p>
      </div>
      <Link className="btn btn-primary" to={"../user/account/password"}>
        變更
      </Link>
      <div className="text-center">
        {props.image !== null?<img src={props.image} alt="" />:<img src={require('../../../userPhoto.jpeg')} alt=""/>}
      </div>
      <input id="image_change" type="file" accept=".jpg,.jpeg,.png" onInput={(e)=>{inputImage(e)}} hidden></input>
      <button id="File_image" className="image btn btn-primary" onClick={()=>{image_change.click()}}>變更大頭貼</button>
    </div>
  );
}
