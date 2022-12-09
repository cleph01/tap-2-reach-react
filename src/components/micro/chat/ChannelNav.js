import {
    useGetChatChannels,
    useGetDoc,
} from "../../../database/business/businessModel";

import { Link } from "react-router-dom";

function ChannelNav() {
    const businessId = "fpVAtpBjJLPUanlCydra";

    const channels = useGetChatChannels(businessId);

    return (
        <div style={{ borderTop: "1px #eee solid", paddingTop: "5px" }}>
            <div style={{ padding: "8px 20px" }}>Channels</div>
            <Link to="/business/chat/fpVAtpBjJLPUanlCydra"># Help Desk</Link>
            {channels.map((channel, index) => (
                <ChannelListItem key={index} channel={channel} />
            ))}
        </div>
    );
}

const ChannelListItem = ({ channel, handleIdChange, key }) => {
    const author = useGetDoc(`customers/${channel.customerId}`);
    console.log("Author: ", author);
    return (
        <Link to={`/business/chat/${channel.id}`}># {author?.displayName}</Link>
    );
};

export default ChannelNav;
