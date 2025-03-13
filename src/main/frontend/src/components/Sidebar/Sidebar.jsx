import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import style from "./Sidebar.module.css"

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';

const Sidebar = () => {
  const [userID, setUserID] = useState(null)

  const getUserId = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/user", {
        headers : { Authorization : `Bearer ${localStorage.getItem("access_token")}`}
      })
      const data = await response.json()
      const userID = data.userID
      setUserID(userID)
    } catch(err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getUserId()
  }, [])
  return(
    <nav>
      <div className={style.logo}>
        <Link to="/">
        Instagram
        </Link>
      </div>
      <ul className={style.navs}>
        <li>
          <Link to="/">
            <HomeOutlinedIcon fontSize="large"/>홈
          </Link>
        </li>
        <li>
          <Link to="/search">
            <SearchSharpIcon fontSize="large"/>검색
          </Link>
        </li>
        <li>
          <Link to="/create">
            <AddCircleOutlineOutlinedIcon fontSize="large"/>만들기
          </Link>
        </li>
        <li>
          <Link to= {`/${userID}`}>
          <PersonOutlinedIcon fontSize="large"/>프로필
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Sidebar