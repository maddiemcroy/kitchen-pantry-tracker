import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    font-size: 100%;
    border: 0;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    background-color: ${props => props.color || '#fff'};
    color: white;
    font-weight: bold;
    margin: 0px 2px;
    :hover {
        background-color: #fff;
        color: ${props => props.color || '#fff'};
        box-shadow: 0px 0px 0px 1px ${props => props.color || '#fff'};
        transition: 200ms;
    }
`

const IconButton = (props) => {
    return (
        <StyledButton
            color={props.color}
            onClick={props.onClick}
        >
            {props.children}
        </StyledButton>
    )
};

export default IconButton;