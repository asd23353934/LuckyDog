import axios from "axios";
import { useEffect, useState } from "react";
import List from "./list";
export default function Page5(props) {
    console.log(props.users);
    const [card, setcard] = useState([]);
    useEffect(() => {
        if (props.users.user_id !== '') {
            getUsers();
        }
    }, [props.users.user_id]);

    function getUsers() {
        axios.get(`http://localhost/icedog/ajax/Controller.php?q=${props.users.user_id}&id=card`, { responseType: "json" }).then((response) => {
            if (response.data !== false) {
                console.log(response.data);
                let option = response.data.map((elm,key)=><option key={key} value={`${elm.account},${elm.year}/${elm.month}`}>{elm.account}</option>);
                setcard(option);
            } else {
                console.log("沒銀行");
            }
        });
    }
    function changeCard(e){
        console.log(e.target.value);
        let arr = e.target.value.split(',');
        console.log(arr);
        let name = document.querySelector('.cardName');
        name.value = arr[0];
        let date = document.querySelector('.cardDate');
        date.value = arr[1];
    }
    function okBuy(e){
        
        e.preventDefault();
        let set = props.seat.split(',').join(" ");
        let foo = props.foodName.split(',').join(" ");
        let arr = [props.users.user_id,null,`${set}`,foo,`${props.foodPrice*1+props.price*1}`,`${props.number}`];
        props.screen.map((elm)=>{
            if(elm.categorysName === props.categorysName && elm.cinemasName === props.cinema && elm.movieName_CN === props.movieName && elm.show_date === props.date && elm.show_time === props.time){
                arr[1] = elm.screen_id;
            }
        });
        console.log(arr);
        if(arr[1] !== null){
            axios.get(`http://localhost/icedog/ajax/Controller.php?q=${arr}&id=movie_ticket_add`).then((response) => {
                if (response.data !== false) {
                    console.log(response.data);
                    document.location.href = 'http://localhost:3000/user/profile/ticket';
                } else {
                    console.log("輸入錯誤");
                }
            });
        }else{
            console.log("沒有這張票");
        }
    }
    return (
        <div style={{height:"600px"}}>
            <form style={{width:"65%"}}>
            <div className="powerwidget cold-grey">
              <header>
                <h2>確認付款</h2>
              </header> 
            </div>
                <p>請檢查訂票內容無誤後，輸入信用卡背面簽名欄「最後3碼檢核碼」作為刷卡驗證，並按 [確認] 鈕完成結帳作業。</p>
                <div>
                    <ul>
                        <li>
                            <h5>個人姓名
                                <strong>{props.users.firstName}{props.users.lastName}</strong>
                            </h5>
                        </li>
                    </ul>
                    <div>
                        <select onChange={(e)=>{changeCard(e)}}>
                            <option>選擇您的信用卡</option>
                            {card?card:""}
                        </select>
                        <div style={{padding:' 0 0 0 15px'}}>
                            <label htmlFor="textinput">信用卡卡號:</label>
                            <div style={{margin:' 0 0 0 -10px'}}>
                                <input type="text"  maxLength="11" className='cardName' />
                            </div>
                            <dd>有效日期:</dd>
                            <div style={{margin:' 0 0 0 -10px'}}>
                                <input type="text"  maxLength="7" className='cardDate' />
                            </div>
                            <dd>安全驗證碼</dd>
                            <div style={{margin:' 0 0 0 -10px'}}>
                                <input type="text"  maxLength="3" name='' />
                            </div>
                        </div>
                        總共{props.foodPrice*1 + props.price * 1}元<br />
                        <button className="btn btn-info" style={{color:"black"}} onClick={(e)=>{okBuy(e)}}>確認購買</button>
                    </div>
                </div>
            </form>
            <List cinema={props.cinema} 
                  price={props.price} 
                  number={props.number} 
                  categorysName={props.categorysName} 
                  movieName={props.movieName} 
                  movieinfo={props.movieinfo} 
                  date={props.date} 
                  time={props.time} 
                  seat={props.seat} 
                  foodName={props.foodName}
                  foodPrice={props.foodPrice}
                  />
        </div>
    )
}