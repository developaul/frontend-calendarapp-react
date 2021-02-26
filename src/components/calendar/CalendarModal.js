import React, { useState } from 'react';
import moment from 'moment';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours'),
    nowPlus1 = now.clone().add(1, 'hours');

const CalendarModal = () => {

    const [dateStart, setDateStart] = useState(now.toDate());
    const [dateEnd, setDateEnd] = useState(nowPlus1.toDate());
    const [titleValid, setTitleValid] = useState(true);

    const [{ notes, title, start, end }, setFormValues] = useState({
        title: 'Evento',
        notes: '',
        start: now.toDate(),
        end: nowPlus1.toDate(),
    });

    const handleInputChange = ({ target }) => setFormValues(v => ({
        ...v,
        [target.name]: target.value
    }));

    const handleStartDateChange = start => {

        setDateStart(start);

        setFormValues(v => ({
            ...v,
            start
        }));
    }

    const handleEndDateChange = end => {

        setDateEnd(end);

        setFormValues(v => ({
            ...v,
            end
        }));
    }

    const handleSubmitForm = e => {
        e.preventDefault();

        const momentStart = moment(start),
            momentEnd = moment(end);

        if (momentStart.isSameOrAfter(momentEnd))
            return Swal.fire('Error', 'La fecha fin debe ser mayor a la fecha de inicio', 'error');

        if (title.length < 2)
            return setTitleValid(false);

        setTitleValid(true);

        console.log({ notes, title, start, end });

        closeModal();
    }

    // Se dispara cuando tocan fuera del modal
    const closeModal = () => {
        console.log('Closing...');
    }

    return (
        <Modal
            isOpen={true}
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            closeTimeoutMS={200}
            className="modal"
            overlayClassName="modal-fondo"
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form
                className="container"
                onSubmit={handleSubmitForm}
            >
                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        className="form-control"
                        onChange={handleStartDateChange}
                        value={dateStart}
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        className="form-control"
                        onChange={handleEndDateChange}
                        minDate={dateStart}
                        value={dateEnd}
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${titleValid ? 'is-valid' : 'is-invalid'}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={handleInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>
            </form>
        </Modal>
    )
}

export default CalendarModal;