
import styles from "./Loading.module.css";

import loading from "../../imgs/loading.svg";

export function Loading() {
  return (
    <div className={styles.loader_container}>
      <img className={styles.loader} src={loading} alt="imagem de carregamento" />
    </div>
  );
}