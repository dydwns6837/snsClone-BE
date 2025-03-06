import { Link, NavLink } from "react-router-dom"
import style from "./Header.module.css"

function Header() {
  return(
    <header>
      <ul>
        <li>
          <NavLink to = "/" className={({isActive}) => isActive ? style.current : ""}>
          홈
          </NavLink>
        </li>
        <li>
          <NavLink to = "/new" className={({isActive}) => isActive ? style.current : ""}>
          만들기
          </NavLink>
        </li>
        <li>
          <NavLink to = "/profile" className={({isActive}) => isActive ? style.current : ""}>
          프로필
          </NavLink>
        </li>
      </ul>
    </header>
  )
}

export default Header