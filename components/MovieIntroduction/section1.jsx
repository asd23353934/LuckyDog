import '../../movie.css';
import Section2 from './section2';
import Section3 from './section3';
import Section4 from './section4';
import Section5 from './section5';
import CarouselMovie from './CarouselMovie';
import CarouselActor from './CarouselActor';
import { useState, useEffect } from 'react';
import { useParams , Link } from 'react-router-dom';
export default function MovieIntroduction(props) {
    let [movie, setmovie] = useState([]);
    let [actor, setactor] = useState([]);
    let [section, setsection] = useState([]);
    let [movieMp4,setmovieMp4] = useState([]);
    let param = useParams("");
    useEffect(() => {
        // document.documentElement.scrollTo(0, 0);
        if (props.actor !== "" && props.movie !== "") {
            getmovie();
        }
    }, [props.actor,movie,param.id]);
    function getmovie() {
        let movie = "";
        props.movie.forEach((key) => {
            if (key.name_CN === param.id) {
                // console.log(key);
                movie = key;
            }
        });
        setmovie(movie);
        let movieall = [];
        props.movieall.forEach((key) => {
            if (movie.movie_id === key.movie_id) {
                movieall.push(key.actor_id);
            }
        })
        // console.log(movieall);
        let actorall = [];
        props.actor.forEach((key) => {
            movieall.forEach((elm) => {
                if (key.actor_id === elm) {
                    actorall.push(key);
                }
            })
        })
        let director="";
        props.director.forEach((elm)=>{
            if (elm.movie_name_CN === param.id) {
                director=elm;
            }
        })
        setactor(actorall);
        setmovieMp4(movie.mp4);
        setsection(getSelection(movie,actorall,director));
    }
    function getSelection(mov,act,dir){
        // console.log(mov);
        if(mov !== "" && act !== ""){
            let sec =
            <div id="section1">
                <div id="movieIntro">
                    <div id="movieTitle">
                        <span className="glyphicon glyphicon-play" ></span>
                        <h3>電影介紹</h3>
                    </div>
                    <img id="movieImg" src={require(`../../movie_image/${mov.image}`)} alt="" />
                </div>
                <div id="movieIntroTxt">
                    <div id="movieIntroTxtTop">
                        <h3>{mov.name_CN}</h3>
                        <div>
                            <Link to={"/"}>
                                <span id="movieIntroTxtHeart" className="glyphicon glyphicon-heart"></span>
                            </Link>
                        </div>
                    </div>
                    <p>{mov.name_EN}</p>
                    <hr id="movieIntroHr" />
                    <div id="movieIntroMid">
                        上映日：{mov.listing_date}
                        <br />
                        類型：{mov.type}
                        <br />
                        導演：{dir.director_name}
                        <br />
                        演員：
                        {act.map((key)=>{
                            return key.name + " ";
                        })}
                    </div>
                    <div id="movieIntroLast">
                        片長： {mov.duration}
                    </div>
                </div>
                <div id="grayBar1"></div>
                <img id="backgroundImg" src={require("../../image/大專首頁圖庫/OIP.jpg")} alt="" />
            </div>;
            return sec;
        }
    }
    return (
        <div>
            {section ? section : ""}
            <Section2 movie={movie} actor={actor} screen={props.screen} city={props.city}/>
            <Section3 movieall={props.movie} movieMp4={movieMp4}/>
            <Section4 />
            <CarouselActor actor={actor}/>
            <Section5 movie={movie} screen={props.screen} ticketall={props.ticketall}/>
            <div id="section6" style={{ margin: "0 0 150px 0" }}>
                <div id="movieRecommendTop">
                    <span className="whiteArrow glyphicon glyphicon-chevron-right"></span>
                    <p className="titleMovie">推薦電影</p>
                </div>
                <CarouselMovie movieall={props.movie} movie={movie}/>
            </div>
        </div>
    )
}