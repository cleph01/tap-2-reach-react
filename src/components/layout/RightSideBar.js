import React from "react";

import { Route } from "react-router-dom";
import Members from "../micro/chat/Members";
import ReminderMembers from "../micro/notification/ReminderMembers";

function RightSideBar({ businessId }) {
    return (
        <div
            style={{
                padding: "20px",
                borderLeft: "solid 1px #ccc",
                width: "150px",
            }}
        >
            <Route path="/business/chat">
                <Members businessId={businessId} />
            </Route>

            <Route path="/business/notification/add-reminder">
                <ReminderMembers businessId={businessId} />
            </Route>

            <Route exact path="/business/sms">
                <ReminderMembers businessId={businessId} />
            </Route>
        </div>
    );
}

export default RightSideBar;
