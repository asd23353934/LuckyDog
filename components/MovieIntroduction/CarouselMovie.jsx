import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../carouselMovie.css";
import { Link } from "react-router-dom";


class CarouselComponent extends Component {
  render() {
    // console.log(this.props);
    return (
      <Link to={`../introduction/${this.props.elm.name_CN}`}>
        <div className="item">
          <img className="img" src={require(`../../movie_image/${this.props.elm.image}`)} alt="" />
        </div>
      </Link>
    )
  }
}
function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, width: "22px", height: "21px", borderRadius: "100px", paddingTop: "1px", paddingLeft: "1px", display: "block", background: "230, 229, 229" }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, width: "22px", height: "21px", borderRadius: "100px", paddingTop: "1px", paddingLeft: "1px", display: "block", background: "230, 229, 229" }}
      onClick={onClick}
    />
  );
}

export default class CustomArrows extends Component {
  render() {
    // console.log(this.props);
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      responsive: [
        {
          breakpoint: 1400,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          }
        },
        {
          breakpoint: 950,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          }
        }]
    };
    return (
      <div id="carouselMovieBlock">
        <div id="carouselMovieContainer">
          <Slider {...settings}>
            {this.props.movieall.map((elm,key) => {
              if(elm.type === this.props.movie.type && elm.name_CN !== this.props.movie.name_CN){
                return <CarouselComponent elm={elm} key={key}/>
              }
              
            })}
          </Slider>
        </div>
        <div id="grayBar"></div>
      </div>

    );
  }
}