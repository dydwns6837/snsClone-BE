import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { UserContext } from './context/UserContext'

import './App.css'

import Sidebar from './components/Sidebar/Sidebar'
import HomePage from "./pages/HomePage";
import SearchPage from './pages/SearchPage';
import CreatePage from './pages/CreatePage';
import ProfilePage from './pages/ProfilePage/ProfilePage'

import LoginForm from "./components/LoginForm/LoginForm"
import SignupForm from './components/SignupForm/SignupForm'

import Test from './components/Test/Test'
import List2 from './components/List/List2'

function App() {
  // console.log('app랜더링');

  const tokenAtClient = () => {
    const isToken = localStorage.getItem("access_token") ? true : false
    // console.log(isToken);
    return isToken
  }

  const [isAuth, setIsAuth] = useState(tokenAtClient()) 
  const [curUserID, setcurUserID] = useState(null)
  // console.log(isAuth, curUserID);

  const getcurUserID = async () => {
    if(!tokenAtClient()) return
    try {
      const response = await fetch("http://localhost:8080/api/users/userID", {
        headers : { Authorization : `Bearer ${localStorage.getItem("access_token")}`}
      })

      if(!response.ok) {
        alert('토큰이 잘못되었다!') // 이러면 강제 로그아웃(토큰삭제) 시켜버리는게 좋을지도?? 그리고 미인증 라우터로 보내기
        return
      }

      const data = await response.json()
      // const curUserID = data.userID 
      const curUserID = data.data 
      setcurUserID(curUserID)

    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    // console.log('app effect!');
    getcurUserID()
  }, [isAuth])

  return (
    <Router>
      <div className= { isAuth ? 'with-sidebar' : 'no-sidebar' } >
        <div className= "inner" >
        {isAuth ? (
          <UserContext.Provider value={{curUserID}}>
            <Sidebar/>
            <Routes>
              <Route path='/' element = {<HomePage/>}></Route>
              <Route path='/search' element = {<SearchPage/>}></Route>
              <Route path='/create' element = {<CreatePage/>}></Route>
              <Route path='/:userID' element = {<ProfilePage/>}></Route>
              <Route path='/dynamic/:param' element = {<Test/>}></Route>
              <Route path='/test' element = {<Test/>}></Route>
              <Route path='*' element = {<Navigate to="/"/>}></Route> 
            </Routes>
          </UserContext.Provider>        
        ) : (
          <Routes>
            <Route path='/' element = {<LoginForm setIsAuth={setIsAuth}/>}></Route>
            <Route path='/signup' element = {<SignupForm/>}></Route> 
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
        </div>        
      </div>
    </Router>  
  )
}

export default App
