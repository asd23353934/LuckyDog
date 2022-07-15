import carouselitem01 from '../../image/jcarousel_bigimage/ba103dba-990f-4e24-b558-84efe76483de.jpg';
import carouselitem02 from '../../image/jcarousel_bigimage/ed604492-45d1-400b-badb-8a5f1e32e28d.jpg';
import carouselitem03 from '../../image/jcarousel_bigimage/homepage_20220701001.jpg';
import strongTitle from '../../image/大專首頁圖庫/工作區域 2.jpg';
import { useState,useEffect} from 'react';
import MovieCity from './movieCity';
import News from './news';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min';
import RandomMovie from './randomMovie';
// import $ from 'jquery';
import { Link } from 'react-router-dom';
export default function Home(props){
    const [movieOption,setmovieOption] = useState("");
    const [movieName,setmovieName] = useState("");
    const [moviedate,setmoviedate] = useState("");
    const movie_name = 
    props.movie.map((elm,key)=>
        <option key={key} value={elm.name_CN}>{elm.name_CN}</option>
    );
    // console.log(movie_name);
    function movieNameChange(e){
        console.log(e.target.value);
        let date = [];
        let reg = new RegExp("-","g");
        props.screen.map((elm)=>{
            if(!date.includes(elm.show_date) && elm.movieName_CN === e.target.value){
                date.push(elm.show_date);
                date.sort((a,b)=>{
                    return a.replace(reg,"")-b.replace(reg,"");
                });
            }
        });
        let option = date.map((elm,key)=><option key={key} value={elm}>{elm}</option>);
        setmovieName(e.target.value);
        setmovieOption(option);
    }
    function movieNameCH(e){
        console.log(e.target.value);
        setmoviedate(e.target.value);
    }
    return(
        <div>
            {/* 輪播大圖 */}
            <div id="carouselExampleIndicators" className={"carousel slide"} data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" style={{boxShadow:"0 0 0 0 white"}} className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" style={{boxShadow:"0 0 0 0 white"}} aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" style={{boxShadow:"0 0 0 0 white"}} aria-label="Slide 3"></button>
                </div>
            <div className="carousel-inner">
            <div className="carousel-item active">
                <img src={carouselitem01} className="d-block w-100" alt="..."/>
            </div>
            <div className="carousel-item">
                <img src={carouselitem02} className="d-block w-100" alt="..."/>
            </div>
            <div className="carousel-item">
                <img src={carouselitem03} className="d-block w-100" alt="..."/>
            </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
        </button>
        </div>
        {/* 快速搜尋 */}
            <div className='fastSearch'>
                <div className='fastSearch_Fr row'>
                    <div className="col-4 fastSearch_title">時刻查詢</div>
                        <div className="fastMovie col-3">
                            <select style={{fontSize:"24px",borderRadius:"15px"}} name="" id="fastMovie" onChange={(e)=>{movieNameChange(e)}}>
                                <option value="">選擇電影</option>
                                {movie_name};
                            </select>
                        </div>
                <div className="fastDate col-3">
                    <select style={{fontSize:"24px",borderRadius:"15px"}} name="" id="fastDate" onChange={(e)=>{movieNameCH(e)}}>
                        <option value="">選擇日期</option>
                        {movieOption?movieOption:""}
                    </select>
                </div>
                <div className="fastSearch_Btn col-2">
                    <button >
                        {movieName && moviedate?<Link style={{color:"white",width:"100%",padding:"0 0 20px 28px"}} to={`./introduction/${movieName}?date=${moviedate}`}>搜尋</Link>:<Link style={{color:"white",width:"100%",padding:"0 0 20px 28px"}} to={"/"}>搜尋</Link>}
                    </button>
                    </div>
                </div>
            </div>
            {/* 強檔電影 */}
            <div className="movieHot" >
                <img src={strongTitle} alt=""/>
                <div className="movieHot_Content">
                    <Link to={"introduction/犯罪都市2"}><p>強檔電影</p><img src={require("../../movie_image/movie1.jpg")} alt=""/></Link>
                    <Link to={"introduction/奇異博士2：失控多重宇宙"}><p>強檔電影</p><img src={require("../../movie_image/movie2.jpg")} alt=""/></Link>
                    <Link to={"introduction/媽的多重宇宙"}><p>強檔電影</p><img src={require("../../movie_image/movie3.jpg")} alt=""/></Link>
                    <Link to={"introduction/捍衛戰士：獨行俠"}><p>強檔電影</p><img src={require("../../movie_image/movie4.jpg")} alt=""/></Link>
                </div>
                <div className="movieHot_Date">
                </div>
            </div>
            {/* 電影輪播 - 電影 */}
            {/* <MovieCarousel screen={props.screen} movie={props.movie}/> */}
            {/* 人氣電影 */}
            {/* <div className="moviePopular">
                <div className="a row">
                    <div className="col-12 col-md-6" style={{width:"50%"}}>
                        <img src={require("../../image/人氣/4f515982-d16e-45a4-97a6-94e380e08a89.jpg")} alt=""/>
                    </div>
                    <div className="moviePopular_Text col-12 col-md-6" style={{width:"50%"}}>
                        <p><Link to={"introduction/奇異博士2：失控多重宇宙"}>奇異博士2：失控多重宇宙</Link></p>
                        <p><Link to={"introduction/奇異博士2：失控多重宇宙"}>Doctor Strange in the Multiverse of Madness</Link></p>
                        <p>班尼迪克康柏拜區、伊莉莎白歐森主演。在多元宇宙開啟後，世界陷入混沌之中的瘋狂場景。最強至尊法師聯手最強女巫，是否有機會拯救世界？</p>
                        <div>
                            <button><Link to={"/"}>前往訂票</Link></button>
                            <button><Link to={"introduction/奇異博士2：失控多重宇宙"}>預告片</Link></button>
                        </div>
                    </div>
                </div>
                <div>
                    <p>人氣電影</p>
                </div>
            </div> */}
            {/* 隨機電影 */}
            <RandomMovie movie={props.movie} />

            {/* 最新公告 */}
            <News />

            {/* 影城據點 */}
            <MovieCity city={props.city}/>
            
                </div>
    )
}