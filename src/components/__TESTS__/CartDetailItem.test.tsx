import { fireEvent, screen, waitFor, render, act } from '@testing-library/react';
import React from 'react';
import CartDetailItem from '../CartDetailItem';

describe('CartItem Renders correctly', () => {
	beforeEach(() => {
		render(
			<CartDetailItem
				productId={1}
				productName="Apple"
				quantity={2}
				unitPrice={0.52}
				cost={1.04}
				deleteProduct={() => {}}
				decrementQuantity={() => {}}
				incrementQuantity={() => {}}
				index={1}
				updateQuantity={() => {}}
				key="1"
			/>
		);
	});

    it('CartItem are visible as expected', async () => {
		expect(await screen.findByTestId('spanDetailProduct-1')).toBeVisible();
		expect(await screen.findByTestId('spanDetailUnitPrice-1')).toBeVisible();
		expect(await screen.findByTestId('inputDetailQuantity-1')).toBeVisible();
		expect(await screen.findByTestId('btnDetailDecreaseQuantity-1')).toBeVisible();
		expect(await screen.findByTestId('btnDetailIncreaseQuantity-1')).toBeVisible();
		expect(await screen.findByTestId('spanDetailCosst-1')).toBeVisible();
		expect(await screen.findByTestId('btnDetailDelete-1')).toBeVisible();
	});

    it("Renders the 'Apple' product Details correctly", async () => {
		expect(await screen.findByTestId('spanDetailProduct-1')).toHaveTextContent('Apple');
		expect(await screen.findByTestId('spanDetailUnitPrice-1')).toHaveTextContent('£0.52');
		expect(await screen.findByTestId('inputDetailQuantity-1')).toHaveAttribute('value', '2');
		expect(await screen.findByTestId('btnDetailDecreaseQuantity-1')).toHaveTextContent('-');
		expect(await screen.findByTestId('btnDetailIncreaseQuantity-1')).toHaveTextContent('+');
		expect(await screen.findByTestId('spanDetailCosst-1')).toHaveTextContent('£1.04');
		expect(await screen.findByTestId('btnDetailDelete-1')).toHaveTextContent('Delete');
	});
});
