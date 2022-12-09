import { Link } from "react-router-dom";

function HomeNav({ businessId, setCustomerId }) {
    return (
        <div
            style={{
                paddingBottom: "5px",

                marginBottom: "5px",
            }}
        >
            <div style={{ padding: "8px 20px" }}>Menu</div>
            <Link to="/">Home</Link>
            <Link to="/business/chat">Chat</Link>
            <Link to="/business/notification">View Reminders</Link>
            <Link to="/business/sms">Send Blast</Link>
        </div>
    );
}

export default HomeNav;
