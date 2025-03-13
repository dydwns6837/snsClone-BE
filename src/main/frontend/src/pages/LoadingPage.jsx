import Skeleton from "../components/Skeleton/Skeleton";
import style from "./LoadingPage.module.css"
export default function LoadingPage() {

  return (
    <div className={style["skeleton-wrapper"]}>
      <Skeleton type = {"article"}/>
      <Skeleton type = {"article"}/>
      <Skeleton type = {"image"}/>
    </div>
  )
}