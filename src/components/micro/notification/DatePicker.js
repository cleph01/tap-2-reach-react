import { useState } from "react";

import TextField from "@mui/material/TextField";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CustomerListItem from "./CustomerListItem";

const NotificationDatePicker = ({ date, setDate, selectedCustomer }) => {
    return (
        <div>
            {selectedCustomer.firstName && (
                <CustomerListItem customer={selectedCustomer} />
            )}
            <pre>{`Date Picker: ${date}`}</pre>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                    label="Pick a Date"
                    value={date}
                    onChange={(newValue) => {
                        setDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
        </div>
    );
};

export default NotificationDatePicker;
