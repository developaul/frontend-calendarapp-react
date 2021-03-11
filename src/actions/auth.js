import Swal from "sweetalert2";

import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";

export const startLogin = (email, password) => async dispatch => {

  const resp = await fetchWithoutToken('auth', { email, password }, 'POST');
  const body = await resp.json();

  if (body.ok) {

    localStorage.setItem('token', body.token);
    localStorage.setItem('token-init-date', new Date().getTime());

    dispatch(login({
      uid: body.uid,
      name: body.name
    }));

  } else {

    Swal.fire('Error', body.msg, 'error');

  }

}

export const startRegister = (email, password, name) => async dispatch => {

  const resp = await fetchWithoutToken('auth/new', { email, password, name }, 'POST');
  const body = await resp.json();

  if (body.ok) {

    localStorage.setItem('token', body.token);
    localStorage.setItem('token-init-date', new Date().getTime());

    dispatch(login({
      uid: body.uid,
      name: body.name
    }));

  } else {

    Swal.fire('Error', body.msg, 'error');

  }

}

export const startChecking = () => async dispatch => {

  const resp = await fetchWithToken('auth/renew');
  const body = await resp.json();

  if (body.ok) {

    localStorage.setItem('token', body.token);
    localStorage.setItem('token-init-date', new Date().getTime());

    dispatch(login({
      uid: body.uid,
      name: body.name
    }));

  } else {

    dispatch(checkingFinish());

  }

}

export const startLogout = () => dispatch => {

  localStorage.clear()

  dispatch(logout());

}

const checkingFinish = () => ({
  type: types.authCheckingFinish
})

const login = user => ({
  type: types.authLogin,
  payload: user
});

const logout = () => ({
  type: types.authLogout
});