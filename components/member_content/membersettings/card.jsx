import { Link } from "react-router-dom";
export default function Cardlist(props) {

    console.log(props.cards);
    const cardslist =
        props.cards.map((elm, key) => {
            let account = "*" + elm.account.slice(10, 15);
            return elm.bankName ?
                <Link key={key} to={`../../user/settings/${key}`} id="credit_card_list">
                    <div id="card_content">
                        <p>{elm.bankName}</p>
                        <p>{account}</p>
                        <div></div>
                    </div>
                </Link>:"";
    });
    return (
        <div className="tab-pane active" id="settings" role="tabpanel" aria-labelledby="settings-tab">
            <div id="credit_card" className="list-group">
                <p id="credit_card_name" className="record-list-group-item-heading">
                    信用卡/金融卡
                </p>
                <div id="credit_card_content">
                    {cardslist}
                    <Link to={"../../user/settings/add"} id="credit_card_new">
                        <div id="card_content">
                            <p>+</p>
                            <p>新增卡片</p>
                            <div></div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}