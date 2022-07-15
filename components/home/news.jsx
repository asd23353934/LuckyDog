import { Link } from "react-router-dom";
import home from '../../home.css';
export default function News(){
    function debounce(){
        let newsTitle = document.getElementById("newsTitle");
        if(newsTitle !== null){
            let newsContent = document.querySelectorAll(".newsContent div");
            let moveLength = newsTitle.offsetTop - 1000;
            console.log(window.scrollY,newsTitle.offsetTop,newsTitle.clientHeight,moveLength);
                newsContent.forEach((elm,key)=>{
                    if(window.scrollY > elm.offsetTop-window.innerHeight-400){
                        console.log(elm.offsetTop-window.innerHeight-200);
                        elm.setAttribute("id",`newsContent_Item${key+1}`);
                    }
                });
                newsContent.forEach((elm,key)=>{
                    if(window.scrollY < elm.offsetTop-window.innerHeight-400){
                        elm.removeAttribute("id",`newsContent_Item${key+1}`);
                    }
                });
        };
    };
    window.addEventListener('scroll',debounce);
    return (
        <div className="news_Fr">
            <div className="news container-xxl" id="news">
                <div>
                    <div className="s row">
                        <div className="newsTitle" id="newsTitle">
                            <p className="col-12" style={{margin:"auto"}}>最新公告</p>
                        </div>
                        <div className="newsContent row" id="newsContent">
                            <div className="col-12 col-lg-6 order-lg-6" style={{margin:"50px 0 50px -150px"}}>
                                <Link to={"/"}><img src={require("../../image/news_image/news1.jpg")} alt=""/></Link>
                            </div>
                            <div className="col-12 col-lg-6 order-lg-7">
                                <p><Link to={"/"}>【雷神索爾：愛與雷霆】訂票抽獎活動</Link></p>
                                <p>使用LuckyDog看電影APP 訂購【雷神索爾：愛與雷霆】電影票抽電影主題贈品</p>
                            </div>
                            <div className="col-12 col-lg-6 order-lg-1">
                                <Link to={"/"}><img src={require("../../image/news_image/news2.jpg")} alt=""/></Link>
                            </div>
                            <div className="col-12 col-lg-6 order-lg-8"style={{margin:"50px 50px 50px -50px"}}>
                                <p><Link to={"/"}>【貓王艾維斯】票價調整公告</Link></p>
                                <p>【貓王艾維斯】因片長超過2小時30分，現場票價以及銀行優惠票價皆調整10元，套票價格不變 並依現場公告為準。</p>
                            </div>
                            <div className="col-12 col-lg-6 order-lg-2"style={{margin:"50px 0 50px -150px"}}>
                                <Link to={"/"}><img src={require("../../image/news_image/news3.jpg")} alt=""/></Link>
                            </div>
                            <div className="col-12 col-lg-6 order-lg-3">
                                <p><Link to={"/"}>「臺灣社交距離App」宣導</Link></p>
                                <p>指揮中心鼓勵全民下載使用「臺灣社交距離App」，確保社區民眾安全，並將於衛生福利部疾病管制署官方臉書專頁「疾病管制署─1922防疫達人」辦理抽獎活動。另下載使用者若為確診病例且願意上傳去識別化接觸資料，將給予協助疫調獎勵金每人5,000元。相關抽獎活動辦法可至「疾病管制署-1922防疫達人」臉書專頁瀏覽。</p>
                            </div>
                            <div className="col-12 col-lg-6 order-lg-5">
                                <Link to={"/"}><img src={require("../../image/news_image/4.jpg")} alt=""/></Link>
                            </div>
                            <div className="col-12 col-lg-6 order-lg-4"style={{margin:"50px 50px 50px -50px"}}>
                                <p><Link to={"/"}>因應政府防疫規定 出入電影場所應佩戴口罩</Link></p>
                                <p>因應政府防疫規定，出入電影場所應佩戴口罩，未佩戴且勸導不聽者，由地方政府裁罰新臺幣3千元至1萬5千元以下罰鍰，感謝您的支持與配合！</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}