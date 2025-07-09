import { useState } from "react"
import SearchBar from "./SearchBar"
import SearchUser from "./SearchUser"

import style from "./SearchComponent.module.css"
const SearchComponent = () => {
  const [list, setList] = useState([])
  // 여기에 클릭여부를 state로 두자기엔 list까지 리랜더링 되버릴듯
  // 검색창클릭처럼 간단한 state는 input선에서 해결하자
  return (
    <div className={style.searchDiv}>
      <SearchBar setList = {setList}/>
      <div className={style.list}>
        {list.length == 0 ? '해당하는 사용자가 없습니다' : list.map((el, idx) => <SearchUser key={`${el}${idx}`} value ={el}/>)}
      </div>
    </div>
  )
}
export default SearchComponent