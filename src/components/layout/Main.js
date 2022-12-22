import React from "react";
import { Route } from "react-router-dom";

import ReminderHome from "../macro/reminder/ReminderHome";
import BlastHome from "../macro/blast/BlastHome";
import HomeBody from "../macro/home/HomeBody";
import ChatHome from "../macro/chat/ChatHome";
import ReviewHome from "../macro/reviews/ReviewHome";
import TopInfluencers from "../macro/influencers/TopInfluencers";

import styled from "styled-components";
import AllCustomersHome from "../macro/customers/AllCustomersHome";

const Container = styled.section`
    flex: 1;
`;
function Main({ businessId }) {
    return (
        <Container>
            <Route exact path="/">
                <HomeBody />
            </Route>
            <Route path="/business/reminder">
                <ReminderHome />
            </Route>
            <Route path="/business/sms">
                <BlastHome />
            </Route>
            <Route path="/business/customers">
                <AllCustomersHome businessId={businessId} />
            </Route>
            <Route path="/business/influencers">
                <TopInfluencers businessId={businessId} />
            </Route>
            <Route path="/business/chat">
                <ChatHome businessId={businessId} />
            </Route>
            <Route path="/business/reviews">
                <ReviewHome businessId={businessId} />
            </Route>
        </Container>
    );
}

export default Main;
