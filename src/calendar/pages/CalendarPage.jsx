import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css"
import { CalendarEvent, CalendarModal, Navbar } from "../";

import { addHours } from "date-fns";
import { getMessagesES, localizer } from "../../helpers";
import { useState } from "react";

const events = [{
    title: 'Cumpleaños del jefe',
    notes: 'asdasdas',
    start: new Date(),
    end: addHours( new Date(), 2),
    bgColor: '#fafafa',
    user: {
        _id: '123',
        name: 'Bernardo'
    }
}];

const eventStyleGetter = ( event, start, end, isSelected ) => {

    const style = {
        backgroundColor: '#347CF7',
        borderRadius: '0px',
        opacity: 0.8,
        color: 'white'
    }
    
    return {
        style
    }
}

const onDoubleClick = ( event ) => {
    console.log({ doubleClick: event });
}

const onSelect = ( event ) => {
    console.log({ click: event });
}

const onViewChange = ( event ) => {
    localStorage.setItem('lastView', event);
}

export const CalendarPage = () => {

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

	return (
		<>
			<Navbar />
			<Calendar
                culture="es"
				localizer={localizer}
				events={events}
                defaultView={ lastView }
				startAccessor="start"
				endAccessor="end"
				style={{ height: 'calc( 100vh - 80px)' }}
                messages={ getMessagesES() }
                eventPropGetter= { eventStyleGetter }
                components={{
                    event: CalendarEvent
                }}
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelect }
                onView={ onViewChange }
			/>
            <CalendarModal />
		</>
	);
};
