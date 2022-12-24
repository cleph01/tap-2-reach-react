import React from "react";

import LeftSideBar from "./business/components/layout/LeftSideBar";

import Main from "./business/components/layout/Main";

function App() {
    const businessId = "fpVAtpBjJLPUanlCydra";

    return (
        <main className="App">
            <LeftSideBar />

            <Main businessId={businessId} />
        </main>
    );
}

export default App;
