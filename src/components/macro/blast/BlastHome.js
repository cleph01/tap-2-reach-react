import { useState, useEffect, useCallback, useMemo } from "react";

import { collection, addDoc, Timestamp } from "firebase/firestore";

import { db } from "../../../utils/db/firebaseConfig";

import ChatMembers from "../../micro/chat/ChatMembers";

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

import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex: 1;
    height: 100%;
`;

const MainSection = styled.section`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-right: 10px;
`;

const RightSidebar = styled.section`
    padding: 8px;
    border-left: 1px solid #eee;
    width: 150px;
`;

const Body = styled.section`
    display: flex;
`;

const BlastHome = () => {
    const [time, setTime] = useState({ hour: "", minute: "", meridiem: "" });
    const [date, setDate] = useState(null);
    const [searchLabel, setSearchLabel] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCustomer, setSelectedCustomer] = useState();
    const [reminderMessage, setReminderMessage] = useState("");

    const businessId = "fpVAtpBjJLPUanlCydra";

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
        <Container>
            <MainSection>
                <Header />
                <Body>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            height: "750px",
                            flex: "1",
                        }}
                    >
                        <h1>Your Groups</h1>
                        <Groups businessId={businessId} />
                    </div>

                    {selectedCustomer && (
                        <SelectedCustomer
                            selectedCustomer={selectedCustomer}
                            businessId={businessId}
                        />
                    )}

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            flex: "1",
                            marginTop: "100px",
                        }}
                    >
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

                        <Button
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
                </Body>
            </MainSection>
            <RightSidebar>
                <ChatMembers businessId={businessId} />
            </RightSidebar>
        </Container>
    );
};

const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    font-weight: bold;
    border-bottom: solid 1px #ccc;
`;

const Name = styled.div``;
const CellPPhone = styled.div`
    font-size: smaller;
    margin-left: 15px;
`;

const Recipient = styled.div``;

const Header = () => {
    return (
        <HeaderContainer>
            <Recipient>
                <Name>SMS Center </Name>
            </Recipient>
        </HeaderContainer>
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

                padding: "10px",
                width: "600px",
                height: "200px",
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
