import React from 'react';
import styled from 'styled-components';

const Form = styled.div`
    margin: 20px;
    padding: 10px;  
    display: flex;
    justify-content: center;
`;

const FormElement = styled.div`
    margin: 10px;
`;

const Label = styled.label`
    margin-right: 5px;
`;

const Amount = styled.input`
    width: 30px;
`;

const categories = ['Dairy', 'Produce', 'Meat', 'Frozen', 'Pantry', 'Other'];
const units = ['unit(s)', 'oz', 'fl-oz'];

const AddItemForm = (props) => {

    return (
        <Form>
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
                    <Amount onChange={(e) => props.handleChange('amount', e.target.value)}></Amount>
                    <select onChange={(e) => props.handleChange('units', e.target.value)}>
                        <option value=''></option>
                        {units.map((o) => (
                            <option value={o}>{o}</option>
                        ))}
                    </select>
            </FormElement>
        </Form>
    );

};

export default AddItemForm;