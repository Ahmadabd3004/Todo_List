import React, { useState } from 'react'
import Button from '../components/Button'
import css from './Dashboard.module.css'
import emptyImg from '../assets/empty.png'
import deleteBtn from '../assets/delete-btn.svg'
import DeleteModal from '../components/DeleteModal'
import { useEffect } from 'react'
import axios from 'axios'
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Notif from '../components/Notif'

function Dashboard() {
  let [activity, setActivity] = useState([])
  let [idActivity,setIdActivity] = useState(0)
  let [title,setTitle] = useState('')
  let [toggleDelete, setToggleDelete] = useState(false)
  let [notifToggle, setNotifToggle] = useState(false)
  let navigate = useNavigate();
  const fetchData = async () => {
    let {data} = await axios.get("https://todo.api.devcode.gethired.id/activity-groups?email=ahmadazis3004@gmail.com")
    let realData = data.data.map((e)=>{
      e.date = convertDate(new Date(moment(e.created_at).utc().format('YYYY-MM-DD')))
      return e
    })
    setActivity(realData)
  }

  useEffect(()=>{
    fetchData()
  },[])


  function convertDate(date){
    var tahun = date.getFullYear();
    var bulan = date.getMonth();
    var tanggal = date.getDate();
    var hari = date.getDay();
    switch (hari) {
      case 0: hari = "Minggu"; break;
      case 1: hari = "Senin"; break;
      case 2: hari = "Selasa"; break;
      case 3: hari = "Rabu"; break;
      case 4: hari = "Kamis"; break;
      case 5: hari = "Jum'at"; break;
      case 6: hari = "Sabtu"; break;
    }
    switch (bulan) {
      case 0: bulan = "Januari"; break;
      case 1: bulan = "Februari"; break;
      case 2: bulan = "Maret"; break;
      case 3: bulan = "April"; break;
      case 4: bulan = "Mei"; break;
      case 5: bulan = "Juni"; break;
      case 6: bulan = "Juli"; break;
      case 7: bulan = "Agustus"; break;
      case 8: bulan = "September"; break;
      case 9: bulan = "Oktober"; break;
      case 10: bulan = "November"; break;
      case 11: bulan = "Desember"; break;
    }
    return `${tanggal} ${bulan} ${tahun}`
  }
  async function addActivity() {
    await axios.post("https://todo.api.devcode.gethired.id/activity-groups",{
      title: "New Activity",
      email: "ahmadazis3004@gmail.com"
    })
    fetchData()
  }
  function deleteHandler(id,title) {
    setToggleDelete(!toggleDelete)
    setIdActivity(id)
    setTitle(title)
  }
  function deleteActivity(){
    let filteredActivity = activity.filter((e)=>e.id != idActivity)
    axios.delete("https://todo.api.devcode.gethired.id/activity-groups/"+idActivity)
    setActivity(filteredActivity)
    setToggleDelete(!toggleDelete)
    setNotifToggle(true)
    setTimeout(()=>{
      setNotifToggle(false)
    },3000)
  }
  function goToDetail(id){
    navigate(`/detail/${id}`)
  }
  return (
    <>
      {notifToggle && <Notif/>}
      {toggleDelete && <DeleteModal differentiator="Activity" title={title} deleteHandler={deleteHandler} deleteActivity={deleteActivity}/>}
      <div className={css.container}>
        <h1 data-cy="activity-title">Activity</h1>
        <Button addActivity={addActivity} differentiator="activity" data-cy="activity-add-button"/>
        {!activity.length && <div className={css.emptyList}>
          <img src={emptyImg} alt="" data-cy="activity-empty-state"/>
        </div>}

        <div className={css.listItems}>
          {activity.length && activity.map((e, idx) => {
            return <div className={css.card} key={idx} onClick={()=>goToDetail(e.id)} data-cy={`activity-item-${idx}`}>
              <h1>{e.title}</h1>
              <h2>{e.date}</h2>
              <img src={deleteBtn} alt="" onClick={(event)=>{
                event.stopPropagation()
                deleteHandler(e.id,e.title)
              }
              } style={{
                cursor:"pointer"
              }}/>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default Dashboard