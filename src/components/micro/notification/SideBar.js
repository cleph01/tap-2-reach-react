import { useState } from "react";

import { Link } from "react-router-dom";
import { Button, ListItem, ListItemText, TextField } from "@mui/material";

function SideBar() {
    const businessId = "fpVAtpBjJLPUanlCydra";
    const [reminders, setReminders] = useState([
        {
            id: "R6O1CPHACsmjvjWxzaFN",
            text: "Canned Reminder  ",
        },
        {
            id: "R6O1CPHACsmjvjWxzaFN",
            text: "Reminder: Lorem Ipsum  ",
        },
        {
            id: "R6O1CPHACsmjvjWxzaFN",
            text: "Reminder: Lorem Ipsum  ",
        },
    ]);

    return (
        <div style={{ borderTop: "1px #eee solid", paddingTop: "5px" }}>
            <div style={{ padding: "8px 20px" }}>Add Reminder</div>

            <div className="text_area" style={{ padding: "5px" }}>
                <TextField
                    id="outlined-multiline-static"
                    label="Add Notification"
                    multiline
                    rows={4}
                    placeholder="Enter Message"
                    inputProps={{ maxLength: 140 }}
                    sx={{ width: "100%", backgroundColor: "#eee" }}
                />
                <Button variant="contained" color="primary">
                    Submit
                </Button>
            </div>
            <div style={{ padding: "8px" }}>
                Saved Reminders
                <div style={{ overflow: "scroll", height: "250px" }}>
                    {reminders.map((reminder) => (
                        <ReminderListItem reminder={reminder} />
                    ))}
                </div>
            </div>
        </div>
    );
}

const ReminderListItem = ({ reminder }) => {
    console.log("Reminder: ", reminder);

    return (
        <ListItem sx={{ mt: 3, boxShadow: 3, backgroundColor: "#eee" }}>
            <ListItemText primary={reminder.text} secondary={reminder.text} />
        </ListItem>
    );
};

export default SideBar;
