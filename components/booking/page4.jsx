import { useState ,useEffect } from "react";
import List from "./list";
import { Link } from "react-router-dom";
export default function Page4(props) {
  const [price, setprice] = useState(0);
  const [name, setname] = useState([]);
  const [food,setfood] = useState("");
  const [foodall,setfoodall] = useState({
    '爆米花':0,
    '洋蔥圈':0,
    '可樂':0,
    '吉拿棒':0
  });
  
  useEffect(()=>{
    setfood(getfood());
  },[price,name,foodall]);
  console.log(props.food);
  function changefood(e) {
    console.log(e.target.value);
    console.log(e.target.name);
    setprice((x) => price * 1 + e.target.value * 1);
    foodall[e.target.name] += e.target.value * 1;
    let len = [...name];
    let text = "";
    console.log(len);
    len.forEach((elm, key, arr) => {
      if (elm.includes(e.target.name)) {
        text = elm.split(" ");
        text[text.length - 1] = text[text.length - 1] * 1 + 1 * 1;
        text = text.join(" ");
        arr[key] = text;
      }
    });
    console.log(text);
    if (text) {
      setname(len);
    } else {
      setname((x) => [...x,`${e.target.name} x ${e.target.value / e.target.value}`,
      ]);
    }
  }
  console.log(name);
  console.log(price);
  function getfood(){
    return props.food.map((elm, key) => {
        return(
            <div style={{margin:"50px 70px 25px 10px"}} className="box1" key={key}>
                <img style={{width:"200px",height:"200px"}} src={require("../../movie_image/movie1.jpg")} alt="" />
                {foodall[elm.name]>0?<button style={{borderRadius:"50%",width:"30px",margin:"0 0 0 -30px",position:"relative",top:"120px",left:"-170px"}} onClick={(e) => {changereduce(e);}} name={elm.name} value={elm.price}>
                        -
                </button>:" "}
                <h3 style={{margin:"0 0 0 10px",width:"180px",textAlign: 'center'}}>
                     {elm.name} {elm.price}
                </h3>
                <button style={{borderRadius:"50%",width:"30px",position:"relative",top:"-23px",left:"170px"}} onClick={(e) => {changefood(e);}} name={elm.name} value={elm.price}>
                        +
                </button>
                <span style={{width:"200px",margin:"0 0 0 25%"}}>{foodall[elm.name]/100}個</span>
            </div>)
        })
    }

  function changereduce(e) {
    console.log(e.target.value);
    console.log(e.target.name);
    let len = [...name];
    let check = JSON.stringify(len);
    console.log(check);
    console.log();
    if (check.includes(e.target.name)) {
      setprice((x) => price * 1 - e.target.value * 1);
      if(foodall[e.target.name]>0){
        foodall[e.target.name] -= e.target.value * 1;
      }
      
    }
    let text = "";
    console.log(len);
    len.forEach((elm, key, arr) => {
      if (elm.includes(e.target.name)) {
        text = elm.split(" ");
        text[text.length - 1] = text[text.length - 1] * 1 - 1 * 1;
        if (text[text.length - 1] <= 0) {
          arr.splice(key, 1);
        } else {
          text = text.join(" ");
          arr[key] = text;
        }
      }
    });
    setname(len);
  }
  return (
    <div style={{ height: "600px"}}>
      <div className="col-md-8 content_fixed" style={{width:"65%"}}>
        <div className="blog-post">
          <div className="powerwidget cold-grey">
            <header>
              <h2>選擇餐點</h2>
            </header>
          </div>
          <div style={{width:"110%"}}>{food ? food : ""}</div>
          
          <footer style={{margin:"480px 0 0 0",width:"700px"}}>
            <Link style={{color:"black"}} to={`../booking/page1`} className="btn btn-default">改選場次</Link>
            <Link style={{color:"black"}} to={`../booking/page2`} className="btn btn-default">改選票種、張數</Link>
            <Link style={{color:"black"}} to={`../booking/page3`} className="btn btn-default">改選座位位置</Link>
            {name ? (
              <Link
                className="btn btn-info"
                style={{ color: "black" }}
                to={`../booking/page5?foodName=${name}&foodPrice=${price}`}
              >
                前往付款
              </Link>
            ) : (
              <Link className="btn btn-default" to={"../booking/page5"}>前往付款</Link>
            )}
          </footer>
        </div>
      </div>

      <List
        cinema={props.cinema}
        price={props.price}
        number={props.number}
        categorysName={props.categorysName}
        movieName={props.movieName}
        movieinfo={props.movieinfo}
        date={props.date}
        time={props.time}
        seat={props.seat}
        foodName={name}
        foodPrice={price}
      />
    </div>
  );
}
