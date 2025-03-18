import Skeleton from "./Skeleton"
import style from './FollowListSkeleton.module.css'
const FollowListSkeleton = () => {
  return (
  <div className={style.skeletons}>
    <Skeleton type={"image"} width={"50px"} height={"50px"}/>
    <div className={style.subs}>
      <Skeleton type={"article"} width={"150px"} height={"16px"}/>
      <Skeleton type={"article"} width={"100px"} height={"16px"}/>
    </div>
  </div>
  )
}

export default FollowListSkeleton