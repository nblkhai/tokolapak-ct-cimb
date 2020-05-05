import Axios from "axios";
import { API_URL } from "../../constants/API";

export const numberOfCart = (id) => {
  return (dispatch) => {
    let cartNumber = 0;
    Axios.get(`${API_URL}/cart`, {
      params: {
        userId: id,
      },
    })
      .then((res) => {
        // if (res.data.length > 0) {
        //   let cartNumber = 0;
        //   for (let i = 0; i < res.data.length; i++)
        res.data.map((val) => {
          return (cartNumber += val.quantity);
        });
        dispatch({
          type: "ADD_CART_DATA",
          payload: cartNumber,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const editNumberOfCart = (id, quantity) => {
  return (dispatch) => {
    Axios.get(`${API_URL}/cart`, {
      params: {
        userId: id,
      },
    })
      .then((res) => {
        dispatch({
          type: "ADD_CART_DATA",
          payload: quantity,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
