import types from '../types';

const initState = {
  questions: [],
  questionIndex: -1,
  correctNum: 0
};

export const reducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.SET_QUESTIONS: {
      return {
        ...state,
        questions: payload
      };
    }
    case types.SET_QUESTION_INDEX: {
      return {
        ...state,
        questionIndex: payload
      };
    }
    case types.SET_CORRECT_NUM: {
      return {
        ...state,
        correctNum: payload
      };
    }
    default: {
      return state;
    }
  }
};