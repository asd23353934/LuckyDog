

export default function Recordcontent(props){
    const content = 
        <div id="content" className="tab-content">
          <div className="tab-pane active" id="profile" role="tabpanel" aria-labelledby="profile-tab">
            <div id="record" className="list-group">
              <p id="record_name" className="record-list-group-item-heading">
                <span>{props.ticket.categorysName}</span> {props.ticket.movieName_CN}
              </p>
              <div id="next_content">
                <p className="list-group-item-heading">
                  上映場次
                  <span id="date">{props.ticket.show_date} </span>
                  <span>{props.ticket.show_time}</span>
                </p>
                <p className="list-group-item-heading">
                  上映廳院
                  <span id="cinemas">冰狗影城@</span>
                  <span>{props.ticket.cinemasName}</span>
                  <span>{props.ticket.theatersName}廳</span>
                </p>
                <p className="list-group-item-heading">
                  電影分類
                  <span id="categorys">{props.ticket.type}</span>
                </p>
                <p className="list-group-item-heading">
                  票券張數
                  <span id="categorys">{props.ticket.number}</span>
                </p>
                <p className="list-group-item-heading">
                  劃位座號
                  <span id="categorys">{props.ticket.seat_name}</span>
                </p>
                <p className="list-group-item-heading">
                  餐點食物
                  <span id="categorys">{props.ticket.foodAll}</span>
                </p>
                <p className="list-group-item-heading">
                  付款金額
                  <span id="categorys">{props.ticket.priceAll}</span>
                </p>
              </div>
            </div>
            </div>
        </div>;
    return(
        <div>{content}</div>
    )
}