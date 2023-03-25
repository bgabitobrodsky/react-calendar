import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api";
import { parseEvents } from "../helpers";
import { onCreateNewEvent, onDeleteActiveEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store/";

export const useCalendarStore = () => {
    const dispatch = useDispatch();

    const { events, activeEvent } = useSelector( state => state.calendar );
    const { user } = useSelector( state => state.auth );

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ));
    }

    const startSavingEvent = async( calendarEvent ) => {

        if( calendarEvent._id ){
            //updating
            dispatch( onUpdateEvent({ ...calendarEvent }))
        }else{
            //creating

            const { data } = await calendarApi.post('/events', calendarEvent)
            console.log(data)
            dispatch( onCreateNewEvent( { ...calendarEvent, id: data.event.id, user }));
        }
    }

    const startDeletingActiveEvent = () => {
        dispatch( onDeleteActiveEvent() );
    }

    const startLoadingEvents = async() => {
        try{
            const { data } = await calendarApi.get('/events');
            const events = parseEvents( data.events );
            dispatch( onLoadEvents(events) );
        }catch(error){
            console.log('Error al cargar eventos');
            console.log(error);
        }
    }

    return {
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        setActiveEvent,
        startSavingEvent,
        startDeletingActiveEvent,
        startLoadingEvents,
    }
}