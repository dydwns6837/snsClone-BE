/*
프로필창을 누르면 현재 인증(브라우저에 토큰있는)된 유저의 정보를 표시
*/
import Header from '../components/Header/Header'
import UserInfo from "../components/Profile/UserInfo"
import Posts from "../components/Profile/Posts"

function ProfilePage() {
  return(
    <>
      <Header/>
      <UserInfo/>
      <Posts/>
    </>
  )
}

export default ProfilePage