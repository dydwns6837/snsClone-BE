import { useState } from "react"
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import style from "./LikeButton.module.css"

const LikeButton = ({info}) => {
  const [isLiked, setIsLiked] = useState(info.isLiked)
  const [likes, setLikes] = useState(info.likes)

  const clickHandler = e => {
    // console.log(e);
    // if (e.target !== e.currentTarget) return
    const newLikes = isLiked ? likes - 1 : likes + 1
    setLikes(newLikes)
    setIsLiked(prev => !prev)
  }

  return (
    <>
      <div className={style.likebutton} onClick={clickHandler} style={{cursor : "pointer"}}>
        <div>
        {isLiked ? <FavoriteRoundedIcon style={{color: "red"}}/> : <FavoriteBorderOutlinedIcon/>}
        </div>
        <span>{`${likes} 명이 좋아합니다.`}</span>
      </div>
      {/* <div className="meta"> */}
      {/* </div> */}
    </>
  )
}

export default LikeButton