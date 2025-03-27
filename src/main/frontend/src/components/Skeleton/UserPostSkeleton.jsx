import Skeleton from "./Skeleton"
import style from './UserPostsSkeleton.module.css'

const UserPostsSkeleton = () => {
  return (
    <div className={style.grid}>
      <Skeleton type={"article"} width={"170px"} height={"170px"}/>
      <Skeleton type={"article"} width={"170px"} height={"170px"}/>
      <Skeleton type={"article"} width={"170px"} height={"170px"}/>
      <Skeleton type={"article"} width={"170px"} height={"170px"}/>
      <Skeleton type={"article"} width={"170px"} height={"170px"}/>
      <Skeleton type={"article"} width={"170px"} height={"170px"}/>
      <Skeleton type={"article"} width={"170px"} height={"170px"}/>
      <Skeleton type={"article"} width={"170px"} height={"170px"}/>
      <Skeleton type={"article"} width={"170px"} height={"170px"}/>
    </div>
  )
}

export default UserPostsSkeleton