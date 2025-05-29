import { useContext, useState } from "react"

// import Gallery from "./Gallery.jsx"
// import CommentInput from "../CreatePage/CommentInput.jsx"
import ModifyGallery from "./ModifyGallery.jsx"

import { ModifyContext } from "../../context/ModifyContext.js"
import { UserContext } from "../../context/UserContext.js"

import style from "./ModifyModal.module.css"
import ModifyCommentInput from "./ModifyCommentInput.jsx"

const ModifyModal = ({ setIsOpen }) => {
  const {images, context} = useContext(ModifyContext)
  const {curUserID} = useContext(UserContext)
  const [dupImages, setDupImages] = useState([...images])
  /*
    ModifyGallery, CommentInput 상위에 공통 state로 이미지 배열 만들고
    (아니면 images배열복사본이 아니라, 그냥 선택된 images값을)
    Gallery에서는 Idx, x 버튼을 통해서, dupImages 변경가능
    CommentInput에서는 dupImages를 넘겨주고, 변경완료된 dupImages배열, 변경된 comment값으로 submit가능!!
  */
  console.log(curUserID);
  console.log(dupImages);
  // console.log(images, context);
  return (
    <div className={style["modal-background"]} onClick={e => {
      console.log('수정창 모달 배경 핸들러');
      if(e.target == e.currentTarget) setIsOpen(prev => !prev)
    }}>
      <div className={style["modify-modal"]}>
        <div className={style["modify-image"]}>
          {/* <Gallery images = {images} children={<button className={style.deleteBtn} onClick={null}>X</button>}/> */}
          <ModifyGallery images = {dupImages} setDupImages = {setDupImages}/>
        </div>
        <div className={style["modify-content"]}>
          {/* < CommentInput/> */}
          <ModifyCommentInput curUserID = {curUserID} context = {context} images = {dupImages}/>
        </div>
      </div>
    </div>
  )
}

export default ModifyModal