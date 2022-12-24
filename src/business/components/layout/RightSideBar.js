import React from "react";

import { Route } from "react-router-dom";
import Members from "../micro/chat/ChatMembers";
import ReminderMembers from "../micro/reminder/ReminderMembers";

function RightSideBar({ businessId }) {
    return (
        <div
            style={{
                padding: "20px",
                borderLeft: "solid 1px #ccc",
                width: "150px",
            }}
        >
            <Route exact path="/">
                <Members businessId={businessId} />
            </Route>

            <Route path="/business/chat">
                <Members businessId={businessId} />
            </Route>

            <Route path="/business/reminder">
                <ReminderMembers businessId={businessId} />
            </Route>

            <Route exact path="/business/sms">
                <ReminderMembers businessId={businessId} />
            </Route>
        </div>
    );
}

export default RightSideBar;
