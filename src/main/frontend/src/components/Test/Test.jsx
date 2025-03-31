import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';

const info = {
  "postID": "ID1",
  "imageURL": "image.img",
  "likes": 120,
  "isLiked": true,
  "context" : "이것은 게시글의 내용",
  "comments": [
    {
      "commentID": "C1",
      "user": "userA",
      "content": "멋진 사진이네요!",
      "createdAt": "2025-03-20T12:00:00Z"
    },
    {
      "commentID": "C2",
      "user": "userB",
      "content": "좋아요~",
      "createdAt": "2025-03-20T12:05:00Z"
    }
  ]
}

const Test = () => {
  const [isLiked, setIsLiked] = useState(info.isLiked)
  const [likes, setLikes] = useState(info.likes)

  const clickHandler = () => {
    const newLikes = isLiked ? likes - 1 : likes + 1
    setLikes(newLikes)
    setIsLiked(prev => !prev)
  }

  return (
    <>
      <div className="likebutton" onClick={clickHandler}>
        {isLiked ? <FavoriteRoundedIcon style={{color: "red"}}/> : <FavoriteBorderOutlinedIcon/>}
      </div>
      <div className="meta">
        <span>{likes}</span>
      </div>
    </>
  )
}

export default Test