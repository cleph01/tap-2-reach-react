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

// Get All Influencers for a BusinessId
const useGetInfluencers = (businessId) => {
    const [docs, setDocs] = useState([]);

    useEffect(() => {
        const collectionRef = collection(
            db,
            `businesses/${businessId}/influencers`
        );

        let q = query(collectionRef);

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            setDocs(
                querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))
            );
        });

        return unsubscribe;
    }, [businessId]);

    return docs;
};

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

// Get All Customers by Customer id / Path
const getInfluencers = async (InfluencersArray) => {
    const influencers = await Promise.all(
        await InfluencersArray.map(async (influencer) => {
            const docRef = await getDoc(doc(db, `customers/${influencer.id}`));
            return { id: docRef.id, ...docRef.data() };
        })
    );

    return influencers;
};

export { useGetInfluencers, useGetCustomerById, getInfluencers };
