import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router";
import { AnswerQuestion } from "./newAnswer";
import { QuestionResults } from "./questionResults";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
export const SingleQuestion = () => {
  const questions_list = useSelector((state) => state.questions);
  const location = useLocation();
  const authUser = useSelector((state) => state.authUser);
  const [ShowResults, setShowResults] = useState(false)
  const param = useParams();
const navigate= useNavigate();
  const questionID = param.question_id;
  let question = Object.values(questions_list).filter(
    (q) => q.id === questionID
  )[0];

// set the dependency of useEffect on [location]
// as the state changes after answer is submitted
// then we show the results by setting value true to
// the boolean ShowResults

// if question has been answered already
let alreadyAnswered = "";
if(location.state !== null) {
  alreadyAnswered= location.state.state
}
if (location.state === null){
  navigate('/notfound')
}
useEffect(() => {
  if(location.state !== null &&  'showResults' in location.state){

    setShowResults(true)
  }

  // if user access question directly then navigate to 404 error page
  else if(location.state === null){
    navigate('/notfound')
  }
 
}, [location])

// show the results whether the user didn't answer before
// or after user submit an answer
  return (question &&
  
  (question.id in authUser[0].answers || ShowResults || alreadyAnswered === undefined) ? (
    <QuestionResults />
  ) : (
    <AnswerQuestion question={question} />
  )
  )
};
