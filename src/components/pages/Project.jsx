import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import styles from "./styles/Project.module.css";

export function Project() {

  const { id } = useParams();
  console.log(id);

  const [project, setProject] = useState([]);

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


  return (
    <p>Projeto: {project.name}</p>
  );
}