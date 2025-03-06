import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import SignupForm from './components/SignupForm/SignupForm'
import Test from './components/Test/Test'
import DashboardPage from './pages/DashboardPage'
import ProfilePage from './pages/ProfilePage'
import NewPage from './pages/NewPage'
import Hello from './components/Test/Hello.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element = {<Home/>}></Route>
          <Route path='/test' element = {<Hello/>}></Route>
        <Route path='/new' element = {<NewPage/>}></Route>
        <Route path='/profile' element = {<ProfilePage/>}></Route>
        <Route path='/signup' element = {<SignupForm/>}></Route>
        {/* 모든 라우팅이 결국에 로그인여부에 따라 달라짐 이걸 APP 레벨에서 관리하면 좀 편하려나??
        예를 들면 로그인 */}
      </Routes>
    </Router>  
  )
}

export default App
