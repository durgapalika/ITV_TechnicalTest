import { Dispatch } from 'react';
import { CompletePurchaseRequest } from '../entities/Requests';
import { cartDispatchTypes, COMPLETE_PURCHASE, DECREMENT_PRODUCT_QUANTITY, DELETE_PRODUCT, INCREMENT_PRODUCT_QUANTITY, UPDATE_QUANTITY } from './actionTypes'
import axios from 'axios';

export const incrementProductQuantity = (id: number) => async (dispatch: Dispatch<cartDispatchTypes>) => {
    dispatch({
        type: INCREMENT_PRODUCT_QUANTITY,
        payload: { id }
    })
}

export const decrementProductQuantity = (id: number) => async (dispatch: Dispatch<cartDispatchTypes>) => {
    dispatch({
        type: DECREMENT_PRODUCT_QUANTITY,
        payload: { id }
    })
}

export const updateQuantity = (id: number, quantity: number) => async (dispatch: Dispatch<cartDispatchTypes>) => {
    dispatch({
        type: UPDATE_QUANTITY,
        payload: { id, quantity }
    })
}

export const deleteProduct = (id: number) => async (dispatch: Dispatch<cartDispatchTypes>) => {
    dispatch({
        type: DELETE_PRODUCT,
        payload: id
    })
}

export const completePurchase=(request:CompletePurchaseRequest)=> {
    return async (dispatch: Dispatch<cartDispatchTypes>) => {
        try{
            await axios.post('https://www.mockUrl.com/completeCheckout',request).catch(()=>{
                dispatch({
                    type: COMPLETE_PURCHASE,
                    payload: request
                });
            })
        }
        catch(e){

        }
        
    };
}