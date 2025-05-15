import Skeleton from "../Skeleton/Skeleton"
import Button from "../Button/Button"

import style from "./CommentInput.module.css"
// import modalStyle from "../../components/Modal/OverLay.module.css"

import { UserContext } from "../../context/UserContext"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"

const CommentInput = ({ files }) => {
  const [text, setText] = useState("")
  const [textLength, setTextLength] = useState(0)
  const {curUserID} = useContext(UserContext)

  const navigate = useNavigate()
  // console.log(curUserID);
  const inputHandler = e => {
    const value = e.target.value
    if(value.length > 500) {
      return
    }
    setText(value)
    setTextLength(value.length)
  }

  // const 

  const submitHandler = async e => {
    // console.log('제출');
    e.preventDefault()
    /*
    await new Promise((res, rej) => {
      setTimeout(() => {
        res()
      }, 1000);
    })
    */
    const formData = new FormData()
    files.forEach(file => {
      formData.append("images", file)
    })
    formData.append("text", text)
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
    /*
    try {
      const err = {"status" : 400, message : "토큰없음!"}
      throw new Error(err.message)
    } catch(err) {
      console.error(err)
    }
    */

    try {
      const response = await fetch("http://localhost:8080/api/post", {
        method : "POST",
        headers : {
          Authorization : `Bearer ${localStorage.getItem("access_token")}`
        },
        body : formData,
      })
      if(!response.ok) {
        const error = await response.json()
        throw new Error(error.message)
        // throw error.message
        // return
      }
      // const result = await response.json() 여기는 응답을 사용할거 아니면 굳이 호출할 필요 X
      // 리다이렉트
      console.log('게시글 생성 성공!');
      navigate(`/${curUserID}`)
      
    } catch(err) {
      console.error(err.message)
    }

    // console.log(formData);
    // console.log(text);
    console.log('전송완료!');
    // console.log(files);
    // console.log('게시글 생성 성공!');
    // navigate(`/${curUserID}`)
  }

  return (
    // <UserContext.Provider value={{curUserID}}>
      <div className={style.commentInput}>
        <div className={style.info}>
          <Skeleton type={"image"} width={"40px"} height={"40px"}/>
          <span className={style.name}>{curUserID}</span>
        </div>
        <form action="" className={style.form} onSubmit={submitHandler}>
          <textarea name="" id="" className={style.textarea} rows="20" placeholder="내용을 입력하세요" value={text} onInput={inputHandler}></textarea>
          {/* <button>공유하기</button> */}
          <Button text={"공유하기"} style="blue" type="submit"/>
          <span className={style.count}>{textLength} / 500</span>
        </form>
      </div>
    // </UserContext.Provider>
  )
}
export default CommentInput