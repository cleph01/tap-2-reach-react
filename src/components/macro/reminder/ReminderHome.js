import { useState } from "react";

import { collection, addDoc, Timestamp } from "firebase/firestore";

import { db } from "../../../utils/db/firebaseConfig";

import styled from "styled-components";

import Calendar from "../../micro/calendar/Calendar";

import { Button, TextField } from "@mui/material";
import AutoFillReminders from "../../micro/reminder/AutoFillReminders";
import ReminderSetReminder from "../../micro/reminder/ReminderSetReminder";

import RightSideBar from "../../layout/RightSideBar";

import ReminderMembers from "../../micro/reminder/ReminderMembers";

const CalendarWrapper = styled.div`
    flex: 1;

    height: 75%;
    .fc {
    }
`;

const Notification = () => {
    const [searchLabel, setSearchLabel] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCustomer, setSelectedCustomer] = useState({});

    const businessId = "fpVAtpBjJLPUanlCydra";

    const [customers, setCustomers] = useState([
        {
            id: "R6O1CPHACsmjvjWxzaFN",
            firstName: "Charlie",
            lastName: "Montoya",
            cellNumber: "+19143125729",
            created: new Date("11/23/2022 9:13 AM"),
            email: "charlesmontoya79@gmail.com",
        },
        {
            id: "sRQx04SgjWVR8m2kKcOW",
            firstName: "Wilson",
            lastName: "Viera",
            cellNumber: "+19143562425",
            created: new Date("09/23/2021 5:27 PM"),
            email: "wil.viera@gmail.com",
        },
        {
            id: "uvtNOuk02WtuBH7ruLTR",
            firstName: "Jayson",
            lastName: "Snell",
            cellNumber: "+19144332800",
            created: new Date("07/11/2021 1:27 PM"),
            email: "mirkcury@gmail.com",
        },
    ]);

    const [filteredCustomers, setFilteredCustomers] = useState(customers);

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

    console.log("Found Customer: ");

    const handleSearch = (e) => {
        e.preventDefault();

        const result = customers?.filter((customer) =>
            customer[searchLabel].startsWith(searchTerm)
        );

        setFilteredCustomers(result);
    };

    console.log("Selected Customer: ", selectedCustomer);

    return (
        <div style={{ display: "flex" }}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    flex: "1",
                    width: "100%",
                    height: "100%",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <CalendarWrapper>
                        <Calendar />
                    </CalendarWrapper>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <AutoFillReminders />
                        <ReminderSetReminder />
                    </div>
                </div>
            </div>
            <ReminderMembers businessId={businessId} />
        </div>
    );
};

export default Notification;
