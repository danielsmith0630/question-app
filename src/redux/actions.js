import types from './types';
import _ from 'lodash';

export const setQuestions = params => {
  return {
    type: types.SET_QUESTIONS,
    payload: params
  }
};

export const setQuestionIndex = params => {
  return {
    type: types.SET_QUESTION_INDEX,
    payload: params
  }
};

export const setCorrectNum = params => {
  return {
    type: types.SET_CORRECT_NUM,
    payload: params
  }
};