import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
`;

const DetailsWrapper = styled.article`
    width: 500px;
    border-radius: 10px;
`;

function HomeBody() {
    return (
        <Container>
            <h1>Help your customers help you grow your business.</h1>
            <h2>
                Modern Easy-to-use tools to help customers reach, promote, and
                help YOU grow.
            </h2>
            <div>
                <h3>Attract more customers and keep them coming back.</h3>
                <h4>Reviews</h4>
                Improve your reputation
                <h4>Website to SMS Chat</h4> Capture website leads Text
                Marketing Grow with text campaigns Customer <h4>ShoutOuts</h4>{" "}
                Promotes you to their inner circle
            </div>

            {/* <img
                src="https://cms.podium.com/wp-content/uploads/2022/04/HN-Homepage-2.gif"
                alt="texting"
            />
            <img
                src="https://cms.podium.com/wp-content/uploads/2022/03/HN-Homepage-1.gif"
                alt="reviews"
            /> */}
        </Container>
    );
}

export default HomeBody;
