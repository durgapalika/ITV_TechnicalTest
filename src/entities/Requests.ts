import { CartItem } from './CartItem';

export interface CompletePurchaseRequest {
    cartItems: CartItem[],
    subTotal: number;
    vat: number;
    total: number;
}