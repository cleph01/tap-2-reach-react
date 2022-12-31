import { useHistory } from "react-router-dom";
import { PhonelinkLockOutlined } from "@mui/icons-material";
import {
    Avatar,
    Box,
    CardHeader,
    FormControl,
    IconButton,
    InputLabel,
    ListItemAvatar,
    MenuItem,
    Select,
    Slider,
    TextField,
} from "@mui/material";
import { useState } from "react";

import image1 from "../../../assets/IMG_4330.jpg";

import styled from "styled-components";

import { HexColorPicker } from "react-colorful";
import { Stack } from "@mui/system";

import EmojiPicker from "emoji-picker-react";

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

const AddPromotion = () => {
    const [backgroundColor, setBackgroundColor] = useState("#fff");
    const [textColor, setTextColor] = useState("#000");

    const [promotion, setPromotion] = useState({
        header: "",
        body: "",
        footer: "",
    });

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        setPromotion({
            ...promotion,
            [name]: value,
        });
    };

    const [scratchPadText, setScratchPadText] = useState();

    const handleScratchPadOnChange = (e) => {
        setScratchPadText(e.target.value);
    };

    const handleSetHeaderText = () => {
        setPromotion({
            ...promotion,
            header: scratchPadText,
        });
    };

    const handleSetBodyText = () => {
        setPromotion({
            ...promotion,
            body: scratchPadText,
        });
    };

    const handleHeaderOnKeyPressEnter = (e) => {
        if (e.keyCode === 13 || e.which === 13) {
            let newText = promotion.header + "\n";

            setPromotion({
                ...promotion,
                header: newText,
            });
        }
    };

    const handleBodyOnKeyPressEnter = (e) => {
        if (e.keyCode === 13 || e.which === 13) {
            let newText = promotion.body + "\n";

            setPromotion({
                ...promotion,
                body: newText,
            });
        }
    };

    const [headerFontSize, setHeaderFontSize] = useState("36px");
    const [headerFontFamily, setHeaderFontFamily] = useState();

    const [bodyFontSize, setBodyFontSize] = useState("12px");
    const [bodyFontFamily, setBodyFontFamily] = useState();

    const [footerFontSize, setFooterFontSize] = useState();
    const [footerFontFamily, setFooterFontFamily] = useState();

    const [headerMessage, setHeaderMessage] = useState("");
    const [bodyMessage, setBodyMessage] = useState("");
    const [footerMessage, setFooterMessage] = useState("");

    const businessId = "fpVAtpBjJLPUanlCydra";

    const history = useHistory();

    const handleChangeHeaderFontSize = (e, newValue) => {
        setHeaderFontSize(`${newValue}px`);
    };

    const handleChangeBodyFontSize = (e, newValue) => {
        setBodyFontSize(`${newValue}px`);
    };

    const [headerFont, setHeaderFont] = useState("Arial");
    const [bodyFont, setBodyFont] = useState("Arial");
    const [footerFont, setFooterFont] = useState("Arial");

    const handleHeaderFontChange = (e) => {
        setHeaderFont(e.target.value);
    };
    const handleBodyFontChange = (e) => {
        setBodyFont(e.target.value);
    };

    let fonts = [
        "Arial",
        "Verdana",
        "Tahoma",
        "Trebuchet MS",
        "Times New Roman",
        "Georgia",
        "Garamond",
        "Courier New",
        "Brush Script MT",
    ];

    const onEmojiClick = (emojiData) => {
        let selectedEmoji = emojiData.emoji;

        let currCaretPosition =
            document.getElementById("scratchpad").selectionStart;

        let fullValueTextArea = scratchPadText;

        let newText =
            fullValueTextArea.slice(0, currCaretPosition) +
            " " +
            selectedEmoji +
            " " +
            fullValueTextArea.slice(currCaretPosition);

        setScratchPadText(newText);
    };

    console.log("ScratchPad: ", scratchPadText);
    console.log("Header Text: ", promotion.header);
    console.log("Body Text: ", promotion.body);

    return (
        <Container>
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
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "100%",
                            aspectRatio: "9/16",
                            backgroundColor: `${backgroundColor}`,
                            color: `${textColor}`,
                        }}
                    >
                        <div
                            style={{
                                textAlign: "center",
                                fontSize: `${headerFontSize}`,
                                fontWeight: "bold",
                                margin: "10px 0",
                                whiteSpace: "pre-line",
                                fontFamily: `${headerFont}`,
                            }}
                        >
                            {promotion.header}
                        </div>
                        <div
                            style={{
                                textAlign: "center",
                                fontSize: `${bodyFontSize}`,
                                flexGrow: "1",
                                whiteSpace: "pre-line",
                                maxWidth: "inherit",
                                fontFamily: `${bodyFont}`,
                            }}
                        >
                            {promotion.body}
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        height: "100%",
                        marginTop: "10px",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <div style={{ padding: "0px 3px" }}>
                            <div>Background Color</div>
                            <HexColorPicker
                                color={backgroundColor}
                                onChange={setBackgroundColor}
                            />
                        </div>
                        <div style={{ padding: "0px 3px" }}>
                            <div>Text Color</div>
                            <HexColorPicker
                                color={textColor}
                                onChange={setTextColor}
                            />
                        </div>
                    </div>
                    <div
                        style={{
                            width: "100%",
                            textAlign: "center",
                            margin: "15px",
                        }}
                    >
                        Header Font
                    </div>
                    <Box
                        sx={{
                            marginTop: "15px",
                            minWidth: 165,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "0px 50px",
                        }}
                    >
                        <FormControl sx={{ width: "100px" }}>
                            <InputLabel id="hour-label">Font Type</InputLabel>
                            <Select
                                labelId="hour-label"
                                id="demo-simple-select"
                                name="Font Type"
                                label="Font Type"
                                onChange={handleHeaderFontChange}
                                value={headerFont}
                            >
                                {fonts.map((font) => (
                                    <MenuItem value={font}>{font}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Box sx={{ width: 200 }}>
                            <Stack
                                spacing={2}
                                direction="row"
                                sx={{ mb: 1 }}
                                alignItems="center"
                            >
                                <Slider
                                    aria-label="Volume"
                                    defaultValue={36}
                                    value={Number(headerFontSize.split("p")[0])}
                                    onChange={handleChangeHeaderFontSize}
                                    min={12}
                                    max={40}
                                />
                            </Stack>
                        </Box>
                    </Box>
                    <div
                        style={{
                            width: "100%",
                            textAlign: "center",
                            margin: "15px",
                        }}
                    >
                        Body Font
                    </div>
                    <Box
                        sx={{
                            marginTop: "15px",
                            minWidth: 165,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "0px 50px",
                        }}
                    >
                        <FormControl sx={{ width: "100px" }}>
                            <InputLabel id="hour-label">Font Type</InputLabel>
                            <Select
                                labelId="hour-label"
                                id="demo-simple-select"
                                name="Font Type"
                                label="Font Type"
                                onChange={handleBodyFontChange}
                                value={bodyFont}
                            >
                                {fonts.map((font) => (
                                    <MenuItem value={font}>{font}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Box sx={{ width: 200 }}>
                            <Stack
                                spacing={2}
                                direction="row"
                                sx={{ mb: 1 }}
                                alignItems="center"
                            >
                                <Slider
                                    aria-label="Volume"
                                    defaultValue={12}
                                    value={Number(bodyFontSize.split("p")[0])}
                                    onChange={handleChangeBodyFontSize}
                                    min={12}
                                    max={30}
                                />
                            </Stack>
                        </Box>
                    </Box>
                    <div
                        style={{
                            width: "100%",
                            textAlign: "center",
                            margin: "15px",
                        }}
                    >
                        Scratch `Pad
                    </div>
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            margin: "10px 0px",
                        }}
                    >
                        <TextField
                            sx={{ width: "75%" }}
                            onKeyDown={handleBodyOnKeyPressEnter}
                            onChange={handleScratchPadOnChange}
                            value={scratchPadText}
                            id="scratchpad"
                            label="Body"
                            variant="outlined"
                            multiline
                            rows={6}
                            name="body"
                        />
                        <div
                            style={{
                                width: "65%",
                                margin: "10px 10px",
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <div
                                onClick={handleSetHeaderText}
                                style={{
                                    border: "1px solid #ccc",
                                    borderRadius: "5px",
                                    padding: "10px",
                                }}
                            >
                                Set Header Text
                            </div>
                            <div
                                onClick={handleSetBodyText}
                                style={{
                                    border: "1px solid #ccc",
                                    borderRadius: "5px",
                                    padding: "10px",
                                }}
                            >
                                Set Body Text
                            </div>
                        </div>
                    </div>

                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            margin: "10px 0px",
                        }}
                    ></div>
                </div>
                <EmojiPicker onEmojiClick={onEmojiClick} />
            </Body>
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
                    marginRight: "10px",
                }}
            >
                Save
            </div>
            <div
                onClick={() => history.push("/business/promotions/add")}
                style={{
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    padding: "10px",
                    boxShadow: "5px 5px 5px rgba(68, 68, 68, 0.6)",
                }}
            >
                Reset
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
                style={{
                    display: "flex",
                    width: "100%",
                    aspectRatio: "9/16",
                }}
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

export default AddPromotion;
