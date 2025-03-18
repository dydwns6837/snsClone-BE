import style from './Skeleton.module.css'

const Skeleton = ({ type, width, height }) => {
  return (
      <div 
        className = {`${style.skeleton} ${style[type]}`}
        style= {{
          width,
          height,
        }}
      >
      </div>
  )
}

export default Skeleton