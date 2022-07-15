import { useState , useEffect } from "react"
export default function Section2(props) {
    const [section,setsection] = useState("");
    useEffect(()=>{
        if(props.movie !== "" && props.actor !== ""){
            setsection(getmovie(props.movie,props.actor));
        }
    },[props.movie,props.actor]);

    

    function getmovie(mov,act){
        if(mov !== "" && act !== ""){
            // console.log(mov);
            // console.log(act);
            let sec2 = 
            <div id="section2">
                <div id="movieDescTop">
                    <span className="whiteArrow glyphicon glyphicon-chevron-right"></span>
                    <p className="titleMovie">劇情簡介 / ABOUT THE STORY</p>
                </div>
                <div id="movieDescLast">
                    <p>{mov.content}</p>
                </div>
            </div>;
            return sec2;
        }

        
    }
    return (
       <div>{section?section:""}</div>
    )
}