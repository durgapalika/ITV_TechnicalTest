import styled from 'styled-components';

export const CartProductsHeader = styled.div`
display:flex;
flex-direction:row;
justify-content: space-between;
border:1px solid
`;

export const SubTotalContainer = styled.div`
display:flex;
flex-direction:row;
justify-content: space-between;
padding: 0.4rem 0;
opacity:0.2;
`;

export const VATContainer = styled.div`
display:flex;
flex-direction:row;
justify-content: space-between;
padding: 0.4rem 0;
opacity:0.2;
`;

export const TotalContainer = styled.div`
display:flex;
flex-direction:row;
justify-content: space-between;
padding: 10px 0
`;

export const Container = styled.div`
display:flex;
flex-direction:column;
`;

export const CheckOutTitle = styled.h3`
text-align:center;
font-size:20pt;
font-weight: bold;
`

export const HorizantalRule = styled.hr`
background-color:#c9c9c9
`

export const IncreaseQuantityButton = styled.button`
width:30px;
height:30px;
color:white;
background-color:#15BC9C;
margin: 5px 2px;
border-radius:5px;
font-weight:bold;
border:none;
`

export const DecreaseQuantityButton = styled.button`
width:30px;
height:30px;
color:white;
background-color:#F49C11;
margin: 5px 2px;
border-radius:5px;
font-weight:bold;
border:none;
`
export const DeleteProductButton = styled.button`
color:white;
text-align: center;
background-color:#E84C3C;
padding: 5px 15px;
font-size:9pt;
font-weight:bold;
border:none;
border-radius:5px;
`

export const QuantityTextBox = styled.input`
width:40px;
border: 1px solid #c9c9c9;
type:text;
margin:5px 5px 5px 5px;
text-align:center;
font-weight:bold;
`

export const SubTitleText = styled.span`
font-weight:bold;
font-size:14pt;
`

export const CardHeaderText = styled.span`
font-weight:600;
font-size:14pt;
`

export const ProductItemHeaderText = styled.span`
font-weight:bold;
font-size:12pt;
`

export const ProductItemDetailText = styled.span`
font-weight:600;
font-size:12pt;
`

export const BuyNowButton = styled.button`
color:white;
text-align: center;
float:right;
background-color:#17BEC8;
padding: 0.5rem;
font-size:12pt;
font-weight:600;
border-radius:20px;
border:none;
width:130px
`
