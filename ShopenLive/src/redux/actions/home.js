import * as types from '../actions/types';
import {updateSelectedImages} from './auth';

export const activeScreen = params => ({
  type: types.ACTIVE_SCREEN,
  payload: params,
});

export const createSellerPost = (formdata, onSuccess, onError) => {
  return async dispatch => {
    try {
      // console.log(formdata);
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      fetch(`${types.BASEURL}/create_post.php`, requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result.state === 'OK') {
            onSuccess();
          } else {
            onError(result);
          }
        })
        .catch(error => {
          onError(error);
        });
    } catch (err) {
      onError(err);
    }
  };
};

export const getHomePosts = (formdata, onSuccess, onError) => {
  return async dispatch => {
    try {
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      fetch(`${types.BASEURL}/fetch_posts.php`, requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result.state === 'OK') {
            onSuccess(result.data.posts);
          } else {
            onError(result);
          }
        })
        .catch(error => {
          onError(error);
        });
    } catch (err) {
      onError(err);
    }
  };
};

export const getReviews = (formdata, onSuccess, onError) => {
  return async dispatch => {
    try {
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      fetch(`${types.BASEURL}/get_reviews.php`, requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result.state === 'OK') {
            onSuccess(result.data.reviews);
          } else {
            onError(result);
          }
        })
        .catch(error => {
          onError(error);
        });
    } catch (err) {
      onError(err);
    }
  };
};

export const getProducts = (formdata, onSuccess, onError) => {
  return async dispatch => {
    try {
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      fetch(`${types.BASEURL}/get_seller_products.php`, requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result.state === 'OK') {
            onSuccess(result.data.seller_products);
          } else {
            onError(result);
          }
        })
        .catch(error => {
          onError(error);
        });
    } catch (err) {
      onError(err);
    }
  };
};

export const handleCreateProduct = (formdata, onSuccess, onError) => {
  return async dispatch => {
    try {
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };
      console.log('i reacched here////');
      fetch(`${types.BASEURL}/create_product.php`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result);
          if (result.state === 'OK') {
            onSuccess(result);
          } else {
            onError(result);
          }
        })
        .catch(error => {
          onError(error);
        });
    } catch (err) {
      onError(err);
    }
  };
};

export const handleGetMessagesTicket = (formdata, onSuccess, onError, type) => {
  return async dispatch => {
    try {
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      fetch(
        `${types.BASEURL}/${
          type === 1 ? 'get_buyer_conversations' : 'get_seller_conversations'
        }.php`,
        requestOptions,
      )
        .then(response => response.json())
        .then(result => {
          if (result.state === 'OK') {
            onSuccess(result.data.conversations);
          } else {
            onError(result);
          }
        })
        .catch(error => {
          onError(error);
        });
    } catch (err) {
      onError(err);
    }
  };
};

export const handleGetNotifications = (
  formdata,
  onSuccessNotification,
  onErrorNotification,
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
          type === 1 ? 'get_buyer_notifications' : 'get_seller_notifications'
        }.php`,
        requestOptions,
      )
        .then(response => response.json())
        .then(result => {
          if (result.state === 'OK') {
            onSuccessNotification(
              result?.data?.seller_notifications
                ? result?.data?.seller_notifications
                : result?.data?.buyer_notifications,
            );
          } else {
            onErrorNotification(result);
          }
        })
        .catch(error => {
          onErrorNotification(error);
        });
    } catch (err) {
      onErrorNotification(err);
    }
  };
};

export const handleCreateTicket = (formdata, onSuccess, onError) => {
  return async dispatch => {
    try {
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      fetch('https://shopelive.tritec.store/api/ticket/create', requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result.error === false) {
            onSuccess(result.ticket);
          } else {
            onError(result);
          }
        })
        .catch(error => {
          onError(error);
        });
    } catch (err) {
      onError(err);
    }
  };
};

export const getTOKEN = (formdata, onSuccess, onError) => {
  return async dispatch => {
    try {
      var requestOptions = {
        method: 'GET',
        redirect: 'follow',
      };

      fetch(
        `https://testapi.umairabbas.me/stream/publisher.php?channel=${formdata}`,
        requestOptions,
      )
        .then(response => {
          console.log(response);
          response.text();
        })
        .then(result => {
          console.log('result');
          console.log(result);
          onSuccess(result);
        })
        .catch(error => {
          onError(error);
        });
    } catch (err) {
      onError(err);
    }
  };
};

export const saveMsg = res => {
  return {
    type: types.SAVE_MESSAGES,
    payload: res,
  };
};

export const saveNotification = res => {
  return {
    type: types.SAVE_NOTIFICATION,
    payload: res,
  };
};
