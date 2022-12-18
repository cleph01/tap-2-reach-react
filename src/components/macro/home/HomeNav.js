import { Link } from "react-router-dom";

import styled from "styled-components";

const Container = styled.div`
    padding-bottom: 5px;
    margin-bottom: 5px;
`;

const Title = styled.p`
    font-size: large;
    padding: 0px 20px;
`;

function HomeNav() {
    return (
        <Container>
            <Title>Menu</Title>
            <Link to="/">Home</Link>
            <Link to="/business/chat">Chat Room</Link>
            <Link to="/business/influencers">Top Influencers</Link>
            <Link to="/business/customers">All Customers</Link>
            <Link to="/business/reminder">View Reminders</Link>
            <Link to="/business/sms">Send Blast</Link>
            <Link to="/business/reviews">Google Reviews</Link>
        </Container>
    );
}

export default HomeNav;
