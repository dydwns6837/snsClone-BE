import { useContext, useEffect, useRef, useState } from "react"
import { createPortal } from 'react-dom'

import style from "./Dropdown.module.css"

import { ModalContext } from "../../context/ModalContext";
import { UserContext } from "../../context/UserContext";
import ModifyModal from "./ModifyModal";

const DropdownList = ({setDropdown, dropRef, postID, modDatas}) => {
  const [isOpen, setIsOpen] = useState(false)
  const {modalHandler} = useContext(ModalContext)
  const {getProfileInfos} = useContext(UserContext)
  // console.log(dropRef);
  // console.log('dropdown list리랜더링');

  useEffect(() => {
    // if(!isOpen) return
    console.log('effect!');
    const clickHandler = e => {
      // console.log('이건 document 에서 감지된 클릭 핸들러');
      // console.log(`dropRef.current : ${dropRef.current}`);
      // console.log(`dropRef.current가 포함하고 있는거 ${e.target}`);
      // console.log(dropRef.current);
      // console.log(e.target);
      // console.log('document에 추가한 핸들러'); // isOpen 변경으로 인해 DropdownList 리랜더링 > 이후에 document에 단게 트리거 되는듯
      if(dropRef.current && !dropRef.current.contains(e.target) && !isOpen) {
        // console.log('document 감지 외부클릭으로 리스트 닫힘!!');
        // 여기서 리스트가 닫히면서 리스트 하위컴포넌트였던 ModifyModal도 같이 닫히네;;;;;;;;;
        // 수정창을 클릭했는데 구조상 다른위치에 있는


        // ModifyModal을 클릭하는 경우에도 얘 트리거해서 닫히게 된다. 창이 열린상태에서 버그날지도
        // console.log('외부 클릭!');
        setDropdown(prev => !prev)
      }
    }
    const timer = setTimeout(() => {
      document.addEventListener("click", clickHandler)
    }, 0)

    return () => {
      console.log('클린업함수!!');
      clearTimeout(timer)
      document.removeEventListener("click", clickHandler)
    }
  }, [isOpen])
  /*
  첫 마운트에는 무조건 달려하고, isOpen값에 따라 달리거나, 없어지거나?
  */


  const editHandler = () => {
    console.log('edit!');
    setIsOpen(true)
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
      {isOpen ? createPortal(<ModifyModal setIsOpen = {setIsOpen}/>, document.querySelector('#modal')) : null}
      {/* createportal로 독립된 div에 놓여지지만, 여전히 구조상 부모라고 치는건가? 그래서 ModifyModal > DropdownList > DropdownToggleButton >  */}
    </div>
  )
}

const DropdownToggleButton = ({postID, modDatas}) => {
  const [dropdown, setDropdown] = useState(false)
  const dropdownRef = useRef(null)

  const dropdownToggle = e => {
    // console.log('... 에서 감지된 클릭 핸들러 리스트');
    if(e.target === e.currentTarget) {
      // console.log('...를 직접클릭');
      setDropdown(prev => !prev)
    }
  }

  return (
    <>
      <div onClick={dropdownToggle} className={style.button}>
        ... 
        {dropdown ? <DropdownList setDropdown={setDropdown} dropRef = {dropdownRef} postID = {postID} modDatas = {modDatas}/> : null}

      </div>
    </>
  )
}

export default DropdownToggleButton