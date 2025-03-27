import Skeleton from "./Skeleton"
import style from './UserInfoSkeleton.module.css'

const UserInfoSkeleton = () => {
  return (
    // <div className={style.inner}>
      <div className={style["flex-container"]}>
        <div className={style["image-wrapper"]}>
          <Skeleton type = {"image"}/>
        </div>
        <div className={style["lines-wrapper"]}>
          <Skeleton type = {"article"} width="250px"/>
          <Skeleton type = {"article"} width="350px"/>
          <Skeleton type = {"article"} height="100px"/>
        </div>
      </div>
    // </div>
  )
}

export default UserInfoSkeleton