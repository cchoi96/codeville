import React, { useState, useEffect } from "react";
import ProjectList from "./ProjectList";
import Farm from "./Farm";
import Footer from "../components/Footer";
import styled from "styled-components";
import axios from "axios";

const Home = () => {
  const [projectList, setProjectList] = useState([]);
  const [id, setId] = useState(0);
  useEffect(() => {
    axios
      .post("http://0.0.0.0:8080/projects", {
        github_id: "github_gary"
      })
      .then(res => {
        console.log("Selected user projects.........", res.data);
        console.log(JSON.stringify(res.data) !== JSON.stringify(projectList));
        if (JSON.stringify(res.data) !== JSON.stringify(projectList)) {
          setId(id + 1);
          setProjectList(res.data);
        }
      });
  }, [id]);

  return (
    <div>
      <StyledProjectList array={projectList} />
      <Footer />
    </div>
  );
};

const StyledProjectList = styled(ProjectList)`
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;

  @media (min-width: 480px) {
    flex-direction: column;
  }
`;

export default Home;
