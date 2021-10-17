import { cartDispatchTypes, COMPLETE_PURCHASE, DECREMENT_PRODUCT_QUANTITY, DELETE_PRODUCT, INCREMENT_PRODUCT_QUANTITY, UPDATE_QUANTITY } from '../actions/actionTypes';
import { CartItem } from '../entities/CartItem';

export interface ICartState {
    loading: boolean;
    items: CartItem[];
    subTotal: number;
    vat: number;
    total: number;
    purchaseComplete: boolean;
}

export const initialState: ICartState = {
    loading: false,
    items: [
        {
            id: 1, name: 'Apple', unitPrice: 0.52, quantity: 2, cost: 1.04
        },
        {
            id: 2, name: 'Banana', unitPrice: 0.67, quantity: 3, cost: 2.01
        },
    ],
    subTotal: 3.05,
    vat: 0.61,
    total: 3.66,
    purchaseComplete: false
}

export const cartReducer = (state: ICartState = initialState, action: cartDispatchTypes): ICartState => {
    switch (action.type) {
        case INCREMENT_PRODUCT_QUANTITY: {
            // get the item in cart
            const allProducts = state.items;
            //Find specific product
            const existingProducts = allProducts.find(item => item.id === action.payload.id);
            // Ammend the quantity and price accordingly
            // Remember quantity cannot go above 10
            if (existingProducts) {
                existingProducts.quantity = existingProducts.quantity === 10 ? 10 : existingProducts.quantity + 1;
                existingProducts.cost = existingProducts.unitPrice * existingProducts.quantity;
            }
            // reduce the items and calculate subtotal
            const subTotal = allProducts.reduce((prevProduct, curproduct) => {
                return prevProduct + curproduct.cost
            }, 0);
            // calculate VAT
            const vat = subTotal * 0.2;
            return { ...state, loading: false, items: allProducts, subTotal: subTotal, vat: vat, total: subTotal + vat }
        }
        case DECREMENT_PRODUCT_QUANTITY: {
            const allProducts = state.items;
            const existingProducts = allProducts.find(item => item.id === action.payload.id);
            if (existingProducts) {
                existingProducts.quantity = existingProducts.quantity === 1 ? 1 : existingProducts.quantity - 1;
                existingProducts.cost = existingProducts.unitPrice * existingProducts.quantity;
            }
            const subTotal = allProducts.reduce((prevProduct, curproduct) => {
                return prevProduct + curproduct.cost
            }, 0);
            const vat = subTotal * 0.2;
            return { ...state, loading: false, items: allProducts, subTotal: subTotal, vat: vat, total: subTotal + vat }
        }
        case UPDATE_QUANTITY: {
            const allProducts = state.items;
            const existingProducts = allProducts.find(item => item.id === action.payload.id);
            if (existingProducts) {
                existingProducts.quantity = action.payload.quantity;
                existingProducts.cost = existingProducts.unitPrice * action.payload.quantity;
            }
            const subTotal = allProducts.reduce((prevProduct, curproduct) => {
                return prevProduct + curproduct.cost
            }, 0);
            const vat = subTotal * 0.2;
            return { ...state, loading: false, items: allProducts, subTotal: subTotal, vat: vat, total: subTotal + vat }
        }
        case DELETE_PRODUCT: {
            const allProducts = state.items;
            const updatedProducts = allProducts.filter((product) => product.id !== action.payload);
            const subTotal = updatedProducts.reduce((prevProduct, curproduct) => {
                return prevProduct + curproduct.cost
            }, 0);
            const vat = subTotal * 0.2;
            return { ...state, loading: false, items: updatedProducts, subTotal: subTotal, vat: vat, total: subTotal + vat }
        }
        case COMPLETE_PURCHASE: {
            // Rremove all item from state and make totals 0
            return {
                ...state, loading: false, items: [], subTotal: 0.00, vat: 0.00, total: 0.00, purchaseComplete: true
            }
        }
        default:
            return state;
    }

}