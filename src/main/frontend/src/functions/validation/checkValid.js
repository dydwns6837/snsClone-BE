import Posts from "../../components/Profile/UserPosts";

function isEmailValid(email) {
  // 올바른 형식일때 true반환 나머지는 메세지 반환
  if (email.length === 0) {
    return "이메일 주소를 입력해주세요"
  }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? true : "이메일 형식이 올바르지 않아요"
}

function isPhoneNumberValid(phoneNumber) {
  // 올바른 형식일때 true반환 나머지는 메세지 반환
  if (phoneNumber.length === 0) {
    return "전화번호를 입력해주세요"
  }
  const phoneRegex = /^(?:\+82|0)(\d{1,2})-?\d{3,4}-?\d{4}$/;
  return phoneRegex.test(phoneNumber) ? true : "전화번호 형식이 올바르지 않아요"

}

function isPasswordValid(password) {
  // 올바른 형식일때 true반환 나머지는 메세지 반환
  return (password.length >= 6) ? true : "비밀번호는 6자리 이상이에요"
}

function isNameValid(name) {
  // 올바른 형식일때 true반환 나머지는 메세지 반환
  return (name.length >= 2) ? true : "이름은 2자리이상이에요"
}

function isNickNameValid(nickName) {
  // 올바른 형식일때 true반환 나머지는 메세지 반환
  return (nickName.length >= 2) ? true : "닉네임은 2자리이상이에요"
}


// 닉네임이 중복되는지 확인
// async function isNickNameValid(nickName) {
//   // 올바른 형식일때 true반환 나머지는 메세지 반환
//   if (nickName.length === 0) {
//     return "사용자 이름을 입력해주세요"
//   }
//   // console.log(nickName);
//   // 중복일경우에 에러메세지(네트워크오류, 409오류) 반환, 정상일경우에 true반환해야함
//   /*
//   fetch 고려사항
//   1. 네트워크오류
//   2. response.ok값에 따른 분기 response.json() 오류발생가능성
//   */
//   try {
//     const response = await fetch("http://localhost:4000/api/users/dup-nick", {
//       method : "POST",
//       headers : {
//         'Content-Type' : 'application/json'
//       },
//       body : JSON.stringify({
//         nickName
//       })
//     })

//     const {success, message} = await response.json() //여기서 오류가 날순없을듯 실패응답도 json형태라서
//     return success ? true : message
//     // 현재는 409 일때도 json형식이라서 위두줄해도 무방할듯
//   } catch(err) { // fetch 네트워크 오류 처리필요 (필요하다면 response.json으로 인한 오류)
//     return "알수없는 오류 발생"
//     // return "네트워크 에러 발생"
//   }
// }

function isValuesValid({ phoneNumber, email, password, name, nickName }) {
  // 4개의 입력값이 유효한지 확인
  const validations = {
    phoneNumber : isPhoneNumberValid(phoneNumber),
    email : isEmailValid(email),
    password : isPasswordValid(password),
    name : isNameValid(name),
    nickName : isNickNameValid(nickName) // 프로미스 채로 Signup의 message로 넘어가도 메세지가 찍히는??
  }
  // console.log(validations);
  const map = Object.entries(validations).find(([_, value]) => {
    return value != true
  })
  // console.log(map);
  return map ? map[1] : true // 모두 만족하면 true, 만족하지않는다면 받았던 메세지 전달
}

export { isValuesValid }