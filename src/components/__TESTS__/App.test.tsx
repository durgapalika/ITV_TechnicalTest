import React, { Children, ComponentType } from 'react';
import { fireEvent, screen, waitFor, render, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import rootReducer from '../../reducers';
import thunk from 'redux-thunk';
import { initialState } from '../../reducers/cartReducer';
import configureStore from 'redux-mock-store';
import createMockStore from 'redux-mock-store';
import { listeners } from 'cluster';
import App from '../../App';

let store = createStore(rootReducer, { cart: initialState }, applyMiddleware(thunk));
const renderWithRedux = (ui: React.ReactElement) => {
	return render(<Provider store={store}>{ui}</Provider>);
};

describe('Cart loads correctly', () => {

	beforeEach(() => {
		renderWithRedux(<App />);
	});

	it('Items are visible as expected', async () => {
		expect(await screen.findByTestId('spanCartTitle')).toBeVisible();
		expect(await screen.findByTestId('spanCardHeader')).toBeVisible();
		expect(await screen.findByTestId('spanHeaderProduct')).toBeVisible();
		expect(await screen.findByTestId('spanHeaderPrice')).toBeVisible();
		expect(await screen.findByTestId('spanHeaderQuantity')).toBeVisible();
		expect(await screen.findByTestId('spanHeaderCost')).toBeVisible();
		expect(await screen.findByTestId('spanHeaderEmpty')).toBeVisible();
	});

	it('Items have correct text content', async () => {
		expect((await screen.findByTestId('spanCartTitle')).textContent).toBe('Review Your Order & Complete Checkout');
		expect((await screen.findByTestId('spanCardHeader')).textContent).toBe('Review Your Order');
		expect((await screen.findByTestId('spanHeaderProduct')).textContent).toBe('Product');
		expect((await screen.findByTestId('spanHeaderPrice')).textContent).toBe('Price');
		expect((await screen.findByTestId('spanHeaderQuantity')).textContent).toBe('Quantity');
		expect((await screen.findByTestId('spanHeaderCost')).textContent).toBe('Cost');
		expect((await screen.findByTestId('spanHeaderEmpty')).textContent).toBe('');
	});

	it("Renders the 'Apple' product visibility correctly", async () => {
		expect(await screen.findByTestId('spanDetailProduct-1')).toBeVisible();
		expect(await screen.findByTestId('spanDetailUnitPrice-1')).toBeVisible();
		expect(await screen.findByTestId('inputDetailQuantity-1')).toBeVisible();
		expect(await screen.findByTestId('btnDetailDecreaseQuantity-1')).toBeVisible();
		expect(await screen.findByTestId('btnDetailIncreaseQuantity-1')).toBeVisible();
		expect(await screen.findByTestId('spanDetailCosst-1')).toBeVisible();
		expect(await screen.findByTestId('btnDetailDelete-1')).toBeVisible();
	});

	it("Renders the 'Banana' product visibility correctly", async () => {
		expect(await screen.findByTestId('spanDetailProduct-2')).toBeVisible();
		expect(await screen.findByTestId('spanDetailUnitPrice-2')).toBeVisible();
		expect(await screen.findByTestId('inputDetailQuantity-2')).toBeVisible();
		expect(await screen.findByTestId('btnDetailDecreaseQuantity-2')).toBeVisible();
		expect(await screen.findByTestId('btnDetailIncreaseQuantity-2')).toBeVisible();
		expect(await screen.findByTestId('spanDetailCosst-2')).toBeVisible();
		expect(await screen.findByTestId('btnDetailDelete-2')).toBeVisible();
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

	it("Renders the 'Banana' product Details correctly", async () => {
		expect(await screen.findByTestId('spanDetailProduct-2')).toHaveTextContent('Banana');
		expect(await screen.findByTestId('spanDetailUnitPrice-2')).toHaveTextContent('£0.67');
		expect(await screen.findByTestId('inputDetailQuantity-2')).toHaveAttribute('value', '3');
		expect(await screen.findByTestId('btnDetailDecreaseQuantity-2')).toHaveTextContent('-');
		expect(await screen.findByTestId('btnDetailIncreaseQuantity-2')).toHaveTextContent('+');
		expect(await screen.findByTestId('spanDetailCosst-2')).toHaveTextContent('£2.01');
		expect(await screen.findByTestId('btnDetailDelete-2')).toHaveTextContent('Delete');
	});

	it('Rendered the Pricing correctly and visible', async () => {
		expect(await screen.findByTestId('spanSubTotalTitle')).toBeVisible();
		expect(await screen.findByTestId('spanSubTotalTitle')).toHaveTextContent('Subtotal');

		expect(await screen.findByTestId('spanSubTotalValue')).toBeVisible();
		expect(await screen.findByTestId('spanSubTotalValue')).toHaveTextContent('£3.05');

		expect(await screen.findByTestId('spanVATTitle')).toBeVisible();
		expect(await screen.findByTestId('spanVATTitle')).toHaveTextContent('VAT @ 20%');

		expect(await screen.findByTestId('spanVATValue')).toBeVisible();
		expect(await screen.findByTestId('spanVATValue')).toHaveTextContent('£0.61');

		expect(await screen.findByTestId('spanTotalTitle')).toBeVisible();
		expect(await screen.findByTestId('spanTotalTitle')).toHaveTextContent('Total');

		expect(await screen.findByTestId('spanTotalValue')).toBeVisible();
		expect(await screen.findByTestId('spanTotalValue')).toHaveTextContent('£3.66');
	});

	it('Buy Now button is visible and enabled', async () => {
		expect(await screen.findByTestId('spanBuyNow')).toBeVisible();
		expect(await screen.findByTestId('spanBuyNow')).toHaveTextContent('Buy Now');
		expect(await screen.findByTestId('spanBuyNow')).not.toBeDisabled();
	});

	it('Handles the view corrrectly on product increase', async () => {
		const increaseButton = await screen.findByTestId('btnDetailIncreaseQuantity-1');

		await act(async () => {
			fireEvent.click(increaseButton);
		});

		expect(await screen.findByTestId('inputDetailQuantity-1')).toHaveAttribute('value', '3');
		expect(await screen.findByTestId('spanDetailUnitPrice-1')).toHaveTextContent('£0.52');
		expect(await screen.findByTestId('spanDetailCosst-1')).toHaveTextContent('£1.56');

		// Check there is no knock on effect on other products
		expect(await screen.findByTestId('spanDetailUnitPrice-2')).toHaveTextContent('£0.67');
		expect(await screen.findByTestId('spanDetailCosst-2')).toHaveTextContent('£2.01');

		expect(await screen.findByTestId('spanSubTotalValue')).toHaveTextContent('£3.57');
		expect(await screen.findByTestId('spanVATValue')).toHaveTextContent('£0.71');
		expect(await screen.findByTestId('spanTotalValue')).toHaveTextContent('£4.28');
	});

	it('Handles the view corrrectly on product decrease', async () => {
		const decreaseButton = await screen.findByTestId('btnDetailDecreaseQuantity-1');

		await act(async () => {
			fireEvent.click(decreaseButton);
		});

		expect(await screen.findByTestId('inputDetailQuantity-1')).toHaveAttribute('value', '2');
		expect(await screen.findByTestId('spanDetailUnitPrice-1')).toHaveTextContent('£0.52');
		expect(await screen.findByTestId('spanDetailCosst-1')).toHaveTextContent('£1.04');

		// Check there is no knock on effect on other products
		expect(await screen.findByTestId('spanDetailUnitPrice-2')).toHaveTextContent('£0.67');
		expect(await screen.findByTestId('spanDetailCosst-2')).toHaveTextContent('£2.01');

		expect(await screen.findByTestId('spanSubTotalValue')).toHaveTextContent('£3.05');
		expect(await screen.findByTestId('spanVATValue')).toHaveTextContent('£0.61');
		expect(await screen.findByTestId('spanTotalValue')).toHaveTextContent('£3.66');
	});

	it('Remove the product on Delete', async () => {
		const appleDeleteButton = await screen.findByTestId('btnDetailDelete-1');
		await act(async () => {
			fireEvent.click(appleDeleteButton);
		});

		expect(screen.queryAllByTestId('spanDetailProduct-1')).toHaveLength(0);
		expect(await screen.findByTestId('spanDetailProduct-2')).toBeVisible();

		expect(await screen.findByTestId('spanDetailUnitPrice-2')).toHaveTextContent('£0.67');
		expect(await screen.findByTestId('spanDetailCosst-2')).toHaveTextContent('£2.01');

		expect(await screen.findByTestId('spanSubTotalValue')).toHaveTextContent('£2.01');
		expect(await screen.findByTestId('spanVATValue')).toHaveTextContent('£0.40');
		expect(await screen.findByTestId('spanTotalValue')).toHaveTextContent('£2.41');

		expect(await screen.findByTestId('spanBuyNow')).not.toBeDisabled();

		const bananaDeleteButton = await screen.findByTestId('btnDetailDelete-2');
		await act(async () => {
			fireEvent.click(bananaDeleteButton);
		});

		expect(screen.queryAllByTestId('spanDetailProduct-1')).toHaveLength(0);
		expect(screen.queryAllByTestId('spanDetailProduct-2')).toHaveLength(0);

		expect(await screen.findByTestId('spanSubTotalValue')).toHaveTextContent('£0.00');
		expect(await screen.findByTestId('spanVATValue')).toHaveTextContent('£0.00');
		expect(await screen.findByTestId('spanTotalValue')).toHaveTextContent('£0.00');

		expect(await screen.findByTestId('spanBuyNow')).toBeDisabled();
	});
});

describe("Buy Now works as expected",()=>{
	beforeEach(() => {
		renderWithRedux(<App />);
	});
	it("Clears the basket on complete purchase",async()=>{
		const buynowButton = await screen.findByTestId('spanBuyNow');
		await act(async () => {
			fireEvent.click(buynowButton);
		});


		// TODO:: use Jest to mock the url and check the url has been called once
		
		expect(screen.queryAllByTestId('spanDetailProduct-1')).toHaveLength(0);
		expect(screen.queryAllByTestId('spanDetailProduct-2')).toHaveLength(0);

		expect(await screen.findByTestId('spanSubTotalValue')).toHaveTextContent('£0.00');
		expect(await screen.findByTestId('spanVATValue')).toHaveTextContent('£0.00');
		expect(await screen.findByTestId('spanTotalValue')).toHaveTextContent('£0.00');

		expect(await screen.findByTestId('spanBuyNow')).toBeDisabled();
	})
})
