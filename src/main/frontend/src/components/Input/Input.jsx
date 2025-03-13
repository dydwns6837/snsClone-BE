import styles from "./Input.module.css"

const Input = ({ type = "text", name, placeholder, handler, value }) => {
  return (
    <input className={styles.input} name = {name} type={type} placeholder = {placeholder} value={value} onChange = {handler}/>
  )
}

export default Input