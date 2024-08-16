
export const additem = (item) => {
    return {
        type: "ADD_CART",
        payload: item,
    };
};

export const increment=(itemid)=>{
    return{
        type:"INCREMENT",
        payload:itemid,
    };

}

export const decrement=(itemid)=>{
    return{
        type:"DECREMENT",
        payload:itemid,
    };

}

export const removeitem=(itemid)=>{
    return{
        type:"REMOVE",
        payload:itemid,
    };

}

export const clearCart = () => ({
    type: "CLEAR_CART"
  });
  