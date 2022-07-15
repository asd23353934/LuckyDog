import { Link , parsePath, useParams} from "react-router-dom";
import { useState , useEffect } from "react";
import List from "./list";
import Page2 from "./page2";
import Page3 from "./page3";
import Page4 from "./page4";
import Page5 from "./page5";
import './style/booking.css';
import './style/seat.css';
export default function Booking(props) {
    const param = useParams("");
    useEffect(()=>{
        if(window.location.href.indexOf('?') !== -1){
            console.log(window.location.href.indexOf('?'));
            let get = parsePath(window.location.href.split('?')[1]);
            let arr = get.pathname.split('&');
            console.log(arr);
            let list = arr.reduce((tar,key)=>{
                console.log(key);
                let dec = key.split('=');
                tar[dec[0]] = decodeURI(dec[1]);
                return tar;
            },{});
            console.log(list);
            if(list.price !== "" && list.price !== undefined){
                console.log(list.price);
                setprice(list.price);
            }
            if(list.number !== "" && list.number !== undefined){
                console.log(list.number);
                setnumber(list.number);
            }
            if(list.seatName !== "" && list.seatName !== undefined){
                setseatName(list.seatName);
            }
            if(list.foodName !=="" && list.foodName !== undefined){
                setfoodName(list.foodName);
            }
            if(list.foodPrice !== "" && list.foodPrice !== undefined){
                setfoodPrice(list.foodPrice);
            }
            if(list.theater !== "" && list.theater !== undefined){
                setcinema(list.theater);
            }
            if(list.seatdata !== "" && list.seatdata !== undefined){
                if(seatName === ""){
                    let set = list.seatdata.split(",");
                    if(list.seatdata){
                        set.map((elm,key)=>{
                            if(elm === ""){
                                set.splice(key,1);
                            }
                        });
                        set = set.join(",");
                        console.log(set);
                        setseatName(set);
                    }
                }

            }
            if(list.movie !== "" && list.movie !== undefined){
                console.log(list.movie);
                setmovie(list.movie.split(","));
            }

            if(list.time !== "" && list.time !== undefined){
                settimeCH(list.time);
            }
            if(list.date !== "" && list.date !== undefined){
                setdateCH(list.date);
            }
        }
    },[param.id]);
    
    console.log(props.screen);
    console.log(props.cinema);
    console.log(props.movie);
    const [cinema,setcinema] = useState("");//影廳名字
    const [movieall , setmovieall] = useState("");//電影option
    const [movie,setmovie] = useState("");//電影播放類型+電影名字
    const [movieinfo,setmovieinfo] = useState([]);//電影資訊
    const [date,setdate] = useState([]);//日期option
    const [dateCH,setdateCH] = useState("");//日期資訊
    const [time,settime] = useState("");//時間option
    const [timeCH,settimeCH] = useState("");//時間資訊
    const [number,setnumber] = useState("");//張數
    const [price,setprice] = useState("");//價錢
    const [seatName , setseatName] = useState("");//座位
    const [foodName,setfoodName] = useState("");//食物數量
    const [foodPrice,setfoodPrice] = useState("");//食物價格
    const [limitNum,setlimitNum] = useState(0);
    let cin = props.cinema.map((elm,key)=>{
        return cinema === ""?<option key={key} value={elm.name}>{elm.name}</option>:<option selected key={key} value={elm.name}>{elm.name}</option>
    });
    let arr = [];
    let mov = props.screen.map((elm,key)=>{
        if(!arr.includes(`(${elm.categorysName})${elm.movieName_CN}`) && elm.cinemasName === movie[1]){
            arr.push(`(${elm.categorysName})${elm.movieName_CN}`);
            return(
                <option key={key} value={`${elm.categorysName},${elm.movieName_CN}`}>{`(${elm.categorysName})${elm.movieName_CN}`}</option>
            )
        }
    });
    console.log(param);
    function changeCin(e){
        console.log(e.target.value);
        setcinema(e.target.value);
        let arr = [];
        let mov = props.screen.map((elm,key)=>{
            if(!arr.includes(`(${elm.categorysName})${elm.movieName_CN}`) && elm.cinemasName === e.target.value){
                arr.push(`(${elm.categorysName})${elm.movieName_CN}`);
                return(
                    <option key={key} value={`${elm.categorysName},${elm.movieName_CN}`}>{`(${elm.categorysName})${elm.movieName_CN}`}</option>
                )
            }
        });
        settime("");
        setdate("");
        setmovie("");
        settimeCH("");
        setmovieall(mov);
    };
    console.log(movie);        
    function changeMov(e){
        let moviearr = e.target.value.split(",");
        props.movie.map(elm=>{
            if(elm.name_CN === moviearr[1]){
                console.log(elm);
                setmovieinfo(elm);
            }
        });
        setmovie(moviearr);
        let arr = [];
        let src = props.screen.map((elm,key)=>{
            if(elm.cinemasName === cinema && elm.categorysName === moviearr[0] && elm.movieName_CN === moviearr[1] && !arr.includes(elm.show_date)){
                arr.push(elm.show_date);
                return(
                    <option key={key} value={elm.show_date}>{elm.show_date}</option>
                )
            }
        });
        settime("");
        settimeCH("");
        setdate(src);
    }
    function changedate(e){
        console.log(e.target.value);
        setdateCH(e.target.value);
        let tim = props.screen.map((elm,key)=>{
            if(elm.categorysName === movie[0] && elm.cinemasName === cinema && elm.movieName_CN === movie[1] && elm.show_date === e.target.value){
                let num = 0;
                props.ticket.map((elm1)=>{
                    if(elm.screen_id === elm1.screen_id){
                        if(elm1.seat_name !== ""){
                            let seatnum = elm1.seat_name.split(",").length;
                            num += seatnum;
                        }else{
                            num  = 0;
                        }
                    }
                });
                return(
                    <tr key={key}>
                        <td>
                            <input type="radio" name="radio" value={[elm.show_time,120-num*1]} onClick={(e)=>{changetime(e)}}/>
                        </td>
                        <td>{elm.show_date}</td>
                        <td>{elm.show_time}</td>
                        <td>{elm.theatersName}廳</td>
                        <td>{120}席</td>
                        <td>{120-num*1}席</td>
                        <td>開放中</td>
                    </tr>
                )
            }
        });
        settimeCH("");
        settime(tim);
    }
    function changetime(e){
        let get = e.target.value.split(',');
        console.log(e.target.value);
        settimeCH(get[0]);
        setlimitNum(get[1]);
    }
    // console.log(timeCH,dateCH,cinema,movie);


    const page1 =
    <div className="col-md-8 col-7 content_fixed" style={{fontSize:"16px",height:"600px",width:"70%",overflowY: 'scroll',overflowX:'hidden'}}>
    <div className="blog-post">
        <div id="divSelectScreeningPanel" className="powerwidget cold-grey">
            <header>
                <h2>場次資訊</h2>
                <div className="powerwidget-ctrls" role="menu">
                    <Link className="button-icon powerwidget-toggle-btn" to={"/"}>
                        <i className="fa fa-chevron-circle-up "></i>
                    </Link>
                </div>
            </header>
            <div id="divSelectScreeningContent" className="inner-spacer_2">
                <form className="orb-form">
                    <header className="header_2">
                        <abbr >選擇上映影院</abbr>
                    </header>
                    <fieldset>
                        <div className="a row1">
                            <section className="col col-6_2">
                                <label className="select">
                                    <select style={{fontSize:"24px",margin:"5px 0 0 0"}} value={cinema ===""?"":`${cinema}`} name="interested" id="selTheatreName" onChange={(e)=>{changeCin(e)}}>
                                        {cinema?"":<option value="">請選擇訂票影院</option>}
                                        {cin?cin:""}
                                    </select>
                                    <i></i>
                                </label>
                            </section>
                        </div>
                    </fieldset>
                    <header className="header_2">
                        <abbr>選擇上映電影</abbr>
                    </header>
                    <fieldset>
                        <div className="a row1">
                            <section className="col col-6_2">
                                <label className="select">
                                    <select style={{fontSize:"24px",margin:"5px 0 0 0"}} name="interested" id="selMovieName" onChange={(e)=>{changeMov(e)}}>
                                        {movie?"":<option value="">請選擇電影</option>}
                                        {movieall?movieall:""}
                                    </select>
                                    <i></i>
                                </label>
                            </section>
                        </div>
                    </fieldset>
                    <header className="header_2">
                        <abbr >選擇上映日期</abbr>
                    </header>
                    <fieldset>
                        <div className="a row1">
                            <section className="col col-6_2">
                                <label className="input">
                                    <i className="icon-append fa fa-calendar">

                                    </i>
                                    <select style={{fontSize:"24px",margin:"5px 0 0 0"}} name="interested" id="selMovieName" onChange={(e)=>{changedate(e)}}>
                                        {time?"":<option value="">請選擇日期</option>}
                                        {date?date:""}
                                    </select>
                                </label>
                            </section>
                        </div>
                    </fieldset>
                    <div className="inbox-new-message from_bottom" style={{width:"200%"}}>
                        <header className="header_3">
                            <abbr>選擇上映場次</abbr>
                        </header>
                        <fieldset style={{margin: '0'}}>
                            <table id="tabScreeningDetail"
                                className="table_2 table-striped_2 table-hover margin-bottom">
                                <thead>
                                    <tr>
                                        <th style={{width:'5%'}}></th>
                                        <th style={{width:'26%',fontSize:"24px"}}>上映日期</th>
                                        <th style={{fontSize:"24px"}} >上映時間</th>
                                        <th style={{fontSize:"24px"}} >廳別</th>
                                        <th className="th_move" style={{fontSize:"24px"}} >總座位數</th>
                                        <th className="th_move" style={{fontSize:"24px"}} >參考空位數</th>
                                        <th style={{fontSize:"24px"}}>訂票狀態</th>
                                    </tr>
                                </thead>
                                <tbody style={{fontSize:"24px"}}>
                                    {time?time:<tr></tr>}
                                </tbody>
                            </table>
                        </fieldset>
                        <footer>
                        {/* {timeCH !== ""?<Link to={`../booking/page2?cinema=${cinema}&categorysName=${movie[0]}&movieName=${movie[1]}&showDate=${dateCH}&showTime=${timeCH}`} className="btn btn-info">選擇票種張數</Link>:<Link to={"../booking/page1"} className="btn btn-info" style={{opacity:"0.5"}}>選擇票種張數</Link>} */}
                        {timeCH !== ""?<Link to={"../booking/page2"} className="btn btn-info">選擇票種張數</Link>:<Link to={"../booking/page1"} className="btn btn-info" style={{opacity:"0.5"}}>選擇票種張數</Link>}
                        </footer>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>;
    return (
        <div className="containersss frontend container_bgcolor" style={{width:"90%",color:"black",padding:"0 50px 0 50px",margin:"100px auto"}}>
            <div className="a row1">
                <div className="page-header_2 ">
                    <div className="header_step">
                        <h1>訂票服務系統</h1>
                        <div className="col-md-7" style={{position:"absolute", top:"-30px", right:"-24px"}}>
                            <div className="inner-spacer">
                                <form id="steps-wizard" className="orb-form"></form>
                                <div id="wizard" style={{margin:"0 0 0 -250px",fontSize:"20px"}} className="wizard clearfix">
                                    <div className="steps clearfix" >
                                        <ul>
                                            <li id="wizard-s-0" className={param.id === 'page1'?"first current":"disabled"}>
                                                <Link to={"../booking/page1"} aria-controls="wizard-p-0" href="#wizard-h-0" id="wizard-t-0">
                                                <span className="current-info audible">current step: </span>
                                                    <span className="number_2">1</span>
                                                    選擇場次
                                                </Link>
                                            </li>
                                            <li id="wizard-s-1" className={param.id === 'page2'?"first current":"disabled"}>
                                                <Link to={"../booking/page2"} aria-controls="wizard-p-1" href="#wizard-h-1" id="wizard-t-1">
                                                    
                                                    <span className="number_2">2</span>
                                                    選擇票種
                                                </Link>
                                            </li>
                                            <li id="wizard-s-2" className={param.id === 'page3'?"first current":"disabled"}>
                                                <Link to={"../booking/page3"} aria-controls="wizard-p-2" href="#wizard-h-2" id="wizard-t-2">
                                                    <span className="number_2">3</span>
                                                    進行劃位
                                                </Link>
                                            </li>
                                            <li id="wizard-s-3" className={param.id === 'page4'?"first current":"disabled"}>
                                                <Link to={"../booking/page4"} aria-controls="wizard-p-3" href="#wizard-h-3" id="wizard-t-3">
                                                    <span className="number_2">4</span>
                                                    選擇餐點
                                                </Link>
                                            </li>
                                            <li id="wizard-s-4" className={param.id === 'page5'?"first current":"disabled"}>
                                                <Link to={"../booking/page5"} aria-controls="wizard-p-4" href="#wizard-h-4" id="wizard-t-4">
                                                    <span className="number_2">5</span>
                                                    付款
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {param.id === 'page1'?page1:""}
                {param.id === 'page2'?<Page2 screen={props.screen} ticket={props.ticket} cinema={cinema} categorysName={movie[0]} movieName={movie[1]} movieinfo={movieinfo} date={dateCH} time={timeCH} />:""}
                {param.id === 'page3'?<Page3 screen={props.screen} ticket={props.ticket} cinema={cinema} categorysName={movie[0]} movieName={movie[1]} movieinfo={movieinfo} date={dateCH} time={timeCH} price={price} number={number} />:""}
                {param.id === 'page4'?<Page4 food={props.food} screen={props.screen} ticket={props.ticket} cinema={cinema} categorysName={movie[0]} movieName={movie[1]} movieinfo={movieinfo} date={dateCH} time={timeCH} price={price} number={number} seat={seatName}/>:""}
                {param.id === 'page5'?<Page5 users={props.users} screen={props.screen} cinema={cinema} categorysName={movie[0]} movieName={movie[1]} movieinfo={movieinfo} date={dateCH} time={timeCH} price={price} number={number} seat={seatName} foodName={foodName} foodPrice={foodPrice}/>:""}

                {param.id === 'page1'?<List cinema={cinema} categorysName={movie[0]} movieName={movie[1]} movieinfo={movieinfo} date={dateCH} time={timeCH} />:""}
                

            </div>
        </div>
    )
}