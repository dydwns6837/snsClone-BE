import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom"
import style from "./Sidebar.module.css"

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';

const Sidebar = () => {
  const {curUserID} = useContext(UserContext)
  // console.log(userID);
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
          <Link to= {`/${curUserID}`}>
          <PersonOutlinedIcon fontSize="large"/>프로필
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Sidebar