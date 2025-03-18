import style from './ListItem.module.css'
import Button from '../Button/Button'
import Skeleton from '../Skeleton/Skeleton'
import { Link } from 'react-router-dom'
import { useState, useContext, use } from 'react'
import { UserContext } from '../../context/UserContext.js'

const ListItem = ({ member }) => {
  const {isYou, getProfileInfos} = useContext(UserContext)
  // console.log(isYou);
  const {userID} = member
  // console.log(userID);
  const [isUnfollowed, setIsUnfollowed] = useState(false)


  const unfollow = async () => {

    // const sleep = await new Promise((res, rej) => {
    //   setTimeout(() => {
    //     res()
    //   }, 1000)
    // })

    const response = await fetch(`http://localhost:8080/api/users/${userID}/follow`, {
      method : "DELETE",
      headers : {
        Authorization : `Bearer ${localStorage.getItem("access_token")}`
      }
    })
    const data = await response.json()
    const success = data.success
    // console.log('unfollow!');
    if(success) { // 얘를 통해 언팔 실패하면 자연스럽게 버튼비활이안됌
      // getProfileInfos()
      setIsUnfollowed(true)
    }
  }

  return (
    <div className={style.item}>
      <div className={style.profile}>
        <Skeleton type={"image"} width={"50px"} height={"50px"}/>
        <Link to= {`/${member.userID}`}>{member.userID}</Link>
      </div>
      {isYou ? <Button text= "삭제" handler={unfollow} disabled={isUnfollowed}/> : null}
    </div>
  )
}

export default ListItem