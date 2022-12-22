import { useEffect, useState } from "react";

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

// Get the all Customer info from Customer collection in firestore
// using the Firestore reference path (ie. 'customers/${customerId}')
const useGetCustomerById = (id) => {
    const [record, setRecord] = useState();

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, `customers/${id}`), (doc) => {
            setRecord(doc.data());
        });

        return unsubscribe;
    }, [id]);

    return record;
};

export { useGetCustomerById };
