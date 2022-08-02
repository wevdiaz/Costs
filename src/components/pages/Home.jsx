import styles from "./styles/Home.module.css";
import savings from "../../imgs/savings.svg";
import { LinkButton } from "../layout/LinkButton";

export function Home() {
  return (
   <section className={styles.home_container}>
    <h1>
      Bem-vindo ao <span>Costs</span>
    </h1>
    <p>Comece a gerenciar os seus próprios projetos agora mesmo.</p>
    <LinkButton to="/newproject" text="Criar Projeto" />
    <img src={savings} alt="Costs" />
   </section>
  );
}