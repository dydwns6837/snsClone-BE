import { useState } from "react"
import style from "./SearchBar.module.css"
const SearchBar = ({ setList }) => {
  const [isFocus, setIsFocus] = useState(false)
  const [query, setQuery] = useState("")

  const getQueryList = async (searchQueury) => {
    // if(!searchQueury.trim()) return // 얘가있으면 e.target.value가 빈문자열 됐을때 해당사용자가 없습니다 뜨지못함
    const response = await fetch(`http://localhost:8080/api/users/search?query=${encodeURIComponent(searchQueury)}`)
    const {users} = await response.json()
    // console.log(`${searchQueury}로 검색요청`);
    // console.log(users);
    setList(users)
  }

  const focusHandler = () => {
    // console.log('focus핸들러!')
    setIsFocus(prev => !prev)
  }

  const blurHandler = () => {
    // console.log('blur핸들러!')
    setIsFocus(prev => !prev)
  }

  return (
    <>
      <div className={style.searchBarDiv}>
        <input type="text" placeholder = "검색" className={style.searchBar} 
          value={query}
          onChange={e=> {
            setQuery(e.target.value)
            getQueryList(e.target.value)
          }}
          onFocus={focusHandler}
          onBlur={blurHandler}
        />
        {isFocus 
          ? <div className={style.deleteBtn} 
              onMouseDown={e=>e.preventDefault()}
              onClick={() => {
                setQuery("")
                getQueryList("")
                // setIsFocus(prev => !prev)
              }}
            >X
            </div> 
          : null
        }
      </div>
      {/* <span>{query}</span> */}
    </>
  )
}
export default SearchBar