import { useContext, useState } from "react"
import { PostModalContext } from "../../context/PostModalContext";

import { createPortal } from "react-dom";

import LikeUsersModal from "../Modal/LikeUsersModal";

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import style from "./LikeButton.module.css"

const LikeButton = ({info, secondOpen, setSecondOpen}) => {
  const [isLiked, setIsLiked] = useState(info.liked)
  const [likes, setLikes] = useState(info.likes)

  // const [isOpen, setIsOpen] = useState(false) // 얘를 ModalContext로 사용하면 다른 컴포넌트에서 이를 공유하게 되는거나?


  const {postID} = useContext(PostModalContext)

  const likeHandler = async (e) => {
    // console.log(e);
    console.log('좋아요');
    try {
      const response = await fetch(`http://localhost:8080/api/posts/${postID}/like`, {
        method : "POST",
        headers : {
          'Authorization' : `Bearer ${localStorage.getItem("access_token")}`
        }
      })
      if (!response.ok) return
      const newLikes = isLiked ? likes - 1 : likes + 1
      setLikes(newLikes)
      setIsLiked(prev => !prev)
    } catch(err) {
      console.error(err)
    }
  }

  // const fetchLikedUsers = () => {
  //   setSecondOpen(true)
  //   console.log('fetch users!');
  // }

  return (
    <>
      <div className={style.likebutton} style={{cursor : "pointer"}}>
        <div onClick={likeHandler}>
          {isLiked ? <FavoriteRoundedIcon style={{color: "red"}}/> : <FavoriteBorderOutlinedIcon/>}
        </div>
        <span onClick={() => {setSecondOpen(!secondOpen)}}>{`${likes} 명이 좋아합니다.`}</span>
      </div>
      {secondOpen ? createPortal(<LikeUsersModal modalHandler = {setSecondOpen}/>, document.querySelector('#modal')) : null}
      {/* <div className="meta"> */}
      {/* </div> */}
    </>
  )
}

export default LikeButton