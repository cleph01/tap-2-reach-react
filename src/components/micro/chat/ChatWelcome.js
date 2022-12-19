import { useState } from "react";
import { useHistory } from "react-router-dom";

import styled from "styled-components";

import { createChannelFromOneOff } from "../../../database/business/businessModel";

const Container = styled.div`
    height: 100%;
`;

const Header = styled.header`
    padding: 20px;
`;

const Body = styled.div``;
function ChatWelcome() {
    return (
        <Container>
            <Header>
                <InputNumber />
                <h1>Connect the way customers prefer.</h1>
                <div>
                    Because Tap-2-Reach immediately takes the conversation to
                    text, customers can stay connected on their terms while you
                    manage all the incoming messages from one web enabled
                    device.
                </div>
            </Header>
            <Body>
                <picture>
                    <img
                        style={{ width: "600px", height: "auto" }}
                        alt="webchat"
                        src="https://cms.podium.com/wp-content/uploads/2022/04/HN-Webchat-2.gif"
                    />
                </picture>
            </Body>
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

const RecipientInput = styled.input`
    font: inherit;
    border: 1px solid transparent;

    &hover {
        border-color: #ccc;
    }
`;

const ConfirmButton = styled.button`
    border-radius: 5px;
    background: transparent;
`;

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 50px;
`;
const InputNumber = () => {
    const history = useHistory();

    const businessId = "fpVAtpBjJLPUanlCydra";

    const [cellphone, setCellphone] = useState("");

    const handleCellChange = (e) => {
        e.preventDefault();

        setCellphone(e.target.value);
    };

    const handleStartChatClick = async (e) => {
        e.preventDefault();

        const response = await createChannelFromOneOff(businessId, cellphone);

        if (response !== "error") {
            history.push(`/business/chat/${cellphone}`);
        }
    };

    console.log("celphone at Blast Welcome: ", cellphone);
    return (
        <HeaderContainer>
            <InputWrapper>
                <RecipientInput
                    placeholder="Enter Number"
                    onChange={handleCellChange}
                />
            </InputWrapper>
            <ConfirmButton onClick={handleStartChatClick}>
                Start Chat
            </ConfirmButton>
        </HeaderContainer>
    );
};

export default ChatWelcome;
