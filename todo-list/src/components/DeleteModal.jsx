import React from 'react'
import css from './deleteModal.module.css'
import deleteIcon from '../assets/deleteIcon.svg'
function DeleteModal({ differentiator, deleteHandler, deleteActivity, title, modalDelete, deleteTodo }) {

    function cancelHandler() {
        if (differentiator == "Activity") {
            deleteHandler()
        } else {
            modalDelete()
        }
    }

    function deleteModalHandler() {
        if (differentiator === "Activity") {
            deleteActivity()
        } else {
            deleteTodo()
        }
    }
    return (
        <div className={css.modalContainer} data-cy="modal-delete">
                <div className={css.modalCard}>
                    <img src={deleteIcon} alt="" data-cy="modal-delete-icon"/>
                    <h1 data-cy="modal-delete-title">Apakah Anda yakin menghapus {differentiator}</h1>
                    <h2>"{title}"</h2>
                    <div className={css.btnSection}>
                        <div className={css.cancelBtn} onClick={() => cancelHandler()} data-cy="modal-delete-cancel-button">
                            <h1>Batal</h1>
                        </div>
                        <div className={css.deleteBtn} onClick={() => deleteModalHandler()} data-cy="modal-delete-confirm-button">
                            <h1>Hapus</h1>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default DeleteModal