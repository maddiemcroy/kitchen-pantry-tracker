import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    margin: 20px;
    padding: 10px;
`;

const categories = ['Dairy', 'Produce', 'Meat'];

const AddItemForm = (props) => {

    return (
        <Container>
            <h3>Add new item</h3>
            <label for='name'>Name: 
                <input type='text' onChange={(e) => props.handleChange('name', e.target.value)}></input>
            </label>
            <label for='name'>Category: 
                <select onChange={(e) => props.handleChange('category', e.target.value)}>
                    <option value=''></option>
                    {categories.map((c) => (
                        <option value={c}>{c}</option>
                    ))}
                </select>
            </label>
            <label for='name'>Quantity: 
                <input onChange={(e) => props.handleChange('quantity', e.target.value)}></input>
            </label>
        </Container>
    );

};

export default AddItemForm;