import { useDispatch, useSelector } from "react-redux"
import { onCreateNewEvent, onDeleteActiveEvent, onSetActiveEvent, onUpdateEvent } from "../store/";

export const useCalendarStore = () => {
    const dispatch = useDispatch();

    const { events, activeEvent } = useSelector( state => state.calendar );

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ));
    }

    const startSavingEvent = async( calendarEvent ) => {

        if( calendarEvent._id ){
            //updating
            dispatch( onUpdateEvent({ ...calendarEvent }))
        }else{
            //creating
            dispatch( onCreateNewEvent( { ...calendarEvent, _id: new Date().getTime() }));
        }
    }

    const startDeletingActiveEvent = () => {
        dispatch( onDeleteActiveEvent() );
    }

    return {
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        setActiveEvent,
        startSavingEvent,
        startDeletingActiveEvent
    }
}