import React from 'react'
import css from './Notif.module.css'
import infoDeleteIcon from '../assets/infoDeleteIcon.svg'
function Notif() {
  return (
    <div className={css.container} data-cy="modal-information">
        <div className={css.notif}>
            <img src={infoDeleteIcon} alt="" data-cy="modal-information-icon"/>
            <h1 data-cy="modal-information-title">Activity Berhasil Dihapus</h1>
        </div>
    </div>
  )
}

export default Notif