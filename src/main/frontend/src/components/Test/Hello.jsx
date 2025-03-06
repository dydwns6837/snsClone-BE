import { useState, useEffect } from "react";

function Hello() {
  const [word, setWord] = useState("빈문자")
  const requestAPI = async () => {
    const response = await fetch("http://localhost:8080/hello")
    const { message } = await response.json()
    // .then(response => {
    //   if(!response.ok) {
    //     return response.text().then(err => {
    //       throw new Error(err)
    //     })
    //   }
    // })
    // const text = await response.text()
    console.log(message)
  }
  return (
    <>
      <h1>연결됐다 시발 윤오야!!!</h1>
      <button onClick={requestAPI}>인사받기</button>
    </>
  )
}

export default Hello