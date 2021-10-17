import { CompletePurchaseRequest } from '../entities/Requests';

export const INCREMENT_PRODUCT_QUANTITY = 'INCREMENT_PRODUCT_QUANTITY';
export const DECREMENT_PRODUCT_QUANTITY = 'DECREMENT_PRODUCT_QUANTITY';
export const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const COMPLETE_PURCHASE = 'COMPLETE_PURCHASE';

interface IncrementProductQuantity {
    type: typeof INCREMENT_PRODUCT_QUANTITY,
    payload: { id: number }
}

interface DecrementProductQuantity {
    type: typeof DECREMENT_PRODUCT_QUANTITY,
    payload: { id: number }
}

interface UpdateQuantity {
    type: typeof UPDATE_QUANTITY,
    payload: { id: number, quantity: number }
}

interface DeleteProduct {
    type: typeof DELETE_PRODUCT,
    payload: number;
}

interface CompletePurchase {
    type: typeof COMPLETE_PURCHASE,
    payload: CompletePurchaseRequest
}

export type cartDispatchTypes = IncrementProductQuantity | DecrementProductQuantity | UpdateQuantity | DeleteProduct | CompletePurchase;
