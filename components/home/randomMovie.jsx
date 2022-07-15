import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
export default function RandomMovie(props) {
    const [ran, setran] = useState("");
    const [ranMovie, setranMovie] = useState("");
    const [count , setcount] = useState(0);
    console.log(props.movie);
    let arr = [];
    useEffect(() => {
        while (arr.length < 6 && ran === "") {
            let ron = Math.floor(Math.random() * 30);
            if (!arr.includes(ron)) {
                arr.push(ron);
            }
            if (arr.length === 6) {
                setran(arr);
            }
        }
    }, [ran]);
    useEffect(() => {
        if (props.movie !== "" && ran !== "") {
            setranMovie(getmovie());
        }
    }, [ran,count])
    console.log(ran);
    function getmovie() {

        if (ran) {
            let len = "";
            let CH = ran.map((elm, key) => {
                return props.movie.map((elm1, key1) => {
                    if (elm === key1) {
                        if (key !== ran.length - 1) {

                            console.log(elm);
                            return <img key={key1} name={elm} onClick={(e)=>{changeMovie(e)}} src={require(`../../movie_image/${elm1.image}`)} alt="" />
                        } else {
                            len =
                                <div key={key1} className="col-12 col-md-6 movieRandom_mainContent">
                                    <Link to={`./introduction/${elm1.name_CN}`}><img src={require(`../../movie_image/${elm1.image}`)} alt="" /></Link>
                                    <p>( {elm1.type} ) {elm1.name_CN}</p>
                                    <p>{elm1.name_EN}</p>
                                </div>;
                        }
                    }
                }
                )
            });
            return (
                <div className="movieRandom row" style={{ margin: "auto" }}>
                    <div className="col-12 col-md-6" >
                        {CH ? CH : ""}
                    </div>
                    {len?len:""}
                </div>
            )
        }
    }
    function changeMovie(e){
        console.log(ran,e.target.name);
        let array = ran;
        let KY = 0;
        ran.map((elm,key)=>{
            if(elm === e.target.name*1){
                KY = key;
            }
        });
        [array[KY],array[5]] = [array[5],array[KY]];
        setcount(x => x +1);
        setran(array);
    }
    return (
        <div className="movieRandom_Fr">
            <p className="movieRandom_title">隨機電影</p>
            {ranMovie ? ranMovie : ""}
            <div className="movieRandom_Btn"><button onClick={()=>{setran("")}}><p>點我</p></button></div>
        </div>
    )
}