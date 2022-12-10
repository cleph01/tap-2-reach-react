import React from "react";

import Nav from "./components/layout/Nav";
import RightSideBar from "./components/layout/RightSideBar";
import Main from "./components/layout/Main";

function App() {
    const businessId = "fpVAtpBjJLPUanlCydra";

    return (
        <div className="App">
            <Nav />

            <Main businessId={businessId} />

            <RightSideBar businessId={businessId} />
        </div>
    );
}

export default App;
