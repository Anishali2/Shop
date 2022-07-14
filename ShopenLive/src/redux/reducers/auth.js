import * as types from '../actions/types';
import {AUTH_PENDING, AUTH_ERROR} from '../actions/auth';

const initialState = {
  call: true,
  loggedIn: false,
  type: '',
  image: '',
  phone: '',
  country: '',
  address: '',
  email: '',
  last: '',
  first: '',
  uid: '',
  createPostImages: [],
  password: '',
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        type: action.payload.type,
        image: action.payload.profile_picture,
        phone: action.payload.phone,
        country: action.payload.country,
        address: action.payload.address,
        email: action.payload.email,
        last: action.payload.last_name,
        first: action.payload.first_name,
        uid: action.payload.uid,
        password: action.payload.password,
      };
    case types.UPDATE_PROFILE:
      return {
        ...state,
        image: action.payload.image,
        phone: action.payload.phone,
        country: action.payload.country,
        address: action.payload.address,
        code: action.payload.code === null ? '' : action.payload.code,
        last: action.payload.last,
        first: action.payload.first,
        id: action.payload.id,
      };
    case types.EDIT_IMAGE:
      return {
        ...state,
        createPostImages: action.payload,
      };
    case types.LOGOUT:
      return {
        ...state,
        call: true,
        loggedIn: false,
        type: '',
        image: '',
        phone: '',
        country: '',
        address: '',
        email: '',
        last: '',
        first: '',
        uid: '',
        password: '',
      };
    case types.CALL_API:
      return {
        ...state,
        call: action.payload,
      };
    case types.STOP_API:
      return {
        ...state,
        call: '',
      };
    default:
      return state;
  }
};
