import { useState } from "react"
import Button from "../Button/Button";
import style from "./CreatePallette.module.css"
const CreatePallette = ({ files, setFiles, setShowPal }) => {
  console.log('받은 배열', files);
  const [idx, setIdx] = useState(0)

  // console.log(files[idx].name);

  const deleteHandler = () => {
    console.log(idx, "지울게요");
    const removed = files.filter((el, fileIdx) => fileIdx != idx)
    console.log(removed);
    // 맨 마지막 요소를 지우는 경우 ex) 3개의 사진이있다가 idx = 2를 지우면 리랜더링후 idx가 그대로 2면 아래 img src = url(files[idx]) 에서 오류발생, idx를 1개줄여줘야함
    if(idx == files.length - 1) {
      setIdx(idx - 1) // 2중 1 지우면 idx = 0, 1중 0 지우면 idx = -1
    }
    setFiles(removed)
    if(removed.length == 0) setShowPal(false) // 이건 files가 빈배열일때 강제로 CreatePallette를 언마운트 해버려서, files[idx] 에서 오류가 날수가없음 괜찮은건가? ㅋㅋ
  }

  const prevHandler = () => {
    setIdx(prev => {
      // if(prev == 0) return prev
      // return prev - 1

      return prev == 0 ? prev : prev - 1
    })
    // setIdx(idx - 1)
  }

  const nextHandler = () => {
    setIdx(prev => {
      // if(prev == files.length - 1) return prev
      // return prev + 1

      return prev == files.length - 1 ? prev : prev + 1
    })
    // setIdx(idx + 1)
  }

  return (
    <>
      {/* <div className={style["pallette-img"]}></div> */}
      {/* 맨 마지막 요소를 지우게 되면 ex 3장의 사진중 맨마지막 idx = 2 > 리랜더링 files[2] 는 존재하지않아서 오류 발생 */}
      <img src={URL.createObjectURL(files[idx])} alt="" className={style["pallette-img"]}/>
      <button className={`${style.btn} ${style.deleteBtn}`} onClick={deleteHandler}>X</button>
      <button onClick={prevHandler} className={`${style.btn} ${style.prevBtn}`} disabled = {idx == 0}>&lt;</button>
      <div className={style.info}>
        <div>{`총 사진 개수 ${files.length}`}</div>
        <div>{`현재 idx ${idx}`}</div>
      </div>
      <button onClick={nextHandler} className={`${style.btn} ${style.nextBtn}`} disabled = {idx == files.length - 1}>&gt;</button>
    </>
  )
}

export default CreatePallette