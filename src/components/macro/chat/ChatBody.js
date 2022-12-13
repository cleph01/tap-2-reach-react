import React from "react";
import { Switch, Route } from "react-router-dom";
import ChatInputBox from "../../micro/chat/ChatInputBox";
import ChatWelcome from "../../micro/chat/ChatWelcome";
import Members from "../../micro/chat/ChatMembers";
import Messages from "../../micro/chat/Messages";

import Channel from "./Channel";

function ChatBody({ businessId, customerId }) {
    return (
        <div className="Channel">
            <div className="ChannelMain">
                <Switch>
                    <Route exact path="/business/chat">
                        <ChatWelcome />
                    </Route>
                    <Route exact path="/business/chat/:customerId">
                        <Messages
                            customerId={customerId}
                            businessId={businessId}
                        />
                        <ChatInputBox
                            customerId={customerId}
                            businessId={businessId}
                        />
                    </Route>
                </Switch>
            </div>
            <Members businessId={businessId} />
        </div>
    );
}

export default ChatBody;
