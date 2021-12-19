import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router";
import { AnswerQuestion } from "./newAnswer";
import { QuestionResults } from "./questionResults";
import { useParams } from "react-router-dom";

export const SingleQuestion = () => {
  const questions_list = useSelector((state) => state.questions);
  const authUser = useSelector((state) => state.authUser[0]);
  const [ShowResults, setShowResults] = useState(false);
  const param = useParams();
  const questionID = param.question_id;
  const question = questions_list[questionID];
  const location = useLocation();

  // check if the question has been answered
  let alreadyAnswered = "";
  if (location.state !== null) {
    alreadyAnswered = location.state.state;
  }
  if (location.state === null) {
    <Navigate to="/notfound" />;
  }

  // if the user redirect back after he submit an answer then show the results
  useEffect(() => {
    if (location.state !== null && "showResults" in location.state) {
      setShowResults(true);
    }
  }, [location]);

  if (!question) return <Navigate to="/notfound" />;

  return question.id in authUser.answers ||
    ShowResults ||
    alreadyAnswered === undefined ? (
    <QuestionResults />
  ) : (
    <AnswerQuestion question={question} />
  );
};
