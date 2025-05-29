import style from "./Dot.module.css"

const Dots = ({ length, imgIdx, setIdx }) => {
  // console.log('dots 랜더링!!');
  return (
    <>
      {Array.from({length : length}).map((el, idx) => {
        return <Dot cur = {idx == imgIdx} key={`${el},${idx}`} clickHandler = {() => {setIdx(idx)}}/>
      })}
    </>
  )
}
const Dot = ({ cur, clickHandler }) => {
  // console.log(clickHandler);
  return (
    <div onClick={clickHandler} className={cur ? `${style.dot} ${style["cur-dot"]}` : `${style.dot}`}></div>
  )
}

export default Dots