import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import UserInfo from "../components/Profile/UserInfo"
import UserPosts from "../components/Profile/UserPosts"
import Skeleton from "../components/Skeleton/Skeleton"
import style from './ProfilePage.module.css'


const ProfilePage = () => {
  /*
    params로 넘어온 userId에 대해서 정보가 필요함 1) 존재하는 사용자인지아닌지 2) 존재하는 사용자면 본인인지 제3자인지 3) 제3자면 팔로우가 되있는사람인지 아닌사람인지 4)숫자와 소개글
    서버에게 물어보자 존재하는지안하는지 res {status : 400, message : 존재하지않는 사용자} 처럼
    본인인지 제3자인지, 음 이거는 토큰껴서 물어보면 응답해줄수있겠는데, 모든 요청에 토큰을 껴서 보낸다?

    정보 받아와서 존재하는 사용자면 사정보를 표시하고
    로딩중 > 없는 사용자 > 없는 사용자인것같아요
    로딩중 > 존재하는 사용자 > datas를 UserInfo컴포넌트에 전달, UserPossts데이터 요청 시작
  */
  const {userId} = useParams()
  const [isLoading, setLoading] = useState(true) //
  const [userData, setUserData] = useState(null)

  const getProfileInfos = async () => {
    try {
      const sleep = await new Promise((res, rej) => {
        setTimeout(() => {
          res()
        }, 1000)
      })
      const response = await fetch(`http://localhost:8080/api/user/profile/${userId}`, {
        headers : {
          Authorization : `Bearer ${localStorage.getItem("access_token")}`
        }
      })

      // setLoading(!isLoading)
      setLoading(false)
      // 존재하지않는 사용자이거나 토큰 오류면 빠르게 리턴
      if(!response.ok) {
        return
      }

      const data = await response.json() //data 준비완료
      setUserData(data)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getProfileInfos()
  }, [])

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
    userData ? (
    <div className={style.inner}>
      <UserInfo datas={userData} userID = {userId}/>
      <UserInfo datas={{
        isYou : false,
        isFollowee : true,
        postNums : 10,
        followers : 290,
        followees : 246,
        article : "유용준 스물다섯"
      }} userID = "dydwns6837"/>
      {/* <UserInfo datas={{
        isYou : false,
        isFollowee : true,
        postNums : 89,
        followers : "110.9만",
        followees : 1,
        article : `이주은 LEE JUEUN`
      }} userID = "0724.32"/> */}
      <UserInfo datas={{
        isYou : false,
        isFollowee : false,
        postNums : 224,
        followers : "2392만",
        followees : 4,
        article : "KARINA aespa"
      }} userID = "katarinabluu"/>
      <UserPosts />
    </div>
    ) : (
      <>
        <span>사용자가없어요</span>
      </>
    )
  )
}

export default ProfilePage