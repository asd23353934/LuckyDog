import { useState, useEffect } from "react";
import axios from "axios";
export default function Chart(props) {
    const [date,setdate] = useState("");

    const [screen, setscreen] = useState("");
    const [count, setcount] = useState(1);
    const [length, setlength] = useState(0);
    const [cinemaName, setcinemaName] = useState("");
    const [movieName, setmovieName] = useState("");
    const [category, setcategory] = useState("");
    const [dateName, setdateName] = useState("");
    const [get0,setget0] = useState("");

    const [ReviseScreen_id,setReviseScreen_id]= useState("");
    const [ReviseCinemaName,setReviseCinemaName] = useState("");
    const [ReviseMovieName,setReviseMovieName] = useState("");
    const [ReviseCategoryName,setReviseCategoryName] = useState("");
    const [ReviseDateName,setReviseDateName] = useState("");
    const [ReviseTimeName,setReviseTimeName] = useState("");

    const [AddCinemaName,setAddCinemaName] = useState("");
    const [AddMovieName,setAddMovieName] = useState("");
    const [AddCategoryName,setAddCategoryName] = useState("");
    const [AddDateName,setAddDateName] = useState("");
    const [AddTimeName,setAddTimeName] = useState("");
    const [newoption,setnewoption] = useState("");
    useEffect(() => {
        if (props.screen !== "") {
            setscreen(getscreen(count));
            getmovie(movieName);
        }
    }, [props.screen, count, cinemaName, movieName, category, dateName]);
    useEffect(()=>{
        if(get0 !== ""){
            setscreen(getscreen(count,get0));
        }
    },[ReviseDateName,ReviseTimeName,ReviseMovieName,ReviseCinemaName,ReviseCategoryName,ReviseScreen_id]);
    let cinema = props.cinema.map((elm, key) => <option key={key} value={elm.name}>{elm.name}</option>);
    let movie = props.movie.map((elm, key) => <option key={key} value={elm.name_CN}>{elm.name_CN}</option>);
    let arr = ['數位板', '3D', '2D'];
    let categorys = arr.map((elm, key) => <option key={key} value={elm}>{elm}</option>);
    // console.log(props);
    function getmovie(name){
        let reg = new RegExp("-","g");
        let datearr = [];
        props.screen.map((elm) => {
            if (!datearr.includes(elm.show_date)) {
                if(name === ""){
                    datearr.push(elm.show_date);
                    datearr.sort((a,b)=>{
                        return a.replace(reg,"")-b.replace(reg,"");
                    });
                }else if(name === elm.movieName_CN){
                    datearr.push(elm.show_date);
                    datearr.sort((a,b)=>{
                        return a.replace(reg,"")-b.replace(reg,"");
                    });
                }
            }
        });
        // console.log(name);
        let dat = datearr.map((elm,key)=><option key={key} value={elm}>{elm}</option>);
        setdate(dat);
    }

    function getscreen(number, revise , del) {
        let num = 0;
        let a = "";
        let b = "";
        let c = "";
        let d = "";
        let len = 0;
        let ticketNum = "";
        let seatNum = 0;

        let test = props.screen.map((elm, key) => {
            seatNum = 0;
            cinemaName === "" ? a = "" : a = cinemaName === elm.cinemasName;
            movieName === "" ? b = "" : b = movieName === elm.movieName_CN;
            dateName === "" ? c = "" : c = dateName === elm.show_date;
            category === "" ? d = "" : d = category === elm.categorysName;
            let arr = [`${a}`, `${b}`, `${c}`, `${d}`];
            if ((arr.includes('true')  && !arr.includes('false')) || 
                (!arr.includes('true') && !arr.includes('false'))) {
                len++;
                if (len === revise) {
                    num++;
                    props.ticket.map((elm1) => {
                        if (elm1.screen_id === elm.screen_id) {
                            if(elm1.seat_name !== ""){
                                ticketNum = elm1.seat_name.split(",").length;
                            }else{
                                ticketNum = 0;
                            }
                        }
                    });
                    return (
                    <div className="chart_item1_list" style={{ backgroundColor: "rgba(143, 115, 139,0.877)" }} key={key}>
                        <p ><select name="cinema" onChange={(e) => { ReviseInfo(e) }}>
                            <option value="">選擇影城</option>
                            {cinema ? cinema : ""}
                        </select></p>
                        <p><input onChange={(e) => { ReviseInfo(e) }} type='date' /></p>
                        <p><input onChange={(e) => { ReviseInfo(e) }} type="time" /></p>
                        <p><select name='movie' onChange={(e) => { ReviseInfo(e) }}>
                            <option value="">選擇電影</option>
                            {movie ? movie : ""}
                        </select></p>
                        <p><select name='categorys' onChange={(e) => { ReviseInfo(e) }}>
                            <option value="">選擇撥放類型</option>
                            {categorys ? categorys : ""}
                            </select></p>
                        <p>{elm.theatersName}</p>
                        <p>{seatNum}/120</p>
                        <p>
                            <button value={len} onClick={(e) => { Revise_ok(e) }}>確認</button>
                            <button onClick={(e) => { Revise_cancel(e) }}>取消</button>
                        </p>
                    </div>)
                } else if (num < 10 && (number - 1) * 10 < len + 1) {
                    num++;
                    props.ticket.map((elm1) => {
                        if (elm1.screen_id === elm.screen_id) {
                            // console.log(elm1.seat_name,elm1.seat_name.split(",").length);
                            if(elm1.seat_name !== ""){
                                ticketNum = elm1.seat_name.split(",").length;
                            }else{
                                ticketNum = 0;
                            }
                            
                            seatNum += ticketNum;
                        }
                    });
                    return (
                        <div className="chart_item1_list" key={key}>
                            <p>{elm.cinemasName}</p>
                            <p>{elm.show_date}</p>
                            <p>{elm.show_time}</p>
                            <p>{elm.movieName_CN}</p>
                            <p>{elm.categorysName}</p>
                            <p>{elm.theatersName}</p>
                            <p>{seatNum}/120</p>
                            {del !== len?
                            <p>
                                <button value={[len,elm.screen_id]} name="revise" onClick={(e) => { Revise(e) }}>修改</button>
                                <button value={[len,elm.screen_id]} name="delete" onClick={(e)=>{deleteScreen(e)}}>刪除</button>
                            </p>:
                            <p style={{whiteSpace:"nowrap"}}>
                                <button style={{width:"70px"}} value={elm.screen_id} name="revise" onClick={(e) => { delete_ok(e) }}>確認刪除</button>
                                <button value={[len,elm.screen_id]} name="delete" onClick={(e)=>{Revise_cancel(e)}}>取消</button>
                            </p>}
                        </div>)
                        
                }
            }
        }

        );
        setlength(len);
        return test;
    }


    function Revise(e) {
        // console.log(e.target.value);
        let get = e.target.value.split(',');
        setscreen(getscreen(count, get[0] * 1));
        setget0(get[0] * 1);
        setReviseScreen_id(get[1]);
        setReviseDateName('');
        setReviseTimeName('');
        setReviseMovieName('');
        setReviseCinemaName('');
        setReviseCategoryName('');
    }
    function ReviseInfo(e) {
        
        if(e.target.type === 'date'){
            setReviseDateName(e.target.value);
        }
        if(e.target.type === 'time'){
            setReviseTimeName(e.target.value);
        }
        if(e.target.name === 'movie'){
            setReviseMovieName(e.target.value);
        }
        if(e.target.name === 'cinema'){
            setReviseCinemaName(e.target.value);
        }
        if(e.target.name === 'categorys'){
            setReviseCategoryName(e.target.value);
        }
        // console.log(ReviseDateName,ReviseTimeName,ReviseMovieName,RviseCinemaName,ReviseCategoryName,ReviseScreen_id);
    }
    function deleteScreen(e){
        // console.log(e.target.value);
        let get = e.target.value.split(',');
        setscreen(getscreen(count,"",get[0] * 1));
    }
    function delete_ok(e){
        axios.get(`http://localhost/icedog/ajax/Controller.php?id=screening_update&q=${e.target.value}`).then((response) => {
            if(response !== false){
                document.location.href = "http://localhost:3000/chart/screen";
            }else{
                console.log(response.data)
            }
        })
    }

    // console.log(ReviseDateName,ReviseTimeName,ReviseMovieName,ReviseCinemaName,ReviseCategoryName,ReviseScreen_id);
    
    function Revise_ok(e) {
        if(ReviseDateName && ReviseTimeName && ReviseMovieName && ReviseCinemaName && ReviseCategoryName && ReviseScreen_id){
            let arr = [ReviseScreen_id,ReviseCinemaName,ReviseCategoryName,ReviseMovieName,ReviseDateName,ReviseTimeName];
            axios.get(`http://localhost/icedog/ajax/Controller.php?id=screening_update&q=${arr}`).then((response) => {
                if(response !== false){
                    document.location.href = "http://localhost:3000/chart/screen";

                }else{
                    console.log(response.data)
                }
            })
        }else{
            console.log(ReviseDateName,ReviseTimeName,ReviseMovieName,ReviseCinemaName,ReviseCategoryName,ReviseScreen_id);
        }
    }
    // console.log([...newoption][0].key);
    function Revise_cancel(e) {
        setReviseDateName('');
        setReviseTimeName('');
        setReviseMovieName('');
        setReviseCinemaName('');
        setReviseCategoryName('');
        setscreen(getscreen(count));
    }



    function getvalue(e) {
        // console.log(e.target.name);
        setcount(1);
        if (e.target.name === 'cinema') {
            setcinemaName(e.target.value);
        }
        if (e.target.name === 'movie') {
            setmovieName(e.target.value);
        }
        if (e.target.name === 'categroys') {
            setcategory(e.target.value);
        }
        if (e.target.name === 'date') {
            setdateName(e.target.value);
        }
    }
    const [cou,setcou] = useState(0);
    function addscreening(){
            setnewoption(
                <div className="chart_item1_list" style={{ backgroundColor: "rgba(143, 115, 139,0.877)" }} key={0}>
                <p ><select name="cinema" onChange={(e) => { AddInfo(e) }}>
                    <option value="">選擇影城</option>
                    {cinema ? cinema : ""}
                </select></p>
                <p><input onChange={(e) => { AddInfo(e) }} type='date' /></p>
                <p><input onChange={(e) => { AddInfo(e) }} type="time" /></p>
                <p><select name='movie' onChange={(e) => { AddInfo(e) }}>
                    <option value="">選擇電影</option>
                    {movie ? movie : ""}
                </select></p>
                <p><select name='categorys' onChange={(e) => { AddInfo(e) }}>
                    <option value="">選擇撥放類型</option>
                    {categorys ? categorys : ""}
                    </select></p>
                <p>A</p>
                <p>0/120</p>
                <p>
                    <button onClick={Add_ok}>確認</button>
                    <button  onClick={cancel_addscr}>取消</button>
                </p>
            </div>
               );
    }
    useEffect(()=>{
        if(cou !== 0){
            addscreening();
        }
        
    },[cou,AddDateName,AddTimeName,AddMovieName,AddCinemaName,AddCategoryName])
    function AddInfo(e){
        if(e.target.type === 'date'){
            setAddDateName(e.target.value);
        }
        if(e.target.type === 'time'){
            setAddTimeName(e.target.value);
        }
        if(e.target.name === 'movie'){
            setAddMovieName(e.target.value);
        }
        if(e.target.name === 'cinema'){
            setAddCinemaName(e.target.value);
        }
        if(e.target.name === 'categorys'){
            setAddCategoryName(e.target.value);
        }
        console.log(e.target.value);
    }
    function Add_ok(){
        // console.log(AddDateName,AddTimeName,AddMovieName,AddCinemaName,AddCategoryName);
        if(AddDateName&&AddTimeName&&AddMovieName&&AddCinemaName&&AddCategoryName){
            let arr = [AddDateName,AddTimeName,AddMovieName,AddCinemaName,AddCategoryName];
            axios.get(`http://localhost/icedog/ajax/Controller.php?id=screening_insert&q=${arr}`).then((response) => {
                if(response !== false){
                    document.location.href = "http://localhost:3000/chart/screen";
    
                }else{
                    console.log(response.data)
                }
            })
        }


    }
    function cancel_addscr(e){
        // console.log(e.target.value,...newoption);
        if(newoption !== ""){
            console.log(newoption.filter(x=> x.key !== e.target.value));
            setnewoption(newoption.filter(x=> x.key !== e.target.value));
        }else{
            setnewoption("");
        }
        
    }
    return (
        <div>
            <div className="chart_Btn">
                <span>影城</span>
                <select name="cinema" onChange={(e) => { getvalue(e) }}>
                    <option value="">選擇影城</option>
                    {cinema ? cinema : ""}
                </select>
                <span>電影</span>
                <select name="movie" onChange={(e) => { getvalue(e) }}>
                    <option value="">選擇電影</option>
                    {movie ? movie : ""}
                </select>
                <span>類型</span>
                <select name="categroys" onChange={(e) => { getvalue(e) }}>
                    <option value="">類型</option>
                    {categorys ? categorys : ""}
                </select>
                <span>日期</span>
                <select name="date" onChange={(e) => { getvalue(e) }}>
                    <option value="">選擇日期</option>
                    {date ? date : ""}
                </select>
            </div>
            <div className="chart_menu">
                <p className="chart_item1_title">查詢內容</p>
                <div className="chart_item_content">
                    <div className="chart_item1_navbar">
                        <p>影城</p>
                        <p>日期</p>
                        <p>時間</p>
                        <p>名稱</p>
                        <p>類型</p>
                        <p>廳位</p>
                        <p style={{ width: "120px" }}>人數/座位</p>
                        <p>修改/刪除</p>
                    </div>
                    {screen ? screen : ""}
                </div>

                <div id="before_Next_Btn">
                     {count > 1 ? <button onClick={() => { setcount(x => x - 1) }}>上一頁</button> : "   "}
                     {count}/{Math.ceil(length / 10)}
                     {length > count * 10 ? <button onClick={() => { setcount(x => x + 1) }}>下一頁</button> : ""}
                </div>

                <div className="chart_item">
                    <p className="chart_item1_title">場次新增<button name="add" onClick={()=>{setcou(x => x + 1)}}>添加</button></p>
                    <div className="chart_item_content">
                        <div className="chart_item1_navbar">
                            <p>影城</p>
                            <p>日期</p>
                            <p>時間</p>
                            <p>名稱</p>
                            <p>類型</p>
                            <p>廳位</p>
                            <p>人數/座位</p>
                            <p>修改/刪除</p>
                        </div>
                        {newoption?newoption:""}
                        </div>
                </div>
            </div>
            
            
        </div>
    )
}