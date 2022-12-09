import {
    useGetChatMessages,
    useGetDoc,
} from "../../../database/business/businessModel.js";

function Messages({ businessId, customerId }) {
    const messages = useGetChatMessages(
        `chats/${businessId}/channels/${customerId}/messages`
    );

    return (
        <div className="Messages">
            <div className="EndOfMessages">That's every message!</div>
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
        </div>
    );
}

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
