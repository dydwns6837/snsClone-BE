import modalDefaultStyle from "./OverLay.module.css"
import modalStyle from "../List/List.module.css"
import listStyle from "../List/ListItem.module.css"

import Skeleton from "../Skeleton/Skeleton";
import FollowListSkeleton from "../Skeleton/FollowListSkeleton";

import { useContext, useEffect, useState } from "react";
import { PostModalContext } from "../../context/PostModalContext";
import { Link } from "react-router-dom";

const LikeUsersModal = ({modalHandler}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [likeList, setLikeList] = useState([])
  const {postID} = useContext(PostModalContext)

  // const toggle = () => {
  //   modalHandler(prev => !prev)
  // }

  useEffect(() => {
    const handleKeyDown = e => {
      // console.log(e.target, e.currentTarget);
      // console.log('좋아요 리스트 모달창에서 keydown핸들러');
      e.stopPropagation()
      if(e.key === "Escape") {
        modalHandler(prev => !prev)
      }
    }
    document.addEventListener("keydown",handleKeyDown)

    const fetchLikedUsers = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`http://localhost:8080/api/posts/${postID}/userLikes`, {
          headers : {
            Authorization : `Bearer ${localStorage.getItem("access_token")}`
          }
        })
        if(!response.ok) return
        const { data } = await response.json()
        console.log(data);
        setLikeList(data)
      } catch(err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
      // const sleep = () => {
      //   return new Promise((res, rej) => {
      //     setTimeout(() => {
      //       res()
      //     }, 1000);
      //   })
      // }
      // const result = await sleep()

    }
    

    fetchLikedUsers()

    return () => {
      // console.log('좋아요 리스트 모달 닫힘!!');
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return (
      <div className={modalDefaultStyle["modal-overlay"]} onClick={e => {
        if(e.target == e.currentTarget) modalHandler(prev => !prev)        
      }}>
        <div className={modalStyle.modal}>
          <div className={modalStyle.head}>
            <span className={modalStyle.text}>좋아요</span>
            <button className={modalStyle.closeButton} onClick={e => {
              modalHandler(prev => !prev)
            }}>X</button>
          </div>
          <div className={modalStyle.list}>
          {isLoading ? (
            <>
              <FollowListSkeleton/>
              <FollowListSkeleton/>
              <FollowListSkeleton/>
              <FollowListSkeleton/>
              <FollowListSkeleton/>
            </>
          ) :
          likeList.length ? (
            likeList.map((el, idx) => {
              return (
                <div className={listStyle.item} key={idx}>
                  <div className={listStyle.profile}>
                    <Skeleton type={"image"} width={"50px"} height={"50px"}/>
                    <Link to= {`/${el.userID}`}>{el.userID}</Link>
                  </div>
                </div>
              )
            })
          ):(
            <div>결과없음</div>
          )
          }
        </div>
        </div>
      </div>
  )
}

export default LikeUsersModal