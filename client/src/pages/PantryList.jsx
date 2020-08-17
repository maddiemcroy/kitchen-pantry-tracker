import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import AddItemForm from './AddItemForm';
import { categoryColors } from '../utils';
import IconButton from '../components/IconButton';

const Container = styled.div`
    max-width: 800px;
    margin: auto;
`;

const Item = styled.div`
    display: flex;
    margin: 10px;
    /* outline: 1px solid gray; */
    padding: 5px 15px;
    justify-content: space-between;
    border-radius: 8px;
    box-shadow: 0px 0px 1px #aaa;
    align-items: center;
    /* :hover {
        box-shadow: 2px 2px 6px #cccccc;
        transition: 200ms;
    } */
`;

const Name = styled.span`
    font-weight: bold;
`;

const CategorySection = styled.div`
    padding: 10px;
    margin: 15px;
`;

const CategoryHeader = styled.div`
    text-align: left;
    text-transform: capitalize;
    background-color: ${props => props.color ? props.color : '#fff'};
    color: white;
    font-weight: bold;
    font-size: 1.2em;
    padding: 8px;
    border-radius: 8px;
`;

const PantryList = () => {
    const [items, setItems] = React.useState([]);

    const [newItem, setNewItem] = useState({
        name: '',
        category: '',
        quantity: undefined,
        amount: undefined,
        units: undefined
    });

    const handleChange = (attribute, value) => {
        setNewItem({ ...newItem, [attribute]: value });
    };

    const addItem = async (item) => {
        console.log(items);
        const newItem = await axios.post('/api/items', item);
        const updatedItems = JSON.parse(JSON.stringify(items)); //to deep copy
        updatedItems[newItem.data.category.toLowerCase()].push(newItem.data);
        setItems(updatedItems);
        console.log(items);
    }    

    const deleteItem = async (item) => {
        await axios.delete(`/api/items/${item._id}`);
        let updatedItems = JSON.parse(JSON.stringify(items)); //to deep copy
        updatedItems[item.category.toLowerCase()] = updatedItems[item.category.toLowerCase()].filter(({ _id: i }) => item._id !== i )
        setItems(updatedItems);
    }    

    useEffect(() => {
        async function fetchItems() {
            const result = await axios(
                '/api/items',
            );
            const sortedItems = {
                dairy: [],
                produce: [],
                meat: [],
                frozen: [],
                pantry: [],
                other: []
            };
            result.data.forEach(i => {
                sortedItems[i.category.toLowerCase()].push(i);
            });
            setItems(sortedItems);
        }
        fetchItems();
      }, [setItems]);

    return (
        <Container>
            {Object.keys(items).map((c) => {
                if (items[c].length > 0) {
                    return (
                        <CategorySection>
                            <CategoryHeader color={categoryColors[c]}>{c}</CategoryHeader>
                            {items[c].map(i => {
                                return (
                                    <Item>
                                        <Name>{i.name}</Name>
                                        <span>{i.quantity}</span>
                                        <span>{i.amount} {i.units}</span>
                                        <div>
                                            <IconButton color={categoryColors[c]}
                                                onClick={() => deleteItem(i)}
                                            >-</IconButton>
                                            <IconButton color={categoryColors[c]}
                                                onClick={() => deleteItem(i)}
                                            >+</IconButton>
                                        </div>
                                    </Item>
                                )
                            })}
                        </CategorySection>
                    )
                } 
            })}
            <AddItemForm handleChange={handleChange} />
            <button
                onClick={() => addItem(newItem)}
            >add new</button>
        </Container>
    );
    
};

export default PantryList;