import { useState } from "react";
import {
    Avatar,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    ListItemAvatar,
    MenuItem,
    OutlinedInput,
    Select,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex: 1;
    height: 100%;
`;

const MainSection = styled.section`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-right: 10px;
`;

const RightSidebar = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 8px;
    border-left: 1px solid #eee;
    width: 450px;
`;

const Body = styled.section`
    display: flex;
    flex-direction: column;
    overflow: scroll;
`;

const TopInfluencers = () => {
    return (
        <Container>
            <MainSection>
                <Header />
                <Body>
                    <Review />
                    <Review />
                    <Review />
                    <Review />
                </Body>

                {/* <AutoFillReminders /> */}
            </MainSection>
            <RightSidebar>
                <h3>Selected Customer</h3>
                <Avatar
                    alt={`Charlie}`}
                    src={`https://placekitten.com/64/64`}
                    sx={{ width: 76, height: 76 }}
                />
                <h4>Display Name: Charlie Montoya</h4>
                <div style={{ display: "flex" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div style={{ margin: "10px 0px" }}>
                            First Name: John
                        </div>
                        <div style={{ margin: "10px 0px" }}>Last Name: Doe</div>
                        <div style={{ margin: "10px 0px" }}>
                            cellNumber: 555.555.5555
                        </div>
                        <div style={{ margin: "10px 0px" }}>
                            email: email@email.com
                        </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div style={{ margin: "10px 0px" }}>
                            Current Groups:
                        </div>
                    </div>
                </div>
            </RightSidebar>
        </Container>
    );
};

const HeaderContainer = styled.div`
    display: flex;
    align-items: center;

    padding: 10px 20px;
    font-weight: bold;
    border-bottom: solid 1px #ccc;
`;

const Header = () => {
    return (
        <HeaderContainer>
            <Search />
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
            }}
        >
            <div style={{ display: "flex", width: "50%" }}>
                <ListItemAvatar>
                    <Avatar
                        alt={`Charlie}`}
                        src={`https://placekitten.com/64/64`}
                    />
                </ListItemAvatar>
                <div style={{ fontWeight: "bold" }}>display name</div>
                <div style={{ display: "flex", marginLeft: "10px" }}>
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
            <div style={{ display: "flex" }}>
                <div>Display Name: Charlie Montoya</div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ margin: "10px 0px" }}>First Name: John</div>
                    <div style={{ margin: "10px 0px" }}>Last Name: Doe</div>
                    <div style={{ margin: "10px 0px" }}>
                        cellNumber: 555.555.5555
                    </div>
                    <div style={{ margin: "10px 0px" }}>
                        email: email@email.com
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div>Current Groups:</div>
                </div>
            </div>
        </div>
    );
};

const Search = ({ setFilteredMembers, filteredMembers, originalMembers }) => {
    const [searchLabel, setSearchLabel] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchTermChange = (e) => {
        e.preventDefault();

        let value = e.target.value;

        if (value === "") {
            setFilteredMembers(originalMembers);
        }

        setSearchTerm(value);
    };

    const handleSearchLabelChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setSearchLabel(value);
    };

    const handleSearch = (e) => {
        e.preventDefault();

        const result = filteredMembers?.filter((customer) =>
            customer[searchLabel]
                .toLowerCase()
                .startsWith(searchTerm.toLowerCase())
        );

        setFilteredMembers(result);
    };

    return (
        <div style={{ display: "flex" }}>
            <FormControl fullWidth>
                <InputLabel id="search-label">Search</InputLabel>
                <Select
                    labelId="search-label"
                    id="demo-simple-select"
                    name="search-label"
                    value={searchLabel}
                    label="Search By:"
                    onChange={handleSearchLabelChange}
                >
                    <MenuItem value={"firstName"}>First Name</MenuItem>
                    <MenuItem value={"lastName"}>Last Name</MenuItem>
                    <MenuItem value={"cellNumber"}>Cell Number</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{ ml: "3px", width: "100%" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                    Search
                </InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type="text"
                    value={searchTerm}
                    placeholder="Search..."
                    onChange={handleSearchTermChange}
                    endAdornment={
                        <InputAdornment position="start">
                            <IconButton
                                aria-label="search for new term"
                                onClick={handleSearch}
                                edge="end"
                            >
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Search"
                />
            </FormControl>
        </div>
    );
};

export default TopInfluencers;
