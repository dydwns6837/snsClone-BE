import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { UserContext } from "../../context/UserContext"

import UserInfo from "../../components/Profile/UserInfo"
import UserPosts from "../../components/Profile/UserPosts"
import NotFoundPage from "../NotFound/NotFoundPage"
import UserInfoSkeleton from "../../components/Skeleton/UserInfoSkeleton"
import UserPostsSkeleton from "../../components/Skeleton/UserPostSkeleton"
import style from './ProfilePage.module.css'


/* value = {{curUserID(App)}} */

const ProfilePage = () => {
  // console.log('profilepage render');
  const {userID} = useParams() 
  // console.log(userID);
  // console.log('profilePage params', userID);
  const [isLoading, setLoading] = useState(true)
  const [userData, setUserData] = useState(null)
  const [userPosts, setUserPosts] = useState(null)
  // console.log(isLoading, userData, userPosts);
  // console.log(isLoading);
  // console.log(userData);
  // console.log(userPosts);
  const getProfileInfos = async () => {
    // console.log('유저정보 및 게시글 들 불러오기!');
    setLoading(true)
    setUserData(null)
    // console.log('데이터 패치!!!');
    // console.log('getProfileInfos내에서 다시 로딩시작');
    try {
      const sleep = await new Promise((res, rej) => {
        setTimeout(() => {
          res()
        }, 1000)
      })
      
      // 프로필정보요청 먼저 던져놓음(promise생성)
      // 포스트요청 먼저 던져놓음(promise생성)
      // 던져놨던 프로필정보 기다림
      // 프로필정보 도착하자마자 UserInfo랜더링
      // 던져놨던 포스트요청은 background에서 완료되면 알아서 state변경

      // console.log('user data fetch')
      const fetchUserData = fetch(`http://localhost:8080/api/users/${userID}/profile`, {
        headers : {
          Authorization : `Bearer ${localStorage.getItem("access_token")}`
        }
      }).then(response => response.ok ? response.json() : null)

      // console.log('user post fetch')
      const fetchUserPosts = fetch(`http://localhost:8080/api/users/${userID}/posts`, {
        headers : {
          Authorization : `Bearer ${localStorage.getItem("access_token")}`
        }
      }).then(response => response.ok ? response.json() : null)
        // .then(posts => setUserPosts(posts.data.userPosts)) // 얘 까지 완료되도 최대2초 소요

      // console.log('after start fetch');
      const userDatas = await fetchUserData // 1초소요
      // console.log(userData);
      setUserData(userDatas.data)
      const userPostDatas = await fetchUserPosts // 얘까지 기다리면 isLoading이 false일틈이없어서 blinking사라지긴함 but 
      setUserPosts(userPostDatas.data)

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false)
      // console.log('after setloading');
    }
  }

  useEffect(() => {
    // console.log('effect!!');
    getProfileInfos()
    // setUserData(null) // 이거 왜 넣었었지??? 이게 없으면 존재하는 프로필 > 존재하지않는 프로필 가면 이름만 바뀜, datas를 이전존재하는프로필꺼 유지되므로 초기화해줘야 데이터패칭이후, 없는 사용자 페이지띄울수있음
  }, [userID]) // userID가 변하며 리렌더링을 트리거하면, isLoading, userData도 초기화 해줘야함!!! > 모달창의 isOpen을 원래 초기화해줘야하는데, isLoading으로 UserInfo자체를 언마운트 > 하위컴포넌트 다사라짐

  return(
  <div className={style.inner}>

    {isLoading ? // 로딩중일때 스켈레톤 표신
    <>
    <UserInfoSkeleton/> 
    <UserPostsSkeleton/>
    </>
    : // 로딩완료시 userData에 따라 랜더링
    userData ? ( // 얘 간결하게 할수있을듯? 이게 간결이구나 ㅋㅋㅋㅋ
      // userID는 과연 필요할까? UserPosts에는 쓸것같진않고 UserInfo에선 datas로 받은걸로 접근가능함(ㄴㄴ원래라면 없는게 정상임 명세대로라면 그러니 전달해주는게 맞음)
      // getProfileInfos는 왜넘기는지 모르겠네;;;
      <UserContext.Provider value={{userID, getProfileInfos, isYou : userData.isYou}}> 
          <UserInfo datas = {userData}/>
          {/* 이단계에서는 썸네일 url, post id가 맞을듯 간단히 섬네일만 표시 */}
          <UserPosts datas = {userPosts}/>
      </UserContext.Provider>
    ) : (
      <NotFoundPage/> // isLoading이 false로 바뀌었는데, userPosts는 promise.then으로 setPost가 실행되기에 isLoading이 false일 틈이 있다.
    )}
  </div>
  )
}

export default ProfilePage