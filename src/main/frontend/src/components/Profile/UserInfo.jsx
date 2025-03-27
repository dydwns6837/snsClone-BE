import { useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';

import style from './UserInfo.module.css'
import Button from "../Button/Button";
import FollowButton from "../Button/FollowButton"

import ShowList from '../List/ShowList';

/* value = {{curUserID(App), userID(urlparams), getProfileInfos}} */

/* 
  datas = {
		  isYou, // 로그인한 본인인지
	    isFollowee, // 해당 userID를 팔로우하는지
	    postNums, // 게시글수
	    followers, // 팔로워수
	    followees, // 팔로잉수
	    article : "안녕 하세요 인사말이에요" 
    }
*/
const UserInfo = ({ datas }) => { // 얘 자식 컴포넌트에, 팔로우/팔로잉 목록조회, 언팔로우(로그인한 사용자계정이라면)
  // console.log('userinfo render!');
  // console.log('userinfo랜더링!');
  const {isYou, isFollowee, postNums, followers, followees, article} = datas

  console.log(useContext(UserContext));
  const parentContext = useContext(UserContext)
  const {userID} = useContext(UserContext)
  console.log('profilePage의', userID, '여긴 UserInfo');
  return(
    <div className={style["flex-container"]}>
      <div className={style["image-wrapper"]}>
        <div className={style.image}></div>
      </div>
      <div className={style["lines-wrapper"]}>
        <div className={style.buttons}>
          <span className={style.userID}>{userID}</span>
          {isYou ? <Button text="프로필편집"/> : <FollowButton isFollwee={isFollowee} userID = {userID}/>}
        </div>
        <UserContext.Provider value={{...parentContext, isYou}}>
          <div className={style.nums}>
          <div className={style.group}>
            <span className={style.tag}>게시물</span>
            <span className={style.num}>{postNums}</span>
          </div>
          <div className={`${style.group} ${style.list}`}>
            {/* <span className={style.tag}>팔로워</span> */}
            <ShowList text = "팔로워" nums = {followers}/>
            {/* <span className={style.num}>{followers}</span> */}
          </div>
          <div className={`${style.group} ${style.list}`}>
            {/* <span className={style.tag}>팔로우</span> */}
            <ShowList text = "팔로우" nums = {followees}/>
            {/* <span className={style.num}>{followees}</span> */}
          </div>
          </div>
        </UserContext.Provider>
        <div className={style.introduction}>{article}</div>
      </div>
    </div>
  )
}

export default UserInfo