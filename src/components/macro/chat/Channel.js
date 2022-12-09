import React from "react";
import { useParams } from "react-router-dom";
import Members from "../../micro/chat/Members";
import ChannelInfo from "../../micro/chat/ChannelInfo";
import Messages from "../../micro/chat/Messages";
import ChatInputBox from "../../micro/chat/ChatInputBox";

function Channel() {
    const { customerId } = useParams();
    const businessId = "fpVAtpBjJLPUanlCydra";

    return (
        <div className="Channel">
            <div className="ChannelMain">
                <ChannelInfo customerId={customerId} businessId={businessId} />
                <Messages customerId={customerId} businessId={businessId} />
                <ChatInputBox customerId={customerId} businessId={businessId} />
            </div>
            <Members businessId={businessId} />
        </div>
    );
}

export default Channel;
