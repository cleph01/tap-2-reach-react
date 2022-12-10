import { useState, useEffect, useCallback, useMemo } from "react";

import { collection, addDoc, Timestamp } from "firebase/firestore";

import { db } from "../../../utils/db/firebaseConfig";

// import moment from "moment";

import NotificationDatePicker from "../../micro/notification/DatePicker";
import TimePicker from "../../micro/notification/TimePicker";
import CustomerListItem from "../../micro/notification/CustomerListItem";
import ChannelInfo from "../../micro/chat/ChannelInfo";
import Calendar from "../../micro/calendar/Calendar";

import {
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputBase,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ReminderMembers from "../../micro/notification/ReminderMembers";

const Notification = () => {
    const [time, setTime] = useState({ hour: "", minute: "", meridiem: "" });
    const [date, setDate] = useState(null);
    const [searchLabel, setSearchLabel] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCustomer, setSelectedCustomer] = useState({});
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
        <div>
            <Calendar />
            <div className="customer_list_wrapper">
                <div className="customer_list">
                    {/* {filteredCustomers?.map((customer, index) => (
                            <CustomerListItem
                                key={index}
                                customer={customer}
                                setSelectedCustomer={setSelectedCustomer}
                            />
                        ))} */}
                </div>
            </div>
            <div className="date_picker_wrapper" style={{ display: "flex" }}>
                <NotificationDatePicker
                    date={date}
                    setDate={setDate}
                    selectedCustomer={selectedCustomer}
                />
                <TimePicker time={time} setTime={setTime} />
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
    );
};

export default Notification;
