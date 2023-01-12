import {
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
} from "@mui/material";
import React, { useState } from "react";
import {
    useGetBusinessCustomers,
    useGetDoc,
    createChannelFromMember,
    businessCustomerListQuery,
    getCustomer,
} from "../../../../database/business/businessModel";

import "../../../../styles/components/micro/chat/members.scss";

import SearchIcon from "@mui/icons-material/Search";
import {
    useFirestoreDocument,
    useFirestoreQueryData,
} from "@react-query-firebase/firestore";

function Members({ businessId }) {
    // Access the client
    const queryRef = businessCustomerListQuery(businessId);

    // Provide the query to the hook
    const query = useFirestoreQueryData(["businessCustomers"], queryRef);

    if (query.isLoading) {
        return <div>Loading...</div>;
    }

    const members = query.data;

    console.log("customers in Chat members: ", members);
    return (
        <div>
            <Search />
            <div>
                {members.map((member, index) => (
                    <Member
                        key={index}
                        member={member}
                        businessId={businessId}
                    />
                ))}

                <div
                    className="Member"
                    style={{ cursor: "pointer", marginTop: "6px" }}
                >
                    <div className="MemberStatus online" />
                    cleverbot
                </div>
            </div>
        </div>
    );
}

const Member = ({ member, businessId }) => {
    const queryRef = getCustomer(member.customer.path);

    const query = useFirestoreDocument(
        ["customer", member.customer.path],
        queryRef
    );

    if (query.isLoading) {
        return <div>Loading...</div>;
    }

    const memberData = query.data; // DocumentSnapshot

    return (
        <div
            style={{ cursor: "pointer", marginTop: "6px" }}
            onClick={() =>
                createChannelFromMember(
                    businessId,
                    member.customer.id,
                    memberData.data().cellPhone
                )
            }
            className="Member"
        >
            <div className="MemberStatus offline" />
            {memberData.data().displayName}
        </div>
    );
};

const Search = () => {
    const [searchLabel, setSearchLabel] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchTermChange = (e) => {
        e.preventDefault();

        let value = e.target.value;

        setSearchTerm(value);
    };

    const handleSearchLabelChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setSearchLabel(value);
    };

    const handleSearch = (e) => {
        e.preventDefault();

        // const result = customers?.filter((customer) =>
        //     customer[searchLabel].startsWith(searchTerm)
        // );

        // setFilteredCustomers(result);
    };

    return (
        <div className="search_bar">
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
            <FormControl sx={{ m: 1 }} variant="outlined">
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
                        <InputAdornment position="end">
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

export default Members;
