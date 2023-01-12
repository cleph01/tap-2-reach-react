import { useEffect, useState, useContext } from "react";
import { BusinessContext } from "../../../../contexts/BusinessContext";
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
    businessCustomerListQuery,
    getCustomer,
    getCustomerRef,
    getCustomers,
    useGetBusinessCustomers,
} from "../../../../database/business/businessModel";

import AddCustomer from "../../micro/customers/AddCustomer";
import {
    useFirestoreDocument,
    useFirestoreQueryData,
} from "@react-query-firebase/firestore";

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

const AllCustomersHome = () => {
    const business = useContext(BusinessContext);

    const queryRef = businessCustomerListQuery(business.businessId);

    const query = useFirestoreQueryData(["customerList"], queryRef);

    if (query.isLoading) {
        return <div>Loading...</div>;
    }

    const customerList = query.data;

    console.log("CustomerList: ", customerList);
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
                            {customerList?.map((customer) => (
                                <Customer customer={customer.customer} />
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
                                    <CustomerWindow />
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
                style={{ cursor: "pointer", marginLeft: "35px" }}
                onClick={() => history.push("/business/customers/add")}
            >
                Add Customer
            </div>
        </HeaderContainer>
    );
};

const CustomerWindow = () => {
    const { customerId } = useParams();

    const customerRef = getCustomerRef(customerId);

    const customer = useFirestoreDocument(
        ["customer", customerId],
        customerRef
    );

    if (customer.isLoading) {
        return <div>Loading...</div>;
    }

    const snapshot = customer.data;

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
            <h4>Display Name: {snapshot.data().displayName}</h4>
            <div style={{ display: "flex" }}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <div style={{ margin: "10px 0px" }}>
                        First Name: {snapshot.data().firstName}
                    </div>
                    <div style={{ margin: "10px 0px" }}>
                        Last Name: {snapshot.data().lastName}
                    </div>
                    <div style={{ margin: "10px 0px" }}>
                        cellNumber: {snapshot.data().cellPhone}
                    </div>
                    <div style={{ margin: "10px 0px" }}>
                        email: {snapshot.data().email}
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

const Customer = ({ customer }) => {
    console.log("CustomerId at Customer: ", customer);

    const customerRef = getCustomer(customer.path);

    const customerDoc = useFirestoreDocument(
        ["customer", customer.id],
        customerRef
    );

    if (customerDoc.isLoading) {
        return <div>Loading...</div>;
    }

    const snapshot = customerDoc.data;

    console.log("snapshot: ", snapshot);
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
                to={`/business/customers/${snapshot.id}`}
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
                        {snapshot.data().displayName}
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
                            First Name: {snapshot.data().firstName}
                        </div>
                        <div style={{ margin: "10px 0px" }}>
                            Last Name: {snapshot.data().lastName}
                        </div>
                        <div style={{ margin: "10px 0px" }}>
                            cellNumber: {snapshot.data().cellPhone}
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
        <div style={{ display: "flex", width: "100%" }}>
            <FormControl sx={{ width: "160px" }}>
                <InputLabel id="search-label">Search By: </InputLabel>
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
                    sx={{ width: "100%" }}
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
