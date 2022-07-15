export default function List(props){
    return(
        <div className="col-md-4 col-5 text" >
            <div>
                <div className="text-widget poster_cover" style={{margin:"325px 0 0 0"}}>
                    {props.movieinfo.image?<img id="labPoster" style={{width:"250px",height:"350px",margin:"-380px 0 0 400px"}} src={require(`../../movie_image/${props.movieinfo.image}`)} alt="" />:<img style={{width:"250px",height:"350px",margin:"-380px 0 0 400px"}} id="labPoster" src=""alt="" />}
                    
                    <ul className="list_bottom" style={{color:"black", margin:"0 0 225px 0",fontSize:"24px"}}>
                        <h3 className="distance_2" style={{width:"90%"}}>({props.categorysName}) {props.movieName}</h3>
                        <h5 style={{width:"90%"}}>{props.movieinfo.name_EN}</h5>
                        <li>
                            <dd>首映日期:</dd>
                            <dd>{props.movieinfo.listing_date}</dd>
                        </li>
                        <li>
                            <dd>版&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本:</dd>
                            <dd>{props.categorysName}</dd>
                        </li>
                        <li>
                            <dd>片&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;長:</dd>
                            <dd>{props.movieinfo.duration}</dd>
                        </li>
                        <li>
                            <dd>類&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;別:</dd>
                            <dd>{props.movieinfo.type}</dd>
                        </li>
                    </ul>
                    <ul style={{color:"black", margin:"-100px 0 0 150px",fontSize:"24px"}}>
                        <li>
                            <span>上映廳院:</span>
                            <dd>{props.cinema}/A廳</dd>
                        </li>
                        <li>
                            <span>上映場次:</span>
                            <dd>{props.date} - {props.time}</dd>
                        </li>
                        <li>
                            <span>票種張數:</span>
                            <dd>{props.number?props.number:0}</dd>
                        </li>
                        <span>座位位置:</span>
                        <li >
                            <dd style={{width:"50%",wordWrap:'break-word'}}>{props.seat?`${ props.seat }`:""}</dd>
                        </li>
                        <li>
                            <span>餐點:</span>
                            <dd>{props.foodName?`${ props.foodName }`:""}</dd>
                        </li>
                        <li>
                            <span>金額:</span>
                            {props.price && !props.foodPrice?<dd>{props.price}</dd>:""}
                            {props.price && props.foodPrice ?<dd>{props.price*1+props.foodPrice*1}</dd>:""}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}