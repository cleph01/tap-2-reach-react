import React from "react";
import { Route, Switch } from "react-router-dom";
import Nav from "./components/layout/Nav";
import ChatBody from "./components/macro/chat/ChatBody";
import NotificationHome from "./components/macro/notification/NotificationHome";
import BlastHome from "./components/macro/blast/BlastHome";

function App() {
    return (
        <div className="App">
            <Nav />

            <Route exact path="/">
                <div>Home</div>
            </Route>
            <Route path="/business/chat">
                <ChatBody />
            </Route>
            <Route path="/business/notification">
                <NotificationHome />
            </Route>
            <Route path="/business/sms">
                <BlastHome />
            </Route>
        </div>
    );
}

export default App;
