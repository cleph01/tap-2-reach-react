import React from "react";
import { Route, Switch, useParams } from "react-router-dom";

import ChatBody from "../macro/chat/ChatBody";
import ReminderHome from "../macro/reminder/ReminderHome";
import BlastHome from "../macro/blast/BlastHome";
import HomeBody from "../macro/home/HomeBody";
import ChatMain from "../macro/chat/ChatMain";

import styled from "styled-components";

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
            <Route exact path="/business/sms">
                <BlastHome />
            </Route>

            <Route path="/business/chat">
                <ChatMain businessId={businessId} />
            </Route>
        </Container>
    );
}

export default Main;
