import { API_URL } from "../../constants/API";
import Axios from "axios";
import userTypes from "../types/user";
import Cookie from "universal-cookie";

const cookieObj = new Cookie();
const {
  ON_LOGIN_SUCCESS,
  ON_LOGIN_FAIL,
  ON_LOGOUT_SUCCESS,
  ON_REGISTER_FAIL,
  ON_SEARCHPRODUCT_SUCCESS,
} = userTypes;
export const loginHandler = (userData) => {
  return (dispatch) => {
    const { username, password } = userData;

    Axios.get(`${API_URL}/users`, {
      params: {
        username,
        password,
      },
    })
      .then((res) => {
        if (res.data.length > 0) {
          dispatch({
            type: ON_LOGIN_SUCCESS,
            payload: res.data[0],
          });
          Axios.get(`${API_URL}/carts`, {
            params: {
              userId: res.data[0].id,
            },
          })
            .then((res) => {
              dispatch({
                type: "FILL_CART",
                payload: res.data.length,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          dispatch({
            type: ON_LOGIN_FAIL,
            payload: "Username / Password Salah!",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const userKeepLogin = (userData) => {
  return (dispatch) => {
    Axios.get(`${API_URL}/users`, {
      params: {
        id: userData.id,
      },
    })
      .then((res) => {
        if (res.data.length > 0) {
          dispatch({
            type: ON_LOGIN_SUCCESS,
            payload: res.data[0],
          });
          Axios.get(`${API_URL}/carts`, {
            params: {
              userId: res.data[0].id,
            },
          })
            .then((res) => {
              dispatch({
                type: "FILL_CART",
                payload: res.data.length,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          dispatch({
            type: ON_LOGIN_FAIL,
            payload: "Username / Password Salah!",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const logoutHandler = () => {
  cookieObj.remove("authData", { path: "/" });
  return {
    type: ON_LOGOUT_SUCCESS,
  };
};

export const registerHandler = (userData) => {
  return (dispatch) => {
    Axios.get(`${API_URL}/users`, {
      params: {
        username: userData.username,
      },
    })
      .then((res) => {
        if (res.data.length > 0) {
          dispatch({
            type: "ON_REGISTER_FAIL",
            payload: "Username sudah digunakan",
          });
        } else {
          Axios.post(`${API_URL}/users`, { ...userData, role: "user" })
            .then((res) => {
              dispatch({
                type: ON_LOGIN_SUCCESS,
                payload: res.data,
              });

              Axios.get(`${API_URL}/carts`, {
                params: {
                  userId: res.data.id,
                },
              })
                .then((res) => {
                  dispatch({
                    type: "FILL_CART",
                    payload: res.data.length,
                  });
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const cookieChecker = () => {
  return {
    type: "COOKIE_CHECK",
  };
};

export const fillCart = (userId) => {
  return (dispatch) => {
    Axios.get(`${API_URL}/carts`, {
      params: {
        userId,
      },
    })
      .then((res) => {
        dispatch({
          type: "FILL_CART",
          payload: res.data.length,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
