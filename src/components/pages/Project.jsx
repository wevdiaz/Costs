import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { Loading } from "../layout/Loading";
import { Container } from "../layout/Container";
import { ProjectForm } from "../project/ProjectForm";
import { Message } from "../layout/Message";

import styles from "./styles/Project.module.css";

export function Project() {

  const { id } = useParams();

  const [project, setProject] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [message, setMessage] = useState();
  const [type, setType] = useState();

  useEffect(() => {

    fetch(`http://localhost:5000/projects/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.json())
    .then((data) => {
      setProject(data);
    })
    .catch((err) => console.log(err));

  }, [id]);

  function editPost(project) {

    if (project.budget < project.cost) {
      setMessage("O orçamento não pode ser menor que o custo do projeto");
      setType("error");
      return false;
    }

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
    .then((response) => response.json())
    .then((data) => {
      setProject(data);
      setShowProjectForm(false);
      setMessage("Projeto atualizado com sucesso");
      setType("success");
    })
    .catch((err) => { console.log(err)})
  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }


  return (
    <>
      {
        project.name ? ( 
            <div className={styles.project_details}>
              <Container customClass="column">
                { message && <Message msg={message} type={type} />}
                <div className={styles.details_container}>
                  <h1>Projeto: {project.name}</h1>
                  <button className={styles.btn} onClick={toggleProjectForm}>
                    { !showProjectForm ? "Editar projeto" : "fechar" }
                  </button>
                  {
                    !showProjectForm ? (
                     <div className={styles.project_info}>
                      <p>
                        <span>Categoria:</span> {project.category.name}
                      </p>
                      <p>
                        <span>Total de Orçamento:</span> {project.budget}
                      </p>
                      <p>
                        <span>Total utilizado:</span> {project.cost}
                      </p>
                     </div>
                    ) : (
                     <div className={styles.project_info}>
                       <ProjectForm
                          handleSubmit={editPost}
                          btnText="Concluir Edição"
                          projectData={project}
                       />
                     </div>
                    )
                  }
                </div>
              </Container>
            </div>
         ) : ( <Loading /> )
      }
    </>
  );
}