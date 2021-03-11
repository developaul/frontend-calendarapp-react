import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

import { useForm } from '../../hooks/useForm';
import { startLogin, startRegister } from '../../actions/auth';

import './login.css';

const LoginScreen = () => {

    const dispatch = useDispatch();

    // Login Form
    const [
        { lEmail, lPassword },
        handleLoginInputChange
    ] = useForm({
        lEmail: '',
        lPassword: ''
    });

    const handleLogin = e => {

        e.preventDefault();

        if (!lEmail.trim()) return;
        if (!lPassword.trim()) return;

        dispatch(startLogin(lEmail.trim(), lPassword.trim()));
    }

    // Register form
    const [
        { rEmail, rPassword1, rPassword2, rName },
        handleRegisterInputChange
    ] = useForm({
        rEmail: '',
        rPassword1: '',
        rPassword2: '',
        rName: ''
    });

    const handleRegister = e => {

        e.preventDefault();

        if (!rName.trim()) return;
        if (!rEmail.trim()) return;

        if (rPassword1 !== rPassword2) return Swal.fire('Error', 'Las contraseñas no son iguales', 'error');

        dispatch(startRegister(rEmail.trim(), rPassword1.trim(), rName.trim()));
    }


    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form
                        onSubmit={handleLogin}
                    >
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="lEmail"
                                value={lEmail}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="lPassword"
                                value={lPassword}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Login"
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form
                        onSubmit={handleRegister}
                    >
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="rName"
                                value={rName}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="rEmail"
                                value={rEmail}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="rPassword1"
                                value={rPassword1}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name="rPassword2"
                                value={rPassword2}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginScreen;