import { useState, useEffect } from "react";

function TestGet() {
  const [datas, setData] = useState(null)
  console.log('render');
  useEffect(() => {
    fetch("http://localhost:4000/articles", {
      method : "GET"
    }).then(response => response.json())
      .then(data => setData(data))
  }, [])

  return (
    <>
      <h1>test get</h1>
      {datas?.map(data => {
        return <div key={data.id}>{data.id} {data.title}</div>
      })}
    </>
  )
}

export default TestGet