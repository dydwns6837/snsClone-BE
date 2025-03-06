import styles from "./Button.module.css"

function Button({ type = "button", text, handler, disabled }) {
  return (
    <button className={styles.buttons} type={type} onClick={handler} disabled={disabled}>{text}</button>
  )
}

export default Button