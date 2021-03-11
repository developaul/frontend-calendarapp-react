import Swal from "sweetalert2";
import { fetchWithToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types";

export const eventStartAddNew = event => async (dispatch, getState) => {

  const { uid, name } = getState().auth;

  try {

    const resp = await fetchWithToken('events', event, 'POST');
    const body = await resp.json();

    if (body.ok) {

      event.id = body.eventDB.id;
      event.user = {
        _id: uid,
        name
      };

      dispatch(eventAddNew(event));

    }

  } catch (err) {

    console.log(err);

  }

}

export const eventStartLoading = () => async dispatch => {

  try {

    const resp = await fetchWithToken('events');
    const body = await resp.json();

    const events = prepareEvents(body.events);

    dispatch(eventLoaded(events));

  } catch (err) {

    console.log(err);

  }

}

export const eventStartUpdate = event => async dispatch => {

  try {

    const resp = await fetchWithToken(`events/${event.id}`, event, 'PUT');
    const body = await resp.json();

    console.log(body);

    if (body.ok) {
      dispatch(eventUpdated(event));
    } else {
      Swal.fire('Error', body.msg, 'error');
    }

  } catch (err) {

    console.log(err);

  }

}

export const eventStartDelete = () => async (dispatch, getState) => {

  const { id } = getState().calendar.activeEvent;

  try {

    const resp = await fetchWithToken(`events/${id}`, {}, 'DELETE');
    const body = await resp.json();

    if (body.ok) {

      dispatch(eventDeleted());

    } else {

      Swal.fire('Error', body.msg, 'error');

    }

  } catch (err) {

    console.log(err);

  }

}

const eventAddNew = event => ({
  type: types.eventAddNew,
  payload: event
});

const eventLoaded = events => ({
  type: types.eventLoaded,
  payload: events
});

export const eventSetActive = event => ({
  type: types.eventSetActive,
  payload: event
});

export const eventClearActiveEvent = () => ({
  type: types.eventClearActiveEvent
});

const eventUpdated = event => ({
  type: types.eventUpdated,
  payload: event
});

const eventDeleted = () => ({
  type: types.eventDeleted
});

export const eventLogout = () => ({
  tpye: types.eventLogout
});
