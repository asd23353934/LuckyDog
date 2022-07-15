import Memberlist from "./memberlist";
import "../../member/members.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams , Link} from "react-router-dom";
import Cardlist from "./membersettings/card";
import Cardcontent from "./membersettings/cardcontent";
import Cardadd from "./membersettings/cardadd";
export default function Settings(props) {
    let useParam = useParams();
    console.log(useParam);
    const [card, setcard] = useState([]);
    const [load, setload] = useState(false);
    useEffect(() => {
        if (props.users.user_id !== '') {
            getUsers();
        }
    }, [props.users.user_id]);

    function getUsers() {
        axios.get(`http://localhost/icedog/ajax/Controller.php?q=${props.users.user_id}&id=card`, { responseType: "json" }).then((response) => {
            if (response.data !== false) {
                console.log(response.data);
                setcard(response.data);
                setload(true);
            } else {
                console.log("沒銀行");
                setload(true);
            }
        });
    }
    const Loading =
        <div className="spinner-border text-light">
            <span className="visually-hidden">Loading...</span>
        </div>;
    if (!sessionStorage.getItem('userInfo')) {
        document.location.href = "http://localhost:3000/login/home";
    }
    const firstcard = 
    <div className="tab-pane active" id="settings" role="tabpanel" aria-labelledby="settings-tab">
            <div id="credit_card" className="list-group">
                <p id="credit_card_name" className="record-list-group-item-heading">
                    信用卡/金融卡
                </p>
                <div id="credit_card_content">
                    <Link to={"../../user/settings/add"} id="credit_card_new">
                        <div id="card_content">
                            <p>+</p>
                            <p>新增卡片</p>
                            <div></div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>;
    return (
        <div id="all">
            <div id="all_content">
            <Memberlist param={"settings"}/>
                <div id="content" className="tab-content">
                    {load ? "" : Loading}
                    {useParam.id === "cards" && card !== "沒銀行" ? <Cardlist cards={card} /> : ""}
                    {useParam.id === "cards" && card === "沒銀行" ? firstcard : ""}
                    {card[useParam.id] ? <Cardcontent card={card[useParam.id]} /> : ""}
                    {useParam.id === "add" ? <Cardadd users={props.users} /> : ""}
                </div>
            </div>
        </div>
    )
}