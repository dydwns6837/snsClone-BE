import { useEffect, useState } from "react"
import { createPortal } from 'react-dom'
import { useContext } from "react"
import { ModalContext } from "../../context/ModalContext"

import style from "./Posts.module.css"
import style2 from "../Modal/OverLay.module.css"

// 이 위치에서 각 post의 id? 에 해당하는 정보를 요청하고 받아야함
const Article = () => {
  //  모달창 마운트 되고, 데이터 요청해서, 댓글과 좋아요 정보를 불러오고 표시한다.
  // 랜더링 > 마운트 >
  const [isLoading, setIsLoading] = useState(true)
  const [info, setInfo] = useState(null)

  const getInfos = async () => {
    const data = await new Promise((res, rej) => {
      setTimeout(() => {
        res("댓글과 좋아요 데이터!!")
      }, 1000);
    })
    setInfo(data)
    setIsLoading(false)
  }

  useEffect(() => {
    console.log('article modal 마운트');
    console.log('댓글 및 좋아요 정보를 불러올게요');
    getInfos()
  }, [])

  const {isOpen, modalHandler} = useContext(ModalContext)
  // console.log(isOpen, modalHandler);
  return (
    <div className={style2["modal-overlay"]} onClick={modalHandler}>
      <div className={style2.modal}>{isLoading ? "로딩중" : info}</div>
    </div>
  )
}

const Posts = ({content}) => {
  // (바둑판에 썸네일은 다 마운트 된 상태) 썸네일을 클릭시 게시글 모달창이 열리고, ^^
  const [isOpen, setIsOpen] = useState(false)

  const modalHandler = () => {
    setIsOpen(prev => !prev)
  }

  // console.log('post랜더링!');
  return (
    <ModalContext.Provider value={{isOpen, modalHandler}}>
      <div className={style.item} onClick={modalHandler}>{}</div>
      {isOpen ? createPortal(<Article/>, document.body) : null}
    </ModalContext.Provider>
  )
}

export default Posts