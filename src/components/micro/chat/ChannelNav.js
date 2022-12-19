import {
    useGetChatChannels,
    useGetDoc,
} from "../../../database/business/businessModel";

import { Link } from "react-router-dom";

import styled from "styled-components";

const Container = styled.div`
    border-top: 1px #eee solid;
    padding-top: 5px;
`;

const Title = styled.p`
    font-size: large;
    padding: 0px 20px;
`;

function ChannelNav() {
    const businessId = "fpVAtpBjJLPUanlCydra";

    const channels = useGetChatChannels(businessId);

    return (
        <Container>
            <Title>Open Channels</Title>
            <Link to="/business/chat/"># Help Desk</Link>
            {channels.map((channel, index) => (
                <ChannelListItem key={index} index={index} channel={channel} />
            ))}
        </Container>
    );
}

const ChannelListItem = ({ channel, handleIdChange, index }) => {
    const author = useGetDoc(`customers/${channel.customerId}`);
    console.log("Author: ", author);
    return (
        <Link key={index} to={`/business/chat/${channel.id}`}>
            # {author?.displayName ? author?.displayName : channel.id}
        </Link>
    );
};

export default ChannelNav;
