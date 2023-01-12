import { Route, Switch, useHistory } from "react-router-dom";
import { PhonelinkLockOutlined } from "@mui/icons-material";
import { Avatar, CardHeader, IconButton, ListItemAvatar } from "@mui/material";
import { useState } from "react";

import image1 from "../../../assets/IMG_4330.jpg";

import styled from "styled-components";
import AddPromotion from "../../micro/promotions/AddPromotion";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: scroll;
`;

const Body = styled.section`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
`;

const Hr = styled.hr`
    flex: 1;
    height: 1px;
    background: #ccc;

    margin: 25px 6px;
`;

const PromotionsHome = () => {
    const [promotions, setPromotions] = useState();

    const businessId = "fpVAtpBjJLPUanlCydra";

    const history = useHistory();

    return (
        <Container>
            <Switch>
                <Route path="/business/promotions/add">
                    <AddPromotion />
                </Route>
                <Route path="/business/promotions/">
                    <Header history={history} />
                    <Body>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                border: "1px solid #454545",
                                borderRadius: "3px",
                                margin: "10px",
                                padding: "10px",
                                width: "300px",

                                aspectRatio: "9/16",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <CardHeader
                                    avatar={
                                        <Avatar
                                            loading="lazy"
                                            alt="bla"
                                            src="/static/images/avatar/1.jpg"
                                            sx={{
                                                /* bgcolor: red[500],*/
                                                width: 50,
                                                height: 50,
                                                margin: "auto",
                                                padding: "10px",
                                                border: "1px solid #f0f0f0",
                                            }}
                                        />
                                    }
                                    action={
                                        <a
                                            href={`tel:+19143125729`}
                                            style={{ textDecoration: "none" }}
                                        >
                                            <IconButton aria-label="settings">
                                                <PhonelinkLockOutlined />
                                            </IconButton>
                                        </a>
                                    }
                                    title="Papas Jewelry"
                                    subheader="13 Maple Place PCNY"
                                />

                                <div
                                    style={{
                                        display: "flex",
                                        marginLeft: "10px",
                                        marginBottom: "10px",
                                    }}
                                >
                                    <div
                                        style={{
                                            backgroundColor: "transparent",
                                            color: "#ffd700",
                                        }}
                                    >
                                        &#9733;
                                    </div>
                                    <div
                                        style={{
                                            backgroundColor: "transparent",
                                            color: "#ffd700",
                                        }}
                                    >
                                        &#9733;
                                    </div>
                                    <div
                                        style={{
                                            backgroundColor: "transparent",
                                            color: "#ffd700",
                                        }}
                                    >
                                        &#9733;
                                    </div>
                                    <div
                                        style={{
                                            backgroundColor: "transparent",
                                            color: "#ffd700",
                                        }}
                                    >
                                        &#9733;
                                    </div>
                                    <div
                                        style={{
                                            backgroundColor: "transparent",
                                            color: "#ccc",
                                        }}
                                    >
                                        &#9733;
                                    </div>
                                </div>
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    width: "100%",
                                    aspectRatio: "9/16",
                                }}
                            >
                                <div
                                    style={{
                                        textAlign: "center",
                                        fontSize: "36px",
                                        fontWeight: "bold",
                                        margin: "10px 0",
                                    }}
                                >
                                    Header
                                </div>
                                <div
                                    style={{
                                        textAlign: "center",
                                        flexGrow: "1",
                                    }}
                                >
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                    Cras ornare arcu dui vivamus arcu felis.
                                    Vitae auctor eu augue ut lectus.
                                </div>
                                <div
                                    style={{
                                        textAlign: "center",
                                        margin: "10px 0",
                                        flex: "0",
                                    }}
                                >
                                    Footer
                                </div>
                            </div>
                            <Hr />
                            <div style={{ marginBottom: "10px" }}>
                                Description: 50% Off All Bichos
                            </div>
                        </div>
                        <Review />
                        <Review />
                        <Review />
                    </Body>
                </Route>
            </Switch>
        </Container>
    );
};

const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 10px 20px;
    font-weight: bold;
    border-bottom: solid 1px #ccc;
    cursor: pointer;
`;

