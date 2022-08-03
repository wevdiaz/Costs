import styles from "./SubmitButton.module.css";

export function SubmitButton({text}) {
  return (
    <div>
      <button className={styles.btn}>{text}</button>
    </div>
  );
}