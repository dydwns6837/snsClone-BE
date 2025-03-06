import { useState, useEffect } from "react";

function TestPost() {
  const [id, setId] = useState("")
  const [title, setTitle] = useState("")

  const idHandler = (evt) => {
    setId(evt.target.value)
  }

  const titleHandler = (evt) => {
    setTitle(evt.target.value)
  }

  const fetchData = (evt) => {
    evt.preventDefault()
    const form = evt.target
    const formData = new FormData(form)
    const entry = Object.fromEntries(formData)
    console.log(entry);
    const json = JSON.stringify(entry)

    console.log(json)

    // const payload = new URLSearchParams(formData)
    fetch("http://localhost:4000/articles", {
      method : "POST",
      headers : {
        'Content-Type' : 'application/json'
      },
      body : json
    }).then(response => response.text())
      .then(data => console.log(data))
  }
  return (
    <>
      <h1>test post</h1>
      <form onSubmit={fetchData}>
        <input type="number" name = "id" value={id} onChange={idHandler}/>
        <input type="text" name = "title" value={title} onChange={titleHandler}/>
        <button type="submit">생성</button>
      </form>
    </>
  )
}

export default TestPost


/*
  const fetchData = (evt) => {
    evt.preventDefault()
    const form = evt.target
    const formData = new FormData(form)
    const payload = new URLSearchParams(formData)
    fetch("http://localhost:4000/articles", {
      method : "POST", 
      headers : {
        'Content-Type' : 'application/x-www-form-urlencoded'
      },
      body : payload,
    }).then(response => response.text())
      .then(data => console.log(data))
  }
*/