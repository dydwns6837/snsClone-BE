import { useState, useEffect } from "react";

function ViewArticle() {

}

export default ViewArticle
/*
app.get("/api/profile", authenticateToken, async (req, res) => {
  const user = await User.findById(req.user.userId).populate("followers");

  res.json({
    name: user.name,
    followers: user.followers.map(f => ({ id: f.id, name: f.name })),
  });
});
*/

// 궁금한점 
/*
만약 한개의 기기에서 다른 두사람이 로그인을 했다치면 localStorage방식은 음 같은 서버에 대해서
다른두개의 토큰을 못주지않나? 줘서 받는다고 치면 이후의 api요청에 클라이언트는 어떤토큰을 골라 실을지 
매번 정해줘야하는건가??

1. client credential : include > 쿠키를 포함한 요청 허용
2. server
res.cookie('accessToken', accessToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production', // HTTPS 환경에서만 쿠키 전송
  sameSite: 'Strict', // CSRF 보호
  maxAge: 60 * 60 * 1000, // 1시간 후 만료
  path: '/'
});
3. 
*/