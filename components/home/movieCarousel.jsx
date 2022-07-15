import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../node_modules/bootstrap/dist/js/bootstrap.bundle';
import { Link } from "react-router-dom";
import "../../jcarousel.responsive.css"
export default function MovieCarousel(props) {
    console.log(props.movie);
    const carousel =
        <li style={{margin:"0 150px 0 150px"}}>
            <Link to={"/"} >
                <div className="jcarousel_imgDiv"><img src={require("../../movie_image/movie1.jpg")} alt="" />
                    <div className="jcarousel_imgDiv_content">
                        <p>movieName_CN</p>
                        <p>movieName_EN</p>
                    </div>
                </div>
            </Link>
            <i className="bi bi-suit-heart-fill jcarousel_heartIcon"></i>
            <div className="carousel_secondView">
                <div><img src={require("../../movie_image/movie1.jpg")} alt=""/></div>
                <div>
                    <p>movieName_CN</p>
                    <p>movieName_EN</p>
                    <p>first_date</p>
                    <p>director</p>
                    <p>actor</p>
                    <p>movie_type</p>
                    <p>movie_time</p>
                </div>
            </div>
        </li>;
    return (
        <div className="movieCarousel">
            <div className="movieCarousel_Btn row">

                <div className="col-6">
                    <p>現正熱映</p>
                </div>
                <div className="col-6">
                    <p>即將上映</p>
                </div>
            </div>

            <div className="carousel">
                <div>
                    <div className="wrapper">
                        <div className="jcarousel-wrapper" >
                            <div className="jcarousel">
                                <ul>
                                    {carousel?carousel:""}
                                </ul>
                                <a href="#" className="jcarousel-control-prev">&lsaquo;</a>
                                <a href="#" className="jcarousel-control-next">&rsaquo;</a>

                                {/* <!-- <p className="jcarousel-pagination"></p> --> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}