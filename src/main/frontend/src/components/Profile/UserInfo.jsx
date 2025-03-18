import style from './UserInfo.module.css'
import Button from "../Button/Button";
import FollowButton from "../Button/FollowButton"

import ShowList from '../List/ShowList';
import { useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';


const UserInfo = ({ datas }) => {
  // console.log('userinfo render!');
  useEffect(() => {
    return () => {
      // console.log('userInfo 언마운트');
    }
  }, [])
  // console.log('userinfo랜더링!');
  const {isYou, isFollowee, postNums, followers, followees, article} = datas.data

  const {userID} = useContext(UserContext)
  // console.log('profilePage의', userID, '여긴 UserInfo');
  const showFollowers = () => {
    // console.log('list');
  }
  return(
    <div className={style["flex-container"]}>
      {/* <FollowButton/> */}
      <div className={style["image-wrapper"]}>
        <div className={style.image}></div>
      </div>
      <div className={style["lines-wrapper"]}>
        <div className={style.buttons}>
          <span className={style.userID}>{userID}</span>
          {isYou ? <Button text="프로필편집"/> : <FollowButton isFollwee={isFollowee} userID = {userID}/>}
        </div>
        <div className={style.nums}>
          <div className={style.group}>
            <span className={style.tag}>게시물</span>
            <span className={style.num}>{postNums}</span>
          </div>
          <div className={`${style.group} ${style.list}`}>
            {/* <span className={style.tag}>팔로워</span> */}
            <ShowList text = "팔로워"/>
            <span className={style.num}>{followers}</span>
          </div>
          <div className={`${style.group} ${style.list}`}>
            {/* <span className={style.tag}>팔로우</span> */}
            <ShowList text = "팔로우"/>
            <span className={style.num}>{followees}</span>
          </div>
        </div>
        <div className={style.introduction}>{article}</div>
      </div>
    </div>
  )
}

export default UserInfo