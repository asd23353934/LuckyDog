import { BrowserRouter, Routes, Route, Link , useLocation } from 'react-router-dom';
import './home.css';

import Home from './components/home/home';
import Register from './components/resgister/register';
import Login from './components/login/login';
import MemberHome from './components/member_content/memberHome';
import MemberProfile from './components/member_content/memberProfile';
import MemberMessages from './components/member_content/memberMessages';
import MemberSettings from './components/member_content/memberSettings';
import Type from './components/movieType/type';
import MovieIntroduction from './components/MovieIntroduction/section1';
import Booking from './components/booking/booking';
import Charts from './components/chart/chart';
import './spotlight.css';
import imgNavigation from './image/Logo/Logo2.jpg';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import { useState , useEffect , useLayoutEffect } from 'react';
function App() {
  const [users, setusers] = useState([]);
  const [movie,setmovie] = useState([]);
  const [actor,setactor] = useState([]);
  const [movieall,setmovieall] = useState([]);
  const [screen, setscreen] = useState([]);
  const [City,setCity] = useState([]);
  const [ticket,setticket] = useState([]);
  const [director,setdirector]=useState([]);
  const [food,setfood] = useState([]);
  const [chart,setchart] = useState('');
  const [time,settime] = useState(document.location.href !== "http://localhost:3000/"?1:0);
  useEffect(() => {
      getUsers();
      getTable("movie");
      getTable("actors");
      getTable("movieall");
      getTable("screening");
      getTable("cinema");
      getTable("ticketAll");
      getTable("food");
      getTable("director");
      if(document.location.href === "http://localhost:3000/"){
        setTimeout(()=>{
          settime(x=>x+1);
        },5000);
      }

  },[]);
  const Wrapper = ({children}) => {
    const location = useLocation();
    useLayoutEffect(() => {
      document.documentElement.scrollTo(0, 0);
      setTimeout(()=>{
        window.scrollTo(0,0);
      },200);
      if(location.pathname.includes('chart') ){
        if(chart !== location.pathname){
          setchart(location.pathname);
        }
      }else{
        if(chart !== ""){
          setchart("");
        }
      }
    }, [location.pathname]);
    return children
  } 
    
  function getUsers() {
    let userName = sessionStorage.getItem('userInfo');
    if(userName === null){
      console.log("notting");
    }else{
      let propsty = JSON.parse(userName);
      console.log(propsty);
      setusers(propsty);
    }
  ;
  }
  function getTable(tableName){
    axios.get(`http://localhost/icedog/ajax/Controller.php?id=${tableName}`,{responseType:'json'}).then((response) => {
      if(response.data){
        // console.log(response.data);
        if(tableName === "movie"){
          setmovie(response.data);
        }
        if(tableName === "actors"){
          setactor(response.data);
        }
        if(tableName === "movieall"){
          setmovieall(response.data);
        }
        if(tableName === "screening"){
          setscreen(response.data);
        }
        if(tableName === "cinema"){
          setCity(response.data);
        }
        if(tableName === "ticketAll"){
          setticket(response.data);
        }
        if(tableName === "food"){
          setfood(response.data);
        }
        if(tableName === "director"){
          setdirector(response.data);
        }
      }else{
        console.log("沒抓到");
      }
    });
  }
  console.log(chart.split("/")[1]);
  const userLogin = 
  <div className="loadinout" style={{color:"white"}}>
    <Link className="loadinout"  to={"login/home"}>登入</Link>
    <span>/</span>
    <Link className="loadinout" to={"register/home"}>註冊</Link>
  </div> ;
  const userok =
    <div className="loadinout">
      <Link to={"/user/account/home"}>HI {users.userName} {users.firstName} {users.lastName}</Link>       
    </div>;
  console.log(chart.split("/")[1]);
  return (
    <div className="App">
      {time === 0 && chart.split("/")[1] !== 'chart'?<div id="spotlight">
      <div id="titleSpotlight_Fr" style={{fontStyle:"inherit"}}>
              <h1 style={{fontStyle:"inherit"}} className="titleSpotlight" data-spotlight="LUCKY&nbsp;&nbsp;&nbsp;DOG">LUCKY&nbsp;&nbsp;&nbsp;DOG</h1>
              <div>
                  <h1 style={{fontStyle:"inherit"}} className="titleSpotlight3"  data-spotlight2="LUCKY&nbsp;&nbsp;&nbsp;DOG">LUCKY&nbsp;&nbsp;&nbsp;DOG</h1>
              </div>
          </div>

          <div className="titleSpotlight_Fr2">
              <p className="titleSpotlight2" style={{backgroundImage: 'url(./image/colorful2.jpg)'}} data-spotlight="Movie Theater">Movie Theater</p>
              <div>
                  <p className="titleSpotlight4" style={{backgroundImage: 'url(./image/colorful2.jpg)'}} data-spotlight2="Movie Theater">Movie Theater</p>
              </div>
              <img id="logo" src={require("./image/Logo/Logo2.jpg")} alt=""/>
          </div>
      </div>:""}

      {time !== 0 || chart.split("/")[1] === 'chart'?<BrowserRouter>
      <Wrapper>

          {sessionStorage.getItem('userInfo') && chart.split("/")[1] !== 'chart'?userok:""}
          {!sessionStorage.getItem('userInfo') && chart.split("/")[1] !== 'chart'?userLogin:""}
          {/* <input type="radio" id="menuBtn" /> */}
          {chart.split("/")[1] !== 'chart' ?
          <div className="navBar">
            <label className="hamburger" htmlFor="menuBtn"><span>選單</span></label>
            <div className="logoDiv"><Link to={"/"}><img src={imgNavigation} alt="" /></Link></div>
            <div>
              <ul>
                <li> <Link to={"/movie/type/1"}>電影</Link>
                  <ul className='navMenu'>
                    <li><Link to="home">現正熱映</Link></li>
                    <li><Link to="home">即將上映</Link></li>
                  </ul>
                </li>
                <li><Link to={"/booking/page1"}>購票</Link>
                  <ul className='navMenu'>
                    <li><Link to="home">線上訂票</Link></li>
                    <li><Link to="home">團體優惠</Link></li>
                    <li><Link to="home">購票說明</Link></li>
                    <li><Link to="home">常見問題</Link></li>
                  </ul>
                </li>
                <li> <Link to={"/user/account/home"}>會員專區</Link>
                  <ul className='navMenu'>
                    <li><Link to="home">會員申辦</Link></li>
                    <li><Link to="home">會員活動</Link></li>
                    <li><Link to="home">會員好康</Link></li>
                    <li><Link to="home">紅利點數</Link></li>
                    <li><Link to="home">會員Q/A</Link></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>:""}

          
        <Routes>
          <Route path='/' element={<Home screen={screen} movie={movie} city={City}/>}/>
          <Route path='register/:id' element={<Register users={users}/>}/>
          <Route path='login/:id' element={<Login users={users}/>}/>
          <Route path='movie/type/:id' element={<Type movie={movie} />} />
          <Route path="introduction/:id" element={<MovieIntroduction movie={movie} screen={screen} actor={actor} movieall={movieall} city={City} ticketall={ticket} director={director}/>}/>
          <Route path="booking/:id" element={<Booking screen={screen} cinema={City} movie={movie} ticket={ticket} food={food} users={users} />} />
          <Route path='user/account/:id' element={<MemberHome users={users}/>} />
          <Route path='user/profile/:id' element={<MemberProfile users={users}/>} />
          <Route path='user/messages/:id' element={<MemberMessages users={users}/>}/>
          <Route path='user/settings/:id' element={<MemberSettings users={users}/>}/>
          <Route path='chart/:id' element={<Charts movie={movie} screen={screen} ticket={ticket} cinema={City}/>}/>
        </Routes>

        {chart.split("/")[1] !== 'chart' ?
        <div className="footer row">
          <div className="col-12 col-lg-4 order-md-last"><img src={imgNavigation} alt="" /></div>
          <div className="col-12 col-lg-8 row">
            <div className="col-3">
              <p>關於影城</p>
              <p><Link to="home">電影介紹</Link></p>
              <p><Link to="home">影城據點</Link></p>
              <p><Link to="home">影廳介紹</Link></p>
              <p><Link to="home">消息公告</Link></p>
              <p><Link to="home">顧客意見回饋</Link></p>
              <p><Link to="home">客服人員</Link></p>
            </div>
            <div className="col-3">
              <p>會員專區</p>
              <p><Link to="home">加入會員</Link></p>
              <p><Link to="home">會員好康</Link></p>
              <p><Link to="home">紅利點數</Link></p>
              <p><Link to="home">會員資料修改</Link></p>
              <p><Link to="home">忘記密碼</Link></p>
              <p><Link to="home">常見問題</Link> </p>
            </div>
            <div className="col-3">
              <p>線上訂票</p>
              <p><Link to="home">電影訂票</Link></p>
              <p><Link to="home">團體訂票</Link></p>
              <p><Link to="home">訂票說明</Link></p>
            </div>
          </div>
        </div>:""}
        </Wrapper>
      </BrowserRouter>:""}
    </div>
  );
}

export default App;
