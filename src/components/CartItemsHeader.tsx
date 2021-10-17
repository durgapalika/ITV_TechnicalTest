import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { ProductItemHeaderText } from '../App.styles';

const CartItemHeader = () => {
	return (
		<>
			<Row className="card-header-extend">
				<Col className="col-md-2">
					<ProductItemHeaderText data-testid="spanHeaderProduct">Product</ProductItemHeaderText>
				</Col>
				<Col className="col-md-2">
					<ProductItemHeaderText data-testid="spanHeaderPrice">Price</ProductItemHeaderText>
				</Col>
				<Col className="col-md-4">
					<ProductItemHeaderText data-testid="spanHeaderQuantity">Quantity</ProductItemHeaderText>
				</Col>
				<Col className="col-md-2">
					<ProductItemHeaderText data-testid="spanHeaderCost">Cost</ProductItemHeaderText>
				</Col>
				<Col className="col-md-2" data-testid="spanHeaderEmpty"></Col>
			</Row>
		</>
	);
};

export default React.memo(CartItemHeader);
