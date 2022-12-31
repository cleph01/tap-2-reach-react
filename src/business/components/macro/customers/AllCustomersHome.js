import { useEffect, useState } from "react";
import { Link, Route, Switch, useParams, useHistory } from "react-router-dom";
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

import {
    getCustomers,
    useGetBusinessCustomers,
} from "../../../../database/business/businessModel";

import AddCustomer from "../../micro/customers/AddCustomer";

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

const AllCustomersHome = ({ businessId }) => {
    const [members, setMembers] = useState();

    const memberIds = useGetBusinessCustomers(businessId);

    useEffect(() => {
        const fetchData = async () => {
            const customers = await getCustomers(memberIds);
            setMembers(customers);
        };

        fetchData().catch((error) =>
            console.log("Error at AllCustomersHome: ", error)
        );
    }, [memberIds]);
    return (
        <Container>
            <Switch>
                <Route path="/business/customers/add">
                    <AddCustomer />
                </Route>
                <Route path="/business/customers">
                    <MainSection>
                        <Body>
                            <Header />
                            {members?.map((member) => (
                                <Customer member={member} />
                            ))}
                        </Body>
                    </MainSection>
                    <RightSidebar>
                        <Switch>
                            <Route path="/business/customers/:customerId">
                                <div
                                    style={{
                                        width: "100%",
                                        display: "grid",
                                        placeItems: "center",
                                    }}
                                >
                                    <CustomerWindow members={members} />
                                </div>
                            </Route>
                            <Route path="/business/customers">
                                <div
                                    style={{
                                        width: "100%",
                                        display: "grid",
                                        placeItems: "center",
                                    }}
                                >
                                    <h3>Selected Customer</h3>
                                    <Avatar
                                        alt="Charlie"
                                        src="https://placekitten.com/64/64"
                                        sx={{ width: 76, height: 76 }}
                                    />
                                    <h4>Display Name: Charlie Montoya</h4>
                                    <div style={{ display: "flex" }}>
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    margin: "10px 0px",
                                                }}
                                            >
                                                First Name: John
                                            </div>
                                            <div
                                                style={{
                                                    margin: "10px 0px",
                                                }}
                                            >
                                                Last Name: Doe
                                            </div>
                                            <div
                                                style={{
                                                    margin: "10px 0px",
                                                }}
                                            >
                                                cellNumber: 555.555.5555
                                            </div>
                                            <div
                                                style={{
                                                    margin: "10px 0px",
                                                }}
                                            >
                                                email: email@email.com
                                            </div>
                                        </div>
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    margin: "10px 0px",
                                                }}
                                            >
                                                Current Groups:
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Route>
                        </Switch>
                    </RightSidebar>
                </Route>
            </Switch>
        </Container>
    );
};

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 10px 20px;
    font-weight: bold;
    border-bottom: solid 1px #ccc;
`;

const Header = () => {
    const history = useHistory();

    return (
        <HeaderContainer>
            <Search />
            <div
                style={{ cursor: "pointer" }}
                onClick={() => history.push("/business/customers/add")}
            >
                Add Customer
            </div>
        </HeaderContainer>
    );
};

const CustomerWindow = ({ members }) => {
    const { customerId } = useParams();

    // const customer = useGetCustomerById(customerId);

    const [customer, setCustomer] = useState();

    useEffect(() => {
        setCustomer(members?.find((el) => el.id === customerId));
    }, [customerId, members]);

    console.log("Member at customer window: ", members);
    console.log("Customer at Customer HOme Customer: ", customer);
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "16px",
            }}
        >
            <h3>Selected Customer</h3>
            <Avatar
                alt="Charlie"
                src="https://placekitten.com/64/64"
                sx={{ width: 76, height: 76 }}
            />
            <h4>Display Name: {customer?.displayName}</h4>
            <div style={{ display: "flex" }}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <div style={{ margin: "10px 0px" }}>
                        First Name: {customer?.firstName}
                    </div>
                    <div style={{ margin: "10px 0px" }}>
                        Last Name: {customer?.lastName}
                    </div>
                    <div style={{ margin: "10px 0px" }}>
                        cellNumber: {customer?.cellPhone}
                    </div>
                    <div style={{ margin: "10px 0px" }}>
                        email: {customer?.email}
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <div style={{ margin: "10px 0px" }}>Current Groups:</div>
                </div>
            </div>
        </div>
    );
};

const Customer = ({ member }) => {
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
            <Link
                to={`/business/customers/${member.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
            >
                <div style={{ display: "flex", width: "50%" }}>
                    <ListItemAvatar>
                        <Avatar
                            alt="Charlie"
                            src="https://placekitten.com/64/64"
                        />
                    </ListItemAvatar>
                    <div style={{ fontWeight: "bold" }}>
                        {member.displayName}
                    </div>
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
                <div style={{ display: "flex", marginTop: "10px" }}>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <div style={{ margin: "10px 0px" }}>
                            First Name: {member.firstName}
                        </div>
                        <div style={{ margin: "10px 0px" }}>
                            Last Name: {member.lastName}
                        </div>
                        <div style={{ margin: "10px 0px" }}>
                            cellNumber: {member.cellPhone}
                        </div>
                        <div style={{ margin: "10px 0px" }}>
                            email: member.email
                        </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div>Current Groups:</div>
                    </div>
                </div>
            </Link>
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

export default AllCustomersHome;
