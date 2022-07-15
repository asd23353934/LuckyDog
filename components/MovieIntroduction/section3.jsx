import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
export default function Section3(props) {
    let moviemp4 = props.movieall.map((elm,key)=>{
        return elm.mp4 === props.movieMp4?
        <video key={key} id="movieVideo" controls>
            <source src={require(`../../video(預告片)/${elm.mp4}`)} type="video/mp4"></source>
        </video>:"";
    })
   
    // console.log(movie);
    return (
        <div id="section3">
            <div id="movieVideoTop">
                <span className="whiteArrow glyphicon glyphicon-chevron-right"></span>
                <p className="titleMovie">預告片</p>
            </div>
            <div id="movieVideoLast">
                
                    {moviemp4?moviemp4:""}

            </div>
        </div>
    )
}