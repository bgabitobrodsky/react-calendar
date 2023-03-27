import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
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

        try {

            if( calendarEvent.id ){
                //updating
                const { data } = await calendarApi.put(`/events/${ calendarEvent.id }`, calendarEvent );
                dispatch( onUpdateEvent({ ...calendarEvent, user }))
                return;
            }
    
            //creating
            const { data } = await calendarApi.post('/events', calendarEvent)
            dispatch( onCreateNewEvent( { ...calendarEvent, id: data.event.id, user }));

        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar', error.response.data.msg, 'error');
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