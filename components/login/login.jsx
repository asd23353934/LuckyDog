// import "../../login.css";
import axios from "axios";
import './login.css';
export default function Login(){

    function handlelogin(e){
        e.preventDefault();
        let blockinput = document.querySelectorAll("#loginSection input");
        console.log(blockinput);
        let arr = [];
        blockinput.forEach((elm)=>{
            arr.push(elm.value);
        })
        console.log(arr);
        axios.get(`http://localhost/icedog/ajax/Controller.php?q=${arr[0]}&c=${arr[1]}&id=login`,{responseType:'json'}).then((response) => {
            if(response.data === false || response.data === null || response.data === ""){
                console.log("帳號或密碼錯誤");
                
            }else{
                sessionStorage.getItem('userInfo');
                sessionStorage.setItem('userInfo',JSON.stringify(response.data));
                console.log(sessionStorage.getItem('userInfo'));
                if(response.data.userName === 'zxcvb12345'){
                    document.location.href = 'http://localhost:3000/chart/home';
                }else{
                    document.location.href = `http://localhost:3000/?HI_${response.data.firstName}`;
                }
                
            }
        });
    }
    if(sessionStorage.getItem('userInfo')){
        document.location.href = "http://localhost:3000/";
    }
    return(
        <div id="loginSection"style={{width:"100%",margin:"15px 0 0 0",backgroundImage:"url(../../image/大專首頁圖庫/OIP.jpg)"}}>
            {/* <img src="../../image/movie_image/movie18.jpg" alt=""> */}
            {/* <div style={{background:"red",width:"35%",height:"80%"}}>
                123
                <img src="" alt="" />
            </div>
            <div style={{background:"blue",width:"35%",height:"80%"}}>
                {!sessionStorage.getItem('userInfo')?login:""}
            </div> */}
        <div className="color"></div>
        <div className="color"></div>
        <div className="color"></div>
        <div className="box">
            <div className="conta" >
                <div className="form">
                    <h2 style={{margin:"0 0 60px 0"}}>登入</h2>
                    <form>
                        <div className="inputBox">
                            <input type="text" placeholder="姓名"/>

                        </div>
                        <div className="inputBox">
                            <input type="password" placeholder="密碼"/>

                        </div>
                        <div className="inputBox">
                        <button type="submit" onClick={(e)=>{handlelogin(e)}}>登入</button>
                            
                        </div>
                        <p className="forget">沒有賬戶?<a href="#">
                                註冊
                            </a></p>
                    </form>
                </div>
            </div>
        </div>
            
        </div>
    )
}