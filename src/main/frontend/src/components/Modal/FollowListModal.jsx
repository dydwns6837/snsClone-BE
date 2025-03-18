import { useEffect, useContext } from 'react'
import style from './OverLay.module.css'
import List from '../List/List.jsx'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext.js'
import { useParams } from 'react-router-dom'

const FollowListModal = ({ handler, toFind }) => {
  const navigate = useNavigate()
  const {userID, getProfileInfos} = useContext(UserContext) // 얘는 로그인한 사용자꺼라 무조건 내프로필로 가게됌 현재 url의 userId params를 봐야함
  // console.log(userID);
  useEffect(() => {
    // console.log('followlist modal mount');
    return () => {
      // console.log('followlist modal unmount');
      // navigate(`/${userID}`) // 이렇게 되면 모든 팔로워 모달을 닫으면 내프로필로 이동하게된다...
      // 근데 이건 내프로필리스트 모달, 제3자 프로필리스트 모달 닫힐때 실행되는거라서, 제3자꺼 닫을때라면 아무일도 일어나지않아야함(애초에 삭제버튼부터없음)
      // getProfileInfos() // 이거 근데 삭ㅈ제안하고 닫아도 패치가 다시됌
    }
  }, [])
  return (
    <div className={style["modal-overlay"]} onClick={e => {
      // console.log('overlay에서 click트리거됨');
      // console.log(e.target, e.currentTarget);
      if(e.target == e.currentTarget) handler()
    }}>
      <List handler = {handler} toFind = {toFind}/>
    </div>
  )
}
export default FollowListModal