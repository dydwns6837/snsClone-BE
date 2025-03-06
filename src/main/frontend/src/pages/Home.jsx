/*

주소창에 "instagram.com" > 로그인안되어있으면 로그인페이지 보임 (결국 HomePage에서 LoginForm을 랜더링해야함)
주소창에 "instagram.com" > 로그인 되어있으면 해당유저의페이지 보임

'/'라우팅 > '/home'에 GET요청 어쨌뜬 /라우팅은 고정임
- 로그인된상태라면 'Home페이지 렌더링' > '안녕하세요 여긴 user님의 home'이에요
- 로그인안된상태라면 '/login'라우팅 > 'Login'페이지 렌더링 라우팅을 하면안돼지 링크는 같으니깐

다른 api에 대해서도 생각해보기

지금까지 한건 POST '/login' > 입력정보 보내서 > 토큰발급
토큰발급 여부에 따라 GET '/info'등의 API를 다르게 처리 가능
이것보다도 전에 있어야할게
토큰 발급 여부에 따라 GET '/home' 의 API에 대해 홈페이지를 랜더링할지 로그인 페이지를 랜더링 할지!!!
13번줄의 API는 서버에 보내고 서버가 통제해줫는데

이 GET '/home'은 서버를 거칠 필요가 있나??

*/
import { useState, useEffect } from "react"

import Header from '../components/Header/Header'
import LoginForm from "../components/LoginForm/LoginForm"
import HomePage from "./HomePage"

const tokenAtClient = () => {
  return localStorage.getItem("access_token")
  // 이게 서버에 요청보내고 응답 받는거라면?
}
function Home() {
  const [isAuth, setIsAuth] = useState(tokenAtClient())
  
  return (
    <>
      <h1>홈라우트</h1>
      {isAuth ? <HomePage/> : <LoginForm setIsAuth = {setIsAuth}/>}
    </>
  )
}

export default Home