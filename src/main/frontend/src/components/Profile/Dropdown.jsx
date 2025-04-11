import { useContext, useEffect, useRef, useState } from "react"

import style from "./Dropdown.module.css"

import { ModalContext } from "../../context/ModalContext";
import { UserContext } from "../../context/UserContext";

const DropdownList = ({setDropdown, dropRef, postID}) => {
  const {modalHandler} = useContext(ModalContext)
  const {getProfileInfos} = useContext(UserContext)
  console.log(dropRef);

  useEffect(() => {
    const clickHandler = e => {
      // console.log('이건 document 에서 감지된 클릭 핸들러');
      if(dropRef.current && !dropRef.current.contains(e.target)) {
        console.log('외부 클릭!');
        setDropdown(prev => !prev)
      }
    }
    const timer = setTimeout(() => {
      document.addEventListener("click", clickHandler)
    }, 0)

    return () => {
      clearTimeout(timer)
      document.removeEventListener("click", clickHandler)
    }
  }, [])

  const editHandler = () => {
    console.log('edit!');
  }

  const deletePost = async () => {
    console.log('delete post!');
    try {
      const response = await fetch(`http://localhost:8080/api/posts/${postID}`, {
        headers : {
          Authorization : `Brearer ${localStorage.getItem('access_token')}`
        },
        method : "DELETE"
      })
      // if(!response.ok) {
      //   console.log('응답이 비정상임!');
      //   return
      // }
      console.log('삭제완료!');
      modalHandler()
      getProfileInfos()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className={style.list} ref = {dropRef}>
      <ul>
        <li onClick={editHandler}>수정하기</li>
        <li onClick={deletePost}>삭제하기</li>
      </ul>
    </div>
  )
}

const DropdownToggleButton = ({postID}) => {
  const [dropdown, setDropdown] = useState(false)
  const dropdownRef = useRef(null)

  const dropdownToggle = e => {
    // console.log('이건 ... 에서 감지된 클릭 핸들러');
    if(e.target === e.currentTarget) setDropdown(prev => !prev)
  }

  return (
    <>
      <div onClick={dropdownToggle} className={style.button}>
        ... 
        {dropdown ? <DropdownList setDropdown={setDropdown} dropRef = {dropdownRef} postID = {postID}/> : null}
      </div>
    </>
  )
}

export default DropdownToggleButton