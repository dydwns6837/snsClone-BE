import Skeleton from "../Skeleton/Skeleton"
import Button from "../Button/Button"
import { useContext, useState } from "react"

import style from "./ModifyCommentInput.module.css"
import { PostModalContext } from "../../context/PostModalContext"
import { UserContext } from "../../context/UserContext"
const ModifyCommentInput = ({curUserID, context, images}) => {
  const [text, setText] = useState(context)
  const {postID} = useContext(PostModalContext)
  const {getProfileInfos} = useContext(UserContext)
  const submitHandler = async e => {
    e.preventDefault()
    console.log('제출전 확인!');
    console.log(text);
    console.log(images);
    console.log(postID);
    try {
      const response = await fetch(`http://localhost:8080/api/post/${postID}`, {
        method : "PATCH",
        headers : {
          'Authorization' : `Bearer ${localStorage.getItem("access_token")}`
        },
        body : {
          deletedImageIds : images,
          text : text
        }
      })
    } catch(err) {
      console.error(err)
    } finally {
      getProfileInfos()
    }
  }
  const inputHandler = e => {
    console.log(e.target.value);
    setText(e.target.value)
  }
  return (
    <>
      <div className={style.info}>
        <Skeleton type={"image"} width={"40px"} height={"40px"}/>
        <span className={style.name}>{"yuno4034"}</span>
        {/* <span className={style.name}>{curUserID}</span> */}
      </div>
      <form action="" className={style.form} onSubmit={submitHandler}>
        <textarea name="" id="" className={style.textarea} rows="20" placeholder="내용을 입력하세요" value={text} onInput={inputHandler}></textarea>
        {/* <button>공유하기</button> */}
        <Button text={"수정하기"} style="blue" type="submit"/>
        {/* <span className={style.count}>{textLength} / 500</span> */}
      </form>
    </>
  )
}
export default ModifyCommentInput