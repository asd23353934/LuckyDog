import { React, useState } from "react";
import Updata from "./updata";
export default function Password(props) {
    const [check, setCheck] = useState("");
    // const [warn,setWarn] = useState("");
    const [err, setErr] = useState("no");
    console.log(props.id, props.users.password);
    function passwordPress(e) {
        setCheck(err);
        e.preventDefault();
    }
    function inputCheck(e) {
        console.log("123");
        setCheck("");
        if (e.target.value === props.users.password) {
            setErr("ok");
        } else {
            setErr("no");
        }
    }
    function preventBubble(e) {
        let buttonPress = document.querySelector(".next");
        if (e.key === "Enter") {
            buttonPress.click();
            e.preventDefault();
        }
    }
    const pass =
        <form>
            <div className="row check">
                <p id="name">密碼<input onChange={(e) => { inputCheck(e) }} onKeyDown={(e) => { preventBubble(e) }} id="password_check"></input></p>
            </div>
            <button type="button" onClick={(e) => { passwordPress(e) }} className="next btn btn-primary">下一步</button>
            {check}
        </form>;
    return (
        <div>{check === "" || check === "no"?pass:<Updata id={props.id} users={props.users}/>}</div>
    )
}