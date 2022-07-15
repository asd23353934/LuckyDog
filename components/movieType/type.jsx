import { Link, useParams } from "react-router-dom";
import '../../movieType.css';
import { useState, useEffect } from "react";
// import axios from "axios";
export default function Type(props) {
    let params = useParams();
    const [movieList1, setmovieList1] = useState([]);
    const [movieList2, setmovieList2] = useState([]);
    useEffect(() => {
        // document.documentElement.scrollTo(0, 0);
        if (props.movie !== '') {
            getmovie();
        }
    }, [props.movie,params.id]);
    function getmovie() {
        if (params.id === "1") {
            let movieType = "驚悚";
            movieListAll(movieType);
        }
        if (params.id === "2") {
            let movieType = "動作";
            movieListAll(movieType);
        }
        if (params.id === "3") {
            let movieType = "劇情";
            movieListAll(movieType);
        }
        if (params.id === "4") {
            let movieType = "冒險";
            movieListAll(movieType);
        }
        if (params.id === "5") {
            let movieType = "愛情";
            movieListAll(movieType);
        }
    }
    function movieListAll(movieType){
        let count1 = 0;
        let count2 = 0;
        let list1 = props.movie.map((elm, key) => {
            if (elm.type === movieType) {
                count1++;
            }
            return elm.type === movieType && count1 < 4 ?
                <div key={key} className="card" style={{ margin: 'auto' }}>
                    <Link to={`../introduction/${elm.name_CN}`}>
                        <img className="mvimg" src={require(`../../movie_image/${elm.image}`)} width="100%" height="380px" />
                    </Link>
                    <div className="mvname">
                        <Link to={`../introduction/${elm.name_CN}`}>{elm.name_CN}</Link>
                    </div>
                </div>
                : "";
        });
        let list2 = props.movie.map((elm, key) => {
            if (elm.type === movieType) {
                count2++;
            }
            return elm.type === movieType && count2 > 4 ?
                <div key={key} className="card" style={{ margin: 'auto' }}>
                    <Link to={`../introduction/${elm.name_CN}`}>
                        <img className="mvimg" src={require(`../../movie_image/${elm.image}`)} width="100%" height="380px" />
                    </Link>
                    <div className="mvname">
                        <Link to={`../introduction/${elm.name_CN}`}>{elm.name_CN}</Link>
                    </div>
                </div>
                : "";
        });
        setmovieList1(list1);
        setmovieList2(list2);
    }
    return (
        <div>
            <header id="mvclass" style={{margin:"50px 0 0 0"}}>
                <nav>
                    <ul>
                        <li style={params.id === '1'?{background:"#9142f1",borderRadius:"5px",width:"50px",padding:"6px 0 5px 5px"}:{}}><Link onClick={()=>{getmovie()}} to={"../movie/type/1"}>驚悚片</Link> </li>
                        <li style={params.id === '2'?{background:"#9142f1",borderRadius:"5px",width:"50px",padding:"6px 0 5px 5px"}:{}}><Link onClick={()=>{getmovie()}} to={"../movie/type/2"}>動作片</Link> </li>
                        <li style={params.id === '3'?{background:"#9142f1",borderRadius:"5px",width:"50px",padding:"6px 0 5px 5px"}:{}}><Link onClick={()=>{getmovie()}} to={"../movie/type/3"}>劇情片</Link> </li>
                        <li style={params.id === '4'?{background:"#9142f1",borderRadius:"5px",width:"50px",padding:"6px 0 5px 5px"}:{}}><Link onClick={()=>{getmovie()}} to={"../movie/type/4"}>冒險片</Link> </li>
                        <li style={params.id === '5'?{background:"#9142f1",borderRadius:"5px",width:"50px",padding:"6px 0 5px 5px"}:{}}><Link onClick={()=>{getmovie()}} to={"../movie/type/5"}>愛情片</Link> </li>
                    </ul>
                </nav>
            </header>


            <div style={{padding:"50px 200px 0 200px"}}>
                <div className="mvbar" >
                    {movieList1 ? movieList1 : "12112321"}
                </div>

                <div className="mvbar" >
                    {movieList2 ? movieList2 : "12112321"}
                </div>
            </div>



        </div>
    )
}