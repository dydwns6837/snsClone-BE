import { useState, useEffect } from "react";

// cookie가 아닌 response에 jwt를 추가하는 방법
function TestLogin1() {
  const [id, setId] = useState("")
  const [password, setPassword] = useState("")

  const idHandler = (evt) => {
    setId(evt.target.value)
  }

  const passwordHandler = (evt) => {
    setPassword(evt.target.value)
  }

  const fetchData = (evt) => {
    evt.preventDefault()
    const form = evt.target
    const formData = new FormData(form)
    const entry = Object.fromEntries(formData)
    const json = JSON.stringify(entry)

    console.log(json)

    // fetch가
    fetch("http://localhost:4000/login-response", {
      method : "POST",
      headers : {
        'Content-Type' : 'application/json'
      },
      body : json // 1. 서버에 사용자 정보를 전송, 로그인요청
    })
    .then(response => { // 200이던 403이던 then으로 먼저 들어옴 
      if (!response.ok) { // 403 오류가 발생하면
        return response.text()  // 서버로부터 받은 메시지(텍스트)를 읽어옴
          .then(errorMessage => {
            console.log('에러던지기');
            throw new Error(`HTTP 오류! 상태: ${response.status}, 메시지: ${errorMessage}`);
          });
      }
      console.log('정상응답 json 변환');
      return response.json();  // 정상적인 응답일 경우 JSON 처리
    })
    .then(data => {
      const token = data.accessToken
      console.log(token);
    })
    .catch(err => {
      console.log(err)
    })

    /*
    .then(response => { // 4. 응답에 대해 오류면 표시해주고, 정상적으로 인증되었다면 보내온 토큰을 localStorage에 저장한다.
      if(response.status !== 200) {
        console.log('회원이 아니거나 비밀번호를 확인해보세요');
        // throw new Error(response.status);
        return
        //여기서 체인끊어야겠네
      }
      console.log('정상이래요');
      return response.json()
    }).then(data => { // 5. 토큰이 날아왔지만 비어있는경우? 
      console.log('토큰저장단계');
      localStorage.setItem('token', data.accessToken)
      console.log('토큰 저장완료!!');
    })
    */

    /*
    이게 원래꺼
    .then(response => response.json())
    .then(data => {
      localStorage.setItem('token', data.accessToken)
      console.log('받은 토큰은', data.accessToken);
    })
    .then(data => console.log(data))
    .catch(err => console.log('에러발생')) // 여기서 비번 문제인지 없는 유저인지 구분해서 알려줄수있을듯??
    */
  }
    
    



  return (
    <>
      <h1>로그인하기 response사용</h1>
      <form onSubmit={fetchData}>
        <input type="text" name = "id" value={id} onChange={idHandler}/>
        <input type="password" name = "password" value={password} onChange={passwordHandler}/>
        <button type="submit">생성</button>
      </form>
    </>
  )
}

export default TestLogin1