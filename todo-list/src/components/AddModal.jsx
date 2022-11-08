import React from 'react'
import css from './addModal.module.css'
import priorityLogo from '../assets/priorityDown.svg'
import ceklisImg from '../assets/ceklis.svg'
import closeBtn from '../assets/closeBtn.svg'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
function AddModal({ modalHandler, addTodoItem, titleTodo, priorityTodo, operation, updateTodoItem }) {
  let [togglePriority, setTogglePriority] = useState(false)
  let [title, setTitle] = useState("")
  let [priority, setPriority] = useState("")


  useEffect(() => {
    if (priorityTodo && titleTodo) {
      setPriority(priorityTodo)
      setTitle(titleTodo)
    }
  }, [])
  function priorityHandler() {
    setTogglePriority(!togglePriority)
  }

  function changeTitle(e) {
    setTitle(e.target.value)
  }

  function changePriority(level) {
    setPriority(level)
    setTogglePriority(!togglePriority)
  }
  return (
    <>
      <div className={css.modalContainer} data-cy="modal-add">
        <div className={css.modalCard}>
          <h1 data-cy="modal-add-title">{operation} List Item</h1>
          <img src={closeBtn} alt="" className={css.closeBtn} onClick={() => modalHandler()} data-cy="modal-add-close-button"/>
          <hr className={css.line} />
          <h5 data-cy="modal-add-name-title">NAMA LIST ITEM</h5>
          <input type="text" placeholder='Tambahkan nama list item' onChange={(e) => changeTitle(e)} value={title} data-cy="modal-add-name-input"/>
          <h5 data-cy="modal-add-priority-title">PRIORITY</h5>
          {!priority &&
            <>
              <div className={css.select} style={{
                cursor: "pointer"
              }} onClick={() => priorityHandler()} data-cy="modal-add-priority-dropdown">Pilih Priority</div>
              <img src={priorityLogo} alt="" className={css.downbar} onClick={() => priorityHandler()} style={{
                cursor: "pointer"
              }} />
            </>
          }
          {priority &&
            <div className={css.firstPriority} onClick={() => priorityHandler()}>
              {priority === "very-high" &&
                <>
                  <div className={css.priorityVH}></div>
                  <h1>Very High</h1>
                </>
              }
              {priority === "high" &&
                <>
                  <div className={css.priorityH}></div>
                  <h1>High</h1>
                </>
              }
              {priority === "normal" &&
                <>
                  <div className={css.priorityM}></div>
                  <h1>Medium</h1>
                </>
              }
              {priority === "low" &&
                <>
                  <div className={css.priorityL}></div>
                  <h1>Low</h1>
                </>
              }
              {priority === "very-low" &&
                <>
                  <div className={css.priorityVL}></div>
                  <h1>Very Low</h1>
                </>
              }

              <img src={priorityLogo} alt="" onClick={() => priorityHandler()} />
            </div>
          }

          {togglePriority && (
            <div className={css.priorityList}>
              <div className={css.firstPriority} onClick={() => {
                changePriority("very-high")
              }}>
                <div className={css.priorityVH}></div>
                <h1>Very High</h1>
                {priority === "very-high" && <img src={ceklisImg} alt="" />}
              </div>
              <div className={css.priorityBox} onClick={() => {
                changePriority("high")
              }}>
                <div className={css.priorityH}></div>
                <h1>High</h1>
                {priority === "high" && <img src={ceklisImg} alt="" />}
              </div>
              <div className={css.priorityBox} onClick={() => {
                changePriority("normal")
              }}>
                <div className={css.priorityM}></div>
                <h1>Medium</h1>
                {priority === "normal" && <img src={ceklisImg} alt="" />}
              </div>
              <div className={css.priorityBox} onClick={() => {
                changePriority("low")
              }}>
                <div className={css.priorityL}></div>
                <h1>Low</h1>
                {priority === "low" && <img src={ceklisImg} alt="" />}
              </div>
              <div className={css.lastPriority} onClick={() => {
                changePriority("very-low")
              }}>
                <div className={css.priorityVL}></div>
                <h1>Very Low</h1>
                {priority === "very-low" && <img src={ceklisImg} alt="" />}
              </div>
            </div>
          )}

          <hr className={css.line2} />
          {title && priority && <div className={css.btnSimpan}
            onClick={() => {
              if (operation === "Tambah") {
                addTodoItem(title, priority)
              } else {
                updateTodoItem(title, priority)
              }
            }}
            data-cy="modal-add-save-button"
          >
            <h1>{operation}</h1>
          </div>}

          {!title && <div className={css.btnSimpanInactive} >
            <h1>{operation}</h1>
          </div>}

          {!priority && <div className={css.btnSimpanInactive} >
            <h1>{operation}</h1>
          </div>}


        </div>
      </div>
    </>
  )
}

export default AddModal