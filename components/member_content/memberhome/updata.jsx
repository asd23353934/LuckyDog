import axios from "axios";
// import { Navigate } from "react-router-dom";
import { useState} from "react";
export default function Updata(props) {
  console.log(props.users.password);
  const [contentValue1,setcontentValue1] = useState("");
    const[contentValue2,setcontentValue2] = useState("");
    function updataUser(id,Value1,Value2,userName) {
        axios.get(`http://localhost/icedog/ajax/Controller.php?q=${Value1}&c=${Value2}&d=${userName}&id=${id}`,{responseType:'json'}).then((response) => {
            console.log(response.data);
            if(response.data){
                sessionStorage.getItem('userInfo');
                sessionStorage.setItem('userInfo',JSON.stringify(response.data));
                console.log(sessionStorage.getItem('userInfo'));
                document.location.href = "http://localhost:3000/user/account/home";
            }
        });
    }
    function firstChange(e){
        e.preventDefault();
        console.log(e.target.value);
        setcontentValue1(e.target.value);
    }
    function lastChange(e){
        e.preventDefault();
        console.log(e.target.value);
        setcontentValue2(e.target.value);
    }
    function ok(e){
        e.preventDefault();
        updataUser(props.id,contentValue1,contentValue2,props.users.userName);
    }
    function preventBubble(e) {
        if (e.key === "Enter") {
            e.preventDefault();
        }
    }
  const CH = {
    name: (
      <form id="change">
        <p id="name">姓</p>
        <input type="text" name="firstName" onChange={(e)=>firstChange(e)} onKeyDown={(e) => { preventBubble(e) }} id="firstName_input"></input>
        <p id="name">名字</p>
        <input type="text" name="lastName" onChange={(e)=>{lastChange(e)}} onKeyDown={(e) => { preventBubble(e) }} id="lastName_input"></input>
        
      </form>
    ),
    email: (
      <form id="change">
        <p id="name">email</p>
        <input type="text" name="email" onChange={(e)=>firstChange(e)} onKeyDown={(e) => { preventBubble(e) }} id="email_input"></input>
      </form>
    ),
    phone: (
      <form id="change">
        <p id="name">phone</p>
        <input type="text" name="phone" onChange={(e)=>firstChange(e)} onKeyDown={(e) => { preventBubble(e) }} id="phone_input"></input>
      </form>
    ),
    password: (
      <form id="change">
        <p id="name">password</p>
        <input type="text" name="password" onChange={(e)=>firstChange(e)} onKeyDown={(e) => { preventBubble(e) }} id="password_input"></input>
      </form>
    ),
  };

  return (
    <div>
      {CH[props.id]}
      <button type="button" className="btn btn-primary" onClick={(e)=>{ok(e)}} value="確認更改">確認更改</button>
    </div>
  );
}
