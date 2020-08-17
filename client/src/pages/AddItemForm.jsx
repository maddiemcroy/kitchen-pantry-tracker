import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    margin: 20px;
    padding: 10px;
`;

const FormElement = styled.div`
    margin: 10px 0px;
`;

const Label = styled.label`
    margin-right: 5px;
`;

const categories = ['Dairy', 'Produce', 'Meat', 'Frozen', 'Pantry', 'Other'];
const units = ['unit(s)', 'oz', 'fl-oz'];

const AddItemForm = (props) => {

    return (
        <Container>
            <h3>Add new item</h3>
            <FormElement>
                <Label for='name'>Name:</Label>
                    <input type='text' onChange={(e) => props.handleChange('name', e.target.value)}></input>
            </FormElement>
            <FormElement>
                <Label for='category'>Category:</Label>
                    <select onChange={(e) => props.handleChange('category', e.target.value)}>
                        <option value=''></option>
                        {categories.map((c) => (
                            <option value={c}>{c}</option>
                        ))}
                    </select>
            </FormElement>
            <FormElement>
                <Label for='amount'>Amount:</Label>
                    <input onChange={(e) => props.handleChange('amount', e.target.value)}></input>
                    <select onChange={(e) => props.handleChange('units', e.target.value)}>
                        <option value=''></option>
                        {units.map((o) => (
                            <option value={o}>{o}</option>
                        ))}
                    </select>
            </FormElement>
            <button onClick={props.onSubmit}>add</button>
        </Container>
    );

};

export default AddItemForm;