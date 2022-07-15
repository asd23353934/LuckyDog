import Memberlist from "./memberlist";
import "../../member/members.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Ticket from "./memberprofile/ticket";
import TicketContent from "./memberprofile/ticketcontent";
export default function Profile(props) {
    let useParam = useParams();
    console.log(useParam);
    const [movie_ticket, setmovie_ticket] = useState([]);
    const [load, setload] = useState(false);
    useEffect(() => {
        if (props.users.user_id !== '') {
            getUsers();
        }
    }, [props.users.user_id]);

    function getUsers() {
        axios.get(`http://localhost/icedog/ajax/Controller.php?q=${props.users.user_id}&id=movieticket`, { responseType: "json" }).then((response) => {
            if (response.data !== false) {
                console.log(response.data);
                setmovie_ticket(response.data);
                setload(true);
            } else {
                setload(true);
                setmovie_ticket("沒票");
                console.log(response.data);
            }
        })
    }
    const Loading =
        <div className="spinner-border text-light">
            <span className="visually-hidden">Loading...</span>
        </div>;
    if (!sessionStorage.getItem('userInfo')) {
        document.location.href = "http://localhost:3000/login/home";
    }
    const ticketnotting =
        <div id="content" className="tab-content">
            <div className="tab-pane active" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                <div>尚未有上映的票券</div>
            </div>
        </div>
        ;
    return (
        <div id="all">
            <div id="all_content">
            {load ? "" : Loading}
                <Memberlist param={"profile"} />
                {useParam.id === "ticket" && movie_ticket !== "沒票" ? <Ticket ticket={movie_ticket} /> : ""}
                {useParam.id === "ticket" && movie_ticket === "沒票" && load ? ticketnotting : ""}
                
                {movie_ticket[useParam.id] ? <TicketContent ticket={movie_ticket[useParam.id]} /> : ""}
            </div>
        </div>
    )
}