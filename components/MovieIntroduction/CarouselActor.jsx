import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../carouselActor.css";




class CarouselComponent extends Component {
  render() {
    // console.log(this.props.elm);
    return (
      <div>
        <div className="carouselItem">
          <img className="carouselImg" src={require(`../../actor_image/${this.props.elm.image}`)} alt="" />
        </div>
        <div className="carouselTextDiv">
          <h2 className="carouselName">{this.props.elm.name}</h2>
          <p className="carouselText">
            {this.props.elm.content}
          </p>
        </div>

      </div>

    )
  }
}
function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "none" }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "none" }}
      onClick={onClick}
    />
  );
}
export default class CustomArrows extends Component {



  render() {
    // console.log(this.props.actor);
    const settings = {
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      focusOnSelect: true,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      responsive: [
        {
          breakpoint: 1400,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 950,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        }]
    };
    return (
      <div id="carouselActorBlock">
        <div id="carouselActorContainer">
          <Slider {...settings}>
            {this.props.actor.map((elm, key) => {
              return <CarouselComponent elm={elm} key={key} />
            })}
          </Slider>
        </div>
      </div>

    );
  }
}