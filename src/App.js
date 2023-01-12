import { useFirestoreDocument } from "@react-query-firebase/firestore";
import React from "react";

import LeftSideBar from "./business/components/layout/LeftSideBar";

import Main from "./business/components/layout/Main";

import { BusinessContext } from "./contexts/BusinessContext";
import { getBusiness } from "./database/business/businessModel";

function App() {
    const businessId = "fpVAtpBjJLPUanlCydra";

    const businessRef = getBusiness(businessId);

    // Provide the query to the hook
    const query = useFirestoreDocument(["business"], businessRef);

    if (query.isLoading) {
        return <div>Loading...</div>;
    }

    const business = query.data;

    console.log("Business: ", business.data());

    return (
        <BusinessContext.Provider
            value={{ businessId: business.id, ...business.data() }}
        >
            <main className="App">
                <LeftSideBar />

                <Main businessId={businessId} />
            </main>
        </BusinessContext.Provider>
    );
}

export default App;
