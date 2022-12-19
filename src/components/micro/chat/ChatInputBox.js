import { db } from "../../../utils/db/firebaseConfig";
import { useParams } from "react-router-dom";
import {
    useGetDoc,
    useGetCustomerByCellphone,
} from "../../../database/business/businessModel";

import {
    collection,
    addDoc,
    doc,
    writeBatch,
    Timestamp,
} from "firebase/firestore";

function ChatInputBox({ businessId }) {
    const { cellphone } = useParams();
    console.log("cellphone at chatInputBox: ", cellphone);
    let customer = useGetCustomerByCellphone(cellphone);
    let business = useGetDoc(`businesses/${businessId}`);

    console.log("Customer at ChatInbox: ", customer);
    console.log("Business: ", business);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let value = e.target.elements[0].value;

        if (value !== "") {
            try {
                const batch = writeBatch(db);

                // Adds Messag to be OutGoing Text Collection for Twilio
                const outTextDocRef = doc(
                    collection(db, "outgoingTextMessages")
                );

                console.log("Out Text Ref: ", outTextDocRef);

                batch.set(outTextDocRef, {
                    to: `+1${cellphone}`,
                    from: business.twilioNumber,
                    body: value,
                });

                // Adds Message to Messages Subcollection under business
                const convoDocRef = doc(
                    collection(
                        db,
                        `chats/${businessId}/channels/${cellphone}/messages`
                    )
                );

                batch.set(convoDocRef, {
                    user: doc(db, `businesses/${businessId}`),
                    businessTwilioNumber: business.twilioNumber,
                    customerId: customer.customerId,
                    text: value,
                    direction: "out",
                    createdOn: Timestamp.fromDate(new Date()),
                });

                // await batch.commit();
                await batch.commit();

                e.target.elements[0].value = "";

                console.log("Batch SMS/COnvo Document written: ");
            } catch (error) {
                console.log("Error submitting message: ", error);
            }
        } else {
            alert("Empty Message");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="ChatInputBox">
            <input className="ChatInput" placeholder="Message #general" />
        </form>
    );
}

export default ChatInputBox;
