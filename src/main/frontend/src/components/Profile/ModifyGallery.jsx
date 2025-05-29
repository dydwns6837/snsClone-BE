import { useState } from "react"
import Dots from "./Dots"
import style from "./ModifyGallery.module.css"

const ModifyGallery = ({ images, setDupImages }) => {
  // images는 props로 받고
  // state로 idx? 혹은 문자열 배열추가해서, 
  const [idx, setIdx] = useState(0)
  console.log('갤러리에서 받은 Images', images);
  console.log('갤러리 idx', idx);
  const prevHandler = () => {
    setIdx(prev => {
      return prev == 0 ? prev : prev - 1
    })
  }

  const nextHandler = () => {
    setIdx(prev => {
      // return prev == dummyImages.length - 1 ? prev : prev + 1
      return prev == images?.length - 1 ? prev : prev + 1
    })
  }

  const deleteHandler = () => {
    setDupImages(prev => {
      const removed = prev.filter((el,imgIdx) => !(imgIdx == idx))
      console.log(removed); // dupImages줄어듬
      if(idx == removed.length) { // 지운게 맨마지막 요소였다면
        setIdx(idx - 1)
      }
      return removed
    })
    // 만약 맨뒤의 요소를 x버튼 눌러 없앴다고 치면, dupImages배열은 2개로 변하지만, idx값은 그대로 idx = 2에 머무름
    // 따라서 images[[idx]]를 하면 undefined이므로 빈화면이 보이게 되는것임!! 
  }

  return (
    <div className={style.gallery}>
      <img className = {style["gallery-img"]}src={images?.[idx]}/>
      {
        images.length == 1 ? null : <button className={`${style.btn} ${style.deleteBtn}`} onClick={deleteHandler}>X</button>
      }
      {/* <button className={`${style.btn} ${style.deleteBtn}`} onClick={deleteHandler}>X</button> */}
      <button className={`${style.btn} ${style.prevBtn}`} onClick={prevHandler} disabled = {idx == 0}>&lt;</button>
      <button className={`${style.btn} ${style.nextBtn}`} onClick={nextHandler} disabled = {idx == images?.length - 1}>&gt;</button>
      <div className={style.pagination}>
        <Dots length={images?.length} imgIdx={idx} setIdx = {setIdx}/>
      </div>
    </div>
  )
}
export default ModifyGallery