export default function Cardcontent(props) {
    return (
        <div>
            <div id="credit_card" className="list-group" style={{width:"90%",margin:"0 auto",marginTop:"10px"}}>
                <p id="credit_card_name" className="record-list-group-item-heading">
                    {props.card.bankName}
                </p>
                <div id="credit_card_content">
                    <div id="content_card">
                        <p>卡號 <span>{props.card.account}</span> </p>
                        <p>有效日期 <span>{props.card.year}/{props.card.month}</span></p>
                    </div>
                </div>
            </div>
        </div>

    )
}