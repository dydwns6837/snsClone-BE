import { useState } from "react";
import styles from "./Test.module.css"
function Test() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.button} onClick={e => {
      e.preventDefault()
      setIsOpen(prev => !prev)
    }}>
      ...
      <div className={`${styles.list} ${isOpen ? styles.show : ""}`}>
        <ul>
          <li onClick={() => console.log('수정!')}>수정하기</li>
          <li>삭제하기</li>
        </ul>
      </div>
    </div>
  );
}

export default Test