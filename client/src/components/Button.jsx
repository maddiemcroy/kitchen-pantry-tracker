import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    font-family: 'Quicksand';
    font-size: 100%;
    font-weight: bold;
    border: 0;
    border-radius: 8px;
    padding: 5px 10px;
    background-color: ${props => props.color || '#000'};
    color: white;
    margin: 0px 2px;
    :hover {
        background-color: #fff;
        color: ${props => props.color || '#000'};
        box-shadow: 0px 0px 0px 1px ${props => props.color || '#000'};
        transition: 200ms;
    }
`

const Button = (props) => {
    return (
        <StyledButton
            color={props.color}
            onClick={props.onClick}
        >
            {props.children}
        </StyledButton>
    )
};

export default Button;