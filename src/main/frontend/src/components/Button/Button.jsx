import styles from "./Button.module.css"

const Button = ({ type = "button", style = "default", text, handler, disabled }) => {
  return (
    <button className={`${styles.button} ${styles[style]}`} type={type} onClick={handler} disabled={disabled}>{text}</button>
  )
}

export default Button