import React, { useState, useEffect } from "react";
import HabitList from "./HabitList";
import HabitListItem from "./HabitListItem";
import HabitModal from "./HabitModal";
import axios from "axios";
import styled from "styled-components";

const Habit = ({ github_id, habit_name, updateHabits }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [specificHabits, setSpecificHabits] = useState([]);

  useEffect(() => {
    axios.get(`http://0.0.0.0:8080/${github_id}/${habit_name}`).then(res => {
      console.log("inside the health habit, get request",res.data)
      setSpecificHabits(res.data);
    });
  }, []);

  // Function to be passed down that refreshes specific habit state
  const refreshSpecificHabits = (github_id, habit_name) => {
    axios.get(`http://0.0.0.0:8080/${github_id}/${habit_name}`).then(res => {
      setSpecificHabits(res.data);
    });
  };

  return (
    <StyledHabitCategory>
      <h1>{habit_name}</h1>
      <p>This is the {habit_name} component. Welcome!</p>
      <StyledHabitList specificHabits={specificHabits} />
      <img src="/assets/other/plus.png" onClick={() => setIsOpen(true)}></img>
      {isOpen && (
        <HabitModal
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          github_id={github_id}
          habit_name={habit_name}
          refreshSpecificHabits={refreshSpecificHabits}
          updateHabits={updateHabits}
        />
      )}
    </StyledHabitCategory>
  );
};

export default Habit;

const StyledHabitCategory = styled.div`
  width: 100%;
  font-family: "Roboto", sans-serif;
`;

const StyledHabitList = styled(HabitList)`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  border: 2px solid red;
`;
