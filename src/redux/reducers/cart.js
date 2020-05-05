const init_state = {
  qty: 0,
};

export default (state = init_state, action) => {
  switch (action.type) {
    case "ADD_CART_DATA":
      return {
        ...state,
        qty: action.payload,
      };
    default:
      return { ...state };
  }
};
