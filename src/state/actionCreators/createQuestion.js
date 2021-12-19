import { _saveQuestion } from "../../_DATA";

export const createQuestion = (newQuestion) => {
  return async (dispatch) => {
    await _saveQuestion(newQuestion).then((question) => {
      dispatch({
        type: "create_question",
        question,
      });
      dispatch({
        type: "add_question_toUser",
        question,
      });
    });
  };
};
