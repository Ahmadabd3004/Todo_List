import React from 'react'
import Button from '../components/Button'
import css from './ActivityDetail.module.css'
import emptyList from '../assets/emptyListActivity.png'
import backBtn from '../assets/backBtn.svg'
import editBtn from '../assets/editBtn.svg'
import editBtn2 from '../assets/editBtn2.svg'
import sortBtn from '../assets/sortBtn.svg'
import ceklisImg from '../assets/ceklis.svg'
import latestLogo from '../assets/latestLogo.svg'
import oldestLogo from '../assets/oldestLogo.svg'
import azLogo from '../assets/azLogo.svg'
import zaLogo from '../assets/zaLogo.svg'
import unfinishedLogo from '../assets/unfinishedLogo.svg'
import AddModal from '../components/AddModal.jsx'
import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import deleteBtn from '../assets/delete-btn.svg'
import DeleteModal from '../components/DeleteModal'

function ActivityDetail() {
  let [toggleModal, setToggleModal] = useState(false)
  let [toggleSort, setToggleSort] = useState(false)
  let [toggleDelete, setToggleDelete] = useState(false)
  let [todos, setTodos] = useState([])
  let [title, setTitle] = useState("")
  let [titleTodo, setTitleTodo] = useState("")
  let [priorityTodo, setPriorityTodo] = useState("")
  let [operation, setOperation] = useState("")
  let [sort, setSort] = useState("terbaru")
  let [idTodo, setIdTodo] = useState(0)
  let params = useParams();
  let navigate = useNavigate();

  async function fetchTodos() {
    const { data } = await axios.get("https://todo.api.devcode.gethired.id/activity-groups/" + params.detailId)
    setTodos(data.todo_items)
    setTitle(data.title)
  }
  useEffect(() => {
    fetchTodos()
  }, [])
  function modalHandler(id, title, priority) {
    setIdTodo("")
    setTitleTodo("")
    setPriorityTodo("")
    setOperation("Tambah")
    if (id && title && priority) {
      setIdTodo(id)
      setTitleTodo(title)
      setPriorityTodo(priority)
      setOperation("Update")
    }
    setToggleModal(!toggleModal)
  }
  function sortHandler() {
    setToggleSort(!toggleSort)
  }

  async function changeTitle(e) {
    setTitle(e.target.value)
    await axios.patch("https://todo.api.devcode.gethired.id/activity-groups/" + params.detailId, {
      title: e.target.value
    })
  }

  function priorityHandler(level) {
    switch (level) {
      case "very-high":
        return "#ED4C5C"
      case "high":
        return "#F8A541"
      case "normal":
        return "#00A790"
      case "low":
        return "#428BC1"
      case "very-low":
        return "#8942C1"
      default:
        break;
    }
  }

  function activeHandler(active, id) {
    let filteredTodos = todos.map((e) => {
      if (e.id === id) {
        if (active) {
          e.is_active = 0
        } else {
          e.is_active = 1
        }
      }
      return e
    })

    setTodos(filteredTodos)
    let activeValidator = 1
    if (active) {
      activeValidator = 0
    }
    axios.patch("https://todo.api.devcode.gethired.id/todo-items/" + id, {
      "is_active": activeValidator,
    })
  }

  async function addTodoItem(title, priority) {
    await axios.post("https://todo.api.devcode.gethired.id/todo-items", {
      activity_group_id: params.detailId,
      title,
      priority,
      is_active: false
    })
    fetchTodos()
    setToggleModal(!toggleModal)
  }

  async function updateTodoItem(title, priority) {
    await axios.patch("https://todo.api.devcode.gethired.id/todo-items/" + idTodo, {
      title,
      priority
    })
    fetchTodos()
    setToggleModal(!toggleModal)
  }

  function sortTodos(type) {
    switch (type) {
      case "terbaru":
        setSort("terbaru")
        fetchTodos()
        break;
      case "terlama":
        setSort("terlama")
        setTodos(todos.sort(function (a, b) {
          return (a.id - b.id);
        }))
        break;
      case "az":
        setSort("az")
        setTodos(todos.sort(function (a, b) {
          return a.title.localeCompare(b.title);
        }))
        break;
      case "za":
        setSort("za")
        setTodos(todos.sort(function (a, b) {
          return b.title.localeCompare(a.title);
        }))
        break;
      case "unfinished":
        setSort("unfinished")
        let filteredTodos = todos.filter((e) => !e.is_active)
        setTodos(filteredTodos)
        break;

      default:
        break;
    }
    setToggleSort(!toggleSort)
  }

  function modalDelete(id, titleTodo) {
    setToggleDelete(!toggleDelete)
    setIdTodo(id)
    setTitleTodo(titleTodo)
  }
  async function deleteTodo() {
    await axios.delete("https://todo.api.devcode.gethired.id/todo-items/" + idTodo)
    fetchTodos()
    setToggleDelete(!toggleDelete)
  }

  const container = {
    width: "100vw",
    height: " 100vh",
    overflow: "hidden",
  }

  const containerInactive = {
    width: "100vw",
    height: " 100vh",
  }
  return (
    <>
      {toggleDelete && <DeleteModal differentiator="List Item" title={titleTodo} modalDelete={modalDelete} deleteTodo={deleteTodo} />}
      <div style={toggleModal ? container : containerInactive}>
        {toggleModal && <AddModal modalHandler={modalHandler} addTodoItem={addTodoItem} updateTodoItem={updateTodoItem} titleTodo={titleTodo} priorityTodo={priorityTodo} operation={operation} />}
        <Button modalHandler={modalHandler} data-cy="todo-add-button" />
        <div className={css.section}>
          <img src={backBtn} alt="" onClick={() => {
            navigate(`/`)
          }} data-cy="todo-back-button" />
          <input type="text" value={title} id="title" onChange={(e) => changeTitle(e)} data-cy="todo-title" />
          <label htmlFor="title">
            <img src={editBtn} alt="" className={css.editBtnStyle} data-cy="todo-title-edit-button" />
          </label>
          {todos.length !== 0 && <img src={sortBtn} alt="" className={css.sortBtnStyle} onClick={() => sortHandler()} data-cy="todo-sort-button" />}
          
          {toggleSort && <div className={css.sortList}>
            <div className={css.latest} onClick={() => sortTodos("terbaru")} data-cy="sort-latest">
              <img src={latestLogo} alt="" />
              <h1>Terbaru</h1>
              {sort === "terbaru" && <img src={ceklisImg} alt="" className={css.ceklisIMgStyle} />}
            </div>
            <div className={css.oldest} onClick={() => sortTodos("terlama")} data-cy="sort-oldest">
              <img src={oldestLogo} alt="" />
              <h1>Terlama</h1>
              {sort === "terlama" && <img src={ceklisImg} alt="" className={css.ceklisIMgStyle} />}
            </div>
            <div className={css.az} onClick={() => sortTodos("az")} data-cy="sort-az">
              <img src={azLogo} alt="" />
              <h1>A - Z</h1>
              {sort === "az" && <img src={ceklisImg} alt="" className={css.ceklisIMgStyle} />}
            </div>
            <div className={css.za} onClick={() => sortTodos("za")} data-cy="sort-za">
              <img src={zaLogo} alt="" />
              <h1>Z - A</h1>
              {sort === "za" && <img src={ceklisImg} alt="" className={css.ceklisIMgStyle} />}
            </div>
            <div className={css.unfinished} onClick={() => sortTodos("unfinished")} data-cy="sort-unfinished">
              <img src={unfinishedLogo} alt="" />
              <h1>Belum Selesai</h1>
              {sort === "unfinished" && <img src={ceklisImg} alt="" className={css.ceklisIMgStyle} />}
            </div>
          </div>}
        </div>
        {!todos.length && <img src={emptyList} alt="" className={css.emptyImgList} data-cy="todo-empty-state" />}


        <div className={css.containerList}>
          {todos.map((e, idx) => {
            return <div className={css.listItem} key={idx} data-cy={`todo-item-${idx}`}>
              <label className={css.containerCheck}>
                <input type="checkbox" checked={e.is_active === 1 ? 'checked' : ''} onClick={() => activeHandler(e.is_active, e.id)} />
                <span className={css.checkmark}></span>
              </label>
              <div style={{
                position: "absolute",
                top: "35px",
                left: "75px",
                width: "14px",
                height: "14px",
                backgroundColor: priorityHandler(e.priority),
                borderRadius: "50%",
              }}></div>
              {e.is_active !== 1 && <h1 className={css.done}>{e.title}</h1>}
              {e.is_active === 1 && <h1 className={css.notDone}>{e.title}</h1>}

              <img src={editBtn2} alt="" className={css.editBtnStyle2} onClick={() => modalHandler(e.id, e.title, e.priority)} />
              <img src={deleteBtn} alt="" className={css.editBtnDelete} onClick={() => modalDelete(e.id, e.title)} />
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default ActivityDetail