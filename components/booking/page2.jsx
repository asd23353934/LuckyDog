import { useState } from "react";
import { Link } from "react-router-dom";
import List from "./list";
export default function Page2(props) {
    console.log(props);
    const [num1,setnum1] = useState(0);
    const [num2,setnum2] = useState(0);
    const [num3,setnum3] = useState(0);
    const [number , setnumber] = useState(0);
    const [num,setnum] = useState(0);
    
    let opt = [];
    for (var a = 1; a < 31; a++) {
        opt.push(a);
    }
    let list = opt.map((key) => {
        return (
            <option key={key} value={key}>{key}張</option>
        )
    })
    function changeNum(e){
        console.log(e.target.name);
        if(e.target.name === "num1"){
            setnum1(e.target.value);
            setnumber(e.target.value*1+num2*1+num3*1);
            setnum(250*e.target.value+230*num2+160*num3);
        }
        if(e.target.name === "num2"){
            setnum2(e.target.value);
            setnumber(num1*1+e.target.value*1+num3*1);
            setnum(250*num1+230*e.target.value+160*num3);
        }
        if(e.target.name === "num3"){
            setnum3(e.target.value);
            setnumber(num1*1+num2*1+e.target.value*1);
            setnum(250*num1+230*num2+160*e.target.value);
        }
    }
    console.log(num);
    return (
        <div className="col-md-8 content_fixed" style={{height:"600px",fontSize:"24px"}}>
            <div style={{width:"65%"}}>
            <div className="blog-post" >
                <div style={{width:"200%"}} className="powerwidget cold-grey">
                        <header>
                        <h2>
                        購票內容
                        </h2>
                    </header>
                </div>
            <header className="header_4">
                <abbr>選擇票種張數</abbr>
            </header>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>票種</th>
                            <th>金額</th>
                            <th>張數</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <h4>一般票</h4>
                            </td>
                            <td>250元
                                
                            </td>
                            <td><label>
                                <select name="num1" id="" onChange={(e)=>{changeNum(e)}}>
                                    {num1?"":<option value="">選擇張數</option>}
                                    {list ? list : ""}
                                </select>
                            </label></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>
                                <h4>敬老票</h4>
                            </td>
                            <td>160元
                                <small>(出示65歲以上身分證)</small>
                            </td>
                            <td><label>
                            <select name="num2" id="" onChange={(e)=>{changeNum(e)}}>
                                    {num2?"":<option value="">選擇張數</option>}
                                    {list ? list : ""}
                                </select>
                            </label></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>
                                <h4>特價優惠</h4>
                            </td>
                            <td>160元
                                <small>(出示身心障礙手冊)</small>
                            </td>
                            <td><label>
                            <select name="num3" id="" onChange={(e)=>{changeNum(e)}}>
                                    {num3?"":<option value="">選擇張數</option>}
                                    {list ? list : ""}
                                </select>
                            </label></td>
                            <td></td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>合計金額:</td>
                            <td><div><label>{num}</label>&nbsp;元</div></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <footer>
                <Link style={{color:"black"}} className="btn btn-default" to={"../booking/page1"}>改選場次</Link>
                {num?<Link className="btn btn-info" style={{color:"black"}} to={`../booking/page3?price=${num}&number=${number}`}>進行劃位</Link>:<button className="btn btn-default" style={{background:"rgb(222,222,222)"}}>進行劃位</button>}
            </footer>
            </div>

                
            </div>
            
            <List cinema={props.cinema} price={num} number={number} categorysName={props.categorysName} movieName={props.movieName} movieinfo={props.movieinfo} date={props.date} time={props.time} />
        </div>
    )
}