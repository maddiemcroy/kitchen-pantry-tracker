import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import AddItemForm from './AddItemForm';

const Container = styled.div`
    max-width: 800px;
    margin: auto;
`;

const Item = styled.div`
    display: flex;
    margin: 10px;
    outline: 1px solid gray;
    padding: 5px;
    justify-content: space-between;
`;
const Name = styled.span`
    font-weight: bold;
`;

const Category = styled.div`
    margin-top: 30px;
    text-align: left;
`;

const PantryList = () => {
    const [items, setItems] = React.useState([]);
    const categories = [];

    const [newItem, setNewItem] = useState({
        name: '',
        category: '',
        quantity: 0
    });

    const handleChange = (attribute, value) => {
        setNewItem({ ...newItem, [attribute]: value });
    };

    const addItem = async (item) => {
        const newItem = await axios.post('/api/items', item);
        setItems([...items, newItem.data].sort(function(a, b) {
            return a.category.toLowerCase().localeCompare(b.category.toLowerCase());
         }));
        setNewItem(undefined);
    }    

    const deleteItem = async (id) => {
        await axios.delete(`/api/items/${id}`);
        setItems(items.filter(({ _id: i }) => id !== i ));
    }    

    useEffect(() => {
        async function fetchItems() {
            const result = await axios(
                '/api/items',
            );
            const items = result.data.sort(function(a, b) {
                return a.category.toLowerCase().localeCompare(b.category.toLowerCase());
             });
             console.log(items);
            setItems(items);
        }
        fetchItems();
      }, [setItems]);

    return (
        <Container>
            {items.map((i) => {
                let categoryHeader = undefined;
                if (!(categories.includes(i.category))) {
                    categoryHeader = (
                        <Category>{i.category}</Category>
                    );
                    categories.push(i.category);
                }
                const item = (
                    <Item>
                        <Name>{i.name}</Name>
                        <span>{i.quantity}</span>
                        <button
                            onClick={() => deleteItem(i._id)}
                        >remove</button>
                    </Item>
                )
                return [categoryHeader, item];
            })}
            <AddItemForm handleChange={handleChange} />
            <button
                onClick={() => addItem(newItem)}
            >add new</button>
        </Container>
    );
    
};

export default PantryList;