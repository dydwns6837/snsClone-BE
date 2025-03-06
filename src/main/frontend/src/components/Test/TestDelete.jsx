import { useState, useEffect } from "react";

function TestDelete() {
  const [id, setId] = useState(1)

  const idHandler = (evt) => {
    setId(evt.target.value)
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
      method : "DELETE",
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
        <button type="submit">수정</button>
      </form>
    </>
  )
}

export default TestDelete