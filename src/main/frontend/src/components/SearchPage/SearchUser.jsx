import { useNavigate } from "react-router-dom"

import Skeleton from "../Skeleton/Skeleton"
import style from "./SearchUser.module.css"
const SearchUser = ({ value }) => {
  const navigate = useNavigate()
  return (
    <div className={style.userBlock} onClick={() => navigate(`/${value}`)}>
      <Skeleton type={"image"} width={"40px"} height={"40px"}/>
      <div>{value}</div>  
    </div>
  )
}
export default SearchUser