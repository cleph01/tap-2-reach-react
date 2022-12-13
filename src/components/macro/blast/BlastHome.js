import { useState, useEffect, useCallback, useMemo } from "react";

import { collection, addDoc, Timestamp } from "firebase/firestore";

import { db } from "../../../utils/db/firebaseConfig";

// import moment from "moment";

import NotificationDatePicker from "../../micro/reminder/NotificationDatePicker";
import TimePicker from "../../micro/reminder/TimePicker";
import CustomerListItem from "../../micro/reminder/CustomerListItem";
import ChannelInfo from "../../micro/chat/ChannelInfo";
import Calendar from "../../micro/calendar/Calendar";

import {
    Avatar,
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputBase,
    InputLabel,
    ListItem,
    ListItemAvatar,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import ReminderMembers from "../../micro/reminder/ReminderMembers";
import {
    useGetAllGroups,
    useGetCustomerGroups,
} from "../../../database/business/businessModel";

const BlastHome = () => {
    const [time, setTime] = useState({ hour: "", minute: "", meridiem: "" });
    const [date, setDate] = useState(null);
    const [searchLabel, setSearchLabel] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCustomer, setSelectedCustomer] = useState();
    const [reminderMessage, setReminderMessage] = useState("");

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

    const handleMesssageChange = (e) => {
        e.preventDefault();
        setReminderMessage(e.target.value);
    };

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

    const onSubmit = async (e) => {
        e.preventDefault();

        if (selectedCustomer.firstName) {
            const timeStr = `${time.hour}:${time.minute} ${time.meridiem}`;

            const convertTime = (timeStr) => {
                const [time, modifier] = timeStr.split(" ");
                let [hours, minutes] = timeStr.split(":");
                if (hours === "12") {
                    hours = "00";
                }
                if (modifier === "PM") {
                    hours = parseInt(hours, 10) + 12;
                }
                return `${hours}:${minutes.split(" ")[0]}`;
            };

            const dataObj = {
                customerId: selectedCustomer.id,
                businessId: "fpVAtpBjJLPUanlCydra",
                customerCell: selectedCustomer.cellNumber,
                message: reminderMessage,
                businessTwilioNumber: "+19144001284",
                // sendOnDate: moment(date).format("l"),
                sendOnTime: convertTime(timeStr),
                createdOn: Timestamp.fromDate(new Date()),
            };

            const docRef = await addDoc(
                collection(db, "notifications"),
                dataObj
            );

            if (docRef.id) {
                console.log("Notication Saved: ", docRef.id);
            }

            console.log("Add Reminder Data Obj: ", dataObj);
        } else {
            alert("Selected a Customer first");
        }
    };

    console.log("Select Date: ", date);
    console.log("Selected Customer: ", selectedCustomer);

    return (
        <div style={{ flex: "1", display: "flex", flexDirection: "column" }}>
            <div>Groups</div>
            <Groups businessId={businessId} />
            <div style={{ flexShrink: "0" }}>
                {selectedCustomer && (
                    <SelectedCustomer
                        selectedCustomer={selectedCustomer}
                        businessId={businessId}
                    />
                )}
                <div
                    className="ChannelInfo"
                    style={{ borderTop: "solid 1px #ccc" }}
                >
                    <div className="Topic">
                        Selected Contact(s):{" "}
                        <input className="TopicInput" value="Open" />
                    </div>
                    <div className="ChannelName">@Contacts</div>
                </div>
                <div className="text_area">
                    <TextField
                        id="outlined-multiline-static"
                        label="Message To Send"
                        multiline
                        rows={4}
                        value={reminderMessage}
                        onChange={handleMesssageChange}
                        placeholder="Enter Message"
                        inputProps={{ maxLength: 140 }}
                        sx={{ width: "100%" }}
                    />
                </div>
                <Button variant="contained" color="primary" onClick={onSubmit}>
                    Submit
                </Button>
            </div>
        </div>
    );
};

const Groups = ({ businessId }) => {
    const groups = useGetAllGroups(businessId);

    console.log("Groups: ", groups);

    return (
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                flex: "1 0 auto",
                padding: "10px",
                width: "100%",
            }}
        >
            {groups?.map((group, index) => (
                <CategoryBox
                    groupName={group.groupName}
                    amount={group.members.length}
                />
            ))}

            <CategoryBox groupName="Best Customers" amount="777" />

            <CategoryBox groupName="Ladies" amount="999" />
        </div>
    );
};
const SelectedCustomer = ({ selectedCustomer, businessId }) => {
    const groups = useGetCustomerGroups(businessId, selectedCustomer.id);

    console.log("custoemr group: ", groups);
    return (
        <div>
            Selected Customer
            <ListItem
                alignItems="flex-start"
                secondaryAction={
                    <div>
                        <IconButton aria-label="comment">
                            <Delete />
                        </IconButton>
                        <IconButton aria-label="comment">
                            <Edit />
                        </IconButton>
                    </div>
                }
            >
                <ListItemAvatar>
                    <Avatar
                        alt={selectedCustomer.displayName}
                        src="/static/images/avatar/1.jpg"
                    />
                </ListItemAvatar>
                <ListItemText
                    primary={`Display Name: ${selectedCustomer.displayName}`}
                    secondary={
                        <>
                            <Typography
                                sx={{ display: "inline" }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                First Name: {selectedCustomer.firstName}
                            </Typography>
                            <div>
                                <Typography
                                    sx={{ display: "inline" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Last Name: {selectedCustomer.lastName}
                                </Typography>
                            </div>
                            <div>
                                <Typography
                                    sx={{ display: "inline" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Cell Phone: {selectedCustomer.cellPhone}{" "}
                                </Typography>
                            </div>
                            <div>
                                <Typography
                                    sx={{ display: "inline" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Email: {selectedCustomer.email}
                                </Typography>
                            </div>
                            <div>
                                {groups?.length > 0
                                    ? "Already in following groups:"
                                    : "** Not Part of an SMS Group Yet **"}
                                {groups?.map((group, index) => (
                                    <Typography
                                        sx={{ display: "inline" }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        <li>{group.groupName}</li>
                                    </Typography>
                                ))}
                            </div>
                        </>
                    }
                />
            </ListItem>
        </div>
    );
};

const CategoryBox = ({ groupName, amount }) => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginRight: "9px",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#ffffff",
                    border: "1px solid #000000",
                    borderRadius: "0.5rem",
                    padding: "0.5rem",
                    boxShadow: "5px 5px 5px rgba(68, 68, 68, 0.6)",
                }}
            >
                <div>{groupName}</div>
                <div>({amount})</div>
            </div>
        </div>
    );
};
export default BlastHome;
