import { useState, useEffect } from "react";

function Test() {
  // gpt뭐함 ㅋㅋ
  /*
  const codePromiseGen = () => {
    return new Promise((res, jej) => {
      res('code')
    })
  }
  const jsonPromiseGen = () => {
    return new Promise((res, jej) => {
      res('token')
    })
  }
  new Promise((res, rej) => {
    console.log('fetch완료');
    res()
  })
  .then(() => {
    if(true) {
      return codePromiseGen().then(code => {
        console.log('에러코드값')
        throw new Error(code)
      })
    }
    console.log('정상응답 토큰');
    return jsonPromiseGen() 
  })
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.log(err);
  })
  */
  const fetchData = async () => {
    // console.log('hdy');
    const response = await fetch("http://localhost:4000/login-cookie", {
      method : "POST",
      headers : {
        'Content-Type' : 'application/json'
      },
      // body : { "user_name" : "peter", "user_id" : "uno1547", "password" : "cocacola10*"} // 1. 서버에 사용자 정보를 전송, 로그인요청
      body : JSON.stringify({ id : "peter", user_id : "uno1547", password : "cocacola10*"}) // 1. 서버에 사용자 정보를 전송, 로그인요청
    })
    if(!response.ok) {
      const status = response.status
      const code = await response.text()
      console.log(code);
      throw new Error(`code is ${status} message is ${code}`)
      return
    }
    console.log('환영해요');
    const token = await response.json().accessToken
  }
  fetchData()
  return (
    <>
      <h1>실험실</h1>
    </>
  )
}

export default Test