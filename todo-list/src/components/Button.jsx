import React from 'react'
import css from './Button.module.css'
import addLogo from '../assets/plus.svg'
function Button({differentiator,modalHandler,addActivity}) {
  function btnHandler(){
    if (differentiator === "activity") {
      addActivity()
    }else{
      modalHandler()
    }
  }
  return (
    <button className={css.btnAdd} onClick={()=>btnHandler()}>
        <img src={addLogo} alt="" />
        <span>Tambah</span>
    </button>
  )
}

export default Button