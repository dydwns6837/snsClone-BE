import { useState, useEffect } from "react";

function TestUpdate() {
  const [id, setId] = useState(1)
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
      method : "PUT",
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
        <button type="submit">수정</button>
      </form>
    </>
  )
}

export default TestUpdate