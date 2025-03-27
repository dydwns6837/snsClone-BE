import { createContext } from "react";

// Context 생성
export const UserContext = createContext(null);

// Context를 쉽게 사용할 수 있는 커스텀 훅
// export const useUser = () => useContext(UserContext);

// Provider 컴포넌트
// export const UserProvider = ({ userID, children }) => {
//   return (
//     <UserContext.Provider value={userID}>
//       {children}
//     </UserContext.Provider>
//   )
// };

