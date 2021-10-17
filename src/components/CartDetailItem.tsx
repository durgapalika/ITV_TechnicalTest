import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import {
	ProductItemDetailText,
	DecreaseQuantityButton,
	DeleteProductButton,
	IncreaseQuantityButton,
	QuantityTextBox,
} from '../App.styles';

interface CartDetailItemProps {
	index: number;
	productId: number;
	productName: string;
	unitPrice: number;
	quantity: number;
	cost: number;
	incrementQuantity: (productId: number) => void;
	decrementQuantity: (productId: number) => void;
	updateQuantity: (productId: number, quantity: number) => void;
	deleteProduct: (productId: number) => void;
}

const CartDetailItem = ({
	index,
	productId,
	productName,
	unitPrice,
	quantity,
	cost,
	incrementQuantity,
	decrementQuantity,
	updateQuantity,
	deleteProduct,
}: CartDetailItemProps) => {

	// state to hold the quantity
	const [newQuantity, setNewQuantity] = useState('');

	const handlQuantityIncrement = () => {
		incrementQuantity(productId);
	};
	const handlQuantityDecrement = () => {
		decrementQuantity(productId);
	};
	const handleDeleteProduct = () => {
		deleteProduct(productId);
	};
	const handlUpdateQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
		const qty = parseInt(event.target.value);
		setNewQuantity(isNaN(qty) ? '' : qty.toString());
	};

	// set state to the one from prrops on component load
	useEffect(() => {
		setNewQuantity(quantity.toString());
	}, []);


	// when newQuantity state is updated, dispatch updateQuantity action
	// dispatch only if newQuantity is number and is between 1 and 10 inclusive
	useEffect(() => {
		if (!isNaN(parseInt(newQuantity)) && parseInt(newQuantity) > 0 && parseInt(newQuantity) <= 10) {
			updateQuantity(productId, parseInt(newQuantity));
		}
	}, [newQuantity]);

	// provide and alternate color
	const getBackgroundColor = (index: number) => {
		return index % 2 === 0 ? 'transparent' : '#e3e3e3';
	};
	return (
		<Row style={{ backgroundColor: getBackgroundColor(index) }} className="card-body-extend">
			<Col className="col-md-2">
				<ProductItemDetailText data-testid={`spanDetailProduct-${productId}`}>{productName}</ProductItemDetailText>
			</Col>
			<Col className="col-md-2">
				<ProductItemDetailText data-testid={`spanDetailUnitPrice-${productId}`}>{`£${unitPrice}`}</ProductItemDetailText>
			</Col>
			<Col className="col-md-4">
				<div>
					<QuantityTextBox
						type="number"
						min="1"
						max="10"
						value={quantity}
						onChange={handlUpdateQuantity}
						data-testid={`inputDetailQuantity-${productId}`}
					/>
					<DecreaseQuantityButton
						onClick={handlQuantityDecrement}
						className="input-group-aappend"
						data-testid={`btnDetailDecreaseQuantity-${productId}`}>
						-
					</DecreaseQuantityButton>
					<IncreaseQuantityButton
						onClick={handlQuantityIncrement}
						className="input-group-aappend"
						data-testid={`btnDetailIncreaseQuantity-${productId}`}>
						+
					</IncreaseQuantityButton>
				</div>
			</Col>
			<Col className="col-md-2">
				<ProductItemDetailText data-testid={`spanDetailCosst-${productId}`}>{`£${cost.toFixed(2)}`}</ProductItemDetailText>
			</Col>
			<Col className="col-md-2">
				<DeleteProductButton onClick={handleDeleteProduct} data-testid={`btnDetailDelete-${productId}`}>
					Delete
				</DeleteProductButton>
			</Col>
		</Row>
	);
};

export default CartDetailItem;
