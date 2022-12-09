import { useState } from "react";

import { Link } from "react-router-dom";
import {
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    ListItem,
    ListItemText,
    Radio,
    RadioGroup,
    TextField,
} from "@mui/material";

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
            <div style={{ padding: "8px 20px", marginTop: "15px" }}>
                Create New Group
            </div>

            <div className="text_area" style={{ padding: "5px" }}>
                <TextField
                    id="outlined-multiline-static"
                    label="Add Notification"
                    rows={4}
                    placeholder="Enter Message"
                    inputProps={{ maxLength: 140 }}
                    sx={{ width: "100%", backgroundColor: "#eee" }}
                />
                <Button variant="contained" color="primary">
                    Submit
                </Button>
            </div>
            <div style={{ padding: "8px", marginTop: "15px" }}>
                Send SMS to Who:
                <RadioButtonsGroup />
            </div>
        </div>
    );
}

const RadioButtonsGroup = () => {
    return (
        <FormControl>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="OneContact"
                name="radio-buttons-group"
            >
                <FormControlLabel
                    value="OneContact"
                    control={<Radio />}
                    label="One Contact"
                />
                <FormControlLabel
                    value="MultipleContacts"
                    control={<Radio />}
                    label="Multiple Contacts"
                />
                <FormControlLabel
                    value="SelectGroup"
                    control={<Radio />}
                    label="Select Group(s)"
                />
                <FormControlLabel
                    value="Manual"
                    control={<Radio />}
                    label="Manual Entry"
                />
            </RadioGroup>
        </FormControl>
    );
};

export default SideBar;
