import { Link } from "react-router-dom";
export default function Record(props){
    const ticketContent = 
    props.ticket.map((elm, key) =>
        <div id="ticket" key={key} className="list-group">
            <p id="ticket_name" className="ticket-list-group-item-heading">
                <span>{elm.categorysName}</span> {elm.movieName_CN}
            </p>
            <Link id="ticket_content" to={`../user/messages/${key}` }>
                <p className="list-group-item-heading">
                上映場次
                    <span id="date">{elm.show_date} </span>
                    <span>{elm.show_time}</span>
                </p>
                <p className="list-group-item-heading">
                        上映廳院
                        <span id="cinemas">冰狗影城@</span>
                        <span>{elm.cinemasName}</span>
                        <span>{elm.theatersName}廳</span>
                </p>
                <p id="click_check">點擊查看</p>
            </Link>
        </div>
    );

    return(
        <div id="content" className="tab-content">
        <div className="tab-pane active" id="profile" role="tabpanel" aria-labelledby="profile-tab">
            {props.ticket?ticketContent:""}
        </div>
    </div>
    )
}