const INIT_STATE = {
  carts: JSON.parse(localStorage.getItem("cart")) || [] 
};

export const CartReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "ADD_CART":
      // Check if item already exists in cart
      const itemIndex = state.carts.findIndex(item => item.id === action.payload.id);
      if (itemIndex > -1) {
        // Item exists, update quantity
        return {
          ...state,
          carts: state.carts.map((item, index) =>
            index === itemIndex
              ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) }
              : item
          ),
        };
      } else {
        // Item does not exist, add new item
        return {
          ...state,
          carts: [
            ...state.carts,
            { ...action.payload, quantity: action.payload.quantity || 1 }
          ],
        };
      }

    case "INCREMENT":
      return {
        ...state,
        carts: state.carts.map(item =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };

    case "DECREMENT":
      return {
        ...state,
        carts: state.carts.map(item =>
          item.id === action.payload
            ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
            : item
        ),
      };

    case "REMOVE":
      return {
        ...state,
        carts: state.carts.filter(item => item.id !== action.payload),
      };

      case "CLEAR_CART":
        return {
         
          carts: [],
        };

    default:
      return state;
  }
};
