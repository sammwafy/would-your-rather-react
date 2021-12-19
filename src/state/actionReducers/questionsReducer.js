export const questionsReducer = (state = {}, action) => {
  switch (action.type) {
    case "set_questions":
      return { ...state, ...action.questions };

    case "answer_question":
      return {
        ...state,
        [action.qid]: {
          ...state[action.qid],
          [action.answer]: {
            ...state[action.qid][action.answer],
            votes: state[action.qid][action.answer].votes.concat([
              action.authedUser,
            ]),
          },
        },
      };

    case "create_question":
      return {
        ...state,

        [action.question.id]: action.question,
      };
    default:
      return state;
  }
};
