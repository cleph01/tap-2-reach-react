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
} from "../../../../database/business/businessModel";

import "../../../../styles/components/micro/chat/members.scss";

import SearchIcon from "@mui/icons-material/Search";

function Members({ businessId }) {
    const members = useGetBusinessCustomers(businessId);
    console.log("Members: ", members);
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
    console.log("memmbers at memeber: ", member);
    const memberData = useGetDoc(member.customer.path);
    console.log("MemberData; ", memberData);

    return (
        <div
            style={{ cursor: "pointer", marginTop: "6px" }}
            onClick={() =>
                createChannelFromMember(
                    businessId,
                    member.customer.id,
                    memberData.cellPhone
                )
            }
            className="Member"
        >
            <div className="MemberStatus offline" />
            {memberData?.displayName}
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
