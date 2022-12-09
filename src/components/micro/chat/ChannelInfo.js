import React from "react";
import { useGetDoc } from "../../../database/business/businessModel";

function ChannelInfo({ customerId }) {
    const customer = useGetDoc(`customers/${customerId}`);
    return (
        <div className="ChannelInfo">
            <div className="Topic">
                Channel Status: <input className="TopicInput" value="Open" />
            </div>
            <div className="ChannelName">@{customer?.displayName}</div>
        </div>
    );
}

export default ChannelInfo;
