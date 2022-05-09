import React from "react";
import './Badge.css';

const Badge = ({firstName, lastName, jobTitle, background}) => {
    return (
        <div className={"badge"} style={{
            fontFamily: 'Bebas Neue',
            textAlign: "center",
            fontSize: "24pt",
            margin: "1mm",
            backgroundSize: "cover",
            backgroundImage: `url(${process.env.PUBLIC_URL + background})`
        }}>
            <div style={{position: "relative", top: "25mm"}}>
                {firstName} {lastName}
            </div>
            <div style={{position: "relative", fontSize: firstName===""&&lastName===""?"24pt":"18pt", top: firstName===""&&lastName===""?"30mm":"35mm"}}>
                {jobTitle}
            </div>
        </div>
    );
}
export default Badge;