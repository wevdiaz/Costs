import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { Loading } from "../layout/Loading";
import { Container } from "../layout/Container";

import styles from "./styles/Project.module.css";

export function Project() {

  const { id } = useParams();

  const [project, setProject] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);

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

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }


  return (
    <>
      {
        project.name ? ( 
            <div className={styles.project_details}>
              <Container customClass="column">
                <div className={styles.details_container}>
                  <h1>Projeto: {project.name}</h1>
                  <button className={styles.btn} onClick={toggleProjectForm}>
                    { !showProjectForm ? "fechar" : "Editar projeto" }
                  </button>
                  {
                    showProjectForm ? (
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
                       <p>Formulário</p>
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