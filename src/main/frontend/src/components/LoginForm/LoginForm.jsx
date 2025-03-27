import { useState } from "react"
import { useNavigate } from "react-router-dom"

import Input from "../Input/Input"
import Button from "../Button/Button"

import styles from "./LoginForm.module.css"

const tokenAtClient = () => {
  const isToken = localStorage.getItem("access_token") ? true : false
  console.log(isToken);
  return isToken
}

const LoginForm = ({ setIsAuth }) => {
  const [contact, setContact] = useState("")
  const [password, setPassword] = useState("")
  const [isValid, setisValid] = useState(false)
  const [alert, setAlert] = useState("")

  const navigate = useNavigate()

  const isValidateForm = (contact, password) => {
    return contact.length && password.length >= 6
  }

  const contactInputHandler = (evt) => {
    const newContact = evt.target.value
    setContact(newContact)
    setisValid(isValidateForm(newContact, password))
  }

  const passwordInputHandler = (evt) => {
    const newPassword = evt.target.value
    setPassword(newPassword)
    setisValid(isValidateForm(contact, newPassword))
  }

  const submitHandler = async (evt) => {
    evt.preventDefault()
    if(!isValid) { // 부적절한 형식일경우 리턴
      // console.log('입력의 형식이 잘못됌');
      return
    }

    const form = evt.target
    const formData = new FormData(form)
    const entry = Object.fromEntries(formData)
    const json = JSON.stringify(entry)
    // console.log(json);

    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method : "POST",
        headers : {
          'Content-Type' : 'application/json'
        },
        body : json
      })
      // console.log('통신완료요');
      if(!response.ok) { //비정상이라면
        const { message } = await response.json()
        setAlert(message)
        // setIsAuth() // 얘뭐지
        return
      }

      // 정상일경우
      const { message, accessToken } = await response.json()
      localStorage.setItem('access_token', accessToken)
      setAlert(message) // 얘땜에 리랜더링이 발생하는건가??
      setIsAuth(tokenAtClient()) //setIsAuth(true)

    } catch (error) {
      setAlert("알수없는 오류에요")
    }
  }

  const signupHandler = () => {
    navigate('/signup')
  }
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Instagram</h2>
      <form className={styles.form} onSubmit={submitHandler}>
        <div className={`${styles.field} ${styles.inputField}`}>
          <Input name = "contact"  placeholder={"전화번호, 사용자 이름 또는 이메일"} handler={contactInputHandler} value = {contact}/>
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