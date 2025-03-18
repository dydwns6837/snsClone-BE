import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

// import { UserProvider } from "../../context/UserContext"
import { UserContext } from "../../context/UserContext"


import UserInfo from "../../components/Profile/UserInfo"
import UserPosts from "../../components/Profile/UserPosts"
import Skeleton from "../../components/Skeleton/Skeleton"
import style from './ProfilePage.module.css'
import NotFoundPage from "../NotFound/NotFoundPage"
import { responsiveFontSizes } from "@mui/material"


const ProfilePage = () => {
  /*
    params로 넘어온 userId에 대해서 정보가 필요함 1) 존재하는 사용자인지아닌지 2) 존재하는 사용자면 본인인지 제3자인지 3) 제3자면 팔로우가 되있는사람인지 아닌사람인지 4)숫자와 소개글
    서버에게 물어보자 존재하는지안하는지 res {status : 400, message : 존재하지않는 사용자} 처럼
    본인인지 제3자인지, 음 이거는 토큰껴서 물어보면 응답해줄수있겠는데, 모든 요청에 토큰을 껴서 보낸다?


    최초 랜더링 > 스켈레톤 > effect > 데이터패칭시작(isLoading > false, userData > datas)
    isLoading false > 리랜더링 > 1. userData있으면 표시, userPosts패칭시작
    isLoading false > 리랜더링 > 2. userData없으면 NotFound페이지 표시
  */
  const {userID} = useParams() 
  // console.log('profilePage의 params 값은', nickName);
  const [isLoading, setLoading] = useState(true)
  const [userData, setUserData] = useState(null)
  const [userPosts, setUserPosts] = useState(null)

  const getProfileInfos = async () => {
    setLoading(true) //이게 먼저 먹어서 스켈레톤이 1초가량 떠있음
    // console.log('데이터 패치!!!');
    // console.log('getProfileInfos내에서 다시 로딩시작');
    try {
      // const sleep = await new Promise((res, rej) => {
      //   setTimeout(() => {
      //     res()
      //   }, 1000)
      // })
      
      // 프로필정보요청 먼저 던져놓음(promise생성)
      // 포스트요청 먼저 던져놓음(promise생성)
      // 던져놨던 프로필정보 기다림
      // 프로필정보 도착하자마자 UserInfo랜더링
      // 던져놨던 포스트요청은 background에서 완료되면 알아서 state변경

      console.log('user data 패치시작')
      const fetchUserData = fetch(`http://localhost:8080/api/users/${userID}/profile`, {
        headers : {
          Authorization : `Bearer ${localStorage.getItem("access_token")}`
        }
      }).then(response => response.ok ? response.json() : null)

      console.log('user post 패치시작')
      // const fetchUserPosts = fetch(`http://localhost:8080/api/users/${userID}/posts`, {
      //   headers : {
      //     Authorization : `Bearer ${localStorage.getItem("access_token")}`
      //   }
      // }).then(response => response.ok ? response.json() : null)
      //   .then(posts => setUserPosts(posts.data.userPosts))
      //
      const userData = await fetchUserData
      setUserData(userData)

    } catch (error) {

      console.error(error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // console.log('바뀐 userID로 effect!!');
    // setLoading(true) //이게 먼저 먹어서 스켈레톤이 1초가량 떠있음
    getProfileInfos()
    setUserData(null) // 이거 왜 넣었었지??? 이게 없으면 존재하는 프로필 > 존재하지않는 프로필 가면 이름만 바뀜, datas를 이전존재하는프로필꺼 유지되므로 초기화해줘야 데이터패칭이후, 없는 사용자 페이지띄울수있음
  }, [userID]) // userID가 변하며 리렌더링을 트리거하면, isLoading, userData도 초기화 해줘야함!!!

  return(
    isLoading ? // 로딩중일때 스켈레톤 표신
    <div className={style.inner}>
      <div className={style["flex-container"]}>
        <div className={style["image-wrapper"]}>
          <Skeleton type = {"image"}/>
        </div>
        <div className={style["lines-wrapper"]}>
          <Skeleton type = {"article"}/>
          <Skeleton type = {"article"} width="340px"/>
          <Skeleton type = {"article"} height="100px"/>
        </div>
      </div>
    </div> : // 로딩완료시 userData에 따라 랜더링
    userData ? ( // 얘 간결하게 할수있을듯? 이게 간결이구나 ㅋㅋㅋㅋ
      <>
      <UserContext.Provider value={{userID, isYou : userData.data.isYou, getProfileInfos}}>
        <div className = {style.inner}>
          <UserInfo datas = {userData}/>
          {/* 이단계에서는 썸네일 url, post id가 맞을듯 간단히 섬네일만 표시 */}
          <UserPosts datas = {userPosts}/>
        </div>
        {/* 여기서부터 */}
        {/* <UserInfo datas={{
          isYou : false,
          isFollowee : true,
          postNums : 10,
          followers : 290,
          followees : 246,
          article : "유용준 스물다섯"
        }} userID = "dydwns6837"/>
        <UserInfo datas={{
          isYou : false,
          isFollowee : true,
          postNums : 89,
          followers : "110.9만",
          followees : 1,
          article : `이주은 LEE JUEUN`
        }} userID = "0724.32"/>
        <UserInfo datas={{
          isYou : false,
          isFollowee : false,
          postNums : 224,
          followers : "2392만",
          followees : 4,
          article : "KARINA aespa"
        }} userID = "katarinabluu"/> */}
        {/* 여기까지 */}  
      </UserContext.Provider>
      </>
    ) : (
      <NotFoundPage/>
    )
  )
}

export default ProfilePage