import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    margin: 20px;
    padding: 10px;
`;

const categories = ['Dairy', 'Produce', 'Meat', 'Frozen', 'Pantry', 'Other'];
const units = ['N/A', 'oz', 'fl-oz'];

const AddItemForm = (props) => {

    return (
        <Container>
            <h3>Add new item</h3>
            <label for='name'>Name: 
                <input type='text' onChange={(e) => props.handleChange('name', e.target.value)}></input>
            </label>
            <label for='category'>Category: 
                <select onChange={(e) => props.handleChange('category', e.target.value)}>
                    <option value=''></option>
                    {categories.map((c) => (
                        <option value={c}>{c}</option>
                    ))}
                </select>
            </label>
            <label for='quantity'>Quantity: 
                <input onChange={(e) => props.handleChange('quantity', e.target.value)}></input>
            </label>
            <label for='amount'>Amount: 
                <input onChange={(e) => props.handleChange('amount', e.target.value)}></input>
            </label>
            <label for='units'> 
                <select onChange={(e) => props.handleChange('units', e.target.value)}>
                    {units.map((o) => (
                        <option value={o}>{o}</option>
                    ))}
                </select>
            </label>
        </Container>
    );

};

export default AddItemForm;