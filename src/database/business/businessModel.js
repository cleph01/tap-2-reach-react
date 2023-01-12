import { useEffect, useState } from "react";
import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import {
    collection,
    query,
    onSnapshot,
    doc,
    where,
    orderBy,
    setDoc,
    getDoc,
    Timestamp,
    addDoc,
    getDocs,
} from "firebase/firestore";

import { db } from "../../utils/db/firebaseConfig";

// Get All Open Chat Channels for a given businessId
// Each Channel represents and indivial User/CellPhone Number
const useGetChatChannels = (businessId) => {
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        const collectionRef = collection(db, `chats/${businessId}/channels/`);

        let q = query(collectionRef);

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            setChannels(
                querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))
            );
        });

        return unsubscribe;
    }, []);

    return channels;
};

// Get the all Customer info from Customer collection in firestore
// using the Firestore reference path (ie. 'customers/${customerId}')
const useGetDoc = (path) => {
    const [record, setRecord] = useState();

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, path), (doc) => {
            setRecord(doc.data());
        });

        return unsubscribe;
    }, [path]);

    return record;
};

// Get the Customer by Phone Number
const useGetCustomerByCellphone = (cellphone) => {
    const [customer, setCustomer] = useState();

    useEffect(() => {
        const collectionRef = collection(db, "customers");

        let q = query(
            collectionRef,
            where("cellPhone", "==", `+1${cellphone}`)
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) =>
                setCustomer({
                    customerId: doc.id,
                    ...doc.data(),
                })
            );
        });

        return unsubscribe;
    }, [cellphone]);

    return customer;
};

// Get All Chat Messages in that Chat Channel
// (ie. Messages bw. business and that customer)
const useGetChatMessages = (path) => {
    const [docs, setDocs] = useState([]);

    useEffect(() => {
        const collectionRef = collection(db, path);

        let q = query(collectionRef, orderBy("createdOn"));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            setDocs(
                querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))
            );
        });

        return unsubscribe;
    }, [path]);

    return docs;
};

// Get All Customers tied
// (ie. Messages bw. business and that customer)
const useGetBusinessCustomers = (businessId) => {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        const collectionRef = collection(db, "business-customer-relationship");

        let q = query(collectionRef, where("businessId", "==", businessId));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            setMembers(
                querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))
            );
        });

        return unsubscribe;
    }, [businessId]);

    return members;
};

// const getBusinessCustomers = (businessId) => {

//         const collectionRef = collection(db, "business-customer-relationship");

//         let q = query(collectionRef, where("businessId", "==", businessId));

//         const query = useFirestoreQueryData(["products"], q);

//     return members;
// };

// Get All Customers by Customer id / Path
const getCustomers = async (customers) => {
    const members = await Promise.all(
        await customers.map(async (customer) => {
            const docRef = await getDoc(doc(db, customer.customer.path));
            return { id: docRef.id, ...docRef.data() };
        })
    );

    return members;
};

// Create Channel When Someone From Member List in Chat Window
// is Clicked
const createChannelFromMember = async (businessId, customerId, cellPhone) => {
    console.log(
        "businessId, customerId, cellPhone: ",
        businessId,
        customerId,
        cellPhone
    );

    try {
        const docRef = await setDoc(
            doc(db, `chats/${businessId}/channels`, cellPhone.slice(2)),
            { customerId: customerId }
        );

        // console.log("DeCreF: ", docRef);
        if (docRef) {
            console.log("New Channel Created: ", docRef.id);
        } else {
            console.log("Something went wrong creating the channel");
        }
    } catch (error) {
        console.log("Error Creating new Channel: ", error);
    }
};

// Create Channel When Name/Number is Enterd in Chal Welcome Window
// and "Start Chat Button is Clicked"
const createChannelFromOneOff = async (businessId, cellphone) => {
    console.log(
        "cellPhone in CreateChannelFromOne Off: ",

        cellphone
    );

    try {
        const customerCollectionRef = collection(db, "customers");

        let q = query(
            customerCollectionRef,
            where("cellPhone", "==", `+1${cellphone}`)
        );

        const querySnapshot = await getDocs(q);

        var customer;

        querySnapshot.forEach((doc) => {
            customer = { customerId: doc.id, ...doc.data() };
        });

        await setDoc(doc(db, `chats/${businessId}/channels`, cellphone), {
            customerId: customer === undefined ? null : customer.customerId,
        });

        console.log("New Channel Created from One Off: ", cellphone);

        return "good";
    } catch (error) {
        console.log("Error Creating new Channel: ", error);

        return "error";
    }
};

// Get All the Blast Groups the Business Created
const useGetAllGroups = (businessId) => {
    const [groups, setGroups] = useState();

    useEffect(() => {
        const collectionRef = collection(
            db,
            `businesses/${businessId}/smsGroups`
        );

        let q = query(collectionRef);

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            setGroups(
                querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))
            );
        });

        return unsubscribe;
    }, []);

    return groups;
};

// Get All the Blast Groups the Customer has been assigned to
const useGetCustomerGroups = (businessId, customerId) => {
    const [groups, setGroups] = useState();

    useEffect(() => {
        const collectionRef = collection(
            db,
            `businesses/${businessId}/smsGroups`
        );

        let q = query(
            collectionRef,
            where("members", "array-contains", customerId)
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            setGroups(
                querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))
            );
        });

        return unsubscribe;
    }, []);

    return groups;
};

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

const businessCustomerListQuery = (businessId) => {
    return query(
        collection(db, "business-customer-relationship"),
        where("businessId", "==", businessId)
    );
};

const getCustomer = (path) => {
    return doc(db, path);
};

const getCustomerRef = (customerId) => {
    return doc(db, `customers/${customerId}`);
};
const getBusiness = (businessId) => {
    return doc(db, `businesses/${businessId}`);
};

export {
    useGetChatChannels,
    useGetDoc,
    useGetChatMessages,
    useGetBusinessCustomers,
    createChannelFromMember,
    createChannelFromOneOff,
    useGetAllGroups,
    useGetCustomerGroups,
    createSmsGroup,
    useGetCustomerByCellphone,
    businessCustomerListQuery,
    getCustomers,
    getCustomer,
    getCustomerRef,
    getBusiness,
};
