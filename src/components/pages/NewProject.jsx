import { ProjectForm } from "../project/ProjectForm";
import styles from "./styles/NewProject.module.css"

export function NewProject() {
  return (
    <div className={styles.newproject_container}>
      <h1>Criar Projeto</h1>
      <p>Crie o seu projeto para depois adicionar os serviços</p>
      <ProjectForm btnText={"Criar Projeto"} />
    </div>
  );
}