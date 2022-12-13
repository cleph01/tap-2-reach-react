import React from "react";

import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!

function Calendar() {
    return (
        <FullCalendar
            maxHeigh="150px"
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
        />
    );
}

export default Calendar;
