import { useState, useEffect, useContext } from 'react'
import { createPortal } from 'react-dom'

import style from './ShowList.module.css'
// import FollowerList from './FollowerList'
import FollowListModal from '../Modal/FollowListModal'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
// import style from './OverLay.module.css'
// import style1 from './OverLay.module.css'

// const FollowListModal = ({ handler }) => {
//   return (
//     <div className={style["modal-overlay"]}onClick={handler}>
//       <FollowerList handler = {handler}/>
//     </div>
//   )
// }


const ShowList = ({ text }) => {
  const [isOpen, setIsOpen] = useState(false)
  const {userID} = useContext(UserContext)
  const navigate = useNavigate()
    useEffect(() => {
      // console.log('showList mount');
      return () => {
        // console.log('showList unmount');
        // navigate(`/${userID}`)
      }
    }, [])
  // console.log('showlist');
  const toFind = text === "팔로워" ? "followers" : "followings"

  const handler = () => {
    setIsOpen(prev => !prev)
  }
  return (
    <>
      <span className={style.tag} onClick={handler}>{text}</span>
      {isOpen ? createPortal(<FollowListModal handler = {handler} toFind = {toFind}/>, document.body) : null}
    </>
  )
}

export default ShowList