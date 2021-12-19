import { _getQuestions } from "../../_DATA";

export const getQuestions = () => {
  return async (dispatch) => {
   
    await  _getQuestions().then((questions) => {
   

         dispatch({
          type: "set_questions",
          questions,
        });
    });
  }
};
