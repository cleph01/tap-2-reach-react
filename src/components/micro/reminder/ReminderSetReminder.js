import { useState } from "react";

import { Link } from "react-router-dom";
import {
    Avatar,
    Button,
    ListItem,
    ListItemAvatar,
    ListItemText,
    TextField,
} from "@mui/material";

import NotificationDatePicker from "./NotificationDatePicker";
import TimePicker from "./TimePicker";

import moment from "moment";

function ReminderSetReminder({ selectedCustomer, reminders }) {
    const businessId = "fpVAtpBjJLPUanlCydra";
    const [reminderMessage, setReminderMessage] = useState("");
    const [time, setTime] = useState({ hour: "", minute: "", meridiem: "" });
    const [date, setDate] = useState(null);

    const handleMesssageChange = (e) => {
        e.preventDefault();
        setReminderMessage(e.target.value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        // if (selectedCustomer.firstName) {
        //     const timeStr = `${time.hour}:${time.minute} ${time.meridiem}`;

        //     const convertTime = (timeStr) => {
        //         const [time, modifier] = timeStr.split(" ");
        //         let [hours, minutes] = timeStr.split(":");
        //         if (hours === "12") {
        //             hours = "00";
        //         }
        //         if (modifier === "PM") {
        //             hours = parseInt(hours, 10) + 12;
        //         }
        //         return `${hours}:${minutes.split(" ")[0]}`;
        //     };

        //     const dataObj = {
        //         customerId: selectedCustomer.id,
        //         businessId: "fpVAtpBjJLPUanlCydra",
        //         customerCell: selectedCustomer.cellNumber,
        //         message: reminderMessage,
        //         businessTwilioNumber: "+19144001284",
        //         // sendOnDate: moment(date).format("l"),
        //         sendOnTime: convertTime(timeStr),
        //         createdOn: Timestamp.fromDate(new Date()),
        //     };

        //     const docRef = await addDoc(
        //         collection(db, "notifications"),
        //         dataObj
        //     );

        //     if (docRef.id) {
        //         console.log("Notication Saved: ", docRef.id);
        //     }

        //     console.log("Add Reminder Data Obj: ", dataObj);
        // } else {
        //     alert("Selected a Customer first");
        // }
    };

    return (
        <div
            style={{
                borderTop: "1px #eee solid",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-end",
                flex: "1",
            }}
        >
            <div style={{ width: "96%" }}>
                <div>
                    {selectedCustomer && (
                        <SelectedCustomer
                            selectedCustomer={selectedCustomer}
                            reminders={reminders}
                        />
                    )}
                    <NotificationDatePicker date={date} setDate={setDate} />
                    <TimePicker time={time} setTime={setTime} />
                </div>
                <div>
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
                <div>
                    <Button
                        sx={{ width: "100%" }}
                        variant="contained"
                        color="primary"
                        onClick={onSubmit}
                    >
                        Submit
                    </Button>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            margin: "6px",
                            fontSize: "small",
                            color: "grey",
                        }}
                    >
                        <div>Templates</div>
                        <div>Save to Templates</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const SelectedCustomer = ({ selectedCustomer, reminders }) => {
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
                <div style={{ fontWeight: "bold" }}>
                    {selectedCustomer.displayName}
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
            <div style={{ marginTop: "6px" }}>Reminders as of Today:</div>
            <div style={{ display: "flex" }}>
                <ul>
                    {reminders?.map((reminder) => (
                        <li>
                            {reminder.message} - to be sent:{" "}
                            {reminder.sendOnDate} @ {reminder.sendOnTime}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const CustomerListItem = ({ selectedCustomer }) => {
    return (
        <ListItem
            sx={{ mt: 3, boxShadow: 3 }}
            style={{ backgroundColor: "#fafafa" }}
        >
            <ListItemText
                primary={`${selectedCustomer.firstName} ${selectedCustomer.lastName}`}
                secondary={
                    <>
                        <span>{selectedCustomer.cellNumber}</span>
                        <br />
                        <span>{selectedCustomer.email}</span>
                        <br />
                        <span>
                            Joined on:{" "}
                            {moment(selectedCustomer.created).format(
                                "MM/DD/yyyy h:mm a"
                            )}
                        </span>
                    </>
                }
            />
        </ListItem>
    );
};

export default ReminderSetReminder;
