import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { categoryColors } from '../utils';
import Button from '../components/Button'
import IconButton from '../components/IconButton';
import editIcon from '../assets/icons/edit.svg';
import removeIcon from '../assets/icons/delete.svg';
import EditItemModal from '../components/EditItemModal';
import AddItemModal from '../components/AddItemModal';

const Container = styled.div`
    max-width: 800px;
    margin: auto;
`;

const Item = styled.div`
    display: flex;
    margin: 10px;
    padding: 5px 15px;
    justify-content: space-between;
    border-radius: 8px;
    box-shadow: 0px 0px 1px #aaa;
    align-items: center;
`;

const Name = styled.span`
    font-weight: bold;
    margin-right: 10px;
`;

const Amount = styled.span`
    font-size: 0.8em;
    text-align: left;
    flex: 1;
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
    const [editModalIsOpen, setEditModalOpen] = React.useState(false);
    const [addModalIsOpen, setAddModalOpen] = React.useState(false);

    const handleChange = (attribute, value) => {
        setNewItem({ ...newItem, [attribute]: value });
    };

    const addItem = async () => {
        console.log(items);
        const createdNewItem = await axios.post('/api/items', newItem);
        const updatedItems = JSON.parse(JSON.stringify(items)); //to deep copy
        updatedItems[createdNewItem.data.category.toLowerCase()].push(createdNewItem.data);
        setItems(updatedItems);
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
        <EditItemModal
            isOpen={editModalIsOpen}
            onRequestClose={() => setEditModalOpen(false)}
        />
        <AddItemModal
            isOpen={addModalIsOpen}
            onRequestClose={() => setAddModalOpen(false)}
            handleChange={handleChange}
            onSubmit={() => {
                addItem();
                setAddModalOpen(false);
            }}
        />
        <Button
            color='#00db63'
            onClick={() => setAddModalOpen(true)}
        >
            Add new ingredients
        </Button>
        <Button
            color='#d9325e'
        >
            Log used ingredients
        </Button>
            {Object.keys(items).map((c) => {
                if (items[c].length > 0) {
                    return (
                        <CategorySection>
                            <CategoryHeader color={categoryColors[c]}>{c}</CategoryHeader>
                            {items[c].map(i => {
                                return (
                                    <Item>
                                        <Name>{i.name}</Name>
                                        <Amount>{i.amount} {i.units}</Amount>
                                        <div>
                                            <IconButton color={categoryColors[c]}
                                                onClick={() => setEditModalOpen(true)}
                                                icon={editIcon}
                                            />
                                            <IconButton color={categoryColors[c]}
                                                onClick={() => deleteItem(i)}
                                                icon={removeIcon}
                                            />
                                        </div>
                                    </Item>
                                )
                            })}
                        </CategorySection>
                    )
                } 
            })}
        </Container>
    );
    
};

export default PantryList;