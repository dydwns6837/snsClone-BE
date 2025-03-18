import { useState, useEffect } from "react";
import style from './List.module.css'
import ListItem from './ListItem.jsx'
import Skeleton from "../Skeleton/Skeleton.jsx";
import FollowListSkeleton from "../Skeleton/FollowListSkeleton.jsx";

const arr = new Array(100).fill(null).map((_, idx) => {
  return idx + 1
})

const arr2 = [
  {
    name : "사람1",
  },
  {
    name : "사람2",
  },
  {
    name : "김씨3",
  },
  {
    name : "사람4",
  },
  {
    name : "김씨5",
  },
  {
    name : "사람6",
  }, 
  {
    name : "사람7",
  },
  {
    name : "김씨8",
  },
  {
    name : "사람9",
  },
  {
    name : "사람10",
  },
  {
    name : "사람11",
  },
  {
    name : "이씨12",
  },
  {
    name : "김씨13",
  },
  {
    name : "사람14",
  }, 
  {
    name : "이씨15",
  },
  {
    name : "사람16",
  }
]
// console.log(arr);

const List2 = ({ handler }) => {
  console.log('랜더링!!');
  const [data, setData] = useState(null) //최초의 List
  const [isLoading, setIsLoading] = useState(true)
  const [keyWord, setKeyWord] = useState("")
  // console.log(filteredData);
  // console.log(`랜더링 위치에서 ${data?.length} ${isLoading} ${keyWord} state`);

  const fetchData = async () => {
    await new Promise((res, rej) => {
      setTimeout(() => {
        res()
      }, 1000);
    })

    setData(arr2)
    setIsLoading(false)
    // console.log(`fetchData 위치에서 ${data?.length} ${isLoading} ${keyWord} state`);
  }
  
  const filteredFollowers = data?.filter(follower => {
    return follower.name.includes(keyWord)
  })
  console.log(filteredFollowers);

  useEffect(() => {
    console.log('effect!');
    setIsLoading(true) //얘 굳이 필요한가?>?
    fetchData()
  }, []) // 얘는 최초 마운트 시에 데이터를 한번 불러오기위한 effect

  const changeHandler = e => {
    console.log(e.target.value);
    const newkeyWord = e.target.value
    setKeyWord(newkeyWord)
    console.log(`changeHandler 위치에서 ${data.length} ${isLoading} ${keyWord} state`);
  }

  return (
    <div className={style.modal}>
      <div className={style.head}>
        <span className={style.text}>팔로워</span>
        <button className={style.closeButton}>X</button>
      </div>
      <input className={style.searchBar} placeholder="검색" onChange={changeHandler}></input>

      <div className={style.list}>
      {isLoading ? (
        <>
          <FollowListSkeleton/>
          <FollowListSkeleton/>
          <FollowListSkeleton/>
          <FollowListSkeleton/>
          <FollowListSkeleton/>
        </>
      ) : 
      filteredFollowers.length ? (
        filteredFollowers.map((el, idx) => {
          // return <div>{el.name}</div>
          return <ListItem member = {el} key={idx}/>
        })
      ):(
        <span className={style.alert}>찾으시는 사용자가 없어요</span> //빈배열이도 truthy 라서 이건 실행안됌 ㅋㅋㅋ
      )}

      </div>
    </div>
  ) 
}
export default List2