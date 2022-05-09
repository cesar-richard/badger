import React from "react";
import {Container} from "semantic-ui-react";
import './Badge.css';
const Badge = ({firstName, lastName, jobTitle, background}) => {
    return (
        <div className={"badge"} style={{
            textAlign: "center",
            paddingTop: "15mm",
            fontSize: "24pt",
            margin: "1mm",
            backgroundSize: "cover",
            backgroundImage: `url(${process.env.PUBLIC_URL + background})`
        }}>
            <div>
                <b>{firstName} {lastName}</b>
            </div>
            <div style={{marginTop:"15mm"}}>
                <i>{jobTitle}</i>
            </div>
        </div>
    );
}
export default Badge;