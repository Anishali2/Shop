import * as types from '../actions/types';

const initialState = {
  screenFocused: 'HomeStack',
  conversations: [],
  notifications: [],
};

export const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ACTIVE_SCREEN: {
      return {
        ...state,
        screenFocused: action.payload,
      };
    }
    case types.SAVE_MESSAGES: {
      return {
        ...state,
        conversations: action.payload,
      };
    }
    case types.SAVE_NOTIFICATION: {
      return {
        ...state,
        notifications: action.payload,
      };
    }
    case types.LOGOUT: {
      return {
        ...state,
        conversations: [],
      };
    }
    default:
      return state;
  }
};
