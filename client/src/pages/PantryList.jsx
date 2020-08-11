import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Item = styled.div`
    display: flex;
    margin: 10px;
    outline: 1px solid gray;
    padding: 5px;
    justify-content: space-between;
`
const Name = styled.span`
    font-weight: bold;
`

const Category = (props) => {
    return (
        <div>
            {props.name}
        </div>
    )
}

const PantryList = () => {
    const [items, setItems] = React.useState([]);
    const categories = [];

    const addItem = async (item) => {
        const newItem = await axios.post('/api/items', item);
        setItems([...items, newItem.data]);
        console.log(items);
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
            console.log(result.data);
            setItems(result.data);
        }
        fetchItems();
      }, [setItems]);

    return (
        <div>
            {items.map((i) => {
                let categoryHeader = undefined;
                if (!(categories.includes(i.category))) {
                    categoryHeader = (
                        <Category name={i.category} />
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
            <button
                onClick={() => addItem({ name: 'lettuce', quantity: 1, category: 'Produce' })}
            >add new</button>
        </div>
    );
    
};

export default PantryList;