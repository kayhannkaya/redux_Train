import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function cartReducer(state = initialState.cart, action) {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      var addedItem = state.find((c) => c.product.id === action.payload.product.id); //bir daha bak
      if (addedItem) {
        var newState = state.map((cartItem) => {
          if (cartItem.product.id === action.payload.product.id) {
            return Object.assign({}, addedItem, {
              quantity: addedItem.quantity + 1
            });
          }
          return cartItem;
        });
        return newState;
        
      }else{
          return[...state,{...action.payload}] // state in bir kopyasını al o kopyaya action ile gelen payload u ekle. Arrayın kopyasını alıp ekliyoruz.
      }
      case actionTypes.REMOVE_FROM_CART:
        //const veya var kullanılabilir.Farketmez. Filter da yeni bir array oluşturur ve referans değişmiş olur.
        const newState2=state.filter(cartItem=>cartItem.product.id!==action.payload.id)
        return newState2;

    default:
      return state;
  }
}
