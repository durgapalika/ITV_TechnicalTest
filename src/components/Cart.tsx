import React, { useState } from 'react';
import { Button, Card, Modal, Spinner, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { completePurchase, decrementProductQuantity, deleteProduct, incrementProductQuantity, updateQuantity } from '../actions/actions';
import { BuyNowButton, CardHeaderText, HorizantalRule, SubTitleText, SubTotalContainer, TotalContainer, VATContainer } from '../App.styles';
import { CartItem } from '../entities/CartItem';
import { RootStore } from '../store';
import CartDetailItem from './CartDetailItem';
import CartItemHeader from './CartItemsHeader';

const Cart = () => {
	const cartItems = useSelector<RootStore, CartItem[]>((state: RootStore) => state.cart.items);
	const subTotal = useSelector<RootStore, number>((state: RootStore) => state.cart.subTotal);
	const vat = useSelector<RootStore, number>((state: RootStore) => state.cart.vat);
	const total = useSelector<RootStore, number>((state: RootStore) => state.cart.total);

	//State to show/hide loading spinner
	const [loading, setLoading] = useState(false);
	// state to show/hide success modal dialog
	const [checkoutComplete, setCheckoutComplete] = useState(false);

	const handleClose = () => setLoading(false);
	const handleCheckoutDialogClose = () => setCheckoutComplete(false);

	const dispatch = useDispatch();

	// handles quantity increment
	const handleQuantityIncrement = (productId: number) => {
		dispatch(incrementProductQuantity(productId));
	};

	// handles quantity decrement
	const handleQuantityDecrement = (productId: number) => {
		dispatch(decrementProductQuantity(productId));
	};

	// handles product delete button
	const handleDeleteProduct = (productId: number) => {
		dispatch(deleteProduct(productId));
	};

	// handles manual quantity input
	const handleQuantityUpdate = (productId: number, quantity: number) => {
		dispatch(updateQuantity(productId, quantity));
	};

	const handleBuyNowClick = () => {
		setLoading(true);
		dispatch(
			completePurchase({
				cartItems,
				subTotal,
				vat,
				total,
			})
		);

		// using a simple timout to show spinner for 2 secs
		setTimeout(() => {
			setLoading(false);
			setCheckoutComplete(true);
		}, 2000);
	};

	return (
		<>
			<Card>
				<div className="card-header">
					<CardHeaderText data-testid="spanCardHeader">Review Your Order</CardHeaderText>
				</div>
				<div className="card-body">
					<CartItemHeader />
					{cartItems.map((cartItem, index) => {
						return (
							<CartDetailItem
								index={index}
								key={cartItem.id}
								productId={cartItem.id}
								productName={cartItem.name}
								unitPrice={cartItem.unitPrice}
								quantity={cartItem.quantity}
								cost={cartItem.cost}
								incrementQuantity={handleQuantityIncrement}
								decrementQuantity={handleQuantityDecrement}
								updateQuantity={handleQuantityUpdate}
								deleteProduct={handleDeleteProduct}
							/>
						);
					})}
				</div>
			</Card>
			<HorizantalRule />
			<SubTotalContainer>
				<SubTitleText data-testid="spanSubTotalTitle">Subtotal</SubTitleText>
				<SubTitleText data-testid="spanSubTotalValue">{`£${subTotal.toFixed(2)}`}</SubTitleText>
			</SubTotalContainer>
			<VATContainer>
				<SubTitleText data-testid="spanVATTitle">VAT @ 20%</SubTitleText>
				<SubTitleText data-testid="spanVATValue">{`£${vat.toFixed(2)}`}</SubTitleText>
			</VATContainer>
			<HorizantalRule />
			<TotalContainer>
				<SubTitleText data-testid="spanTotalTitle">Total</SubTitleText>
				<SubTitleText data-testid="spanTotalValue">{`£${total.toFixed(2)}`}</SubTitleText>
			</TotalContainer>
			<HorizantalRule />
			<BuyNowButton disabled={cartItems.length === 0} onClick={handleBuyNowClick} data-testid="spanBuyNow">
				Buy Now
			</BuyNowButton>

			<Modal show={loading} onHide={handleClose} backdrop="static" keyboard={false}>
				<Modal.Header closeButton>
					<Modal.Title>Please Wait</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Spinner animation="border" style={{ textAlign: 'center' }}></Spinner>
				</Modal.Body>
			</Modal>

			<Modal show={checkoutComplete} onHide={handleCheckoutDialogClose} backdrop="static" keyboard={false}>
				<Modal.Header closeButton>
					<Modal.Title>Checkout complete</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>Great!!! Checkout is now complete.</p>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default Cart;
