import React from "react";
import { Route, Switch, useParams } from "react-router-dom";

import ChatBody from "../macro/chat/ChatBody";
import NotificationHome from "../macro/notification/NotificationHome";
import BlastHome from "../macro/blast/BlastHome";
import HomeBody from "../macro/home/HomeBody";
import Header from "./Header";
import ChatWelcome from "../micro/chat/ChatWelcome";
import Messages from "../micro/chat/Messages";
import ChatInputBox from "../micro/chat/ChatInputBox";

function Main({ businessId }) {
    const { customerId } = useParams();
    console.log("CustomerId: ", customerId);
    return (
        <main style={{ flex: "1", display: "flex", flexDirection: "column" }}>
            <Header />
            <Route exact path="/">
                <HomeBody />
            </Route>
            <Route exact path="/business/notification/add-reminder">
                <NotificationHome />
            </Route>
            <Route exact path="/business/sms">
                <BlastHome />
            </Route>

            <Route path="/business/chat/:customerId">
                <Messages businessId={businessId} customerId={customerId} />
                <ChatInputBox businessId={businessId} />
            </Route>
            <Route path="/business/chat">
                <ChatWelcome />
            </Route>
        </main>
    );
}

export default Main;
