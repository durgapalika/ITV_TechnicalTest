## Technical stack used
React,
Redux,
Redux-thunk,
Typescript,
Bootstrap,
React-testing-library,
Styled-components

## How it is Done.
Index.tsx is the entry point of the application. Main component App is wrrapped in Provider to use redux.

## Redux
Created a store file in root which uses redux thunk as middleware

/actions/actions.ts - This has all the actions performed and dispatches them
/actions/actionTypes.ts - This has all the types of actions
/reducers - created a rootreducer and cartReducer

## Components
1. App - This is the main container of the checkout screen with tile and Cart component
2. Cart - This component contains card component for items in basket and individual divs for totals
3. CartItemHeader - This contains the header of product items
4. CartDetailItem - This contains details of the product

## Unit tests
Written unit tests to check the elements state, text and visibility.
Tests also written around button clicks and text changes.


## Improvements
I have spend around 1Hr 30Mins on this test and tried to achieve as much as possbile,
Should i be given more time, I would create more styled components, streamline the styles
Utilize Jest to mock the network requests
Add unit tests around redux actions and reducers
Make the screen more ressponsive

