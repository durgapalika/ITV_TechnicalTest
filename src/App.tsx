import React from 'react';
import logo from './logo.svg';
import './App.css';
import Cart from './components/Cart';
import { Container } from 'react-bootstrap';
import { CheckOutTitle, HorizantalRule } from './App.styles';

function App() {
	return (
		<Container style={{ padding: '5rem 10rem', border: '1px solid #c1c1c1' }}>
			<CheckOutTitle data-testid="spanCartTitle">Review Your Order & Complete Checkout</CheckOutTitle>
			<HorizantalRule />
			<Cart></Cart>
		</Container>
	);
}

export default App;
