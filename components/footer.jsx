import { Link } from "react-router-dom";
import imgNavigation from '../image/Logo/Logo2.jpg';
export default function Footter(){
    return(
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
        </div>
    )
}