const All = styled.div`
    font-weight: bold;
`;
const NeedsResponse = styled.div`
    color: #e1e1e1;
    margin-left: 10px;
`;

const Header = ({ history }) => {
    return (
        <HeaderContainer>
            <div
                onClick={() => history.push("/business/promotions/add")}
                style={{
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    padding: "10px",
                    boxShadow: "5px 5px 5px rgba(68, 68, 68, 0.6)",
                }}
            >
                Add New Promo
            </div>
        </HeaderContainer>
    );
};

const Review = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                border: "1px solid #454545",
                borderRadius: "3px",
                margin: "10px",
                padding: "10px",
                width: "300px",

                aspectRatio: "9/16",
            }}
        >
            <div style={{ display: "flex", flexDirection: "column" }}>
                <CardHeader
                    avatar={
                        <Avatar
                            loading="lazy"
                            alt="bla"
                            src="/static/images/avatar/1.jpg"
                            sx={{
                                /* bgcolor: red[500],*/
                                width: 50,
                                height: 50,
                                margin: "auto",
                                padding: "10px",
                                border: "1px solid #f0f0f0",
                            }}
                        />
                    }
                    action={
                        <a
                            href={`tel:+19143125729`}
                            style={{ textDecoration: "none" }}
                        >
                            <IconButton aria-label="settings">
                                <PhonelinkLockOutlined />
                            </IconButton>
                        </a>
                    }
                    title="Papas Jewelry"
                    subheader="13 Maple Place PCNY"
                />

                <div
                    style={{
                        display: "flex",
                        marginLeft: "10px",
                        marginBottom: "10px",
                    }}
                >
                    <div
                        style={{
                            backgroundColor: "transparent",
                            color: "#ffd700",
                        }}
                    >
                        &#9733;
                    </div>
                    <div
                        style={{
                            backgroundColor: "transparent",
                            color: "#ffd700",
                        }}
                    >
                        &#9733;
                    </div>
                    <div
                        style={{
                            backgroundColor: "transparent",
                            color: "#ffd700",
                        }}
                    >
                        &#9733;
                    </div>
                    <div
                        style={{
                            backgroundColor: "transparent",
                            color: "#ffd700",
                        }}
                    >
                        &#9733;
                    </div>
                    <div
                        style={{
                            backgroundColor: "transparent",
                            color: "#ccc",
                        }}
                    >
                        &#9733;
                    </div>
                </div>
            </div>

            <div
                style={{ display: "flex", width: "100%", aspectRatio: "9/16" }}
            >
                {/* <img style={{width:"100%"}} alt="bla" src="https://placekitten.com/64/64" /> */}
                {/* <video
                    loop
                    width="100%"
                    src="https://v16m-webapp.tiktokcdn-us.com/cd313e804a0b4e049160442172d9a00c/63a68fe1/video/tos/useast2a/tos-useast2a-pve-0068/oIWaABvERUkAIJXbcCIQwMnjQgeeDBwvBQJR9l/?a=1988&ch=0&cr=0&dr=0&lr=tiktok_m&cd=0%7C0%7C1%7C0&cv=1&br=2068&bt=1034&cs=0&ds=3&ft=4KLMeMzm8Zmo05xWU64jVKfrdpWrKsdm&mime_type=video_mp4&qs=0&rc=MzQ4O2kzNTk6Ozg0OjU5NUBpMzNyOWg6ZnZpaDMzNzczM0AzYjM2MTEzNV4xNGIuYjA0YSNjbi02cjQwNV9gLS1kMTZzcw%3D%3D&l=202212232336241E7C518FF8269AD0F8AE"
                ></video> */}
                {/* <video
                    loop
                    width="100%"
                    src="https://youtu.be/7PzebwOFmv8?t=3"
                ></video> */}

                <img
                    style={{
                        width: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                    }}
                    alt="bla"
                    src={image1}
                />
            </div>
            <Hr />
            <div style={{ marginBottom: "10px" }}>
                Description: 50% Off All Bichos
            </div>
        </div>
    );
};

export default PromotionsHome;
