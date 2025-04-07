import Posts from "./Posts";
import style from "./UserPosts.module.css"
function UserPosts( { datas } ) {
  // console.log('userpost render!');
  console.log(datas);
  // console.log(posts);
  return(
    <div className={style.grid} >
      {datas?.length ? datas.map(data => {
        // // (바둑판에 썸네일만 표시)
        return <Posts key={data.postID} data = {data}/> // postID와 userID를 context로 넘겨줄수있으면 좋은가?
      }) : <h1>no articles</h1>}
    </div>
  )
}

export default UserPosts