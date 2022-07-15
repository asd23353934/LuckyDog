import { Link } from "react-router-dom";
import imgNavigation from '../image/Logo/Logo2.jpg';
export default function Nav(){
    const userLogin = 
    <div className="loadinout">
      <Link className="loadinout" to={"login/home"}>登入</Link>
      <span>/</span>
      <Link className="loadinout" to={"register/home"}>/註冊</Link>
    </div> ;
    const userok =
      <div className="loadinout">
        {/* <Link to={"/user/account/home"}>HI {users.userName} {users.firstName} {users.lastName}</Link>        */}
      </div>;
    return(
    <div>
    {sessionStorage.getItem('userInfo')?userok:userLogin}
    <input type="radio" id="menuBtn" />
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
          <li>購票
            <ul className='navMenu'>
              <li><Link to="home">線上訂票</Link></li>
              <li><Link to="home">團體優惠</Link></li>
              <li><Link to="home">購票說明</Link></li>
              <li><Link to="home">常見問題</Link></li>
            </ul>
          </li>
          <li>活動公告
            <ul className='navMenu'>
              <li><Link to="home">最新消息</Link></li>
              <li><Link to="home">中獎名單</Link></li>
              <li><Link to="home">電影周邊商品</Link></li>
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
    </div>
    </div>
    )
}