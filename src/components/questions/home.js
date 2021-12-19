import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Tab } from "semantic-ui-react";

import { QuestionCard } from "./questionCard";
// import usePromise from 'react-promise';

// questions.map(question => {
//     console.log(question);
// })
// note that it won't return anything because it is empty at first as the promise is not resolved yet

export const AllQuestions = () => {

  const questions = useSelector((state) => state.questions);
  const state = useSelector((state) => state);
  const users = useSelector((state) => state.allUsers);
  
  const [answer, setAnswer] = useState({});
  const authUser = useSelector((state) => state.authUser);


  // here we get the current user data from All user state
  // because when we add new question and save the answer we did it in all user state and not directly to authUser state
  // ( we do this to follow the database function syntax i.e _saveQuestionAnswer & _saveQuestion)

  const currentUser = Object.values(users).filter((user) => (
    (user.id === authUser[0].id) && user
  ));


  // semantic panes in two groups   : answered  : unAnswered
  // steps to get latest questions first
  // 1- filter (based on whether the user has answered it or not)
  // 2- sort (based on timestamp)
  // 3- map (to render the questions via QuestionCard component)
  
  const panes = [
    Object.values(questions).length > 0 &&

       {
          menuItem: "Unswered Questions",
          render: () =>
          Object.values(questions).filter(q => !(q.id in currentUser[0].answers)).sort((a, b) => b.timestamp - a.timestamp).map(
              (question) => {
           return <QuestionCard key={question.id} question={question} unanswered={true} />
                 }
            ),
        },
       {
          menuItem: "Answered Questions",
          render: () =>
          Object.values(questions).filter(q => q.id in currentUser[0].answers).sort((a, b) => b.timestamp - a.timestamp).map(
              (question) => {
           return <QuestionCard key={question.id} question={question} />
                 }
            ),
        },


  ];



  return (
    <div className="wrapper">
      <Tab panes={panes} className="Qtabs" />
    </div>
  );
};
