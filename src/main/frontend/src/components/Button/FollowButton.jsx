import { useState } from "react";
import Button from "./Button";

const FollowButton = ({ isFollwee, userID }) => {
  const [isFollow, setIsFollow] = useState(isFollwee)
  const [isLoading, setIsLoading] = useState(false)
  
  const toggleFollow = async () => {

    setIsLoading(true)

    const sleep = await new Promise((res, rej) => {
      setTimeout(() => {
        res()
      }, 3000)
    })

    try {
      const response = await fetch(`http://localhost:8080/api/users/${userID}/follow`, {
        method : isFollow ? "DELETE" : "POST",
        headers : {
          Authorization : `Bearer ${localStorage.getItem("access_token")}`
        }
      })
      
      if(!response.ok) {
        const {message} = await response.json() // json에러메시지에만 유효!! 여기서 잘못하면 catch로 넘어감
        alert(message)
        return
      }

      setIsFollow(prev => !prev)
    } catch(err) {
      console.error(err);
      alert("팔로우/팔로잉 실패!")
    } finally {
      setIsLoading(false) //실패하던 성공하던 원래 버튼으로 돌아와야함
    }
  }

  return (
    <Button text = {isLoading ? "----" : isFollow ? "팔로잉" : "팔로우"} style={isFollow ? "default" : "blue"} handler={toggleFollow} disabled={isLoading}></Button>
    // isFollow값을 기준으로 1) true 면 unfollow핸들러, 2)false면 follow핸들러를 전달?? 
    // 알필요가없지않음? 애초에 isFollow값은 UI표시를 위한거 아니었나
    // 그냥 서버에 userID를 보내면 토큰으로 누군지 확인하고, 토큰주인 > userID 의 팔로우관계를 만들어준다.
    // isFollow를 넣어보내주면 도움이 되나??
  )
}
export default FollowButton