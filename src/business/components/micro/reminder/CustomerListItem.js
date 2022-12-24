import React from "react";

import { ListItem, ListItemText } from "@mui/material";
import moment from "moment/moment";

const CustomerListItem = ({ customer, setSelectedCustomer }) => {
    return (
        <ListItem
            sx={{ mt: 3, boxShadow: 3 }}
            style={{ backgroundColor: "#fafafa" }}
            onClick={() => setSelectedCustomer(customer)}
        >
            <ListItemText
                primary={`${customer.firstName} ${customer.lastName}`}
                secondary={
                    <>
                        <span>{customer.cellNumber}</span>
                        <br />
                        <span>{customer.email}</span>
                        <br />
                        <span>
                            Joined on:{" "}
                            {moment(customer.created).format(
                                "MM/DD/yyyy h:mm a"
                            )}
                        </span>
                    </>
                }
            />
        </ListItem>
    );
};

export default CustomerListItem;
