import React from "react";
import { Switch, Route } from "react-router-dom";
import ChatWelcome from "../../micro/chat/ChatWelcome";
import ChatBody from "../chat/ChatBody";

import Channel from "../chat/Channel";

import NotificationHome from "../notification/NotificationHome";
import BlastHome from "../blast/BlastHome";
import Header from "../../layout/Header.js";

function HomeBody() {
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <Header />
            <Switch>
                <Route exact path="/">
                    <div>Home</div>
                </Route>
                <Route exact path="/business/chat/:customerId">
                    <ChatBody />
                </Route>
                <Route exact path="/business/chat">
                    <ChatWelcome />
                </Route>

                <Route path="/business/notification">
                    <NotificationHome />
                </Route>
                <Route path="/business/sms">
                    <BlastHome />
                </Route>
            </Switch>
        </div>
    );
}

export default HomeBody;
