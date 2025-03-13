import { useState, useEffect } from "react";
import Skeleton from "../Skeleton/Skeleton";
import LoadingPage from "../../pages/LoadingPage";
import FollowButton from "../Button/FollowButton";
// import Button from "../Button/Button";

const follow = () => {
  // 실제로는 서버에 팔로우 요청을하는 코드
  return new Promise((res, rej) => {
    setTimeout(() => {
      res()
    }, 2000)
  })
}

const Button = () => {
  /*
   * isFollow = false(state)
   * 클릭시, 서버에 팔로우 요청
   * 성공시 toggleFollow 호출
   * 리랜더링
   */
  const [isFollow, setFollow] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const toggleFollow = async () => {
    setIsLoading(prev => !prev)
    // setIsLoading(!isLoading)
    const response = await follow()
    // setFollow(!isFollow)
    setFollow(prev => !prev)
    // setIsLoading(!isLoading)
    setIsLoading(prev => !prev)
  }
  return (
    // 버튼은 한개고, isFollow값에 따라 스타일이 다르게 랜더링
    // 버튼 클릭시 로딩중, isFollow값 토글, 로딩완료 근데 setIsLoading만 따로 적용된느낌인데??
    // rerender >> 바뀐스타일
    <button onClick = {toggleFollow} 
      style={ isFollow ? {
        color : "black",
        backgroundColor : "white",
        border : "1px solid black",
        borderRadius : "5px",
        cursor : "pointer"
      } : {
        color : "white",
        backgroundColor : "blue",
        border : "1px solid black",
        borderRadius : "5px",
        cursor : "pointer"
      }
    }>{ isLoading ? "..." : isFollow ? "팔로잉" : "팔로우" }</button>
  )
}


function Test() {
  
  return (
    <>
      <Button/>
      <FollowButton isFollwee={true}/>
      <FollowButton isFollwee={false}/>
    </>
  )
}

export default Test