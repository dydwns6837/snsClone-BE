import style from './OverLay.module.css'
import List from '../List/List.jsx'

const FollowListModal = ({ handler, toFind }) => {
  // const {userID, getProfileInfos} = useContext(UserContext) // 얘는 로그인한 사용자꺼라 무조건 내프로필로 가게됌 현재 url의 userId params를 봐야함

  return (
    <div className={style["modal-overlay"]} onClick={e => {
      if(e.target == e.currentTarget) handler()
    }}>
      <List handler = {handler} toFind = {toFind}/>
    </div>
  )
}
export default FollowListModal