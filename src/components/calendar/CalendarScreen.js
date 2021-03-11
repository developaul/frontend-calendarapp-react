import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';

import Navbar from '../ui/Navbar';
import { DeleteEventFab } from '../ui/DeleteEventFab';
import { AddNewFab } from '../ui/AddNewFab';
import CalendarEvent from './CalendarEvent';
import CalendarModal from './CalendarModal';
import { messages } from '../../helpers/calendar-messages-es';
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/events';
import { uiOpenModal } from '../../actions/ui';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';

moment.locale('es');

const localizer = momentLocalizer(moment);

const CalendarScreen = () => {

	const dispatch = useDispatch();
	const { events, activeEvent } = useSelector(state => state.calendar);
	const { uid } = useSelector(state => state.auth);

	const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

	useEffect(() => {
		dispatch(eventStartLoading());
	}, [dispatch]);

	const onDoubleClick = e => {
		dispatch(uiOpenModal());
	}

	const onSelectEvent = event => {
		dispatch(eventSetActive(event));
	}

	const onViewChange = e => {
		setLastView(e);
		localStorage.setItem('lastView', e);
	}

	const onSelectSlot = () => {
		dispatch(eventClearActiveEvent());
	}

	// Configurar colores
	const eventStyleGetter = (event, start, end, isSelected) => {

		const style = {
			backgroundColor: (uid === event.user._id) ? '#367CF7' : '#465660',
			borderRadius: '0px',
			color: 'white',
			display: 'block',
			opacity: 0.8
		}

		return {
			style
		}
	}

	return (
		<div className="calendar-screen">
			<Navbar />

			<Calendar
				localizer={localizer}
				events={events}
				startAccessor="start"
				endAccessor="end"
				messages={messages}
				eventPropGetter={eventStyleGetter}
				onDoubleClickEvent={onDoubleClick}
				onSelectEvent={onSelectEvent}
				onSelectSlot={onSelectSlot}
				selectable={true}
				onView={onViewChange}
				view={lastView}
				components={{
					event: CalendarEvent
				}}
			/>

			{ (activeEvent) && <DeleteEventFab />}

			<AddNewFab />

			<CalendarModal />

		</div>
	)
}

export default CalendarScreen;