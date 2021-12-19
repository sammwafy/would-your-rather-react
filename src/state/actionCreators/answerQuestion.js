import { _saveQuestionAnswer } from "../../_DATA";

export const answerQuestions = ({authedUser,qid,answer}) => {
  return (dispatch) => {
    _saveQuestionAnswer({authedUser,qid,answer}).then(
      (results) => 
      
      dispatch({
        type: "answer_question",
        qid,authedUser,answer
      })
    );


  };
};

export const addAnswerToUser = ({authedUser,qid,answer}) => {
  return (dispatch) => {
     _saveQuestionAnswer({authedUser,qid,answer}).then(
      (results) => 
      
      dispatch({
        type: "add_Answer_ToUser",
        qid,authedUser,answer
      })
    );


  };
};
