import axios from "axios";
import "../../register.css";

export default function Register(){

    
    function registerOk(e){
        e.preventDefault();
        let all = document.querySelectorAll("#loginSection input");
        let arr = [];
        all.forEach((elm)=>{
            // console.log(elm.value);
            arr.push(elm.value);
        })
        axios.get(`http://localhost/icedog/ajax/Controller.php?q=${arr}&id=register`).then((response) => {
            if(response.data){
            //   console.log(response.data);
              document.location.href = "http://localhost:3000/login/home";
            }
        });
    }
    function formReset(e){
        e.preventDefault();
        document.getElementById("registerBlock").reset();
    }
    if(sessionStorage.getItem('userInfo')){
        document.location.href = "http://localhost:3000/";
    }
    const register =
    <form id="registerBlock">
        <div>
            <label id="userNameLabel" htmlFor="userName">帳號</label>
            <input type="text" placeholder="UserName" id="userName"/>
        </div>
        <div>
            <label id="passWordLabel" htmlFor="passWord">密碼</label>
            <input type="text" placeholder="PassWord" id="passWord"/>
        </div>
        <div>
            <label id="firstNameLabel" htmlFor="firstName">姓</label>
            <input type="text" placeholder="firstName" id="firstName"/>
        </div>
        <div>
            <label id="lastNameLabel" htmlFor="lastName">名</label>
            <input type="text" placeholder="lastName" id="lastName"/>
        </div>
        <div>
            <label id="mailLabel" htmlFor="mail">信箱</label>
            <input type="text" placeholder="mail" id="mail"/>
        </div>
        <div>
            <label id="phoneNumberLabel" htmlFor="phoneNumber">手機號碼</label>
            <input type="text" placeholder="phoneNumber" id="phoneNumber"/>
        </div>
        <div id="btnGroup">
            <button type="submit" onClick={(e)=>{registerOk(e)}}>註冊</button>
            <button onClick={(e)=>{formReset(e)}}>重設</button>
        </div>
</form>
    return(
        <div id="loginSection" style={{background:"black"}}>
        {/* <img src="../../image/movie_image/movie18.jpg" alt=""> */}
        {/* {!sessionStorage.getItem('userInfo')?register:""} */}
        <div className="color"></div>
        <div className="color"></div>
        <div className="color"></div>
        <div className="box">
            <div className="conta"  style={{top:"0"}}>
                <div className="form">
                    <h2 style={{margin:"0 0 60px 0"}}>註冊</h2>
                    <form>
                        <div className="inputBox">
                            <input type="text" placeholder="帳號"/>
                        </div>
                        <div className="inputBox">
                            <input type="password" placeholder="密碼"/>
                        </div>
                        <div className="inputBox">
                            <input type="text" placeholder="姓"/>
                        </div>
                        <div className="inputBox">
                            <input type="text" placeholder="名"/>
                        </div>
                        <div className="inputBox">
                            <input type="text" placeholder="信箱"/>
                        </div>
                        <div className="inputBox">
                            <input type="text" placeholder="電話"/>
                        </div>
                        <div className="inputBox">
                            <button type="submit" onClick={(e)=>{registerOk(e)}}>註冊</button>
                            <button style={{margin:"0 0 0 75px"}} onClick={(e)=>{formReset(e)}}>重設</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    )
}