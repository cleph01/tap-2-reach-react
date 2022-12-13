import React from "react";
import { Switch, Route } from "react-router-dom";
import ChatWelcome from "../../micro/chat/ChatWelcome";
import ChatBody from "../chat/ChatBody";

import Channel from "../chat/Channel";

import NotificationHome from "../reminder/ReminderHome";
import BlastHome from "../blast/BlastHome";
import Header from "../../layout/Header.js";

function HomeBody() {
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div>Home</div>
        </div>
    );
}

export default HomeBody;
