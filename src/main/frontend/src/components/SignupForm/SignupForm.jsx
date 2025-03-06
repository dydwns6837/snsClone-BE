import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Input from '../Input/Input'
import Button from '../Button/Button'

import styles from '../LoginForm/LoginForm.module.css' //로그인폼이랑 스타일 똑같으니 그대로사용
// import { isValuesValid, isContactValid, isPasswordValid, isNickNameValid } from '../../functions/validation/checkValid'
import {isValuesValid} from "../../functions/validation/checkValid.js";

function SignupForm() {
  // console.log('render');
  const [phoneNumber, setPhoneNumber] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [nickName, setNickName] = useState("")
  const [wrongValue, setWrongValue] = useState(null)
  
  const navigate = useNavigate()

  const phoneNumberInputHandler = (evt) => {
    const newPhoneNum = evt.target.value
    setPhoneNumber(newPhoneNum)
  }

  const emailInputHandler = (evt) => {
    const newEmail = evt.target.value
    setEmail(newEmail)
  }

  const passwordInputHandler = (evt) => {
    const newPassword = evt.target.value
    setPassword(newPassword)
  }

  const nameInputHandler = (evt) => {
    const newName = evt.target.value
    setName(newName)
  }

  const nickNameInputHandler = (evt) => {
    const newNickName = evt.target.value
    setNickName(newNickName)
  }

  // const clickHandler = () => {
  //   // console.log({
  //   //   contact,
  //   //   password,
  //   //   name,
  //   //   nickName
  //   // });
  //   isValuesValid({
  //     password,
  //     name,
  //     nickName
  //   })
  // }

  const submitHandler = async (evt) => {
    console.log('submit핸들러');
    evt.preventDefault()
    // 유효성 검사 > true면 회원가입진행 문자열이면 경고메세지로 표시
    const message = isValuesValid({ phoneNumber, email, password, name, nickName })
    // const message = await isValuesValid({ phoneNumber, email, password, name, nickName })
    // // console.log(message);
    if(message != true) { //불만족한 값이 존재하는경우
      setWrongValue(message)
      console.log('뭔가 오류')
      return
    }
    console.log('모두 true');
    setWrongValue(null) // 경고메세지 제거
    // 모두 유효하다면 json으로 바꿔서 fetch post 요청 전송
    const form = evt.target
    const formData = new FormData(form)
    const entry = Object.fromEntries(formData)
    const json = JSON.stringify(entry)
    // console.log(json);

    try {
      const response = await fetch("http://localhost:8080/api/users", {
        method : "POST",
        headers : {
          'Content-Type' : 'application/json'
        },
        body : json
      })      
      // const { success, message } = await response.json()
      // // console.log(result);
      // if(success == true) {
      //   alert("회원가입에 성공했습니다")
      //   navigate('/')
      // }
    } catch (err) {
      alert("알수없는 오류가 발생했어요")
    }
  }
  /*
  1. 4개의input값 입력
  2. 회원가입 클릭 > 4개의 state값을 확인 > @@값을 확인하세요 표시
  
  */
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Instagram</h2>
      <form className={styles.form} onSubmit={submitHandler}>
        <div className={`${styles.field} ${styles.inputField}`}>
          <Input name = "phoneNumber"  type="text" placeholder={"전화번호"} handler={phoneNumberInputHandler} value={phoneNumber}/>
          <Input name = "email" type="text" placeholder={"이메일 주소"} handler={emailInputHandler} value={email}/>
          <Input name = "password"  type="password" placeholder={"비밀번호"} handler={passwordInputHandler} value={password}/>
          <Input name = "name" type="text" placeholder={"성명"} handler={nameInputHandler} value={name}/>
          <Input name = "nickName" type="text" placeholder={"사용자 이름"} handler={nickNameInputHandler} value={nickName}/>
        </div>
        <div className={`${styles.field} ${styles.buttonField}`}>
          <Button text="회원가입" type="submit"/>
          <div className={styles.notice}>{wrongValue}</div>
          {/* <Button text="회원가입" type="button" handler={clickHandler}/> */}
        </div>
      </form>
    </div>      
  )
}

export default SignupForm