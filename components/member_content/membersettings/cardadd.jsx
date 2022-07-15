import axios from "axios";
import { useState } from "react";
export default function Cardadd(props){
    const [bankName,setbankName] = useState([]);
    const [cardName,setcardName] = useState([]);
    const [cardDate,setcardDate] = useState([]);
    const [userName,setuserName] = useState([]);

    console.log(props.users);
    function inputcontent(e){
        console.log(e.target.className,e.target.value);
        if(e.target.className === "form-control bankName"){
            console.log(123);
            setbankName(e.target.value);
        }
        if(e.target.className === "form-control cardName"){
            let a = Array.from(e.target.value.split(" ").join(""));
            let j = 4;
            for (var i = 0; i < a.length; i++) {
                if (i === j) {
                    j += 5;
                    a.splice(i, 0, " ");
                }
            }
            var b = a.join("");
            e.target.value = b;
            setcardName(e.target.value);
        }
        if(e.target.className === "form-control cardDate"){
            let a = Array.from(e.target.value.split("/").join(""));
            let q = 4;
            for (var c = 0; c < a.length; c++) {
                if (c === q) {
                    q += 5;
                    a.splice(c, 0, "/");
                }
            }
            var d = a.join("");
            e.target.value = d;
            setcardDate(e.target.value);
        }
        if(e.target.className === "form-control safePassword"){
            console.log(123);
        }
        if(e.target.className === "form-control userName"){
            console.log(123);
            setuserName(e.target.value);
        }
    }

    function Prevent(e){
        if(e.key === "Enter"){
            e.preventDefault();
        }
    }

    function submit(e){
        e.preventDefault();
        console.log(bankName,cardName,cardDate,userName);
        var arr = Array.from(cardDate);
        console.log(arr.slice(0,4).join("") , arr.slice(5,7).join(""));
        let all = [bankName,cardName,arr.slice(0,4).join(""),arr.slice(5,7).join(""),userName,props.users.user_id];
        console.log(all);
        axios.get(`http://localhost/icedog/ajax/Controller.php?q=${all}&id=card_add`).then((response) => {
            console.log(response.data);
            if(response.data){
                document.location.href = "http://localhost:3000/user/settings/cards";
            }
        });
    }

    return(
        <form style={{color:"black",width:"80%",margin:"0 auto",marginTop:"15px"}}>
        <div className="form-group">
            <label htmlFor="exampleInputEmail1" style={{fontSize:"25px"}}>銀行名稱</label>
            <input style={{width:"50%"}} type="text" autoComplete="off" onChange={(e)=>{inputcontent(e)}} onKeyDown={(e)=>{Prevent(e)}} placeholder="中國信託" className="form-control bankName" />
        </div>
        <div className="form-group">
            <label htmlFor="exampleInputEmail1" style={{fontSize:"25px"}}>信用卡號碼</label>
            <input style={{width:"30%"}} type="text" autoComplete="off" maxLength={19} onChange={(e)=>{inputcontent(e)}} onKeyDown={(e)=>{Prevent(e)}} placeholder="1234 1234 1234 1234" className="form-control cardName" />
        </div>
        <div className="form-group">
            <label htmlFor="exampleInputPassword1" style={{fontSize:"25px"}}>信用卡到期日</label>
            <input style={{width:"13.1%"}} type="text" autoComplete="off" maxLength={7} onChange={(e)=>{inputcontent(e)}} onKeyDown={(e)=>{Prevent(e)}} placeholder="MM/YY" className="form-control cardDate" />
        </div>
        <div className="form-group">
            <label htmlFor="exampleInputPassword1" style={{fontSize:"25px"}}>安全驗證碼</label>
            <input style={{width:"9%"}} type="text" autoComplete="off" maxLength={3} onChange={(e)=>{inputcontent(e)}} onKeyDown={(e)=>{Prevent(e)}} placeholder="XXX" className="form-control safePassword" />
        </div>
        <div className="form-group">
            <label htmlFor="exampleInputPassword1" style={{fontSize:"25px"}}>持卡名字</label>
            <input style={{width:"50%"}} type="text" autoComplete="off"  placeholder="持卡名字" onChange={(e)=>{inputcontent(e)}} onKeyDown={(e)=>{Prevent(e)}} className="form-control userName" />
        </div>
        <button type="submit" onClick={(e)=>{submit(e)}} className="btn btn-primary">Submit</button>
    </form>
    )
}