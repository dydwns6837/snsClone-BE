import { useState } from "react";
import style from "./CreatePage.module.css"
import CreatePallette from "../components/CreatePage/CreatePallette";
import CommentInput from "../components/CreatePage/CommentInput"

function CreatePage() {
  // console.log('ㅗㅑ');
  const [files, setFiles] = useState([])
  const [showPal, setShowPal] = useState(false)
  /*
    1. 최초 '사진을 선택해주세요'누르면
    2. finder표시 여기서 한개/여러개 선택 > formData에 추가
    3. '열기' 누르면 택한만큼 팔레트처럼 보이기 ex 2개면 콤마콤마, 화살표 버튼, +버튼나오게, 0개면 그냥 처음 "사진을 선택해주세요" 버튼 보이게
    4. 팔레트에서 +누르면 더 추가 가능함, 팔레트에서 x누르면 삭제가능함
    5. 글 작성하러가기 버튼 존재
    6. 글 작성 창에서도 팔레트의 사진들 볼수있음
  */
  const fileChangeHandler = e => {
    const files = e.target.files
    console.log(files);
    if(files.length == 0) return
    setShowPal(true)
    // console.log(files);
    // const arr = 3
    const arr = Array.from(files)
    // console.log(arr);
    setFiles(prev => [...prev, ...arr])

  }

  const removeHandler = imgIdx => {
    // console.log(idx);
    // setFiles(e => e)
    const removed = files.filter((el, idx) => idx != imgIdx)
    setFiles(removed)
    /*
    setFiles(prev => prev.filter((el, idx) => idx != imgIdx))
    */
    // console.log(files.length);
    if(removed.length == 0) setShowPal(false)
    // 삭제를 계속해서 0이되면 다시 setShowPal을 바꿔서 점선으로 바꿀수있게
  }

  return(
      <div className={ showPal ? `${style.create} ${style.active}` : style.create}>
        <input type="file" accept="image/*" multiple id="file-input" onChange={fileChangeHandler}  className={style["input-file"]}/>
        {!showPal && <label htmlFor="file-input" className={style.btn}>사진업로드</label>}
        {/* {showPal && <label htmlFor="file-input" className={`${style.btn} ${style.smallBtn}`}>+</label>} */}
        {/* <button>안녕</button> */}
        {showPal && <CreatePallette files = {files} setFiles = {setFiles} setShowPal = {setShowPal} label = {<label htmlFor="file-input" className={`${style.btn} ${style.smallBtn}`}>+</label>}/>}
        {showPal && <CommentInput files = {files}/>}
      </div>
  )
}

export default CreatePage