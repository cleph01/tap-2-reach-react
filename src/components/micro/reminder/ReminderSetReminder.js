import { useState } from "react";

import { Link } from "react-router-dom";
import { Button, ListItem, ListItemText, TextField } from "@mui/material";

import NotificationDatePicker from "./NotificationDatePicker";
import TimePicker from "./TimePicker";

function ReminderSideBar() {
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
                flex: "1",
            }}
        >
            <div style={{ width: "96%" }}>
                <div>
                    <NotificationDatePicker
                        date={date}
                        setDate={setDate}
                        // selectedCustomer={selectedCustomer}
                    />
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

export default ReminderSideBar;
