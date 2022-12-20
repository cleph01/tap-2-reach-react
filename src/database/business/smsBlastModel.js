import { collection, Timestamp, addDoc, doc, getDoc } from "firebase/firestore";

import { db } from "../../utils/db/firebaseConfig";

const createSmsGroup = async (businessId, groupName) => {
    console.log("BusinessId and GroupName: ", businessId, groupName);
    try {
        const docRef = await addDoc(
            collection(db, `businesses/${businessId}/smsGroups`),
            {
                groupName: groupName,
                members: [],
                createdOn: Timestamp.fromDate(new Date()),
            }
        );

        // console.log("DeCreF: ", docRef);
        if (docRef.id) {
            console.log("New SMS Group Created: ", docRef.id);
        } else {
            console.log("Something went wrong creating the SMS Group");
        }
    } catch (error) {
        console.log("Error Creating new SMS Group: ", error);
    }
};

// Get All Customers by Customer id / Path
const getCustomersByIdArr = async (customerIdArr) => {
    const members = await Promise.all(
        await customerIdArr.map(async (customerId) => {
            const docRef = await getDoc(doc(db, `customers/${customerId}`));
            return { id: docRef.id, ...docRef.data() };
        })
    );

    return members;
};

export { createSmsGroup, getCustomersByIdArr };
