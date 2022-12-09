import React from "react";
import { Switch, Route } from "react-router-dom";
import ChatWelcome from "../../micro/chat/ChatWelcome";

import Channel from "./Channel";

function ChatBody() {
    return (
        <div>
            <Switch>
                <Route exact path="/business/chat">
                    <ChatWelcome />
                </Route>
                <Route exact path="/business/chat/:customerId">
                    <Channel />
                </Route>
            </Switch>
        </div>
    );
}

export default ChatBody;
