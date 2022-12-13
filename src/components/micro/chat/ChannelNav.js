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
            <Title>Channels</Title>
            <Link to="/business/chat/fpVAtpBjJLPUanlCydra"># Help Desk</Link>
            {channels.map((channel, index) => (
                <ChannelListItem key={index} channel={channel} />
            ))}
        </Container>
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
