import { useParams, Link } from "react-router-dom";

import {
    useGetChatMessages,
    useGetDoc,
} from "../../../database/business/businessModel.js";

import styled from "styled-components";

const Container = styled.div`
    flex: 1;
    padding: 10px 20px 10px 20px;
    line-height: 1.3;
    overflow: auto;
`;

const EndOfMessages = styled.div`
    text-align: center;
    color: hsl(200, 50%, 50%);
    padding: 5px;
`;

function Messages({ businessId }) {
    const { customerId } = useParams();

    console.log("CustomerId at Messages: ", customerId);

    const messages = useGetChatMessages(
        `chats/${businessId}/channels/${customerId}/messages`
    );

    return (
        <Container>
            <Header />
            <EndOfMessages>That's every message!</EndOfMessages>
            {messages.map((message, index) => {
                const previous = messages[index - 1];
                const showDay = false;
                const showAvatar =
                    !previous || message.user.id !== previous.user.id;
                return showAvatar ? (
                    <FirsMessageFromUser key={index} message={message} />
                ) : (
                    <div key={index}>
                        <div className="Message no-avatar">
                            <div className="MessageContent">{message.text}</div>
                        </div>
                    </div>
                );
            })}
            {/* <ChatMembers businessId={businessId} /> */}
        </Container>
    );
}

const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    font-weight: bold;
    border-bottom: solid 1px #ccc;
`;

const Name = styled.div``;
const CellPPhone = styled.div`
    font-size: smaller;
    margin-left: 15px;
`;

const Recipient = styled.div``;

const Header = () => {
    const { customerId } = useParams();

    const customer = useGetDoc(`customers/${customerId}`);

    return (
        <HeaderContainer>
            <Recipient>
                <Name>@ {customer?.displayName}</Name>
                <CellPPhone>{customer?.cellPhone}</CellPPhone>
            </Recipient>
            <Link to="/business/chat">New Message</Link>
        </HeaderContainer>
    );
};

const FirsMessageFromUser = ({ message, showDay }) => {
    const author = useGetDoc(message.user.path);

    console.log(" author: ", author);
    return (
        <div>
            {showDay && (
                <div className="Day">
                    <div className="DayLine" />
                    <div className="DayText">12/6/2018</div>
                    <div className="DayLine" />
                </div>
            )}

            <div className="Message with-avatar">
                <div className="Avatar" />
                <div className="Author">
                    <div>
                        <span className="UserName">
                            {/* {author && author.displayName}{" "} */}
                        </span>
                        <span className="TimeStamp">
                            {/* {message.createdOn.toDate()} */}
                        </span>
                    </div>
                    <div className="MessageContent">{message.text}</div>
                </div>
            </div>
        </div>
    );
};
export default Messages;
