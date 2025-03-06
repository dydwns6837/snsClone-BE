import { useState } from "react"
import { useNavigate } from "react-router-dom"

import Input from "../Input/Input"
import Button from "../Button/Button"

import styles from "./LoginForm.module.css"

function LoginForm({ setIsAuth }) {
  const [userValue, setuserValue] = useState("")
  const [password, setPassword] = useState("")
  const [isValid, setisValid] = useState(false)
  const [alert, setAlert] = useState("")

  const navigate = useNavigate()

  const tokenAtClient = () => {
    return localStorage.getItem("access_token") // 루트 라우팅일때 토큰 여부 바꿔서 홈페이지 보이게 하려는 건데...
  }

  // console.log(userName, password);
  const isValidateForm = (userValue, password) => {
    return userValue.length && password.length >= 6
  }

  const userValueInputHandler = (evt) => {
    const newUserValue = evt.target.value
    setuserValue(newUserValue)
    setisValid(isValidateForm(newUserValue, password))
  }

  const passwordInputHandler = (evt) => {
    const newPassword = evt.target.value
    setPassword(newPassword)
    setisValid(isValidateForm(userValue, newPassword))
  }

  const submitHandler = async (evt) => {
    evt.preventDefault()
    if(!isValid) { // 부적절한 형식일경우 리턴
      return
    }

    const form = evt.target
    const formData = new FormData(form)
    const entry = Object.fromEntries(formData)
    const json = JSON.stringify(entry)
    console.log(json);

    try {
      const response = await fetch("http://localhost:4000/api/login", {
        method : "POST",
        headers : {
          'Content-Type' : 'application/json'
        },
        body : json
      })
      console.log(response);
      if(!response.ok) { //정상이라면
        const { message } = await response.json()
        setAlert(message)
        return
      }

      const { message, accessToken } = await response.json()
      localStorage.setItem('access_token', accessToken)
      setAlert(message)
      setIsAuth(tokenAtClient())
      // console.log(message);      
    } catch (error) {
      setAlert("알수없는 오류에요")
    }
    /*
    fetch("http://localhost:4000/api/login", {
      // mode : 'no-cors',
      method : "POST",
      headers : {
        'Content-Type' : 'application/json'
      },
      body : json, // 1. 서버에 사용자 정보를 전송, 로그인요청
      // credentials : 'include' //애초에 이 Fetch에는 이 옵션이 필요없는것같은데???
    })
    .then(response => {
      console.log('response 가 왔어요');
      if(!response.ok) { 
        return response.text().then(err => { //얘가 비동기적으로 동작하기때문에 아래 return response.json()이 먼저 동작
          throw new Error(err)
        })
      }
      return response.json()
    })
    .then(data => {
      localStorage.setItem("access_token", data.accessToken)
      console.log(data);
      setIsAuth(tokenAtClient()) // 루트라우팅에서 홈페이지를 랜더링하게
      // navigate('/')
    })
    .catch(err => {
      console.log('catch블럭임');
      console.log(err);
    })
    */
    // .catch(err => console.log(err)) // 여기 catch가 실행됐다고 해서 fetch에서 오류인지 위 2개의 then에서 오류인지 알수없다!! 조심

  }

  const signupHandler = () => {
    navigate('/signup')
  }
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Instagram</h2>
      <form className={styles.form} onSubmit={submitHandler}>
        <div className={`${styles.field} ${styles.inputField}`}>
          <Input name = "userValue"  placeholder={"전화번호, 사용자 이름 또는 이메일"} handler={userValueInputHandler} value = {userValue}/>
          <Input name = "password"  type="password" placeholder={"비밀번호"} handler={passwordInputHandler} value = {password}/>
        </div>
        <div className={`${styles.field} ${styles.buttonField}`}>
          <Button text="로그인" type="submit" disabled = {!isValid}/>
          <Button text="회원가입" type="button" handler={signupHandler}/>
          <div className={styles.notice}>{alert}</div>
        </div>
      </form>
    </div>    
  )
}
export default LoginForm