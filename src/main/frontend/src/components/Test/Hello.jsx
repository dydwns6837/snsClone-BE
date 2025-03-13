import { useState, useEffect } from "react";

function Hello() {
  const [word, setWord] = useState("빈문자")
  const requestAPI = async () => {
    const response = await fetch("http://localhost:4000/hello-cookie", {
      credentials : 'include' //자동
    })
    const { message } = await response.json()
    // .then(response => {
    //   if(!response.ok) {
    //     return response.text().then(err => {
    //       throw new Error(err)
    //     })
    //   }
    // })
    // const text = await response.text()
    console.log('안녕');
    setWord(message)
  }
  return (
    <>
      <h1>{word}</h1>
      <button onClick={requestAPI}>인사받기</button>
    </>
  )
}

export default Hello