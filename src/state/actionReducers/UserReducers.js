 export function allUsersReducer (state ={} , action)  {
  switch (action.type) {
    case "SET_USERS":
      return {...state,...action.users}
      
      case "add_question_toUser":
        return {
          ...state,
        [action.question.author]: {
          ...state[action.question.author],
          questions: state[action.question.author].questions.concat([action.question.id]),
        }
        }

      case "add_Answer_ToUser":
        return {...state,
          [action.authedUser]: {
            ...state[action.authedUser],
            answers: {
              ...state[action.authedUser].answers,
              [action.qid]: action.answer,
            },
          },
        
        }
    default:
      return state
  }
};

 export function authUserReducer (state = [] , action)  {
  switch (action.type) {
    case "USER_LOGOUT":
      return state
    
    case "SET_authUSER":
      return [...state,...action.authUser]

    default:
      return state
  }
};


