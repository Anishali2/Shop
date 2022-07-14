import * as types from './types';
import axios from 'axios';

export const userRegistration = (formdata, onSuccess, onError, role) => {
  return async dispatch => {
    try {
      console.log('i reached here...');
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      fetch(
        `${types.BASEURL}/${
          role === 1 ? 'register_buyer' : 'register_seller'
        }.php`,
        requestOptions,
      )
        .then(response => response.json())
        .then(result => {
          console.log(result);
          if (result.state === 'OK') {
            onSuccess(result);
            // console.log('Everyting was OK...');
          } else {
            onError(result);
          }
        })
        .catch(error => {
          onError(error);
        });
    } catch (err) {
      // console.log('i error');
      // console.log(err);
      onError(err);
    }
  };
};

export const sendOTP = (formdata, onSuccessEmailSent, onErrorEmailSent) => {
  return async dispatch => {
    try {
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      fetch(`${types.BASEURL}/send_verification_code.php`, requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result.state === 'OK') {
            onSuccessEmailSent(result);
          } else {
            onErrorEmailSent(result);
          }
        })
        .catch(error => {
          onErrorEmailSent(error);
        });
    } catch (err) {
      // console.log('i error');
      // console.log(err);
      onErrorEmailSent(err);
    }
  };
};

export const verifyOTP = (formdata, onSuccessVerify, onErrorVerify) => {
  return async dispatch => {
    try {
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      fetch(
        `${types.BASEURL}/verify_email_verification_code.php`,
        requestOptions,
      )
        .then(response => response.json())
        .then(result => {
          if (result.state === 'OK') {
            onSuccessVerify(result);
          } else {
            onErrorVerify(result);
          }
        })
        .catch(error => {
          onErrorVerify(error);
        });
    } catch (err) {
      // console.log('i error');
      // console.log(err);
      onErrorVerify(err);
    }
  };
};

export const userLogin = (formdata, onSuccess, onError, role) => {
  return async dispatch => {
    try {
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      fetch(
        `${types.BASEURL}/${role === 1 ? 'login_buyer' : 'login_seller'}.php`,
        requestOptions,
      )
        .then(response => response.json())

        .then(result => {
          if (result.state === 'OK') {
            if (role === 1) {
              result.data.buyer.type = role;
              console.log(result.data.buyer);
              dispatch(loginSuccess(result.data.buyer));
              onSuccess(result.data.buyer);
            } else {
              result.data.meta.type = role;
              console.log(result.data.meta);
              dispatch(loginSuccess(result.data.meta));
              onSuccess(result.data.meta);
            }
          } else {
            console.log(result);
            onError(result);
          }
        })
        .catch(error => {
          onError(error);
        });
    } catch (err) {
      // console.log('i error');
      // console.log(err);
      onError(err);
    }
  };
};

export const updateProfile = (
  formdata,
  onSuccessUpdate,
  onErrorUpdate,
  type,
) => {
  return async dispatch => {
    try {
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      fetch(
        `${types.BASEURL}/${
          type === 1 ? 'update_buyer_details' : 'update_seller_details'
        }.php`,
        requestOptions,
      )
        .then(response => response.json())
        .then(result => {
          if (result.state === 'OK') {
            onSuccessUpdate();
          } else {
            onErrorUpdate(result);
          }
        })
        .catch(error => {
          onErrorUpdate(error);
        });
    } catch (err) {
      // console.log('i error');
      // console.log(err);
      onErrorUpdate(err);
    }
  };
};

const loginSuccess = res => {
  return {
    type: types.LOGIN_SUCCESS,
    payload: res,
  };
};

const updateProfileSuccess = res => {
  return {
    type: types.UPDATE_PROFILE,
    payload: res,
  };
};

export const updateSelectedImages = res => {
  return {
    type: types.EDIT_IMAGE,
    payload: res,
  };
};

export const logoutSuccess = () => {
  return {
    type: types.LOGOUT,
  };
};

export const callapi = data => {
  return {
    type: types.CALL_API,
    payload: data,
  };
};

export const stopapi = () => {
  return {
    type: types.STOP_API,
  };
};
