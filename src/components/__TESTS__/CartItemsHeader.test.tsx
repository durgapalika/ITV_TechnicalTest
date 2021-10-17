import { fireEvent, screen, waitFor, render, act } from '@testing-library/react';
import React from 'react';
import CartDetailItem from '../CartDetailItem';
import CartItemHeader from '../CartItemsHeader';

describe('CartItem Renders correctly', () => {
	beforeEach(() => {
		render(
			<CartItemHeader	/>
		);
	});

    it('Headers are visible as expected', async () => {
		expect(await screen.findByTestId('spanHeaderProduct')).toBeVisible();
		expect(await screen.findByTestId('spanHeaderPrice')).toBeVisible();
		expect(await screen.findByTestId('spanHeaderQuantity')).toBeVisible();
		expect(await screen.findByTestId('spanHeaderCost')).toBeVisible();
		expect(await screen.findByTestId('spanHeaderEmpty')).toBeVisible();
	});

    it('Render the Headings correctly', async () => {
		expect((await screen.findByTestId('spanHeaderProduct')).textContent).toBe('Product');
		expect((await screen.findByTestId('spanHeaderPrice')).textContent).toBe('Price');
		expect((await screen.findByTestId('spanHeaderQuantity')).textContent).toBe('Quantity');
		expect((await screen.findByTestId('spanHeaderCost')).textContent).toBe('Cost');
		expect((await screen.findByTestId('spanHeaderEmpty')).textContent).toBe('');
	});
});