import { useState, useEffect } from "react";
import { Box, Button, Typography, Modal } from "@mui/material";

import { getCustomersByIdArr } from "../../../database/business/smsBlastModel";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

export default function BasicModal({ openModal, setOpenModal, groupMembers }) {
    const [members, setMembers] = useState();

    const handleClose = () => setOpenModal(false);

    useEffect(() => {
        const fetchData = async () => {
            const membersResult = await getCustomersByIdArr(
                groupMembers.members
            );
            setMembers(membersResult);
        };

        fetchData().catch((error) => console.log("Error: ", error));
    }, [groupMembers.members]);

    console.log(groupMembers, members);
    return (
        <div>
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        {groupMembers.groupName}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor
                        ligula.
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}
